// Single source of truth for advancing an active conversational flow by one
// step in response to a user message (typed text OR option click).
//
// Returning `null` signals "this input doesn't advance the current flow" —
// the caller should fall through to the regular dispatcher.

import type { ChatMessage, FlowName, FlowData, PanelKey } from '../types';
import { getEvStep, parseMiles, parseCharging } from './ev';

export interface AdvanceResult {
  /** The assistant's next message in the flow. */
  message: ChatMessage;
  /** New step index to write into the store. */
  nextStep: number;
  /** Updated flow data (carries roof / shade / miles / charging across steps). */
  nextData: FlowData;
  /** True when the flow has reached its terminal step — caller should clear flow state. */
  done: boolean;
  /** When set, caller should also call openPanel(key, title) — the terminal step
   *  of each flow auto-opens the corresponding report. The reportCard chip in
   *  the message remains as a handle to re-open the panel later. */
  openPanel?: { key: PanelKey; title: string };
}

export function advanceFlowStep(
  text: string,
  flow: FlowName,
  step: number,
  data: FlowData,
): AdvanceResult | null {
  if (!flow) return null;

  // ── EV ──────────────────────────────────────────────────────────────────
  if (flow === 'ev') {
    if (step === 0) {
      const miles = parseMiles(text);
      const nextData = { ...data, miles };
      return { message: getEvStep(1, nextData), nextStep: 1, nextData, done: false };
    }
    if (step === 1) {
      const charging = parseCharging(text);
      const nextData = { ...data, charging };
      return {
        message: getEvStep(2, nextData),
        nextStep: 2,
        nextData,
        done: true,
        openPanel: { key: 'ev', title: 'EV Savings Analysis' },
      };
    }
  }

  return null;
}
