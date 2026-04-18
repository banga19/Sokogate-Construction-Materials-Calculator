# Sokogate Construction Materials Calculator

A polished, full-stack construction materials estimator built for Sokogate. Helps contractors and construction professionals quickly calculate material quantities and costs for common building projects in Kenya.

![Sokogate](https://via.placeholder.com/80?text=SOKO) Built with React Router v7, PostgreSQL (Neon), and Tailwind CSS.

---

## 🏗️ Calculators

### 1. Floor Tiles Estimator
Calculate tile quantities and adhesive for flooring projects.
- **Inputs**: Room dimensions (length × width), tile size, wastage %, pieces per box
- **Outputs**: Total area, pieces needed, boxes to order, adhesive bags (20kg), total cost
- **Wastage**: Default 10% (configurable)
- **Coverage**: 1 bag of tile adhesive covers ~4.5m²

### 2. Plastering Estimator
Calculate cement and sand quantities for wall plastering.
- **Inputs**: Wall area (m²), thickness (mm), cement:sand ratio (1:3, 1:4, 1:5), wastage %
- **Outputs**: Cement bags (50kg), sand volume (m³), total cost
- **Formula**: Includes 33% shrinkage factor for wet mix conversion
- **Mix Ratios**: 
  - 1:3 — Strong (external walls, foundations)
  - 1:4 — Standard (internal walls, general plaster)
  - 1:5 — Light (non-structural partitions)

### 3. Building Blocks Estimator
Calculate block quantities with opening deductions for masonry walls.
- **Inputs**: Wall length & height, opening deduction area (doors/windows), wastage %
- **Outputs**: Effective wall area, blocks needed, cement for mortar, total cost
- **Block Size**: Standard 9-inch sandcrete block (225×450mm = 0.10125m²)
- **Mortar**: ~0.6 cement bags per 100 blocks (9-inch)

### 4. Roofing Sheets Estimator
Calculate roofing sheets, screws, and cost for different roof types.
- **Inputs**: Building dimensions (span × width), roof type (mono/gable/hip), sheet dimensions, wastage %
- **Outputs**: Roof area (with pitch factor), sheets needed, screws count, screw packs, total cost
- **Pitch Factors**: Mono-pitch ×1.15, Gable ×1.15, Hip ×1.25
- **Overlap**: Deducts 15cm from sheet length and 10cm from width for coverage

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, React Router v7, Tailwind CSS |
| **Data Layer** | TanStack React Query (caching) |
| **Server** | React Router Server Routes (Node.js edge) |
| **Database** | PostgreSQL (Neon serverless) via `@neondatabase/serverless` |
| **Icons** | Lucide React |
| **Code Style** | TypeScript, functional components, hooks |

---

## 📁 Project Structure

```
sokogate-construction-materials-calculator/
├── apps/
│   ├── web/                                # Web application
│   │   ├── src/
│   │   │   ├── app/                       # React Router v7 file-based routes
│   │   │   │   ├── page.jsx               # Main calculator dashboard
│   │   │   │   ├── materials/page.tsx     # Public materials catalog
│   │   │   │   ├── admin/products/page.jsx # Admin product management (CRUD)
│   │   │   │   ├── api/                   # Serverless API routes
│   │   │   │   │   ├── products/
│   │   │   │   │   │   ├── route.js       # GET (list + filter), POST (create)
│   │   │   │   │   │   └── [id]/route.js  # GET (one), PUT (update), DELETE
│   │   │   │   │   └── utils/
│   │   │   │   │       └── sql.js         # Neon WASM edge-sql client
│   │   │   │   └── __create/              # Dev scaffolding (auto-generated)
│   │   │   ├── components/               # 3D Preview components
│   │   │   │   ├── Room3DPreview.tsx     # Tiles 3D visualization
│   │   │   │   ├── Wall3DPreview.tsx     # Blocks 3D visualization
│   │   │   │   ├── Plaster3DPreview.tsx  # Plaster 3D visualization
│   │   │   │   └── Roofing3DPreview.tsx  # Roofing 3D visualization
│   │   │   └── utils/
│   │   │       └── database.ts            # Supabase client (legacy/research-only)
│   │   ├── .env                           # Environment config (see below)
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── mobile/                            # Mobile application (Expo)
│       ├── src/
│       │   ├── app/                       # Main app screens
│       │   │   └── index.jsx              # Calculator with tabs
│       │   ├── components/                 # 3D Preview components
│       │   │   ├── Room3DPreview.tsx     # Tiles 3D visualization
│       │   │   ├── Wall3DPreview.tsx     # Blocks 3D visualization
│       │   │   ├── Plaster3DPreview.tsx  # Plaster 3D visualization
│       │   │   └── Roofing3DPreview.tsx  # Roofing 3D visualization
│       │   └── utils/
│       ├── app.json                       # Expo configuration
│       ├── package.json
│       └── android/                       # Generated native Android project
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon account or local)

### 1. Install Dependencies

```bash
cd apps/web
npm install
```

### 2. Configure Environment

Create `.env` in `apps/web/`:

```env
# Neon PostgreSQL connection string (required)
DATABASE_URL=postgresql://username:password@host.neon.tech/dbname?sslmode=require
```

**Getting a Neon database (free tier):**
1. Visit https://neon.tech → Sign up
2. Create new project → Wait for provisioning
3. Copy the **Connection String** (includes `?sslmode=require`)
4. Paste into `.env`

### 3. Create Database Table

Run this SQL in the Neon SQL editor:

```sql
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (
    category IN ('tiles', 'cement', 'blocks', 'roofing', 'adhesive', 'sand')
  ),
  unit TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. (Optional) Seed Sample Data

Populate with typical Kenyan market prices:

```sql
INSERT INTO products (name, category, unit, price, description) VALUES
-- Floor Tiles
('Floor Tile (Box of 10)', 'tiles', 'box', 15000, '60x60cm ceramic floor tile'),
('Tile Adhesive', 'adhesive', 'bag', 3500, '20kg polymer-modified adhesive'),

-- Plastering Materials
('Cement 50kg Bag', 'cement', 'bag', 10500, 'Dangote 42.5N Portland Cement'),
('Building Sand', 'sand', 'm3', 25000, 'River sand for construction'),

-- Building Blocks
('9 inch Sandcrete Block', 'blocks', 'piece', 450, 'Standard 450×225×150mm'),
('6 inch Sandcrete Block', 'blocks', 'piece', 350, 'Standard 450×150×150mm'),
('Mortar Cement', 'cement', 'bag', 12000, '20kg ready-mix mortar'),

-- Roofing
('Aluminum Roofing Sheet 0.5mm', 'roofing', 'sheet', 18500, '6ft×3ft corrugated aluminum'),
('Roofing Screws (Pack of 100)', 'roofing', 'pack', 8500, 'Self-drilling roofing screws')
ON CONFLICT DO NOTHING;
```

### 5. Start Development Servers

This monorepo contains two separate apps — start them independently.

#### Web (React Router + Vite)

```bash
cd apps/web
npm install  # if not done already
npm run dev
```

Open http://localhost:5173

### Mobile (Expo Router — React Native)

**Prerequisites:** Node.js 18+, Expo Go app on your phone (iOS/Android)

```bash
cd apps/mobile
npx expo install          # Install dependencies (includes expo, react-native)
npx expo start            # Start Expo development server
```

**Run on device:**
- Scan QR code with **Expo Go** app (iOS App Store / Google Play)
- Or press `a` for Android emulator, `i` for iOS simulator (macOS only)
- Press `w` to open in web browser (mobile layout)

**Native builds (optional):**
```bash
npx expo run:android   # Build & install on Android device/emulator
npx expo run:ios       # Build & install on iOS simulator (macOS)
npx expo prebuild      # Generate native android/ios projects
```

**Note:** The mobile app connects to the **web app's API** at `/api/products`. During development:
- Both apps must be running simultaneously
- Mobile app uses Metro dev server proxy to reach web API
- Ensure web app runs on http://localhost:5173 (default)
- On physical device, Metro automatically tunnels via ngrok/tunnel

---

## 📱 Mobile App Overview

The mobile app (`apps/mobile/`) is a **native React Native** application using **Expo Router** (file-based routing). It provides the same 4 calculators optimized for touch with native UI components and keyboard handling.

### 3D Visualization Features
Each calculator includes an interactive 3D preview:
- **Tiles** - Isometric floor plan with colored tiles, room dimensions, and area calculations
- **Blocks** - 3D wall preview showing block arrangement and count
- **Plaster** - Wall surface preview with thickness visualization
- **Roofing** - Slanted roof preview with sheet layout

### Material Customization
- **Tile Types**: Ceramic, Porcelain, Vitrified, Marble Effect, Granite
- **Tile Colors**: 12 color options (White, Beige, Cream, Grey, Brown, Black, Maroon, Navy, Teal, Ivory, Tan, Slate)
- **Block Types**: Sandcrete, Concrete, Solid Block, Hollow Block
- **Block Colors**: Grey, Dark Grey, Light Grey, Charcoal, Slate, White
- **Plaster Types**: Cement Sand, Lime Plaster, Gypsum, Mud/Clay
- **Plaster Colors**: Cream, Yellow, Gold, Amber, Orange, Brown, White, Sand
- **Roofing Types**: Aluminum, Zinc, Copper, Steel, Roof Tile, Shingle
- **Roofing Colors**: 10 color options including Purple, Violet, Charcoal, Terracotta, Rust, Slate

Each 3D preview has an "Options" button to toggle the material selector panel.

### Key Files
- `src/app/index.jsx` — Main calculator screen with tabs (Tiles, Plaster, Blocks, Roofing)
- `src/components/KeyboardAvoidingAnimatedView.jsx` — Handles keyboard layout adjustments on input focus
- `src/components/MaterialsList.tsx` — Materials catalog view (read-only)
- `app.json` — Expo config with plugins for video, audio, fonts, splash screen

### Tech Notes
- **Expo SDK 54** with React Native 0.81
- **Expo Router v6** for navigation (file-based routes)
- **Lucide React Native** for icons
- Connects to **web app's API** (`/api/products`) during development
- Uses `expo-status-bar`, `react-native-safe-area-context`, `react-native-gesture-handler`

### Calculator Implementation (Mobile vs Web)

| Feature | Web (React Router) | Mobile (Expo) |
|---------|-------------------|---------------|
| Tiles | ✅ Wastage %, box size configurable | ✅ Wastage 10% fixed, box size 10 fixed |
| Plastering | ✅ Ratio selector (1:3, 1:4, 1:5) | ⚠️ Hardcoded 1:4 mix ratio |
| Blocks | ✅ Opening deduction input | ⚠️ Simplified (no openings yet) |
| Roofing | ✅ Roof type selector (mono/gable/hip) | ⚠️ Fixed gable pitch ×1.15 |
| Result card | Live sync badge, detailed pricing | Same layout, native styling |
| Keyboard | N/A | Animated bottom padding on focus |

Mobile calculations use fixed parameters for simplicity — future work could add full parity with the web version.

---

## 🔧 Development Workflow

### Running both apps simultaneously

The web app provides the backend API, and the mobile app consumes it. Run them in separate terminals:

**Terminal 1 — Start web dev server:**
```bash
cd apps/web
npm run dev
```

**Terminal 2 — Start mobile dev server:**
```bash
cd apps/mobile
npx expo start
```

Then scan QR code with Expo Go. The mobile app will proxy API requests to `http://localhost:5173` (the web dev server).

**On a physical device:** Expo automatically creates a tunnel (ngrok) so your phone can reach the localhost API. Ensure your computer and phone are on the same network, or allow tunnel access when prompted.

---

## 🗺️ Monorepo Structure

```
sokogate-construction-materials-calculator/
├── README.md
├── apps/
│   ├── web/                     # React Router + Vite (Node.js edge)
│   │   ├── src/
│   │   │   ├── app/             # Pages + API routes
│   │   │   │   ├── page.jsx               # Calculator dashboard
│   │   │   │   ├── materials/page.tsx     # Materials catalog
│   │   │   │   ├── admin/products/page.jsx  # Admin CRUD
│   │   │   │   └── api/                   # Serverless API
│   │   │   │       ├── products/route.js
│   │   │   │       └── utils/sql.js       # Neon WASM client
│   │   │   └── utils/database.ts          # Supabase (legacy)
│   │   ├── .env
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── mobile/                  # Expo (React Native)
│       ├── src/
│       │   ├── app/
│       │   │   ├── index.jsx              # Calculator (4 tabs)
│       │   │   └── +not-found.tsx         # 404 screen
│       │   └── components/
│       │       ├── KeyboardAvoidingAnimatedView.jsx
│       │       └── MaterialsList.tsx
│       ├── app.json              # Expo configuration
│       └── package.json          # Dependencies only (use npx expo)
│
└── (optional: shared/ for shared types/utils)
```

---

## 🔌 API Reference (Web Backend)

All routes are server handlers using **React Router v7** + **Neon WASM edge-sql**.

### `GET /api/products`
List all products, filtered by category if query param provided.

**Query:** `?category=tiles` (optional)

```json
{
  "products": [
    {
      "id": "uuid",
      "name": "Cement 50kg Bag",
      "category": "cement",
      "unit": "bag",
      "price": 10500.00,
      "description": "Dangote 42.5N Portland Cement",
      "created_at": "2025-04-18T10:00:00.000Z"
    }
  ]
}
```

### `POST /api/products`
Create a new product.

```json
{
  "name": "New Product",
  "category": "tiles",
  "unit": "box",
  "price": 12000.50,
  "description": "Optional description"
}
```

### `GET /api/products/:id`
Fetch single product by UUID.

### `PUT /api/products/:id`
Update product (partial update supported — send only changed fields).

### `DELETE /api/products/:id`
Delete product permanently.

---

## 🧮 Calculator Logic Reference

### Floor Tiles
```
area = length × width
tileArea = (tileLength/100) × (tileWidth/100)
pieces = ceil(area / tileArea × (1 + wastage/100))
boxes = ceil(pieces / piecesPerBox)
adhesiveBags = ceil(area / 4.5)
totalCost = boxes × tileBoxPrice + adhesiveBags × adhesivePrice
```

### Plastering
```
wetVolume = area × thickness/1000
dryVolume = wetVolume × 1.33  (shrinkage factor)
cementVolume = dryVolume / (1 + ratio)  e.g., 1:4 → cementVol = dry/5
sandVolume = cementVolume × ratio
cementBags = ceil(cementVolume / 0.0347)  (50kg ≈ 0.0347m³)
```

### Building Blocks
```
wallArea = length × height − openingArea
blockArea = 0.45 × 0.225 = 0.10125m²  (9-inch)
blocks = ceil((wallArea / blockArea) × (1 + wastage/100))
cementBags = ceil(blocks / 100 × 0.6)  (mortar)
```

### Roofing Sheets
```
baseArea = span × width
roofArea = baseArea × pitchFactor  (mono:1.15, gable:1.15, hip:1.25)
effectiveSheet = (sheetLength−0.15) × (sheetWidth−0.1)
sheets = ceil(roofArea / effectiveSheet × (1 + wastage/100))
screws = ceil(sheets × 12); packs = ceil(screws / 100)
```

---

## 🗄️ Database Schema

### Table: `products`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Unique identifier (auto-generated) |
| `name` | TEXT | Product name (e.g., "Cement 50kg Bag") |
| `category` | TEXT | One of: `tiles`, `cement`, `blocks`, `roofing`, `adhesive`, `sand` |
| `unit` | TEXT | Unit of sale (`bag`, `box`, `piece`, `sheet`, `pack`, `m3`) |
| `price` | DECIMAL(10,2) | Current price in ₦ (Naira) |
| `description` | TEXT | Optional description |
| `created_at` | TIMESTAMP | Record creation time |
| `updated_at` | TIMESTAMP | Last update timestamp |

---

## 🔐 Security & Production Hardening

**⚠️ Current state:** Admin panel is publicly accessible.

**To secure:**
1. Add authentication middleware to `/admin/*` routes
2. Integrate with Sokogate's existing auth system (if applicable)
3. Add CSRF protection to POST/PUT/DELETE endpoints
4. Rate-limit API endpoints to prevent abuse
5. Use `hv` (Happy Verko) or similar for request validation

Example auth guard (server route):

```javascript
// In each /api/* route file
import { createClient } from '@supabase/supabase-js'

export async function GET(request) {
  const supabase = createClient(...)
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  // ... proceed
}
```

---

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-router": "^7.6.0",
    "react-router-dom": "^7.6.0",
    "@neondatabase/serverless": "^0.10.4",
    "@tanstack/react-query": "^5.72.2",
    "tailwindcss": "3",
    "lucide-react": "^0.358.0",
    "zustand": "^5.0.3",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "vite": "^6.3.3",
    "@react-router/dev": "^7.6.0",
    "@tailwindcss/vite": "^4.1.4",
    "typescript": "^5.8.3"
  }
}
```

---

## 🧪 Development Commands

```bash
cd apps/web

# Start dev server (hot reload)
npm run dev

# Type checking
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🚢 Deployment

### Vercel (recommended)
1. Push to GitHub
2. Import project in Vercel
3. Set `DATABASE_URL` in Environment Variables
4. Deploy

### Railway / Render / Netlify
- Any platform that supports Node.js 18+ with edge functions
- Ensure `DATABASE_URL` is set in environment
- Vite build output must be served correctly

### Production Checklist
- [ ] Update `.env` with real Neon connection string
- [ ] Seed database with current market prices
- [ ] Secure admin routes with authentication
- [ ] Enable Vercel Analytics / monitoring
- [ ] Add error tracking (Sentry / LogRocket)
- [ ] Review CORS settings if splitting frontend/backend domains

---

## 🤝 Contributing

Found a bug or have a new calculator idea?
1. Open an issue describing the calculation logic
2. Include source references (manufacturer datasheets, industry standards)
3. Submit a PR with unit tests for the new calculator

---

## 📄 License

Sokogate Internal — All rights reserved.

---

## 📦 Building Mobile App (Production)

### Prerequisites
- Node.js 18+
- Expo account (for EAS builds) - free at https://expo.dev

### Option 1: EAS Build (Recommended)
```bash
cd apps/mobile

# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for Android (creates APK with bundled JS)
eas build -p android --profile preview

# Download the .apk after build completes
```

### Option 2: Local Build (No Expo account needed)
```bash
cd apps/mobile

# Generate native Android project
npx expo prebuild --platform android

# Build debug APK (works without Metro server)
cd android
./gradlew assembleDebug

# APK location: android/app/build/outputs/apk/debug/app-debug.apk
```

### Option 3: Build Release APK
```bash
cd apps/mobile
npx expo prebuild --platform android
cd android
./gradlew assembleRelease

# APK location: android/app/build/outputs/apk/release/
```

### Connect to Production API
Update `EXPO_PUBLIC_API_URL` in app.json or set environment variable to your production web app URL.

---

**Built with care for the Kenyan construction industry.** 🏢🚧