-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    username TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat rooms table
CREATE TABLE IF NOT EXISTS public.chat_rooms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    creator_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    type TEXT CHECK (type IN ('public', 'private', 'invite')) NOT NULL,
    name TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat members table
CREATE TABLE IF NOT EXISTS public.chat_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    is_creator BOOLEAN DEFAULT FALSE,
    last_read_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(room_id, user_id)
);

-- Chat invitations table
CREATE TABLE IF NOT EXISTS public.chat_invitations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE NOT NULL,
    email TEXT NOT NULL,
    token UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    invited_by UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    accepted BOOLEAN DEFAULT FALSE,
    accepted_at TIMESTAMPTZ
);

-- Messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_deleted BOOLEAN DEFAULT FALSE
);

-- Push subscriptions table
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    endpoint TEXT NOT NULL,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_chat_rooms_creator ON public.chat_rooms(creator_id);
CREATE INDEX idx_chat_rooms_type ON public.chat_rooms(type);
CREATE INDEX idx_chat_members_room ON public.chat_members(room_id);
CREATE INDEX idx_chat_members_user ON public.chat_members(user_id);
CREATE INDEX idx_messages_room ON public.messages(room_id);
CREATE INDEX idx_messages_created ON public.messages(created_at DESC);
CREATE INDEX idx_invitations_token ON public.chat_invitations(token);
CREATE INDEX idx_invitations_email ON public.chat_invitations(email);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view all profiles" ON public.users
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for chat_rooms table
CREATE POLICY "Public rooms are viewable by all" ON public.chat_rooms
    FOR SELECT USING (type = 'public' OR auth.uid() IN (
        SELECT user_id FROM public.chat_members WHERE room_id = chat_rooms.id
    ));

CREATE POLICY "Users can create chat rooms" ON public.chat_rooms
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

-- RLS Policies for chat_members table
CREATE POLICY "Members can view room members" ON public.chat_members
    FOR SELECT USING (
        auth.uid() IN (
            SELECT user_id FROM public.chat_members cm WHERE cm.room_id = chat_members.room_id
        )
    );

CREATE POLICY "Room creator can add members" ON public.chat_members
    FOR INSERT WITH CHECK (
        auth.uid() IN (
            SELECT creator_id FROM public.chat_rooms WHERE id = room_id
        )
    );

-- RLS Policies for messages table
CREATE POLICY "Members can view room messages" ON public.messages
    FOR SELECT USING (
        auth.uid() IN (
            SELECT user_id FROM public.chat_members WHERE room_id = messages.room_id
        )
    );

CREATE POLICY "Members can send messages" ON public.messages
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND
        auth.uid() IN (
            SELECT user_id FROM public.chat_members WHERE room_id = messages.room_id
        )
    );

-- RLS Policies for invitations table
CREATE POLICY "Users can view their invitations" ON public.chat_invitations
    FOR SELECT USING (
        auth.uid() = invited_by OR
        email IN (SELECT email FROM public.users WHERE id = auth.uid())
    );

CREATE POLICY "Room creator can create invitations" ON public.chat_invitations
    FOR INSERT WITH CHECK (
        auth.uid() IN (
            SELECT creator_id FROM public.chat_rooms WHERE id = room_id
        )
    );

-- Functions and triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to join a chat room
CREATE OR REPLACE FUNCTION public.join_chat_room(p_room_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_room_type TEXT;
BEGIN
    -- Get room type
    SELECT type INTO v_room_type FROM public.chat_rooms WHERE id = p_room_id;
    
    -- Check if room exists
    IF v_room_type IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Check if already a member
    IF EXISTS (SELECT 1 FROM public.chat_members WHERE room_id = p_room_id AND user_id = auth.uid()) THEN
        RETURN TRUE;
    END IF;
    
    -- Only allow joining public rooms through this function
    IF v_room_type != 'public' THEN
        RETURN FALSE;
    END IF;
    
    -- Join the room
    INSERT INTO public.chat_members (room_id, user_id, is_creator)
    VALUES (p_room_id, auth.uid(), FALSE);
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to accept invitation
CREATE OR REPLACE FUNCTION public.accept_invitation(p_token UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_invitation RECORD;
    v_user_email TEXT;
BEGIN
    -- Get user email
    SELECT email INTO v_user_email FROM public.users WHERE id = auth.uid();
    
    -- Get invitation details
    SELECT * INTO v_invitation 
    FROM public.chat_invitations 
    WHERE token = p_token AND email = v_user_email AND accepted = FALSE;
    
    IF v_invitation.id IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Update invitation
    UPDATE public.chat_invitations 
    SET accepted = TRUE, accepted_at = NOW()
    WHERE id = v_invitation.id;
    
    -- Add user to chat room
    INSERT INTO public.chat_members (room_id, user_id, is_creator)
    VALUES (v_invitation.room_id, auth.uid(), FALSE)
    ON CONFLICT (room_id, user_id) DO NOTHING;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;