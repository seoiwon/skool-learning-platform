'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Message, ChatRoom, ChatMember } from '@/types/chat'
import MessageList from '@/components/chat/MessageList'
import MessageInput from '@/components/chat/MessageInput'

export default function ChatRoomPage({ params }: { params: { roomId: string } }) {
  const [room, setRoom] = useState<ChatRoom | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [members, setMembers] = useState<ChatMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    loadChatRoom()
    loadMessages()
    loadMembers()

    // Subscribe to new messages
    const messageSubscription = supabase
      .channel(`room:${params.roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${params.roomId}`
        },
        async (payload) => {
          const newMessage = payload.new as Message
          
          // Fetch user data for the new message
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', newMessage.user_id)
            .single()
          
          if (userData) {
            newMessage.user = userData
          }
          
          setMessages(prev => [...prev, newMessage])
        }
      )
      .subscribe()

    // Subscribe to member changes
    const memberSubscription = supabase
      .channel(`members:${params.roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_members',
          filter: `room_id=eq.${params.roomId}`
        },
        () => {
          loadMembers()
        }
      )
      .subscribe()

    return () => {
      messageSubscription.unsubscribe()
      memberSubscription.unsubscribe()
    }
  }, [user, params.roomId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadChatRoom = async () => {
    try {
      const { data: roomData, error: roomError } = await supabase
        .from('chat_rooms')
        .select(`
          *,
          creator:User!chat_rooms_creator_user_fkey(id, email, name)
        `)
        .eq('id', params.roomId)
        .single()

      if (roomError) throw roomError

      // Check if user is a member
      const { data: memberData } = await supabase
        .from('chat_members')
        .select('*')
        .eq('room_id', params.roomId)
        .eq('user_id', user!.id)
        .single()

      if (!memberData && roomData.type !== 'public') {
        setError('이 채팅방에 접근할 권한이 없습니다.')
        setLoading(false)
        return
      }

      // Join public room if not a member
      if (!memberData && roomData.type === 'public') {
        await supabase.rpc('join_chat_room', { p_room_id: params.roomId })
      }

      setRoom(roomData)
    } catch (error: any) {
      setError(error.message)
    }
  }

  const loadMessages = async () => {
    try {
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select(`
          *,
          user:User!messages_user_fkey(id, email, name)
        `)
        .eq('room_id', params.roomId)
        .order('created_at', { ascending: true })

      if (messagesError) throw messagesError

      setMessages(messagesData || [])
    } catch (error: any) {
      console.error('Error loading messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMembers = async () => {
    try {
      const { data: membersData, error: membersError } = await supabase
        .from('chat_members')
        .select(`
          *,
          user:User!chat_members_user_fkey(id, email, name)
        `)
        .eq('room_id', params.roomId)

      if (membersError) throw membersError

      setMembers(membersData || [])
    } catch (error: any) {
      console.error('Error loading members:', error)
    }
  }

  const sendMessage = async (content: string) => {
    if (!user || !content.trim()) return

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          room_id: params.roomId,
          user_id: user.id,
          content: content.trim()
        })

      if (error) throw error
      
      // 메시지 전송 후 수동으로 다시 로드
      await loadMessages()
    } catch (error: any) {
      console.error('Error sending message:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">오류</h1>
          <p>{error}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← 뒤로
            </button>
            <div>
              <h1 className="font-semibold text-lg">{room?.name}</h1>
              <p className="text-sm text-gray-500">
                {room?.type === 'public' && '공개 채팅방'}
                {room?.type === 'private' && '비공개 채팅방'}
                {room?.type === 'invite' && '초대 전용 채팅방'}
                {' • '}
                {members.length}명 참여 중
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <MessageList messages={messages} currentUserId={user?.id} />
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <MessageInput onSendMessage={sendMessage} />
        </div>
      </div>
    </div>
  )
}