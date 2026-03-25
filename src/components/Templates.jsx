import React from 'react';

const Templates = () => {
  const templates = [
    {
      id: 1,
      image: '/public/template1.png', // Replace with actual image paths
      title: 'Modern Business',
      description: 'A sleek and modern template perfect for startups and businesses.',
    },
    {
      id: 2,
      image: '/public/template2.png',
      title: 'Creative Portfolio',
      description: 'Showcase your work with this vibrant and creative portfolio template.',
    },
    {
      id: 3,
      image: '/public/template3.png',
      title: 'E-Commerce Store',
      description: 'An elegant template designed for online stores and shops.',
    },
    {
      id: 4,
      image: '/public/template4.png',
      title: 'Personal Blog',
      description: 'A clean and minimal template for bloggers and writers.',
    },
  ];

  return (
    <section className="templates-section py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="template-card bg-white shadow-md rounded-lg overflow-hidden">
              <img src={template.image} alt={template.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
                <p className="text-gray-600">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;