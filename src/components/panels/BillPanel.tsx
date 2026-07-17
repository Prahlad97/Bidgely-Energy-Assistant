'use client';

import { USER } from '@/lib/data/user';

interface Props {
  showUsage?: boolean;
}

export default function BillPanel({ showUsage = false }: Props) {
  const { bill, appliances, history } = USER;

  if (showUsage) {
    return (
      <div>
        <div className="sr-section-title">Energy Breakdown — {bill.month}</div>
        <div className="sr-hero-stat">
          <div className="sr-hero-amount">{bill.kwh} kWh</div>
          <div className="sr-hero-label">Total electricity used this month</div>
        </div>
        <div className="sr-card">
          <div className="sr-section-title" style={{ fontSize: 14, marginBottom: 12 }}>By Appliance</div>
          {appliances.map((a) => (
            <div key={a.name} className="sr-stat-row">
              <div className="sr-stat-label">{a.icon} {a.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 80, height: 6, borderRadius: 4, background: '#edf0f7', overflow: 'hidden',
                }}>
                  <div style={{ width: `${a.pct}%`, height: '100%', background: 'var(--sr-primary)', borderRadius: 4 }} />
                </div>
                <div className="sr-stat-value">{a.kwh} kWh</div>
                <div className="sr-stat-label" style={{ minWidth: 32 }}>{a.pct}%</div>
              </div>
            </div>
          ))}
        </div>

        <div className="sr-card">
          <div className="sr-section-title" style={{ fontSize: 14, marginBottom: 12 }}>6-Month History</div>
          {history.map((h) => (
            <div key={h.month} className="sr-stat-row">
              <div className="sr-stat-label">{h.month}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 100, height: 6, borderRadius: 4, background: '#edf0f7', overflow: 'hidden' }}>
                  <div style={{
                    width: `${Math.round((h.kwh / 720) * 100)}%`,
                    height: '100%',
                    background: 'var(--sr-solar-gen)',
                    borderRadius: 4,
                  }} />
                </div>
                <div className="sr-stat-value">{h.kwh} kWh</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sr-section-title">Bill Summary — {bill.month}</div>

      <div className="sr-hero-stat">
        <div className="sr-hero-amount">${bill.totalCost.toFixed(2)}</div>
        <div className="sr-hero-label">Total amount due</div>
        <div style={{ marginTop: 8 }}>
          <span className="sr-badge warning">↑ 8% vs last month</span>
        </div>
      </div>

      <div className="sr-card">
        <div className="sr-section-title" style={{ fontSize: 14, marginBottom: 0 }}>Electric Charges</div>
        <div className="sr-stat-row">
          <div className="sr-stat-label">Baseline ({bill.baselineKwh} kWh @ ${bill.baselineRate}/kWh)</div>
          <div className="sr-stat-value">${(bill.baselineKwh * bill.baselineRate).toFixed(2)}</div>
        </div>
        <div className="sr-stat-row">
          <div className="sr-stat-label">Above baseline ({bill.aboveKwh} kWh @ ${bill.aboveRate}/kWh)</div>
          <div className="sr-stat-value">${(bill.aboveKwh * bill.aboveRate).toFixed(2)}</div>
        </div>
        <div className="sr-stat-row">
          <div className="sr-stat-label">Delivery &amp; transmission</div>
          <div className="sr-stat-value">${bill.delivery.toFixed(2)}</div>
        </div>
        <div className="sr-stat-row">
          <div className="sr-stat-label">Taxes &amp; fees</div>
          <div className="sr-stat-value">${bill.taxes.toFixed(2)}</div>
        </div>
        <div className="sr-stat-row" style={{ fontWeight: 600 }}>
          <div className="sr-stat-label" style={{ fontWeight: 600, color: 'var(--sr-text-dark)' }}>Electric subtotal</div>
          <div className="sr-stat-value">${bill.electricCost.toFixed(2)}</div>
        </div>
      </div>

      <div className="sr-card">
        <div className="sr-stat-row">
          <div className="sr-stat-label">Natural gas</div>
          <div className="sr-stat-value">${bill.gasCost.toFixed(2)}</div>
        </div>
        <div className="sr-stat-row" style={{ fontWeight: 600 }}>
          <div className="sr-stat-label" style={{ fontWeight: 600, color: 'var(--sr-text-dark)' }}>Total due</div>
          <div className="sr-stat-value" style={{ color: 'var(--sr-primary)' }}>${bill.totalCost.toFixed(2)}</div>
        </div>
      </div>

      <div className="sr-card">
        <div className="sr-section-title" style={{ fontSize: 14, marginBottom: 8 }}>Usage Details</div>
        <div className="sr-stat-row">
          <div className="sr-stat-label">Peak usage (4–9 PM)</div>
          <div className="sr-stat-value">{bill.peakKwh} kWh</div>
        </div>
        <div className="sr-stat-row">
          <div className="sr-stat-label">Off-peak usage</div>
          <div className="sr-stat-value">{bill.offPeakKwh} kWh</div>
        </div>
        <div className="sr-stat-row">
          <div className="sr-stat-label">Total electricity</div>
          <div className="sr-stat-value">{bill.kwh} kWh</div>
        </div>
      </div>
    </div>
  );
}
