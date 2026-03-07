import './Footer.css';

const FOOTER_LINKS = [
  { label: 'Features',  href: '#features' },
  { label: 'Documents', href: '#documents' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'User Roles',href: '#roles' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="/" className="footer__logo">
          <span className="footer__logo-icon">Q</span>
          <span>QGen</span>
        </a>
        <nav className="footer__links">
          {FOOTER_LINKS.map(link => (
            <a key={link.label} href={link.href} className="footer__link">
              {link.label}
            </a>
          ))}
        </nav>
        <p className="footer__copy">© {new Date().getFullYear()} QGen · Unified QR &amp; Document Platform</p>
      </div>
    </footer>
  );
}
