import { db } from '@/config/db'
import { CourseList } from '@/config/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get('courseId')
    if (!courseId) return NextResponse.json({ error: 'courseId required' }, { status: 400 })
    await db.delete(CourseList).where(eq(CourseList.courseId, courseId))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
