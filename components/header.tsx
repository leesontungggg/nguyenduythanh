/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import * as React from "react";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function Header() {
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  return (
    <div>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
            : "bg-transparent text-white"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a
            className="text-2xl font-bold uppercase tracking-wider leading-6"
            href="/"
          >
            NGUYEN
            <br />
            DUY
            <br />
            THANH
          </a>
          <div className="hidden md:flex space-x-6 uppercase text-sm tracking-wider">
            <a
              href="/works"
              className="hover:text-gray-600 dark:hover:text-gray-300"
            >
              Works
            </a>
            <a
              href="/tour"
              className="hover:text-gray-600 dark:hover:text-gray-300"
            >
              Tour
            </a>
            <a
              href="/about"
              className="hover:text-gray-600 dark:hover:text-gray-300"
            >
              About
            </a>
            <a
              href="/news"
              className="hover:text-gray-600 dark:hover:text-gray-300"
            >
              News
            </a>
            <a
              href="/contact"
              className="hover:text-gray-600 dark:hover:text-gray-300"
            >
              Contact
            </a>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold uppercase tracking-wider">
              NGUYEN
              <br />
              DUY
              <br />
              THANH
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 space-y-8 text-2xl uppercase tracking-wider">
            <a
              href="/works"
              className="hover:text-gray-600 dark:hover:text-gray-300"
            >
              Works
            </a>
            <a
              href="/tour"
              className="hover:text-gray-600 dark:hover:text-gray-300"
            >
              Tour
            </a>
            <a
              href="/about"
              className="hover:text-gray-600 dark:hover:text-gray-300"
            >
              About
            </a>
            <a
              href="/news"
              className="hover:text-gray-600 dark:hover:text-gray-300"
            >
              News
            </a>
            <a
              href="/contact"
              className="hover:text-gray-600 dark:hover:text-gray-300"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
