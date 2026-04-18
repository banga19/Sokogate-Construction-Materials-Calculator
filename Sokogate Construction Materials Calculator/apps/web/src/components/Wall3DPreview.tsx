"use client";

import React, { useMemo, useState } from "react";

interface Wall3DPreviewProps {
  length?: number;
  height?: number;
}

const BLOCK_TYPES = [
  { id: "sandcrete", name: "Sandcrete" },
  { id: "concrete", name: "Concrete" },
  { id: "solid", name: "Solid Block" },
  { id: "hollow", name: "Hollow Block" },
];

const BLOCK_COLORS = [
  { id: "grey", hex: "#9CA3AF", name: "Grey" },
  { id: "darkgrey", hex: "#6B7280", name: "Dark Grey" },
  { id: "lightgrey", hex: "#D1D5DB", name: "Light Grey" },
  { id: "charcoal", hex: "#4B5563", name: "Charcoal" },
  { id: "slate", hex: "#64748B", name: "Slate" },
  { id: "white", hex: "#F3F4F6", name: "White" },
];

export default function Wall3DPreview({ length = 10, height = 3 }: Wall3DPreviewProps) {
  const [visible, setVisible] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedColor, setSelectedColor] = useState("grey");
  const [selectedType, setSelectedType] = useState("sandcrete");
  
  const wallLength = length || 10;
  const wallHeight = height || 3;
  
  const blockWidth = 0.45;
  const blockHeight = 0.225;
  
  const cols = Math.ceil(wallLength / blockWidth);
  const rows = Math.ceil(wallHeight / blockHeight);
  
  const currentColor = BLOCK_COLORS.find(c => c.id === selectedColor) || BLOCK_COLORS[0];
  const currentType = BLOCK_TYPES.find(t => t.id === selectedType) || BLOCK_TYPES[0];
  
  const blocks = useMemo(() => {
    const b = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        b.push({
          key: `${i}-${j}`,
          row: i,
          col: j,
        });
      }
    }
    return b;
  }, [cols, rows]);

  const maxDim = Math.max(cols, rows);
  const baseBlockSize = Math.min(16, 180 / maxDim);
  const wallWidth = cols * baseBlockSize;
  const wallHeightPx = rows * baseBlockSize;

  return (
    <div className="mb-5 rounded-2xl bg-white overflow-hidden border border-slate-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h3 className="font-bold text-slate-900">3D Wall Preview</h3>
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
          <p className="text-xs font-semibold text-slate-500 mb-2">Block Type</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {BLOCK_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3 py-1.5 text-xs rounded-lg ${selectedType === type.id ? 'bg-[#E31E24] text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                {type.name}
              </button>
            ))}
          </div>
          <p className="text-xs font-semibold text-slate-500 mb-2">Block Color</p>
          <div className="flex flex-wrap gap-2">
            {BLOCK_COLORS.map((color) => (
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
            <div className="relative" style={{ width: wallWidth + 60, height: wallHeightPx + 60 }}>
              <div 
                className="absolute rounded-t-md"
                style={{ 
                  top: 0, 
                  left: 30, 
                  right: 0, 
                  height: 30, 
                  backgroundColor: "#BFDBFE" 
                }} 
              />
              <div 
                className="absolute flex flex-wrap rounded-sm"
                style={{ 
                  top: 30, 
                  left: 30, 
                  width: wallWidth, 
                  height: wallHeightPx,
                  border: "2px solid #6B7280",
                  backgroundColor: "#F1F5F9"
                }}
              >
                {blocks.map((block) => (
                  <div
                    key={block.key}
                    className="absolute rounded-sm"
                    style={{
                      width: baseBlockSize - 1,
                      height: baseBlockSize * 0.5 - 0.5,
                      backgroundColor: currentColor.hex,
                      left: block.row * baseBlockSize,
                      top: block.col * baseBlockSize * 0.5,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-around mt-4">
            <div className="text-center">
              <p className="text-xs text-slate-500">Wall Size</p>
              <p className="text-sm font-bold text-slate-900">{wallLength}m × {wallHeight}m</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Wall Area</p>
              <p className="text-sm font-bold text-slate-900">{(wallLength * wallHeight).toFixed(2)} m²</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Blocks (9")</p>
              <p className="text-sm font-bold text-slate-900">{cols} × {rows * 2}</p>
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