# 🛒 বাজার দর | BazarDor

<div align="center">

  <h3>🇧🇩 বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর — এক নজরে</h3>

  <p>
    <b>Know the price. Compare the market. Shop smarter.</b>
  </p>

  <p>
    A modern, responsive web application for exploring daily market prices,
    comparing product costs, and understanding price changes across Bangladesh.
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Better_Auth-05893E?style=for-the-badge" alt="Better Auth" />
  </p>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-screens-and-functionality">Functionality</a> •
    <a href="#-technology-stack">Tech Stack</a> •
    <a href="#-getting-started">Installation</a>
  </p>

</div>

---

## 🌿 About the Project

**বাজার দর (BazarDor)** is a Bengali-focused market price information platform designed to make essential commodity prices easier to explore and compare.

From rice and lentils to vegetables, fish, meat, eggs, and spices, the application brings product information and market-wise price comparisons together in one place.

The goal is simple: help users understand current prices, see how prices change, and find useful market information through a clean and accessible interface.

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>📊 Daily Market Prices</h3>
      Explore the latest available prices for essential products.
    </td>
    <td width="50%">
      <h3>📈 Price Change Tracking</h3>
      Identify products with increasing, decreasing, or unchanged prices.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🧺 Product Categories</h3>
      Browse products by category and sort them by price.
    </td>
    <td width="50%">
      <h3>⚖️ Market Comparison</h3>
      Review minimum, maximum, and average prices alongside market-level data.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔐 Authentication</h3>
      Sign in and sign up using Better Auth, with protected product details.
    </td>
    <td width="50%">
      <h3>📱 Responsive Interface</h3>
      Browse through layouts designed for mobile, tablet, and desktop screens.
    </td>
  </tr>
</table>

## 🖥️ Screens and Functionality

| Section            | What it offers                                                            |
| ------------------ | ------------------------------------------------------------------------- |
| 🧭 Navigation      | Brand identity, Bengali date, category links, and authentication controls |
| 📢 Price Ticker    | Scrolling product prices and price-change indicators                      |
| 🌱 Hero Banner     | Project introduction and navigation to the product section                |
| 🔺 Price Increases | A section highlighting products with rising prices                        |
| 🔻 Price Decreases | A section highlighting products with falling prices                       |
| 🛍️ All Products   | Product cards with names, units, prices, and price changes                |
| 🧾 Product Details | Price summary and market-wise price comparison                            |
| 🗂️ Category Pages | Category-specific products, sorting, and empty states                     |
| 👤 Authentication  | Sign-in, sign-up, and protected page access                               |

## 🎨 Design System

BazarDor uses a fresh green palette inspired by everyday markets and produce.

<table>
  <tr>
    <td align="center" width="25%">
      <div style="background-color:#05893E;padding:18px;border-radius:8px;color:white;">Primary</div>
      <code>#05893E</code>
    </td>
    <td align="center" width="25%">
      <div style="background-color:#F0F5F0;padding:18px;border-radius:8px;">Background</div>
      <code>#F0F5F0</code>
    </td>
    <td align="center" width="25%">
      <div style="background-color:#FFFFFF;padding:18px;border:1px solid #ddd;border-radius:8px;">Cards</div>
      <code>#FFFFFF</code>
    </td>
    <td align="center" width="25%">
      <div style="background-color:#DC2626;padding:18px;border-radius:8px;color:white;">Price Up</div>
      <code>#DC2626</code>
    </td>
  </tr>
</table>

**Design principles**

* Clean layouts with readable Bengali typography.
* Consistent spacing and rounded product cards.
* Green indicators for falling prices and red indicators for rising prices.
* Responsive product grids and horizontally scrollable market tables.
* Simple navigation and clear feedback for loading, errors, and empty results.

## ⚙️ Technology Stack

| Technology         | Role                                               |
| ------------------ | -------------------------------------------------- |
| Next.js App Router | Routing, page rendering, and application structure |
| React              | Reusable UI components                             |
| TypeScript         | Type-safe development                              |
| Tailwind CSS       | Responsive styling                                 |
| Better Auth        | Authentication and session management              |
| REST API           | Product, category, and market data                 |
| Vercel             | Deployment option                                  |

## 🔌 API Reference

**Main API**

[`https://openapi.programming-hero.com/api/bazardor`](https://openapi.programming-hero.com/api/bazardor)

| Endpoint                  | Purpose                           |
| ------------------------- | --------------------------------- |
| `/products`               | Retrieve all products             |
| `/products?category=chal` | Filter products by category       |
| `/products/1`             | Retrieve a product by ID          |
| `/categories`             | Retrieve available categories     |
| `/categories/chal`        | Retrieve a category by ID or slug |

### Example API Request

```ts
const API_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

const response = await fetch(API_URL, {
  cache: "no-store",
});

if (!response.ok) {
  throw new Error("Failed to fetch products");
}

const products = await response.json();
```

The API response should be handled according to its actual data structure.

## 🚀 Getting Started

### Prerequisites

* Node.js
* npm
* Git

### 1. Clone the repository

Replace the placeholder with your actual GitHub repository URL.

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Enter the project directory

```bash
cd bazardor
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root and add the variables required by your Better Auth and database configuration.

```env
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
```

> These are example variable names. Use the exact names expected by your project's configuration. Configure any database and Google or GitHub OAuth credentials your implementation requires. Never commit real secrets to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 6. Create a production build

```bash
npm run build
npm run start
```

## 📁 Project Structure

```text
bazardor/
├── public/
│   └── bazar-hero.png
├── src/
│   ├── app/
│   │   ├── category/
│   │   │   └── [id]/
│   │   ├── products/
│   │   │   └── [slug]/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── components/
│   └── lib/
├── .env.local
├── package.json
├── README.md
└── tsconfig.json
```

*This is an illustrative structure. Keep the paths consistent with your actual project.*

## 🌐 Deployment

BazarDor can be deployed on [Vercel](https://vercel.com/) or another platform compatible with your Next.js application.

1. Push the source code to GitHub.
2. Import the repository into your deployment platform.
3. Configure all required environment variables.
4. Deploy the application.
5. Verify authentication, API responses, dynamic routes, and page refreshes on the deployed website.

## 🔗 Project Links

<div align="center">

| Resource             | Link                          |
| -------------------- | ----------------------------- |
| 🌍 Live Website      | Add your deployed website URL |
| 💻 GitHub Repository | Add your repository URL       |

</div>

## 👩‍💻 Author

**Developed as a web development assignment project.**

Built with Next.js, React, TypeScript, Tailwind CSS, and Better Auth.

---

<div align="center">

**🛒 বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**

<sub>Market prices can vary by location, seller, quality, and time.</sub>

</div>
