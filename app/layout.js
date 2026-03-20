import { ClerkProvider } from '@clerk/nextjs'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata = {
  title: 'CourseForge AI — Generate Complete Courses with AI',
  description: 'Transform any topic into a structured professional online course using Google Gemini AI. Generate chapters, descriptions, and quizzes instantly.',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
