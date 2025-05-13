// src/components/Contact.jsx
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState(''); // To show submission status

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Submitting...');

    // IMPORTANT: Replace 'YOUR_FORMSPREE_ENDPOINT_HERE' with your actual Formspree endpoint URL
    // You get this after creating a new form on formspree.io
    const formspreeEndpoint = 'https://formspree.io/f/xyzwbdrl'; // Example: 'https://formspree.io/f/xqkrygqb'

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        const data = await response.json();
        if (data.errors) {
          setFormStatus(data.errors.map(error => error.message).join(', '));
        } else {
          setFormStatus('Oops! There was a problem submitting your form.');
        }
      }
    } catch (error) {
      setFormStatus('Oops! There was a problem submitting your form.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <section id="contact" className="py-16 px-6 bg-gray-100 dark:bg-black text-gray-800 dark:text-offWhite">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-center font-canarias">
          Get In Touch
        </h2>
        <p className="text-center mb-8 text-gray-600 dark:text-gray-300">
          Have a project in mind, a question, or just want to say hi? Feel free to reach out!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 dark:focus:ring-tealGreen focus:border-indigo-500 dark:focus:border-tealGreen sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 dark:focus:ring-tealGreen focus:border-indigo-500 dark:focus:border-tealGreen sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 dark:focus:ring-tealGreen focus:border-indigo-500 dark:focus:border-tealGreen sm:text-sm"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-tealGreen hover:bg-tealGreen-dark dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tealGreen-dark dark:focus:ring-purple-700 transition duration-150 ease-in-out"
            >
              Send Message
            </button>
          </div>
        </form>

        {formStatus && (
          <p className={`mt-4 text-center text-sm ${formStatus.includes('successfully') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {formStatus}
          </p>
        )}
      </div>
    </section>
  );
}