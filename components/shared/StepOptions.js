'use client'

const CATEGORIES = ['Programming', 'Technology', 'Business', 'Design', 'Marketing', 'Science', 'Health & Fitness', 'Language']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const DURATIONS = ['1 Hour', '2 Hours', '3 Hours', '5 Hours', '8 Hours', '10+ Hours']

export default function StepOptions({ formData, setFormData, onNext, onBack }) {
  const isValid = formData.category && formData.level && formData.duration

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.5px' }}>
          Configure your course
        </h2>
        <p style={{ color: 'var(--text2)', fontSize: 14 }}>
          Topic: <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>"{formData.topic}"</span>
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Category */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Category <span style={{ color: 'var(--cyan)' }}>*</span>
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFormData({ ...formData, category: cat })}
                style={{
                  background: formData.category === cat ? 'var(--cyan-dim)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${formData.category === cat ? 'rgba(0,229,255,0.35)' : 'var(--border2)'}`,
                  color: formData.category === cat ? 'var(--cyan)' : 'var(--text2)',
                  padding: '8px 16px', borderRadius: 8,
                  fontSize: 13, fontWeight: formData.category === cat ? 600 : 400,
                  cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Outfit',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Level */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Difficulty Level <span style={{ color: 'var(--cyan)' }}>*</span>
          </label>
          <div style={{ display: 'flex', gap: 10 }}>
            {LEVELS.map(lvl => {
              const colors = { Beginner: '#66ff99', Intermediate: '#ffb347', Advanced: '#ff6b6b' }
              const isSelected = formData.level === lvl
              return (
                <button
                  key={lvl}
                  onClick={() => setFormData({ ...formData, level: lvl })}
                  style={{
                    flex: 1, padding: '12px 8px',
                    background: isSelected ? `${colors[lvl]}15` : 'rgba(255,255,255,0.03)',
                    border: `1.5px solid ${isSelected ? colors[lvl] + '55' : 'var(--border2)'}`,
                    color: isSelected ? colors[lvl] : 'var(--text2)',
                    borderRadius: 10, fontSize: 14, fontWeight: isSelected ? 700 : 400,
                    cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Outfit', textAlign: 'center',
                  }}
                >
                  {lvl === 'Beginner' ? '🌱' : lvl === 'Intermediate' ? '🔥' : '🚀'} {lvl}
                </button>
              )
            })}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Course Duration <span style={{ color: 'var(--cyan)' }}>*</span>
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {DURATIONS.map(dur => (
              <button
                key={dur}
                onClick={() => setFormData({ ...formData, duration: dur })}
                style={{
                  background: formData.duration === dur ? 'var(--cyan-dim)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${formData.duration === dur ? 'rgba(0,229,255,0.35)' : 'var(--border2)'}`,
                  color: formData.duration === dur ? 'var(--cyan)' : 'var(--text2)',
                  padding: '8px 16px', borderRadius: 8,
                  fontSize: 13, fontWeight: formData.duration === dur ? 600 : 400,
                  cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Outfit',
                }}
              >
                ⏱ {dur}
              </button>
            ))}
          </div>
        </div>

        {/* Chapters + Video in a row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase' }}>
              Number of Chapters
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={() => setFormData({ ...formData, noOfChapters: Math.max(3, formData.noOfChapters - 1) })}
                style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border2)', color: 'var(--text)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >−</button>
              <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--cyan)', width: 40, textAlign: 'center' }}>{formData.noOfChapters}</span>
              <button
                onClick={() => setFormData({ ...formData, noOfChapters: Math.min(15, formData.noOfChapters + 1) })}
                style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border2)', color: 'var(--text)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >+</button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 10, letterSpacing: 0.5, textTransform: 'uppercase' }}>
              Include YouTube Videos
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Yes', 'No'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setFormData({ ...formData, includeVideo: opt })}
                  style={{
                    flex: 1, padding: '10px',
                    background: formData.includeVideo === opt ? (opt === 'Yes' ? 'rgba(0,229,255,0.12)' : 'rgba(255,107,107,0.1)') : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${formData.includeVideo === opt ? (opt === 'Yes' ? 'rgba(0,229,255,0.3)' : 'rgba(255,107,107,0.3)') : 'var(--border2)'}`,
                    color: formData.includeVideo === opt ? (opt === 'Yes' ? 'var(--cyan)' : '#ff8080') : 'var(--text2)',
                    borderRadius: 8, fontSize: 13, fontWeight: formData.includeVideo === opt ? 600 : 400,
                    cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Outfit',
                  }}
                >
                  {opt === 'Yes' ? '🎬 Yes' : '✕ No'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
          <button
            onClick={onBack}
            style={{ flex: '0 0 120px', padding: '14px', fontSize: 14, background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 50, color: 'var(--text2)', cursor: 'pointer', fontFamily: 'Outfit', transition: 'all 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text2)' }}
          >
            ← Back
          </button>
          <button
            className="btn-primary"
            onClick={onNext}
            disabled={!isValid}
            style={{ flex: 1, padding: '14px', fontSize: 15, opacity: isValid ? 1 : 0.4, cursor: isValid ? 'pointer' : 'not-allowed' }}
          >
            Generate Course with AI ✦
          </button>
        </div>
      </div>
    </div>
  )
}
