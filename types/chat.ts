export type ChatRoomType = 'public' | 'private' | 'invite'

export interface User {
  id: string
  email: string
  name?: string
  created_at: string
  updated_at: string
}

export interface ChatRoom {
  id: string
  creator_id: string
  type: ChatRoomType
  name?: string
  description?: string
  created_at: string
  updated_at: string
  creator?: User
  member_count?: number
  last_message?: Message
  is_member?: boolean
  is_creator?: boolean
}

export interface ChatMember {
  id: string
  room_id: string
  user_id: string
  joined_at: string
  is_creator: boolean
  last_read_at: string
  user?: User
}

export interface ChatInvitation {
  id: string
  room_id: string
  email: string
  token: string
  invited_by: string
  created_at: string
  accepted: boolean
  accepted_at?: string
}

export interface Message {
  id: string
  room_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  is_deleted: boolean
  user?: User
}

export interface CreateChatRoomData {
  type: ChatRoomType
  name?: string
  description?: string
  inviteEmails?: string[]
}