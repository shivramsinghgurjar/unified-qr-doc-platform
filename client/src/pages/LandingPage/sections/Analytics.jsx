import { useState } from 'react';
import Button from '../ui/Button';
import './Analytics.css';

/* ── chart data — 12 days ── */
const TOTAL  = [24, 31, 27, 38, 34, 44, 39, 52, 46, 58, 53, 67];
const UNIQUE = [14, 18, 15, 22, 19, 26, 22, 31, 27, 35, 31, 41];
const LABELS = ['Mar 4','Mar 5','Mar 6','Mar 7','Mar 8','Mar 9','Mar 10','Mar 11','Mar 12','Mar 13','Mar 14','Mar 15'];

const PLATFORMS = [
  { label: 'Android', pct: 54, color: '#7c4dbd' },
  { label: 'iOS',     pct: 32, color: '#3b82f6' },
  { label: 'Desktop', pct: 14, color: '#a0a0b8' },
];

const TOP_QR = [
  { name: 'Tech Fest 2025',  scans: 142, trend: '+18%' },
  { name: 'ML Workshop',     scans: 87,  trend: '+7%'  },
  { name: 'Cultural Night',  scans: 63,  trend: '+12%' },
];

/* ── smooth bezier SVG path ── */
function smoothPath(data, W, H, pad = 14) {
  const maxV = Math.max(...data), minV = Math.min(...data);
  const xs = data.map((_, i) => pad + (i / (data.length - 1)) * (W - pad * 2));
  const ys = data.map(v => pad + (1 - (v - minV) / (maxV - minV)) * (H - pad * 2));

  let d = `M ${xs[0]} ${ys[0]}`;
  for (let i = 1; i < xs.length; i++) {
    const cpx = (xs[i - 1] + xs[i]) / 2;
    d += ` C ${cpx} ${ys[i - 1]}, ${cpx} ${ys[i]}, ${xs[i]} ${ys[i]}`;
  }
  return { d, xs, ys };
}

function areaPath(pathD, xs, H) {
  return `${pathD} L ${xs.at(-1)} ${H} L ${xs[0]} ${H} Z`;
}

export default function Analytics() {
  const [hov, setHov] = useState(null);
  const W = 480, H = 110, PAD = 14;

  const total  = smoothPath(TOTAL,  W, H, PAD);
  const unique = smoothPath(UNIQUE, W, H, PAD);

  return (
    <section className="analytics" id="analytics">
      <div className="container analytics__inner">

        {/* section header */}
        <div className="analytics__header">
          <div>
            <h2 className="analytics__title">Know Every Scan, Every Time</h2>
            <p className="analytics__subtitle">
              Track scan counts, device types, locations, and timestamps — all from one clean dashboard.
            </p>
          </div>
          <Button variant="primary" size="sm" pill href="#contact">Explore Analytics</Button>
        </div>

        {/* mockup card */}
        <div className="an-card">

          {/* purple top bar */}
          <div className="an-topbar">
            <div>
              <p className="an-topbar__title">Scan Activity</p>
              <p className="an-topbar__sub">Mar 4 – Mar 15, 2024 · All QR Codes</p>
            </div>
            <div className="an-topbar__pills">
              <span className="an-topbar__pill">↑ Export</span>
              <span className="an-topbar__pill an-topbar__pill--white">+ Create QR</span>
            </div>
          </div>

          {/* KPIs + chart in one row */}
          <div className="an-body">

            {/* left: 3 KPIs stacked */}
            <div className="an-kpis">
              {[
                { num: '59', sub: 'QR Codes',    trend: '+15%', icon: '⬡', c: 'purple' },
                { num: '52', sub: 'Total Scans',  trend: '+7%',  icon: '◎', c: 'blue'   },
                { num: '33', sub: 'Unique Scans', trend: '+5%',  icon: '◈', c: 'green'  },
              ].map(k => (
                <div key={k.sub} className={`an-kpi an-kpi--${k.c}`}>
                  <div className="an-kpi__row">
                    <span className="an-kpi__icon">{k.icon}</span>
                    <span className="an-kpi__trend">↗ {k.trend}</span>
                  </div>
                  <p className="an-kpi__num">{k.num}</p>
                  <p className="an-kpi__label">{k.sub}</p>
                </div>
              ))}
            </div>

            {/* right: SVG chart */}
            <div className="an-chart">
              <div className="an-chart__head">
                <span className="an-chart__label">Scan trend — last 12 days</span>
                <div className="an-legend">
                  <span className="an-legend__item"><i style={{background:'#7c4dbd'}}/> Total</span>
                  <span className="an-legend__item"><i style={{background:'#1a6b4a'}}/> Unique</span>
                </div>
              </div>

              <div className="an-svg-wrap" onMouseLeave={() => setHov(null)}>
                <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="an-svg">
                  <defs>
                    <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#7c4dbd" stopOpacity="0.22"/>
                      <stop offset="100%" stopColor="#7c4dbd" stopOpacity="0.01"/>
                    </linearGradient>
                    <linearGradient id="gU" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#1a6b4a" stopOpacity="0.16"/>
                      <stop offset="100%" stopColor="#1a6b4a" stopOpacity="0.01"/>
                    </linearGradient>
                  </defs>

                  {/* subtle grid lines */}
                  {[0.25, 0.5, 0.75].map(t => (
                    <line key={t} x1={PAD} y1={PAD + t * (H - PAD * 2)}
                      x2={W - PAD} y2={PAD + t * (H - PAD * 2)}
                      stroke="#e2ddd8" strokeWidth="0.8"/>
                  ))}

                  {/* area fills */}
                  <path d={areaPath(total.d,  total.xs,  H)} fill="url(#gT)"/>
                  <path d={areaPath(unique.d, unique.xs, H)} fill="url(#gU)"/>

                  {/* smooth lines */}
                  <path d={total.d}  fill="none" stroke="#7c4dbd" strokeWidth="2"   strokeLinecap="round"/>
                  <path d={unique.d} fill="none" stroke="#1a6b4a" strokeWidth="1.8" strokeLinecap="round"/>

                  {/* hover guide */}
                  {hov !== null && (
                    <line x1={total.xs[hov]} y1={PAD}
                          x2={total.xs[hov]} y2={H - PAD}
                          stroke="#c4a0f0" strokeWidth="1" strokeDasharray="3 3"/>
                  )}

                  {/* hover hit areas */}
                  {TOTAL.map((_, i) => {
                    const slotW = (W - PAD * 2) / (TOTAL.length - 1);
                    return (
                      <rect key={i}
                        x={total.xs[i] - slotW / 2} y={0}
                        width={slotW} height={H}
                        fill="transparent"
                        onMouseEnter={() => setHov(i)}
                      />
                    );
                  })}

                  {/* hover dots */}
                  {hov !== null && <>
                    <circle cx={total.xs[hov]}  cy={total.ys[hov]}  r="3.5" fill="#7c4dbd" stroke="white" strokeWidth="1.8"/>
                    <circle cx={unique.xs[hov]} cy={unique.ys[hov]} r="3.5" fill="#1a6b4a" stroke="white" strokeWidth="1.8"/>
                  </>}
                </svg>

                {/* tooltip */}
                {hov !== null && (
                  <div className="an-tip" style={{left:`${(total.xs[hov] / W) * 100}%`}}>
                    <p className="an-tip__date">{LABELS[hov]}</p>
                    <p className="an-tip__row"><span style={{background:'#7c4dbd'}}/>{TOTAL[hov]} scans</p>
                    <p className="an-tip__row"><span style={{background:'#1a6b4a'}}/>{UNIQUE[hov]} unique</p>
                  </div>
                )}

                {/* x labels — every other one */}
                <div className="an-xaxis">
                  {LABELS.map((l, i) => (
                    <span key={i} className={`an-xaxis__l ${i % 2 !== 0 ? 'an-xaxis__l--hide' : ''} ${hov === i ? 'an-xaxis__l--active' : ''}`}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* bottom strip */}
          <div className="an-footer">
            <div className="an-footer__platforms">
              <p className="an-footer__label">Device breakdown</p>
              <div className="an-bar-track">
                {PLATFORMS.map(p => (
                  <div key={p.label} className="an-bar-seg" title={`${p.label} ${p.pct}%`}
                    style={{ width: `${p.pct}%`, background: p.color }} />
                ))}
              </div>
              <div className="an-bar-legend">
                {PLATFORMS.map(p => (
                  <span key={p.label} className="an-bar-legend__item">
                    <i style={{background: p.color}}/>{p.label} {p.pct}%
                  </span>
                ))}
              </div>
            </div>

            <div className="an-footer__divider" />

            <div className="an-footer__top">
              <p className="an-footer__label">Top QR codes this period</p>
              {TOP_QR.map((q, i) => (
                <div key={i} className="an-top-row">
                  <span className="an-top-row__n">#{i + 1}</span>
                  <span className="an-top-row__name">{q.name}</span>
                  <span className="an-top-row__scans">{q.scans}</span>
                  <span className="an-top-row__trend">{q.trend}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}