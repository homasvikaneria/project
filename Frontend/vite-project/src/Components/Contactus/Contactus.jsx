// just_home/Frontend/vite-project/src/Components/Contactus/Contactus.jsx
// Frontend/vite-project/src/Components/Contactus/Contactus.jsx
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import "./Contactus.css"
import Mainnavbar from '../Mainnav/Mainnavbar';

function ContactForm() {
  const [state, handleSubmit] = useForm("movjogwo");
//   if (state.succeeded) {
//     return <p>Thanks for joining!</p>;
//   }

  return (
    <div>
        <Mainnavbar/>

    <form onSubmit={handleSubmit} className="contact-form">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        required
      />
      <ValidationError
        prefix="Name"
        field="name"
        errors={state.errors}
      />

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        name="email"
        required
      />
      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
      />

      <label htmlFor="phone">Phone Number</label>
      <input
        id="phone"
        type="tel"
        name="phone"
        placeholder="e.g., 123-456-7890"
      />
      <ValidationError
        prefix="Phone"
        field="phone"
        errors={state.errors}
      />



      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        required
      />
      <ValidationError
        prefix="Message"
        field="message"
        errors={state.errors}
      />

      <button type="submit" disabled={state.submitting} className="submit-button">
        Submit
      </button>
    </form>
    </div>
  );
}

export default ContactForm;
