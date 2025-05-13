// src/components/Contact.jsx
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Submitting...');
    const formspreeEndpoint = 'https://formspree.io/f/xyzwbdrl'; // Your Formspree endpoint

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
        // ... (error handling as before) ...
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
    <section
      id="contact"
      // Light mode: semi-transparent dark card on particle bg (as before)
      // Dark mode: section itself is transparent to show html.dark background (rock.png + rain)
      className="py-16 px-6 bg-transparent text-offWhite"
    >
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-center font-canarias text-offWhite">
          {/* Heading text color always offWhite */}
          Get In Touch
        </h2>
        <p className="text-center mb-8 text-gray-300">
          {/* Sub-heading text color consistent */}
          Have a project in mind, a question, or just want to say hi? Feel free to reach out!
        </p>

        {/* Form Styling:
            - Light Mode: Has a semi-transparent dark card with backdrop blur.
            - Dark Mode: The card wrapper becomes transparent. Inputs get subtle borders.
        */}
        <div
          className="bg-black/60 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-xl
                     dark:bg-transparent dark:backdrop-blur-none dark:shadow-none dark:p-0" // Remove card appearance for dark mode
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                Full Name
              </label>
              <input
                type="text" name="name" id="name" value={formData.name} onChange={handleChange} required
                className="mt-1 block w-full px-3 py-2 sm:text-sm rounded-md shadow-sm
                           text-offWhite placeholder-gray-400 
                           bg-gray-700/50 border border-gray-600/70 focus:ring-tealGreen focus:border-tealGreen 
                           dark:bg-transparent dark:border-purple-500/50 dark:focus:border-purple-400 dark:focus:ring-purple-400
                           focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                Email Address
              </label>
              <input
                type="email" name="email" id="email" value={formData.email} onChange={handleChange} required
                className="mt-1 block w-full px-3 py-2 sm:text-sm rounded-md shadow-sm
                           text-offWhite placeholder-gray-400
                           bg-gray-700/50 border border-gray-600/70 focus:ring-tealGreen focus:border-tealGreen
                           dark:bg-transparent dark:border-purple-500/50 dark:focus:border-purple-400 dark:focus:ring-purple-400
                           focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
                Message
              </label>
              <textarea
                name="message" id="message" rows="4" value={formData.message} onChange={handleChange} required
                className="mt-1 block w-full px-3 py-2 sm:text-sm rounded-md shadow-sm
                           text-offWhite placeholder-gray-400
                           bg-gray-700/50 border border-gray-600/70 focus:ring-tealGreen focus:border-tealGreen
                           dark:bg-transparent dark:border-purple-500/50 dark:focus:border-purple-400 dark:focus:ring-purple-400
                           focus:outline-none"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
                           text-white bg-tealGreen hover:bg-opacity-80 
                           dark:text-white dark:bg-purple-600 dark:hover:bg-purple-700 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 
                           focus:ring-offset-gray-800 dark:focus:ring-offset-black 
                           focus:ring-tealGreen dark:focus:ring-purple-500 
                           transition duration-150 ease-in-out"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {formStatus && (
          <p className={`mt-6 text-center text-sm ${formStatus.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
            {/* Status message color consistent for both modes */}
            {formStatus}
          </p>
        )}
      </div>
    </section>
  );
}