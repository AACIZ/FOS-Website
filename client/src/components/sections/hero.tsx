export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      {/* Animated Background Blob */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="morphing-blob absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl"></div>
        <div className="morphing-blob absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-3xl" style={{ animationDelay: '-2s' }}></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6 animate-fadeInUp">
        <h1 className="font-orbitron font-black text-4xl md:text-8xl leading-tight mb-8">
          <span className="gradient-text text-shadow-glow">FIGURING</span><br />
          <span className="text-white">OUT</span><br />
          <span className="gradient-text text-shadow-glow">SOLUTIONS</span>
        </h1>
        
        <div className="glassmorphism rounded-2xl p-8 mb-12 magnetic-hover animate-scaleIn">
          <p className="text-xl md:text-3xl font-light text-gray-300 mb-6">
            We don't just market —
          </p>
          <p className="text-2xl md:text-4xl font-bold gradient-text">
            we multiply your impact.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button 
            onClick={() => scrollToSection('contact')}
            className="glassmorphism px-8 py-4 rounded-full font-semibold hover-depth transition-all duration-300 magnetic-hover"
          >
            <i className="fas fa-rocket mr-2"></i>
            Start Your Journey
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="border border-purple-500 px-8 py-4 rounded-full font-semibold hover:bg-purple-500/20 transition-all duration-300 magnetic-hover"
          >
            <i className="fas fa-play mr-2"></i>
            Watch Our Story
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={() => scrollToSection('about')}>
            <i className="fas fa-chevron-down text-2xl text-purple-400"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
