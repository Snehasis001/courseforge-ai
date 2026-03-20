'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const CATEGORY_COLORS = {
  'Programming': ['#00e5ff', '#0099ff'],
  'Technology':  ['#00e5ff', '#0055ff'],
  'Business':    ['#ffb347', '#ff6b35'],
  'Design':      ['#b66dff', '#ff66cc'],
  'Marketing':   ['#66ff99', '#00cc88'],
  'Science':     ['#00e5ff', '#b66dff'],
  'Health':      ['#66ffaa', '#00cc66'],
  'Language':    ['#ffdd66', '#ff9933'],
  'default':     ['#00e5ff', '#b66dff'],
}

export default function CoursePreviewPage() {
  const { courseId } = useParams()
  const router = useRouter()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [publishing, setPublishing] = useState(false)

  useEffect(() => { fetchCourse() }, [courseId])

  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/get-courses?courseId=${courseId}`)
      const data = await res.json()
      setCourse(data.course)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handlePublish = async () => {
    setPublishing(true)
    try {
      await fetch('/api/save-course', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, publish: true })
      })
      fetchCourse()
    } catch (e) { console.error(e) }
    finally { setPublishing(false) }
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid var(--cyan)', borderTopColor: 'transparent', animation: 'spin-slow 0.8s linear infinite' }} />
    </div>
  )

  if (!course) return (
    <div style={{ textAlign: 'center', padding: 80 }}>
      <p style={{ color: 'var(--text2)' }}>Course not found.</p>
      <Link href="/dashboard"><button className="btn-primary" style={{ marginTop: 20, padding: '12px 28px' }}>Back to Dashboard</button></Link>
    </div>
  )

  const output = JSON.parse(course.courseOutput || '{}')
  const chapters = output.chapters || []
  const colors = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.default

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <button onClick={() => router.push('/dashboard')}
        style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 36, fontSize: 14, fontFamily: 'Outfit' }}>
        ← Back to dashboard
      </button>

      <div style={{ borderRadius: 20, background: `linear-gradient(135deg, ${colors[0]}1a, ${colors[1]}2a)`, border: `1px solid ${colors[0]}33`, padding: '40px 36px', marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 220, height: 220, borderRadius: '50%', background: `radial-gradient(circle, ${colors[0]}18, transparent)` }} />
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <span className="tag-badge" style={{ background: `${colors[0]}18`, borderColor: `${colors[0]}44`, color: colors[0] }}>{course.category}</span>
          <span className="tag-badge" style={{ background: 'var(--surface)', borderColor: 'var(--border2)', color: 'var(--text2)' }}>{course.level}</span>
          {course.publish && <span className="tag-badge" style={{ background: 'rgba(100,255,100,0.1)', borderColor: 'rgba(100,255,100,0.3)', color: '#66ff99' }}>✓ Published</span>}
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 12, lineHeight: 1.2 }}>{output.courseName || course.name}</h1>
        <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, maxWidth: 600, marginBottom: 20 }}>{output.description}</p>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: 'var(--text3)' }}>📚 {chapters.length} Chapters</span>
          <span style={{ fontSize: 13, color: 'var(--text3)' }}>⏱ {course.duration || output.duration || '—'}</span>
          <span style={{ fontSize: 13, color: 'var(--text3)' }}>📊 {course.level}</span>
          <span style={{ fontSize: 13, color: 'var(--text3)' }}>🎬 Videos: {course.includeVideo}</span>
        </div>
        {!course.publish && (
          <button onClick={handlePublish} disabled={publishing} className="btn-primary"
            style={{ marginTop: 24, padding: '12px 28px', fontSize: 14, opacity: publishing ? 0.7 : 1 }}>
            {publishing ? 'Publishing...' : '🚀 Publish Course'}
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        <button onClick={() => router.push(`/course-preview/${courseId}/0`)}
          className="btn-primary" style={{ padding: '13px 32px', fontSize: 15 }}>
          ▶ Start Learning
        </button>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, letterSpacing: '-0.5px' }}>
        Course Chapters ({chapters.length})
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {chapters.map((ch, i) => (
          <button key={i}
            onClick={() => router.push(`/course-preview/${courseId}/${i}`)}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 20px', borderRadius: 12, border: '1px solid var(--border)', background: 'rgba(0,229,255,0.02)', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 0.2s', fontFamily: 'Outfit' }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.25)'; e.currentTarget.style.background = 'rgba(0,229,255,0.05)'; e.currentTarget.style.transform = 'translateX(4px)' }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(0,229,255,0.02)'; e.currentTarget.style.transform = 'translateX(0)' }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--cyan-dim)', border: '1px solid rgba(0,229,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14, fontWeight: 700, color: 'var(--cyan)', fontFamily: 'monospace' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3, color: 'var(--text)' }}>{ch.chapterName}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  {ch.duration && <span style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'monospace' }}>{ch.duration}</span>}
                  <span style={{ fontSize: 18, color: 'var(--cyan)' }}>→</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: ch.topics ? 10 : 0 }}>{ch.about}</p>
              {ch.topics && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {ch.topics.slice(0, 4).map((t, j) => (
                    <span key={j} style={{ fontSize: 11, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 8px', color: 'var(--text3)' }}>{t}</span>
                  ))}
                  {ch.topics.length > 4 && <span style={{ fontSize: 11, color: 'var(--text3)', padding: '2px 4px' }}>+{ch.topics.length - 4} more</span>}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
