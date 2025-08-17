import { useEffect, useRef } from 'react';

export function SmoothScroll() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollY = 0;
    let requestId: number;

    const updateScroll = () => {
      const target = window.pageYOffset || document.documentElement.scrollTop;
      scrollY += (target - scrollY) * 0.1;
      
      if (scrollerRef.current) {
        scrollerRef.current.style.transform = `translateY(-${scrollY}px)`;
      }
      
      requestId = requestAnimationFrame(updateScroll);
    };

    updateScroll();

    return () => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
    };
  }, []);

  return (
    <div
      ref={scrollerRef}
      className="smooth-scroll-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        willChange: 'transform',
        pointerEvents: 'none'
      }}
    >
      {/* This will wrap around the main content */}
    </div>
  );
}

export function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <div className="smooth-scroll-content">
          {children}
        </div>
      </div>
    </div>
  );
}