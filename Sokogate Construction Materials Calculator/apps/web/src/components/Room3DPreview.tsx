"use client";

import React, { useMemo, useState } from "react";

export default function Room3DPreview({ length = 5, width = 4, tileSize = 60 }) {
  const [visible, setVisible] = useState(true);
  
  const roomLength = length || 5;
  const roomWidth = width || 4;
  const ts = (tileSize || 60) / 100;

  const cols = Math.ceil(roomLength / ts);
  const rows = Math.ceil(roomWidth / ts);

  const tileColors = ["#D4A574", "#C4956A", "#B8895F", "#CFAA7E", "#C49B6D", "#BF9465", "#D9B991", "#CCAA7C"];

  const floorTiles = useMemo(() => {
    const tiles = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const colorIdx = (i * rows + j) % tileColors.length;
        tiles.push({
          key: `${i}-${j}`,
          row: i,
          col: j,
          color: tileColors[colorIdx],
        });
      }
    }
    return tiles;
  }, [cols, rows]);

  const maxDim = Math.max(cols, rows);
  const baseTileSize = Math.min(28, 240 / maxDim);

  return (
    <div className="mb-5 rounded-2xl bg-white overflow-hidden border border-slate-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <h3 className="font-bold text-slate-900">3D Room Preview</h3>
        <button 
          onClick={() => setVisible(!visible)}
          className="px-3 py-1.5 bg-[#E31E24] text-white text-xs font-semibold rounded-lg"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>

      {visible && (
        <div className="p-4">
          <div className="flex justify-center items-center h-64 bg-slate-50 rounded-xl overflow-hidden">
            <div className="relative" style={{ width: cols * baseTileSize + 60, height: rows * baseTileSize + 80 }}>
              {/* Ceiling */}
              <div 
                className="absolute rounded-t-md"
                style={{ 
                  top: 0, 
                  left: 40, 
                  right: 0, 
                  height: 40, 
                  backgroundColor: "#E2E8F0" 
                }} 
              />
              
              {/* Walls */}
              <div className="absolute" style={{ top: 40, left: 0, right: 0, bottom: 0 }}>
                <div 
                  className="absolute" 
                  style={{ 
                    top: 0, 
                    left: 40, 
                    height: 100, 
                    width: cols * baseTileSize, 
                    backgroundColor: "#F1F5F9" 
                  }} 
                />
                <div 
                  className="absolute" 
                  style={{ 
                    top: 0, 
                    left: 0, 
                    width: 40, 
                    height: rows * baseTileSize, 
                    backgroundColor: "#CBD5E1" 
                  }} 
                />
                <div 
                  className="absolute" 
                  style={{ 
                    top: 0, 
                    right: 0, 
                    width: 40, 
                    height: rows * baseTileSize, 
                    backgroundColor: "#94A3B8" 
                  }} 
                />
              </div>

              {/* Floor with tiles */}
              <div 
                className="absolute flex flex-wrap rounded-sm"
                style={{ 
                  top: 100, 
                  left: 40, 
                  width: cols * baseTileSize, 
                  height: rows * baseTileSize,
                  border: "3px solid #E31E24",
                  padding: 1,
                  overflow: "hidden",
                  backgroundColor: "#F8FAFC"
                }}
              >
                {floorTiles.map((tile) => (
                  <div
                    key={tile.key}
                    className="rounded-sm"
                    style={{
                      width: baseTileSize - 2,
                      height: baseTileSize - 2,
                      backgroundColor: tile.color,
                      margin: 0.5,
                    }}
                  />
                ))}
              </div>

              {/* Grid lines */}
              <div className="absolute" style={{ top: 100, left: 40 }}>
                {Array.from({ length: cols + 1 }).map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute"
                    style={{
                      left: i * baseTileSize,
                      top: 0,
                      width: 1,
                      height: rows * baseTileSize,
                      backgroundColor: "rgba(0,0,0,0.15)",
                    }}
                  />
                ))}
                {Array.from({ length: rows + 1 }).map((_, j) => (
                  <div
                    key={`h-${j}`}
                    className="absolute"
                    style={{
                      top: j * baseTileSize,
                      left: 0,
                      width: cols * baseTileSize,
                      height: 1,
                      backgroundColor: "rgba(0,0,0,0.15)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-around mt-4">
            <div className="text-center">
              <p className="text-xs text-slate-500">Room Size</p>
              <p className="text-sm font-bold text-slate-900">{roomLength}m × {roomWidth}m</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Floor Area</p>
              <p className="text-sm font-bold text-slate-900">{(roomLength * roomWidth).toFixed(2)} m²</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Tiles ({ts * 100}cm)</p>
              <p className="text-sm font-bold text-slate-900">{cols} × {rows}</p>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-3">Interactive 3D floor plan</p>
        </div>
      )}
    </div>
  );
}