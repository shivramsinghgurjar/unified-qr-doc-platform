import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import './WhyUs.css';

const STEPS = [
  {
    num: '01',
    title: 'Register & Set Up',
    desc: 'Create your account and configure your institution profile. University name, school, and department details are saved once and auto-filled across all documents.',
  },
  {
    num: '02',
    title: 'Generate & Customize QR',
    desc: 'Pick a QR type — URL, text, email, phone, or file. Customize colors, patterns, and logo, then validate scannability and export in your preferred format.',
  },
  {
    num: '03',
    title: 'Create Event Documents',
    desc: 'Select a Whatshapping or ECR template, fill in event-specific fields, preview the document, and download as PDF or DOC in seconds.',
  },
];

export default function WhyUs() {
  return (
    <section className="why-us" id="why-us">
      <div className="container">
        <SectionHeading
          eyebrow="How It Works"
          title="Up and Running in Three Steps"
          subtitle="A developer-friendly, web-based platform that runs on any modern browser — no installs, no configuration overhead."
        />
        <div className="why-us__cta-row">
          <Button variant="primary" pill href="#contact">Get Started Now</Button>
        </div>
        <div className="why-us__steps">
          {STEPS.map(s => (
            <div key={s.num} className="why-us__step">
              <div className="why-us__step-num">{s.num}</div>
              <h3 className="why-us__step-title">{s.title}</h3>
              <p className="why-us__step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
