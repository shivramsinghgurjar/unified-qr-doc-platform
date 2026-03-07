import Button from '../ui/Button';
import Badge from '../ui/Badge';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      {/* Background decoration */}
      <div className="hero__bg-blob hero__bg-blob--1" />
      <div className="hero__bg-blob hero__bg-blob--2" />

      <div className="container hero__inner">
        <div className="hero__content">
          {/* <Badge className="hero__badge">✦ PBL Project — Unified Platform</Badge> */}
          <h1 className="hero__title">
            Unified QR Management<br />
            &amp; <em>Event Documentation</em><br />
            Platform
          </h1>
          <p className="hero__subtitle">
            Generate, customize, and track QR codes — then create official college
            event documents like Whatshapping reports and ECRs, all linked to QR
            codes for instant access and verification.
          </p>
          <div className="hero__actions">
            <Button variant="primary" size="lg" pill href="/login">
              Get Started Now
            </Button>
            <Button variant="outline" size="lg" pill href="#features">
              Explore Features
            </Button>
          </div>
          <div className="hero__pillars">
            {['QR Generation', 'Analytics', 'Event Docs', 'PDF Export'].map(p => (
              <span key={p} className="hero__pillar">✓ {p}</span>
            ))}
          </div>
        </div>

        {/* Dashboard mockup
        <div className="hero__visual">
          <div className="hero__card hero__card--main">
            <img
              src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80"
              alt="QR Code Dashboard"
              className="hero__dashboard-img"
            />
            <div className="hero__card-overlay">
              <span className="hero__card-label">My QR Codes</span>
            </div>
          </div>
          <div className="hero__stat-card hero__stat-card--scans">
            <span className="hero__stat-num">59</span>
            <span className="hero__stat-label">Total Scans</span>
          </div>
          <div className="hero__stat-card hero__stat-card--codes">
            <span className="hero__stat-num">12</span>
            <span className="hero__stat-label">Active Codes</span>
          </div>
          <div className="hero__qr-sample">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=https://qgen.io&color=2e1a4a"
              alt="Sample QR Code"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
}
