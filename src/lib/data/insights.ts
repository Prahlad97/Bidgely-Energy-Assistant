// Energy Insights fixtures (ported from Miraki / futuristic Monthly Summary + Usage views).

export type MonthlyUsage = {
  month: string;
  shortMonth: string;
  year: number;
  kwh: number;
  cost: number;
  hdd: number;
  cdd: number;
};

export const MONTHLY_USAGE: MonthlyUsage[] = [
  { month: 'May 2025', shortMonth: 'May', year: 2025, kwh: 720, cost: 115.2, hdd: 95, cdd: 12 },
  { month: 'Jun 2025', shortMonth: 'Jun', year: 2025, kwh: 980, cost: 156.8, hdd: 8, cdd: 175 },
  { month: 'Jul 2025', shortMonth: 'Jul', year: 2025, kwh: 1280, cost: 204.8, hdd: 0, cdd: 320 },
  { month: 'Aug 2025', shortMonth: 'Aug', year: 2025, kwh: 1310, cost: 209.6, hdd: 0, cdd: 335 },
  { month: 'Sep 2025', shortMonth: 'Sep', year: 2025, kwh: 1020, cost: 163.2, hdd: 18, cdd: 165 },
  { month: 'Oct 2025', shortMonth: 'Oct', year: 2025, kwh: 720, cost: 115.2, hdd: 145, cdd: 22 },
  { month: 'Nov 2025', shortMonth: 'Nov', year: 2025, kwh: 750, cost: 120.0, hdd: 380, cdd: 0 },
  { month: 'Dec 2025', shortMonth: 'Dec', year: 2025, kwh: 920, cost: 147.2, hdd: 670, cdd: 0 },
  { month: 'Jan 2026', shortMonth: 'Jan', year: 2026, kwh: 1150, cost: 184.0, hdd: 820, cdd: 0 },
  { month: 'Feb 2026', shortMonth: 'Feb', year: 2026, kwh: 1080, cost: 172.8, hdd: 720, cdd: 0 },
  { month: 'Mar 2026', shortMonth: 'Mar', year: 2026, kwh: 880, cost: 140.8, hdd: 510, cdd: 0 },
  { month: 'Apr 2026', shortMonth: 'Apr', year: 2026, kwh: 750, cost: 120.0, hdd: 230, cdd: 8 },
  { month: 'May 2026', shortMonth: 'May', year: 2026, kwh: 195, cost: 31.2, hdd: 18, cdd: 4 },
];

export type ApplianceSlice = {
  name: string;
  kwh: number;
  cost: number;
  pctOfTotal: number;
  color: string;
};

export const APPLIANCE_BREAKDOWN: ApplianceSlice[] = [
  { name: 'Heating', kwh: 180, cost: 28.8, pctOfTotal: 24, color: '#ef6c2f' },
  { name: 'Always On', kwh: 130, cost: 20.8, pctOfTotal: 17, color: '#125AAA' },
  { name: 'Refrigeration', kwh: 95, cost: 15.2, pctOfTotal: 13, color: '#7b8fb1' },
  { name: 'Water Heating', kwh: 95, cost: 15.2, pctOfTotal: 13, color: '#1d6cdb' },
  { name: 'Laundry & Cleaning', kwh: 70, cost: 11.2, pctOfTotal: 9, color: '#480355' },
  { name: 'Cooling', kwh: 60, cost: 9.6, pctOfTotal: 8, color: '#1f9b6a' },
  { name: 'Cooking', kwh: 50, cost: 8.0, pctOfTotal: 7, color: '#b48400' },
  { name: 'Lighting', kwh: 35, cost: 5.6, pctOfTotal: 5, color: '#ffb45e' },
  { name: 'Other', kwh: 35, cost: 5.6, pctOfTotal: 4, color: '#cdd5e2' },
];

export const LATEST_CYCLE = {
  label: 'Apr 1 - Apr 30, 2026',
  kwh: 750,
  cost: 120.0,
  daysInCycle: 30,
};
