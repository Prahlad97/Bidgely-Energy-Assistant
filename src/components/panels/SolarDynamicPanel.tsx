'use client';

import { useEffect, useRef } from 'react';
import { useChatStore } from '@/lib/chat/store';
import { buildDynamicSolarReport } from '@/lib/data/computations';
import { USER } from '@/lib/data/user';
import { ReportWebView } from '@/report/web/ReportWebView';
import { exportPdf } from '@/lib/pdf/export';

export default function SolarDynamicPanel() {
  const flowData = useChatStore((s) => s.flowData);
  const setPanelDownloadHandler = useChatStore((s) => s.setPanelDownloadHandler);
  const reportRef = useRef<HTMLDivElement>(null);

  const roof = (flowData.roof as 'small' | 'medium' | 'large') ?? 'medium';
  const shade = (flowData.shade as 'none' | 'partial' | 'heavy') ?? 'none';
  const report = buildDynamicSolarReport(roof, shade, USER);

  useEffect(() => {
    setPanelDownloadHandler(async () => {
      if (reportRef.current) {
        await exportPdf(reportRef.current, `solar-report-${USER.name.toLowerCase()}`);
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
