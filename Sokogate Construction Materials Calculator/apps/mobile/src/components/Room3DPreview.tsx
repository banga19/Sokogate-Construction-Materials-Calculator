import React, { useMemo } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Room3DPreviewProps {
  length?: number;
  width?: number;
  tileSize?: number;
  visible?: boolean;
  onToggle?: () => void;
}

export default function Room3DPreview({ length = 5, width = 4, tileSize = 60, visible = false, onToggle }: Room3DPreviewProps) {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>3D Room Preview</Text>
        <TouchableOpacity onPress={onToggle} style={styles.toggleBtn}>
          <Text style={styles.toggleText}>{visible ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

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
                        backgroundColor: tile.color,
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

          <Text style={styles.hint}>Interactive 3D floor plan</Text>
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
  hint: {
    marginTop: 12,
    fontSize: 11,
    color: "#94A3B8",
  },
});