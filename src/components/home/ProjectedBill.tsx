import React from 'react';
import ProjectedBillCard from '@/components/widgets/ProjectedBillCard';

export default function ProjectedBill() {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-semibold text-[#1e232e]">Current Month Overview</h2>
        <span className="text-[13px] text-[#616f89]">
          Jul 27, 2021 — Aug 26, 2021 <span className="text-[#9a9a9a]">·</span> 20 Days Left
        </span>
      </div>
      <ProjectedBillCard />
    </section>
  );
}
