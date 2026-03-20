'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: '⊞' },
  { label: 'Create Course', href: '/create-course', icon: '✦' },
  { label: 'Explore', href: '/explore', icon: '◎' },
  { label: 'Upgrade', href: '/upgrade', icon: '⚡', badge: 'PRO' },
]

const BOTTOM_ITEMS = [
  { label: 'Documentation', href: '/docs', icon: '📄' },
  { label: 'Settings', href: '/settings', icon: '⚙' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { signOut } = useClerk()
  const router = useRouter()

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/')

  const NavBtn = ({ item }) => {
    const active = isActive(item.href)
    return (
      <Link href={item.href} style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, background: active ? 'var(--cyan-dim)' : 'transparent', border: `1px solid ${active ? 'rgba(0,229,255,0.2)' : 'transparent'}`, color: active ? 'var(--cyan)' : 'var(--text2)', transition: 'all 0.2s', cursor: 'pointer' }}
          onMouseOver={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text)' } }}
          onMouseOut={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)' } }}>
          <span style={{ fontSize: 17, width: 22, textAlign: 'center', lineHeight: 1 }}>{item.icon}</span>
          <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, flex: 1 }}>{item.label}</span>
          {item.badge && <span style={{ fontSize: 10, background: 'rgba(255,179,71,0.15)', border: '1px solid rgba(255,179,71,0.3)', color: 'var(--amber)', padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>{item.badge}</span>}
        </div>
      </Link>
    )
  }

  return (
    <aside style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: 260, background: 'var(--bg2)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', zIndex: 60 }}>
      {/* Logo */}
      <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid var(--border)' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #00e5ff, #0066ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>✦</div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>CourseForge <span style={{ color: 'var(--cyan)' }}>AI</span></p>
            <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>Powered by Gemini</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 3, overflowY: 'auto' }}>
        <p style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, padding: '6px 12px', marginBottom: 2 }}>Navigation</p>
        {NAV_ITEMS.map(item => <NavBtn key={item.href} item={item} />)}

        <div style={{ margin: '14px 0 10px', height: 1, background: 'var(--border)' }} />
        <p style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700, padding: '0 12px', marginBottom: 2 }}>Help</p>
        {BOTTOM_ITEMS.map(item => <NavBtn key={item.href} item={item} />)}
      </nav>

      {/* Sign out */}
      <div style={{ padding: '14px 10px', borderTop: '1px solid var(--border)' }}>
        <button onClick={async () => { await signOut(); router.push('/') }}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, background: 'none', border: '1px solid var(--border)', color: 'var(--text2)', cursor: 'pointer', fontSize: 14, fontFamily: 'Outfit', transition: 'all 0.2s' }}
          onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,80,80,0.3)'; e.currentTarget.style.color = '#ff8080' }}
          onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)' }}>
          <span style={{ fontSize: 16 }}>↩</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
