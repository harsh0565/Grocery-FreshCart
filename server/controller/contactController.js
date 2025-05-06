import Contact from "../models/Contact.js";

export const submitContact = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, message } = req.body;
    const user = req.user;
    console.log(user); 
    if (!name || !email || !message || !user) {
      return res
        .json({ success: false, message: "All fields are required" });
    }

    const contact = await Contact.create({ name, email, message, user });

    res.json({ success: true, contact });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().populate("user", "name email").sort({ createdAt: -1 }); // Optional: populate user info
    console.log("contact", contacts);
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
