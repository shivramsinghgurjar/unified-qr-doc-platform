export const downloadQR = (qrUrl, fileName = "qr-code") => {

  const link = document.createElement("a")

  link.href = qrUrl
  link.download = `${fileName}.png`

  document.body.appendChild(link)

  link.click()

  document.body.removeChild(link)
}