'use client';

interface Props {
  title: string;
}

/** Stand-in for bill-related widgets (Bill Analysis, Monthly Summary, Energy Details, etc.). */
export default function BillToolPlaceholderPanel({ title }: Props) {
  return (
    <div className="bill-tool-placeholder">
      <div className="bill-tool-placeholder-icon" aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="6" y="4" width="28" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 14h16M12 20h16M12 26h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="bill-tool-placeholder-title">{title}</h3>
      <p className="bill-tool-placeholder-body">
        This widget flow is coming soon. For now, this panel is a placeholder while we wire the full
        experience.
      </p>
    </div>
  );
}
