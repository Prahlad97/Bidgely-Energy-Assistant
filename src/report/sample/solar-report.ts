import type { Report } from '../types';

export const solarReport: Report = {
  id: 'solar-report-sarah-mitchell-2026',
  title: "Here's what going solar looks like for you.",
  titleAccentWords: ['going', 'solar'],
  subtitle:
    'Based on 12 months of your actual usage and the conditions at your address — no sales pitch, no commercial interest.',
  generatedAt: '2026-04-14T00:00:00Z',
  customer: {
    name: 'Sarah Mitchell',
    accountNumber: '4821-09',
    address: '94103',
    zip: '94103',
    date: 'April 14, 2026',
  },
  branding: {
    companyName: 'Energy Co.',
    primaryColor: '#125AAA',
  },
  sources: [
    'NREL PVWatts (ZIP 94103)',
    'SEIA Q1 2026 install costs',
    'utility tariff filings',
    '12 months of actual meter readings',
  ],
  sections: [
    {
      type: 'kpi-row',
      kpis: [
        {
          label: 'ANNUAL SAVINGS',
          value: '$1,820',
          subtext: 'Bill drops from $2,280 → $460',
          accent: 'green',
        },
        {
          label: '25-YEAR NET GAIN',
          value: '+$32,600',
          subtext: 'Over system lifetime',
          accent: 'purple',
        },
      ],
    },
    {
      type: 'bar-comparison',
      title: 'ANNUAL BILL COMPARISON',
      items: [
        {
          label: 'Today',
          value: 2280,
          displayValue: '$2,280',
          color: '#2386FF',
        },
        {
          label: 'With Solar',
          value: 460,
          displayValue: '$460',
          color: '#16DD95',
        },
      ],
    },
    {
      type: 'monthly-chart',
      title: 'CONSUMPTION VS GENERATION',
      yMax: 2000,
      yUnit: 'kWh',
      series: {
        consumptionLabel: 'Your Consumption',
        generationLabel: 'Solar generation',
      },
      data: [
        { month: 'Jan', consumption: 900, generation: 540 },
        { month: 'Feb', consumption: 800, generation: 720 },
        { month: 'Mar', consumption: 680, generation: 1010 },
        { month: 'Apr', consumption: 550, generation: 1180 },
        { month: 'May', consumption: 450, generation: 1340 },
        { month: 'Jun', consumption: 420, generation: 1450 },
        { month: 'Jul', consumption: 410, generation: 1490 },
        { month: 'Aug', consumption: 440, generation: 1430 },
        { month: 'Sep', consumption: 510, generation: 1180 },
        { month: 'Oct', consumption: 640, generation: 1010 },
        { month: 'Nov', consumption: 775, generation: 720 },
        { month: 'Dec', consumption: 870, generation: 540 },
      ],
      insight:
        'Solar production peaks in summer; your usage stays flat year-round. A smaller system covers summer fine but leaves winter short.',
    },
    {
      type: 'system-recommendation',
      label: 'YOUR RECOMMENDED SYSTEM',
      sizeKw: 8.4,
      panelCount: 21,
      roofSqFt: 420,
      whySizeBody:
        "More panels don't save more money. Any extra power you produce sells back to the grid at just ~4¢/kWh — but the power you buy at night costs 32–54¢. So extra panels mostly create cheap sales, not savings. 8.4 kW matches what you actually use in daylight — the sweet spot.",
      financials: [
        {
          label: 'NET COST',
          value: '$12,900',
          subtext: 'Including all rebates',
        },
        {
          label: 'PAYBACK PERIOD',
          value: '7.1 years',
          subtext: 'Out of a 25-30 year life',
        },
        {
          label: 'ANNUAL SAVINGS',
          value: '$1,820',
          subtext: '+$32,600 over 25 years',
          highlight: true,
        },
      ],
    },
    {
      type: 'size-comparison',
      options: [
        {
          label: 'Smaller — 5 kW',
          subtext: '13 panels',
          netCost: '$8,000',
          payback: '5.7 yrs',
          verdict:
            "Too small — faster payback, but leaves ~$420/yr of savings unclaimed over the system's life.",
        },
        {
          label: '8.4 kW',
          subtext: '21 panels',
          netCost: '$12,900',
          payback: '7.1 yrs',
          verdict:
            "The sweet spot — covers 67% of your usage without producing cheap 4¢ exports.",
          isRecommended: true,
        },
        {
          label: 'Larger — 11 kW',
          subtext: '28 panels',
          netCost: '$16,800',
          payback: '7.5 yrs',
          verdict:
            'Too big — $3,900 more cost for only $420/yr more savings. Surplus sells at 4¢.',
        },
      ],
    },
    {
      type: 'rate-plan',
      plans: [
        {
          label: 'YOUR CURRENT RATE PLAN',
          title: 'Standard Time-of-Use',
          description:
            "Peak imports 4–9pm weekdays, off-peak otherwise. Workable with solar, but doesn't reward midday self-consumption the way the Electric Home TOU plan does.",
          importPeriods: [
            { timeRange: '12a–4p', tier: '$', widthFr: 16 },
            { timeRange: '4–9p', tier: '$$$', widthFr: 5 },
            { timeRange: '9p–12a', tier: '$', widthFr: 3 },
          ],
          annualSavings: '$1,560',
        },
        {
          label: 'RECOMMENDED RATE PLAN',
          title: 'Electric Home TOU',
          description:
            'Your solar produces most between 9am–4pm, which lines up with the cheapest grid hours. Run big appliances midday, avoid 4–9pm. Export credits unchanged either way.',
          importPeriods: [
            { timeRange: '12a–9a', tier: '$', widthFr: 9 },
            { timeRange: '9a–4p', tier: '$$', widthFr: 7 },
            { timeRange: '4–9p', tier: '$$$', widthFr: 5 },
            { timeRange: '9p–12a', tier: '$', widthFr: 3 },
          ],
          annualSavings: '$1,820',
          annualSavingsDelta: '+$260/yr',
          insight:
            'Move your dishwasher, pool pump, and EV charging into 9a–4p and pocket another $340/yr.',
          isRecommended: true,
        },
      ],
      exportPeriods: [
        { timeRange: '12a–9a', rate: '6¢', widthFr: 9 },
        { timeRange: '9a–4p', rate: '4¢', widthFr: 7 },
        { timeRange: '4–9p', rate: '35¢', widthFr: 5, isHighlight: true },
        { timeRange: '9p–12a', rate: '6¢', widthFr: 3 },
      ],
      exportNote: 'EXPORT (SAME FOR EVERY PLAN)',
    },
    {
      type: 'inputs',
      headline: 'TAILORED TO YOUR HOME',
      bodyParts: [
        { text: 'You want to ' },
        { text: 'maximize savings', bold: true },
        { text: ". We used your home's " },
        { text: '~500 sq ft of usable south-facing roof', bold: true },
        { text: ' (20° pitch), ' },
        { text: 'minimal shading', bold: true },
        { text: ', and ' },
        { text: '5.6 hr/day of usable sun', bold: true },
        { text: ' (ZIP 94103 annual average).' },
      ],
      assumptions: [
        {
          label: 'Panel quality',
          value: '21% efficient · standard premium',
        },
        {
          label: 'Install cost',
          value: '$2.50/W · range $2.30–$2.75',
        },
        {
          label: 'Price growth',
          value: '3%/yr · CA avg 4.1%',
        },
        {
          label: 'Grid pays you',
          value: 'NBT rules · 4–35¢/kWh by time',
        },
      ],
    },
    {
      type: 'neighborhood',
      count: 247,
      headline: 'Solar installations within 5 miles of your home.',
      body: 'Homes with similar sun exposure, already seeing the savings.',
    },
    {
      type: 'faq',
      items: [
        {
          question: 'Is my roof suitable for solar?',
          answer:
            'Your roof has ~500 sq ft of south-facing surface at a 20° pitch with minimal shading — well above the 200 sq ft minimum. The only scenario requiring further inspection is if the roof is more than 15 years old, in which case re-roofing before install saves money long-term.',
        },
        {
          question: 'How do I pick a good installer?',
          answer:
            'Look for NABCEP-certified installers with at least 5 years of local history. Get three quotes. Avoid anyone who pressures you to sign on the first visit. Check the CSLB license lookup for CA contractors.',
        },
        {
          question: 'Buy, lease, or PPA?',
          answer:
            'Buy (cash or loan) if you can — you capture the full 30% federal tax credit and all savings. Leases and PPAs transfer the tax credit to the installer. The numbers in this report assume a cash purchase.',
        },
        {
          question: 'What if I sell before year 8.4?',
          answer:
            'Studies consistently show solar adds 3–4% to resale price on average — roughly $15,000–$20,000 on a median CA home. You are unlikely to lose money selling early, though the exact amount depends on the buyer and market.',
        },
        {
          question: 'Do I need a battery?',
          answer:
            'Not for savings alone — the math in this report works without one. A battery becomes worthwhile if you have frequent outages, or if your utility eliminates NEM export credits (watch for NEM 4.0 policy changes in 2027).',
        },
        {
          question: "What if electricity prices don't rise as projected?",
          answer:
            'This report uses a conservative 3%/yr vs. the CA historical average of 4.1%. Even at 0% price growth, payback is 8.9 years — still well inside a 25-year system life.',
        },
        {
          question: 'What happens after 25 years?',
          answer:
            'Panels degrade ~0.5%/year — at year 25 they produce ~88% of original output. Most manufacturers warranty at least 80% output for 25 years. After that, you can continue using the degraded system or replace panels (costs drop every year).',
        },
        {
          question: 'How do you estimate my roof size and angle?',
          answer:
            "We use data from Google Maps Platform to analyze satellite imagery and estimate your roof's size, pitch, and orientation. These are preliminary estimates meant for quick assessment. Final measurements are validated through on-site inspection or detailed surveys before any installation.",
        },
      ],
    },
    {
      type: 'cta-banner',
      headline: 'Switch plans when your system goes live',
      subtext: 'energy.co/switch',
      buttonLabel: 'View switch steps  →',
      buttonUrl: 'https://energy.co/switch',
    },
  ],
};
