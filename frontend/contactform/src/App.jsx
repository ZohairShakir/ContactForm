import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import ContactForm from "./components/ContactForm";
import ContactsList from "./components/ContactList";

export default function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <ContactForm />
      <ContactsList />
    </div>
  );
}

