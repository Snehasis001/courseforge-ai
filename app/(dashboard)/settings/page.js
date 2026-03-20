'use client'
import { useUser, useClerk } from '@clerk/nextjs'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [prefs, setPrefs] = useState({ includeVideo: true, defaultLevel: 'Beginner', defaultChapters: 5, emailNotifs: true })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const Section = ({ title, icon, children }) => (
    <div className="glass-card" style={{ padding: '28px 32px', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <h2 style={{ fontSize: 16, fontWeight: 700 }}>{title}</h2>
      </div>
      {children}
    </div>
  )

  const Row = ({ label, desc, children }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{label}</p>
        {desc && <p style={{ fontSize: 12, color: 'var(--text3)' }}>{desc}</p>}
      </div>
      {children}
    </div>
  )

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={{ width: 44, height: 24, borderRadius: 12, background: value ? 'var(--cyan)' : 'var(--border2)', cursor: 'pointer', position: 'relative', transition: 'all 0.3s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 3, left: value ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: value ? '#000' : 'var(--text3)', transition: 'left 0.3s' }} />
    </div>
  )

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <div style={{ marginBottom: 36 }}>
        <span style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>Account</span>
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-1px', marginTop: 6 }}>Settings</h1>
      </div>

      {/* Profile */}
      <Section title="Profile" icon="👤">
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <img src={user?.imageUrl} alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid var(--cyan)', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />
          <div>
            <p style={{ fontSize: 18, fontWeight: 700 }}>{user?.firstName} {user?.lastName}</p>
            <p style={{ fontSize: 13, color: 'var(--text3)', marginTop: 2 }}>{user?.primaryEmailAddress?.emailAddress}</p>
            <span style={{ fontSize: 11, background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.2)', color: 'var(--cyan)', padding: '2px 10px', borderRadius: 20, display: 'inline-block', marginTop: 6 }}>Free Plan</span>
          </div>
        </div>
        <Row label="Full Name" desc="Your display name across the platform">
          <div style={{ fontSize: 14, color: 'var(--text2)', fontFamily: 'monospace' }}>{user?.firstName} {user?.lastName}</div>
        </Row>
        <Row label="Email" desc="Primary email address">
          <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'monospace' }}>{user?.primaryEmailAddress?.emailAddress}</div>
        </Row>
        <Row label="Member Since" desc="Account creation date">
          <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'monospace' }}>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}</div>
        </Row>
      </Section>

      {/* Course Defaults */}
      <Section title="Course Preferences" icon="⚙️">
        <Row label="Include Videos by Default" desc="Auto-enable YouTube videos for new courses">
          <Toggle value={prefs.includeVideo} onChange={v => setPrefs({ ...prefs, includeVideo: v })} />
        </Row>
        <Row label="Default Difficulty" desc="Pre-selected level when creating courses">
          <select value={prefs.defaultLevel} onChange={e => setPrefs({ ...prefs, defaultLevel: e.target.value })}
            style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 8, padding: '6px 12px', color: 'var(--text)', fontFamily: 'Outfit', fontSize: 13, cursor: 'pointer' }}>
            {['Beginner', 'Intermediate', 'Advanced'].map(l => <option key={l}>{l}</option>)}
          </select>
        </Row>
        <Row label="Default Chapters" desc="Starting chapter count for new courses">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => setPrefs({ ...prefs, defaultChapters: Math.max(3, prefs.defaultChapters - 1) })} style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--surface)', border: '1px solid var(--border2)', color: 'var(--text)', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
            <span style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 700, color: 'var(--cyan)', width: 24, textAlign: 'center' }}>{prefs.defaultChapters}</span>
            <button onClick={() => setPrefs({ ...prefs, defaultChapters: Math.min(15, prefs.defaultChapters + 1) })} style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--surface)', border: '1px solid var(--border2)', color: 'var(--text)', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          </div>
        </Row>
        <Row label="Email Notifications" desc="Get notified about course activity">
          <Toggle value={prefs.emailNotifs} onChange={v => setPrefs({ ...prefs, emailNotifs: v })} />
        </Row>
      </Section>

      {/* API Info */}
      <Section title="Integrations" icon="🔗">
        {[
          { name: 'Google Gemini AI', status: 'Connected', color: '#4285f4', desc: 'Course outline generation' },
          { name: 'Clerk Authentication', status: 'Connected', color: '#6c47ff', desc: 'User auth & session management' },
          { name: 'YouTube Data API', status: 'Connected', color: '#ff0000', desc: 'Chapter video suggestions' },
          { name: 'Supabase / NeonDB', status: 'Connected', color: '#00e5b4', desc: 'Course data storage' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, boxShadow: `0 0 8px ${item.color}88` }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</p>
                <p style={{ fontSize: 12, color: 'var(--text3)' }}>{item.desc}</p>
              </div>
            </div>
            <span style={{ fontSize: 11, background: 'rgba(100,255,100,0.1)', border: '1px solid rgba(100,255,100,0.2)', color: '#66ff99', padding: '3px 10px', borderRadius: 20 }}>{item.status}</span>
          </div>
        ))}
      </Section>

      {/* Danger zone */}
      <Section title="Account Actions" icon="⚠️">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={handleSave} className="btn-primary" style={{ padding: '11px 28px', fontSize: 14 }}>
            {saved ? '✓ Saved!' : 'Save Preferences'}
          </button>
          <button onClick={() => { signOut(); router.push('/') }}
            style={{ padding: '11px 24px', fontSize: 14, background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.25)', borderRadius: 50, color: '#ff8080', cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 600, transition: 'all 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,80,80,0.15)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,80,80,0.08)'}>
            Sign Out
          </button>
        </div>
      </Section>
    </div>
  )
}
