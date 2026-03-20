'use client'
import { useEffect, useState } from 'react'
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
const CATEGORIES = ['All', 'Programming', 'Technology', 'Business', 'Design', 'Marketing', 'Science', 'Health', 'Language']

export default function ExplorePage() {
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [activeLevel, setActiveLevel] = useState('All')

  useEffect(() => { fetchCourses() }, [])

  useEffect(() => {
    let result = courses
    if (activeCategory !== 'All') result = result.filter(c => c.category === activeCategory)
    if (activeLevel !== 'All') result = result.filter(c => c.level === activeLevel)
    if (search) result = result.filter(c => {
      const out = safeParseOutput(c.courseOutput)
      return (out.courseName || c.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.category || '').toLowerCase().includes(search.toLowerCase())
    })
    setFiltered(result)
  }, [courses, activeCategory, activeLevel, search])

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/get-courses')
      const data = await res.json()
      setCourses(data.courses || [])
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const safeParseOutput = (raw) => {
    try { return JSON.parse(raw || '{}') } catch { return {} }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <span style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>Discover</span>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, letterSpacing: '-1px', marginTop: 6, marginBottom: 8 }}>
          Explore <span style={{ background: 'linear-gradient(90deg, var(--cyan), var(--violet))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Courses</span>
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: 15 }}>Browse all published AI-generated courses from the community.</p>
      </div>

      {/* Search + filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: 'var(--text3)' }}>🔍</span>
          <input
            className="input-styled"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 42 }}
          />
        </div>
        <select className="input-styled" value={activeLevel} onChange={e => setActiveLevel(e.target.value)}
          style={{ width: 140, appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2300e5ff' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 36 }}>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(l => <option key={l}>{l}</option>)}
        </select>
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            style={{ padding: '7px 16px', borderRadius: 50, fontSize: 13, fontWeight: activeCategory === cat ? 700 : 400, cursor: 'pointer', fontFamily: 'Outfit', transition: 'all 0.2s', background: activeCategory === cat ? 'var(--cyan)' : 'rgba(255,255,255,0.04)', border: `1px solid ${activeCategory === cat ? 'var(--cyan)' : 'var(--border2)'}`, color: activeCategory === cat ? '#000' : 'var(--text2)' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 13, color: 'var(--text3)' }}>
          {loading ? 'Loading...' : `${filtered.length} course${filtered.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ height: 280, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16 }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🔭</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No courses found</h3>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>
            {courses.length === 0 ? 'No published courses yet. Be the first to publish one!' : 'Try a different search or category.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {filtered.map((course, i) => {
            const out = safeParseOutput(course.courseOutput)
            const colors = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.default
            const emoji = EMOJI_MAP[course.category] || EMOJI_MAP.default
            const chapters = out.chapters?.length || 0
            return (
              <div key={course.id || i} className="course-card" onClick={() => router.push(`/course-preview/${course.courseId}`)}>
                <div style={{ height: 130, background: `linear-gradient(135deg, ${colors[0]}25, ${colors[1]}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: `radial-gradient(circle, ${colors[0]}20, transparent)` }} />
                  <span style={{ fontSize: 44, position: 'relative', zIndex: 1 }}>{emoji}</span>
                  <div style={{ position: 'absolute', top: 10, left: 10 }}>
                    <span style={{ fontSize: 10, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', color: colors[0], padding: '3px 10px', borderRadius: 20, fontWeight: 600, border: `1px solid ${colors[0]}44` }}>{course.category}</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 36, background: 'linear-gradient(transparent, var(--bg2))' }} />
                </div>
                <div style={{ padding: '16px 18px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'monospace' }}>{course.level}</span>
                    <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'monospace' }}>{out.duration || course.duration || '—'}</span>
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{out.courseName || course.name}</h3>
                  <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.55, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{out.description}</p>
                  <div style={{ display: 'flex', gap: 16, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 11, color: 'var(--text3)' }}>📚 {chapters} ch</span>
                    <span style={{ fontSize: 11, color: 'var(--text3)' }}>🎬 {course.includeVideo}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 11, background: 'rgba(100,255,100,0.1)', border: '1px solid rgba(100,255,100,0.2)', color: '#66ff99', padding: '1px 8px', borderRadius: 20, fontWeight: 600 }}>Live</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
