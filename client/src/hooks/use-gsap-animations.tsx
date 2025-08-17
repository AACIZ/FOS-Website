import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Dynamically import and register ScrollTrigger for better compatibility
let ScrollTrigger: any = null;

if (typeof window !== 'undefined') {
  import('gsap/ScrollTrigger').then((module) => {
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  });
}

export function useGSAPAnimations() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current || !ScrollTrigger) return;
    
    const timer = setTimeout(() => {
      if (!ScrollTrigger) return;
      
      isInitialized.current = true;

      // Set up GSAP animations with ScrollTrigger
      gsap.set("body", { visibility: "visible" });

    // Hero text morphing animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      gsap.fromTo(heroTitle, 
        { scale: 0.8, opacity: 0, rotationX: -15 },
        { 
          scale: 1, 
          opacity: 1, 
          rotationX: 0,
          duration: 2,
          ease: "power3.out",
          delay: 0.5
        }
      );
    }

    // Parallax background elements
    gsap.utils.toArray('.parallax-bg').forEach((element: any) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Reveal animations for sections
    gsap.utils.toArray('.reveal-section').forEach((section: any) => {
      gsap.fromTo(section, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Stagger animation for cards
    gsap.utils.toArray('.stagger-item').forEach((item: any, index: number) => {
      gsap.fromTo(item,
        { y: 60, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Enhanced magnetic hover effects
    gsap.utils.toArray('.magnetic-enhanced').forEach((element: any) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(element, {
          x: x * 0.3,
          y: y * 0.3,
          rotation: x * 0.1,
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

    // Gradient text reveal on scroll
    gsap.utils.toArray('.gradient-reveal').forEach((text: any) => {
      gsap.fromTo(text,
        { backgroundPosition: "0% 50%" },
        {
          backgroundPosition: "100% 50%",
          duration: 2,
          ease: "none",
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true
          }
        }
      );
    });

    // Floating elements animation
    gsap.utils.toArray('.float-element').forEach((element: any, index: number) => {
      gsap.to(element, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5
      });
    });

      // Refresh ScrollTrigger after setup
      if (ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
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
      const currentText = texts[currentIndex];
      const nextText = texts[nextIndex];

      // Create morphing effect
      gsap.to(element, {
        duration: 0.3,
        opacity: 0,
        y: -20,
        ease: "power2.in",
        onComplete: () => {
          element.textContent = nextText;
          gsap.to(element, {
            duration: 0.3,
            opacity: 1,
            y: 0,
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