import { useState } from 'react';
import Button from '../ui/Button';
import './BrandVoice.css';

const COLORS  = ['#2e1a4a', '#7c4dbd', '#1a6b4a', '#b94040', '#1a4a6b', '#111111'];
const PATTERNS = ['■', '●', '◆', '▲'];
const EYES     = ['□', '○', '◇', '⬡'];

export default function BrandVoice() {
  const [activeColor,   setActiveColor]   = useState('#2e1a4a');
  const [activeBg,      setActiveBg]      = useState('#ffffff');
  const [activePattern, setActivePattern] = useState(0);
  const [activeEye,     setActiveEye]     = useState(0);
  const [showLogo,      setShowLogo]      = useState(true);
  const [isDynamic,     setIsDynamic]     = useState(false);

  const BG_OPTIONS = ['#ffffff', '#f3f1ee', '#e8dff5', '#dbeafe', '#fef9c3'];

  return (
    <section className="brand-voice">
      <div className="container brand-voice__inner">

        {/* ── Left content (unchanged) ── */}
        <div className="brand-voice__content">
          <h2 className="brand-voice__title">Customize QR Codes for Your Institution</h2>
          <p className="brand-voice__desc">
            Go beyond plain black-and-white squares. Embed your department logo, pick
            brand colors, and choose from multiple eye shapes and dot patterns — all
            while the system validates that your QR code remains fully scannable.
          </p>
          <p className="brand-voice__desc">
            Dynamic QR codes let you update the destination URL or document link
            anytime, without needing to reprint or redistribute the code. Perfect for
            evolving event materials and living documents.
          </p>
          <div className="brand-voice__checks">
            {[
              'Foreground & background colors',
              'Logo embedding',
              'Custom eye shapes & patterns',
              'Scannability validation',
              'Dynamic content updates',
            ].map(item => (
              <span key={item} className="brand-voice__check">✓ {item}</span>
            ))}
          </div>
          <Button variant="ghost" href="#features">
            See all customization options →
          </Button>
        </div>

        {/* ── Right: QR customizer UI ── */}
        <div className="bv-builder">

          {/* Top bar */}
          <div className="bv-builder__bar">
            <span className="bv-builder__bar-title">QR Designer</span>
            <div className="bv-builder__type-toggle">
              <button
                className={`bv-type-btn ${!isDynamic ? 'bv-type-btn--active' : ''}`}
                onClick={() => setIsDynamic(false)}
              >Static</button>
              <button
                className={`bv-type-btn ${isDynamic ? 'bv-type-btn--active' : ''}`}
                onClick={() => setIsDynamic(true)}
              >Dynamic</button>
            </div>
          </div>

          <div className="bv-builder__body">

            {/* QR Preview */}
            <div className="bv-preview" style={{ background: activeBg }}>
              <div className="bv-qr" style={{ '--qr-color': activeColor }}>

                {/* Corner finder eyes — top-left, top-right, bottom-left */}
                {[0,1,2].map(k => (
                  <div key={k} className={`bv-eye bv-eye--${k}`}>
                    <div className="bv-eye__outer" />
                    <div className="bv-eye__inner" />
                  </div>
                ))}

                {/* 9×9 dot grid — cells covered by eyes are hidden */}
                <div className="bv-dots">
                  {Array.from({ length: 81 }).map((_, i) => {
                    const row = Math.floor(i / 9);
                    const col = i % 9;
                    // hide top-left 3×3, top-right 3×3, bottom-left 3×3 (eye zones)
                    const inTL = row < 3 && col < 3;
                    const inTR = row < 3 && col > 5;
                    const inBL = row > 5 && col < 3;
                    // realistic QR data pattern — fixed bitmap, ~70% fill
                    const pattern = [
                      0,0,0,1,0,1,0,0,0,
                      0,0,0,0,1,0,1,0,0,
                      0,0,0,1,1,0,1,0,0,
                      1,0,1,1,0,1,0,1,1,
                      0,1,1,0,1,0,1,1,0,
                      1,1,0,1,0,1,1,0,1,
                      0,0,1,0,1,1,0,1,0,
                      0,0,0,1,0,1,1,0,1,
                      0,0,0,1,1,0,1,1,0,
                    ];
                    const visible = !inTL && !inTR && !inBL && pattern[i] === 1;
                    return (
                      <div
                        key={i}
                        className={`bv-dot bv-dot--pat${activePattern} ${!visible ? 'bv-dot--hidden' : ''}`}
                      />
                    );
                  })}
                </div>

                {/* Logo badge */}
                {showLogo && (
                  <div className="bv-logo">
                    <span>Q</span>
                  </div>
                )}
              </div>

              {isDynamic && (
                <div className="bv-dynamic-badge">⟳ Dynamic</div>
              )}
            </div>

            {/* Controls */}
            <div className="bv-controls">

              <div className="bv-control-row">
                <span className="bv-control-label">Foreground</span>
                <div className="bv-swatches">
                  {COLORS.map(c => (
                    <button
                      key={c}
                      className={`bv-swatch ${activeColor === c ? 'bv-swatch--active' : ''}`}
                      style={{ background: c }}
                      onClick={() => setActiveColor(c)}
                    />
                  ))}
                </div>
              </div>

              <div className="bv-control-row">
                <span className="bv-control-label">Background</span>
                <div className="bv-swatches">
                  {BG_OPTIONS.map(c => (
                    <button
                      key={c}
                      className={`bv-swatch bv-swatch--bg ${activeBg === c ? 'bv-swatch--active' : ''}`}
                      style={{ background: c }}
                      onClick={() => setActiveBg(c)}
                    />
                  ))}
                </div>
              </div>

              <div className="bv-control-row">
                <span className="bv-control-label">Dot Pattern</span>
                <div className="bv-pills">
                  {PATTERNS.map((p, i) => (
                    <button
                      key={i}
                      className={`bv-pill ${activePattern === i ? 'bv-pill--active' : ''}`}
                      onClick={() => setActivePattern(i)}
                    >{p}</button>
                  ))}
                </div>
              </div>

              <div className="bv-control-row">
                <span className="bv-control-label">Eye Shape</span>
                <div className="bv-pills">
                  {EYES.map((e, i) => (
                    <button
                      key={i}
                      className={`bv-pill ${activeEye === i ? 'bv-pill--active' : ''}`}
                      onClick={() => setActiveEye(i)}
                    >{e}</button>
                  ))}
                </div>
              </div>

              <div className="bv-control-row">
                <span className="bv-control-label">Logo</span>
                <button
                  className={`bv-toggle ${showLogo ? 'bv-toggle--on' : ''}`}
                  onClick={() => setShowLogo(!showLogo)}
                >
                  <span className="bv-toggle__knob" />
                </button>
                <span className="bv-toggle-label">{showLogo ? 'Embedded' : 'Off'}</span>
              </div>

            </div>
          </div>

          <div className="bv-builder__footer">
            <span className="bv-valid">✓ Scannability validated</span>
            <div className="bv-export-pills">
              {['PNG','SVG','PDF'].map(f => (
                <span key={f} className="bv-export-pill">{f}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}