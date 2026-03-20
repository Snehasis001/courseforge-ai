import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
    }}>
      {/* Orb background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)', animation: 'orb1 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(182,109,255,0.06) 0%, transparent 70%)', animation: 'orb2 22s ease-in-out infinite' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #00e5ff, #0066ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✦</div>
            <span style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 700, color: '#f0f4f8' }}>CourseForge <span style={{ color: '#00e5ff' }}>AI</span></span>
          </div>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>Sign in to continue generating courses</p>
        </div>
        <SignIn />
      </div>
    </div>
  )
}
