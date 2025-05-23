
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-morphism py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="font-display font-bold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            DressFit
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
            Benefits
          </a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How It Works
          </a>
          <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
            <Button variant="ghost" className="flex items-center gap-1">
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="btn-primary flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </Button>
          </Link>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-foreground p-2 rounded-md"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-morphism py-4 px-4 absolute top-full left-0 right-0 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium hover:text-primary transition-colors py-2"
            >
              Features
            </a>
            <a
              href="#benefits"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium hover:text-primary transition-colors py-2"
            >
              Benefits
            </a>
            <a
              href="#how-it-works"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium hover:text-primary transition-colors py-2"
            >
              How It Works
            </a>
            <Link 
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium hover:text-primary transition-colors py-2 flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
            <Link 
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="btn-primary w-full mt-2 flex items-center justify-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
