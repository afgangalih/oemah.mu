import React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface WeightSliderProps {
  weights: number[];
  types: ("benefit" | "cost")[];
  onChange: (index: number, val: number) => void;
  onTypeChange: (index: number, type: "benefit" | "cost") => void;
}

const WeightSlider: React.FC<WeightSliderProps> = ({ weights, types, onChange, onTypeChange }) => {
  const total = weights.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {weights.map((w, i) => (
          <div key={i} className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black bg-slate-100 px-2 py-1 rounded text-slate-500">C{i + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${
                    types[i] === "benefit" 
                      ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100" 
                      : "text-rose-600 bg-rose-50 hover:bg-rose-100"
                  }`}
                  onClick={() => onTypeChange(i, types[i] === "benefit" ? "cost" : "benefit")}
                >
                  {types[i] === "benefit" ? (
                    <><ArrowUpCircle className="w-3 h-3 mr-1.5" /> Benefit</>
                  ) : (
                    <><ArrowDownCircle className="w-3 h-3 mr-1.5" /> Cost</>
                  )}
                </Button>
              </div>
              <span className="text-sm font-black text-slate-900">{(w * 100).toFixed(0)}%</span>
            </div>
            <Slider
              value={[w * 100]}
              max={100}
              step={1}
              onValueChange={(val) => {
                const newValue = Array.isArray(val) ? val[0] : val;
                onChange(i, newValue / 100);
              }}
              className="py-2"
            />
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Distribution</span>
        <div className={`px-4 py-1.5 rounded-full text-xs font-black border ${
          Math.abs(total - 1) < 0.01 
            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
            : "bg-rose-50 text-rose-600 border-rose-100"
        }`}>
          {(total * 100).toFixed(0)}% / 100%
        </div>
      </div>
    </div>
  );
};

export default WeightSlider;
