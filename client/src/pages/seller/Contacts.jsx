import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/api/contact/get");
        setContacts(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load contacts.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <p className="text-center text-lg mt-10">Loading contacts...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
  📇 All Contacts
</h1>
<p className="text-center text-gray-600 mb-6">
  Below is a list of all user inquiries submitted through the contact form.
</p>

      <div className="overflow-x-auto shadow-lg rounded-xl bg-white border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Message</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {contacts.map((contact) => (
              <motion.tr
                key={contact._id}
                className="hover:bg-gray-50 border-t"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 }}
              >
                <td className="px-6 py-4">{contact.name || contact.user?.name}</td>
                <td className="px-6 py-4">{contact.email || contact.user?.email}</td>
                <td className="px-6 py-4">{contact.message}</td>
                <td className="px-6 py-4">
                  {new Date(contact.createdAt).toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ContactsPage;
