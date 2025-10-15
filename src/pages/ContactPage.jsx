// src/components/Contact.jsx
const Contact = () => {
  return (
    <div className="app">
      {/* Hero bar (same as other pages) */}
      <div className="hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Reach out below!</p>
      </div>

      {/* Contact Content */}
      <div className="contact-container">
        <img
          src="https://i.pravatar.cc/200" // random person image placeholder
          alt="Contact"
          className="contact-image"
        />
        <a href="ykeme0086@launchpadphilly.org" className="contact-email"> 
            📧 ykeme0086@launchpadphilly.org
        </a>
      </div>
    </div>
  );
};

export default Contact;
