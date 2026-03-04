'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after the user scrolls down in the main container.
  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    const toggleVisibility = () => {
      setIsVisible(mainElement.scrollTop > 300);
    };

    mainElement.addEventListener('scroll', toggleVisibility);

    return () => {
      mainElement.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const mainElement = document.querySelector('main');
    mainElement?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transform transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="h-12 w-12 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 dark:shadow-blue-900/40"
        aria-label="맨 위로 스크롤"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </div>
  );
}
