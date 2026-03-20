'use client'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import StepTopic from '@/components/shared/StepTopic'
import StepOptions from '@/components/shared/StepOptions'
import StepGenerating from '@/components/shared/StepGenerating'

const STEPS = ['Topic', 'Options', 'Generate']

export default function CreateCoursePage() {
  const { user } = useUser()
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    category: '',
    level: '',
    duration: '',
    noOfChapters: 5,
    includeVideo: 'Yes',
  })

  const handleNext = () => setStep(s => Math.min(s + 1, 2))
  const handleBack = () => setStep(s => Math.max(s - 1, 0))

  const progress = ((step) / (STEPS.length - 1)) * 100

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      {/* Back button */}
      <button onClick={() => router.push('/dashboard')} style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 36, fontSize: 14, fontFamily: 'Outfit' }}>
        ← Back to dashboard
      </button>

      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <span className="tag-badge" style={{ marginBottom: 14, display: 'inline-flex' }}>AI Course Builder</span>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 8 }}>
          Create Your <span className="grad-text">AI Course</span>
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: 15 }}>Fill in the details and let Gemini AI build the perfect curriculum for you.</p>
      </div>

      {/* Step indicator */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                border: `2px solid ${i <= step ? 'var(--cyan)' : 'var(--border2)'}`,
                background: i < step ? 'var(--cyan)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700,
                color: i < step ? '#000' : i === step ? 'var(--cyan)' : 'var(--text3)',
                transition: 'all 0.3s',
              }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: i === step ? 'var(--text)' : 'var(--text3)' }}>{s}</span>
            </div>
          ))}
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step content */}
      <div className="glass-card" style={{ padding: '36px' }}>
        {step === 0 && (
          <StepTopic formData={formData} setFormData={setFormData} onNext={handleNext} />
        )}
        {step === 1 && (
          <StepOptions formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />
        )}
        {step === 2 && (
          <StepGenerating formData={formData} user={user} onBack={handleBack} />
        )}
      </div>
    </div>
  )
}
