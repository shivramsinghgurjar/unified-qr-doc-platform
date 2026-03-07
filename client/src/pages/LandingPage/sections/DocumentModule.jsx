import { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import './DocumentModule.css';

const TEMPLATES = [
  {
    id: 'whatshapping',
    label: 'Whatshapping',
    sublabel: 'Post-Event Documentation',
    icon: '📋',
    fields: [
      'Event Name, Date & Venue',
      'Event Description & Objectives',
      'Speaker & Convener Details',
      'Participant Details',
      'Images & Highlights',
      'Feedback & Outcomes',
    ],
  },
  {
    id: 'ecr',
    label: 'ECR',
    sublabel: 'Event Completion Record',
    icon: '📑',
    fields: [
      'Auto-Generated Reference Number',
      'Event Details',
      'Approval / Completion Info',
      'Financial or Admin Remarks',
    ],
  },
];

const AUTO_FILLED = [
  'University Name',
  'School Name',
  'Department Name',
  'Academic Year',
  'Document Creation Date',
];

export default function DocumentModule() {
  const [active, setActive] = useState('whatshapping');
  const selected = TEMPLATES.find(t => t.id === active);

  return (
    <section className="doc-module" id="documents">
      <div className="container">
        <SectionHeading
          eyebrow="Document Module"
          title="Official Event Document Creation"
          subtitle="Select a template, fill in event-specific fields, and download polished PDF or DOC files — with university branding auto-filled and locked."
        />

        <div className="doc-module__inner">
          {/* Left — template selector + auto-fill info */}
          <div className="doc-module__sidebar">
            <p className="doc-module__sidebar-label">Choose Template</p>
            <div className="doc-module__tabs">
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  className={`doc-module__tab ${active === t.id ? 'doc-module__tab--active' : ''}`}
                  onClick={() => setActive(t.id)}
                >
                  <span className="doc-module__tab-icon">{t.icon}</span>
                  <div>
                    <p className="doc-module__tab-name">{t.label}</p>
                    <p className="doc-module__tab-sub">{t.sublabel}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="doc-module__autofill">
              <p className="doc-module__autofill-label">🔒 Auto-Filled &amp; Locked Fields</p>
              <p className="doc-module__autofill-note">
                These fields are pre-filled from your institution profile and cannot be edited to maintain accuracy.
              </p>
              <ul className="doc-module__autofill-list">
                {AUTO_FILLED.map(f => (
                  <li key={f} className="doc-module__autofill-item">
                    <span className="doc-module__lock">🔒</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — template preview */}
          <div className="doc-module__preview">
            <div className="doc-module__doc-card">
              <div className="doc-module__doc-header">
                <div className="doc-module__doc-logo">
                  <span>Q</span>
                </div>
                <div>
                  <p className="doc-module__doc-uni">Sharda University</p>
                  <p className="doc-module__doc-dept">Deptartment of Computer Science And Engineering</p>
                </div>
                <span className="doc-module__doc-badge">{selected.label}</span>
              </div>

              <div className="doc-module__doc-body">
                <p className="doc-module__doc-section-title">{selected.sublabel} — Editable Fields</p>
                <div className="doc-module__fields">
                  {selected.fields.map(field => (
                    <div key={field} className="doc-module__field">
                      <span className="doc-module__field-label">{field}</span>
                      <div className="doc-module__field-input" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="doc-module__doc-footer">
                <Button variant="primary" size="sm" pill>Preview Document</Button>
                <div className="doc-module__export-btns">
                  <span className="doc-module__export-btn">↓ PDF</span>
                  <span className="doc-module__export-btn">↓ DOC</span>
                  <span className="doc-module__export-btn">🔗 Link QR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
