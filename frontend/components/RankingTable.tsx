import React from "react";
import { Trophy, Medal, Award } from "lucide-react";

interface RankingItem {
  rank: number;
  alternative: string;
  as_score: number;
  nsp: number;
  nsn: number;
}

const RankingTable = ({ ranking }: { ranking: RankingItem[] }) => {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Rank</th>
            <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Alternatif</th>
            <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">NSP</th>
            <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">NSN</th>
            <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Appraisal Score</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((item, i) => (
            <tr key={i} className={`border-b border-slate-50 transition-colors ${i === 0 ? "bg-emerald-50/30" : "hover:bg-slate-50/50"}`}>
              <td className="px-8 py-4">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${
                    i === 0 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    {item.rank}
                  </span>
                </div>
              </td>
              <td className="px-8 py-4 font-bold text-slate-700">{item.alternative}</td>
              <td className="px-8 py-4 text-center text-xs font-medium text-slate-400">{item.nsp.toFixed(4)}</td>
              <td className="px-8 py-4 text-center text-xs font-medium text-slate-400">{item.nsn.toFixed(4)}</td>
              <td className="px-8 py-4 text-right">
                <span className={`text-sm font-black ${i === 0 ? "text-emerald-600" : "text-slate-900"}`}>
                  {item.as_score.toFixed(4)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;
