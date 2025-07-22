import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        }
      }
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Get public rooms and rooms where user is a member
  let query = supabase
    .from('chat_rooms')
    .select(`
      *,
      creator:User!chat_rooms_creator_id_fkey(id, email, name),
      chat_members!inner(user_id, is_creator)
    `)
    .order('created_at', { ascending: false })

  // Filter to show public rooms or rooms where user is a member
  if (user) {
    query = query.or(`type.eq.public,chat_members.user_id.eq.${user.id}`)
  } else {
    query = query.eq('type', 'public')
  }

  const { data: rooms, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Process rooms to add metadata
  const processedRooms = rooms?.map(room => {
    const isMember = user ? room.chat_members.some((m: any) => m.user_id === user.id) : false
    const isCreator = user ? room.chat_members.some((m: any) => m.user_id === user.id && m.is_creator) : false
    
    return {
      ...room,
      is_member: isMember,
      is_creator: isCreator,
      chat_members: undefined // Remove raw member data
    }
  })

  return NextResponse.json({ rooms: processedRooms || [] })
}