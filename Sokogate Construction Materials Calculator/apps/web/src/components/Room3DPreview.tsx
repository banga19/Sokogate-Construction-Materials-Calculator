"use client";

import React, { useMemo, useState } from "react";

interface Room3DPreviewProps {
  length?: number;
  width?: number;
  tileSize?: number;
}

const TILE_TYPES = [
  { id: "ceramic", name: "Ceramic" },
  { id: "porcelain", name: "Porcelain" },
  { id: "vitrified", name: "Vitrified" },
  { id: "marble", name: "Marble Effect" },
  { id: "granite", name: "Granite" },
];

const TILE_COLORS = [
  { id: "white", hex: "#F5F5F5", name: "White" },
  { id: "beige", hex: "#D4A574", name: "Beige" },
  { id: "cream", hex: "#FFFDD0", name: "Cream" },
  { id: "grey", hex: "#9CA3AF", name: "Grey" },
  { id: "brown", hex: "#8B4513", name: "Brown" },
  { id: "black", hex: "#1F2937", name: "Black" },
  { id: "maroon", hex: "#800000", name: "Maroon" },
  { id: "navy", hex: "#1E3A5F", name: "Navy" },
  { id: "teal", hex: "#0D9488", name: "Teal" },
  { id: "ivory", hex: "#FFFFF0", name: "Ivory" },
  { id: "tan", hex: "#D2B48C", name: "Tan" },
  { id: "slate", hex: "#64748B", name: "Slate" },
];

export default function Room3DPreview({ length = 5, width = 4, tileSize = 60 }: Room3DPreviewProps) {
  const [visible, setVisible] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedColor, setSelectedColor] = useState("beige");
  const [selectedType, setSelectedType] = useState("ceramic");
  
  const roomLength = length || 5;
  const roomWidth = width || 4;
  const ts = (tileSize || 60) / 100;

  const cols = Math.ceil(roomLength / ts);
  const rows = Math.ceil(roomWidth / ts);

  const currentColor = TILE_COLORS.find(c => c.id === selectedColor) || TILE_COLORS[1];
  const currentType = TILE_TYPES.find(t => t.id === selectedType) || TILE_TYPES[0];

  const floorTiles = useMemo(() => {
    const tiles = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        tiles.push({
          key: `${i}-${j}`,
          row: i,
          col: j,
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
          <p className="text-xs font-semibold text-slate-500 mb-2">Tile Type</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {TILE_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3 py-1.5 text-xs rounded-lg ${selectedType === type.id ? 'bg-[#E31E24] text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                {type.name}
              </button>
            ))}
          </div>
          <p className="text-xs font-semibold text-slate-500 mb-2">Tile Color</p>
          <div className="flex flex-wrap gap-2">
            {TILE_COLORS.map((color) => (
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
          <div className="flex justify-center items-center h-64 bg-slate-50 rounded-xl overflow-hidden">
            <div className="relative" style={{ width: cols * baseTileSize + 60, height: rows * baseTileSize + 80 }}>
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
              <div className="absolute" style={{ top: 40, left: 0, right: 0, bottom: 0 }}>
                <div style={{ position: "absolute", top: 0, left: 40, height: 100, width: cols * baseTileSize, backgroundColor: "#F1F5F9" }} />
                <div style={{ position: "absolute", top: 0, left: 0, width: 40, height: rows * baseTileSize, backgroundColor: "#CBD5E1" }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: 40, height: rows * baseTileSize, backgroundColor: "#94A3B8" }} />
              </div>
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
                      backgroundColor: currentColor.hex,
                      margin: 0.5,
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

          <div className="mt-3 p-2 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 text-center">Type: {currentType.name} | Color: {currentColor.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}