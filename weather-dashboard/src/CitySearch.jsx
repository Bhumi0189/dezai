import React, { useState, useEffect, useRef } from 'react'

// Uses Open-Meteo's free geocoding API — no API key required
export default function CitySearch({ onSelect }) {
  const [query, setQuery]         = useState('')
  const [results, setResults]     = useState([])
  const [loading, setLoading]     = useState(false)
  const [open, setOpen]           = useState(false)
  const [highlighted, setHighlighted] = useState(-1)
  const inputRef  = useRef(null)
  const dropRef   = useRef(null)

  // ── Debounced search using useEffect ──────────────────────
  // useEffect watches `query`. After 400ms of no typing it fires
  // the geocoding fetch. The cleanup cancels any in-flight request.
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setOpen(false)
      return
    }

    setLoading(true)
    const controller = new AbortController()

    const timer = setTimeout(() => {
      fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`,
        { signal: controller.signal }
      )
        .then(r => r.json())
        .then(data => {
          const list = (data.results || []).map(r => ({
            name:    r.name,
            country: r.country_code,
            region:  r.admin1 || '',
            lat:     r.latitude,
            lon:     r.longitude,
          }))
          setResults(list)
          setOpen(list.length > 0)
          setHighlighted(-1)
          setLoading(false)
        })
        .catch(err => {
          if (err.name !== 'AbortError') setLoading(false)
        })
    }, 400)  // 400ms debounce

    // Cleanup: cancel fetch + clear timer if query changes before 400ms
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (!dropRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(city) {
    onSelect(city)
    setQuery(city.name)
    setOpen(false)
    setResults([])
    inputRef.current?.blur()
  }

  function handleKeyDown(e) {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted(h => Math.min(h + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted(h => Math.max(h - 1, 0))
    } else if (e.key === 'Enter' && highlighted >= 0) {
      handleSelect(results[highlighted])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={dropRef} style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
      {/* Search input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '0 14px',
        gap: '10px',
        transition: 'border-color 0.15s',
      }}
      onFocus={() => results.length > 0 && setOpen(true)}
      >
        <span style={{ fontSize: '16px', color: 'var(--muted)', flexShrink: 0 }}>🔍</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search any city…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text)',
            fontSize: '14px',
            padding: '12px 0',
            fontFamily: 'inherit',
          }}
        />
        {loading && (
          <div style={{
            width: '14px', height: '14px',
            border: '2px solid var(--border)',
            borderTopColor: 'var(--accent)',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
            flexShrink: 0,
          }} />
        )}
        {query && !loading && (
          <button
            onClick={() => { setQuery(''); setResults([]); setOpen(false); inputRef.current?.focus() }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--muted)', fontSize: '16px', padding: '0', lineHeight: 1,
              flexShrink: 0,
            }}
            aria-label="Clear search"
          >✕</button>
        )}
      </div>

      {/* Dropdown results */}
      {open && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0, right: 0,
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          overflow: 'hidden',
          zIndex: 100,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          {results.map((city, i) => (
            <div
              key={`${city.name}-${city.lat}`}
              onClick={() => handleSelect(city)}
              onMouseEnter={() => setHighlighted(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                cursor: 'pointer',
                background: highlighted === i ? 'var(--accent-soft)' : 'transparent',
                borderBottom: i < results.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'background 0.1s',
              }}
            >
              <span style={{ fontSize: '20px' }}>📍</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '14px', fontWeight: 500,
                  color: highlighted === i ? 'var(--accent)' : 'var(--text)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {city.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  {[city.region, city.country].filter(Boolean).join(', ')}
                </div>
              </div>
              <span style={{
                fontSize: '11px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '2px 7px',
                color: 'var(--muted)',
                flexShrink: 0,
              }}>
                {city.country}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
