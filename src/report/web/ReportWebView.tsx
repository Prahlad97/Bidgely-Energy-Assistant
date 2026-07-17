// ReportWebView — single component for both desktop side-panel and mobile.
// Mobile-first, designed from 380px up. The parent constrains the width;
// this component fills it without horizontal overflow at any width.

import type { Report, ReportSection } from '../types';
import { KpiRow } from './components/KpiRow';
import { BarComparisonChart } from './components/BarComparisonChart';
import { MonthlyChart } from './components/MonthlyChart';
import { SystemBlock } from './components/SystemBlock';
import { SizeComparisonTable } from './components/SizeComparisonTable';
import { HourlyProfile } from './components/HourlyProfile';
import { RatePlan } from './components/RatePlan';
import { InputsBlock } from './components/InputsBlock';
import { NeighborhoodBlock } from './components/NeighborhoodBlock';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { CostComparisonBar } from './components/CostComparisonBar';
import { CostBreakdownTable } from './components/CostBreakdownTable';
import { TweaksGrid } from './components/TweaksGrid';
import { AlternativePlansTable } from './components/AlternativePlansTable';
import { BillKpiTiles } from './components/BillKpiTiles';
import { TrendBarChart } from './components/TrendBarChart';
import { DriverBreakdown } from './components/DriverBreakdown';
import { NumberedInsights } from './components/NumberedInsights';
import { OptimizerSummary } from './components/OptimizerSummary';
import { TopSavingsTips } from './components/TopSavingsTips';
import { RatePlanSavings } from './components/RatePlanSavings';
import { ApplianceEfficiency } from './components/ApplianceEfficiency';
import { CapitalActions } from './components/CapitalActions';
import { BillDonut } from './components/BillDonut';
import { WhatsIncluded } from './components/WhatsIncluded';
import { EfficiencyDeepDive } from './components/EfficiencyDeepDive';

// Section types whose components render edge-to-edge (their own padding /
// own surface). They opt out of the default px-8 pb-6 wrapper.
const FULL_BLEED = new Set([
  'optimizer-summary',
  'top-savings-tips',
  'rate-plan-savings',
  'appliance-efficiency',
  'capital-actions',
]);

function Section({ section }: { section: ReportSection }) {
  switch (section.type) {
    case 'kpi-row':
      return <KpiRow section={section} />;
    case 'bar-comparison':
      return <BarComparisonChart section={section} />;
    case 'monthly-chart':
      return <MonthlyChart section={section} />;
    case 'system-recommendation':
      return <SystemBlock section={section} />;
    case 'size-comparison':
      return <SizeComparisonTable section={section} />;
    case 'hourly-profile':
      return <HourlyProfile section={section} />;
    case 'rate-plan':
      return <RatePlan section={section} />;
    case 'inputs':
      return <InputsBlock section={section} />;
    case 'neighborhood':
      return <NeighborhoodBlock section={section} />;
    case 'faq':
      return <FaqSection section={section} />;
    case 'cta-banner':
      return <CtaBanner section={section} />;
    case 'cost-comparison-bar':
      return <CostComparisonBar section={section} />;
    case 'cost-breakdown':
      return <CostBreakdownTable section={section} />;
    case 'tweaks-grid':
      return <TweaksGrid section={section} />;
    case 'alternative-plans-table':
      return <AlternativePlansTable section={section} />;
    case 'bill-kpi-tiles':
      return <BillKpiTiles section={section} />;
    case 'trend-bar-chart':
      return <TrendBarChart section={section} />;
    case 'driver-breakdown':
      return <DriverBreakdown section={section} />;
    case 'numbered-insights':
      return <NumberedInsights section={section} />;
    case 'optimizer-summary':
      return <OptimizerSummary section={section} />;
    case 'top-savings-tips':
      return <TopSavingsTips section={section} />;
    case 'rate-plan-savings':
      return <RatePlanSavings section={section} />;
    case 'appliance-efficiency':
      return <ApplianceEfficiency section={section} />;
    case 'capital-actions':
      return <CapitalActions section={section} />;
    case 'bill-donut':
      return <BillDonut section={section} />;
    case 'whats-included':
      return <WhatsIncluded section={section} />;
    case 'efficiency-deepdive':
      return <EfficiencyDeepDive section={section} />;
    case 'narrative':
      // Webapp/Label/SS/Regular (14/20) in Foreground/500
      return (
        <p className="text-[14px] leading-[20px] text-[#262E40]">
          {section.body.map((part, i) =>
            part.bold ? <strong key={i}>{part.text}</strong> : <span key={i}>{part.text}</span>
          )}
        </p>
      );
    default:
      // TypeScript will error here if a new section type is added but not handled
      return null;
  }
}

interface Props {
  report: Report;
  className?: string;
}

export function ReportWebView({ report, className = '' }: Props) {
  const titleWords = report.title.split(' ');
  const accentSet = new Set(report.titleAccentWords);
  // Solar default = Web/Appliance/Solar/700. Reports can override per-domain
  // (EV uses Web/Green/600, bill explainers use Web/Info/500, etc.).
  const accentColor = report.titleAccentColor ?? '#A9640B';

  return (
    <div
      // py-6 (24px top + 24px bottom) added per Figma — gives the report a
      // breathing margin against the panel scroll edges instead of starting
      // flush with the sticky header / footer.
      className={`bg-[#FBFBFC] w-full max-w-full overflow-x-hidden flex flex-col py-6 ${className}`}
      style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
    >
      {/*
        Brand pill + customer info header is intentionally NOT rendered here.
        It lives only in the downloadable PDF (see ReportPdfTemplate.tsx).
        In the side panel, the panel header already shows "Solar Savings Report"
        and the customer is implied by the surrounding app context.
      */}

      {/* Title block — Webapp/Display/LL (28/32 Bold), padding 24/32/32/32.
          When whiteSurface is on (Optimizer), the title sits on a white band
          flush with the white sections below it; outer stays FBFBFC so the
          report-card top/bottom padding still reads. */}
      <div className={`${report.whiteSurface ? 'bg-white' : ''} px-8 pt-6 pb-8 flex flex-col gap-3`}>
        <h1 className="text-[28px] font-bold leading-[32px] text-[#000000]">
          {titleWords.map((word, i) => {
            // Keep digits so titles like "save $912 a year" can highlight
            // numeric tokens (the "$" and other punctuation still strips).
            const bare = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            const isAccent = accentSet.has(bare);
            return (
              <span key={i}>
                {isAccent ? (
                  <span style={{ color: accentColor }}>{word}</span>
                ) : (
                  word
                )}
                {i < titleWords.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </h1>
        {/* Subtitle — Webapp/Label/SS/Regular (14/20) in Foreground/500 */}
        <p className="text-[14px] leading-[20px] text-[#262E40]">{report.subtitle}</p>
      </div>

      {/* Sections — default wrapper is px-8 pb-6. Sections in FULL_BLEED
          render edge-to-edge (white-surface bands handle their own padding).
          The Optimizer report uses full-bleed for every section. */}
      {report.sections.map((section, i) =>
        FULL_BLEED.has(section.type) ? (
          <div key={i} className="w-full max-w-full">
            <Section section={section} />
          </div>
        ) : (
          <div key={i} className="px-8 pb-6 w-full max-w-full">
            <Section section={section} />
          </div>
        )
      )}

      {/* Footer — Webapp/Label/XS/Regular (12/16) in Foreground/400 */}
      <div className={`${report.whiteSurface ? 'bg-white' : ''} px-8 pb-10 pt-10 flex flex-col items-center gap-1`}>
        <p className="text-[12px] leading-[16px] text-center text-[#66758D]">
          <span>Prepared for </span>
          <span className="font-semibold text-[#262E40]">{report.customer.name}</span>
          <span> · {report.customer.date} · {report.branding.companyName}</span>
        </p>
        {report.sources && (
          <p className="text-[12px] leading-[16px] text-center text-[#66758D]">
            Sources: {report.sources.join(' · ')}
          </p>
        )}
      </div>
    </div>
  );
}
