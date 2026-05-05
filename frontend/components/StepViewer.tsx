import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StepViewer = ({ result }: { result: any }) => {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
      <Tabs defaultValue="av" className="w-full">
        <div className="bg-slate-50 px-8 py-4 border-b border-slate-200">
          <TabsList className="bg-slate-200/50 p-1 rounded-xl">
            <TabsTrigger value="av" className="text-[10px] font-black uppercase px-6">AV</TabsTrigger>
            <TabsTrigger value="pda" className="text-[10px] font-black uppercase px-6">PDA</TabsTrigger>
            <TabsTrigger value="nda" className="text-[10px] font-black uppercase px-6">NDA</TabsTrigger>
            <TabsTrigger value="sp_sn" className="text-[10px] font-black uppercase px-6">SP/SN</TabsTrigger>
          </TabsList>
        </div>

        <div className="p-8">
          <TabsContent value="av" className="mt-0">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {result.av.map((val: number, i: number) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-[10px] font-black text-slate-400 mb-1">C{i+1}</p>
                  <p className="text-sm font-bold text-slate-700">{val.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pda" className="mt-0 overflow-x-auto">
             <table className="w-full text-[11px] font-bold">
                <thead>
                  <tr className="text-slate-400 text-left">
                    <th className="pb-4">Rumah</th>
                    {Array.from({length: 8}, (_, i) => <th key={i} className="pb-4">C{i+1}</th>)}
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  {result.pda.slice(0, 10).map((row: any, i: number) => (
                    <tr key={i} className="border-b border-slate-50">
                      <td className="py-2 text-slate-900 uppercase text-[9px] tracking-widest">Alt {i+1}</td>
                      {row.map((val: number, j: number) => (
                        <td key={j} className="py-2">{val.toFixed(4)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
             </table>
          </TabsContent>

          <TabsContent value="nda" className="mt-0 overflow-x-auto">
             <table className="w-full text-[11px] font-bold">
                <thead>
                  <tr className="text-slate-400 text-left">
                    <th className="pb-4">Rumah</th>
                    {Array.from({length: 8}, (_, i) => <th key={i} className="pb-4">C{i+1}</th>)}
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  {result.nda.slice(0, 10).map((row: any, i: number) => (
                    <tr key={i} className="border-b border-slate-50">
                      <td className="py-2 text-slate-900 uppercase text-[9px] tracking-widest">Alt {i+1}</td>
                      {row.map((val: number, j: number) => (
                        <td key={j} className="py-2">{val.toFixed(4)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
             </table>
          </TabsContent>

          <TabsContent value="sp_sn" className="mt-0">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Sum of Positive (SP)</h4>
                   <div className="flex flex-wrap gap-2">
                      {result.sp.slice(0, 10).map((val: number, i: number) => (
                        <div key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold">
                          {val.toFixed(4)}
                        </div>
                      ))}
                   </div>
                </div>
                <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase text-rose-600 tracking-widest">Sum of Negative (SN)</h4>
                   <div className="flex flex-wrap gap-2">
                      {result.sn.slice(0, 10).map((val: number, i: number) => (
                        <div key={i} className="px-3 py-1 bg-rose-50 text-rose-700 rounded-lg text-[10px] font-bold">
                          {val.toFixed(4)}
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default StepViewer;
