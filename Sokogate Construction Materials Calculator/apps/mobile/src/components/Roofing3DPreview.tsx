import React, { useMemo } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Roofing3DPreviewProps {
  length?: number;
  width?: number;
  visible?: boolean;
  onToggle?: () => void;
}

export default function Roofing3DPreview({ length = 12, width = 8, visible = false, onToggle }: Roofing3DPreviewProps) {
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
  
  const sheetColors = ["#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE", "#EDE9FE", "#F5F3FF"];
  
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>3D Roof Preview</Text>
        <TouchableOpacity onPress={onToggle} style={styles.toggleBtn}>
          <Text style={styles.toggleText}>{visible ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      {visible && (
        <View style={styles.canvasContainer}>
          <View style={styles.sceneContainer}>
            <View style={[styles.building, { width: roofLength + 60, height: roofWidth + roofRise + 80 }]}>
              <View style={styles.sky} />
              
              <View style={styles.ground} />
              
              <View style={[styles.walls, { width: roofLength, height: 50 }]}>
                <View style={[styles.leftWall, { height: 50 }]} />
                <View style={[styles.rightWall, { height: 50 }]} />
              </View>
              
              <View style={[styles.roof, { width: roofLength, height: roofWidth }]}>
                {sheets.map((sheet) => (
                  <View
                    key={sheet.key}
                    style={[
                      styles.sheet,
                      {
                        width: sheetSize - 2,
                        height: sheetSize * 0.6,
                        backgroundColor: sheet.color,
                        left: sheet.row * sheetSize,
                        top: sheet.col * sheetSize * 0.6 + sheet.offset,
                      },
                    ]}
                  />
                ))}
                
                <View style={[styles.ridge, { width: roofLength + 10 }]} />
              </View>
              
              <View style={styles.screws}>
                {sheets.slice(0, 6).map((sheet, idx) => (
                  <View
                    key={`screw-${idx}`}
                    style={[
                      styles.screw,
                      {
                        left: sheet.row * sheetSize + sheetSize * 0.3,
                        top: sheet.col * sheetSize * 0.6 + sheet.offset + sheetSize * 0.2,
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>

          <View style={styles.info}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Roof Size</Text>
              <Text style={styles.infoValue}>{bldgLength}m × {bldgWidth}m</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Sheets</Text>
              <Text style={styles.infoValue}>{sheetsLength} × {sheetsWidth}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Total</Text>
              <Text style={styles.infoValue}>{totalSheets} sheets</Text>
            </View>
          </View>

          <Text style={styles.hint}>Aluminum Roofing Sheets</Text>
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
  building: {
    position: "relative",
  },
  sky: {
    position: "absolute",
    top: 0,
    left: 30,
    right: 0,
    height: 25,
    backgroundColor: "#BFDBFE",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  ground: {
    position: "absolute",
    bottom: 0,
    left: 30,
    right: 0,
    height: 20,
    backgroundColor: "#86EFAC",
  },
  walls: {
    position: "absolute",
    bottom: 20,
    left: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftWall: {
    width: 8,
    backgroundColor: "#CBD5E1",
  },
  rightWall: {
    width: 8,
    backgroundColor: "#94A3B8",
  },
  roof: {
    position: "absolute",
    bottom: 20,
    left: 30,
    backgroundColor: "#EDE9FE",
    transform: [{ skewY: "-15deg" }],
    transformOrigin: "bottom",
  },
  sheet: {
    position: "absolute",
    borderRadius: 2,
  },
  ridge: {
    position: "absolute",
    top: -4,
    left: -5,
    height: 8,
    backgroundColor: "#5B21B6",
    borderRadius: 2,
  },
  screws: {
    position: "absolute",
    bottom: 20,
    left: 30,
  },
  screw: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FCD34D",
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