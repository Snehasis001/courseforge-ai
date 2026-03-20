'use client'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import CourseCard from '@/components/shared/CourseCard'

export default function DashboardPage() {
  const { user } = useUser()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchCourses()
  }, [user])

  const fetchCourses = async () => {
    try {
      const res = await fetch(`/api/get-courses?createdBy=${user?.primaryEmailAddress?.emailAddress}`)
      const data = await res.json()
      setCourses(data.courses || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Welcome header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ color: 'var(--text3)', fontSize: 14, marginBottom: 6, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500 }}>Welcome back</p>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-1px', lineHeight: 1.1 }}>
              {user?.firstName ? `Hey, ${user.firstName} 👋` : 'Your Dashboard'}
            </h1>
            <p style={{ color: 'var(--text2)', marginTop: 8, fontSize: 15 }}>
              {courses.length > 0 ? `You have ${courses.length} course${courses.length > 1 ? 's' : ''} generated.` : "Let's build your first AI course!"}
            </p>
          </div>
          <Link href="/create-course">
            <button className="btn-primary" style={{ padding: '12px 28px', fontSize: 15 }}>
              + Create New Course
            </button>
          </Link>
        </div>
      </div>

      {/* Stats row */}
      {courses.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { label: 'Total Courses', value: courses.length, icon: '📚' },
            { label: 'Total Chapters', value: courses.reduce((a, c) => a + (JSON.parse(c.courseOutput || '{}').chapters?.length || 0), 0), icon: '📖' },
            { label: 'Published', value: courses.filter(c => c.publish).length, icon: '🚀' },
            { label: 'Draft', value: courses.filter(c => !c.publish).length, icon: '✏️' },
          ].map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: '20px 24px' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--cyan)', letterSpacing: '-1px' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Courses grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: 280, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ height: 140, background: 'var(--border)', animation: 'pulse 2s infinite' }} />
              <div style={{ padding: 20 }}>
                <div style={{ height: 20, width: '70%', background: 'var(--border)', borderRadius: 6, marginBottom: 10 }} />
                <div style={{ height: 14, width: '90%', background: 'var(--surface)', borderRadius: 6 }} />
              </div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🎓</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 10 }}>No courses yet</h2>
          <p style={{ color: 'var(--text2)', marginBottom: 32, fontSize: 15 }}>Generate your first AI-powered course in under 2 minutes.</p>
          <Link href="/create-course">
            <button className="btn-primary" style={{ padding: '14px 36px', fontSize: 16 }}>
              ✦ Generate Your First Course
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, letterSpacing: '-0.5px' }}>My Courses</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {courses.map((course, i) => (
              <CourseCard key={course.id || i} course={course} onRefresh={fetchCourses} />
            ))}
            {/* Add new card */}
            <Link href="/create-course">
              <div style={{ border: '2px dashed var(--border2)', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 40, cursor: 'pointer', minHeight: 280, transition: 'all 0.3s', textDecoration: 'none' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.background = 'var(--cyan-dim)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.background = 'transparent' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: 'var(--text3)' }}>+</div>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text3)' }}>Generate New Course</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
