import './Testimonial.css';

export default function Testimonial() {
  return (
    <section className="testimonial">
      <div className="container testimonial__inner">
        <div className="testimonial__visual">
          <div className="testimonial__mockup">
            <div className="testimonial__mockup-top">
              <div className="testimonial__icon">🌐</div>
              <span className="testimonial__website-label">Website</span>
            </div>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://qgen.io&color=1a1a2e"
              alt="QR Code"
              className="testimonial__qr"
            />
            <div className="testimonial__social-icons">
              {['💬','📘','📸','✖','🔗'].map((icon, i) => (
                <span key={i} className="testimonial__social-icon">{icon}</span>
              ))}
            </div>
            <div className="testimonial__select-btn">SELECT QR</div>
          </div>
        </div>

        <div className="testimonial__quote-block">
          <p className="testimonial__quote">
            "I was skeptical, but Area has completely transformed the way I manage my
            business. The data visualizations are so clear and intuitive, and the platform
            is so easy to use. I can't imagine running my company without it."
          </p>
          <div className="testimonial__author">
            <div className="testimonial__author-avatar">JS</div>
            <div>
              <p className="testimonial__author-name">John Smith</p>
              <p className="testimonial__author-role">CEO, TechCorp</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
