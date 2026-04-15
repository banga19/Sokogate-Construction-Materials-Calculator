# Sokogate-Construction-Materials-Calculator
# Sokogate Construction Materials Calculator

A polished, full-stack construction materials estimator built for Sokogate. Helps contractors and construction professionals quickly calculate material quantities and costs for common building projects.

## Features

- **4 Built-in Calculators**: Floor Tiles, Cement (Plastering), Building Blocks, and Roofing Sheets
- **Live Price Integration**: Real-time cost estimation pulled from a PostgreSQL product database
- **Smart Calculations**: Automatic wastage factors, mix ratios, and opening deductions (doors/windows)
- **Cross-Platform**: Responsive web interface (React) + native mobile app (Expo/React Native)
- **Admin Dashboard**: Manage product prices and material catalog at `/admin/products`
- **Practical Outputs**: Results rounded to ordering units (bags, boxes, pieces, sheets)

## Tech Stack

- **Frontend**: React (Web) + Expo (Mobile)
- **Backend**: Node.js serverless API routes
- **Database**: PostgreSQL with pre-seeded material prices
- **Styling**: Tailwind CSS

## Getting Started

1. Clone and install dependencies
2. Set `DATABASE_URL` environment variable
3. Run the development server
4. Access the calculator at `/` and admin panel at `/admin/products`

## Use Cases

- Estimate floor tile requirements for renovation projects
- Calculate cement and sand needed for wall plastering
- Determine block quantities with door/window deductions
- Plan roofing material procurement with different roof types

---

Feel free to customize this based on your specific GitHub organization style!
