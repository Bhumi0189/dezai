import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import styles from './Navbar.module.css'

export default function Navbar({ onCartClick }) {
  const { count } = useCart()
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const prevCount = useRef(count)
  const [badgeKey, setBadgeKey] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (count !== prevCount.current) {
      setBadgeKey(k => k + 1)
      prevCount.current = count
    }
  }, [count])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.brand}>
        <span className={styles.brandIcon}>◈</span>
        Shop<span className={styles.brandAccent}>Verse</span>
      </div>

      <div className={styles.tagline}>
        <span className={styles.dot} />
        Premium Shopping Platfrom
      </div>

      <div className={styles.right}>
        <button className={styles.themeBtn} onClick={toggle} aria-label="Toggle theme">
          <span className={styles.themeBtnInner}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </span>
        </button>

        <button className={styles.cartBtn} onClick={onCartClick}>
          <span className={styles.cartIcon}>🛒</span>
          <span className={styles.cartLabel}>Cart</span>
          {count > 0 && (
            <span className={styles.badge} key={badgeKey}>
              {count}
              <span className={styles.badgePulse} />
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}
