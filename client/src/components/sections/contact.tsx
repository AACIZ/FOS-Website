import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ContactForm {
  name: string;
  email: string;
  business: string;
  service: string;
  message: string;
}

export function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    business: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you soon!",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        business: '',
        service: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="font-orbitron font-bold text-4xl md:text-6xl gradient-text mb-6">
            Let's Multiply Your Impact
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your business? Get in touch and let's start your journey to digital dominance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="animate-scaleIn">
            <div className="glassmorphism rounded-3xl p-8 mb-8">
              <h3 className="font-orbitron font-bold text-2xl gradient-text mb-6">Get Started Today</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name *" 
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
                    required
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email *" 
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
                    required
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    name="business"
                    value={formData.business}
                    onChange={handleInputChange}
                    placeholder="Your Business" 
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
                  />
                </div>
                <div>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  >
                    <option value="">Select Service</option>
                    <option value="seo">SEO Optimization</option>
                    <option value="social">Social Media Marketing</option>
                    <option value="ads">Paid Advertising</option>
                    <option value="branding">Brand Design</option>
                    <option value="web">Web Development</option>
                    <option value="analytics">Analytics & Insights</option>
                  </select>
                </div>
                <div>
                  <textarea 
                    rows={4} 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project... *" 
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full glassmorphism py-4 rounded-xl font-semibold hover-depth transition-all duration-300 magnetic-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className={`${isSubmitting ? 'fas fa-spinner animate-spin' : 'fas fa-paper-plane'} mr-2`}></i>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-8 animate-fadeInUp">
            <div className="glassmorphism rounded-3xl p-8">
              <h3 className="font-orbitron font-bold text-2xl gradient-text mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center">
                    <i className="fas fa-envelope text-purple-400"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-400">hello@figuringoutsolutions.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center">
                    <i className="fas fa-phone text-purple-400"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-400">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-purple-400"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-gray-400">San Francisco, CA</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glassmorphism rounded-3xl p-8">
              <h3 className="font-orbitron font-bold text-2xl gradient-text mb-6">Follow Us</h3>
              
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center hover-depth transition-all duration-300 magnetic-hover">
                  <i className="fab fa-linkedin text-purple-400"></i>
                </a>
                <a href="#" className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center hover-depth transition-all duration-300 magnetic-hover">
                  <i className="fab fa-twitter text-purple-400"></i>
                </a>
                <a href="#" className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center hover-depth transition-all duration-300 magnetic-hover">
                  <i className="fab fa-instagram text-purple-400"></i>
                </a>
                <a href="#" className="w-12 h-12 glassmorphism rounded-full flex items-center justify-center hover-depth transition-all duration-300 magnetic-hover">
                  <i className="fab fa-facebook text-purple-400"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
