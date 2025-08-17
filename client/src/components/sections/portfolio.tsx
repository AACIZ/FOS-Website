export function Portfolio() {
  const projects = [
    {
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      category: "Food & Hospitality",
      growth: "300% Growth",
      title: "Gourmet Bistro",
      description: "Transformed a local bistro into a regional dining destination through comprehensive digital marketing.",
      categoryColor: "purple"
    },
    {
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      category: "Healthcare",
      growth: "500% ROI",
      title: "MedCare Clinic",
      description: "Multiplied patient bookings through strategic SEO and targeted healthcare marketing campaigns.",
      categoryColor: "cyan"
    },
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      category: "Fashion",
      growth: "800% Online Sales",
      title: "Elite Fashion",
      description: "Elevated a boutique clothing store to e-commerce success with social media and influencer marketing.",
      categoryColor: "pink"
    },
    {
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      category: "E-commerce",
      growth: "1200% Revenue",
      title: "TechGear Pro",
      description: "Scaled an electronics startup to multi-million dollar revenue through performance marketing.",
      categoryColor: "blue"
    }
  ];

  const getCategoryColorClass = (color: string) => {
    const colors = {
      purple: "bg-purple-500/20 text-purple-300",
      cyan: "bg-cyan-500/20 text-cyan-300",
      pink: "bg-pink-500/20 text-pink-300",
      blue: "bg-blue-500/20 text-blue-300"
    };
    return colors[color as keyof typeof colors] || "bg-purple-500/20 text-purple-300";
  };

  const getGrowthColorClass = (color: string) => {
    const colors = {
      purple: "bg-blue-500/20 text-blue-300",
      cyan: "bg-green-500/20 text-green-300",
      pink: "bg-purple-500/20 text-purple-300",
      blue: "bg-cyan-500/20 text-cyan-300"
    };
    return colors[color as keyof typeof colors] || "bg-blue-500/20 text-blue-300";
  };

  return (
    <section id="portfolio" className="relative py-20 reveal-section split-scroll">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl md:text-6xl gradient-reveal mb-6">
            Portfolio
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how we've multiplied impact for businesses across various industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="stagger-item group relative glassmorphism-strong rounded-3xl overflow-hidden hover-depth transition-all duration-700 magnetic-enhanced"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-500/30 to-blue-500/30 relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColorClass(project.categoryColor)}`}>
                    {project.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getGrowthColorClass(project.categoryColor)}`}>
                    {project.growth}
                  </span>
                </div>
                <h3 className="font-orbitron font-bold text-2xl mb-3 group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {project.description}
                </p>
                <button className="text-purple-400 font-semibold hover:text-white transition-colors group">
                  View Case Study <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
