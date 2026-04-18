import React, { useMemo, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";

interface Plaster3DPreviewProps {
  area?: number;
  thickness?: number;
  visible?: boolean;
  onToggle?: () => void;
  selectedColor?: string;
  onColorChange?: (color: string) => void;
  selectedType?: string;
  onTypeChange?: (type: string) => void;
}

const PLASTER_TYPES = [
  { id: "cement", name: "Cement Sand", priceMultiplier: 1 },
  { id: "lime", name: "Lime Plaster", priceMultiplier: 1.3 },
  { id: "gypsum", name: "Gypsum", priceMultiplier: 1.5 },
  { id: "mud", name: "Mud/Clay", priceMultiplier: 0.6 },
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

export default function Plaster3DPreview({ 
  area = 20, 
  thickness = 15, 
  visible = false, 
  onToggle,
  selectedColor = "cream",
  onColorChange,
  selectedType = "cement",
  onTypeChange,
}: Plaster3DPreviewProps) {
  const [showOptions, setShowOptions] = useState(false);
  
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>3D Wall Plaster Preview</Text>
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
          <Text style={styles.optionLabel}>Plaster Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
            {PLASTER_TYPES.map((type) => (
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

          <Text style={styles.optionLabel}>Plaster Color</Text>
          <View style={styles.colorGrid}>
            {PLASTER_COLORS.map((color) => (
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
            <View style={[styles.wallContainer, { width: cols * sectionSize + 40, height: rows * sectionSize + 50 }]}>
              <View style={styles.sky} />
              
              <View style={[styles.wallSurface, { width: cols * sectionSize, height: rows * sectionSize }]}>
                {sections.map((section) => (
                  <View
                    key={section.key}
                    style={[
                      styles.plasterSection,
                      {
                        width: sectionSize - 2,
                        height: sectionSize - 2,
                        backgroundColor: currentColor.hex,
                        left: section.row * sectionSize,
                        top: section.col * sectionSize,
                      },
                    ]}
                  />
                ))}
              </View>
              
              <View style={styles.gridOverlay}>
                {Array.from({ length: rows + 1 }).map((_, j) => (
                  <View
                    key={`h-${j}`}
                    style={[
                      styles.gridLineH,
                      { top: j * sectionSize, width: cols * sectionSize },
                    ]}
                  />
                ))}
                {Array.from({ length: cols + 1 }).map((_, i) => (
                  <View
                    key={`v-${i}`}
                    style={[
                      styles.gridLineV,
                      { left: i * sectionSize, height: rows * sectionSize },
                    ]}
                  />
                ))}
              </View>

              <View style={[styles.thicknessIndicator, { left: cols * sectionSize + 10 }]}>
                <View style={styles.thicknessBar}>
                  <View style={[styles.thicknessFill, { height: thick * 2 }]} />
                </View>
                <Text style={styles.thicknessText}>{thick}mm</Text>
              </View>
            </View>
          </View>

          <View style={styles.info}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Wall Area</Text>
              <Text style={styles.infoValue}>{wallArea} m²</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Thickness</Text>
              <Text style={styles.infoValue}>{thick} mm</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Mix Ratio</Text>
              <Text style={styles.infoValue}>1:4</Text>
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
    height: 220,
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
    left: 20,
    right: 20,
    height: 20,
    backgroundColor: "#BFDBFE",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  wallSurface: {
    position: "absolute",
    top: 20,
    left: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#F8FAFC",
    borderWidth: 2,
    borderColor: "#F59E0B",
    borderRadius: 4,
  },
  plasterSection: {
    borderRadius: 2,
  },
  gridOverlay: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  gridLineH: {
    position: "absolute",
    left: 0,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  gridLineV: {
    position: "absolute",
    top: 0,
    width: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  thicknessIndicator: {
    position: "absolute",
    top: 20,
    alignItems: "center",
  },
  thicknessBar: {
    width: 8,
    height: 60,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  thicknessFill: {
    width: "100%",
    backgroundColor: "#F59E0B",
    borderRadius: 4,
  },
  thicknessText: {
    fontSize: 8,
    color: "#6B7280",
    marginTop: 4,
    fontWeight: "600",
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