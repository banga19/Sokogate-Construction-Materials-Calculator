import React, { useMemo } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Plaster3DPreviewProps {
  area?: number;
  thickness?: number;
  visible?: boolean;
  onToggle?: () => void;
}

export default function Plaster3DPreview({ area = 20, thickness = 15, visible = false, onToggle }: Plaster3DPreviewProps) {
  const wallArea = area || 20;
  const thick = thickness || 15;
  
  const rows = Math.min(8, Math.ceil(Math.sqrt(wallArea)));
  const cols = Math.min(10, Math.ceil(wallArea / rows));
  
  const plasterColors = ["#FDE68A", "#FCD34D", "#FBBF24", "#F59E0B", "#D97706", "#B45309"];
  
  const sections = useMemo(() => {
    const s = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const colorIdx = (i + j) % plasterColors.length;
        s.push({
          key: `${i}-${j}`,
          row: i,
          col: j,
          color: plasterColors[colorIdx],
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
        <TouchableOpacity onPress={onToggle} style={styles.toggleBtn}>
          <Text style={styles.toggleText}>{visible ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

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
                        backgroundColor: section.color,
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

          <Text style={styles.hint}>Cement + Sand Plaster</Text>
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
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
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
  hint: {
    marginTop: 12,
    fontSize: 11,
    color: "#94A3B8",
  },
});