import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const path = request.nextUrl.searchParams.get('path') || '/news'
  revalidatePath(path)
  return NextResponse.json({ revalidated: true, now: Date.now() })
} 