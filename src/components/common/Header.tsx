import React, { useState, useEffect } from 'react';
import { Search, User, Menu, X, ShoppingBag, Heart, Bell } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#" 
              className="flex items-center space-x-2 group"
              aria-label="SwapSoul - Community Clothing Exchange"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                <ShoppingBag className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <span className="heading-5 text-[var(--color-primary)] hidden sm:block">
                SwapSoul
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation">
            <a 
              href="#browse" 
              className="body-base text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors duration-200 relative group"
            >
              Browse
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#categories" 
              className="body-base text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors duration-200 relative group"
            >
              Categories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#community" 
              className="body-base text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors duration-200 relative group"
            >
              Community
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#sustainability" 
              className="body-base text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors duration-200 relative group"
            >
              Sustainability
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search for clothes, brands, or styles..."
                className="w-full pl-10 pr-4 py-2 border border-[var(--color-gray-200)] rounded-full bg-[var(--color-gray-50)] focus:bg-white focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all duration-200"
                aria-label="Search for items"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-gray-400)]" />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Mobile */}
            <button 
              className="md:hidden p-2 text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button 
              className="hidden sm:block p-2 text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors duration-200 relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-error)] rounded-full"></span>
            </button>

            {/* Favorites */}
            <button 
              className="hidden sm:block p-2 text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors duration-200"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5" />
            </button>

            {/* User Menu */}
            <button 
              className="flex items-center space-x-2 p-2 text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors duration-200"
              aria-label="User menu"
            >
              <User className="w-5 h-5" />
              <span className="hidden lg:block body-sm">Account</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Search for clothes..."
              className="w-full pl-10 pr-4 py-2 border border-[var(--color-gray-200)] rounded-full bg-[var(--color-gray-50)] focus:bg-white focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all duration-200"
              aria-label="Search for items"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-gray-400)]" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`lg:hidden bg-white border-t border-[var(--color-gray-200)] transition-all duration-300 ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="px-4 py-4 space-y-4" role="navigation">
          <a 
            href="#browse" 
            className="block body-base text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Browse Items
          </a>
          <a 
            href="#categories" 
            className="block body-base text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Categories
          </a>
          <a 
            href="#community" 
            className="block body-base text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Community
          </a>
          <a 
            href="#sustainability" 
            className="block body-base text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Sustainability
          </a>
          <div className="pt-4 border-t border-[var(--color-gray-200)]">
            <a 
              href="#notifications" 
              className="flex items-center space-x-2 py-2 text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </a>
            <a 
              href="#favorites" 
              className="flex items-center space-x-2 py-2 text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;