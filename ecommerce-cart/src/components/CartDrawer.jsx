import { useCart } from '../context/CartContext'
import styles from './CartDrawer.module.css'

const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&q=80&auto=format&fit=crop', price: 790.99 },
  { id: 2, name: 'Mechanical Keyboard', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=120&q=80&auto=format&fit=crop', price: 1290.00 },
  { id: 3, name: 'USB-C Hub', image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=120&q=80&auto=format&fit=crop', price: 3990.99 },
  { id: 4, name: 'Webcam 4K', image: 'https://plus.unsplash.com/premium_photo-1710961233810-5350d81d4b20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwY2FtfGVufDB8fDB8fHww', price: 8900.00 },
  { id: 5, name: 'Desk Lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=120&q=80&auto=format&fit=crop', price: 4900.99 },
  { id: 6, name: 'Laptop Stand', image: 'https://images.unsplash.com/photo-1527443060795-0402a18106c2?w=120&q=80&auto=format&fit=crop', price: 3400.99 },
  { id: 7, name: 'Blue Light Glasses', image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=120&q=80&auto=format&fit=crop', price: 2400.99 },
  { id: 8, name: 'Cable Organiser', image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=120&q=80&auto=format&fit=crop', price: 1400.99 },
]

export default function CartDrawer({ open, onClose, onCheckout }) {
  const { cart, add, decrement, remove, reset, count } = useCart()
  const items = PRODUCTS.filter(p => cart[p.id] > 0)
  const total = items.reduce((sum, p) => sum + p.price * cart[p.id], 0)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerIcon}>🛒</span>
            <div>
              <div className={styles.title}>Your Cart</div>
              <div className={styles.subtitle}>
                {count === 0 ? 'Empty' : `${count} item${count !== 1 ? 's' : ''}`}
              </div>
            </div>
          </div>
          <div className={styles.headerActions}>
            {count > 0 && (
              <button className={styles.resetBtn} onClick={reset}>
                Clear all
              </button>
            )}
            <button className={styles.closeBtn} onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🛍️</div>
              <div className={styles.emptyTitle}>Nothing here yet</div>
              <div className={styles.emptyText}>Add some products to get started.</div>
            </div>
          ) : (
            items.map((p, i) => (
              <div
                key={p.id}
                className={styles.item}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className={styles.itemEmoji}>
                  <img src={p.image} alt={p.name} className={styles.itemImg} />
                </div>
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{p.name}</div>
                  <div className={styles.itemUnit}>${p.price.toFixed(2)} each</div>
                </div>
                <div className={styles.itemRight}>
                  <div className={styles.qtyGroup}>
                    <button className={styles.qtyBtn} onClick={() => decrement(p.id)}>−</button>
                    <span className={styles.qtyNum}>{cart[p.id]}</span>
                    <button className={`${styles.qtyBtn} ${styles.qtyPlus}`} onClick={() => add(p.id)}>+</button>
                  </div>
                  <div className={styles.itemTotal}>
                    {(p.price * cart[p.id]).toFixed(2)}
                  </div>
                  <button className={styles.removeBtn} onClick={() => remove(p.id)}>✕</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>{total.toFixed(2)}</span>
            </div>
            <div className={styles.savingsRow}>
              <span>🎉 Free shipping on orders over 100</span>
            </div>
            <button className={styles.checkoutBtn} onClick={onCheckout}>
              <span>Checkout</span>
              <span className={styles.checkoutArrow}>→</span>
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
