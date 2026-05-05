import React from "react";

interface MatrixInputProps {
  matrix: number[][];
  alternatives: string[];
  onChange: (row: number, col: number, val: number) => void;
  onAltNameChange: (index: number, name: string) => void;
}

const MatrixInput: React.FC<MatrixInputProps> = ({ matrix, alternatives, onChange, onAltNameChange }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-64 border-r border-slate-100">Alternatif</th>
            {Array.from({ length: 8 }, (_, i) => (
              <th key={i} className="px-4 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">C{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {alternatives.map((alt, rowIndex) => (
            <tr key={rowIndex} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-3 border-r border-slate-100">
                <input
                  type="text"
                  value={alt}
                  onChange={(e) => onAltNameChange(rowIndex, e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 font-bold text-slate-700 text-sm outline-none"
                />
              </td>
              {matrix[rowIndex]?.map((val, colIndex) => (
                <td key={colIndex} className="px-2 py-3">
                  <input
                    type="number"
                    value={val}
                    onChange={(e) => onChange(rowIndex, colIndex, Number(e.target.value))}
                    className="w-full text-center bg-transparent border-none focus:ring-0 font-medium text-slate-500 text-xs outline-none"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixInput;
