"use client";
import React from "react";
import { ArrowUpRight, Users, Code, Building, User } from "lucide-react";
import StatsCounter from "@/app/_components/StatsCounter";

const StatsMetrics = () => {
  return (
    <section id="stats-metrics" className="py-16 px-20 bg-[#f9fafb]">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Global Recruitment Impact
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatsCounter
            label="Successful Placements"
            value={100000}
            icon={ArrowUpRight}
          />
          <StatsCounter label="Partner Companies" value={10000} icon={Users} />
          <StatsCounter label="Client Satisfaction %" value={98} icon={Code} />
          <StatsCounter
            label="Years of Excellence"
            value={20}
            icon={Building}
          />
        </div>
      </div>
    </section>
  );
};

export default StatsMetrics;
