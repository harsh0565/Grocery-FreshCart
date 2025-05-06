// Place Order with COD Payment : /api/order/cod

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe";
import User from "../models/User.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, addressId } = req.body;
    console.log(req.body);

    if (!userId || !items || !addressId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.productId);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    amount += Math.floor(amount * 0.02);

    const newOrder = await Order.create({
      userId,
      items: items.map(({ productId, quantity }) => ({
        product: productId,
        quantity,
      })),
      amount,
      address: addressId,
      paymentType: "COD",
    });

    return res.status(201).json({
      success: true,
      order: newOrder,
      message: "Order placed successfully with Cash on Delivery",
    });
  } catch (error) {
    console.error("Error placing COD order:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// get order by userid : /api/order/user

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({
      userId,
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    // const orders = await Order.find({
    //   userId,
    //   $or: [{ paymentType: "COD" }, { isPaid: true }],
    // })
    //   .populate("items.product address")
    //   .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
      message: "Orders fetched successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// get all orders (for seller) : /api/order/seller

export const getSellerOrders = async (req, res) => {
  try {
    // const {sellerId} = req.body;
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
      message: "Orders fetched successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Plcae order Stripe Payment : /api/order/stripe

export const placeOrderStripe = async (req, res) => {
  try {
    console.log("Hii");
    const { userId, items, addressId } = req.body;
    console.log("data using strip payment", req.body);
    const { origin } = req.headers;
    console.log("origin", origin);
    console.log(items, addressId);

    if (!userId || !items || !addressId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let productData = [];
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.productId);
      productData.push({
        name: product.name,
        quantity: item.quantity,
        price: product.offerPrice,
      });
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    amount += Math.floor(amount * 0.02);

    const newOrder = await Order.create({
      userId,
      items: items.map(({ productId, quantity }) => ({
        product: productId,
        quantity,
      })),
      amount,
      address: addressId,
      paymentType: "Online",
    });
    // stripe gateway initialization
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // Create line items for stripe
    const line_Items = productData.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      line_items: line_Items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: newOrder._id.toString(),
        userId,
      },
    });

    return res.json({
      success: true,
      order: newOrder,
      url: session.url,
      message: "Order placed successfully with Online Payment",
    });
  } catch (error) {
    console.error("Error placing Stripe order:", error.message);
    res.json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Stripe webhook to verify payment status

export const stripeWebhook = async (req, res) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sign = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sign,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Error with Stripe webhook:", error.message);
    res.status(400).json({ received: false, message: "webhook error" });
  }
  switch (event.type) {
    case "payment_intent.succeeded": {
      console.log("PaymentIntent succeeded:", event.data.object);
      // Update the order's status
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
      const { orderId, userId } = session.data[0].metadata;

      // Mark Payment as paid
      await Order.findByIdAndUpdate(
        orderId,
        { isPaid: true, paidAt: Date.now() },
        { new: true }
      );
      await User.findByIdAndUpdate(userId, { cartItem: {} }, { new: true });
      // Send a notification to the user
      // SendEmailNotification(order);
      break;
    }
    case "payment_intent.payment_failed": {
      console.log("PaymentIntent failed:", event.data.object);
      // Update the order's status
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
      const { orderId } = session.data[0].metadata;

      // Mark Payment as failed
      await Order.findByIdAndDelete(orderId);
      // Send a notification to the user
      // SendEmailNotification(order);
      break;
    }
    default:
      console.error("Unhandled event type:", event.type);
      break;
  }
  res.json({ received: true });
};
