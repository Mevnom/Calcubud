// ContactPage.jsx
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import emailjs from '@emailjs/browser';
import './Contact.css';
import Header from '../Header';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_pi8k6io', 'template_x4hcr2g', form.current, 'ytEB6oEPHjw2hdirK')
            .then(() => alert('Message sent!'))
            .catch(() => alert('Failed to send message.'));
    };

    return (<div><Header />
        <div className="contact-page">
            <h1>Contact Us</h1>
            <br />
            <div className="socials">
                <a href="https://instagram.com/yagboyajumukhtar" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
                <a href="https://linkedin.com/in/mukhtar-yagboyaju-8255a4304" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
                <a href="https://twitter.com/YagboyajuM" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
                <a href="https://facebook.com/yagboyajumukhtar" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
                <a href="https://wa.me/+2348125617036" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} size="2x" /></a>
                <a href="mailto:yagboyajumukhtar@gmail.com"><FontAwesomeIcon icon={faEnvelope} size="2x" /></a>
                <a href="https://github.com/mevnom" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>

            </div>

            <h2>or</h2>
            <br />
            <form ref={form} onSubmit={sendEmail} className="contact-form">
                <input type="text" name="user_name" placeholder="Your Name" required />
                <input type="email" name="user_email" placeholder="Your Email" required />
                <textarea name="message" placeholder="Your Message" required rows="5"></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    </div>
    );
};

export default Contact;
