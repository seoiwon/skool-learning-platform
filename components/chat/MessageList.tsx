import { Message } from '@/types/chat'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface MessageListProps {
  messages: Message[]
  currentUserId?: string
}

export default function MessageList({ messages, currentUserId }: MessageListProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
      {messages.map((message) => {
        const isOwnMessage = message.user_id === currentUserId
        
        return (
          <div
            key={message.id}
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                isOwnMessage
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {!isOwnMessage && (
                <p className="text-xs font-semibold mb-1">
                  {message.user?.name || message.user?.email}
                </p>
              )}
              <p className="break-words">{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {formatDistanceToNow(new Date(message.created_at), {
                  addSuffix: true,
                  locale: ko
                })}
              </p>
            </div>
          </div>
        )
      })}
      
      {messages.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          아직 메시지가 없습니다. 첫 메시지를 보내보세요!
        </div>
      )}
    </div>
  )
}