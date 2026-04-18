"use client";

import React, { useMemo, useState } from "react";

interface Roofing3DPreviewProps {
  length?: number;
  width?: number;
}

const ROOFING_TYPES = [
  { id: "aluminum", name: "Aluminum" },
  { id: "zinc", name: "Zinc" },
  { id: "copper", name: "Copper" },
  { id: "steel", name: "Steel" },
  { id: "tile", name: "Roof Tile" },
  { id: "shingle", name: "Shingle" },
];

const ROOFING_COLORS = [
  { id: "purple", hex: "#7C3AED", name: "Purple" },
  { id: "violet", hex: "#8B5CF6", name: "Violet" },
  { id: "lavender", hex: "#A78BFA", name: "Lavender" },
  { id: "lilac", hex: "#C4B5FD", name: "Lilac" },
  { id: "mauve", hex: "#DDD6FE", name: "Mauve" },
  { id: "periwinkle", hex: "#EDE9FE", name: "Periwinkle" },
  { id: "charcoal", hex: "#374151", name: "Charcoal" },
  { id: "terracotta", hex: "#B45309", name: "Terracotta" },
  { id: "rust", hex: "#9A3412", name: "Rust" },
  { id: "slate", hex: "#64748B", name: "Slate" },
];

export default function Roofing3DPreview({ length = 12, width = 8 }: Roofing3DPreviewProps) {
  const [visible, setVisible] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedColor, setSelectedColor] = useState("purple");
  const [selectedType, setSelectedType] = useState("aluminum");
  
  const bldgLength = length || 12;
  const bldgWidth = width || 8;
  
  const sheetLength = 2.4;
  const sheetWidth = 0.9;
  const overlap = 0.15;
  
  const effectiveSheetLength = sheetLength - overlap;
  const effectiveSheetWidth = sheetWidth - overlap;
  
  const sheetsLength = Math.ceil(bldgLength / effectiveSheetLength);
  const sheetsWidth = Math.ceil(bldgWidth / effectiveSheetWidth);
  const totalSheets = sheetsLength * sheetsWidth;
  
  const currentColor = ROOFING_COLORS.find(c => c.id === selectedColor) || ROOFING_COLORS[0];
  const currentType = ROOFING_TYPES.find(t => t.id === selectedType) || ROOFING_TYPES[0];
  
  const roofSlope = 0.3;
  const roofRise = bldgWidth * roofSlope;

  const sheets = useMemo(() => {
    const s = [];
    for (let i = 0; i < sheetsLength; i++) {
      for (let j = 0; j < sheetsWidth; j++) {
        s.push({
          key: `${i}-${j}`,
          row: i,
          col: j,
          offset: j % 2 === 1 ? roofRise / 2 : 0,
        });
      }
    }
    return s;
  }, [sheetsLength, sheetsWidth]);

  const maxDim = Math.max(sheetsLength, sheetsWidth);
  const sheetSize = Math.min(40, 300 / maxDim);
  const roofWidth = sheetsWidth * sheetSize;
  const roofLength = sheetsLength * sheetSize;

  return (
    <div className="mb-5 rounded-2xl bg-white overflow-hidden border border-slate-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h3 className="font-bold text-slate-900">3D Roof Preview</h3>
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
          <p className="text-xs font-semibold text-slate-500 mb-2">Roofing Type</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {ROOFING_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3 py-1.5 text-xs rounded-lg ${selectedType === type.id ? 'bg-[#E31E24] text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                {type.name}
              </button>
            ))}
          </div>
          <p className="text-xs font-semibold text-slate-500 mb-2">Sheet Color</p>
          <div className="flex flex-wrap gap-2">
            {ROOFING_COLORS.map((color) => (
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
          <div className="flex justify-center items-center h-52 bg-slate-50 rounded-xl overflow-hidden">
            <div className="relative" style={{ width: roofLength + 60, height: roofWidth + roofRise + 80 }}>
              <div 
                className="absolute rounded-t-md"
                style={{ 
                  top: 0, 
                  left: 30, 
                  right: 0, 
                  height: 25, 
                  backgroundColor: "#BFDBFE" 
                }} 
              />
              <div style={{ position: "absolute", bottom: 20, left: 30, width: 8, height: 50, backgroundColor: "#CBD5E1" }} />
              <div style={{ position: "absolute", bottom: 20, right: 30, width: 8, height: 50, backgroundColor: "#94A3B8" }} />
              <div 
                className="absolute flex flex-wrap rounded-sm"
                style={{ 
                  bottom: 20, 
                  left: 30, 
                  width: roofLength, 
                  height: roofWidth,
                  border: "2px solid #7C3AED",
                  backgroundColor: "#EDE9FE",
                  transform: "skewY(-15deg)",
                  transformOrigin: "bottom"
                }}
              >
                {sheets.map((sheet) => (
                  <div
                    key={sheet.key}
                    className="absolute rounded-sm"
                    style={{
                      width: sheetSize - 2,
                      height: sheetSize * 0.6,
                      backgroundColor: currentColor.hex,
                      left: sheet.row * sheetSize,
                      top: sheet.col * sheetSize * 0.6 + sheet.offset,
                    }}
                  />
                ))}
                <div style={{ position: "absolute", top: -8, left: -5, width: roofLength + 10, height: 8, backgroundColor: "#5B21B6", borderRadius: 2 }} />
              </div>
              <div style={{ position: "absolute", bottom: 30, left: 45, width: 4, height: 4, borderRadius: "50%", backgroundColor: "#FCD34D" }} />
              <div style={{ position: "absolute", bottom: 45, left: 60, width: 4, height: 4, borderRadius: "50%", backgroundColor: "#FCD34D" }} />
              <div style={{ position: "absolute", bottom: 0, left: 30, right: 0, height: 20, backgroundColor: "#86EFAC" }} />
            </div>
          </div>

          <div className="flex justify-around mt-4">
            <div className="text-center">
              <p className="text-xs text-slate-500">Roof Size</p>
              <p className="text-sm font-bold text-slate-900">{bldgLength}m × {bldgWidth}m</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Sheets</p>
              <p className="text-sm font-bold text-slate-900">{sheetsLength} × {sheetsWidth}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Total</p>
              <p className="text-sm font-bold text-slate-900">{totalSheets} sheets</p>
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