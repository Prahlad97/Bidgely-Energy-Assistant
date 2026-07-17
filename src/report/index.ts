// Public API for the report system

export type { Report, ReportSection, CustomerInfo, BrandingInfo } from './types';
export type {
  KpiRowSection,
  BarComparisonSection,
  MonthlyChartSection,
  SystemRecommendationSection,
  SizeComparisonSection,
  RatePlanSection,
  InputsSection,
  NeighborhoodSection,
  FaqSection,
  CtaBannerSection,
  NarrativeSection,
} from './types';

export { ReportWebView } from './web/ReportWebView';
export { generateReportPdf } from './pdf/generate-pdf';
export { solarReport } from './sample/solar-report';
