'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const labels = [
  'Jul 26', 'Aug 27', 'Sep 28', 'Oct 27', 'Nov 27', 'Dec 27',
  'Jan 27', 'Feb 28', 'Mar 24', 'Apr 24', 'May 25', 'Jun 26', 'Jul 26',
];
const values = [157, 137, 150, 124, 112, 128, 142, 158, 107, 111, 93, 135, 160];

export default function BillHistory() {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: '#1d6cdb',
        borderRadius: 2,
        barPercentage: 0.7,
        categoryPercentage: 0.85,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl border border-[#eaedf6] p-6 h-full">
      <div className="flex items-start justify-between">
        <h3 className="text-[15px] font-semibold text-[#1e232e]">Bill History</h3>
        <button
          type="button"
          aria-label="Info"
          className="w-7 h-7 rounded-full border border-[#eaedf6] flex items-center justify-center text-[#1d6cdb]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="mt-4 h-[360px]">
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: true } },
            scales: {
              y: {
                beginAtZero: true,
                max: 200,
                ticks: {
                  stepSize: 50,
                  color: '#9a9a9a',
                  font: { size: 11 },
                  callback: (v) => `$${v}`,
                },
                grid: { color: '#eaedf6' },
                border: { display: false },
              },
              x: {
                ticks: {
                  color: '#9a9a9a',
                  font: { size: 10 },
                  maxRotation: 90,
                  minRotation: 90,
                },
                grid: { display: false },
                border: { color: '#eaedf6' },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
