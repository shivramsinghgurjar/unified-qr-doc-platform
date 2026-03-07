import Button from '../ui/Button';
import './CTA.css';

export default function CTA() {
  return (
    <section className="cta" id="contact">
      <div className="container">
        <div className="cta__box">
          <div className="cta__blob" />
          <h2 className="cta__title">Ready to Unify Your QR &amp; Documentation?</h2>
          <p className="cta__subtitle">
            Schedule a quick demo to see how this platform streamlines QR management
            and college event documentation for your department.
          </p>
          <div className="cta__actions">
            <Button variant="primary" size="lg" pill href="mailto:hello@qgen.io">
              Request a Demo →
            </Button>
            <Button variant="outline" size="lg" pill href="#features">
              Explore Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
