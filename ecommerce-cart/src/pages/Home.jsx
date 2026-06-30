import { useRef } from 'react'
import ProductCard from '../components/ProductCard'
import { useToast } from '../components/Toast'
import styles from './Home.module.css'

const PRODUCTS = [
  {
    id: 1, name: 'Wireless Headphones', category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80&auto=format&fit=crop',
    price: 790.99, badge: 'Hot',
    glowColor: 'linear-gradient(135deg, #6c47ff, #00c2ff)',
    desc: 'Crystal-clear sound, 30-hr battery, active noise cancellation.'
  },
  {
    id: 2, name: 'Mechanical Keyboard', category: 'Peripherals',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&q=80&auto=format&fit=crop',
    price: 1290.00,
    glowColor: 'linear-gradient(135deg, #ff4d8d, #ff6b35)',
    desc: 'Tactile clicky switches, RGB backlight, aluminium top plate.'
  },
  {
    id: 3, name: 'USB-C Hub 7-in-1', category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&q=80&auto=format&fit=crop',
    price: 3990.99,
    glowColor: 'linear-gradient(135deg, #00c2ff, #6c47ff)',
    desc: 'HDMI 4K, 3× USB-A, SD, MicroSD, 100W PD passthrough.'
  },
  {
    id: 4, name: 'Webcam 4K', category: 'Video',
    image: 'https://plus.unsplash.com/premium_photo-1710961233810-5350d81d4b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwY2FtfGVufDB8fDB8fHww',
    price: 8900.00, badge: 'New',
    glowColor: 'linear-gradient(135deg, #ff4d8d, #6c47ff)',
    desc: 'Ultra-sharp 4K/30fps, built-in dual mic, auto-framing AI.'
  },
  {
    id: 5, name: 'Smart Desk Lamp', category: 'Lighting',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80&auto=format&fit=crop',
    price: 4900.99,
    glowColor: 'linear-gradient(135deg, #ffcc00, #ff6b35)',
    desc: 'Adjustable colour temp 2700–6500K, 10-level dimming, USB port.'
  },
  {
    id: 6, name: 'Laptop Stand Pro', category: 'Ergonomics',
    image: 'https://images.unsplash.com/photo-1527443060795-0402a18106c2?w=600&q=80&auto=format&fit=crop',
    price: 3400.99,
    glowColor: 'linear-gradient(135deg, #6c47ff, #00c2ff)',
    desc: 'Folding aluminium, adjustable angle, integrated cable management.'
  },
  {
    id: 7, name: 'Blue Light Glasses', category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&q=80&auto=format&fit=crop',
    price: 2400.99,
    glowColor: 'linear-gradient(135deg, #00c2ff, #ff4d8d)',
    desc: 'Reduces eye strain. Anti-glare lens. Lightweight titanium frame.'
  },
  {
    id: 8, name: 'Cable Organiser Kit', category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=600&q=80&auto=format&fit=crop',
    price: 1400.99,
    glowColor: 'linear-gradient(135deg, #ff6b35, #ffcc00)',
    desc: 'Velcro ties, silicone clips, cable labels. Clutter-free desk.'
  },
]

export default function Home({ onCartOpen }) {
  const { toast } = useToast()

  const handleAdd = (product) => {
    toast(`✓ ${product.name} added to cart`, 'success')
  }

  return (
    <div className={styles.page}>
      {/* Particles */}
      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${(i * 37 + 5) % 100}%`,
            animationDuration: `${4 + (i * 0.7)}s`,
            animationDelay: `${i * 0.4}s`,
            width: `${3 + (i % 4)}px`,
            height: `${3 + (i % 4)}px`,
          }} />
        ))}
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroEyebrow}>
            <span className={styles.eyebrowDot} />
            Shop Online
          </div>
          <h1 className={styles.heroTitle}>
            Your dream<br />
            <span className={styles.heroGradient}>setup awaits.</span>
          </h1>
          <p className={styles.heroSub}>
            Premium peripherals and accessories, picked for the discerning developer.
            Cart persists. Theme persists. You focus on shipping.
          </p>
          <div className={styles.heroStats}>
            {[['8', 'Products'], ['Free', 'Shipping $100+'], ['100%', 'Persistent']].map(([n, l]) => (
              <div key={l} className={styles.stat}>
                <span className={styles.statNum}>{n}</span>
                <span className={styles.statLabel}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.scene}>
            <div className={styles.orbitRing} />
            <div className={styles.orbitRingTwo} />

            <div className={styles.heroCardMain}>
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80&auto=format&fit=crop"
                alt="Headphones"
                className={styles.heroCardImg}
              />
              <div className={styles.heroCardShine} />
            </div>

            <div className={styles.heroCardFloat1}>
              <img
                src="https://images.unsplash.com/photo-1595225476474-87563907a212?w=300&q=80&auto=format&fit=crop"
                alt="Keyboard"
              />
            </div>

            <div className={styles.heroCardFloat2}>
              <img
                src="https://plus.unsplash.com/premium_photo-1710961233810-5350d81d4b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwY2FtfGVufDB8fDB8fHww"
                alt="Webcam"
              />
            </div>

            <div className={styles.heroBadgeFloat}>
              <span className={styles.heroBadgeIcon}>✓</span>
              In stock
            </div>

            <div className={styles.heroPriceFloat}>
              <span className={styles.heroPriceLabel}>From</span>
              <span className={styles.heroPriceNum}>14.99</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>All Products</h2>
          <div className={styles.sectionCount}>{PRODUCTS.length} items</div>
        </div>
        <div className={styles.grid}>
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onAdd={handleAdd} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerBrand}>◈ ShopVerse</div>
        <div className={styles.footerText}>
          Built with React Context API · localStorage persistence · 3D UI
        </div>
        <div className={styles.footerLinks}>
          <span>useContext</span>
          <span>•</span>
          <span>createContext</span>
          <span>•</span>
          <span>useState</span>
          <span>•</span>
          <span>useEffect</span>
        </div>
      </footer>
    </div>
  )
}
