import type { ChatMessage, MessageOption } from '../types';
import type { FlowData } from '../types';
import { USER } from '@/lib/data/user';
import { computeSolarMetrics } from '@/lib/data/computations';

function id() {
  return Math.random().toString(36).slice(2);
}

export function getSolarStep(step: number, data: FlowData): ChatMessage {
  switch (step) {
    case 0:
      return {
        id: id(),
        role: 'assistant',
        text: `Great! Let's size a solar system for your home at ${USER.address}. First — roughly how much usable south-facing roof space do you have?`,
        options: [
          { label: '🏠 Small (~400 sq ft)', value: 'small', note: 'Up to 3.5 kW' },
          { label: '🏡 Medium (~700 sq ft)', value: 'medium', note: 'Auto-sized to your usage' },
          { label: '🏘️ Large (~1,000+ sq ft)', value: 'large', note: 'Up to 7.5 kW' },
        ],
        timestamp: Date.now(),
      };

    case 1:
      return {
        id: id(),
        role: 'assistant',
        text: 'Got it. How much shade does your roof get during the day?',
        options: [
          { label: '☀️ None — full sun most of day', value: 'none' },
          { label: '⛅ Partial — some tree or chimney shade', value: 'partial' },
          { label: '🌥️ Heavy — more than 4 hours shaded', value: 'heavy' },
        ],
        timestamp: Date.now(),
      };

    case 2: {
      // The chat side intentionally does NOT reveal the answer (system size,
      // savings, payback). Those live in the right-panel report. The bubble
      // just confirms inputs were captured and offers the report.
      const roof = data.roof as 'small' | 'medium' | 'large';
      const shade = data.shade as 'none' | 'partial' | 'heavy';
      // Still compute metrics so the panel has them; just don't surface them
      // here.
      computeSolarMetrics(roof, shade, USER);

      return {
        id: id(),
        role: 'assistant',
        text:
          `Got it — based on your roof and shading, I've worked out a system size and the financials.\n\n` +
          `Open the full report to see the recommended size, savings, payback, and the best rate plan for your usage.`,
        reportCard: {
          label: 'View Full Report',
          panel: 'solar-dynamic',
          panelTitle: 'Solar Savings Report',
        },
        options: [
          { label: 'View full report', value: '__open_solar_panel__', isReport: true },
          { label: 'Compare rate plans for solar', value: 'rate' },
          { label: 'Start over', value: '__reset__' },
        ],
        timestamp: Date.now(),
      };
    }

    default:
      return {
        id: id(),
        role: 'assistant',
        text: "Something went wrong with the solar flow. Type anything to start over.",
        timestamp: Date.now(),
      };
  }
}

export function getSolarOptions(step: number): MessageOption[] {
  if (step === 0) return [
    { label: '🏠 Small (~400 sq ft)', value: 'small', note: 'Up to 3.5 kW' },
    { label: '🏡 Medium (~700 sq ft)', value: 'medium', note: 'Auto-sized to your usage' },
    { label: '🏘️ Large (~1,000+ sq ft)', value: 'large', note: 'Up to 7.5 kW' },
  ];
  if (step === 1) return [
    { label: '☀️ None — full sun most of day', value: 'none' },
    { label: '⛅ Partial — some tree or chimney shade', value: 'partial' },
    { label: '🌥️ Heavy — more than 4 hours shaded', value: 'heavy' },
  ];
  return [];
}
