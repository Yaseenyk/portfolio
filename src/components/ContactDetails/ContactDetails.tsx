import React from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactDetails: React.FC = () => {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const messageRef = React.useRef<HTMLTextAreaElement>(null);

  const variants = {
    initial: {
      x: 3000,
    },
    animate: {
      x: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (nameRef.current && emailRef.current && messageRef.current) {
      const formData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        message: messageRef.current.value,
      };
      emailjs.send('service_lanm9zj', 'template_dyb1k4x', formData, 'mB56akvK2qStLNadU')
        .then((response) => {
          console.log('Email sent successfully:', response);
        })
        .catch((error) => {
          console.error('Email sending failed:', error);
        });
    }
  };

  return (
    <motion.div
      className="Form"
      variants={variants}
      initial="initial"
      animate="animate"
    >
      <h2>Contact Me!</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your Name" ref={nameRef} />
        <input type="email" placeholder="Enter your Email" ref={emailRef} />
        <textarea placeholder="Enter your Message" ref={messageRef}></textarea>
        <button type="submit">Submit Query!</button>
      </form>
    </motion.div>
  );
};

export default ContactDetails;
