import { useState, useEffect, useCallback } from 'react'
import styles from './Toast.module.css'

let addToast

export function useToast() {
  return { toast: addToast }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    addToast = (msg, type = 'default') => {
      const id = Date.now()
      setToasts(t => [...t, { id, msg, type }])
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2800)
    }
  }, [])

  return (
    <div className={styles.container}>
      {toasts.map(t => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
          {t.msg}
        </div>
      ))}
    </div>
  )
}
