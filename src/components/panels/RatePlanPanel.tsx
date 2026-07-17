'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useChatStore } from '@/lib/chat/store';
import { USER } from '@/lib/data/user';
import { buildRatePlanReport } from '@/lib/data/computations';
import { exportPdf } from '@/lib/pdf/export';
import { ReportWebView } from '@/report/web/ReportWebView';

// RatePlanPanel — full pixel-perfect Rate Plan Comparison report rebuilt
// against Figma 1476:10242. Replaces the old card-stack rate report with
// the same ReportWebView pipeline used by solar / EV / bill explainer.
export default function RatePlanPanel() {
  const reportRef = useRef<HTMLDivElement>(null);
  const setPanelDownloadHandler = useChatStore((s) => s.setPanelDownloadHandler);

  const report = useMemo(() => buildRatePlanReport(USER), []);

  useEffect(() => {
    setPanelDownloadHandler(async () => {
      if (reportRef.current) {
        await exportPdf(reportRef.current, `rate-plan-report-${USER.name.toLowerCase()}`);
      }
    });
    return () => setPanelDownloadHandler(null);
  }, [setPanelDownloadHandler]);

  return (
    <div ref={reportRef}>
      <ReportWebView report={report} />
    </div>
  );
}
