import React, { useState } from 'react'
import { useWeather } from './useWeather'
import { getWeather, getWindDir, DAYS } from './weatherUtils'
import Skeleton from './Skeleton'

// ── City list ──────────────────────────────────────────────
const CITIES = [
  { name: 'New Delhi',  country: 'IN', lat: 28.61, lon: 77.20 },
  { name: 'Mumbai',     country: 'IN', lat: 19.07, lon: 72.87 },
  { name: 'Bengaluru',  country: 'IN', lat: 12.97, lon: 77.59 },
  { name: 'London',     country: 'GB', lat: 51.51, lon: -0.13 },
  { name: 'New York',   country: 'US', lat: 40.71, lon: -74.00 },
  { name: 'Tokyo',      country: 'JP', lat: 35.68, lon: 139.69 },
  { name: 'Dubai',      country: 'AE', lat: 25.20, lon: 55.27 },
  { name: 'Sydney',     country: 'AU', lat: -33.86, lon: 151.21 },
]

// ── Metric Card ────────────────────────────────────────────
function MetricCard({ icon, label, value, unit, color = 'var(--accent)' }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      <div style={{ fontSize: '22px' }}>{icon}</div>
      <div style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: '22px', fontWeight: 600, color }}>
        {value}<span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--muted)', marginLeft: '3px' }}>{unit}</span>
      </div>
    </div>
  )
}

// ── Forecast Card ──────────────────────────────────────────
function ForecastCard({ date, code, max, min, precip, isToday }) {
  const d = new Date(date)
  const { emoji } = getWeather(code)
  return (
    <div style={{
      flex: '1 0 0',
      background: isToday ? 'var(--accent-soft)' : 'var(--surface2)',
      border: `1px solid ${isToday ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius: '14px',
      padding: '0.9rem 0.6rem',
      textAlign: 'center',
      transition: 'transform 0.15s',
      cursor: 'default',
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ fontSize: '11px', color: isToday ? 'var(--accent)' : 'var(--muted)', marginBottom: '6px', fontWeight: 500 }}>
        {isToday ? 'Today' : DAYS[d.getDay()]}
      </div>
      <div style={{ fontSize: '24px', marginBottom: '6px' }}>{emoji}</div>
      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{Math.round(max)}°</div>
      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{Math.round(min)}°</div>
      {precip > 0 && (
        <div style={{ fontSize: '10px', color: '#60a5fa', marginTop: '4px' }}>💧{precip}mm</div>
      )}
    </div>
  )
}

// ── Main App ───────────────────────────────────────────────
export default function App() {
  const [city, setCity] = useState(null)
  const { data, loading, error } = useWeather(city)

  const current = data?.current
  const daily   = data?.daily
  const { emoji, label } = current ? getWeather(current.weathercode) : {}

  // Sunrise/sunset formatting
  const fmt = t => t ? new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '6px' }}>
            🌤️ Live Weather Dashboard
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
            Real-time data from Open-Meteo API · Powered by <code style={{ color: 'var(--accent)', fontSize: '13px' }}>useEffect</code> + <code style={{ color: 'var(--accent)', fontSize: '13px' }}>fetch</code>
          </p>
        </div>

        {/* City Selector */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem'
        }}>
          {CITIES.map(c => (
            <button
              key={c.name}
              onClick={() => setCity(c)}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                border: `1px solid ${city?.name === c.name ? 'var(--accent)' : 'var(--border)'}`,
                background: city?.name === c.name ? 'var(--accent-soft)' : 'var(--surface)',
                color: city?.name === c.name ? 'var(--accent)' : 'var(--muted)',
                fontSize: '13px',
                fontWeight: city?.name === c.name ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => { if(city?.name !== c.name) { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.color = 'var(--text)' }}}
              onMouseLeave={e => { if(city?.name !== c.name) { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--muted)' }}}
            >
              {c.name} <span style={{ opacity: 0.5 }}>{c.country}</span>
            </button>
          ))}
        </div>

        {/* Empty state */}
        {!city && (
          <div style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            background: 'var(--surface)',
            borderRadius: '20px',
            border: '1px dashed var(--border)',
          }}>
            <div style={{ fontSize: '56px', marginBottom: '1rem' }}>🌍</div>
            <div style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>Pick a city to get started</div>
            <div style={{ color: 'var(--muted)', fontSize: '14px' }}>Select any city above to fetch live weather data</div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && <Skeleton />}

        {/* Error state */}
        {error && (
          <div style={{
            background: 'rgba(248,113,113,0.1)',
            border: '1px solid rgba(248,113,113,0.3)',
            borderRadius: '16px',
            padding: '1.5rem',
            color: 'var(--danger)',
          }}>
            <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '6px' }}>Fetch failed</div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>{error}</div>
            <button
              onClick={() => setCity({ ...city })}
              style={{
                marginTop: '1rem', padding: '8px 18px', borderRadius: '8px',
                border: '1px solid var(--danger)', background: 'transparent',
                color: 'var(--danger)', cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Weather data */}
        {data && current && !loading && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>

            {/* Hero card */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '14px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                fontSize: '140px', opacity: 0.06, userSelect: 'none',
                pointerEvents: 'none',
              }}>{emoji}</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.5px' }}>
                    {city.name}
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })} · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div style={{ fontSize: '64px', lineHeight: 1 }}>{emoji}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '72px', fontWeight: 700, lineHeight: 1, letterSpacing: '-2px' }}>
                  {Math.round(current.temperature_2m)}°C
                </div>
                <div>
                  <div style={{ fontSize: '20px', color: 'var(--muted)', marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '14px', color: 'var(--muted)' }}>
                    Feels like {Math.round(current.apparent_temperature)}°C
                  </div>
                </div>
              </div>

              {/* Sunrise / Sunset inline */}
              {daily && (
                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '20px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    🌅 {fmt(daily.sunrise?.[0])}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    🌇 {fmt(daily.sunset?.[0])}
                  </span>
                </div>
              )}
            </div>

            {/* Metric grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '12px',
              marginBottom: '14px',
            }}>
              <MetricCard icon="💧" label="Humidity"       value={current.relativehumidity_2m} unit="%" />
              <MetricCard icon="💨" label="Wind"
                value={`${Math.round(current.windspeed_10m)} ${getWindDir(current.winddirection_10m)}`}
                unit="km/h"
              />
              <MetricCard icon="🌧️" label="Precipitation"  value={current.precipitation}       unit="mm" color="var(--success)" />
              <MetricCard icon="☀️" label="UV Index"       value={Math.round(current.uv_index ?? 0)} unit=""  color="var(--warning)" />
              <MetricCard icon="👁️" label="Visibility"     value={current.visibility != null ? Math.round(current.visibility / 1000) : '—'} unit="km" />
            </div>

            {/* 7-Day Forecast */}
            {daily && (
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                padding: '1.5rem',
              }}>
                <div style={{ fontSize: '12px', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 500 }}>
                  7-day forecast
                </div>
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {daily.time.map((date, i) => (
                    <ForecastCard
                      key={date}
                      date={date}
                      code={daily.weathercode[i]}
                      max={daily.temperature_2m_max[i]}
                      min={daily.temperature_2m_min[i]}
                      precip={daily.precipitation_sum[i]}
                      isToday={i === 0}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--muted)', fontSize: '12px' }}>
              Data from{' '}
              <a href="https://open-meteo.com" target="_blank" rel="noreferrer"
                style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                Open-Meteo
              </a>
              {' '}· No API key required · Last updated {new Date().toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
