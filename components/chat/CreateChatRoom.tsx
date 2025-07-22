'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ChatRoomType } from '@/types/chat'
import { useAuth } from '@/contexts/AuthContext'
import InvitationLinks from './InvitationLinks'

export default function CreateChatRoom() {
  const [isOpen, setIsOpen] = useState(false)
  const [roomType, setRoomType] = useState<ChatRoomType>('public')
  const [roomName, setRoomName] = useState('')
  const [inviteEmails, setInviteEmails] = useState<string[]>([''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showInviteLinks, setShowInviteLinks] = useState(false)
  const [generatedInvitations, setGeneratedInvitations] = useState<Array<{email: string, token: string}>>([])
  const [createdRoomId, setCreatedRoomId] = useState<string>('')
  const { user } = useAuth()
  const router = useRouter()

  const handleAddEmail = () => {
    setInviteEmails([...inviteEmails, ''])
  }

  const handleRemoveEmail = (index: number) => {
    setInviteEmails(inviteEmails.filter((_, i) => i !== index))
  }

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...inviteEmails]
    newEmails[index] = value
    setInviteEmails(newEmails)
  }

  const handleCreateRoom = async () => {
    if (!user) {
      setError('로그인이 필요합니다.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Create chat room
      const { data: room, error: roomError } = await supabase
        .from('chat_rooms')
        .insert({
          creator_id: user.id,
          type: roomType,
          name: roomName || `${user.email}의 채팅방`
        })
        .select()
        .single()

      if (roomError) throw roomError

      setCreatedRoomId(room.id)

      // Add creator as member
      const { error: memberError } = await supabase
        .from('chat_members')
        .insert({
          room_id: room.id,
          user_id: user.id,
          is_creator: true
        })

      if (memberError) throw memberError

      // Send invitations if it's an invite-only room
      if (roomType === 'invite' && inviteEmails.length > 0) {
        const validEmails = inviteEmails.filter(email => email.trim() !== '')
        
        if (validEmails.length > 0) {
          const invitations = validEmails.map(email => ({
            room_id: room.id,
            email: email.trim(),
            invited_by: user.id
          }))

          const { data: insertedInvitations, error: inviteError } = await supabase
            .from('chat_invitations')
            .insert(invitations)
            .select()

          if (inviteError) throw inviteError

          // Generate invitation links for sharing
          if (insertedInvitations) {
            const invitations = insertedInvitations.map(invitation => ({
              email: invitation.email,
              token: invitation.token
            }))
            
            setGeneratedInvitations(invitations)
            setShowInviteLinks(true)
          }
        }
      }

      // Navigate to the chat room (only if no invitations to show)
      if (roomType !== 'invite' || inviteEmails.filter(email => email.trim()).length === 0) {
        router.push(`/chat/${room.id}`)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInviteLinksClose = () => {
    setShowInviteLinks(false)
    setGeneratedInvitations([])
    // Navigate to the chat room after closing invite links
    if (createdRoomId) {
      router.push(`/chat/${createdRoomId}`)
    }
  }

  return (
    <div className="mb-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          상담하기
        </button>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
          <h3 className="text-lg font-bold mb-4">채팅방 만들기</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">채팅방 이름</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="채팅방 이름 (선택사항)"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">공개 설정</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="public"
                  checked={roomType === 'public'}
                  onChange={(e) => setRoomType(e.target.value as ChatRoomType)}
                  className="mr-2"
                />
                <span>공개 - 누구나 입장 가능</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="private"
                  checked={roomType === 'private'}
                  onChange={(e) => setRoomType(e.target.value as ChatRoomType)}
                  className="mr-2"
                />
                <span>비공개 - 나만 입장 가능</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="invite"
                  checked={roomType === 'invite'}
                  onChange={(e) => setRoomType(e.target.value as ChatRoomType)}
                  className="mr-2"
                />
                <span>친구초대 - 초대한 사람만 입장 가능</span>
              </label>
            </div>
          </div>

          {roomType === 'invite' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">초대할 이메일</label>
              {inviteEmails.map((email, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="friend@email.com"
                  />
                  <button
                    onClick={() => handleRemoveEmail(index)}
                    className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    disabled={inviteEmails.length === 1}
                  >
                    -
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddEmail}
                className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                + 이메일 추가
              </button>
            </div>
          )}

          {error && (
            <div className="mb-4 text-red-500 text-sm">{error}</div>
          )}

          <div className="flex space-x-2">
            <button
              onClick={handleCreateRoom}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '생성중...' : '상담하기'}
            </button>
            <button
              onClick={() => {
                setIsOpen(false)
                setRoomType('public')
                setRoomName('')
                setInviteEmails([''])
                setError(null)
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* Invitation Links Modal */}
      {showInviteLinks && (
        <InvitationLinks
          invitations={generatedInvitations}
          onClose={handleInviteLinksClose}
        />
      )}
    </div>
  )
}