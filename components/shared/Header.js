'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { user } = useUser()
  const pathname = usePathname()

  const getTitle = () => {
    if (pathname.includes('create-course')) return 'Create Course'
    if (pathname.includes('course-preview')) return 'Course Preview'
    return 'Dashboard'
  }

  return (
    <header style={{
      position: 'fixed', top: 0, right: 0, left: 260,
      zIndex: 50, height: 72,
      background: 'rgba(8,12,18,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px',
    }}>
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.5px' }}>{getTitle()}</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link href="/create-course">
          <button className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}>
            + New Course
          </button>
        </Link>
        <div style={{ width: 1, height: 24, background: 'var(--border2)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{user?.firstName} {user?.lastName}</p>
            <p style={{ fontSize: 11, color: 'var(--text3)' }}>{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <UserButton
            appearance={{
              elements: {
                avatarBox: { width: 36, height: 36 }
              }
            }}
          />
        </div>
      </div>
    </header>
  )
}
