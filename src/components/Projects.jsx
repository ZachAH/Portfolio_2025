export default function Projects() {
    return (
      <section id="projects" className="py-16 px-6 bg-gray-50">
        <h3 className="text-2xl font-semibold mb-8 text-center">Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Replace these with real projects later */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-lg font-medium mb-2">Project Title</h4>
            <p className="text-sm text-gray-600">Short description of the project.</p>
          </div>
        </div>
      </section>
    );
  }
  