"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const RankingChart = ({ data }: { data: any[] }) => {
  const chartData = [...data].sort((a, b) => b.as_score - a.as_score).slice(0, 10);

  return (
    <div className="h-[500px] w-full bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
      <div className="mb-8">
        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Top 10 Performance</h4>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis 
            dataKey="alternative" 
            angle={-45} 
            textAnchor="end" 
            interval={0} 
            height={80} 
            tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 700 }}
            axisLine={{ stroke: "#F1F5F9" }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 700 }}
            axisLine={{ stroke: "#F1F5F9" }}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: "16px", 
              border: "1px solid #F1F5F9", 
              boxShadow: "none",
              fontSize: "12px",
              fontWeight: "bold",
              padding: "12px"
            }}
          />
          <Bar dataKey="as_score" radius={[6, 6, 0, 0]} barSize={40}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? "#10b981" : "#E2E8F0"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RankingChart;
