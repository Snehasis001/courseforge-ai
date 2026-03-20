'use client'
import { useState } from 'react'

const DOCS = [
  {
    category: '🚀 Getting Started', items: [
      { title: 'What is CourseForge AI?', content: `CourseForge AI is a full-stack web application that lets you generate complete online courses using Google Gemini AI.\n\nSimply enter a topic, choose your preferences, and our AI will create:\n• A structured course title and description\n• Multiple chapters with summaries\n• Key topics for each chapter\n• YouTube video suggestions\n• AI-generated key takeaways\n\nAll courses are saved to your dashboard and can be published for others to discover.` },
      { title: 'Creating Your First Course', content: `1. Click "Create Course" in the sidebar or the "+ New Course" button\n\n2. Step 1 — Topic: Enter your course topic. Be specific for better results.\n   Example: "React Hooks for Beginners" vs just "React"\n\n3. Step 2 — Options: Choose:\n   • Category (Programming, Business, Design, etc.)\n   • Difficulty Level (Beginner / Intermediate / Advanced)\n   • Duration (1 Hour to 10+ Hours)\n   • Number of Chapters (3 to 15)\n   • Include YouTube Videos (Yes / No)\n\n4. Step 3 — Generate: The AI will build your course in 10-15 seconds.\n\n5. Review your course and click "Publish Course" to make it public.` },
      { title: 'Opening Chapters', content: `From the Course Preview page, click any chapter card to open it.\n\nEach chapter page includes:\n• Chapter title and description\n• YouTube tutorial video (auto-matched)\n• 3 key takeaways (AI-generated, concise)\n• All topics covered\n• Previous / Next navigation\n• Chapter progress tracker in the sidebar\n\nClick "▶ Start Learning" on the course page to begin from Chapter 1.` },
    ]
  },
  {
    category: '🧠 AI Generation', items: [
      { title: 'How Gemini AI Works', content: `CourseForge AI uses Google Gemini 2.5 Flash to generate course content.\n\nFor course outlines, we send Gemini:\n• Your topic and description\n• Category, level, duration preferences\n• Number of chapters requested\n\nGemini returns structured JSON with course name, description, and all chapter details.\n\nFor chapter notes, we ask Gemini to generate 3 concise key takeaways and a one-line summary — keeping it focused and easy to read.` },
      { title: 'YouTube Video Matching', content: `When you open a chapter, the app:\n\n1. Asks Gemini to suggest the best YouTube search query for this chapter\n2. Calls the YouTube Data API v3 to find the most relevant video\n3. Shows the video with a thumbnail preview\n4. Click the thumbnail to play the video inline\n\nRequires YOUTUBE_API_KEY in your .env.local file.\n\nIf no video is found, the section shows a placeholder. You can refresh by clicking the "↺ Refresh" button.` },
      { title: 'Generation Tips', content: `For best results:\n\n✦ Be specific with your topic\n   Good: "Python Data Analysis with Pandas"\n   Less good: "Python"\n\n✦ Add context in the description field\n   Example: "For data analysts switching from Excel"\n\n✦ Match duration to chapter count\n   5 chapters → 1-3 hours is ideal\n   10+ chapters → 5+ hours works better\n\n✦ Use the right category\n   This affects how YouTube videos are matched\n\n✦ Avoid regenerating if the first result is good\n   Each generation uses API quota` },
    ]
  },
  {
    category: '🗄️ Database & Storage', items: [
      { title: 'How Data is Stored', content: `CourseForge AI uses PostgreSQL (via Supabase or NeonDB) with Drizzle ORM.\n\nThe courseList table stores:\n• courseId — unique UUID for each course\n• name — course title\n• category, level, duration — metadata\n• createdBy — user's email address\n• courseOutput — full JSON from Gemini (chapters, description, etc.)\n• publish — boolean (true = visible in Explore)\n• includeVideo — whether videos are enabled\n\nAll courses are tied to the authenticated user's email.` },
      { title: 'Publishing Courses', content: `By default, all generated courses are saved as drafts (publish: false).\n\nTo publish:\n1. Open a course from your Dashboard\n2. Click "🚀 Publish Course" in the banner\n3. The course will appear in the Explore page\n\nPublished courses show a "✓ Live" badge on your Dashboard.\n\nNote: Publishing is permanent in the current version. A future update will add unpublish functionality.` },
    ]
  },
  {
    category: '⚙️ Configuration', items: [
      { title: 'Environment Variables', content: `Your .env.local file needs these keys:\n\n# Clerk Authentication\nNEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...\nCLERK_SECRET_KEY=sk_...\nNEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in\nNEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up\n\n# Database\nDATABASE_URL=postgresql://...\n\n# AI\nGEMINI_API_KEY=AIza...\n\n# YouTube\nYOUTUBE_API_KEY=AIza...\n\n# Firebase (optional, for image storage)\nFIREBASE_API_KEY=AIza...\nFIREBASE_PROJECT_ID=...` },
      { title: 'Tech Stack', content: `Frontend:\n• Next.js 15 (App Router)\n• React 18\n• Tailwind CSS v4\n• Custom CSS variables for theming\n\nBackend (API Routes):\n• Next.js API Routes\n• Drizzle ORM\n• postgres driver\n\nAI & APIs:\n• Google Gemini 2.5 Flash\n• YouTube Data API v3\n\nAuth:\n• Clerk (JWT-based, middleware protection)\n\nDatabase:\n• PostgreSQL via Supabase or NeonDB\n\nDeployment:\n• Vercel (recommended)` },
    ]
  },
]

export default function DocsPage() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [activeItem, setActiveItem] = useState(0)
  const [search, setSearch] = useState('')

  const allItems = DOCS.flatMap((d, ci) => d.items.map((item, ii) => ({ ...item, ci, ii, category: d.category })))
  const searchResults = search ? allItems.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.content.toLowerCase().includes(search.toLowerCase())) : []

  const current = DOCS[activeCategory]?.items[activeItem]

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <span style={{ fontSize: 11, color: 'var(--text3)', letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>Help Center</span>
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-1px', marginTop: 6, marginBottom: 16 }}>Documentation</h1>
        <div style={{ position: 'relative', maxWidth: 400 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: 'var(--text3)' }}>🔍</span>
          <input className="input-styled" placeholder="Search docs..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 42 }} />
        </div>
        {search && (
          <div style={{ marginTop: 8, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', maxWidth: 400 }}>
            {searchResults.length === 0 ? (
              <p style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text3)' }}>No results found</p>
            ) : searchResults.map((r, i) => (
              <button key={i} onClick={() => { setActiveCategory(r.ci); setActiveItem(r.ii); setSearch('') }}
                style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, padding: '10px 16px', background: 'none', border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer', textAlign: 'left', fontFamily: 'Outfit' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{r.title}</span>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>{r.category}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24 }}>
        {/* Sidebar */}
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', height: 'fit-content', position: 'sticky', top: 100 }}>
          {DOCS.map((doc, ci) => (
            <div key={ci}>
              <div style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: 'var(--text3)', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)', letterSpacing: 0.5 }}>
                {doc.category}
              </div>
              {doc.items.map((item, ii) => (
                <button key={ii} onClick={() => { setActiveCategory(ci); setActiveItem(ii); setSearch('') }}
                  style={{ width: '100%', display: 'block', padding: '10px 16px', background: ci === activeCategory && ii === activeItem ? 'var(--cyan-dim)' : 'transparent', border: 'none', borderLeft: `3px solid ${ci === activeCategory && ii === activeItem ? 'var(--cyan)' : 'transparent'}`, borderBottom: '1px solid var(--border)', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: ci === activeCategory && ii === activeItem ? 600 : 400, color: ci === activeCategory && ii === activeItem ? 'var(--cyan)' : 'var(--text2)', fontFamily: 'Outfit', transition: 'all 0.15s' }}
                  onMouseOver={e => { if (!(ci === activeCategory && ii === activeItem)) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                  onMouseOut={e => { if (!(ci === activeCategory && ii === activeItem)) e.currentTarget.style.background = 'transparent' }}>
                  {item.title}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Content */}
        {current && (
          <div className="glass-card" style={{ padding: '36px 40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--cyan)', fontFamily: 'monospace', letterSpacing: 1 }}>{DOCS[activeCategory].category}</span>
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 28, lineHeight: 1.2 }}>{current.title}</h2>
            <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.9, whiteSpace: 'pre-wrap', fontFamily: 'Outfit' }}>
              {current.content.split('\n').map((line, i) => {
                if (line.startsWith('•') || line.startsWith('✦')) {
                  return <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 6 }}><span style={{ color: 'var(--cyan)', flexShrink: 0 }}>{line[0]}</span><span>{line.slice(2)}</span></div>
                }
                if (/^\d+\./.test(line)) {
                  return <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}><span style={{ color: 'var(--cyan)', fontWeight: 700, flexShrink: 0, fontFamily: 'monospace' }}>{line.match(/^\d+/)[0]}.</span><span>{line.replace(/^\d+\.\s*/, '')}</span></div>
                }
                if (line.startsWith('#')) {
                  return <div key={i} style={{ fontSize: 13, fontFamily: 'monospace', background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.15)', borderRadius: 6, padding: '2px 10px', display: 'inline-block', color: 'var(--cyan)', marginBottom: 4 }}>{line}</div>
                }
                if (line === '') return <div key={i} style={{ height: 10 }} />
                return <p key={i} style={{ marginBottom: 4 }}>{line}</p>
              })}
            </div>
            <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => { if (activeItem > 0) setActiveItem(ai => ai - 1); else if (activeCategory > 0) { setActiveCategory(ac => ac - 1); setActiveItem(DOCS[activeCategory - 1].items.length - 1) } }}
                disabled={activeCategory === 0 && activeItem === 0}
                style={{ background: 'none', border: '1px solid var(--border2)', borderRadius: 8, padding: '8px 16px', color: 'var(--text2)', cursor: 'pointer', fontSize: 13, fontFamily: 'Outfit', opacity: activeCategory === 0 && activeItem === 0 ? 0.4 : 1 }}>
                ← Previous
              </button>
              <button onClick={() => { const lastCat = DOCS.length - 1; const lastItem = DOCS[activeCategory].items.length - 1; if (activeItem < lastItem) setActiveItem(ai => ai + 1); else if (activeCategory < lastCat) { setActiveCategory(ac => ac + 1); setActiveItem(0) } }}
                disabled={activeCategory === DOCS.length - 1 && activeItem === DOCS[activeCategory].items.length - 1}
                className="btn-primary" style={{ padding: '8px 20px', fontSize: 13, opacity: activeCategory === DOCS.length - 1 && activeItem === DOCS[activeCategory].items.length - 1 ? 0.4 : 1 }}>
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
