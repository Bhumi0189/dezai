import { useState } from 'react'
import { useCart } from '../context/CartContext'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, index, onAdd }) {
  const { cart, add, decrement, remove } = useCart()
  const qty = cart[product.id] || 0
  const [adding, setAdding] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleAdd = () => {
    add(product.id)
    setAdding(true)
    setTimeout(() => setAdding(false), 600)
    if (onAdd) onAdd(product)
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 16
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 16
    setTilt({ x, y })
  }
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <div
      className={styles.card}
      style={{
        animationDelay: `${index * 0.07}s`,
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glare overlay */}
      <div className={styles.glare} />

      {/* Shimmer stripe */}
      <div className={styles.shimmer} />

      {/* Image area */}
      <div className={styles.imageWrap}>
        <div className={styles.imageGlow} style={{ background: product.glowColor }} />
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImg}
          style={{ animationDelay: `${index * 0.3}s` }}
          loading="lazy"
        />
        <div className={styles.tag}>{product.category}</div>
        {product.badge && <div className={styles.hotBadge}>{product.badge}</div>}
      </div>

      {/* Body */}
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.desc}>{product.desc}</p>

        <div className={styles.footer}>
          <div>
            <div className={styles.priceLabel}>Price</div>
            <div className={styles.price}>${product.price.toFixed(2)}</div>
          </div>

          {qty === 0 ? (
            <button
              className={`${styles.addBtn} ${adding ? styles.adding : ''}`}
              onClick={handleAdd}
            >
              <span className={styles.addBtnIcon}>+</span>
              Add to Cart
            </button>
          ) : (
            <div className={styles.qtyGroup}>
              <button
                className={styles.qtyBtn}
                onClick={() => decrement(product.id)}
              >−</button>
              <span className={styles.qty}>{qty}</span>
              <button
                className={`${styles.qtyBtn} ${styles.qtyBtnPlus}`}
                onClick={() => add(product.id)}
              >+</button>
            </div>
          )}
        </div>

        {qty > 0 && (
          <button className={styles.removeLink} onClick={() => remove(product.id)}>
            ✕ Remove from cart
          </button>
        )}
      </div>
    </div>
  )
}
