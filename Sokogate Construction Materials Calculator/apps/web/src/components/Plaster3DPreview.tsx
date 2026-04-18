"use client";

import React, { useMemo, useState } from "react";

interface Plaster3DPreviewProps {
  area?: number;
  thickness?: number;
}

const PLASTER_TYPES = [
  { id: "cement", name: "Cement Sand" },
  { id: "lime", name: "Lime Plaster" },
  { id: "gypsum", name: "Gypsum" },
  { id: "mud", name: "Mud/Clay" },
];

const PLASTER_COLORS = [
  { id: "cream", hex: "#FDE68A", name: "Cream" },
  { id: "yellow", hex: "#FCD34D", name: "Yellow" },
  { id: "gold", hex: "#FBBF24", name: "Gold" },
  { id: "amber", hex: "#F59E0B", name: "Amber" },
  { id: "orange", hex: "#D97706", name: "Orange" },
  { id: "brown", hex: "#B45309", name: "Brown" },
  { id: "white", hex: "#FEF3C7", name: "White" },
  { id: "sand", hex: "#FDE047", name: "Sand" },
];

export default function Plaster3DPreview({ area = 20, thickness = 15 }: Plaster3DPreviewProps) {
  const [visible, setVisible] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedColor, setSelectedColor] = useState("cream");
  const [selectedType, setSelectedType] = useState("cement");
  
  const wallArea = area || 20;
  const thick = thickness || 15;
  
  const rows = Math.min(8, Math.ceil(Math.sqrt(wallArea)));
  const cols = Math.min(10, Math.ceil(wallArea / rows));
  
  const currentColor = PLASTER_COLORS.find(c => c.id === selectedColor) || PLASTER_COLORS[0];
  const currentType = PLASTER_TYPES.find(t => t.id === selectedType) || PLASTER_TYPES[0];
  
  const sections = useMemo(() => {
    const s = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        s.push({
          key: `${i}-${j}`,
          row: i,
          col: j,
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
        <div className="flex gap-2">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${showOptions ? 'bg-[#E31E24] text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            Options
          </button>
          <button 
            onClick={() => setVisible(!visible)}
            className="px-3 py-1.5 bg-[#E31E24] text-white text-xs font-semibold rounded-lg"
          >
            {visible ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {showOptions && (
        <div className="p-4 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-2">Plaster Type</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {PLASTER_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3 py-1.5 text-xs rounded-lg ${selectedType === type.id ? 'bg-[#E31E24] text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                {type.name}
              </button>
            ))}
          </div>
          <p className="text-xs font-semibold text-slate-500 mb-2">Plaster Color</p>
          <div className="flex flex-wrap gap-2">
            {PLASTER_COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.id ? 'border-[#E31E24]' : 'border-transparent'}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

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
                      backgroundColor: currentColor.hex,
                      margin: 1,
                    }}
                  />
                ))}
              </div>
              <div className="absolute flex items-end" style={{ left: cols * sectionSize + 15, top: 20 }}>
                <div style={{ width: 8, height: 60, backgroundColor: "#E5E7EB", borderRadius: 4 }}>
                  <div style={{ width: "100%", height: Math.min(thick * 2, 50), backgroundColor: "#F59E0B", borderRadius: 4 }} />
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

          <div className="mt-3 p-2 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 text-center">Type: {currentType.name} | Color: {currentColor.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}