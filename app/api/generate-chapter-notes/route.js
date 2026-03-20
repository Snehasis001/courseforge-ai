import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(req) {
  try {
    const { chapterName, chapterAbout, topics, courseName, level } = await req.json()

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const prompt = `You are a concise educator. Return ONLY valid JSON, no markdown, no backticks.

Chapter: ${chapterName}
Course: ${courseName}
Level: ${level}
Topics: ${topics?.join(', ')}

Return exactly this JSON:
{
  "keyPoints": [
    "One sharp, clear insight about this chapter (max 15 words)",
    "Second key takeaway or concept (max 15 words)",
    "Third practical tip or important fact (max 15 words)"
  ],
  "summary": "One sentence summary of what this chapter teaches (max 20 words)",
  "youtubeQuery": "best search query to find a YouTube tutorial video for this chapter topic (5-8 words)"
}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const parsed = JSON.parse(clean)

    // Fetch YouTube video
    let video = null
    try {
      const ytRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(parsed.youtubeQuery)}&type=video&maxResults=1&videoDuration=medium&relevanceLanguage=en&key=${process.env.YOUTUBE_API_KEY}`
      )
      const ytData = await ytRes.json()
      if (ytData.items && ytData.items.length > 0) {
        const item = ytData.items[0]
        video = {
          videoId: item.id.videoId,
          title: item.snippet.title,
          channel: item.snippet.channelTitle,
          thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        }
      }
    } catch (ytErr) {
      console.error('YouTube API error:', ytErr)
    }

    return NextResponse.json({
      keyPoints: parsed.keyPoints,
      summary: parsed.summary,
      youtubeQuery: parsed.youtubeQuery,
      video,
    })
  } catch (error) {
    console.error('Chapter notes error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
