"use client";

import React, { useMemo, useState } from "react";

export default function Wall3DPreview({ length = 10, height = 3 }) {
  const [visible, setVisible] = useState(true);
  
  const wallLength = length || 10;
  const wallHeight = height || 3;
  
  const blockWidth = 0.45;
  const blockHeight = 0.225;
  
  const cols = Math.ceil(wallLength / blockWidth);
  const rows = Math.ceil(wallHeight / blockHeight);
  
  const blockColors = ["#9CA3AF", "#6B7280", "#4B5563", "#D1D5DB", "#E5E7EB"];
  
  const blocks = useMemo(() => {
    const b = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const colorIdx = (i + j) % blockColors.length;
        b.push({
          key: `${i}-${j}`,
          row: i,
          col: j,
          color: blockColors[colorIdx],
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
        <button 
          onClick={() => setVisible(!visible)}
          className="px-3 py-1.5 bg-[#E31E24] text-white text-xs font-semibold rounded-lg"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>

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
                      backgroundColor: block.color,
                      left: block.row * baseBlockSize,
                      top: block.col * baseBlockSize * 0.5,
                    }}
                  />
                ))}
              </div>

              <div className="absolute" style={{ top: 30, left: 30 }}>
                {Array.from({ length: rows + 1 }).map((_, j) => (
                  <div
                    key={`h-${j}`}
                    className="absolute"
                    style={{
                      top: j * baseBlockSize * 0.5,
                      left: 0,
                      width: wallWidth,
                      height: 1,
                      backgroundColor: "rgba(255,255,255,0.6)",
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

          <p className="text-center text-xs text-slate-400 mt-3">9" Sandcrete Blocks</p>
        </div>
      )}
    </div>
  );
}