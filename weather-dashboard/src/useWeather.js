import { useState, useEffect } from 'react'

// Custom hook — encapsulates all API logic using useEffect
export function useWeather(city) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  useEffect(() => {
    // Guard: don't fetch if no city selected yet
    if (!city) return

    // Reset state before each new fetch
    setLoading(true)
    setError(null)
    setData(null)

    // Build the Open-Meteo API URL
    // Free API — no key required
    const url = new URL('https://api.open-meteo.com/v1/forecast')
    url.searchParams.set('latitude',  city.lat)
    url.searchParams.set('longitude', city.lon)
    url.searchParams.set('timezone',  'auto')
    url.searchParams.set('forecast_days', '7')
    url.searchParams.set('current', [
      'temperature_2m',
      'apparent_temperature',
      'weathercode',
      'windspeed_10m',
      'winddirection_10m',
      'relativehumidity_2m',
      'precipitation',
      'uv_index',
      'visibility',
    ].join(','))
    url.searchParams.set('daily', [
      'weathercode',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'sunrise',
      'sunset',
    ].join(','))

    // AbortController lets us cancel the request if city changes
    // before the response arrives — prevents stale data bugs
    const controller = new AbortController()

    fetch(url.toString(), { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`API error: ${res.status}`)
        return res.json()
      })
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return  // ignore cancelled requests
        setError(err.message)
        setLoading(false)
      })

    // Cleanup function: cancel the fetch if city changes mid-flight
    return () => controller.abort()

  }, [city]) // Re-run whenever `city` object changes

  return { data, loading, error }
}
