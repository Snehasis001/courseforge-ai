import { NextResponse } from 'next/server'
import { db } from '@/config/db'
import { CourseList } from '@/config/schema'
import { eq } from 'drizzle-orm'

export async function POST(req) {
  try {
    const {
      courseId, name, category, level,
      includeVideo, createdBy, courseOutput,
      publish, duration,
    } = await req.json()

    const result = await db.insert(CourseList).values({
      courseId,
      name: name || courseOutput?.courseName,
      category,
      level,
      includeVideo: includeVideo || 'Yes',
      createdBy,
      courseOutput: typeof courseOutput === 'string'
        ? courseOutput
        : JSON.stringify(courseOutput),
      publish: publish || false,
      duration: duration || courseOutput?.duration || '',
    }).returning()

    return NextResponse.json({ course: result[0] })
  } catch (error) {
    console.error('Save course error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(req) {
  try {
    const { courseId, publish } = await req.json()
    const result = await db.update(CourseList)
      .set({ publish })
      .where(eq(CourseList.courseId, courseId))
      .returning()
    return NextResponse.json({ course: result[0] })
  } catch (error) {
    console.error('Update course error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}