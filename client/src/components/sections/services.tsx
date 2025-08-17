export function Services() {
  const services = [
    {
      icon: "fas fa-search",
      title: "SEO Optimization",
      description: "Dominate search results and multiply your organic visibility with our advanced SEO strategies."
    },
    {
      icon: "fas fa-bullhorn",
      title: "Social Media Marketing",
      description: "Build engaged communities and multiply your social presence across all platforms."
    },
    {
      icon: "fas fa-ad",
      title: "Paid Advertising",
      description: "Multiply your ROI with precision-targeted campaigns across Google, Facebook, and beyond."
    },
    {
      icon: "fas fa-palette",
      title: "Brand Design",
      description: "Create memorable brand identities that multiply your recognition and customer loyalty."
    },
    {
      icon: "fas fa-code",
      title: "Web Development",
      description: "Build high-performance websites that multiply conversions and user engagement."
    },
    {
      icon: "fas fa-chart-bar",
      title: "Analytics & Insights",
      description: "Multiply your understanding with deep analytics and actionable business insights."
    }
  ];

  return (
    <section id="services" className="relative py-20 reveal-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl md:text-6xl gradient-reveal mb-6">
            What We Do
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We offer a comprehensive suite of digital marketing services designed to multiply your business impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="stagger-item glassmorphism-strong rounded-3xl p-8 hover-depth transition-all duration-500 magnetic-enhanced group"
            >
              <div className="text-4xl mb-6 gradient-text">
                <i className={service.icon}></i>
              </div>
              <h3 className="font-orbitron font-bold text-2xl mb-4 group-hover:gradient-text transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-gray-300 mb-6">
                {service.description}
              </p>
              <button className="text-purple-400 font-semibold hover:text-white transition-colors group">
                Learn More <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
