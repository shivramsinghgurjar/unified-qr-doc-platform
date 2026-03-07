import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Features',  href: '#features' },
  { label: 'Documents', href: '#documents' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'User Roles',href: '#roles' },
  { label: 'Contact',   href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <a href="/" className="navbar__logo">
          <span className="navbar__logo-icon">Q</span>
          <span>QGen</span>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__links">
          {NAV_LINKS.map(link => (
            <a key={link.label} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <Button variant="primary" size="sm" pill href="/login">
            Get Started
          </Button>
        </div>

        {/* Mobile burger */}
        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" pill href="/login">Get Started</Button>
        </div>
      )}
    </header>
  );
}
