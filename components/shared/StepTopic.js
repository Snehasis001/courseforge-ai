'use client'

export default function StepTopic({ formData, setFormData, onNext }) {
  const isValid = formData.topic.trim().length > 3

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.5px' }}>
          What do you want to teach?
        </h2>
        <p style={{ color: 'var(--text2)', fontSize: 14 }}>
          Describe your course topic and our AI will craft a full curriculum.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {/* Topic */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Course Topic <span style={{ color: 'var(--cyan)' }}>*</span>
          </label>
          <input
            className="input-styled"
            placeholder="e.g. Machine Learning for Beginners, React with TypeScript, Digital Marketing..."
            value={formData.topic}
            onChange={e => setFormData({ ...formData, topic: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && isValid && onNext()}
          />
          <p style={{ fontSize: 12, color: 'var(--text3)', marginTop: 6 }}>
            Be specific for better results — include your target audience or use case.
          </p>
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Additional Context <span style={{ color: 'var(--text3)' }}>(optional)</span>
          </label>
          <textarea
            className="input-styled"
            placeholder="Target audience, prerequisites, specific subtopics, course goals..."
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            style={{ minHeight: 100, resize: 'vertical' }}
          />
        </div>

        {/* Quick topic suggestions */}
        <div>
          <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>Quick suggestions</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              'Python for Data Science',
              'UI/UX Design Fundamentals',
              'Full Stack Web Development',
              'Digital Marketing Mastery',
              'Financial Modeling in Excel',
              'Machine Learning A-Z',
            ].map(suggestion => (
              <button
                key={suggestion}
                onClick={() => setFormData({ ...formData, topic: suggestion })}
                style={{
                  background: formData.topic === suggestion ? 'var(--cyan-dim)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${formData.topic === suggestion ? 'rgba(0,229,255,0.3)' : 'var(--border2)'}`,
                  color: formData.topic === suggestion ? 'var(--cyan)' : 'var(--text2)',
                  padding: '6px 14px',
                  borderRadius: 50,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'Outfit',
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Next button */}
        <div style={{ paddingTop: 8 }}>
          <button
            className="btn-primary"
            onClick={onNext}
            disabled={!isValid}
            style={{
              width: '100%', padding: '14px', fontSize: 15,
              opacity: isValid ? 1 : 0.4,
              cursor: isValid ? 'pointer' : 'not-allowed',
            }}
          >
            Continue → Choose Options
          </button>
        </div>
      </div>
    </div>
  )
}
