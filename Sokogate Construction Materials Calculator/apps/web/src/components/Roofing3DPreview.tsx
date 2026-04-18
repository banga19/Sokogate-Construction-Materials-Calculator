"use client";

import React, { useMemo, useState } from "react";

export default function Roofing3DPreview({ length = 12, width = 8 }) {
  const [visible, setVisible] = useState(true);
  
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
  
  const sheetColors = ["#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE", "#EDE9FE"];
  
  const roofSlope = 0.3;
  const roofRise = bldgWidth * roofSlope;

  const sheets = useMemo(() => {
    const s = [];
    for (let i = 0; i < sheetsLength; i++) {
      for (let j = 0; j < sheetsWidth; j++) {
        const colorIdx = (i * sheetsWidth + j) % sheetColors.length;
        s.push({
          key: `${i}-${j}`,
          row: i,
          col: j,
          color: sheetColors[colorIdx],
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
              
              <div 
                className="absolute rounded-sm"
                style={{ 
                  bottom: 20, 
                  left: 30, 
                  width: 8, 
                  height: 50, 
                  backgroundColor: "#CBD5E1" 
                }} 
              />
              <div 
                className="absolute rounded-sm"
                style={{ 
                  bottom: 20, 
                  right: 30, 
                  width: 8, 
                  height: 50, 
                  backgroundColor: "#94A3B8" 
                }} 
              />
              
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
                      backgroundColor: sheet.color,
                      left: sheet.row * sheetSize,
                      top: sheet.col * sheetSize * 0.6 + sheet.offset,
                    }}
                  />
                ))}
                <div 
                  className="absolute rounded-sm"
                  style={{ 
                    top: -8, 
                    left: -5, 
                    width: roofLength + 10, 
                    height: 8, 
                    backgroundColor: "#5B21B6" 
                  }} 
                />
              </div>
              
              <div 
                className="absolute rounded-full"
                style={{ 
                  bottom: 30, 
                  left: 45, 
                  width: 4, 
                  height: 4, 
                  backgroundColor: "#FCD34D" 
                }} 
              />
              <div 
                className="absolute rounded-full"
                style={{ 
                  bottom: 45, 
                  left: 60, 
                  width: 4, 
                  height: 4, 
                  backgroundColor: "#FCD34D" 
                }} 
              />

              <div 
                className="absolute"
                style={{ 
                  bottom: 0, 
                  left: 30, 
                  right: 0, 
                  height: 20, 
                  backgroundColor: "#86EFAC" 
                }} 
              />
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

          <p className="text-center text-xs text-slate-400 mt-3">Aluminum Roofing Sheets</p>
        </div>
      )}
    </div>
  );
}