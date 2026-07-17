'use client';

import { USER } from '@/lib/data/user';

export default function RatePanel() {
  const { ratePlans, bill } = USER;

  return (
    <div>
      <div className="sr-section-title">Rate Plan Comparison</div>
      <div className="sr-hero-stat">
        <div className="sr-hero-amount">${bill.electricCost.toFixed(2)}</div>
        <div className="sr-hero-label">Current monthly electric cost (E-1)</div>
      </div>

      {ratePlans.map((plan) => {
        const estimatedMonthly = Math.round(bill.kwh * plan.avgRate + bill.delivery + bill.taxes);
        const savings = Math.round(bill.electricCost - estimatedMonthly);
        const isCurrent = plan.current;

        return (
          <div key={plan.id} className="sr-card" style={{
            border: isCurrent ? '2px solid var(--sr-primary)' : '1px solid var(--sr-border)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--sr-text-dark)', marginBottom: 2 }}>
                  {plan.name}
                  {isCurrent && (
                    <span className="sr-badge info" style={{ marginLeft: 8, fontSize: 10 }}>Current</span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--sr-text-muted)' }}>{plan.description}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--sr-text-dark)' }}>
                  ~${estimatedMonthly}/mo
                </div>
                <div style={{ fontSize: 11, color: 'var(--sr-text-muted)' }}>
                  ${plan.avgRate.toFixed(2)}/kWh avg
                </div>
              </div>
            </div>
            {!isCurrent && savings > 0 && (
              <div>
                <span className="sr-badge savings">Save ~${savings}/mo vs current</span>
              </div>
            )}
          </div>
        );
      })}

      <div style={{ fontSize: 11, color: 'var(--sr-text-muted)', marginTop: 8 }}>
        Estimates based on your March 2026 usage of {bill.kwh} kWh. Actual savings may vary.
      </div>
    </div>
  );
}
