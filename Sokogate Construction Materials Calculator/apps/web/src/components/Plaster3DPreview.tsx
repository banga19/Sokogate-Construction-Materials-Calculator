"use client";

import React, { useMemo, useState } from "react";

export default function Plaster3DPreview({ area = 20, thickness = 15 }) {
  const [visible, setVisible] = useState(true);
  
  const wallArea = area || 20;
  const thick = thickness || 15;
  
  const rows = Math.min(8, Math.ceil(Math.sqrt(wallArea)));
  const cols = Math.min(10, Math.ceil(wallArea / rows));
  
  const plasterColors = ["#FDE68A", "#FCD34D", "#FBBF24", "#F59E0B", "#D97706", "#B45309"];
  
  const sections = useMemo(() => {
    const s = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const colorIdx = (i + j) % plasterColors.length;
        s.push({
          key: `${i}-${j}`,
          row: i,
          col: j,
          color: plasterColors[colorIdx],
        });
      }
    }
    return s;
  }, [cols, rows]);

  const maxDim = Math.max(cols, rows);
  const sectionSize = Math.min(35, 250 / maxDim);

  return (
    <div className="mb-5 rounded-2xl bg-white overflow-hidden border border-slate-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h3 className="font-bold text-slate-900">3D Wall Plaster Preview</h3>
        <button 
          onClick={() => setVisible(!visible)}
          className="px-3 py-1.5 bg-[#E31E24] text-white text-xs font-semibold rounded-lg"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>

      {visible && (
        <div className="p-4">
          <div className="flex justify-center items-center h-56 bg-slate-50 rounded-xl overflow-hidden">
            <div className="relative" style={{ width: cols * sectionSize + 40, height: rows * sectionSize + 50 }}>
              <div 
                className="absolute rounded-t-md"
                style={{ 
                  top: 0, 
                  left: 20, 
                  right: 20, 
                  height: 20, 
                  backgroundColor: "#BFDBFE" 
                }} 
              />
              
              <div 
                className="absolute flex flex-wrap rounded-md"
                style={{ 
                  top: 20, 
                  left: 20, 
                  width: cols * sectionSize, 
                  height: rows * sectionSize,
                  border: "2px solid #F59E0B",
                  backgroundColor: "#F8FAFC"
                }}
              >
                {sections.map((section) => (
                  <div
                    key={section.key}
                    className="rounded-sm"
                    style={{
                      width: sectionSize - 2,
                      height: sectionSize - 2,
                      backgroundColor: section.color,
                      margin: 1,
                    }}
                  />
                ))}
              </div>

              <div className="absolute flex items-end" style={{ left: cols * sectionSize + 15, top: 20 }}>
                <div 
                  className="rounded-sm"
                  style={{ 
                    width: 8, 
                    height: 60, 
                    backgroundColor: "#E5E7EB" 
                  }}
                >
                  <div 
                    className="rounded-sm w-full"
                    style={{ 
                      height: Math.min(thick * 2, 50), 
                      backgroundColor: "#F59E0B" 
                    }} 
                  />
                </div>
                <span className="text-[10px] text-slate-500 ml-1">{thick}mm</span>
              </div>
            </div>
          </div>

          <div className="flex justify-around mt-4">
            <div className="text-center">
              <p className="text-xs text-slate-500">Wall Area</p>
              <p className="text-sm font-bold text-slate-900">{wallArea} m²</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Thickness</p>
              <p className="text-sm font-bold text-slate-900">{thick} mm</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Mix Ratio</p>
              <p className="text-sm font-bold text-slate-900">1:4</p>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-3">Cement + Sand Plaster</p>
        </div>
      )}
    </div>
  );
}