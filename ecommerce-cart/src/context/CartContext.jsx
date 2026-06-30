import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sv-cart')) || {} } catch { return {} }
  })

  useEffect(() => {
    localStorage.setItem('sv-cart', JSON.stringify(cart))
  }, [cart])

  const add = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }))
  const decrement = (id) => setCart(c => {
    if ((c[id] || 0) <= 1) { const n = { ...c }; delete n[id]; return n }
    return { ...c, [id]: c[id] - 1 }
  })
  const remove = (id) => setCart(c => { const n = { ...c }; delete n[id]; return n })
  const reset = () => setCart({})

  const count = Object.values(cart).reduce((a, b) => a + b, 0)

  return (
    <CartContext.Provider value={{ cart, add, decrement, remove, reset, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
