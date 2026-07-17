import React from 'react';
import Navbar from './Navbar';
import HomeAssistantWidget from './HomeAssistantWidget';
import EnergyAssistantFab from './EnergyAssistantFab';
import ProjectedBill from './ProjectedBill';
import LastMonthOverview from './LastMonthOverview';
import InsightsTrends from './InsightsTrends';
import Promotions from './Promotions';
import CarbonFootprint from './CarbonFootprint';
import Footer from './Footer';

export default function HomeDashboard() {
  return (
    <div className="min-h-screen w-full bg-[#eef3f8] font-sans text-[#1e232e]">
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-[160px] pt-10 pb-16 flex flex-col gap-[60px]">
        <HomeAssistantWidget />
        <ProjectedBill />
        <LastMonthOverview />
        <InsightsTrends />
        <Promotions />
        <CarbonFootprint />
      </main>
      <Footer />
      <EnergyAssistantFab />
    </div>
  );
}
