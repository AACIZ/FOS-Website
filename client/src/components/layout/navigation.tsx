import { useState } from 'react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-orbitron font-bold text-xl gradient-text">
            FiguringOut
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-purple-400 transition-colors magnetic-hover"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-purple-400 transition-colors magnetic-hover"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-purple-400 transition-colors magnetic-hover"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="hover:text-purple-400 transition-colors magnetic-hover"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-purple-400 transition-colors magnetic-hover"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 glassmorphism rounded-xl p-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left hover:text-purple-400 transition-colors py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left hover:text-purple-400 transition-colors py-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-left hover:text-purple-400 transition-colors py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-left hover:text-purple-400 transition-colors py-2"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left hover:text-purple-400 transition-colors py-2"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
