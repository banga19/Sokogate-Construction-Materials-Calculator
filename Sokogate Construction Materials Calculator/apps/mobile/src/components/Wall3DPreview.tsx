import React, { useMemo } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Wall3DPreviewProps {
  length?: number;
  height?: number;
  visible?: boolean;
  onToggle?: () => void;
}

export default function Wall3DPreview({ length = 10, height = 3, visible = false, onToggle }: Wall3DPreviewProps) {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>3D Wall Preview</Text>
        <TouchableOpacity onPress={onToggle} style={styles.toggleBtn}>
          <Text style={styles.toggleText}>{visible ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

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
                        backgroundColor: block.color,
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

          <Text style={styles.hint}>9" Sandcrete Blocks</Text>
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
  hint: {
    marginTop: 12,
    fontSize: 11,
    color: "#94A3B8",
  },
});