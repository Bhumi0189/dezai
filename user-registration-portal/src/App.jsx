import { useState } from 'react'
import RegisterForm from './components/RegisterForm'
import SignInForm from './components/SignInForm'
import Toast from './components/Toast'

export default function App() {
  const [page, setPage] = useState('register') // 'register' | 'signin'
  const [toast, setToast] = useState(null)     // { message, type }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  return (
    <>
      {page === 'register' ? (
        <RegisterForm
          onSwitch={() => setPage('signin')}
          onSuccess={() => showToast('🎉 Account created! Please sign in.', 'success')}
          switchToSignIn={() => setPage('signin')}
        />
      ) : (
        <SignInForm
          onSwitch={() => setPage('register')}
          onSuccess={(name) => showToast(`✅ Login successful! Welcome back, ${name}.`, 'success')}
          onError={(msg) => showToast(msg, 'error')}
        />
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
