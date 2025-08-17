import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AdvancedParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles with GSAP
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 6 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.background = `linear-gradient(45deg, 
        hsl(${Math.random() * 60 + 260}, 80%, 60%), 
        hsl(${Math.random() * 60 + 180}, 80%, 60%))`;
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.opacity = '0';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.top = '100vh';

      container.appendChild(particle);

      // Animate particle
      const timeline = gsap.timeline({
        onComplete: () => {
          if (particle.parentNode) {
            particle.remove();
          }
        }
      });

      timeline
        .to(particle, {
          opacity: Math.random() * 0.8 + 0.2,
          duration: 2,
          ease: "power2.out"
        })
        .to(particle, {
          y: -(window.innerHeight + 100),
          x: `random(-100, 100)`,
          rotation: 360,
          duration: Math.random() * 15 + 10,
          ease: "none"
        }, 0)
        .to(particle, {
          opacity: 0,
          duration: 3,
          ease: "power2.in"
        }, "-=3");
    };

    // Create gradient orbs
    const createGradientOrb = () => {
      const orb = document.createElement('div');
      orb.style.position = 'absolute';
      orb.style.width = `${Math.random() * 200 + 100}px`;
      orb.style.height = orb.style.width;
      orb.style.background = `radial-gradient(circle at 30% 30%, 
        hsla(${Math.random() * 60 + 260}, 80%, 60%, 0.3) 0%, 
        hsla(${Math.random() * 60 + 180}, 80%, 60%, 0.1) 50%, 
        transparent 100%)`;
      orb.style.borderRadius = '50%';
      orb.style.pointerEvents = 'none';
      orb.style.filter = 'blur(2px)';
      orb.style.left = Math.random() * 100 + 'vw';
      orb.style.top = Math.random() * 100 + 'vh';

      container.appendChild(orb);

      // Float animation
      gsap.to(orb, {
        x: `random(-200, 200)`,
        y: `random(-200, 200)`,
        scale: `random(0.5, 1.5)`,
        duration: `random(20, 40)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Remove after some time
      setTimeout(() => {
        if (orb.parentNode) {
          gsap.to(orb, {
            opacity: 0,
            duration: 5,
            onComplete: () => orb.remove()
          });
        }
      }, Math.random() * 30000 + 30000);
    };

    // Create light streaks
    const createLightStreak = () => {
      const streak = document.createElement('div');
      streak.style.position = 'absolute';
      streak.style.width = '2px';
      streak.style.height = `${Math.random() * 100 + 50}px`;
      streak.style.background = `linear-gradient(180deg, 
        transparent 0%, 
        hsla(${Math.random() * 60 + 260}, 100%, 70%, 0.8) 50%, 
        transparent 100%)`;
      streak.style.pointerEvents = 'none';
      streak.style.left = Math.random() * 100 + 'vw';
      streak.style.top = '-100px';
      streak.style.filter = 'blur(1px)';

      container.appendChild(streak);

      gsap.to(streak, {
        y: window.innerHeight + 200,
        x: `random(-50, 50)`,
        duration: Math.random() * 3 + 2,
        ease: "power2.in",
        onComplete: () => {
          if (streak.parentNode) {
            streak.remove();
          }
        }
      });
    };

    // Create intervals for different particle types
    const particleInterval = setInterval(createParticle, 800);
    const orbInterval = setInterval(createGradientOrb, 15000);
    const streakInterval = setInterval(createLightStreak, 5000);

    // Initial orbs
    for (let i = 0; i < 3; i++) {
      setTimeout(createGradientOrb, i * 5000);
    }

    return () => {
      clearInterval(particleInterval);
      clearInterval(orbInterval);
      clearInterval(streakInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    />
  );
}