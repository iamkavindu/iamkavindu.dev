"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <Button
        isIconOnly
        color="primary"
        variant="shadow"
        radius="full"
        className="w-12 h-12 bg-primary text-primary-foreground"
        aria-label="Scroll to top"
        onPress={scrollToTop}
      >
        <ArrowUp size={24} />
      </Button>
    </div>
  );
}
