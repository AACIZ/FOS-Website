export function Industries() {
  const industries = [
    { icon: "fas fa-tshirt", title: "Fashion & Retail", description: "Clothing, accessories, lifestyle brands" },
    { icon: "fas fa-heartbeat", title: "Healthcare", description: "Clinics, dental practices, wellness" },
    { icon: "fas fa-utensils", title: "Food & Hospitality", description: "Restaurants, cafes, hotels, events" },
    { icon: "fas fa-shopping-cart", title: "E-commerce", description: "Online stores, marketplaces, SaaS" },
    { icon: "fas fa-home", title: "Real Estate", description: "Agencies, property management" },
    { icon: "fas fa-dumbbell", title: "Fitness & Wellness", description: "Gyms, spas, personal training" },
    { icon: "fas fa-briefcase", title: "Professional Services", description: "Legal, consulting, financial" },
    { icon: "fas fa-graduation-cap", title: "Education", description: "Schools, courses, training" }
  ];

  return (
    <section id="industries" className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="font-orbitron font-bold text-4xl md:text-6xl gradient-text mb-6">
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We multiply impact across diverse industries, bringing specialized expertise to each sector.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <div 
              key={index}
              className="glassmorphism rounded-3xl p-8 text-center hover-depth transition-all duration-500 magnetic-hover group animate-scaleIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl mb-6 gradient-text group-hover:animate-pulse">
                <i className={industry.icon}></i>
              </div>
              <h3 className="font-orbitron font-bold text-lg mb-2 group-hover:gradient-text transition-all duration-300">
                {industry.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
