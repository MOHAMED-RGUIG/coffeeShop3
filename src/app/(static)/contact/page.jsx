"use client"
import React, { useState } from 'react';
import styles from './page.module.css';

export default function Contact() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullname, email, message }),
    });
    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);
  };

  return (
    <div className="container mt-4 col-12 mx-auto col-xl-12 shadow-lg p-3 mb-5 bg-white rounded">
      <form onSubmit={handleSubmit} className={`col-12 col-md-12  mx-auto  ${styles.contactForm}`}>
       
        <div className="mb-3 col-12 col-md-12 mx-auto"> <h1 className={styles.title}>Contact</h1>
          <label htmlFor="fullname" className="form-label  col-6 col-md-6">Full Name:</label>
          <input
            type="text"
            id="fullname"
            className="form-control  col-12 col-md-12"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            required
          />
        </div>

        <div className="mb-3  col-12 col-md-12 mx-auto">
          <label htmlFor="email" className="form-label  col-6 col-md-6">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control col-12 col-md-12"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="mb-3 col-12 col-md-12 mx-auto">
          <label htmlFor="message" className="form-label col-xs-6 col-6 col-md-6">Message:</label>
          <textarea
            id="message"
            className="form-control form-label col-12 col-md-12"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            required
          ></textarea><button type="submit" className={`btn btn-primary mx-auto ${styles.submitButton}`}>
          Send
        </button>
        </div>

        
      </form>

      {error && (
        <div className={`alert ${success ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
