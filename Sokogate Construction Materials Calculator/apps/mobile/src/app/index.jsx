import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  LayoutGrid,
  Layers,
  Square,
  Home,
  Info,
  ChevronRight,
  CheckCircle2,
  ShoppingBag,
  DollarSign,
} from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";

const SOKO_RED = "#E31E24";

const roundUp = (val) => Math.ceil(val);

// Helper for currency formatting
const formatCurrency = (amount) =>
  `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export default function CalculatorScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("tiles");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const focusedPadding = 12;
  const paddingAnimation = useRef(
    new Animated.Value(insets.bottom + focusedPadding),
  ).current;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to find product price by name
  const getPrice = (name) => {
    const product = products.find((p) => p.name === name);
    return product ? Number(product.price) : 0;
  };

  const animateTo = (value) => {
    Animated.timing(paddingAnimation, {
      toValue: value,
      duration: 200,
      useNativeDriver: false, // Cannot use native driver for padding
    }).start();
  };

  const handleInputFocus = () => {
    if (Platform.OS === "web") return;
    animateTo(focusedPadding);
  };

  const handleInputBlur = () => {
    if (Platform.OS === "web") return;
    animateTo(insets.bottom + focusedPadding);
  };

  const tabs = [
    { id: "tiles", name: "Tiles", icon: LayoutGrid },
    { id: "plaster", name: "Plaster", icon: Layers },
    { id: "blocks", name: "Blocks", icon: Square },
    { id: "roofing", name: "Roofing", icon: Home },
  ];

  return (
    <KeyboardAvoidingAnimatedView
      style={{ flex: 1, backgroundColor: "#F8FAFC" }}
      behavior="padding"
    >
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <StatusBar style="dark" />

        {/* Header */}
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{ backgroundColor: SOKO_RED, padding: 8, borderRadius: 8 }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                S
              </Text>
            </View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "900",
                color: SOKO_RED,
                letterSpacing: -0.5,
              }}
            >
              SOKOGATE
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: SOKO_RED,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 12 }}>
              Shop
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1E293B" }}>
            Material Calculator
          </Text>
          <Text style={{ color: "#64748B", fontSize: 14 }}>
            Get accurate estimates with live pricing.
          </Text>
        </View>

        {/* Tabs */}
        <View style={{ paddingHorizontal: 15, marginBottom: 20 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 0 }}
          >
            <View style={{ flexDirection: "row", gap: 10, paddingRight: 20 }}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <TouchableOpacity
                    key={tab.id}
                    onPress={() => setActiveTab(tab.id)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 12,
                      backgroundColor: isActive ? "white" : "#F1F5F9",
                      borderWidth: 1,
                      borderColor: isActive ? SOKO_RED : "#E2E8F0",
                      shadowColor: isActive ? SOKO_RED : "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: isActive ? 0.1 : 0,
                      shadowRadius: 4,
                    }}
                  >
                    <Icon size={18} color={isActive ? SOKO_RED : "#64748B"} />
                    <Text
                      style={{
                        fontWeight: "600",
                        color: isActive ? SOKO_RED : "#64748B",
                        fontSize: 14,
                      }}
                    >
                      {tab.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={SOKO_RED} />
            <Text style={{ marginTop: 12, color: "#64748B" }}>
              Loading pricing data...
            </Text>
          </View>
        ) : (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {activeTab === "tiles" && (
              <TilesCalc
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                getPrice={getPrice}
              />
            )}
            {activeTab === "plaster" && (
              <PlasterCalc
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                getPrice={getPrice}
              />
            )}
            {activeTab === "blocks" && (
              <BlocksCalc
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                getPrice={getPrice}
              />
            )}
            {activeTab === "roofing" && (
              <RoofingCalc
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                getPrice={getPrice}
              />
            )}

            {/* Spacer for keyboard padding */}
            <Animated.View style={{ height: paddingAnimation }} />
          </ScrollView>
        )}

        {/* Buy Button Overlay */}
        <View
          style={{
            position: "absolute",
            bottom: insets.bottom + 10,
            left: 20,
            right: 20,
            backgroundColor: SOKO_RED,
            borderRadius: 20,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <View>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Ready to Order?
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>
              Materials delivered to your site
            </Text>
          </View>
          <TouchableOpacity
            style={{ backgroundColor: "white", padding: 12, borderRadius: 12 }}
          >
            <ShoppingBag size={20} color={SOKO_RED} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}

function TilesCalc({ onFocus, onBlur, getPrice }) {
  const [length, setLength] = useState("5");
  const [width, setWidth] = useState("4");
  const [tileLength, setTileLength] = useState("60");
  const [tileWidth, setTileWidth] = useState("60");

  const results = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const tl = parseFloat(tileLength) || 1;
    const tw = parseFloat(tileWidth) || 1;
    const area = l * w;
    const tileArea = (tl / 100) * (tw / 100);
    const totalPieces = roundUp((area / tileArea) * 1.1); // 10% wastage
    const boxes = roundUp(totalPieces / 10);
    const adhesiveBags = roundUp(area / 4.5);

    // Pricing
    const tileBoxPrice = getPrice("Floor Tile (Box of 10)");
    const adhesivePrice = getPrice("Tile Adhesive");
    const totalCost = boxes * tileBoxPrice + adhesiveBags * adhesivePrice;

    return {
      area,
      totalPieces,
      boxes,
      adhesiveBags,
      totalCost,
      tileBoxPrice,
      adhesivePrice,
    };
  }, [length, width, tileLength, tileWidth, getPrice]);

  return (
    <View style={cardStyle}>
      <Text style={cardTitleStyle}>Floor Tiles</Text>
      <Input
        label="Room Length (m)"
        value={length}
        onChange={setLength}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Input
        label="Room Width (m)"
        value={width}
        onChange={setWidth}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Input
        label="Tile Size Length (cm)"
        value={tileLength}
        onChange={setTileLength}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Input
        label="Tile Size Width (cm)"
        value={tileWidth}
        onChange={setTileWidth}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      <View style={dividerStyle} />

      <Result label="Total Area" value={`${results.area.toFixed(2)} m²`} />
      <Result label="Total Pieces" value={results.totalPieces} />
      <Result
        label="Boxes (of 10)"
        value={results.boxes}
        highlight
        price={
          results.tileBoxPrice > 0 ? formatCurrency(results.tileBoxPrice) : null
        }
      />
      <Result
        label="Adhesive Bags (20kg)"
        value={results.adhesiveBags}
        price={
          results.adhesivePrice > 0
            ? formatCurrency(results.adhesivePrice)
            : null
        }
      />

      {results.totalCost > 0 && (
        <View
          style={{
            marginTop: 16,
            backgroundColor: "#ECFDF5",
            padding: 16,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: "#10B981",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: "#047857",
              marginBottom: 4,
            }}
          >
            ESTIMATED TOTAL
          </Text>
          <Text style={{ fontSize: 26, fontWeight: "900", color: "#059669" }}>
            {formatCurrency(results.totalCost)}
          </Text>
        </View>
      )}
    </View>
  );
}

function PlasterCalc({ onFocus, onBlur, getPrice }) {
  const [area, setArea] = useState("20");
  const [thick, setThick] = useState("15");

  const results = useMemo(() => {
    const a = parseFloat(area) || 0;
    const t = parseFloat(thick) || 0;
    const volume = a * (t / 1000);
    const dryVolume = volume * 1.33 * 1.05; // shrinkage + 5% wastage
    const cementBags = roundUp(dryVolume / (1 + 4) / 0.0347); // 1:4 mix
    const sand = (dryVolume / (1 + 4)) * 4;

    // Pricing
    const cementPrice = getPrice("Cement 50kg Bag");
    const sandPrice = getPrice("Building Sand");
    const totalCost = cementBags * cementPrice + sand * sandPrice;

    return { cementBags, sand, totalCost, cementPrice, sandPrice };
  }, [area, thick, getPrice]);

  return (
    <View style={cardStyle}>
      <Text style={cardTitleStyle}>Plastering (1:4 Mix)</Text>
      <Input
        label="Wall Area (m²)"
        value={area}
        onChange={setArea}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Input
        label="Thickness (mm)"
        value={thick}
        onChange={setThick}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      <View style={dividerStyle} />

      <Result
        label="Cement Bags (50kg)"
        value={results.cementBags}
        highlight
        price={
          results.cementPrice > 0 ? formatCurrency(results.cementPrice) : null
        }
      />
      <Result
        label="Sand Required"
        value={`${results.sand.toFixed(2)} m³`}
        price={results.sandPrice > 0 ? formatCurrency(results.sandPrice) : null}
      />

      {results.totalCost > 0 && (
        <View
          style={{
            marginTop: 16,
            backgroundColor: "#ECFDF5",
            padding: 16,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: "#10B981",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: "#047857",
              marginBottom: 4,
            }}
          >
            ESTIMATED TOTAL
          </Text>
          <Text style={{ fontSize: 26, fontWeight: "900", color: "#059669" }}>
            {formatCurrency(results.totalCost)}
          </Text>
        </View>
      )}
    </View>
  );
}

function BlocksCalc({ onFocus, onBlur, getPrice }) {
  const [len, setLen] = useState("10");
  const [h, setH] = useState("3");

  const results = useMemo(() => {
    const l = parseFloat(len) || 0;
    const wallH = parseFloat(h) || 0;
    const area = l * wallH;
    const blocks = roundUp((area / 0.10125) * 1.05); // 5% wastage
    const cementBags = roundUp((blocks / 100) * 0.6);

    // Pricing
    const blockPrice = getPrice("9 inch Sandcrete Block");
    const mortarCementPrice = getPrice("Mortar Cement");
    const totalCost = blocks * blockPrice + cementBags * mortarCementPrice;

    return {
      blocks,
      area,
      cementBags,
      totalCost,
      blockPrice,
      mortarCementPrice,
    };
  }, [len, h, getPrice]);

  return (
    <View style={cardStyle}>
      <Text style={cardTitleStyle}>Building Blocks (9")</Text>
      <Input
        label="Wall Length (m)"
        value={len}
        onChange={setLen}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Input
        label="Wall Height (m)"
        value={h}
        onChange={setH}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      <View style={dividerStyle} />

      <Result label="Wall Area" value={`${results.area.toFixed(2)} m²`} />
      <Result
        label="Blocks to Order"
        value={results.blocks}
        highlight
        price={
          results.blockPrice > 0 ? formatCurrency(results.blockPrice) : null
        }
      />
      <Result
        label="Mortar Cement (50kg)"
        value={results.cementBags}
        price={
          results.mortarCementPrice > 0
            ? formatCurrency(results.mortarCementPrice)
            : null
        }
      />

      {results.totalCost > 0 && (
        <View
          style={{
            marginTop: 16,
            backgroundColor: "#ECFDF5",
            padding: 16,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: "#10B981",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: "#047857",
              marginBottom: 4,
            }}
          >
            ESTIMATED TOTAL
          </Text>
          <Text style={{ fontSize: 26, fontWeight: "900", color: "#059669" }}>
            {formatCurrency(results.totalCost)}
          </Text>
        </View>
      )}
    </View>
  );
}

function RoofingCalc({ onFocus, onBlur, getPrice }) {
  const [span, setSpan] = useState("12");
  const [width, setWidth] = useState("8");

  const results = useMemo(() => {
    const s = parseFloat(span) || 0;
    const w = parseFloat(width) || 0;
    const roofArea = s * w * 1.15;
    const sheets = roundUp(roofArea / 2.0); // Simple 2sqm effective sheet area
    const screws = roundUp(sheets * 12);
    const screwPacks = roundUp(screws / 100);

    // Pricing
    const sheetPrice = getPrice("Aluminum Roofing Sheet 0.5mm");
    const screwPackPrice = getPrice("Roofing Screws (Pack of 100)");
    const totalCost = sheets * sheetPrice + screwPacks * screwPackPrice;

    return {
      roofArea,
      sheets,
      screws,
      screwPacks,
      totalCost,
      sheetPrice,
      screwPackPrice,
    };
  }, [span, width, getPrice]);

  return (
    <View style={cardStyle}>
      <Text style={cardTitleStyle}>Roofing Sheets</Text>
      <Input
        label="Building Length (m)"
        value={span}
        onChange={setSpan}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Input
        label="Building Width (m)"
        value={width}
        onChange={setWidth}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      <View style={dividerStyle} />

      <Result
        label="Roof Area (est)"
        value={`${results.roofArea.toFixed(2)} m²`}
      />
      <Result
        label="Sheets Needed"
        value={results.sheets}
        highlight
        price={
          results.sheetPrice > 0 ? formatCurrency(results.sheetPrice) : null
        }
      />
      <Result
        label="Screws (packs of 100)"
        value={results.screwPacks}
        price={
          results.screwPackPrice > 0
            ? formatCurrency(results.screwPackPrice)
            : null
        }
      />

      {results.totalCost > 0 && (
        <View
          style={{
            marginTop: 16,
            backgroundColor: "#ECFDF5",
            padding: 16,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: "#10B981",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: "#047857",
              marginBottom: 4,
            }}
          >
            ESTIMATED TOTAL
          </Text>
          <Text style={{ fontSize: 26, fontWeight: "900", color: "#059669" }}>
            {formatCurrency(results.totalCost)}
          </Text>
        </View>
      )}
    </View>
  );
}

function Input({ label, value, onChange, onFocus, onBlur }) {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: "600",
          color: "#475569",
          marginBottom: 6,
        }}
      >
        {label}
      </Text>
      <TextInput
        style={{
          backgroundColor: "#F1F5F9",
          borderRadius: 12,
          padding: 14,
          fontSize: 16,
          color: "#1E293B",
          fontWeight: "500",
        }}
        value={value}
        onChangeText={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        keyboardType="numeric"
      />
    </View>
  );
}

function Result({ label, value, highlight, price }) {
  return (
    <View
      style={{
        marginBottom: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 14, color: "#64748B", fontWeight: "500" }}>
          {label}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            color: highlight ? SOKO_RED : "#1E293B",
          }}
        >
          {value}
        </Text>
      </View>
      {price && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: 2,
            gap: 4,
          }}
        >
          <DollarSign size={10} color="#059669" />
          <Text style={{ fontSize: 10, color: "#059669", fontWeight: "700" }}>
            {price}
          </Text>
        </View>
      )}
    </View>
  );
}

const cardStyle = {
  backgroundColor: "white",
  borderRadius: 24,
  padding: 24,
  borderWidth: 1,
  borderColor: "#E2E8F0",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.05,
  shadowRadius: 10,
  elevation: 2,
};

const cardTitleStyle = {
  fontSize: 20,
  fontWeight: "800",
  color: "#1E293B",
  marginBottom: 20,
};

const dividerStyle = {
  height: 1,
  backgroundColor: "#F1F5F9",
  marginVertical: 20,
};
