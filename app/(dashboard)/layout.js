import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 260 }}>
        <Header />
        <main style={{ flex: 1, padding: '32px', paddingTop: '100px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
