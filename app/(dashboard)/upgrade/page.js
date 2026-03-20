'use client'
import { useUser } from '@clerk/nextjs'

const PLANS = [
  {
    name: 'Free', price: '₹0', period: 'forever', color: 'var(--border2)', textColor: 'var(--text2)',
    features: ['5 courses / month', '5 chapters per course', 'Basic AI notes', 'YouTube video suggestions', 'Community support'],
    missing: ['Unlimited courses', 'Priority AI generation', 'PDF export', 'Custom branding', 'Analytics dashboard'],
    cta: 'Current Plan', ctaDisabled: true,
  },
  {
    name: 'Pro', price: '₹499', period: 'per month', color: 'var(--cyan)', textColor: '#000',
    badge: '🔥 Most Popular',
    features: ['Unlimited courses', 'Up to 15 chapters', 'Advanced AI notes', 'YouTube videos', 'PDF syllabus export', 'Priority generation', 'Email support', 'Analytics dashboard'],
    missing: ['Custom branding', 'API access', 'White-label'],
    cta: 'Upgrade to Pro', ctaDisabled: false,
  },
  {
    name: 'Team', price: '₹1,499', period: 'per month', color: 'var(--violet)', textColor: '#fff',
    badge: '⚡ Best Value',
    features: ['Everything in Pro', 'Up to 5 team members', 'Custom branding', 'API access', 'White-label option', 'Priority support', 'Advanced analytics', 'Custom domain'],
    missing: [],
    cta: 'Get Team Plan', ctaDisabled: false,
  },
]

const FEATURES = [
  { icon: '🧠', title: 'Unlimited AI Generation', desc: 'Generate as many courses as you need with no monthly limits.' },
  { icon: '📄', title: 'PDF Syllabus Export', desc: 'Export any course as a beautifully formatted PDF document.' },
  { icon: '📊', title: 'Analytics Dashboard', desc: 'Track views, engagement, and completion rates across all your courses.' },
  { icon: '⚡', title: 'Priority Generation', desc: 'Skip the queue — your courses generate 3x faster with priority access.' },
  { icon: '🎨', title: 'Custom Branding', desc: 'Add your own logo and colors to published courses.' },
  { icon: '🔗', title: 'API Access', desc: 'Integrate CourseForge AI directly into your own apps and workflows.' },
]

export default function UpgradePage() {
  const { user } = useUser()

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56, padding: '20px 0' }}>
        <span style={{ display: 'inline-block', fontSize: 11, color: 'var(--amber)', letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700, background: 'rgba(255,179,71,0.1)', border: '1px solid rgba(255,179,71,0.25)', padding: '4px 14px', borderRadius: 20, marginBottom: 16 }}>⚡ Upgrade</span>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, letterSpacing: '-1.5px', marginBottom: 14, lineHeight: 1.1 }}>
          Unlock the full power of<br />
          <span style={{ background: 'linear-gradient(135deg, var(--cyan), var(--violet), var(--amber))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CourseForge AI</span>
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
          Go unlimited. Generate more, export faster, and build better courses.
        </p>
      </div>

      {/* Pricing cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 72, maxWidth: 900, margin: '0 auto 72px' }}>
        {PLANS.map((plan, i) => (
          <div key={i} style={{ position: 'relative', background: i === 1 ? `linear-gradient(135deg, rgba(0,229,255,0.08), rgba(182,109,255,0.08))` : 'var(--bg2)', border: `1.5px solid ${i === 1 ? 'var(--cyan)' : i === 2 ? 'var(--violet)' : 'var(--border)'}`, borderRadius: 20, padding: '32px 28px', display: 'flex', flexDirection: 'column', transform: i === 1 ? 'scale(1.03)' : 'scale(1)', transition: 'all 0.3s', boxShadow: i === 1 ? '0 0 40px rgba(0,229,255,0.1)' : 'none' }}
            onMouseOver={e => { if (i !== 1) e.currentTarget.style.borderColor = i === 2 ? 'var(--violet)' : 'var(--border2)'; e.currentTarget.style.transform = i === 1 ? 'scale(1.05)' : 'scale(1.02)' }}
            onMouseOut={e => { e.currentTarget.style.transform = i === 1 ? 'scale(1.03)' : 'scale(1)' }}>
            {plan.badge && (
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: i === 1 ? 'var(--cyan)' : 'var(--violet)', color: i === 1 ? '#000' : '#fff', fontSize: 11, fontWeight: 700, padding: '4px 16px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                {plan.badge}
              </div>
            )}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: plan.color === 'var(--border2)' ? 'var(--text3)' : plan.color, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{plan.name}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-2px', color: plan.color === 'var(--border2)' ? 'var(--text)' : plan.color }}>{plan.price}</span>
                <span style={{ fontSize: 13, color: 'var(--text3)' }}>{plan.period}</span>
              </div>
            </div>

            <div style={{ flex: 1, marginBottom: 28 }}>
              {plan.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: plan.color === 'var(--border2)' ? 'rgba(255,255,255,0.06)' : `${plan.color}20`, border: `1px solid ${plan.color === 'var(--border2)' ? 'var(--border2)' : plan.color + '44'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, color: plan.color === 'var(--border2)' ? 'var(--text3)' : plan.color, fontWeight: 700 }}>✓</div>
                  <span style={{ fontSize: 13, color: 'var(--text2)' }}>{f}</span>
                </div>
              ))}
              {plan.missing.slice(0, 3).map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, opacity: 0.35 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, color: 'var(--text3)' }}>✕</div>
                  <span style={{ fontSize: 13, color: 'var(--text3)', textDecoration: 'line-through' }}>{f}</span>
                </div>
              ))}
            </div>

            <button disabled={plan.ctaDisabled}
              style={{ width: '100%', padding: '13px', borderRadius: 50, fontSize: 14, fontWeight: 700, fontFamily: 'Outfit', cursor: plan.ctaDisabled ? 'default' : 'pointer', transition: 'all 0.3s', border: 'none', background: plan.ctaDisabled ? 'var(--surface)' : i === 1 ? 'linear-gradient(135deg, var(--cyan), #0099ff)' : i === 2 ? 'linear-gradient(135deg, var(--violet), #6633ff)' : 'var(--surface)', color: plan.ctaDisabled ? 'var(--text3)' : i === 1 ? '#000' : '#fff', opacity: plan.ctaDisabled ? 0.6 : 1 }}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Feature highlights */}
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 32, letterSpacing: '-0.5px' }}>
          What's included in Pro
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="glass-card" style={{ padding: '22px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--cyan-dim)', border: '1px solid rgba(0,229,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 5 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center', padding: '32px', background: 'linear-gradient(135deg, rgba(0,229,255,0.06), rgba(182,109,255,0.06))', border: '1px solid rgba(0,229,255,0.15)', borderRadius: 20 }}>
          <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 6 }}>Questions? Contact us at</p>
          <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--cyan)' }}>support@courseforge.ai</p>
          <p style={{ fontSize: 12, color: 'var(--text3)', marginTop: 12 }}>14-day money-back guarantee · Cancel anytime · Secure payments via Razorpay</p>
        </div>
      </div>
    </div>
  )
}
