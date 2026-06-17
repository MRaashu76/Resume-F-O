import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportToPDF(elementId, filename = 'resume.pdf') {
  const sourceElement = document.getElementById(elementId)
  if (!sourceElement) {
    console.error('Element not found:', elementId)
    return false
  }

  // Create a physical clone and place it safely in the DOM to avoid ALL scroll/clipping bugs
  const element = sourceElement.cloneNode(true)
  document.body.appendChild(element)
  
  element.style.position = 'fixed'
  element.style.top = '0px'
  element.style.left = '0px'
  element.style.zIndex = '-9999'
  element.style.margin = '0'
  element.style.transform = 'none'

  try {
    // Guarantee dimensions so html2canvas never generates a 0x0 canvas
    const targetWidth = element.scrollWidth || 794
    const targetHeight = Math.max(element.scrollHeight || 1123, 1123)

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: targetWidth,
      height: targetHeight,
      windowWidth: targetWidth,
      windowHeight: targetHeight,
      scrollY: 0,
      scrollX: 0
    })

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error(`html2canvas generated a 0x0 canvas! element: ${element.tagName}, width: ${targetWidth}, height: ${targetHeight}, origScrollW: ${sourceElement.scrollWidth}`)
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.98)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = imgWidth / imgHeight

    const finalWidth = pdfWidth
    const finalHeight = pdfWidth / ratio

    if (finalHeight <= pdfHeight) {
      pdf.addImage(imgData, 'JPEG', 0, 0, finalWidth, finalHeight)
    } else {
      // Multi-page support
      let y = 0
      // Floor the height to avoid floating point truncation bugs where the last page is < 1px tall
      const pageHeightInPx = Math.floor((pdfHeight * imgWidth) / pdfWidth)

      while (y < imgHeight) {
        const currentHeight = Math.floor(Math.min(pageHeightInPx, imgHeight - y))
        if (currentHeight <= 0) break

        const pageCanvas = document.createElement('canvas')
        pageCanvas.width = imgWidth
        pageCanvas.height = currentHeight
        const ctx = pageCanvas.getContext('2d')
        ctx.drawImage(canvas, 0, -y)
        
        const pageImg = pageCanvas.toDataURL('image/jpeg', 0.98)
        if (y > 0) pdf.addPage()
        pdf.addImage(pageImg, 'JPEG', 0, 0, pdfWidth, (currentHeight * pdfWidth) / imgWidth)
        y += pageHeightInPx
      }
    }

    pdf.save(filename)
    return true
  } catch (err) {
    console.error('PDF export failed:', err)
    throw err
  } finally {
    if (element && element.parentNode) {
      document.body.removeChild(element)
    }
  }
}
