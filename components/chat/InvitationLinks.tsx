'use client'

import { useState } from 'react'

interface InvitationLinksProps {
  invitations: Array<{
    email: string
    token: string
  }>
  onClose: () => void
}

export default function InvitationLinks({ invitations, onClose }: InvitationLinksProps) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null)

  const copyToClipboard = async (text: string, token: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedToken(token)
      setTimeout(() => setCopiedToken(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">초대 링크 생성 완료</h3>
        <p className="text-sm text-gray-600 mb-4">
          아래 링크들을 각각 해당 친구들에게 전달해주세요:
        </p>
        
        <div className="space-y-3">
          {invitations.map((invitation) => {
            const inviteUrl = `${window.location.origin}/chat/invite/${invitation.token}`
            const isCopied = copiedToken === invitation.token
            
            return (
              <div key={invitation.token} className="border border-gray-200 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {invitation.email}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inviteUrl}
                    readOnly
                    className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1"
                  />
                  <button
                    onClick={() => copyToClipboard(inviteUrl, invitation.token)}
                    className={`px-3 py-1 text-xs rounded transition-colors ${
                      isCopied
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {isCopied ? '복사됨!' : '복사'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}