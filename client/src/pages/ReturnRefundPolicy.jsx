import React from "react";

const ReturnRefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Return & Refund Policy</h1>

      <p className="mb-4">
        At FreshBasket Grocery, customer satisfaction is our top priority. If you are not completely satisfied with your purchase, we’re here to help.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Returns</h2>
      <p className="mb-4">
        - You may return most items within <strong>24 hours</strong> of delivery if they are damaged, incorrect, or expired.<br />
        - Perishable goods like fruits, vegetables, dairy, and bakery items are eligible for return only if reported within 24 hours of delivery.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Refunds</h2>
      <p className="mb-4">
        - Once we receive your return request and inspect the item(s), we will notify you regarding the refund status.<br />
        - If approved, the refund will be processed within <strong>5-7 business days</strong> to your original payment method.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Non-Returnable Items</h2>
      <p className="mb-4">
        - Items marked as "Final Sale" or "Non-Returnable"<br />
        - Opened or tampered packaged food products<br />
        - Custom or bulk orders unless defective
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">How to Request a Return</h2>
      <p className="mb-4">
        - Go to <strong>My Orders</strong> and select the item you'd like to return.<br />
        - Follow the prompts to submit a return request.<br />
        - You can also email our support team at <a className="text-green-600 underline" href="mailto:harshsengar099@gmail.com">harshsengar099@gmail.com</a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="mb-2">
        If you have any questions about our Return & Refund Policy, feel free to contact our customer support team.
      </p>
    </div>
  );
};

export default ReturnRefundPolicy;
