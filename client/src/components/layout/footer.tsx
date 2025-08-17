export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="relative py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="font-orbitron font-bold text-2xl gradient-text mb-4">
              FiguringOut Solutions
            </div>
            <p className="text-gray-400 mb-6">
              We don't just market — we multiply your impact.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-purple-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-purple-400 hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-purple-400 hover:text-white transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">SEO Optimization</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Social Media Marketing</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Paid Advertising</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Brand Design</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Industries</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('industries')} className="hover:text-white transition-colors">Fashion & Retail</button></li>
              <li><button onClick={() => scrollToSection('industries')} className="hover:text-white transition-colors">Healthcare</button></li>
              <li><button onClick={() => scrollToSection('industries')} className="hover:text-white transition-colors">Food & Hospitality</button></li>
              <li><button onClick={() => scrollToSection('industries')} className="hover:text-white transition-colors">E-commerce</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-white transition-colors">Portfolio</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Careers</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FiguringOut Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
