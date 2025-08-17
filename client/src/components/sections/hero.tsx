import { useRef } from 'react';
import { useTextMorphing } from '../../hooks/use-simple-animations';

export function Hero() {
  const morphingTextRef = useRef<HTMLParagraphElement>(null);
  const morphingTexts = [
    "we multiply your impact.",
    "we amplify your presence.",
    "we accelerate your growth.",
    "we transform your business.",
  ];

  useTextMorphing(morphingTextRef, morphingTexts);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="parallax-bg morphing-blob absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-3xl float-element"></div>
        <div className="parallax-bg morphing-blob absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 blur-3xl float-element" style={{ animationDelay: '-2s' }}></div>
        <div className="parallax-bg absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 rounded-full blur-2xl float-element" style={{ animationDelay: '-4s' }}></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <h1 className="hero-title font-orbitron font-black text-4xl md:text-8xl leading-tight mb-8">
          <span className="gradient-text text-shadow-glow">FIGURING</span><br />
          <span className="text-white">OUT</span><br />
          <span className="gradient-text text-shadow-glow">SOLUTIONS</span>
        </h1>
        
        <div className="glassmorphism-strong rounded-3xl p-8 mb-12 magnetic-enhanced hover-depth">
          <p className="text-xl md:text-3xl font-light text-gray-300 mb-6">
            We don't just market —
          </p>
          <p 
            ref={morphingTextRef}
            className="text-2xl md:text-4xl font-bold gradient-text morphing-text"
          >
            we multiply your impact.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button 
            onClick={() => scrollToSection('contact')}
            className="glassmorphism-strong px-8 py-4 rounded-full font-semibold hover-depth transition-all duration-500 magnetic-enhanced group"
          >
            <i className="fas fa-rocket mr-2 group-hover:animate-bounce"></i>
            Start Your Journey
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="border-2 border-purple-500/50 px-8 py-4 rounded-full font-semibold hover:bg-purple-500/20 transition-all duration-500 magnetic-enhanced group glassmorphism"
          >
            <i className="fas fa-play mr-2 group-hover:animate-pulse"></i>
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
