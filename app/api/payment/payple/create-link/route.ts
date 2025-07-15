import { NextRequest, NextResponse } from 'next/server'

// Payple 결제 링크 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 1. 먼저 인증 토큰 발급
    const authData = {
      cst_id: process.env.PAYPLE_CST_ID || "test",
      custKey: process.env.PAYPLE_CUST_KEY || "test_DF55F29DA654A8CBC0F0A9DD4B556486",
      PCD_PAYCANCEL_FLAG: "Y"
    }

    const paypleAuthUrl = process.env.NODE_ENV === 'production' 
      ? 'https://cpay.payple.kr/php/auth.php'
      : 'https://democpay.payple.kr/php/auth.php'

    const authResponse = await fetch(paypleAuthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      },
      body: JSON.stringify(authData)
    })

    const authResult = await authResponse.json()
    console.log('Payple 인증 결과:', authResult)

    if (authResult.result !== 'success' || !authResult.access_token) {
      return NextResponse.json({
        success: false,
        message: authResult.result_msg || '인증 실패'
      }, { status: 400 })
    }

    // 2. 결제 링크 생성 요청
    const linkData = {
      PCD_CST_ID: process.env.PAYPLE_CST_ID || "test",
      PCD_CUST_KEY: process.env.PAYPLE_CUST_KEY || "test_DF55F29DA654A8CBC0F0A9DD4B556486",
      PCD_AUTH_KEY: authResult.access_token,
      PCD_PAY_TYPE: body.payType || "card",
      PCD_PAY_WORK: body.payWork || "PAYMENT",
      PCD_PAY_GOODS: body.payGoods,
      PCD_PAY_TOTAL: body.payTotal,
      PCD_PAY_OID: body.payOid,
      PCD_PAYER_NAME: body.payerName,
      PCD_PAYER_EMAIL: body.payerEmail,
      PCD_PAYER_HP: body.payerHp || "",
      PCD_LINK_EXPIRED_DATE: body.linkExpiredDate,
      PCD_RETURN_URL: body.returnUrl,
      PCD_CANCEL_URL: body.cancelUrl,
      PCD_WEBHOOK_URL: body.webhookUrl,
      PCD_TAXSAVE_FLAG: "Y",
      PCD_PAY_BANK: "",
      PCD_REGULER_FLAG: "N"
    }

    const paypleLinkUrl = process.env.NODE_ENV === 'production'
      ? 'https://cpay.payple.kr/php/link/api/LinkRegAct.php?ACT_=LINKREG'
      : 'https://democpay.payple.kr/php/link/api/LinkRegAct.php?ACT_=LINKREG'

    const linkResponse = await fetch(paypleLinkUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      },
      body: JSON.stringify(linkData)
    })

    const linkResult = await linkResponse.json()
    console.log('Payple 링크 생성 결과:', linkResult)

    if (linkResult.PCD_PAY_RST === 'success' && linkResult.PCD_LINK_URL) {
      return NextResponse.json({
        success: true,
        paymentUrl: linkResult.PCD_LINK_URL,
        linkId: linkResult.PCD_LINK_ID,
        message: '결제 링크 생성 성공',
        data: linkResult
      })
    } else {
      return NextResponse.json({
        success: false,
        message: linkResult.PCD_PAY_MSG || '결제 링크 생성 실패'
      }, { status: 400 })
    }
  } catch (error) {
    console.error('결제 링크 생성 오류:', error)
    return NextResponse.json({
      success: false,
      message: '결제 링크 생성 중 오류가 발생했습니다.'
    }, { status: 500 })
  }
}