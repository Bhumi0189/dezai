import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider, useCart } from './context/CartContext'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import ToastContainer, { useToast } from './components/Toast'
import Home from './pages/Home'

function AppInner() {
  const [cartOpen, setCartOpen] = useState(false)
  const { reset } = useCart()
  const { toast } = useToast()

  const handleCheckout = () => {
    setCartOpen(false)
    setTimeout(() => {
      reset()
      toast('🎉 Order placed! Thanks for shopping.', 'success')
    }, 300)
  }

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <Home onCartOpen={() => setCartOpen(true)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />
      <ToastContainer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppInner />
      </CartProvider>
    </ThemeProvider>
  )
}
