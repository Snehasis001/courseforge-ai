'use client'
import Link from 'next/link'
import { useState } from 'react'

const CATEGORY_COLORS = {
  'Programming': ['#00e5ff', '#0099ff'],
  'Technology': ['#00e5ff', '#0055ff'],
  'Business':   ['#ffb347', '#ff6b35'],
  'Design':     ['#b66dff', '#ff66cc'],
  'Marketing':  ['#66ff99', '#00cc88'],
  'Science':    ['#00e5ff', '#b66dff'],
  'Health':     ['#66ffaa', '#00cc66'],
  'Language':   ['#ffdd66', '#ff9933'],
  'default':    ['#00e5ff', '#b66dff'],
}

const EMOJI_MAP = {
  'Programming': '💻', 'Technology': '⚡', 'Business': '📊',
  'Design': '🎨', 'Marketing': '📣', 'Science': '🔬',
  'Health': '💪', 'Language': '🌐', 'default': '✦',
}

export default function CourseCard({ course, onRefresh }) {
  const [deleting, setDeleting] = useState(false)
  const output = (() => {
    try { return JSON.parse(course.courseOutput || '{}') } catch { return {} }
  })()

  const colors = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.default
  const emoji  = EMOJI_MAP[course.category] || EMOJI_MAP.default
  const chapters = output.chapters?.length || 0

  return (
    <Link href={`/course-preview/${course.courseId}`} style={{ textDecoration: 'none' }}>
      <div className="course-card">
        {/* Banner */}
        <div style={{
          height: 140,
          background: `linear-gradient(135deg, ${colors[0]}28, ${colors[1]}40)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* BG glow */}
          <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${colors[0]}25, transparent)`, top: -20, right: -20 }} />
          <span style={{ fontSize: 52, position: 'relative', zIndex: 1 }}>{emoji}</span>
          {/* Badges */}
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
            <span style={{ fontSize: 10, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', color: colors[0], padding: '3px 10px', borderRadius: 20, fontWeight: 600, border: `1px solid ${colors[0]}44` }}>
              {course.category}
            </span>
          </div>
          {course.publish && (
            <div style={{ position: 'absolute', top: 12, right: 12 }}>
              <span style={{ fontSize: 10, background: 'rgba(100,255,100,0.15)', backdropFilter: 'blur(4px)', color: '#66ff99', padding: '3px 10px', borderRadius: 20, fontWeight: 600, border: '1px solid rgba(100,255,100,0.3)' }}>
                ✓ Live
              </span>
            </div>
          )}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(transparent, var(--bg2))' }} />
        </div>

        {/* Content */}
        <div style={{ padding: '18px 20px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'monospace' }}>{course.level}</span>
            <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'monospace' }}>{output.duration || '—'}</span>
          </div>

          <h3 style={{
            fontSize: 15, fontWeight: 700, marginBottom: 8,
            letterSpacing: '-0.3px', lineHeight: 1.35,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {output.courseName || course.name}
          </h3>

          <p style={{
            fontSize: 13, color: 'var(--text2)', lineHeight: 1.55, marginBottom: 16,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {output.description}
          </p>

          <div style={{ display: 'flex', gap: 20, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>📚 {chapters} chapters</span>
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>🎬 {course.includeVideo}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
