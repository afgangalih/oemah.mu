"use client";

import React, { useState, useEffect } from "react";
import MatrixInput from "@/components/MatrixInput";
import WeightSlider from "@/components/WeightSlider";
import RankingTable from "@/components/RankingTable";
import RankingChart from "@/components/RankingChart";
import StepViewer from "@/components/StepViewer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateEDAS, getEDASDefaults } from "@/lib/api";
import { EDASResponse } from "@/lib/types";
import { Calculator, Loader2, Trophy, ArrowLeft, RefreshCw, Layers, Sliders, BarChart, Info, ChevronRight, Home, HelpCircle, Target } from "lucide-react";
import Link from "next/link";

const CRITERIA_LEGEND = [
  { id: "C1", name: "Harga", unit: "Juta", desc: "Total harga rumah dalam satuan Juta Rupiah" },
  { id: "C2", name: "L. Bangunan", unit: "m2", desc: "Luas bangunan dalam meter persegi" },
  { id: "C3", name: "L. Tanah", unit: "m2", desc: "Luas tanah keseluruhan dalam meter persegi" },
  { id: "C4", name: "Jarak Kota", unit: "km", desc: "Jarak tempuh dari pusat kota terdekat" },
  { id: "C5", name: "Fasilitas", unit: "1-10", desc: "Kelengkapan fasilitas (Listrik, Air, Internet)" },
  { id: "C6", name: "Keamanan", unit: "1-5", desc: "Kualitas keamanan dan lingkungan sekitar" },
  { id: "C7", name: "Usia", unit: "Thn", desc: "Lama waktu sejak bangunan selesai dibangun" },
  { id: "C8", name: "Desain", unit: "1-10", desc: "Penilaian estetika arsitektur dan tata ruang" },
];

export default function KalkulatorPage() {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [alternatives, setAlternatives] = useState<string[]>([]);
  const [weights, setWeights] = useState<number[]>([]);
  const [types, setTypes] = useState<("benefit" | "cost")[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [result, setResult] = useState<EDASResponse | null>(null);

  useEffect(() => {
    async function loadDefaults() {
      try {
        const data = await getEDASDefaults();
        setMatrix(data.matrix);
        setAlternatives(data.alternatives);
        setWeights(data.weights);
        setTypes(data.types);
      } catch (error) {
        console.error("Gagal memuat data default:", error);
      } finally {
        setInitLoading(false);
      }
    }
    loadDefaults();
  }, []);

  const handleCalculate = async () => {
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    if (Math.abs(totalWeight - 1) > 0.01) {
      alert("Total bobot harus berjumlah 1.00");
      return;
    }
    setLoading(true);
    try {
      const res = await calculateEDAS({ matrix, weights, types, alternatives });
      setResult(res);
    } catch (error) {
      console.error("Calculation failed:", error);
      alert("Gagal menghitung data.");
    } finally {
      setLoading(false);
    }
  };

  const resetData = async () => {
    setInitLoading(true);
    try {
      const data = await getEDASDefaults();
      setMatrix(data.matrix);
      setAlternatives(data.alternatives);
      setWeights(data.weights);
      setTypes(data.types);
      setResult(null);
    } catch (error) {
      alert("Gagal reset data.");
    } finally {
      setInitLoading(false);
    }
  };

  if (initLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Menyiapkan Otak Analisis...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20">
      <header className="bg-white border-b border-slate-100 h-20 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <ArrowLeft className="w-4 h-4 text-slate-500" />
            </Link>
            <div className="flex items-center gap-3">
               <img src="/logo.png" alt="EDAS Logo" className="h-7 w-auto object-contain" />
               <div className="flex flex-col">
                  <h1 className="text-base font-bold tracking-tight flex items-center gap-2 leading-none">
                    Analisis Rumah
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                    <span className="text-emerald-600">EDAS</span>
                  </h1>
               </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <Button variant="outline" size="sm" onClick={resetData} className="rounded-xl border-slate-200 font-bold text-slate-500">
               <RefreshCw className="w-3.5 h-3.5 mr-2" /> Reset
             </Button>
             <Button onClick={handleCalculate} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl h-11 px-8 transition-all">
               {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Calculator className="w-4 h-4 mr-2" />}
               Hitung Rekomendasi
             </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-10 space-y-10">
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold">Panduan & Legenda Kriteria</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CRITERIA_LEGEND.map((item) => (
              <Card key={item.id} className="rounded-2xl border-slate-200 shadow-sm bg-white">
                <CardContent className="p-5 space-y-2">
                   <div className="flex justify-between items-start">
                     <span className="text-[10px] font-black bg-slate-100 px-2 py-0.5 rounded uppercase tracking-widest text-slate-400">{item.id}</span>
                     <span className="text-[10px] font-bold text-emerald-600">{item.unit}</span>
                   </div>
                   <h4 className="font-bold text-slate-900">{item.name}</h4>
                   <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
          <div className="xl:col-span-8 space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
               <Layers className="w-5 h-5 text-emerald-600" />
               <h2 className="text-xl font-bold tracking-tight">Data Alternatif Rumah</h2>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white shadow-sm overflow-hidden">
                <MatrixInput
                  matrix={matrix}
                  alternatives={alternatives}
                  onChange={(r, c, v) => {
                    const m = [...matrix]; m[r] = [...m[r]]; m[r][c] = v; setMatrix(m);
                  }}
                  onAltNameChange={(i, n) => {
                    const a = [...alternatives]; a[i] = n; setAlternatives(a);
                  }}
                />
            </div>
          </div>

          <div className="xl:col-span-4 space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
               <Sliders className="w-5 h-5 text-emerald-600" />
               <h2 className="text-xl font-bold tracking-tight">Bobot Prioritas</h2>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
                <WeightSlider
                  weights={weights}
                  types={types}
                  onChange={(i, v) => {
                    const w = [...weights]; w[i] = v; setWeights(w);
                  }}
                  onTypeChange={(i, t) => {
                    const ty = [...types]; ty[i] = t; setTypes(ty);
                  }}
                />
            </div>
          </div>
        </div>

        {result && (
          <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-1000 pt-10 border-t-2 border-slate-100">
             <section className="space-y-6">
                <div className="flex items-center gap-3">
                   <Target className="w-6 h-6 text-emerald-600" />
                   <h2 className="text-2xl font-extrabold tracking-tight">Pemenang Analisis</h2>
                </div>
                <div className="bg-emerald-600 rounded-[32px] border-4 border-emerald-700/20 p-12 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-10">
                   <div className="space-y-6 flex-1">
                      <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-700/30 w-fit rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                         Rekomendasi Terbaik
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                          {result.ranking[0].alternative}
                        </h3>
                        <p className="text-lg font-medium opacity-80 max-w-lg">
                          Berdasarkan perhitungan matematis, rumah ini memiliki jarak terdekat dengan solusi ideal dibandingkan alternatif lainnya.
                        </p>
                      </div>
                      <div className="flex gap-10 pt-4">
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Appraisal Score</p>
                            <p className="text-3xl font-bold">{result.ranking[0].as_score.toFixed(4)}</p>
                         </div>
                         <div className="h-12 w-px bg-white/20" />
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Status</p>
                            <p className="text-3xl font-bold italic">OPTIMAL</p>
                         </div>
                      </div>
                   </div>
                   <div className="w-full md:w-fit flex justify-center">
                      <div className="w-48 h-48 bg-white/10 rounded-full border-2 border-white/20 flex items-center justify-center">
                         <Trophy className="w-24 h-24 text-white" />
                      </div>
                   </div>
                </div>
             </section>

             <section className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-4">
                    <BarChart className="w-6 h-6 text-emerald-600" />
                    <h2 className="text-2xl font-bold tracking-tight text-slate-800">Detail Perhitungan</h2>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-slate-300">
                    <Info className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Mathematical Stability Validated</span>
                  </div>
                </div>

                <Tabs defaultValue="ranking" className="w-full">
                  <TabsList className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 inline-flex mb-8">
                    <TabsTrigger value="ranking" className="rounded-xl font-bold text-xs px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm transition-all">Peringkat Akhir</TabsTrigger>
                    <TabsTrigger value="charts" className="rounded-xl font-bold text-xs px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm transition-all">Visualisasi Statistik</TabsTrigger>
                    <TabsTrigger value="steps" className="rounded-xl font-bold text-xs px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm transition-all">Audit Langkah Algoritma</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ranking" className="mt-0">
                    <div className="rounded-[32px] border border-slate-200 bg-white overflow-hidden shadow-sm">
                      <RankingTable ranking={result.ranking} />
                    </div>
                  </TabsContent>

                  <TabsContent value="charts" className="mt-0">
                    <RankingChart data={result.ranking} />
                  </TabsContent>
                  
                  <TabsContent value="steps" className="mt-0">
                    <StepViewer result={result} />
                  </TabsContent>
                </Tabs>
             </section>
          </div>
        )}
      </main>

      <footer className="max-w-[1400px] mx-auto px-10 py-10 flex justify-between items-center border-t border-slate-100">
        <div className="flex items-center gap-3 font-bold text-slate-300 uppercase tracking-widest text-[10px]">
           <img src="/logo.png" alt="Logo" className="h-5 w-auto grayscale opacity-50" />
           EDAS.rumah Analytics
        </div>
        <p className="text-[10px] font-bold text-slate-200 uppercase tracking-[0.2em]">© 2026 MATHEMATICAL ACCURACY GUARANTEED</p>
      </footer>
    </div>
  );
}
