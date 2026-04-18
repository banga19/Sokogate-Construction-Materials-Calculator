import React, { useMemo, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";

interface Wall3DPreviewProps {
  length?: number;
  height?: number;
  visible?: boolean;
  onToggle?: () => void;
  selectedColor?: string;
  onColorChange?: (color: string) => void;
  selectedType?: string;
  onTypeChange?: (type: string) => void;
}

const BLOCK_TYPES = [
  { id: "sandcrete", name: "Sandcrete", priceMultiplier: 1 },
  { id: "concrete", name: "Concrete", priceMultiplier: 1.2 },
  { id: "solid", name: "Solid Block", priceMultiplier: 1.5 },
  { id: "hollow", name: "Hollow Block", priceMultiplier: 0.8 },
];

const BLOCK_COLORS = [
  { id: "grey", hex: "#9CA3AF", name: "Grey" },
  { id: "darkgrey", hex: "#6B7280", name: "Dark Grey" },
  { id: "lightgrey", hex: "#D1D5DB", name: "Light Grey" },
  { id: "charcoal", hex: "#4B5563", name: "Charcoal" },
  { id: "slate", hex: "#64748B", name: "Slate" },
  { id: "white", hex: "#F3F4F6", name: "White" },
];

export default function Wall3DPreview({ 
  length = 10, 
  height = 3, 
  visible = false, 
  onToggle,
  selectedColor = "grey",
  onColorChange,
  selectedType = "sandcrete",
  onTypeChange,
}: Wall3DPreviewProps) {
  const [showOptions, setShowOptions] = useState(false);
  
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>3D Wall Preview</Text>
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
          <Text style={styles.optionLabel}>Block Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
            {BLOCK_TYPES.map((type) => (
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

          <Text style={styles.optionLabel}>Block Color</Text>
          <View style={styles.colorGrid}>
            {BLOCK_COLORS.map((color) => (
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
            <View style={[styles.wallContainer, { width: wallWidth + 60, height: wallHeightPx + 60 }]}>
              <View style={styles.sky} />
              
              <View style={[styles.wall, { width: wallWidth, height: wallHeightPx }]}>
                {blocks.map((block) => (
                  <View
                    key={block.key}
                    style={[
                      styles.block,
                      {
                        width: baseBlockSize - 1,
                        height: baseBlockSize * 0.5 - 0.5,
                        backgroundColor: currentColor.hex,
                        left: block.row * baseBlockSize,
                        top: block.col * baseBlockSize * 0.5,
                      },
                    ]}
                  />
                ))}
              </View>
              
              <View style={styles.mortarLines}>
                {Array.from({ length: rows + 1 }).map((_, j) => (
                  <View
                    key={`h-${j}`}
                    style={[
                      styles.mortarLineH,
                      { top: j * baseBlockSize * 0.5, width: wallWidth },
                    ]}
                  />
                ))}
                {Array.from({ length: cols + 1 }).map((_, i) => (
                  <View
                    key={`v-${i}`}
                    style={[
                      styles.mortarLineV,
                      { left: i * baseBlockSize, height: wallHeightPx },
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>

          <View style={styles.info}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Wall Size</Text>
              <Text style={styles.infoValue}>{wallLength}m × {wallHeight}m</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Wall Area</Text>
              <Text style={styles.infoValue}>{(wallLength * wallHeight).toFixed(2)} m²</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Blocks (9")</Text>
              <Text style={styles.infoValue}>{cols} × {rows * 2}</Text>
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
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    overflow: "hidden",
  },
  wallContainer: {
    position: "relative",
  },
  sky: {
    position: "absolute",
    top: 0,
    left: 30,
    right: 0,
    height: 30,
    backgroundColor: "#BFDBFE",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  wall: {
    position: "absolute",
    top: 30,
    left: 30,
    backgroundColor: "#F1F5F9",
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 2,
    borderColor: "#6B7280",
    borderRadius: 2,
  },
  block: {
    position: "absolute",
    borderRadius: 1,
  },
  mortarLines: {
    position: "absolute",
    top: 30,
    left: 30,
  },
  mortarLineH: {
    position: "absolute",
    left: 0,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  mortarLineV: {
    position: "absolute",
    top: 0,
    width: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
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