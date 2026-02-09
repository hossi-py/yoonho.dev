"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 감지
  useEffect(() => {
    const mainElement = document.querySelector("main");
    if (!mainElement) return;

    const toggleVisibility = () => {
      // 300px 이상 내려갔을 때 표시
      if (mainElement.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    mainElement.addEventListener("scroll", toggleVisibility);

    return () => {
      mainElement.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const mainElement = document.querySelector("main");
    mainElement?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-300 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <Button
          onClick={scrollToTop}
          size="icon"
          className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 dark:shadow-blue-900/40 hover:-translate-y-1 transition-all duration-300"
          aria-label="맨 위로 스크롤"
        >
          <ArrowUp className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
}
