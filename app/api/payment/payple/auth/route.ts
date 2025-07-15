import { NextRequest, NextResponse } from 'next/server'

// Payple 인증 토큰 발급
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const authData = {
      cst_id: process.env.PAYPLE_CST_ID || "test",
      custKey: process.env.PAYPLE_CUST_KEY || "test_DF55F29DA654A8CBC0F0A9DD4B556486",
      PCD_PAYCANCEL_FLAG: "Y"
    }

    // Payple 인증 API 호출
    const paypleAuthUrl = process.env.NODE_ENV === 'production' 
      ? 'https://cpay.payple.kr/php/auth.php'
      : 'https://democpay.payple.kr/php/auth.php'

    const response = await fetch(paypleAuthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      },
      body: JSON.stringify(authData)
    })

    const result = await response.json()
    console.log('Payple 인증 응답:', result)

    if (result.result === 'success' && result.access_token) {
      return NextResponse.json({
        success: true,
        access_token: result.access_token,
        message: '인증 성공'
      })
    } else {
      return NextResponse.json({
        success: false,
        message: result.result_msg || '인증 실패'
      }, { status: 400 })
    }
  } catch (error) {
    console.error('Payple 인증 오류:', error)
    return NextResponse.json({
      success: false,
      message: '인증 처리 중 오류가 발생했습니다.'
    }, { status: 500 })
  }
}