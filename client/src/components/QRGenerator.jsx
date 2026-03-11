import { useState, useEffect, useRef } from "react"
import { createQR } from "../services/qrService"
import QRCodeStyling from "qr-code-styling"

function QRGenerator({ refreshQRs }) {
  const [text,    setText]    = useState("")
  const [qrColor, setQrColor] = useState("#2e1a4a")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [size,    setSize]    = useState(200)
  const [logo,    setLogo]    = useState(null)
  const [msg,     setMsg]     = useState(null)

  const qrRef  = useRef(null)
  const qrCode = useRef(null)

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: size, height: size,
      data: text || "https://qgen.io",
      dotsOptions:       { color: qrColor, type: "rounded" },
      backgroundOptions: { color: bgColor },
      image: logo || "",
      imageOptions:      { crossOrigin: "anonymous", margin: 5 },
    })
    if (qrRef.current) qrCode.current.append(qrRef.current)
  }, [])

  useEffect(() => {
    if (!qrCode.current) return
    qrCode.current.update({
      width: size, height: size,
      data: text || "https://qgen.io",
      dotsOptions:       { color: qrColor },
      backgroundOptions: { color: bgColor },
      image: logo || "",
    })
  }, [text, qrColor, bgColor, size, logo])

  const handleGenerate = async () => {
    if (!text.trim()) return setMsg({ ok: false, text: "Please enter a URL or text first." })
    const res = await createQR(text)
    if (res) {
      refreshQRs()
      setMsg({ ok: true, text: "QR code saved successfully." })
      setText("")
    }
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setLogo(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="qr-generator">

      {/* URL input row */}
      <div className="qr-input-group">
        <input
          type="text"
          placeholder="Enter URL or text to encode..."
          value={text}
          onChange={e => { setText(e.target.value); setMsg(null) }}
        />
        <button onClick={handleGenerate}>+ Generate</button>
      </div>

      {msg && <p className={`qr-msg ${msg.ok ? "qr-msg--ok" : "qr-msg--err"}`}>{msg.text}</p>}

      <div className="qr-generator__body">

        {/* Left: customization */}
        <div className="qr-customization">
          <p className="qr-customization__title">Customize</p>

          <div className="qr-custom-field">
            <label>QR Color</label>
            <div className="qr-color-wrap">
              <input type="color" value={qrColor} onChange={e => setQrColor(e.target.value)} />
              <span>{qrColor}</span>
            </div>
          </div>

          <div className="qr-custom-field">
            <label>Background</label>
            <div className="qr-color-wrap">
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
              <span>{bgColor}</span>
            </div>
          </div>

          <div className="qr-custom-field">
            <label>Size — {size}px</label>
            <input
              type="range" min="150" max="400"
              value={size} onChange={e => setSize(Number(e.target.value))}
            />
          </div>

          <div className="qr-custom-field">
            <label>Logo (optional)</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} />
          </div>
        </div>

        {/* Right: preview */}
        <div className="qr-preview">
          <p className="qr-preview__label">Preview</p>
          <div className="qr-preview__box" ref={qrRef} />
        </div>

      </div>
    </div>
  )
}

export default QRGenerator