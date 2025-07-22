'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export default function InvitePage({ params }: { params: { token: string } }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [invitation, setInvitation] = useState<any>(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    checkInvitation()
  }, [user])

  const checkInvitation = async () => {
    try {
      // Get invitation details
      const { data: invite, error: inviteError } = await supabase
        .from('chat_invitations')
        .select(`
          *,
          room:chat_rooms(id, name, type),
          inviter:User!chat_invitations_invited_by_fkey(email, name)
        `)
        .eq('token', params.token)
        .single()

      if (inviteError || !invite) {
        setError('초대 링크가 유효하지 않습니다.')
        setLoading(false)
        return
      }

      setInvitation(invite)

      // If user is logged in and email matches, accept invitation
      if (user && user.email === invite.email) {
        await acceptInvitation()
      } else {
        setLoading(false)
      }
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  const acceptInvitation = async () => {
    if (!invitation) return

    try {
      // Accept invitation using the database function
      const { data, error } = await supabase.rpc('accept_invitation', {
        p_token: params.token
      })

      if (error) throw error

      if (data) {
        // Redirect to chat room
        router.push(`/chat/${invitation.room_id}`)
      } else {
        setError('초대를 수락할 수 없습니다.')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignupAndAccept = () => {
    // Redirect to signup with the invite token
    router.push(`/auth/signup?invite=${params.token}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">초대 확인 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  if (!user || user.email !== invitation?.email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">채팅방 초대</h1>
          <p className="mb-4">
            <strong>{invitation?.inviter?.name || invitation?.inviter?.email}</strong>님이 
            <strong> {invitation?.room?.name}</strong> 채팅방에 초대했습니다.
          </p>
          
          {!user ? (
            <div>
              <p className="mb-4 text-gray-600">
                채팅방에 참여하려면 회원가입이 필요합니다.
              </p>
              <button
                onClick={handleSignupAndAccept}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                회원가입하고 참여하기
              </button>
            </div>
          ) : (
            <div>
              <p className="mb-4 text-red-500">
                이 초대는 {invitation?.email} 이메일로 발송되었습니다.
                현재 로그인한 계정과 일치하지 않습니다.
              </p>
              <button
                onClick={() => router.push('/')}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                홈으로 돌아가기
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}