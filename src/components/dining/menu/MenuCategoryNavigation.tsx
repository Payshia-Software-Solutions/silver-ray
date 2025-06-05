
"use client";

import type { MenuCategoryType } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';

interface MenuCategoryNavigationProps {
  categories: MenuCategoryType[];
  className?: string;
}

export function MenuCategoryNavigation({ categories, className }: MenuCategoryNavigationProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    categories.forEach(category => {
      sectionRefs.current[category.id] = document.getElementById(`category-${category.id}`);
    });

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Adjust to trigger when section is in middle of viewport
      threshold: 0.1, // How much of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace('category-', '');
          setActiveCategory(id);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs.current).forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionRefs.current).forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [categories]);

  const handleCategoryClick = (categoryId: string, event: React.MouseEvent) => {
    event.preventDefault();
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const yOffset = -120; // Offset to account for sticky header and nav bar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!categories || categories.length === 0) return null;

  return (
    <nav className={cn("sticky top-20 bg-background/90 backdrop-blur-sm py-3 shadow-sm z-30 border-b border-border", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2 -mb-2 no-scrollbar">
          {categories.map((category) => (
            <li key={category.id}>
              <Button
                asChild
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                className={cn(
                  "font-body rounded-full px-4 py-2 text-sm transition-all duration-200 whitespace-nowrap",
                  activeCategory === category.id ? "bg-primary text-primary-foreground" : "border-input hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <a
                  href={`#category-${category.id}`}
                  onClick={(e) => handleCategoryClick(category.id, e)}
                >
                  {category.name}
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; 
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
}
