export async function exportPdf(element: HTMLElement, filename: string): Promise<void> {
  // Dynamic import prevents SSR issues on Vercel
  const html2pdf = (await import('html2pdf.js')).default;

  const opt = {
    margin:      [0.75, 0.75, 1, 0.75],   // top, left, bottom, right (inches)
    filename:    `${filename}.pdf`,
    image:       { type: 'jpeg', quality: 0.95 },
    html2canvas: {
      scale:       2,
      useCORS:     true,
      logging:     false,
      letterRendering: true,
    },
    jsPDF: {
      unit:        'in',
      format:      'letter',
      orientation: 'portrait',
    },
  };

  await html2pdf().set(opt).from(element).save();
}
