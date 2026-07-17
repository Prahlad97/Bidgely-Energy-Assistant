// PDF Generation Pipeline — Playwright + React renderToStaticMarkup
//
// Usage:
//   import { generateReportPdf } from './generate-pdf';
//   const pdfBuffer = await generateReportPdf(report, { outputPath: './out/report.pdf' });
//
// Dependencies:
//   npm install playwright react react-dom
//   npx playwright install chromium
//   npm install -D @types/react @types/react-dom
//
// Font:
//   Download DM Sans variable font and place at public/fonts/DM_Sans[opsz,wght].ttf
//   Get it from: https://fonts.google.com/specimen/DM+Sans (Download family → extract TTF)

import { chromium } from 'playwright';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import path from 'path';
import fs from 'fs/promises';
import type { Report } from '../types';
import ReportPdfDocument from './ReportPdfTemplate';

interface GenerateOptions {
  /** Absolute path to write the PDF. If omitted, returns the buffer only. */
  outputPath?: string;
  /** Base URL of the app server so Playwright can load fonts. Default: file-based. */
  serverUrl?: string;
  /** Path to the public directory containing /fonts. Default: process.cwd()/public */
  publicDir?: string;
}

export async function generateReportPdf(
  report: Report,
  options: GenerateOptions = {}
): Promise<Buffer> {
  const { outputPath, serverUrl, publicDir = path.join(process.cwd(), 'public') } = options;

  // 1. Render the React template to a static HTML string
  const html = renderToStaticMarkup(createElement(ReportPdfDocument, { report }));
  const fullHtml = `<!DOCTYPE html>${html}`;

  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    if (serverUrl) {
      // Option A: route fonts through a running dev/prod server
      await page.goto(`${serverUrl}/report/pdf-preview/${report.id}`, {
        waitUntil: 'networkidle',
      });
    } else {
      // Option B: set HTML content directly and route font requests to the local filesystem.
      // Intercept /fonts/* requests and return files from the public directory.
      await page.route('**/fonts/**', async (route) => {
        const url = new URL(route.request().url());
        const fontFileName = path.basename(url.pathname);
        const fontPath = path.join(publicDir, 'fonts', fontFileName);
        try {
          const body = await fs.readFile(fontPath);
          await route.fulfill({
            status: 200,
            contentType: 'font/truetype',
            body,
          });
        } catch {
          await route.abort();
        }
      });

      await page.setContent(fullHtml, { waitUntil: 'networkidle' });
    }

    // 2. Wait for fonts to finish loading
    await page.evaluate(() => document.fonts.ready);

    // 3. Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      printBackground: true,       // required for colored cards/backgrounds
      margin: {
        top: '0.75in',
        right: '0.75in',
        bottom: '1in',              // extra space for running footer
        left: '0.75in',
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="width:100%; font-family:'DM Sans',Arial,sans-serif; font-size:9px; color:#2A3347; display:flex; justify-content:space-between; padding:0 0.75in;">
          <span>${report.branding.companyName}</span>
          <span>${report.customer.name} · ${report.customer.date}</span>
        </div>
      `,
      footerTemplate: `
        <div style="width:100%; font-family:'DM Sans',Arial,sans-serif; font-size:9px; color:#5B6578; text-align:center; padding:0 0.75in;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
    });

    // 4. Write to disk if requested
    if (outputPath) {
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, pdfBuffer);
    }

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}

// ─── Express / Next.js API route example ─────────────────────────────────────
//
// Next.js App Router (app/api/reports/[id]/pdf/route.ts):
//
//   import { NextRequest, NextResponse } from 'next/server';
//   import { generateReportPdf } from '@/report/pdf/generate-pdf';
//   import { getReportById } from '@/lib/reports'; // your data fetching
//
//   export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//     const report = await getReportById(params.id);
//     if (!report) return NextResponse.json({ error: 'Not found' }, { status: 404 });
//
//     const pdf = await generateReportPdf(report);
//
//     return new NextResponse(pdf, {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': `attachment; filename="report-${params.id}.pdf"`,
//       },
//     });
//   }
//
// ─── CLI usage ────────────────────────────────────────────────────────────────
//
//   npx tsx src/report/pdf/generate-pdf.ts
//   (add the block below and run with: npx tsx generate-pdf.ts)

// Uncomment to run directly:
// import { solarReport } from '../sample/solar-report';
// generateReportPdf(solarReport, { outputPath: './out/solar-report.pdf' })
//   .then(() => console.log('PDF written to ./out/solar-report.pdf'))
//   .catch(console.error);
