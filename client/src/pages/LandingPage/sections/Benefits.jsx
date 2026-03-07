import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import './Benefits.css';

const BENEFITS = [
  {
    num: '01',
    title: 'Manage Your Full QR Lifecycle',
    desc: 'Edit, disable, archive, or delete QR codes from a central dashboard. Stay in control of every code you have ever created.',
  },
  {
    num: '02',
    title: 'Instant Document Creation',
    desc: 'Auto-fill common fields like university name, department, and academic year across all templates — no re-typing the same information twice.',
  },
  {
    num: '03',
    title: 'Download in Any Format',
    desc: 'Export QR codes as PNG, JPG, SVG, or PDF. Download event documents as polished PDF or DOC files, ready to submit.',
  },
  {
    num: '04',
    title: 'Link Docs to QR Codes',
    desc: 'Attach a Whatshapping or ECR document to a QR code. Anyone who scans it instantly gets the right document — no searching required.',
  },
];

const FLOW = [
  {
    icon: '⬡',
    label: 'Generate QR',
    sub: 'Static or Dynamic',
    color: 'purple',
  },
  {
    icon: '✏️',
    label: 'Customize',
    sub: 'Colors, logo, pattern',
    color: 'blue',
  },
  {
    icon: '📄',
    label: 'Create Document',
    sub: 'Whatshapping or ECR',
    color: 'green',
  },
  {
    icon: '🔗',
    label: 'Link & Export',
    sub: 'PDF · DOC · PNG · SVG',
    color: 'orange',
  },
  {
    icon: '📲',
    label: 'Scan & Access',
    sub: 'Instant doc delivery',
    color: 'purple',
  },
];

export default function Benefits() {
  return (
    <section className="benefits" id="benefits">
      <div className="container">
        <SectionHeading eyebrow="Benefits" title="Why Teams Choose This Platform" />
        <div className="benefits__inner">

          {/* ── Left list ── */}
          <div className="benefits__list">
            {BENEFITS.map(b => (
              <div key={b.num} className="benefit-item">
                <span className="benefit-item__num">{b.num}</span>
                <div>
                  <h3 className="benefit-item__title">{b.title}</h3>
                  <p className="benefit-item__desc">{b.desc}</p>
                </div>
              </div>
            ))}
            <Button variant="primary" pill href="#contact">Discover More</Button>
          </div>

          {/* ── Right: flowchart ── */}
          <div className="ben-flow">
            {FLOW.map((step, i) => (
              <div key={i} className="ben-flow__item">
                <div className={`ben-node ben-node--${step.color}`}>
                  <span className="ben-node__icon">{step.icon}</span>
                  <div className="ben-node__text">
                    <span className="ben-node__label">{step.label}</span>
                    <span className="ben-node__sub">{step.sub}</span>
                  </div>
                </div>
                {i < FLOW.length - 1 && (
                  <div className="ben-flow__arrow">
                    <div className="ben-flow__line" />
                    <svg className="ben-flow__chevron" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M1 1L8 6L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}