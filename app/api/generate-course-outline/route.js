import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(req) {
  try {
    const { topic, description, category, level, duration, noOfChapters, includeVideo } = await req.json()

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `Generate a comprehensive online course outline for the following details.
Return ONLY valid JSON, no markdown, no backticks, no explanation.

Topic: ${topic}
${description ? `Description: ${description}` : ''}
Category: ${category}
Difficulty Level: ${level}
Course Duration: ${duration}
Number of Chapters: ${noOfChapters}
Include Video: ${includeVideo}

Return this exact JSON structure:
{
  "topic": "${topic}",
  "courseName": "Compelling course title",
  "description": "2-3 sentence course description",
  "category": "${category}",
  "level": "${level}",
  "duration": "${duration}",
  "noOfChapters": ${noOfChapters},
  "includeVideo": "${includeVideo}",
  "chapters": [
    {
      "chapterName": "Chapter title",
      "about": "2-sentence chapter description",
      "duration": "e.g. 1h 30m",
      "topics": ["topic1", "topic2", "topic3"]
    }
  ]
}

Generate exactly ${noOfChapters} chapters. Make them progressive and comprehensive.`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    // Clean up response - strip markdown if present
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const courseOutput = JSON.parse(clean)

    return NextResponse.json({ courseOutput })
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
