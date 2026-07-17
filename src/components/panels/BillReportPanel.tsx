'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useChatStore } from '@/lib/chat/store';
import { USER } from '@/lib/data/user';
import { buildBillExplainerReport } from '@/lib/data/computations';
import { exportPdf } from '@/lib/pdf/export';
import { ReportWebView } from '@/report/web/ReportWebView';

// BillReportPanel — full pixel-perfect High Bill Explainer rebuilt against
// Figma 1476:9667. Replaces the old card stack + BillStackedChart with the
// same ReportWebView pipeline used by solar / EV / rate-plan.
export default function BillReportPanel() {
  const reportRef = useRef<HTMLDivElement>(null);
  const setPanelDownloadHandler = useChatStore((s) => s.setPanelDownloadHandler);

  const report = useMemo(() => buildBillExplainerReport(USER), []);

  useEffect(() => {
    setPanelDownloadHandler(async () => {
      if (reportRef.current) {
        await exportPdf(reportRef.current, `bill-report-${USER.name.toLowerCase()}`);
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
