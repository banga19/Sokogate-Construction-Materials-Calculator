import React, { useMemo, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";

interface Room3DPreviewProps {
  length?: number;
  width?: number;
  tileSize?: number;
  visible?: boolean;
  onToggle?: () => void;
  selectedColor?: string;
  onColorChange?: (color: string) => void;
  selectedType?: string;
  onTypeChange?: (type: string) => void;
}

const TILE_TYPES = [
  { id: "ceramic", name: "Ceramic", priceMultiplier: 1 },
  { id: "porcelain", name: "Porcelain", priceMultiplier: 1.5 },
  { id: "vitrified", name: "Vitrified", priceMultiplier: 1.8 },
  { id: "marble", name: "Marble Effect", priceMultiplier: 2.2 },
  { id: "granite", name: "Granite", priceMultiplier: 2.5 },
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

export default function Room3DPreview({ 
  length = 5, 
  width = 4, 
  tileSize = 60, 
  visible = false, 
  onToggle,
  selectedColor = "beige",
  onColorChange,
  selectedType = "ceramic",
  onTypeChange,
}: Room3DPreviewProps) {
  const [showOptions, setShowOptions] = useState(false);
  
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>3D Room Preview</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            onPress={() => setShowOptions(!showOptions)} 
            style={[styles.optionBtn, showOptions && styles.optionBtnActive]}
          >
            <Text style={[styles.optionBtnText, showOptions && styles.optionBtnTextActive]}>
              Options
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onToggle} style={styles.toggleBtn}>
            <Text style={styles.toggleText}>{visible ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showOptions && (
        <View style={styles.optionsContainer}>
          <Text style={styles.optionLabel}>Tile Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
            {TILE_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => onTypeChange?.(type.id)}
                style={[styles.typeBtn, selectedType === type.id && styles.typeBtnActive]}
              >
                <Text style={[styles.typeBtnText, selectedType === type.id && styles.typeBtnTextActive]}>
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.optionLabel}>Tile Color</Text>
          <View style={styles.colorGrid}>
            {TILE_COLORS.map((color) => (
              <TouchableOpacity
                key={color.id}
                onPress={() => onColorChange?.(color.id)}
                style={[
                  styles.colorBtn,
                  { backgroundColor: color.hex },
                  selectedColor === color.id && styles.colorBtnActive,
                ]}
              />
            ))}
          </View>
        </View>
      )}

      {visible && (
        <View style={styles.canvasContainer}>
          <View style={styles.sceneContainer}>
            <View style={[styles.roomBox, { width: cols * baseTileSize + 60, height: rows * baseTileSize + 80 }]}>
              <View style={styles.ceiling} />
              
              <View style={styles.walls}>
                <View style={[styles.backWall, { height: 100, width: cols * baseTileSize }]} />
                <View style={[styles.leftWall, { width: 40, height: rows * baseTileSize }]} />
                <View style={[styles.rightWall, { width: 40, height: rows * baseTileSize }]} />
              </View>

              <View style={[styles.floor, { width: cols * baseTileSize, height: rows * baseTileSize }]}>
                {floorTiles.map((tile) => (
                  <View
                    key={tile.key}
                    style={[
                      styles.tile,
                      {
                        width: baseTileSize - 2,
                        height: baseTileSize - 2,
                        backgroundColor: currentColor.hex,
                        left: tile.row * baseTileSize,
                        top: tile.col * baseTileSize,
                      },
                    ]}
                  />
                ))}
              </View>

              <View style={styles.gridLines}>
                {Array.from({ length: cols + 1 }).map((_, i) => (
                  <View
                    key={`v-${i}`}
                    style={[
                      styles.gridLineV,
                      { left: i * baseTileSize, height: rows * baseTileSize },
                    ]}
                  />
                ))}
                {Array.from({ length: rows + 1 }).map((_, j) => (
                  <View
                    key={`h-${j}`}
                    style={[
                      styles.gridLineH,
                      { top: j * baseTileSize, width: cols * baseTileSize },
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>

          <View style={styles.info}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Room Size</Text>
              <Text style={styles.infoValue}>{roomLength}m × {roomWidth}m</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Floor Area</Text>
              <Text style={styles.infoValue}>{(roomLength * roomWidth).toFixed(2)} m²</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tiles ({ts * 100}cm)</Text>
              <Text style={styles.infoValue}>{cols} × {rows}</Text>
            </View>
          </View>

          <View style={styles.selectedInfo}>
            <Text style={styles.selectedText}>Type: {currentType.name} | Color: {currentColor.name}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: "white",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  headerButtons: {
    flexDirection: "row",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },
  optionBtn: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  optionBtnActive: {
    backgroundColor: "#E31E24",
  },
  optionBtnText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
  },
  optionBtnTextActive: {
    color: "white",
  },
  toggleBtn: {
    backgroundColor: "#E31E24",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  toggleText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  optionsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  optionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 8,
    marginTop: 8,
  },
  typeScroll: {
    marginBottom: 8,
  },
  typeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    marginRight: 8,
  },
  typeBtnActive: {
    backgroundColor: "#E31E24",
  },
  typeBtnText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  typeBtnTextActive: {
    color: "white",
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  colorBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorBtnActive: {
    borderColor: "#E31E24",
  },
  canvasContainer: {
    padding: 16,
    alignItems: "center",
  },
  sceneContainer: {
    height: 260,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    overflow: "hidden",
  },
  roomBox: {
    position: "relative",
  },
  ceiling: {
    position: "absolute",
    top: 0,
    left: 40,
    right: 0,
    height: 40,
    backgroundColor: "#E2E8F0",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  walls: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backWall: {
    position: "absolute",
    top: 0,
    left: 40,
    backgroundColor: "#F1F5F9",
  },
  leftWall: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#CBD5E1",
  },
  rightWall: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#94A3B8",
  },
  floor: {
    position: "absolute",
    top: 100,
    left: 40,
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 3,
    borderColor: "#E31E24",
    borderRadius: 2,
    padding: 1,
    overflow: "hidden",
  },
  tile: {
    borderRadius: 1,
    margin: 0.5,
  },
  gridLines: {
    position: "absolute",
    top: 100,
    left: 40,
  },
  gridLineV: {
    position: "absolute",
    top: 0,
    width: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  gridLineH: {
    position: "absolute",
    left: 0,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 16,
    paddingHorizontal: 10,
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 11,
    color: "#64748B",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
  },
  selectedInfo: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    width: "100%",
  },
  selectedText: {
    fontSize: 11,
    color: "#64748B",
    textAlign: "center",
  },
});