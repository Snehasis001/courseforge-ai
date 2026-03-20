'use client'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import CourseCard from '@/components/shared/CourseCard'

const SkeletonCard = () => (
  <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
    <div style={{ height: 140, background: 'linear-gradient(90deg, var(--border) 25%, rgba(255,255,255,0.06) 50%, var(--border) 75%)', backgroundSize: '200% 100%', animation: 'shimmer-skeleton 1.5s infinite' }} />
    <div style={{ padding: '18px 20px 20px' }}>
      <div style={{ height: 12, width: '40%', background: 'var(--border)', borderRadius: 6, marginBottom: 10 }} />
      <div style={{ height: 18, width: '85%', background: 'var(--surface)', borderRadius: 6, marginBottom: 6 }} />
      <div style={{ height: 18, width: '65%', background: 'var(--surface)', borderRadius: 6, marginBottom: 16 }} />
      <div style={{ height: 13, width: '90%', background: 'var(--border)', borderRadius: 6, marginBottom: 6 }} />
      <div style={{ height: 13, width: '70%', background: 'var(--border)', borderRadius: 6, marginBottom: 20 }} />
      <div style={{ height: 1, background: 'var(--border)', marginBottom: 14 }} />
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ height: 12, width: 80, background: 'var(--border)', borderRadius: 6 }} />
        <div style={{ height: 12, width: 60, background: 'var(--border)', borderRadius: 6 }} />
      </div>
    </div>
  </div>
)

const StatSkeleton = () => (
  <div className="glass-card" style={{ padding: '20px 24px' }}>
    <div style={{ width: 28, height: 28, background: 'var(--border)', borderRadius: 6, marginBottom: 12 }} />
    <div style={{ height: 32, width: 60, background: 'var(--surface)', borderRadius: 6, marginBottom: 8 }} />
    <div style={{ height: 12, width: 80, background: 'var(--border)', borderRadius: 6 }} />
  </div>
)

export default function DashboardPage() {
  const { user } = useUser()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { if (user) fetchCourses() }, [user])

  const fetchCourses = async () => {
    try {
      const res = await fetch(`/api/get-courses?createdBy=${user?.primaryEmailAddress?.emailAddress}`)
      const data = await res.json()
      setCourses(data.courses || [])
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const totalChapters = courses.reduce((a, c) => {
    try { return a + (JSON.parse(c.courseOutput || '{}').chapters?.length || 0) } catch { return a }
  }, 0)

  const greeting = user?.firstName
    ? `Hey, ${user.firstName} 👋`
    : user?.primaryEmailAddress?.emailAddress
      ? `Hey, ${user.primaryEmailAddress.emailAddress.split('@')[0]} 👋`
      : 'Welcome back 👋'

  return (
    <div>
      <style>{`
        @keyframes shimmer-skeleton {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
        <div>
          <p style={{ color: 'var(--text3)', fontSize: 13, marginBottom: 4, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500 }}>Dashboard</p>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, letterSpacing: '-1px', lineHeight: 1.1 }}>{greeting}</h1>
          {!loading && (
            <p style={{ color: 'var(--text2)', marginTop: 6, fontSize: 14 }}>
              {courses.length > 0 ? `You have ${courses.length} course${courses.length > 1 ? 's' : ''} generated.` : "Let's build your first AI course!"}
            </p>
          )}
        </div>
        <Link href="/create-course">
          <button className="btn-primary" style={{ padding: '12px 28px', fontSize: 14 }}>+ Create New Course</button>
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 16, marginBottom: 40 }}>
        {loading ? (
          [1,2,3,4].map(i => <StatSkeleton key={i} />)
        ) : (
          [
            { label: 'Total Courses', value: courses.length, icon: '📚' },
            { label: 'Total Chapters', value: totalChapters, icon: '📖' },
            { label: 'Published', value: courses.filter(c => c.publish).length, icon: '🚀' },
            { label: 'Drafts', value: courses.filter(c => !c.publish).length, icon: '✏️' },
          ].map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: '20px 24px' }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontSize: 30, fontWeight: 700, color: 'var(--cyan)', letterSpacing: '-1px', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 6 }}>{s.label}</div>
            </div>
          ))
        )}
      </div>

      {/* Courses */}
      {loading ? (
        <div>
          <div style={{ height: 24, width: 140, background: 'var(--border)', borderRadius: 6, marginBottom: 20 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {[1,2,3].map(i => <SkeletonCard key={i} />)}
          </div>
        </div>
      ) : courses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🎓</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>No courses yet</h2>
          <p style={{ color: 'var(--text2)', marginBottom: 32, fontSize: 15 }}>Generate your first AI-powered course in under 2 minutes.</p>
          <Link href="/create-course">
            <button className="btn-primary" style={{ padding: '14px 36px', fontSize: 15 }}>✦ Generate Your First Course</button>
          </Link>
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, letterSpacing: '-0.3px' }}>My Courses</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {courses.map((course, i) => (
              <CourseCard key={course.courseId || i} course={course} onRefresh={fetchCourses} />
            ))}
            <Link href="/create-course" style={{ textDecoration: 'none' }}>
              <div style={{ border: '2px dashed var(--border2)', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 40, cursor: 'pointer', minHeight: 280, transition: 'all 0.3s' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.background = 'var(--cyan-dim)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.background = 'transparent' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: 'var(--text3)' }}>+</div>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text3)' }}>Generate New Course</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
