// PDF-specific template — rendered server-side and fed to Playwright.
// Intentional divergences from the web template:
//   - Full Letter-page width (not narrow column)
//   - Cover page
//   - All FAQ answers expanded (no accordion)
//   - Running header/footer via CSS @page
//   - Charts sized for full content width
//   - page-break-inside: avoid on every card

import type { Report, ReportSection, RatePeriod, ExportRatePeriod } from '../types';

// ─── Inline styles for the PDF renderer ──────────────────────────────────────
// We use inline styles + a <style> block so Playwright gets a fully
// self-contained HTML document with no external stylesheet dependencies.

function PdfKpiRow({ section }: { section: Extract<ReportSection, { type: 'kpi-row' }> }) {
  const accentColors: Record<string, string> = {
    green: '#9BFFD0',
    purple: '#DCCBFF',
    blue: '#BFDBFE',
    yellow: '#FFE992',
  };
  return (
    <div style={{ display: 'flex', gap: 16, width: '100%', pageBreakInside: 'avoid' }}>
      {section.kpis.map((kpi) => (
        <div
          key={kpi.label}
          style={{
            flex: 1,
            background: accentColors[kpi.accent] || '#F0F0F0',
            borderRadius: 14,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            boxShadow: '0px 6px 14px rgba(17,24,39,0.06)',
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#0B1220', textTransform: 'uppercase' }}>
            {kpi.label}
          </span>
          <span style={{ fontSize: 36, fontWeight: 800, lineHeight: 1, letterSpacing: '-1.08px', color: '#0B1220' }}>
            {kpi.value}
          </span>
          <span style={{ fontSize: 12, fontWeight: 500, color: '#2A3347' }}>{kpi.subtext}</span>
        </div>
      ))}
    </div>
  );
}

function PdfBarChart({ section }: { section: Extract<ReportSection, { type: 'bar-comparison' }> }) {
  const maxValue = Math.max(...section.items.map((i) => i.value));
  const chartH = 200;

  return (
    <div style={{ background: 'white', borderRadius: 14, padding: '24px 32px', pageBreakInside: 'avoid', boxShadow: '0 2px 4px rgba(40,41,61,0.04), 0 4px 32px 16px rgba(96,97,112,0.04)' }}>
      <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#2A3347', textTransform: 'uppercase', marginBottom: 24 }}>
        {section.title}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 80, height: chartH }}>
        {section.items.map((item) => {
          const h = Math.round((item.value / maxValue) * (chartH * 0.8));
          return (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: item.value === maxValue ? '#0B1220' : '#007652', marginBottom: 4 }}>
                {item.displayValue}
              </span>
              <div style={{ width: 120, height: h, backgroundColor: item.color, borderRadius: 6, boxShadow: '0 3px 6px rgba(0,0,0,0.15)', minHeight: 32 }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: '#2A3347', marginTop: 4 }}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PdfMonthlyChart({ section }: { section: Extract<ReportSection, { type: 'monthly-chart' }> }) {
  const { data, yMax, yUnit, series, insight } = section;
  const chartH = 180;

  return (
    <div style={{ background: 'white', borderRadius: 14, padding: '24px 32px', pageBreakInside: 'avoid', boxShadow: '0 2px 4px rgba(40,41,61,0.04), 0 4px 32px 16px rgba(96,97,112,0.04)' }}>
      <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#2A3347', textTransform: 'uppercase', marginBottom: 16 }}>
        {section.title}
      </div>

      <div style={{ display: 'flex', gap: 0, height: chartH }}>
        {/* Y-axis */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', paddingRight: 8, width: 70, fontSize: 11, color: '#A1A1A6' }}>
          <span>{yMax.toLocaleString()} {yUnit}</span>
          <span>{(yMax / 2).toLocaleString()} {yUnit}</span>
          <span>0 {yUnit}</span>
        </div>
        {/* Bars */}
        <div style={{ flex: 1, position: 'relative' }}>
          {/* Grid lines */}
          {[0, 50, 100].map((pct) => (
            <div key={pct} style={{ position: 'absolute', top: `${pct}%`, left: 0, right: 0, borderTop: '1px solid #EBEBED' }} />
          ))}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end' }}>
            {data.map((point) => {
              const cH = Math.round((point.consumption / yMax) * chartH);
              const gH = Math.round((point.generation / yMax) * chartH);
              return (
                <div key={point.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                    <div style={{ width: 14, height: cH, background: '#2386FF', borderRadius: '4px 4px 0 0' }} />
                    <div style={{ width: 14, height: gH, background: '#FFCC00', borderRadius: '4px 4px 0 0' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* X-axis */}
      <div style={{ display: 'flex', paddingLeft: 70, marginTop: 6 }}>
        {data.map((point) => (
          <div key={point.month} style={{ flex: 1, textAlign: 'center', fontSize: 11, fontWeight: 500, color: '#2A3347' }}>
            {point.month}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 12 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{ width: 10, height: 10, borderRadius: 4, background: '#2386FF' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#0B1220' }}>{series.consumptionLabel}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{ width: 10, height: 10, borderRadius: 4, background: '#FFCC00' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#0B1220' }}>{series.generationLabel}</span>
        </div>
      </div>

      {insight && (
        <div style={{ background: '#FFE992', borderRadius: 10, padding: 16, marginTop: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: '#2A3347', margin: 0 }}>{insight}</p>
        </div>
      )}
    </div>
  );
}

function PdfSystemBlock({ section }: { section: Extract<ReportSection, { type: 'system-recommendation' }> }) {
  return (
    <div style={{ background: '#FFE992', borderRadius: 14, padding: 32, pageBreakInside: 'avoid' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', textTransform: 'uppercase', marginBottom: 16 }}>
        {section.label}
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 16 }}>
        <div style={{ width: 78, height: 78, background: 'white', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, boxShadow: '0 2px 6px rgba(245,158,11,0.15)' }}>
          ☀️
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 52, fontWeight: 700, lineHeight: 1, letterSpacing: '-1.82px', color: '#0B1220' }}>{section.sizeKw}</span>
          <span style={{ fontSize: 26, fontWeight: 700, color: '#B45309' }}> kW </span>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#0B1220' }}>
            {section.panelCount} panels × 400W · ~{section.roofSqFt} sq ft of roof
          </span>
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.65)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#B45309', marginBottom: 6 }}>Why this size?</div>
        <p style={{ fontSize: 13, color: '#2A3347', lineHeight: 1.65, margin: 0 }}>{section.whySizeBody}</p>
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        {section.financials.map((fin) => (
          <div key={fin.label} style={{ flex: 1, borderLeft: '1px solid rgba(180,83,9,0.18)', paddingLeft: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.88px', textTransform: 'uppercase', marginBottom: 6 }}>{fin.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: fin.highlight ? '#047857' : '#0B1220', letterSpacing: '-0.65px', marginBottom: 4 }}>{fin.value}</div>
            <div style={{ fontSize: 12, color: 'rgba(75,75,80,0.75)', lineHeight: 1.4 }}>{fin.subtext}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PdfSizeTable({ section }: { section: Extract<ReportSection, { type: 'size-comparison' }> }) {
  return (
    <div style={{ background: 'white', borderRadius: 14, padding: '24px 32px', pageBreakInside: 'avoid', boxShadow: '0 2px 4px rgba(40,41,61,0.04), 0 4px 32px 16px rgba(96,97,112,0.04)' }}>
      <div style={{ display: 'flex', gap: 24, paddingLeft: 8, paddingBottom: 8 }}>
        <div style={{ width: 160, fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#2A3347', textTransform: 'uppercase' }}>SIZE TRADEOFFS</div>
        <div style={{ width: 80, textAlign: 'right', fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#2A3347', textTransform: 'uppercase' }}>NET COST</div>
        <div style={{ width: 80, textAlign: 'right', fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#2A3347', textTransform: 'uppercase' }}>PAYBACK</div>
        <div style={{ flex: 1, fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#2A3347', textTransform: 'uppercase' }}>VERDICT</div>
      </div>
      {section.options.map((opt) => (
        <div key={opt.label} style={{ display: 'flex', gap: 24, alignItems: 'flex-start', paddingLeft: 8, paddingTop: 16, paddingBottom: 16, borderTop: '1px solid #EBEBED', background: opt.isRecommended ? '#FFF8DE' : 'transparent' }}>
          <div style={{ width: 160 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: opt.isRecommended ? '#B45309' : '#0B1220' }}>{opt.label}</span>
              {opt.isRecommended && (
                <span style={{ fontSize: 11, fontWeight: 700, color: 'white', background: 'linear-gradient(135deg, #FCD34D, #D97706)', padding: '3px 8px', borderRadius: 6 }}>Recommended</span>
              )}
            </div>
            <div style={{ fontSize: 12, color: opt.isRecommended ? '#D97706' : '#2A3347', marginTop: 4 }}>{opt.subtext}</div>
          </div>
          <div style={{ width: 80, textAlign: 'right', fontSize: opt.isRecommended ? 13 : 14, fontWeight: opt.isRecommended ? 700 : 500, color: opt.isRecommended ? '#B45309' : '#0B1220' }}>{opt.netCost}</div>
          <div style={{ width: 80, textAlign: 'right', fontSize: opt.isRecommended ? 13 : 14, fontWeight: opt.isRecommended ? 700 : 500, color: opt.isRecommended ? '#B45309' : '#0B1220' }}>{opt.payback}</div>
          <div style={{ flex: 1, fontSize: 13, color: opt.isRecommended ? '#0B1220' : '#2A3347', lineHeight: 1.65 }}>{opt.verdict}</div>
        </div>
      ))}
    </div>
  );
}

function PdfRatePeriodBar({ periods }: { periods: Array<RatePeriod | ExportRatePeriod> }) {
  const total = periods.reduce((s, p) => s + p.widthFr, 0);
  const tierGradients: Record<string, string> = {
    '$': 'linear-gradient(to bottom, #94a3b8, #64748b)',
    '$$': 'linear-gradient(to bottom, #CBD5E1, #94A3B8)',
    '$$$': 'linear-gradient(to bottom, #FCD34D, #F59E0B)',
  };
  return (
    <div style={{ display: 'flex', gap: 1, height: 38, borderRadius: 10, overflow: 'hidden', width: '100%' }}>
      {periods.map((p, i) => {
        const isExport = 'rate' in p;
        const tier = isExport ? '$' : (p as RatePeriod).tier;
        const isHighlight = isExport && (p as ExportRatePeriod).isHighlight;
        const bg = isHighlight
          ? 'linear-gradient(to bottom, #FCD34D, #F59E0B)'
          : isExport
          ? 'linear-gradient(to bottom, #D6D3D1, #A8A29E)'
          : tierGradients[tier] || tierGradients['$'];
        return (
          <div key={i} style={{ flex: p.widthFr, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>
              {isExport ? (p as ExportRatePeriod).rate : tier}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PdfRatePlan({ section }: { section: Extract<ReportSection, { type: 'rate-plan' }> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, pageBreakInside: 'avoid' }}>
      <div style={{ display: 'flex', gap: 16 }}>
        {section.plans.map((plan) => (
          <div key={plan.title} style={{ flex: 1, borderRadius: 14, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, background: plan.isRecommended ? '#FFE992' : 'white', boxShadow: plan.isRecommended ? 'none' : '0 2px 4px rgba(40,41,61,0.04)' }}>
            <div>
              {plan.isRecommended ? (
                <div style={{ display: 'inline-flex', background: 'linear-gradient(135deg, #FCD34D, #D97706)', borderRadius: 10, padding: '4px 12px', marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'white', letterSpacing: '1px', textTransform: 'uppercase' }}>{plan.label}</span>
                </div>
              ) : (
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#2A3347', textTransform: 'uppercase', marginBottom: 8 }}>{plan.label}</div>
              )}
              <div style={{ fontSize: 20, fontWeight: 700, color: '#0B1220', marginBottom: 8 }}>{plan.title}</div>
              <p style={{ fontSize: 13, color: plan.isRecommended ? '#0B1220' : '#2A3347', lineHeight: 1.65, margin: 0 }}>{plan.description}</p>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: plan.isRecommended ? '#0B1220' : '#2A3347', marginBottom: 8 }}>IMPORT (YOU BUY FROM GRID)</div>
              <PdfRatePeriodBar periods={plan.importPeriods} />
              <div style={{ display: 'flex', marginTop: 4 }}>
                {plan.importPeriods.map((p, i) => (
                  <div key={i} style={{ flex: p.widthFr, textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#2A3347' }}>{p.timeRange}</div>
                ))}
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#2A3347', textTransform: 'uppercase' }}>ANNUAL SAVINGS</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: '#0B1220', letterSpacing: '-0.65px' }}>{plan.annualSavings}</div>
                  {plan.annualSavingsDelta && <div style={{ fontSize: 12, fontWeight: 700, color: '#D97706' }}>{plan.annualSavingsDelta}</div>}
                </div>
              </div>
              {plan.insight && (
                <div style={{ background: 'rgba(255,255,255,0.65)', borderRadius: 10, padding: 16, marginTop: 12 }}>
                  <p style={{ fontSize: 13, color: '#2A3347', lineHeight: 1.65, margin: 0 }}>{plan.insight}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Export card */}
      <div style={{ background: 'white', borderRadius: 14, padding: '24px 32px', boxShadow: '0 2px 4px rgba(40,41,61,0.04)', pageBreakInside: 'avoid' }}>
        {section.exportNote && (
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#2A3347', marginBottom: 16 }}>{section.exportNote}</div>
        )}
        <PdfRatePeriodBar periods={section.exportPeriods} />
        <div style={{ display: 'flex', marginTop: 4 }}>
          {section.exportPeriods.map((p, i) => (
            <div key={i} style={{ flex: p.widthFr, textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#2A3347' }}>{p.timeRange}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PdfSection({ section }: { section: ReportSection }) {
  switch (section.type) {
    case 'kpi-row': return <PdfKpiRow section={section} />;
    case 'bar-comparison': return <PdfBarChart section={section} />;
    case 'monthly-chart': return <PdfMonthlyChart section={section} />;
    case 'system-recommendation': return <PdfSystemBlock section={section} />;
    case 'size-comparison': return <PdfSizeTable section={section} />;
    case 'rate-plan': return <PdfRatePlan section={section} />;
    case 'inputs': {
      const hasBody = !!section.bodyParts?.length;
      const hasSecondary = !!section.secondaryChips?.length;
      const chipRow = (chips: typeof section.assumptions) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {chips.map((chip) => (
            <div key={chip.label} style={{ background: 'white', border: '1px solid rgba(255,255,255,0.8)', borderRadius: 999, padding: '8px 12px', display: 'flex', gap: 4, alignItems: 'center', boxShadow: '0 2px 8px rgba(139,92,246,0.08)' }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#2A3347' }}>{chip.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0B1220' }}>{chip.value}</span>
            </div>
          ))}
        </div>
      );
      return (
        <div style={{ background: '#F5F3FF', borderRadius: 14, padding: '24px 32px', pageBreakInside: 'avoid' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#6D28D9', textTransform: 'uppercase', marginBottom: 12 }}>{section.headline}</div>
          {hasBody && (
            <p style={{ fontSize: 13, lineHeight: 1.65, color: '#0B1220', margin: '0 0 16px' }}>
              {section.bodyParts!.map((part, i) =>
                part.bold
                  ? <strong key={i} style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.15px' }}>{part.text}</strong>
                  : <span key={i}>{part.text}</span>
              )}
            </p>
          )}
          {section.assumptions.length > 0 && (
            <>
              {hasBody && (
                <>
                  <div style={{ borderTop: '1px solid rgba(139,92,246,0.18)', margin: '16px 0' }} />
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#6D28D9', textTransform: 'uppercase', marginBottom: 12 }}>
                    {section.assumptionsLabel ?? 'PLUS A FEW ASSUMPTIONS'}
                  </div>
                </>
              )}
              {chipRow(section.assumptions)}
            </>
          )}
          {hasSecondary && (
            <>
              <div style={{ borderTop: '1px solid rgba(139,92,246,0.18)', margin: '16px 0' }} />
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#6D28D9', textTransform: 'uppercase', marginBottom: 12 }}>{section.secondaryLabel}</div>
              {chipRow(section.secondaryChips!)}
            </>
          )}
        </div>
      );
    }
    case 'neighborhood': return (
      <div style={{ background: '#F5F3FF', borderRadius: 14, padding: 32, pageBreakInside: 'avoid' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#6D28D9', textTransform: 'uppercase', marginBottom: 16 }}>YOUR NEIGHBORHOOD</div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <span style={{ fontSize: 52, fontWeight: 700, lineHeight: 1, letterSpacing: '-1.82px', color: '#0B1220' }}>{section.count}</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0B1220', lineHeight: 1.5, margin: '0 0 4px' }}>{section.headline}</p>
            <p style={{ fontSize: 13, color: '#0B1220', lineHeight: 1.65, margin: 0 }}>{section.body}</p>
          </div>
        </div>
      </div>
    );
    case 'faq': return (
      // PDF: all answers expanded, no accordion
      <div style={{ pageBreakInside: 'avoid' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#2A3347', textTransform: 'uppercase', marginBottom: 16 }}>COMMON QUESTIONS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {section.items.map((item, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 10, padding: '16px 24px', boxShadow: '0 2px 4px rgba(40,41,61,0.04)', pageBreakInside: 'avoid' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1220', marginBottom: 8 }}>{item.question}</div>
              <p style={{ fontSize: 13, color: '#2A3347', lineHeight: 1.65, margin: 0 }}>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
    case 'cta-banner': return (
      <div style={{ background: '#FFE992', borderRadius: 14, padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, pageBreakInside: 'avoid' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#0B1220', marginBottom: 4 }}>{section.headline}</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#2A3347' }}>{section.subtext}</div>
        </div>
        {/* In PDF: button becomes styled box with URL printed */}
        <div style={{ background: 'linear-gradient(to bottom, #FCD34D, #F59E0B)', borderRadius: 10, padding: '12px 24px', fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
          {section.buttonLabel}
        </div>
      </div>
    );
    case 'narrative': return (
      <p style={{ fontSize: 13, color: '#2A3347', lineHeight: 1.65, margin: 0 }}>
        {section.body.map((part, i) =>
          part.bold ? <strong key={i}>{part.text}</strong> : <span key={i}>{part.text}</span>
        )}
      </p>
    );
    default: return null;
  }
}

// ─── Full HTML document ──────────────────────────────────────────────────────

export function buildPdfHtml(report: Report, fontBaseUrl = '/fonts'): string {
  const customer = report.customer;
  const branding = report.branding;
  const totalPages = '{{TOTAL_PAGES}}'; // replaced post-render by Playwright if needed

  const sectionsHtml = report.sections
    .map((section) => {
      // We render each section to a string by calling renderToStaticMarkup in generate-pdf.ts.
      // This function is the React tree; the caller handles renderToStaticMarkup.
      return section; // placeholder — see note in generate-pdf.ts
    });

  // Note: this component is imported and rendered via renderToStaticMarkup in generate-pdf.ts.
  // The function below returns a full HTML string with the sections already embedded.
  // It's called once per report.
  return ''; // implemented in generate-pdf.ts via React rendering
}

// The default export is the React component Playwright will render
export default function ReportPdfDocument({ report }: { report: Report }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{report.title}</title>
        <style>{`
          @font-face {
            font-family: 'DM Sans';
            src: url('/fonts/DM_Sans[opsz,wght].ttf') format('truetype');
            font-weight: 100 900;
            font-style: normal;
          }

          * { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: 'DM Sans', 'Helvetica Neue', Arial, sans-serif;
            background: #F7F7F8;
            color: #0B1220;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          @page {
            size: Letter;
            margin: 0.75in 0.75in 1in 0.75in;

            @top-center {
              content: "${report.branding.companyName} — ${report.customer.name}";
              font-size: 10px;
              color: #2A3347;
              font-family: 'DM Sans', sans-serif;
            }

            @bottom-center {
              content: "Page " counter(page) " of " counter(pages);
              font-size: 10px;
              color: #5B6578;
              font-family: 'DM Sans', sans-serif;
            }
          }

          .page-break { page-break-before: always; }
          .avoid-break { page-break-inside: avoid; }
        `}</style>
      </head>
      <body>
        {/* Cover page */}
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '80px 0', pageBreakAfter: 'always' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.1px', color: '#5B6578', textTransform: 'uppercase', marginBottom: 16 }}>
            {report.branding.companyName}
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-1.5px', color: '#0B1220', maxWidth: 520, marginBottom: 24 }}>
            {report.title}
          </h1>
          <p style={{ fontSize: 15, color: '#2A3347', lineHeight: 1.65, maxWidth: 480, marginBottom: 48 }}>
            {report.subtitle}
          </p>
          <div style={{ borderTop: '1px solid #EBEBED', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0B1220' }}>{customer.name}</div>
            <div style={{ fontSize: 13, color: '#2A3347' }}>Account #{customer.accountNumber} · ZIP {customer.zip}</div>
            <div style={{ fontSize: 13, color: '#2A3347' }}>Prepared {customer.date}</div>
          </div>
        </div>

        {/* Report body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {report.sections.map((section, i) => (
            <div key={i}>
              <PdfSection section={section} />
            </div>
          ))}
        </div>

        {/* Footer attribution */}
        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #EBEBED', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: '#5B6578', lineHeight: 1.6 }}>
            Prepared for <strong style={{ color: '#2A3347' }}>{customer.name}</strong> · {customer.date} · {branding.companyName}
          </p>
          {report.sources && (
            <p style={{ fontSize: 11, color: '#5B6578', lineHeight: 1.6, marginTop: 4 }}>
              Sources: {report.sources.join(' · ')}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
