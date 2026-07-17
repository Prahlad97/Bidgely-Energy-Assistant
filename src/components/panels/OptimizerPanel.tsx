'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useChatStore } from '@/lib/chat/store';
import { USER } from '@/lib/data/user';
import { buildOptimizerReport } from '@/lib/data/computations';
import { exportPdf } from '@/lib/pdf/export';
import { ReportWebView } from '@/report/web/ReportWebView';

// OptimizerPanel — full pixel-perfect Home Bill Optimiser rebuilt against
// Figma 1497:11276. Replaces the old card-stack opportunities view with
// the same ReportWebView pipeline used by solar / EV / rate-plan / bill.
export default function OptimizerPanel() {
  const reportRef = useRef<HTMLDivElement>(null);
  const setPanelDownloadHandler = useChatStore((s) => s.setPanelDownloadHandler);

  const report = useMemo(() => buildOptimizerReport(USER), []);

  useEffect(() => {
    setPanelDownloadHandler(async () => {
      if (reportRef.current) {
        await exportPdf(reportRef.current, `optimizer-report-${USER.name.toLowerCase()}`);
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
