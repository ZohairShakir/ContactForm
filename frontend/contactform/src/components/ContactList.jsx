import { useEffect, useState } from "react";
import "../styles/ContactList.css";

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts from the backend
  const fetchContacts = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Delete contact function
  const deleteContact = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove deleted contact from state
        setContacts(contacts.filter((c) => c._id !== id));
      } else {
        alert("Failed to delete contact.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting the contact.");
    }
  };

  if (loading) return <p className="loading-text">Loading contacts…</p>;
  if (!contacts.length) return <p className="empty-text">No contacts yet.</p>;

  return (
    <div className="contacts-wrapper">
      <h3 className="contacts-title">Submitted Contacts</h3>

      <table className="contacts-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Actions</th> {/* New column */}
          </tr>
        </thead>

        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.message || "—"}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteContact(c._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
