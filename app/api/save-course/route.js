export async function POST(req) {
  try {
    const {
      courseId,
      name,
      category,
      level,
      includeVideo,
      createdBy,
      courseOutput,
      publish,
      duration
    } = await req.json()

    const result = await db.insert(CourseList).values({
      courseId,
      name: name || courseOutput?.courseName,
      category,
      level,
      includeVideo: includeVideo === true || includeVideo === "Yes",
      createdBy,
      courseOutput:
        typeof courseOutput === 'string'
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