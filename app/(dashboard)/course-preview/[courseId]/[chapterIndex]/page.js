'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ChapterPage() {
  const { courseId, chapterIndex } = useParams()
  const router = useRouter()
  const idx = parseInt(chapterIndex)

  const [course, setCourse] = useState(null)
  const [chapter, setChapter] = useState(null)
  const [chapterData, setChapterData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [allChapters, setAllChapters] = useState([])
  const [videoPlaying, setVideoPlaying] = useState(false)

  useEffect(() => {
    fetchCourse()
    setVideoPlaying(false)
    setChapterData(null)
  }, [courseId, chapterIndex])

  const fetchCourse = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/get-courses?courseId=${courseId}`)
      const data = await res.json()
      const c = data.course
      setCourse(c)
      const output = JSON.parse(c.courseOutput || '{}')
      const chapters = output.chapters || []
      setAllChapters(chapters)
      const ch = chapters[idx]
      setChapter(ch)
      if (ch) generateContent(ch, output.courseName, c.level)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const generateContent = async (ch, courseName, level) => {
    setGenerating(true)
    setChapterData(null)
    try {
      const res = await fetch('/api/generate-chapter-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterName: ch.chapterName,
          chapterAbout: ch.about,
          topics: ch.topics,
          courseName,
          level,
        }),
      })
      const data = await res.json()
      setChapterData(data)
    } catch (e) {
      console.error(e)
    } finally {
      setGenerating(false)
    }
  }

  const isFirst = idx === 0
  const isLast = idx === allChapters.length - 1
  const output = course ? JSON.parse(course.courseOutput || '{}') : {}

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid var(--cyan)', borderTopColor: 'transparent', animation: 'spin-slow 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: 'var(--text2)', fontSize: 14 }}>Loading chapter...</p>
      </div>
    </div>
  )

  if (!chapter) return (
    <div style={{ textAlign: 'center', padding: 80 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
      <p style={{ color: 'var(--text2)', marginBottom: 20 }}>Chapter not found.</p>
      <button className="btn-primary" onClick={() => router.push(`/course-preview/${courseId}`)} style={{ padding: '12px 28px' }}>← Back to Course</button>
    </div>
  )

  return (
    <div style={{ maxWidth: 1060, margin: '0 auto' }}>

      {/* Top nav bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <button onClick={() => router.push(`/course-preview/${courseId}`)}
          style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontFamily: 'Outfit' }}>
          ← Back to Course
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--text3)' }}>Chapter {idx + 1} of {allChapters.length}</span>
          <div style={{ width: 100, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${((idx + 1) / allChapters.length) * 100}%`, background: 'linear-gradient(90deg, var(--cyan), var(--violet))', transition: 'width 0.5s' }} />
          </div>
          <span style={{ fontSize: 13, color: 'var(--cyan)', fontFamily: 'monospace', fontWeight: 600 }}>{Math.round(((idx + 1) / allChapters.length) * 100)}%</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 24, alignItems: 'start' }}>

        {/* ── Left: main content ── */}
        <div>

          {/* Chapter title card */}
          <div style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.06), rgba(182,109,255,0.06))', border: '1px solid rgba(0,229,255,0.15)', borderRadius: 16, padding: '28px 28px 24px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.1), transparent)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: 'var(--cyan-dim)', border: '1px solid rgba(0,229,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 16, fontWeight: 700, color: 'var(--cyan)', flexShrink: 0 }}>
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div>
                <p style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600, marginBottom: 4 }}>{output.courseName}</p>
                <h1 style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.25, color: 'var(--text)' }}>{chapter.chapterName}</h1>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7 }}>{chapter.about}</p>
            {chapter.duration && (
              <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border2)', borderRadius: 20, padding: '4px 12px' }}>
                <span style={{ fontSize: 12 }}>⏱</span>
                <span style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'monospace' }}>{chapter.duration}</span>
              </div>
            )}
          </div>

          {/* ── YouTube Video ── */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,0,0,0.15)', border: '1px solid rgba(255,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>▶</div>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Video Lesson</h2>
            </div>

            {generating ? (
              <div style={{ borderRadius: 14, overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--border)', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(255,0,0,0.5)', borderTopColor: 'transparent', animation: 'spin-slow 0.8s linear infinite' }} />
                <p style={{ color: 'var(--text3)', fontSize: 13 }}>Finding best video...</p>
              </div>
            ) : chapterData?.video ? (
              <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', position: 'relative', background: '#000' }}>
                {!videoPlaying ? (
                  <div onClick={() => setVideoPlaying(true)} style={{ position: 'relative', cursor: 'pointer', aspectRatio: '16/9' }}>
                    <img src={`https://img.youtube.com/vi/${chapterData.video.videoId}/maxresdefault.jpg`}
                      alt={chapterData.video.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={e => { e.target.src = chapterData.video.thumbnail }}
                    />
                    {/* Overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(255,0,0,0.4)', transition: 'transform 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                        <span style={{ fontSize: 22, marginLeft: 4 }}>▶</span>
                      </div>
                    </div>
                    {/* Video info bar */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 16px 14px', background: 'linear-gradient(transparent, rgba(0,0,0,0.85))' }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.3, marginBottom: 4 }}>{chapterData.video.title}</p>
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>📺 {chapterData.video.channel}</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ aspectRatio: '16/9' }}>
                    <iframe
                      width="100%" height="100%"
                      src={`https://www.youtube.com/embed/${chapterData.video.videoId}?autoplay=1&rel=0&modestbranding=1`}
                      title={chapterData.video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ display: 'block' }}
                    />
                  </div>
                )}
              </div>
            ) : !generating && (
              <div style={{ borderRadius: 14, border: '1px dashed var(--border2)', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 32 }}>📹</span>
                <p style={{ color: 'var(--text3)', fontSize: 13 }}>No video found for this chapter</p>
              </div>
            )}
          </div>

          {/* ── Key Points (short notes) ── */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--cyan-dim)', border: '1px solid rgba(0,229,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⚡</div>
                <h2 style={{ fontSize: 16, fontWeight: 700 }}>Key Takeaways</h2>
              </div>
              <button onClick={() => { const out = JSON.parse(course.courseOutput || '{}'); generateContent(chapter, out.courseName, course.level) }}
                disabled={generating}
                style={{ background: 'none', border: '1px solid var(--border2)', borderRadius: 8, padding: '5px 12px', color: 'var(--text3)', cursor: 'pointer', fontSize: 12, fontFamily: 'Outfit', opacity: generating ? 0.5 : 1, transition: 'all 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text3)' }}>
                {generating ? '⟳' : '↺'} Refresh
              </button>
            </div>

            {generating ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ height: 64, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, animation: 'pulse 2s infinite', opacity: 1 - i * 0.15 }} />
                ))}
              </div>
            ) : chapterData?.keyPoints ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* Summary pill */}
                {chapterData.summary && (
                  <div style={{ padding: '12px 18px', background: 'rgba(182,109,255,0.08)', border: '1px solid rgba(182,109,255,0.2)', borderRadius: 10, marginBottom: 4 }}>
                    <p style={{ fontSize: 13, color: 'var(--violet)', lineHeight: 1.6 }}>
                      <span style={{ fontWeight: 700, marginRight: 6 }}>💡</span>{chapterData.summary}
                    </p>
                  </div>
                )}
                {chapterData.keyPoints.map((point, i) => {
                  const icons = ['🎯', '🔑', '⚡']
                  const colors = ['rgba(0,229,255,0.08)', 'rgba(255,179,71,0.08)', 'rgba(102,255,153,0.08)']
                  const borders = ['rgba(0,229,255,0.2)', 'rgba(255,179,71,0.2)', 'rgba(102,255,153,0.2)']
                  const textColors = ['var(--cyan)', 'var(--amber)', '#66ff99']
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: colors[i], border: `1px solid ${borders[i]}`, borderRadius: 12, transition: 'all 0.2s' }}
                      onMouseOver={e => e.currentTarget.style.transform = 'translateX(4px)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'translateX(0)'}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                        {icons[i]}
                      </div>
                      <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.5, fontWeight: 500 }}>
                        <span style={{ color: textColors[i], fontWeight: 700, marginRight: 4 }}>0{i + 1}.</span>
                        {point}
                      </p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div style={{ padding: 28, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, textAlign: 'center', color: 'var(--text3)', fontSize: 14 }}>
                No notes yet.
              </div>
            )}
          </div>

          {/* ── Topics chips ── */}
          {chapter.topics && (
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Topics in this chapter</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {chapter.topics.map((t, i) => (
                  <span key={i} style={{ fontSize: 13, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border2)', borderRadius: 20, padding: '6px 14px', color: 'var(--text2)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Prev / Next ── */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => router.push(`/course-preview/${courseId}/${idx - 1}`)} disabled={isFirst}
              style={{ flex: 1, padding: '13px', background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 50, color: isFirst ? 'var(--text3)' : 'var(--text2)', cursor: isFirst ? 'not-allowed' : 'pointer', fontFamily: 'Outfit', fontSize: 14, fontWeight: 600, opacity: isFirst ? 0.4 : 1, transition: 'all 0.2s' }}
              onMouseOver={e => { if (!isFirst) { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)'; e.currentTarget.style.color = 'var(--text)' } }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text2)' }}>
              ← Previous
            </button>
            {!isLast ? (
              <button onClick={() => router.push(`/course-preview/${courseId}/${idx + 1}`)}
                className="btn-primary" style={{ flex: 1, padding: '13px', fontSize: 14 }}>
                Next Chapter →
              </button>
            ) : (
              <button onClick={() => router.push(`/course-preview/${courseId}`)}
                className="btn-primary" style={{ flex: 1, padding: '13px', fontSize: 14 }}>
                🎉 Complete!
              </button>
            )}
          </div>
        </div>

        {/* ── Right: Chapter sidebar ── */}
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 13, fontWeight: 700 }}>Chapters</h3>
              <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'monospace' }}>{idx + 1}/{allChapters.length}</span>
            </div>
            {/* Mini progress */}
            <div style={{ height: 2, background: 'var(--border)' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, var(--cyan), var(--violet))', width: `${((idx + 1) / allChapters.length) * 100}%` }} />
            </div>
            <div style={{ maxHeight: 480, overflowY: 'auto' }}>
              {allChapters.map((ch, i) => (
                <button key={i}
                  onClick={() => router.push(`/course-preview/${courseId}/${i}`)}
                  style={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: 10, padding: '11px 16px', background: i === idx ? 'rgba(0,229,255,0.07)' : 'transparent', borderBottom: '1px solid var(--border)', border: 'none', borderLeft: `3px solid ${i === idx ? 'var(--cyan)' : 'transparent'}`, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', fontFamily: 'Outfit' }}
                  onMouseOver={e => { if (i !== idx) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                  onMouseOut={e => { if (i !== idx) e.currentTarget.style.background = 'transparent' }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: i < idx ? 'var(--cyan)' : i === idx ? 'var(--cyan-dim)' : 'var(--surface)', border: `1px solid ${i <= idx ? 'var(--cyan)' : 'var(--border2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: i < idx ? '#000' : 'var(--cyan)', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>
                    {i < idx ? '✓' : i + 1}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: i === idx ? 600 : 400, color: i === idx ? 'var(--cyan)' : 'var(--text2)', lineHeight: 1.4, wordBreak: 'break-word' }}>
                      {ch.chapterName}
                    </p>
                    {ch.duration && <p style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2, fontFamily: 'monospace' }}>{ch.duration}</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
