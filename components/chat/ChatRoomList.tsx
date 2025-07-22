'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ChatRoom } from '@/types/chat'
import { useAuth } from '@/contexts/AuthContext'

export default function ChatRoomList() {
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    loadChatRooms()
  }, [user])

  const loadChatRooms = async () => {
    try {
      // Get public rooms and rooms where user is a member
      let query = supabase
        .from('chat_rooms')
        .select(`
          *,
          creator:User!chat_rooms_creator_user_fkey(id, email, name),
          chat_members!inner(user_id, is_creator)
        `)
        .order('created_at', { ascending: false })

      const { data: allRooms, error } = await query

      if (error) throw error

      // 각 방에 대해 추가 정보 가져오기
      const processedRooms = []
      for (const room of allRooms || []) {
        // 생성자 정보 가져오기
        const { data: creator } = await supabase
          .from('User')
          .select('id, email, name')
          .eq('id', room.creator_id)
          .single()

        // 멤버 정보 가져오기
        const { data: members } = await supabase
          .from('chat_members')
          .select('user_id, is_creator')
          .eq('room_id', room.id)

        const isMember = user ? members?.some(m => m.user_id === user.id) : false
        const isCreator = user ? members?.some(m => m.user_id === user.id && m.is_creator) : false
        const canView = room.type === 'public' || isMember

        if (canView) {
          processedRooms.push({
            ...room,
            creator,
            is_member: isMember,
            is_creator: isCreator,
            member_count: members?.length || 0
          })
        }
      }

      // Sort rooms: user's rooms first (creator or invited), then others
      const sortedRooms = processedRooms.sort((a, b) => {
        // Get user preference from localStorage
        const userRooms = JSON.parse(localStorage.getItem('userChatRooms') || '[]')
        const aIsUserRoom = a.is_member || userRooms.includes(a.id)
        const bIsUserRoom = b.is_member || userRooms.includes(b.id)

        if (aIsUserRoom && !bIsUserRoom) return -1
        if (!aIsUserRoom && bIsUserRoom) return 1
        
        // Both are user rooms or both are not, sort by creation date
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })

      setRooms(sortedRooms)
    } catch (error: any) {
      console.error('Error loading chat rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  const joinRoom = (roomId: string) => {
    // Save to localStorage to track user's rooms
    const userRooms = JSON.parse(localStorage.getItem('userChatRooms') || '[]')
    if (!userRooms.includes(roomId)) {
      userRooms.push(roomId)
      localStorage.setItem('userChatRooms', JSON.stringify(userRooms))
    }
    
    router.push(`/chat/${roomId}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">채팅방 목록</h2>
      
      {rooms.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          채팅방이 없습니다. 새로운 채팅방을 만들어보세요!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
            {rooms.map((room) => {
              const isUserRoom = room.is_member
              const userRooms = JSON.parse(localStorage.getItem('userChatRooms') || '[]')
              const isTrackedRoom = userRooms.includes(room.id)
              const shouldHighlight = isUserRoom || isTrackedRoom

              return (
                <div
                  key={room.id}
                  className={`flex-shrink-0 w-64 p-4 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg ${
                    shouldHighlight
                      ? 'bg-green-50 border-2 border-green-300'
                      : 'bg-white border border-gray-200'
                  }`}
                  onClick={() => joinRoom(room.id)}
                >
                  {/* Badge for user's rooms */}
                  {shouldHighlight && (
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 text-xs bg-green-500 text-white rounded-full">
                        나의채팅방
                      </span>
                    </div>
                  )}

                  {/* Room name */}
                  <h3 className="font-semibold text-lg mb-2 truncate">
                    {room.name || `${room.creator?.name || room.creator?.email}의 채팅방`}
                  </h3>

                  {/* Room type */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      room.type === 'public' ? 'bg-blue-100 text-blue-800' :
                      room.type === 'private' ? 'bg-gray-100 text-gray-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {room.type === 'public' && '공개'}
                      {room.type === 'private' && '비공개'}
                      {room.type === 'invite' && '초대전용'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {room.member_count}명 참여
                    </span>
                  </div>

                  {/* Creator info */}
                  <p className="text-sm text-gray-600 mb-2">
                    생성자: {room.creator?.name || room.creator?.email}
                  </p>

                  {/* Last message or created time */}
                  {room.last_message ? (
                    <p className="text-sm text-gray-500 truncate">
                      최근: {room.last_message.content}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">
                      {new Date(room.created_at).toLocaleDateString('ko-KR')}에 생성
                    </p>
                  )}

                  {/* Join button for non-members */}
                  {!room.is_member && room.type === 'public' && (
                    <div className="mt-3">
                      <span className="text-xs text-blue-600">클릭하여 참여하기</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}