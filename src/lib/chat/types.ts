export type PanelKey =
  | 'solar-dynamic'
  | 'ev'
  | 'bill-report'
  | 'rate-report'
  | 'optimizer'
  | 'bill'
  | 'bill-tool'
  | 'monthly-summary'
  | 'energy-details'
  | 'usage'
  | 'rate';

export interface MessageOption {
  label: string;
  value: string;
  note?: string;
  isReport?: boolean;
}

export interface ReportCard {
  label: string;
  panel: PanelKey;
  panelTitle: string;
}

export interface AnalysisProfileRow {
  icon: string;
  label: string;
  value: string;
}

export interface AnalysisProfileSection {
  heading: string;
  rows: AnalysisProfileRow[];
}

/** Inline widgets rendered directly inside an assistant chat bubble.
 *  Discriminated by `type`; each variant carries its own data shape. */
export type ChatWidget =
  | {
      type: 'projected-bill';
      current?: number;
      projected?: number;
      progressPct?: number;
    }
  | {
      type: 'analysis-profile';
      sections: AnalysisProfileSection[];
    };

export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  options?: MessageOption[];
  reportCard?: ReportCard;
  /** Inline widget rendered inside the assistant bubble (mini chart, KPI, etc.). */
  widget?: ChatWidget;
  /** Panel to open immediately when this message renders */
  openPanel?: { key: PanelKey; title: string };
  timestamp: number;
}

export interface DispatchResult {
  message: ChatMessage;
  /** Start a named flow at step 0. */
  startFlow?: 'solar' | 'ev';
  /** Open a side panel immediately when the message renders. */
  openPanel?: { key: PanelKey; title: string };
}

export type FlowName = 'solar' | 'ev' | null;

export interface FlowData {
  // Solar
  roof?: 'small' | 'medium' | 'large';
  shade?: 'none' | 'partial' | 'heavy';
  // EV
  miles?: number;
  charging?: 'home' | 'public';
  [key: string]: unknown;
}
