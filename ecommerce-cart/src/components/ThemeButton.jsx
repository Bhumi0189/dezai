import { useTheme } from '../context/ThemeContext'

export default function ThemeButton() {
  const { theme, toggle } = useTheme()
  return (
    <button onClick={toggle} aria-label="Toggle theme" style={{
      background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px'
    }}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
