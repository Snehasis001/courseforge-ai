'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: '⊞' },
  { label: 'Create Course', href: '/create-course', icon: '✦' },
  { label: 'Explore', href: '/explore', icon: '◎' },
  { label: 'Upgrade', href: '/upgrade', icon: '⚡' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <aside style={{
      position: 'fixed',
      top: 0, left: 0, bottom: 0,
      width: 260,
      background: 'var(--bg2)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 60,
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid var(--border)' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #00e5ff, #0066ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0,
          }}>✦</div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>
              CourseForge <span style={{ color: 'var(--cyan)' }}>AI</span>
            </p>
            <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>Powered by Gemini</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
        <p style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, padding: '8px 12px', marginBottom: 4 }}>
          Navigation
        </p>

        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 14px',
                borderRadius: 10,
                background: isActive ? 'var(--cyan-dim)' : 'transparent',
                border: `1px solid ${isActive ? 'rgba(0,229,255,0.2)' : 'transparent'}`,
                color: isActive ? 'var(--cyan)' : 'var(--text2)',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
                onMouseOver={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text)' } }}
                onMouseOut={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)' } }}
              >
                <span style={{ fontSize: 18, width: 22, textAlign: 'center', lineHeight: 1 }}>{item.icon}</span>
                <span style={{ fontSize: 14, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                {item.label === 'Upgrade' && (
                  <span style={{ marginLeft: 'auto', fontSize: 10, background: 'rgba(255,179,71,0.15)', border: '1px solid rgba(255,179,71,0.3)', color: 'var(--amber)', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>PRO</span>
                )}
              </div>
            </Link>
          )
        })}

        <div style={{ marginTop: 16, padding: '0 12px' }}>
          <div style={{ height: 1, background: 'var(--border)', marginBottom: 16 }} />
          <p style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
            Help
          </p>
        </div>

        {[
          { label: 'Documentation', icon: '📄', href: '#' },
          { label: 'Settings', icon: '⚙', href: '#' },
        ].map(item => (
          <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, color: 'var(--text2)', transition: 'all 0.2s', cursor: 'pointer' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text)' }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)' }}>
              <span style={{ fontSize: 18, width: 22, textAlign: 'center' }}>{item.icon}</span>
              <span style={{ fontSize: 14 }}>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Sign out */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border)' }}>
        <button onClick={handleSignOut} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '11px 14px', borderRadius: 10,
          background: 'none', border: '1px solid var(--border)',
          color: 'var(--text2)', cursor: 'pointer',
          fontSize: 14, fontFamily: 'Outfit',
          transition: 'all 0.2s',
        }}
          onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,80,80,0.3)'; e.currentTarget.style.color = '#ff8080' }}
          onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)' }}>
          <span style={{ fontSize: 16 }}>↩</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
