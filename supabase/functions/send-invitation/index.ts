import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface InvitationRequest {
  invitationId: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { invitationId } = await req.json() as InvitationRequest

    // Get invitation details
    const { data: invitation, error: inviteError } = await supabaseClient
      .from('chat_invitations')
      .select(`
        *,
        room:chat_rooms(id, name, type),
        inviter:User!chat_invitations_invited_by_fkey(email, name)
      `)
      .eq('id', invitationId)
      .single()

    if (inviteError || !invitation) {
      throw new Error('Invitation not found')
    }

    // Construct invitation URL
    const inviteUrl = `${Deno.env.get('PUBLIC_URL')}/auth/callback?invite=${invitation.token}`

    // Email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>채팅방 초대</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background-color: #f3f4f6; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background-color: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>채팅방 초대</h1>
          </div>
          <div class="content">
            <h2>안녕하세요!</h2>
            <p><strong>${invitation.inviter.name || invitation.inviter.email}</strong>님이 채팅방에 초대했습니다.</p>
            <p>채팅방 이름: <strong>${invitation.room.name}</strong></p>
            <p>아래 버튼을 클릭하여 채팅방에 참여하세요:</p>
            <a href="${inviteUrl}" class="button">채팅방 참여하기</a>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
              버튼이 작동하지 않으면 다음 링크를 복사하여 브라우저에 붙여넣으세요:<br>
              <code>${inviteUrl}</code>
            </p>
          </div>
          <div class="footer">
            <p>이 초대는 채팅방이 삭제되거나 초대가 취소될 때까지 유효합니다.</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email using Resend API (you need to set up Resend)
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      // In development, just return the invite URL
      return new Response(
        JSON.stringify({ 
          success: true, 
          inviteUrl,
          message: 'Email service not configured. Use this URL to join:' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@yourdomain.com', // Replace with your domain
        to: invitation.email,
        subject: `${invitation.inviter.name || invitation.inviter.email}님의 채팅방 초대`,
        html: emailHtml,
      }),
    })

    if (!emailResponse.ok) {
      const error = await emailResponse.text()
      throw new Error(`Failed to send email: ${error}`)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Invitation sent successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})