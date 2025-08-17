import { useEffect } from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Services } from '@/components/sections/services';
import { Portfolio } from '@/components/sections/portfolio';
import { Industries } from '@/components/sections/industries';
import { Contact } from '@/components/sections/contact';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { ScrollIndicator } from '@/components/ui/scroll-indicator';
import { Particles } from '@/components/ui/particles';

export default function Home() {
  useEffect(() => {
    // Add FontAwesome CSS
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesome);

    // Set page title and meta description
    document.title = 'FiguringOut Solutions - We Don\'t Just Market, We Multiply Your Impact';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Transform your business with FiguringOut Solutions. We multiply your digital impact through innovative marketing strategies, SEO, social media, and cutting-edge technology.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Transform your business with FiguringOut Solutions. We multiply your digital impact through innovative marketing strategies, SEO, social media, and cutting-edge technology.';
      document.head.appendChild(meta);
    }

    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'FiguringOut Solutions - Digital Marketing Agency' },
      { property: 'og:description', content: 'We don\'t just market — we multiply your impact. Transform your business with our innovative digital marketing strategies.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630' }
    ];

    ogTags.forEach(tag => {
      const existing = document.querySelector(`meta[property="${tag.property}"]`);
      if (!existing) {
        const meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        meta.content = tag.content;
        document.head.appendChild(meta);
      }
    });

    return () => {
      document.head.removeChild(fontAwesome);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden">
      <CustomCursor />
      <ScrollIndicator />
      <Particles />
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Industries />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
