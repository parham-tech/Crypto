# Crypto Tracker Dashboard

A modern cryptocurrency dashboard built with **Next.js, React, TypeScript, and Tailwind CSS**.

The application provides live cryptocurrency market data, interactive price charts, search functionality, theme customization, and optimized data fetching using Next.js Route Handlers and server-side caching.

## 🌐 Live Demo

https://crypto-project-for-portfolio.vercel.app/

## 📌 Repository

https://github.com/parham-tech/Crypto.git

---

## ✨ Features

### 📈 Live Cryptocurrency Data

* Real-time cryptocurrency market information
* Bitcoin, Ethereum, and other major cryptocurrencies
* Market data powered by CoinGecko API v3
* Optimized API requests through internal Next.js routes

---

### 📊 Interactive Price Charts

The dashboard includes interactive historical price charts with multiple time ranges:

* 1 Day
* 7 Days
* 1 Month
* 3 Months
* 1 Year
* Maximum range

Features:

* Responsive charts
* Dynamic data updates
* Smooth visual transitions
* Optimized chart rendering

---

### 🔎 Search & Filtering

Users can:

* Search cryptocurrencies
* Filter available coins
* Quickly find market information

Filtering logic is optimized using React performance hooks.

---

### 🌙 Dark / Light Mode

A persistent theme system includes:

* Dark mode
* Light mode
* Smooth theme transitions
* Local storage persistence

---

### ⚡ Optimized Data Fetching

The project uses a hybrid data-fetching approach:

* Client-side custom hooks
* Next.js Route Handlers
* Server-side API caching
* Request cancellation with AbortController

API responses are optimized using Next.js revalidation strategies.

---

## 🛠 Tech Stack

### Core

* **Next.js 14.2.3** (App Router)
* **React 18.2.0**
* **TypeScript 5.4**
* **Tailwind CSS 3.4.1**

### UI & Animation

* **Framer Motion 12.23.24**
* **Lucide React**
* Custom CSS variables and animations

### Charts

* **Recharts 3.3.0**

### API

* CoinGecko API v3
* Next.js Route Handlers

---

## 📂 Project Architecture

The project follows a feature-based architecture:

```text
src/
├── app/
│   ├── page.tsx              # Main dashboard
│   ├── layout.tsx            # Application layout & metadata
│   └── api/
│       ├── coins/            # Market data endpoint
│       └── coin/[id]/        # Historical chart endpoint
│
├── features/
│   └── crypto/
│       ├── components/       # Crypto UI components
│       ├── hooks/            # Data fetching hooks
│       ├── context/          # Crypto state management
│       └── types/            # TypeScript definitions
│
├── context/
│   └── ThemeContext
│
├── lib/
│   └── Utilities and fetch helpers
│
└── styles/
    └── Global styling
```

---

## 🔌 API Integration

### CoinGecko API

The application uses CoinGecko API v3 for:

* Cryptocurrency market data
* Historical price charts

Internal API routes:

```
/api/coins
```

Fetches current cryptocurrency market information.

```
/api/coin/[id]
```

Fetches historical price data for charts.

---

## 🧠 State Management

The project uses:

### React Context API

For global state:

* Theme management
* Selected cryptocurrency state

### Local State

Using React hooks for:

* Search input
* Loading states
* UI interactions

### Custom Hooks

Examples:

* `useCryptoData`
* `useCoinHistory`

These hooks handle data fetching and state synchronization.

---

## 📊 Chart Implementation

Charts are built with **Recharts**.

Implemented features:

* Responsive containers
* Area charts
* Gradient visualization
* Dynamic historical data rendering
* Multiple time ranges

---

## ⚡ Performance Optimizations

Performance considerations include:

* Next.js server-side revalidation
* Cached API responses
* `useMemo` for expensive calculations
* AbortController for cancelling outdated requests
* Optimized rendering patterns
* Responsive chart rendering

Caching strategies:

* Market data revalidation
* Historical chart data caching

---

## ♿ Accessibility

Accessibility improvements include:

* Semantic HTML structure
* Accessible buttons and inputs
* ARIA labels for interactive controls
* Theme toggle accessibility support
* Hydration handling for theme initialization

---

## 🔍 SEO

The project includes:

* Next.js Metadata API
* Open Graph metadata
* Twitter Cards
* Canonical URL configuration
* Robots configuration
* JSON-LD structured data (`WebApplication` schema)

---

## 📱 Responsive Design

The dashboard adapts across devices:

* Mobile layouts
* Desktop grid layouts
* Responsive charts
* Flexible search components

Implemented using:

* Tailwind responsive utilities
* Recharts `ResponsiveContainer`

---

## 🚀 Getting Started

### Installation

Clone the repository:

```bash
git clone https://github.com/parham-tech/Crypto.git

cd Crypto
```

Install dependencies:

```bash
pnpm install
```

---

### Development

Run the development server:

```bash
pnpm dev
```

Open:

```
http://localhost:3000
```

---

### Production Build

Create a production build:

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

---

## 🎯 Project Goals

This project demonstrates practical frontend development skills including:

* Next.js App Router
* TypeScript development
* API integration
* Data visualization
* Server-side caching
* Component architecture
* Responsive dashboard design
* Performance optimization

---

## 📄 License

This project is licensed under the MIT License.
