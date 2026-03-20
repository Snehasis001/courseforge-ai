import { db } from '@/config/db'
import { CourseList } from '@/config/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const createdBy = searchParams.get('createdBy')
    const courseId = searchParams.get('courseId')

    if (courseId) {
      const result = await db.select().from(CourseList).where(eq(CourseList.courseId, courseId))
      return NextResponse.json({ course: result[0] || null })
    }

    if (createdBy) {
      const result = await db.select().from(CourseList).where(eq(CourseList.createdBy, createdBy))
      return NextResponse.json({ courses: result })
    }

    // Get all published courses for explore
    const result = await db.select().from(CourseList).where(eq(CourseList.publish, true))
    return NextResponse.json({ courses: result })
  } catch (error) {
    console.error('Get courses error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
