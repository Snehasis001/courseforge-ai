'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORY_COLORS = {
  'Programming': ['#00e5ff', '#0099ff'], 'Technology': ['#00e5ff', '#0055ff'],
  'Business': ['#ffb347', '#ff6b35'], 'Design': ['#b66dff', '#ff66cc'],
  'Marketing': ['#66ff99', '#00cc88'], 'Science': ['#00e5ff', '#b66dff'],
  'Health': ['#66ffaa', '#00cc66'], 'Language': ['#ffdd66', '#ff9933'],
  'default': ['#00e5ff', '#b66dff'],
}
const EMOJI_MAP = {
  'Programming': '💻', 'Technology': '⚡', 'Business': '📊', 'Design': '🎨',
  'Marketing': '📣', 'Science': '🔬', 'Health': '💪', 'Language': '🌐', 'default': '✦',
}

export default function CourseCard({ course, onRefresh }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const output = (() => { try { return JSON.parse(course.courseOutput || '{}') } catch { return {} } })()
  const colors = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.default
  const emoji = EMOJI_MAP[course.category] || EMOJI_MAP.default
  const chapters = output.chapters?.length || 0

  const handleDelete = async (e) => {
    e.stopPropagation()
    setDeleting(true)
    try {
      await fetch(`/api/delete-course?courseId=${course.courseId}`, { method: 'DELETE' })
      onRefresh?.()
    } catch (err) { console.error(err) }
    finally { setDeleting(false); setShowConfirm(false) }
  }

  return (
    <>
      {/* Delete confirmation modal */}
      {showConfirm && (
        <div onClick={() => setShowConfirm(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 16, padding: '32px 28px', maxWidth: 360, width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: 44, marginBottom: 16 }}>🗑️</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Delete Course?</h3>
            <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
              "<strong>{output.courseName || course.name}</strong>" will be permanently deleted. This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowConfirm(false)} style={{ flex: 1, padding: '11px', background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 50, color: 'var(--text2)', cursor: 'pointer', fontFamily: 'Outfit', fontSize: 14 }}>Cancel</button>
              <button onClick={handleDelete} disabled={deleting} style={{ flex: 1, padding: '11px', background: 'rgba(255,80,80,0.15)', border: '1px solid rgba(255,80,80,0.35)', borderRadius: 50, color: '#ff8080', cursor: 'pointer', fontFamily: 'Outfit', fontSize: 14, fontWeight: 700 }}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="course-card" style={{ position: 'relative' }}>
        {/* 3-dot menu */}
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
          onClick={e => { e.stopPropagation(); setMenuOpen(m => !m) }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14, color: '#fff', letterSpacing: 1 }}>⋮</div>
          {menuOpen && (
            <div style={{ position: 'absolute', top: 36, right: 0, background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 10, overflow: 'hidden', minWidth: 140, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
              onMouseLeave={() => setMenuOpen(false)}>
              <button onClick={(e) => { e.stopPropagation(); setMenuOpen(false); router.push(`/course-preview/${course.courseId}`) }}
                style={{ width: '100%', padding: '10px 16px', background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', fontSize: 13, fontFamily: 'Outfit', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.15s' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseOut={e => e.currentTarget.style.background = 'none'}>
                👁 View Course
              </button>
              <button onClick={(e) => { e.stopPropagation(); setMenuOpen(false); setShowConfirm(true) }}
                style={{ width: '100%', padding: '10px 16px', background: 'none', border: 'none', color: '#ff8080', cursor: 'pointer', fontSize: 13, fontFamily: 'Outfit', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.15s' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,80,80,0.08)'}
                onMouseOut={e => e.currentTarget.style.background = 'none'}>
                🗑 Delete Course
              </button>
            </div>
          )}
        </div>

        {/* Card content — click to open */}
        <div onClick={() => router.push(`/course-preview/${course.courseId}`)} style={{ cursor: 'pointer' }}>
          {/* Banner */}
          <div style={{ height: 140, background: `linear-gradient(135deg, ${colors[0]}28, ${colors[1]}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${colors[0]}25, transparent)`, top: -20, right: -20 }} />
            <span style={{ fontSize: 52, position: 'relative', zIndex: 1 }}>{emoji}</span>
            <div style={{ position: 'absolute', top: 12, left: 12 }}>
              <span style={{ fontSize: 10, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', color: colors[0], padding: '3px 10px', borderRadius: 20, fontWeight: 600, border: `1px solid ${colors[0]}44` }}>{course.category}</span>
            </div>
            {course.publish && (
              <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                <span style={{ fontSize: 10, background: 'rgba(100,255,100,0.15)', backdropFilter: 'blur(4px)', color: '#66ff99', padding: '3px 10px', borderRadius: 20, fontWeight: 600, border: '1px solid rgba(100,255,100,0.3)' }}>✓ Live</span>
              </div>
            )}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(transparent, var(--bg2))' }} />
          </div>

          {/* Info */}
          <div style={{ padding: '18px 20px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'monospace' }}>{course.level}</span>
              <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'monospace' }}>{output.duration || course.duration || '—'}</span>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.3px', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {output.courseName || course.name}
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.55, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {output.description}
            </p>
            <div style={{ display: 'flex', gap: 20, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>📚 {chapters} chapters</span>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>🎬 {course.includeVideo}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
