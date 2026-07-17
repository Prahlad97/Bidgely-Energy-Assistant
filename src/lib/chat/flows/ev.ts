// EV flow — multi-step Q&A leading to the EV Savings Analysis report.
//
//   step 0: assistant asks "how many miles per month?"
//   step 1: user picks mileage → assistant asks "where would you charge?"
//   step 2: user picks charging location → assistant shows savings table + CTA
//   step 3: user clicks "Yes, show full breakdown" → opens 'ev' panel
//
// Mirrors the original HTML's EV_FLOW (lines ~1976-2030) but normalized for
// the typed React/Zustand world.

import type { ChatMessage, FlowData } from '../types';
import { USER } from '@/lib/data/user';

function id() {
  return Math.random().toString(36).slice(2);
}

function tableRows(rows: { label: string; value: string }[]) {
  const body = rows.map((r) => `| ${r.label} | ${r.value} |`).join('\n');
  return `| | |\n|---|---|\n${body}`;
}

/** Step-keyed assistant messages for the EV flow. */
export function getEvStep(step: number, data: FlowData): ChatMessage {
  switch (step) {
    case 0:
      return {
        id: id(),
        role: 'assistant',
        text:
          `Great question — I can give you a personalised estimate.\n\n` +
          `About how many miles do you drive each month?`,
        options: [
          { label: '< 500 mi', value: 'I drive around 500 miles each month' },
          { label: '~1,000 mi', value: 'I drive around 1000 miles each month', note: 'most common' },
          { label: '~1,500 mi', value: 'I drive around 1500 miles each month' },
          { label: '~2,000+ mi', value: 'I drive around 2000 miles each month' },
        ],
        timestamp: Date.now(),
      };

    case 1: {
      const miles = (data.miles as number) || 1000;
      const fuelNote =
        miles >= 1200
          ? 'At that level of driving, fuel costs add up significantly.'
          : miles >= 700
          ? 'At that level of driving, fuel costs tend to add up quickly.'
          : 'Even at that mileage, switching to EV can reduce your fuel costs.';

      return {
        id: id(),
        role: 'assistant',
        text:
          `Got it — about ${miles.toLocaleString()} miles/month. ${fuelNote}\n\n` +
          `Where would you mostly charge your EV?`,
        options: [
          { label: 'At home', value: 'I would mostly charge at home' },
          { label: 'Public charging', value: 'I would mostly use public charging' },
        ],
        timestamp: Date.now(),
      };
    }

    case 2: {
      // The chat side intentionally does NOT reveal the answer (today's
      // total, EV total, savings). Those live in the right-panel EV report.
      // The bubble orients on context (mileage, charging style) and offers
      // the full breakdown.
      const miles = (data.miles as number) || 1000;
      const atHome = data.charging === 'home';

      const note = atHome
        ? `Home charging on E-TOU-C gets you off-peak rates (~$0.14/kWh overnight) — that's where most of the win comes from.`
        : `Public charging works — and home charging on E-TOU-C is even cheaper if you add it later.`;

      return {
        id: id(),
        role: 'assistant',
        text:
          `${note}\n\n` +
          `Based on ~${miles.toLocaleString()} miles/month at CA gas prices, I've put together a side-by-side breakdown of cost today vs with an EV. Open the report to see the full numbers.`,
        reportCard: {
          label: 'View EV Savings Analysis',
          panel: 'ev',
          panelTitle: 'EV Savings Analysis',
        },
        options: [
          { label: 'Yes, show full report', value: '__open_ev_panel__', isReport: true },
          { label: 'No thanks', value: '__reset__' },
        ],
        timestamp: Date.now(),
      };
    }

    default:
      return {
        id: id(),
        role: 'assistant',
        text: 'Something went off track. Type anything to start over.',
        timestamp: Date.now(),
      };
  }
}

/** Parse the user's free-text mileage answer into a number. */
export function parseMiles(answer: string): number {
  const digits = answer.replace(/\D/g, '');
  const n = parseInt(digits, 10);
  return Number.isFinite(n) && n > 0 ? n : 1000;
}

/** Parse the charging-location answer. */
export function parseCharging(answer: string): 'home' | 'public' {
  return /home/i.test(answer) ? 'home' : 'public';
}

// Legacy export — kept so existing call sites that kick off the EV flow with
// `getEvMessage()` continue to work; it now returns the introductory step 0.
export function getEvMessage(): ChatMessage {
  return getEvStep(0, {});
}
