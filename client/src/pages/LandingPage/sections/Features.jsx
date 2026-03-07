import { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import './Features.css';

const FEATURES = [
  {
    icon: '🎨',
    tag: 'QR Core',
    title: 'Full QR Customization',
    desc: 'Personalize colors, choose eye shapes and dot patterns, and embed your institution logo — while the system validates full scannability.',
  },
  {
    icon: '📥',
    tag: 'Export',
    title: 'Multi-Format Export',
    desc: 'Download QR codes as PNG, JPG, SVG, or PDF at any resolution — optimized for both digital screens and high-quality print.',
  },
  {
    icon: '📊',
    tag: 'Analytics',
    title: 'Scan Analytics',
    desc: 'Track every scan event: total count, exact date and time, device type, and country-level location — all in one dashboard.',
  },
  {
    icon: '📄',
    tag: 'Documents',
    title: 'Event Document Templates',
    desc: 'Create official Whatshapping post-event reports and ECR (Event Completion Records) using structured, pre-formatted templates.',
  },
  {
    icon: '🔒',
    tag: 'Security',
    title: 'Role-Based Access',
    desc: 'Admin, Editor, and Viewer roles are strictly enforced. Unauthorized editing of QR codes or documents is always blocked at the server level.',
  },
  {
    icon: '📎',
    tag: 'Integration',
    title: 'QR–Document Linking',
    desc: 'Attach any generated PDF or DOC directly to a QR code. Scanning it instantly opens or downloads the linked event document.',
  },
];

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <section className="features" id="features">
      <div className="container">
        <SectionHeading
          eyebrow="Platform Features"
          title="Everything Your Platform Needs"
          subtitle="A unified system combining full-featured QR management with academic document creation — purpose-built for college events and departments."
        />

        <div className="features__layout">

          {/* Left — accordion list */}
          <div className="features__accordion">
            {FEATURES.map((f, i) => {
              const isOpen = activeIndex === i;
              return (
                <div
                  key={i}
                  className={`feat-item ${isOpen ? 'feat-item--open' : ''}`}
                  onClick={() => toggle(i)}
                >
                  <div className="feat-item__row">
                    <span className="feat-item__num">0{i + 1}</span>
                    <span className="feat-item__title">{f.title}</span>
                    <span className="feat-item__tag">{f.tag}</span>
                    <span className="feat-item__arrow">{isOpen ? '−' : '+'}</span>
                  </div>
                  <div className="feat-item__body">
                    {/* <p className="feat-item__desc">{f.desc}</p> */}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right — active feature spotlight */}
          <div className="features__spotlight">
            {activeIndex !== null && (
              <div className="features__spot-card">
                <div className="features__spot-icon">
                  {FEATURES[activeIndex].icon}
                </div>
                <span className="features__spot-tag">
                  {FEATURES[activeIndex].tag}
                </span>
                <h3 className="features__spot-title">
                  {FEATURES[activeIndex].title}
                </h3>
                <p className="features__spot-desc">
                  {FEATURES[activeIndex].desc}
                </p>
                <div className="features__spot-index">
                  {FEATURES.map((_, i) => (
                    <button
                      key={i}
                      className={`features__spot-dot ${i === activeIndex ? 'features__spot-dot--active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}