export function About() {
  return (
    <section id="about" className="relative py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fadeInUp">
            <h2 className="font-orbitron font-bold text-4xl md:text-6xl gradient-text mb-8">
              About Us
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                We're not your typical marketing agency. We're digital alchemists, transforming local businesses into industry leaders through innovative strategies and cutting-edge technology.
              </p>
              <p>
                Our mission is simple: <span className="gradient-text font-semibold">empower businesses to expand their reach, amplify their presence, and thrive in the digital age.</span>
              </p>
              <p>
                From clothing boutiques to healthcare practices, from food & hospitality to e-commerce giants – we multiply impact across every industry.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="glassmorphism rounded-xl p-6 text-center hover-depth transition-all duration-300 magnetic-hover">
                <div className="text-3xl font-bold gradient-text">500+</div>
                <div className="text-sm text-gray-400">Clients Served</div>
              </div>
              <div className="glassmorphism rounded-xl p-6 text-center hover-depth transition-all duration-300 magnetic-hover">
                <div className="text-3xl font-bold gradient-text">10x</div>
                <div className="text-sm text-gray-400">Average Growth</div>
              </div>
              <div className="glassmorphism rounded-xl p-6 text-center hover-depth transition-all duration-300 magnetic-hover">
                <div className="text-3xl font-bold gradient-text">5</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-scaleIn">
            {/* Modern abstract geometric design representing growth */}
            <div className="relative w-full h-96 glassmorphism rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30"></div>
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-60 animate-float"></div>
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full opacity-60 animate-float" style={{ animationDelay: '-2s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <i className="fas fa-chart-line text-6xl gradient-text"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
