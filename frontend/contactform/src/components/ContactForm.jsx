import { useState } from "react";
import "../styles/ContactForm.css";

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState({});
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formValid) return;

  try {
    const res = await fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) throw new Error("Failed");

    setForm({ name: "", email: "", phone: "", message: "" });
    setTouched({});
    setSuccess(true);
    window.location.reload();

    setTimeout(() => setSuccess(false), 2000);
  } catch (err) {
    console.error(err);
  }
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const phoneValid = /^\d*$/.test(form.phone);

  const formValid =
  form.name.trim() &&
  emailValid &&
  form.phone.trim() &&
  phoneValid;

  return (
    <div className="contact-wrapper">
      <form className="contact-card" onSubmit={handleSubmit}>
        <h2 className="contact-title">Get in touch</h2>
        <p className="contact-subtitle">
          We usually respond within 24 hours.
        </p>

        <div className="field">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <label>Name</label>
          {touched.name && !form.name && (
            <span className="error">Name is required</span>
          )}
        </div>

        <div className="field">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <label>Email</label>
          {touched.email && !emailValid && (
            <span className="error">Enter a valid email</span>
          )}
        </div>

        <div className="field">
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={10}
            required
          />
          <label>Phone</label>
          {!phoneValid && (
            <span className="error">Only Numbers are allowed</span>
          )}
          {touched.phone && !form.phone && (
            <span className="error">Phone is required</span>
          )}
        </div>

        <div className="field">
          <textarea
            name="message"
            rows="3"
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label>Message (optional)</label>
        </div>

        <button type="submit" disabled={!formValid}>
  Send Message
</button>
      {success && (
        <p className="success-message">
          Message sent successfully
        </p>
      )}


      </form>
    </div>
  );
}
