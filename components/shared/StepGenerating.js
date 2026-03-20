'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const STAGES = [
  { msg: 'Analyzing topic and extracting key concepts...', pct: 10 },
  { msg: 'Crafting course title and description...', pct: 25 },
  { msg: 'Building chapter structure with Gemini AI...', pct: 45 },
  { msg: 'Writing chapter summaries and topics...', pct: 65 },
  { msg: 'Generating learning objectives...', pct: 80 },
  { msg: 'Saving course to database...', pct: 92 },
  { msg: 'Course ready! Redirecting...', pct: 100 },
]

export default function StepGenerating({ formData, user, onBack }) {
  const router = useRouter()
  const [stageIdx, setStageIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [generated, setGenerated] = useState(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    runGeneration()
  }, [])

  const runGeneration = async () => {
    // Animate through early stages
    for (let i = 0; i < 2; i++) {
      setStageIdx(i)
      setProgress(STAGES[i].pct)
      await delay(700)
    }

    try {
      // Call Gemini API
      setStageIdx(2)
      setProgress(STAGES[2].pct)

      const res = await fetch('/api/generate-course-outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: formData.topic,
          description: formData.description,
          category: formData.category,
          level: formData.level,
          duration: formData.duration,
          noOfChapters: formData.noOfChapters,
          includeVideo: formData.includeVideo,
        }),
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error)

      const courseOutput = data.courseOutput

      // Animate remaining stages
      for (let i = 3; i < 5; i++) {
        setStageIdx(i)
        setProgress(STAGES[i].pct)
        await delay(500)
      }

      // Save to DB
      setStageIdx(5)
      setProgress(STAGES[5].pct)

      const courseId = uuidv4()
      const saveRes = await fetch('/api/save-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          name: courseOutput.courseName,
          category: formData.category,
          level: formData.level,
          includeVideo: formData.includeVideo,
          duration: formData.duration,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          courseOutput,
          publish: false,
        }),
      })

      const saveData = await saveRes.json()
      if (saveData.error) throw new Error(saveData.error)

      setStageIdx(6)
      setProgress(100)
      setGenerated({ ...courseOutput, courseId })
      setDone(true)

      await delay(1200)
      router.push(`/course-preview/${courseId}`)

    } catch (err) {
      console.error(err)
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  const delay = ms => new Promise(r => setTimeout(r, ms))

  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>

      {error ? (
        <div style={{ animation: 'fadeUp 0.4s ease' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>⚠️</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, color: '#ff8080' }}>Generation Failed</h3>
          <p style={{ color: 'var(--text2)', marginBottom: 28, fontSize: 14, maxWidth: 400, margin: '0 auto 28px' }}>{error}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={onBack} style={{ padding: '12px 24px', background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 50, color: 'var(--text2)', cursor: 'pointer', fontFamily: 'Outfit', fontSize: 14 }}>
              ← Go Back
            </button>
            <button className="btn-primary" onClick={() => { setError(''); setStageIdx(0); setProgress(0); runGeneration() }} style={{ padding: '12px 28px', fontSize: 14 }}>
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Spinning orb */}
          <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 36px' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid var(--cyan)', opacity: 0.25, animation: 'pulse-ring 2s ease infinite' }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(0,229,255,0.15)', animation: 'pulse-ring 2s 0.5s ease infinite' }} />
            <div style={{
              position: 'absolute', inset: 10, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,229,255,0.15), transparent)',
              border: '2px solid var(--cyan)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, animation: done ? 'none' : 'spin-slow 5s linear infinite',
            }}>
              {done ? '✓' : '✦'}
            </div>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.5px' }}>
            {done ? 'Course Generated! 🎉' : 'Building Your Course'}
          </h2>
          <p style={{ color: 'var(--text2)', marginBottom: 36, fontSize: 14, minHeight: 20 }}>
            {STAGES[stageIdx]?.msg}
          </p>

          {/* Progress bar */}
          <div style={{ maxWidth: 420, margin: '0 auto 36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'monospace' }}>Progress</span>
              <span style={{ fontSize: 12, color: 'var(--cyan)', fontFamily: 'monospace', fontWeight: 600 }}>{progress}%</span>
            </div>
            <div className="progress-track" style={{ height: 6 }}>
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Stage checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 380, margin: '0 auto' }}>
            {STAGES.slice(0, -1).map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  opacity: i <= stageIdx ? 1 : 0.3,
                  transition: 'opacity 0.4s',
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: i < stageIdx ? 'rgba(0,229,255,0.15)' : 'var(--surface)',
                  border: `1px solid ${i < stageIdx ? 'var(--cyan)' : 'var(--border2)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: 'var(--cyan)',
                }}>
                  {i < stageIdx ? '✓' : i === stageIdx ? (
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', animation: 'dot-pulse 1.4s ease-in-out infinite' }} />
                  ) : ''}
                </div>
                <span style={{ fontSize: 13, color: 'var(--text2)', textAlign: 'left' }}>
                  {s.msg.replace('...', '')}
                </span>
              </div>
            ))}
          </div>

          {/* Course summary preview */}
          {generated && (
            <div style={{ marginTop: 32, padding: '20px 24px', background: 'var(--cyan-dim)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: 12, maxWidth: 420, margin: '32px auto 0', textAlign: 'left', animation: 'fadeUp 0.4s ease' }}>
              <p style={{ fontSize: 13, color: 'var(--cyan)', fontWeight: 600, marginBottom: 8 }}>✦ Generated Course</p>
              <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{generated.courseName}</p>
              <p style={{ fontSize: 13, color: 'var(--text2)' }}>{generated.chapters?.length} chapters · {formData.level} · {formData.category}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
