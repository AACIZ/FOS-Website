import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useSimpleAnimations() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Set body visible
    gsap.set("body", { visibility: "visible" });

    // Hero title animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      gsap.fromTo(heroTitle, 
        { scale: 0.8, opacity: 0, y: 50 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.5
        }
      );
    }

    // Enhanced magnetic hover effects
    const magneticElements = document.querySelectorAll('.magnetic-enhanced');
    magneticElements.forEach((element: any) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(element, {
          x: x * 0.2,
          y: y * 0.2,
          rotation: x * 0.05,
          duration: 0.6,
          ease: "power3.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        });
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Floating elements animation
    const floatElements = document.querySelectorAll('.float-element');
    floatElements.forEach((element: any, index: number) => {
      gsap.to(element, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5
      });
    });

    // Stagger animation for cards
    const staggerItems = document.querySelectorAll('.stagger-item');
    staggerItems.forEach((item: any, index: number) => {
      gsap.fromTo(item,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out"
        }
      );
    });

    // Reveal sections on scroll (using intersection observer)
    const revealSections = document.querySelectorAll('.reveal-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target, 
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out"
            }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealSections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}

export function useTextMorphing(targetRef: React.RefObject<HTMLElement>, texts: string[]) {
  useEffect(() => {
    if (!targetRef.current || texts.length === 0) return;

    let currentIndex = 0;
    const element = targetRef.current;

    const morphText = () => {
      const nextIndex = (currentIndex + 1) % texts.length;
      const nextText = texts[nextIndex];

      // Create morphing effect
      gsap.to(element, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        scale: 0.95,
        ease: "power2.in",
        onComplete: () => {
          element.textContent = nextText;
          gsap.to(element, {
            duration: 0.4,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out"
          });
        }
      });

      currentIndex = nextIndex;
    };

    const interval = setInterval(morphText, 3000);
    return () => clearInterval(interval);
  }, [targetRef, texts]);
}