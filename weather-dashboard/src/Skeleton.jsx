import React from 'react'

const shimmerStyle = {
  background: 'linear-gradient(90deg, #1a1d27 25%, #252942 50%, #1a1d27 75%)',
  backgroundSize: '400px 100%',
  animation: 'shimmer 1.4s infinite linear',
  borderRadius: '8px',
}

function Bone({ width, height, style = {} }) {
  return <div style={{ width, height, ...shimmerStyle, ...style }} />
}

export default function Skeleton() {
  return (
    <div style={{ animation: 'fadeUp 0.3s ease' }}>
      {/* Hero */}
      <div style={{
        background: 'var(--surface)',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '16px',
        border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <Bone width="160px" height="32px" style={{ marginBottom: '10px' }} />
            <Bone width="100px" height="16px" />
          </div>
          <Bone width="70px" height="70px" style={{ borderRadius: '16px' }} />
        </div>
        <Bone width="120px" height="64px" style={{ marginBottom: '8px' }} />
        <Bone width="140px" height="20px" />
      </div>

      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{
            background: 'var(--surface)',
            borderRadius: '16px',
            padding: '1.25rem',
            border: '1px solid var(--border)',
          }}>
            <Bone width="60%" height="13px" style={{ marginBottom: '10px' }} />
            <Bone width="80%" height="28px" />
          </div>
        ))}
      </div>

      {/* Forecast */}
      <div style={{
        background: 'var(--surface)',
        borderRadius: '20px',
        padding: '1.5rem',
        border: '1px solid var(--border)',
      }}>
        <Bone width="120px" height="16px" style={{ marginBottom: '1rem' }} />
        <div style={{ display: 'flex', gap: '10px' }}>
          {[1,2,3,4,5,6,7].map(i => (
            <div key={i} style={{ flex: 1 }}>
              <Bone width="100%" height="90px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
