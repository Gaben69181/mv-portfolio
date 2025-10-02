import React, { useState, useEffect } from 'react';
import './Contact.css';
import { useTheme } from '../hooks/useTheme.js';
import emailjs from '@emailjs/browser';
const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      try {
        emailjs.init(publicKey);
      } catch (e) {
        console.error('EmailJS init error:', e);
      }
    } else {
      console.warn('EmailJS public key missing');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // const copyDiscord = async () => {
  //   try {
  //     await navigator.clipboard.writeText('itsrynix');
  //     setNotice('Discord handle copied to clipboard');
  //     setTimeout(() => setNotice(null), 2000);
  //   } catch (err) {
  //     console.error('Clipboard error:', err);
  //     setNotice('Unable to copy Discord handle');
  //     setTimeout(() => setNotice(null), 2000);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setNotice(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateIdOwner = import.meta.env.VITE_EMAILJS_TEMPLATEOWNER_ID;
    const templateIdClient = import.meta.env.VITE_EMAILJS_TEMPLATECLIENT_ID;

    // EmailJS is initialized in useEffect with the public key

    // Guard: ensure EmailJS config is present
    if (!serviceId || !templateIdOwner || !templateIdClient) {
      console.error('EmailJS config missing', {
        serviceIdPresent: !!serviceId,
        templateIdOwnerPresent: !!templateIdOwner,
        templateIdClientPresent: !!templateIdClient
      });
      setNotice('Email service not configured. Please try again later.');
      setSending(false);
      return;
    }

    try {
      // Send email to site owner
      await emailjs.send(
        serviceId,
        templateIdOwner,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_email: 'itsrynix@gmail.com'
        }
      );

      // Send auto-reply to client
      await emailjs.send(
        serviceId,
        templateIdClient,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_name: formData.name,
          to_email: formData.email
        }
      );

      setNotice('Message sent. Thank you!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setNotice('Failed to send. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`contact-section section-tone-footer ${theme}`} id="contact">
      <div className="container">
        <h2 className={`section-title ${theme}`}>Let's Work Together</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3 className={theme}>Get In Touch</h3>

            <div className="contact-method">
              <h4 className={theme}>Email</h4>
              <p className={theme}>
                <a href="mailto:itsrynix@gmail.com">itsrynix@gmail.com</a>
              </p>
            </div>

            <div className="contact-method">
              <h4 className={theme}>Twitter/X</h4>
              <p className={theme}>
                <a href="https://x.com/its_rynix" target="_blank" rel="noopener noreferrer">@its_rynix</a>
              </p>
            </div>

            <div className="contact-method">
              <h4 className={theme}>Instagram</h4>
              <p className={theme}>
                <a href="https://instagram.com/rynix.ae" target="_blank" rel="noopener noreferrer">rynix.ae</a>
              </p>
            </div>

            <div className="contact-method">
              <h4 className={theme}>Discord</h4>
              <p className={theme}>
                <a href="https://discord.com/users/374153451510431745" target="_blank" rel="noopener noreferrer">itsrynix</a>
              </p>
            </div>

            <div className="contact-method">
              <h4 className={theme}>VGen</h4>
              <p className={theme}>
                <a href="https://vgen.co/Rynix" target="_blank" rel="noopener noreferrer">Rynix</a>
              </p>
            </div>
          </div>
          <form className={`contact-form ${theme}`} onSubmit={handleSubmit}>
            {notice && <div className={`form-notice ${theme}`}>{notice}</div>}
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={theme}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={theme}
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className={theme}
              ></textarea>
            </div>
            <button type="submit" className={`submit-btn ${theme}`} disabled={sending} aria-disabled={sending}>{sending ? 'Sending...' : 'Send Message'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;