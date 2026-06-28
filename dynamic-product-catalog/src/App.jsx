import { useState, useMemo } from "react";
import { products } from "./products";
import "./App.css";

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? "star filled" : "star"}>★</span>
      ))}
      <span className="rating-number">{rating}</span>
    </div>
  );
}

function ProductCard({ product }) {
  const catKey = product.category.toLowerCase();
  return (
    <div className="product-card">
      {product.badge && (
        <span className={`badge badge-${product.badge.toLowerCase()}`}>{product.badge}</span>
      )}
      <div className="product-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
          onError={(e) => { e.target.style.opacity = "0.3"; }}
        />
      </div>
      <div className="product-info">
        <span className={`product-category cat-${catKey}`}>{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <StarRating rating={product.rating} />
        <div className="card-divider" />
        <div className="product-footer">
          <span className="product-price">₹{product.price.toLocaleString("en-IN")}</span>
          <button className="add-btn">+ Add</button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ query }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">🔍</span>
      <h2>No products found</h2>
      <p>Nothing matched <strong>"{query}"</strong>. Try a different keyword.</p>
      <p className="empty-hint">Try: headphones, desk, keyboard, backpack…</p>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-mark">◈</div>
            <span className="brand-name">Prod<span>ukto</span></span>
          </div>
          <p className="header-tagline">Curated essentials for modern workspaces</p>
        </div>
      </header>

      <div className="hero">
        <h1 className="hero-title">Shop Smarter,<br />Work Better</h1>
        <p className="hero-sub">Discover {products.length} handpicked workspace products</p>
        <div className="hero-pills">
          <span className="hero-pill">🎧 Electronics</span>
          <span className="hero-pill">🪑 Furniture</span>
          <span className="hero-pill">🎒 Accessories</span>
        </div>
      </div>

      <main className="main">
        <div className="controls">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="clear-btn" onClick={() => setQuery("")}>✕</button>
            )}
          </div>
          <div>
            <p className="tabs-label">Category</p>
            <div className="category-tabs" style={{ marginTop: "0.5rem" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-tab ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length > 0 && (
          <div className="results-meta">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</div>
        )}

        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState query={query} />
        )}
      </main>
    </div>
  );
}