// Free-text + option-click dispatcher for the chat assistant.
//
// Matching strategy: text is normalized (lowercased, trimmed, whitespace
// collapsed, surrounding punctuation stripped, smart-quotes flattened) before
// any pattern check, and each intent has multiple regex variants so phrasings
// like "is the EV worth it" / "is an EV good for me" / "ev worth getting" all
// land on the same intent.

import type { ChatMessage, DispatchResult, MessageOption, PanelKey } from './types';
import { USER } from '@/lib/data/user';
import { tryDispatchBillSuggestion } from './billSuggestions';

// Estimated monthly cost on each rate plan (mirrors the original HTML).
// Our typed RatePlan struct only carries avgRate; for the conversational
// flow we want concrete dollar figures, so we colocate them here.
const RATE_PLAN_MONTHLY: Record<string, number> = {
  e1: Math.round(USER.bill.totalCost),
  'e-tou-c': 121,
};

function id() {
  return Math.random().toString(36).slice(2);
}

function msg(text: string, extras: Partial<ChatMessage> = {}): ChatMessage {
  return { id: id(), role: 'assistant', text, timestamp: Date.now(), ...extras };
}

const DEFAULT_OPTIONS: MessageOption[] = [
  { label: '☀️ Is solar worth it for me?', value: 'Is solar worth it for me?' },
  { label: '🚗 Is an EV a good fit?', value: 'Is an EV a good fit for me?' },
  { label: '💡 Why is my bill higher?', value: 'Why is my bill higher this month?' },
  { label: '📋 Am I on the best rate plan?', value: 'Am I on the best rate plan?' },
];

// ── Normalization ───────────────────────────────────────────────────────────
function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '');
}

function matchAny(t: string, ...patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(t));
}

// ── Public entry point ─────────────────────────────────────────────────────
export type { DispatchResult } from './types';

export function dispatchInput(input: string): DispatchResult {
  const raw = input.trim();
  const t = normalize(raw);

  const billSuggestion = tryDispatchBillSuggestion(raw);
  if (billSuggestion) return billSuggestion;

  // ── Internal sentinels (option-click panel openers) ──────────────────────
  if (raw === '__reset__') {
    return { message: msg(`No problem — what else can I help you with?`, { options: DEFAULT_OPTIONS }) };
  }
  // Each panel-open response carries BOTH a reportCard chip (so the user can
  // re-open the panel later from the chat thread) AND the openPanel directive
  // (so the panel auto-opens immediately on intent).
  if (raw === '__open_solar_panel__') {
    return {
      message: msg(`Here's your personalised solar savings analysis — based on your roof size, shading, and current energy usage.`, {
        reportCard: { label: 'View Solar Savings Report', panel: 'solar-dynamic', panelTitle: 'Solar Savings Report' },
      }),
      openPanel: { key: 'solar-dynamic', title: 'Solar Savings Report' },
    };
  }
  if (raw === '__open_ev_panel__') {
    return {
      message: msg(`Here's your personalised EV savings analysis — based on your fuel spend and charging setup.`, {
        reportCard: { label: 'View EV Savings Analysis', panel: 'ev', panelTitle: 'EV Savings Analysis' },
      }),
      openPanel: { key: 'ev', title: 'EV Savings Analysis' },
    };
  }
  if (raw === '__open_bill_report__') {
    return {
      message: msg(`Here's your bill analysis — breaking down what changed, why it changed, and exactly what to do about it.`, {
        reportCard: { label: 'View High Bill Report', panel: 'bill-report', panelTitle: 'High Bill Report — March 2026' },
      }),
      openPanel: { key: 'bill-report', title: 'High Bill Report — March 2026' },
    };
  }
  if (raw === '__open_rate_report__') {
    return {
      message: msg(`Here's your personalised rate plan comparison — based on your usage profile and current bill.`, {
        reportCard: { label: 'View Rate Plan Comparison', panel: 'rate-report', panelTitle: 'Rate Plan Comparison' },
      }),
      openPanel: { key: 'rate-report', title: 'Rate Plan Comparison' },
    };
  }
  if (raw === '__open_optimizer__') {
    return {
      message: msg(`Here's your personalised Home Bill Optimiser — showing exactly where your energy is going and how to reduce it.`, {
        reportCard: { label: 'View Home Bill Optimiser', panel: 'optimizer', panelTitle: 'Home Bill Optimiser' },
      }),
      openPanel: { key: 'optimizer', title: 'Home Bill Optimiser' },
    };
  }

  // ── "What's my bill going to look like next month?" — bill-projection widget ─
  // (Lives ahead of the higher/lower bill intents because it's more specific.)
  if (matchAny(
    t,
    /\b(next|coming|upcoming) month\b.*\bbill\b/,
    /\bbill\b.*\b(next|coming|upcoming) month\b/,
    /\b(forecast|predict|projection|projected|estimate)\b.*\bbill\b/,
    /\bbill\b.*\b(forecast|prediction|projection|projected|estimate)\b/,
    /\bwhat.{0,12}(will|would|gonna|going to)\b.*\bbill\b/,
    /\bhow much.{0,12}\bbill\b/,
  )) {
    return {
      message: msg(
        // Architecture: the projection number lives in the widget below, not
        // in the chat text. The text only orients.
        `Based on your usage so far this month, here's how your bill is tracking by your billing date:`,
        {
          widget: { type: 'projected-bill', current: 47, projected: 165, progressPct: 22 },
        },
      ),
    };
  }

  // ── 1. "Why is my bill higher?" / "Analyse my latest bill" (free-text; bill-chip uses tryDispatchBillSuggestion) ─
  if (matchAny(
    t,
    /\b(why|reason).*\bbill\b.*\b(high|higher|up|spike|increas|more|expensive)\b/,
    /\bbill\b.*\b(higher|went up|going up|increased|more expensive)\b/,
    /\b(high|higher|expensive|spiked)\b.*\bbill\b/,
    /\bbill\b.*\bhigher\b/,
    /\banaly[sz]e?\b.*\bbill\b/,
    /\bbill\b.*\banaly[sz]e?\b/,
  )) {
    return {
      message: msg(
        `Yes — this cycle did come in higher than usual. I've broken it apart into what actually changed and how much each piece contributed.`,
        {
          reportCard: {
            label: 'View High Bill Report',
            panel: 'bill-report',
            panelTitle: 'High Bill Report — March 2026',
          },
        },
      ),
      openPanel: { key: 'bill-report', title: 'High Bill Report — March 2026' },
    };
  }

  // ── 2. "How can I lower my bill?" / generic savings intent ───────────────
  if (matchAny(
    t,
    /\b(lower|reduc|cut|decreas)\b.*\b(bill|cost|costs|energy|spend|spending)\b/,
    /\b(how can i|how do i|ways to)\b.*\b(save|sav|lower|reduc|cut)\b/,
    /\bsave money\b/,
    /\b(tip|tips|optimi|efficient|cheaper)\b/,
  )) {
    return {
      message: msg(
        // Architecture: chat orients only. The "where" (HVAC vs water vs
        // baseload), the "what to do" (specific actions), and every $/yr
        // figure live in the Home Bill Optimiser report.
        `There's a clear gap between what you spend and what efficient peers spend — and a stack of small actions that close most of it.\n\n` +
          `Want me to walk through every action and how much each one is worth?`,
        {
          options: [
            { label: 'Yes, show me', value: '__open_optimizer__', isReport: true },
            { label: 'No thanks', value: '__reset__' },
          ],
        },
      ),
    };
  }

  // ── 3. Rate plan intent ──────────────────────────────────────────────────
  if (matchAny(
    t,
    /\b(am i on|on the).*\b(best|right|cheapest)\b.*\b(rate|plan)\b/,
    /\b(best|right|cheapest|better)\b.*\b(rate|plan)\b/,
    /\b(find|get|switch|want|need)\b.*\b(rate|plan)\b/,
    /\b(rate plan|e-?tou|e-?1|tariff)\b/,
    /\bcompare\b.*\b(rate|plan)\b/,
  )) {
    return {
      message: msg(
        // Architecture: chat orients only. The "why" (peak hours), the
        // "which plan" (TOU Saver Plan A), and the "how much" (savings)
        // all live in the rate-plan report, not in the chat text.
        `I've compared 6 eligible rate plans against 12 months of your actual usage.\n\n` +
          `Want me to show the full comparison and which plan fits your pattern best?`,
        {
          options: [
            { label: 'Yes, show rate comparison', value: '__open_rate_report__', isReport: true },
            { label: 'No thanks', value: '__reset__' },
          ],
        },
      ),
    };
  }

  // ── 4. EV intent — start the EV flow ────────────────────────────────────
  if (matchAny(
    t,
    /\b(is an?|should i get|worth getting an?|good fit for|considering)\b.*\bev\b/,
    /\bev\b.*\b(worth|good fit|good for me|right for me|a good idea)\b/,
    /\belectric vehicle\b/,
    /\bev\b.*\b(charg|cost|saving|breakdown)\b/,
    /^ev$/,
  )) {
    return { message: msg(''), startFlow: 'ev' };
  }

  // ── 5. Solar intent — start the solar flow ──────────────────────────────
  if (matchAny(
    t,
    /\b(is solar|solar worth|worth (it|getting))\b/,
    /\b(should i get|thinking of|considering)\b.*\bsolar\b/,
    /\b(solar|photovoltaic|pv panels?|rooftop)\b/,
    /^panels?$/,
  )) {
    return { message: msg(''), startFlow: 'solar' };
  }

  // ── 6. "Show me my bill" / "What changed in my usage?" — bill snapshot ──
  if (matchAny(
    t,
    /\bwhat\b.*\b(changed|different)\b.*\b(usage|bill|month)\b/,
    /\bshow\b.*\bbill\b/,
    /\b(my bill|the bill|view bill)\b/,
    /\b(charge|invoice|statement|tier|baseline)\b/,
    /\bbill\b/,
  )) {
    return {
      message: msg(
        // Architecture: dollar amounts (total, electric, gas) and tier
        // breakdowns live in the bill report on the right. The chat only
        // orients on the rate plan and the tier dynamic.
        `I've pulled up your most recent Energy Co bill on the right.\n\n` +
          `You're on the **E-1 Tiered Rate** plan — once you cross the baseline allowance each additional kWh costs significantly more, which is why higher-usage months hit your bill harder.\n\n` +
          `Let me know if you'd like me to explain any specific line item.`,
        {
          reportCard: { label: 'View Bill Breakdown', panel: 'bill', panelTitle: 'Bill Breakdown — March 2026' },
        },
      ),
      openPanel: { key: 'bill', title: 'Bill Breakdown — March 2026' },
    };
  }

  // ── 7. Greeting ─────────────────────────────────────────────────────────
  if (/^(hi|hello|hey|sup|yo|good\s*(morning|afternoon|evening))\b/.test(t)) {
    return {
      message: msg(`Hey ${USER.name}! What can I help you with today?`, { options: DEFAULT_OPTIONS }),
    };
  }

  // ── Custom fallback ─────────────────────────────────────────────────────
  return {
    message: msg(
      `Hmm, I didn't quite catch that one — let me know what you're curious about and I'll dig in. Or pick one of these to get started:`,
      { options: DEFAULT_OPTIONS },
    ),
  };
}

export function getWelcomeMessage(): ChatMessage {
  return msg(
    `Hi ${USER.name}! 👋 I'm your Energy Assistant. I can help you understand your bill, explore solar savings, optimize EV charging, or compare rate plans. What would you like to explore?`,
    { options: DEFAULT_OPTIONS },
  );
}
