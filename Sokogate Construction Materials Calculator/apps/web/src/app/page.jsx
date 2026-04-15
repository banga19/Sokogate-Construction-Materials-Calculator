import React, { useState, useMemo, useEffect } from "react";
import {
  LayoutGrid,
  Layers,
  Square,
  Home,
  Info,
  RefreshCcw,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  DollarSign,
} from "lucide-react";

const SOKO_RED = "#E31E24";

// Helper for rounding to practical units
const roundUp = (val) => Math.ceil(val);

// Helper for currency formatting
const formatCurrency = (amount) =>
  `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState("tiles");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const tabs = [
    { id: "tiles", name: "Floor Tiles", icon: LayoutGrid },
    { id: "plaster", name: "Plastering", icon: Layers },
    { id: "blocks", name: "Building Blocks", icon: Square },
    { id: "roofing", name: "Roofing Sheets", icon: Home },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900">
          Construction Materials{" "}
          <span className="text-[#E31E24]">Calculator</span>
        </h1>
        <p className="mx-auto max-w-2xl text-slate-500">
          Professional-grade estimates for your building project. Accurately
          calculate quantities and costs for tiles, cement, blocks, and roofing.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 p-1 bg-slate-100 rounded-xl max-w-3xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all
                ${
                  isActive
                    ? "bg-white text-[#E31E24] shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                }
              `}
            >
              <Icon size={18} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="max-w-5xl mx-auto text-center py-20">
          <RefreshCcw
            className="animate-spin mx-auto mb-4 text-[#E31E24]"
            size={32}
          />
          <p className="text-slate-500">Loading pricing data...</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          {activeTab === "tiles" && <TilesCalculator getPrice={getPrice} />}
          {activeTab === "plaster" && (
            <PlasteringCalculator getPrice={getPrice} />
          )}
          {activeTab === "blocks" && <BlocksCalculator getPrice={getPrice} />}
          {activeTab === "roofing" && <RoofingCalculator getPrice={getPrice} />}
        </div>
      )}
    </div>
  );
}

function TilesCalculator({ getPrice }) {
  const [inputs, setInputs] = useState({
    length: 5,
    width: 4,
    tileLength: 60,
    tileWidth: 60,
    wastage: 10,
    boxSize: 10,
  });

  const results = useMemo(() => {
    const area = inputs.length * inputs.width;
    const tileArea = (inputs.tileLength / 100) * (inputs.tileWidth / 100);
    const basePieces = area / tileArea;
    const totalPieces = roundUp(basePieces * (1 + inputs.wastage / 100));
    const boxes = roundUp(totalPieces / inputs.boxSize);
    const adhesiveBags = roundUp(area / 4.5); // 1 bag (20kg) per ~4.5sqm

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
  }, [inputs, getPrice]);

  return (
    <CalculatorLayout
      title="Floor Tiles Estimator"
      icon={LayoutGrid}
      inputs={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputGroup
            label="Room Length (m)"
            value={inputs.length}
            onChange={(v) => setInputs({ ...inputs, length: v })}
          />
          <InputGroup
            label="Room Width (m)"
            value={inputs.width}
            onChange={(v) => setInputs({ ...inputs, width: v })}
          />
          <InputGroup
            label="Tile Length (cm)"
            value={inputs.tileLength}
            onChange={(v) => setInputs({ ...inputs, tileLength: v })}
          />
          <InputGroup
            label="Tile Width (cm)"
            value={inputs.tileWidth}
            onChange={(v) => setInputs({ ...inputs, tileWidth: v })}
          />
          <InputGroup
            label="Wastage (%)"
            value={inputs.wastage}
            onChange={(v) => setInputs({ ...inputs, wastage: v })}
          />
          <InputGroup
            label="Pieces per Box"
            value={inputs.boxSize}
            onChange={(v) => setInputs({ ...inputs, boxSize: v })}
          />
        </div>
      }
      results={
        <div className="space-y-4">
          <ResultCard
            label="Total Area"
            value={`${results.area.toFixed(2)} m²`}
          />
          <ResultCard
            label="Total Pieces Needed"
            value={results.totalPieces}
            subtext="(including wastage)"
          />
          <ResultCard
            label="Boxes to Order"
            value={results.boxes}
            highlight
            price={
              results.tileBoxPrice > 0
                ? `${formatCurrency(results.tileBoxPrice)} per box`
                : null
            }
          />
          <ResultCard
            label="Adhesive Bags (20kg)"
            value={results.adhesiveBags}
            price={
              results.adhesivePrice > 0
                ? `${formatCurrency(results.adhesivePrice)} per bag`
                : null
            }
          />
          {results.totalCost > 0 && (
            <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-green-900">
                  Estimated Total Cost
                </span>
                <span className="text-2xl font-extrabold text-green-700">
                  {formatCurrency(results.totalCost)}
                </span>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}

function PlasteringCalculator({ getPrice }) {
  const [inputs, setInputs] = useState({
    area: 20,
    thickness: 15,
    ratio: 4, // 1:4
    wastage: 5,
  });

  const results = useMemo(() => {
    const volume = inputs.area * (inputs.thickness / 1000);
    const dryVolume = volume * 1.33; // Shrinkage factor
    const totalVolume = dryVolume * (1 + inputs.wastage / 100);

    // Mix 1:X (e.g., 1:4)
    const cementVolume = totalVolume / (1 + inputs.ratio);
    const sandVolume = cementVolume * inputs.ratio;

    // 50kg bag is ~0.035 m3
    const cementBags = roundUp(cementVolume / 0.0347);

    // Pricing
    const cementPrice = getPrice("Cement 50kg Bag");
    const sandPrice = getPrice("Building Sand");
    const totalCost = cementBags * cementPrice + sandVolume * sandPrice;

    return { cementBags, sandVolume, totalCost, cementPrice, sandPrice };
  }, [inputs, getPrice]);

  return (
    <CalculatorLayout
      title="Plastering Estimator"
      icon={Layers}
      inputs={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputGroup
            label="Wall Area (m²)"
            value={inputs.area}
            onChange={(v) => setInputs({ ...inputs, area: v })}
          />
          <InputGroup
            label="Thickness (mm)"
            value={inputs.thickness}
            onChange={(v) => setInputs({ ...inputs, thickness: v })}
          />
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Mix Ratio (Cement:Sand)
            </label>
            <select
              className="w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24]"
              value={inputs.ratio}
              onChange={(e) =>
                setInputs({ ...inputs, ratio: Number(e.target.value) })
              }
            >
              <option value={3}>1:3 (Strong)</option>
              <option value={4}>1:4 (Standard)</option>
              <option value={5}>1:5 (Light)</option>
            </select>
          </div>
          <InputGroup
            label="Wastage (%)"
            value={inputs.wastage}
            onChange={(v) => setInputs({ ...inputs, wastage: v })}
          />
        </div>
      }
      results={
        <div className="space-y-4">
          <ResultCard
            label="Cement Bags (50kg)"
            value={results.cementBags}
            highlight
            price={
              results.cementPrice > 0
                ? `${formatCurrency(results.cementPrice)} per bag`
                : null
            }
          />
          <ResultCard
            label="Sand Required"
            value={`${results.sandVolume.toFixed(2)} m³`}
            price={
              results.sandPrice > 0
                ? `${formatCurrency(results.sandPrice)} per m³`
                : null
            }
          />
          <div className="p-3 bg-blue-50 rounded-lg flex gap-3 text-xs text-blue-700">
            <Info size={16} className="shrink-0" />
            <p>
              Calculations account for 33% shrinkage from dry mix to wet
              plaster.
            </p>
          </div>
          {results.totalCost > 0 && (
            <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-green-900">
                  Estimated Total Cost
                </span>
                <span className="text-2xl font-extrabold text-green-700">
                  {formatCurrency(results.totalCost)}
                </span>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}

function BlocksCalculator({ getPrice }) {
  const [inputs, setInputs] = useState({
    length: 10,
    height: 3,
    blockSize: "9-inch", // 225x450
    openings: 2, // e.g. 1 door, 1 window
    openingArea: 3.5, // Total m2 of openings
    wastage: 5,
  });

  const results = useMemo(() => {
    const wallArea = inputs.length * inputs.height - inputs.openingArea;
    // Standard block is 0.45m x 0.225m = 0.10125 sqm
    const blockArea = 0.10125;
    const blockCount = roundUp(
      (wallArea / blockArea) * (1 + inputs.wastage / 100),
    );

    // Mortar: roughly 0.6 bags of cement per 100 blocks for 9" blocks
    const cementBags = roundUp((blockCount / 100) * 0.6);

    // Pricing
    const blockPrice = getPrice("9 inch Sandcrete Block");
    const mortarCementPrice = getPrice("Mortar Cement");
    const totalCost = blockCount * blockPrice + cementBags * mortarCementPrice;

    return {
      blockCount,
      cementBags,
      wallArea,
      totalCost,
      blockPrice,
      mortarCementPrice,
    };
  }, [inputs, getPrice]);

  return (
    <CalculatorLayout
      title="Building Blocks Estimator"
      icon={Square}
      inputs={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputGroup
            label="Wall Length (m)"
            value={inputs.length}
            onChange={(v) => setInputs({ ...inputs, length: v })}
          />
          <InputGroup
            label="Wall Height (m)"
            value={inputs.height}
            onChange={(v) => setInputs({ ...inputs, height: v })}
          />
          <InputGroup
            label="Opening Deduction (m²)"
            value={inputs.openingArea}
            onChange={(v) => setInputs({ ...inputs, openingArea: v })}
            subtext="Doors, windows, etc."
          />
          <InputGroup
            label="Wastage (%)"
            value={inputs.wastage}
            onChange={(v) => setInputs({ ...inputs, wastage: v })}
          />
        </div>
      }
      results={
        <div className="space-y-4">
          <ResultCard
            label="Effective Wall Area"
            value={`${results.wallArea.toFixed(2)} m²`}
          />
          <ResultCard
            label="Blocks Needed"
            value={results.blockCount}
            highlight
            price={
              results.blockPrice > 0
                ? `${formatCurrency(results.blockPrice)} per block`
                : null
            }
          />
          <ResultCard
            label="Cement for Mortar (50kg)"
            value={results.cementBags}
            price={
              results.mortarCementPrice > 0
                ? `${formatCurrency(results.mortarCementPrice)} per bag`
                : null
            }
          />
          {results.totalCost > 0 && (
            <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-green-900">
                  Estimated Total Cost
                </span>
                <span className="text-2xl font-extrabold text-green-700">
                  {formatCurrency(results.totalCost)}
                </span>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}

function RoofingCalculator({ getPrice }) {
  const [inputs, setInputs] = useState({
    span: 12,
    width: 8,
    roofType: "gable",
    sheetLength: 2.4, // m
    sheetWidth: 0.9, // m
    wastage: 10,
  });

  const results = useMemo(() => {
    // Basic roof area estimate with pitch factor (assume 30 deg ~ 1.15 factor)
    const baseArea = inputs.span * inputs.width;
    const roofArea = baseArea * (inputs.roofType === "hip" ? 1.25 : 1.15);
    const effectiveSheetArea =
      (inputs.sheetLength - 0.15) * (inputs.sheetWidth - 0.1); // overlap
    const sheets = roundUp(
      (roofArea / effectiveSheetArea) * (1 + inputs.wastage / 100),
    );
    const screws = roundUp(sheets * 12); // ~12 screws per sheet
    const screwPacks = roundUp(screws / 100); // Packs of 100

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
  }, [inputs, getPrice]);

  return (
    <CalculatorLayout
      title="Roofing Sheets Estimator"
      icon={Home}
      inputs={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputGroup
            label="Building Length (m)"
            value={inputs.span}
            onChange={(v) => setInputs({ ...inputs, span: v })}
          />
          <InputGroup
            label="Building Width (m)"
            value={inputs.width}
            onChange={(v) => setInputs({ ...inputs, width: v })}
          />
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Roof Type
            </label>
            <select
              className="w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24]"
              value={inputs.roofType}
              onChange={(e) =>
                setInputs({ ...inputs, roofType: e.target.value })
              }
            >
              <option value="mono">Mono-pitch (Shed)</option>
              <option value="gable">Gable (Standard V)</option>
              <option value="hip">Hip Roof (Complex)</option>
            </select>
          </div>
          <InputGroup
            label="Sheet Length (m)"
            value={inputs.sheetLength}
            onChange={(v) => setInputs({ ...inputs, sheetLength: v })}
          />
          <InputGroup
            label="Wastage (%)"
            value={inputs.wastage}
            onChange={(v) => setInputs({ ...inputs, wastage: v })}
          />
        </div>
      }
      results={
        <div className="space-y-4">
          <ResultCard
            label="Estimated Roof Area"
            value={`${results.roofArea.toFixed(2)} m²`}
          />
          <ResultCard
            label="Sheets to Order"
            value={results.sheets}
            highlight
            price={
              results.sheetPrice > 0
                ? `${formatCurrency(results.sheetPrice)} per sheet`
                : null
            }
          />
          <ResultCard
            label="Screws Needed"
            value={`${results.screws} (${results.screwPacks} packs)`}
            price={
              results.screwPackPrice > 0
                ? `${formatCurrency(results.screwPackPrice)} per pack`
                : null
            }
          />
          {results.totalCost > 0 && (
            <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-green-900">
                  Estimated Total Cost
                </span>
                <span className="text-2xl font-extrabold text-green-700">
                  {formatCurrency(results.totalCost)}
                </span>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}

// UI Components
function CalculatorLayout({ title, icon: Icon, inputs, results }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="lg:col-span-3 p-6 sm:p-10 space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-50 text-[#E31E24] rounded-2xl">
            <Icon size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            <p className="text-slate-500 text-sm">
              Fill in the dimensions below
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          {inputs}
        </div>
      </div>

      <div className="lg:col-span-2 bg-[#FDFDFD] border-l border-slate-100 p-6 sm:p-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold text-slate-900">Estimated Totals</h3>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
            <CheckCircle2 size={12} /> Live Sync
          </span>
        </div>

        {results}

        <div className="mt-10 p-5 bg-[#E31E24] rounded-2xl text-white shadow-lg shadow-red-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-90">
              Ready to buy?
            </span>
            <ShoppingBag size={20} className="opacity-80" />
          </div>
          <p className="text-xs opacity-80 mb-4 leading-relaxed">
            Get these materials delivered to your site today from Nigeria's top
            suppliers.
          </p>
          <button className="w-full bg-white text-[#E31E24] py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
            Order via Sokogate <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, value, onChange, subtext }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">
        {label}
      </label>
      <input
        type="number"
        className="w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {subtext && (
        <p className="mt-1 text-[10px] text-slate-400 font-medium">{subtext}</p>
      )}
    </div>
  );
}

function ResultCard({ label, value, highlight, subtext, price }) {
  return (
    <div
      className={`p-4 rounded-2xl border transition-all ${highlight ? "bg-white border-[#E31E24] ring-1 ring-[#E31E24]/20 shadow-sm" : "bg-slate-50 border-slate-100"}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500 font-medium">{label}</span>
        <span
          className={`text-lg font-bold ${highlight ? "text-[#E31E24]" : "text-slate-900"}`}
        >
          {value}
        </span>
      </div>
      {price && (
        <p className="mt-1 text-[10px] text-green-600 text-right font-semibold flex items-center justify-end gap-1">
          <DollarSign size={10} /> {price}
        </p>
      )}
      {subtext && (
        <p className="mt-1 text-[10px] text-slate-400 text-right italic">
          {subtext}
        </p>
      )}
    </div>
  );
}
