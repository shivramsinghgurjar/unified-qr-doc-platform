export default function AuthLeft() {
  return (
    <div className="auth-left">
      <div className="auth-left__inner">

        <a href="/" className="auth-logo">
          <span className="auth-logo__icon">Q</span>
          <span className="auth-logo__name">QGen</span>
        </a>

        <div className="auth-left__copy">
          <h1 className="auth-left__heading">
            From Event Doc. to QR Management, All in one place.
          </h1>
          <p className="auth-left__sub">
            Generate, customize, and track QR codes. Create official event
            documents. Link them together — and share instantly.
          </p>
        </div>

        <div className="auth-features">
          {[
            { icon: "📄", text: "Static & dynamic QR codes"        },
            { icon: "📄", text: "Real-time scan analytics"          },
            { icon: "📄", text: "Whatshapping & ECR templates"      },
            { icon: "📄", text: "QR-linked document delivery"       },
          ].map(f => (
            <div key={f.text} className="auth-feature">
              <span className="auth-feature__icon">{f.icon}</span>
              <span className="auth-feature__text">{f.text}</span>
            </div>
          ))}
        </div>

        {/* <div className="auth-proof">
          <div className="auth-proof__avatars">
            {["#7c4dbd", "#3b82f6", "#1a6b4a", "#b94040"].map((c, i) => (
              <div key={i} className="auth-proof__av" style={{ background: c, zIndex: 4 - i }} />
            ))}
          </div>
          <p className="auth-proof__text">
            Trusted by <strong>2,400+</strong> students &amp; faculty
          </p>
        </div> */}

        <p className="auth-left__footer">
          Unified QR &amp; Document Platform · Built for college events
        </p>

      </div>
    </div>
  )
}