import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Payple 결제 인증 결과 콜백
export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }
    
    const body = await request.json()
    console.log('Payple 콜백 데이터:', body)

    // 결제 인증 결과 확인
    if (body.PCD_PAY_RST === 'success') {
      // 결제 승인 요청을 위한 데이터 준비
      const approvalData = {
        PCD_CPAY_VER: "1.0.1",
        PCD_PAY_TYPE: "card",
        PCD_CLIENT_KEY: "test_DF55F29DA654A8CBC0F0A9DD4B556486",
        PCD_PAY_WORK: "PAY",
        PCD_AUTH_KEY: body.PCD_AUTH_KEY,
        PCD_PAY_REQKEY: body.PCD_PAY_REQKEY,
        PCD_PAY_COFURL: body.PCD_PAY_COFURL,
        PCD_PAY_OID: body.PCD_PAY_OID,
        PCD_PAY_GOODS: body.PCD_PAY_GOODS,
        PCD_PAY_TOTAL: body.PCD_PAY_TOTAL,
        PCD_PAYER_NO: body.PCD_PAYER_NO,
        PCD_PAYER_NAME: body.PCD_PAYER_NAME,
        PCD_PAYER_EMAIL: body.PCD_PAYER_EMAIL
      }

      // Payple 결제 승인 API 호출
      const approvalResponse = await fetch('https://cpay.payple.kr/php/auth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        },
        body: JSON.stringify(approvalData)
      })

      const approvalResult = await approvalResponse.json()
      console.log('결제 승인 결과:', approvalResult)

      if (approvalResult.PCD_PAY_RST === 'success') {
        // 결제 성공 - 데이터베이스에 저장
        await savePaymentResult(approvalResult)
        
        return NextResponse.json({
          success: true,
          message: '결제가 완료되었습니다.',
          data: approvalResult
        })
      } else {
        return NextResponse.json({
          success: false,
          message: approvalResult.PCD_PAY_MSG || '결제 승인에 실패했습니다.'
        })
      }
    } else {
      return NextResponse.json({
        success: false,
        message: body.PCD_PAY_MSG || '결제 인증에 실패했습니다.'
      })
    }
  } catch (error) {
    console.error('결제 콜백 처리 오류:', error)
    return NextResponse.json({
      success: false,
      message: '결제 처리 중 오류가 발생했습니다.'
    }, { status: 500 })
  }
}

// 결제 결과를 데이터베이스에 저장
async function savePaymentResult(paymentData: any) {
  try {
    // 주문 정보 파싱 (ORDER_courseId_userId_timestamp 형태)
    const orderParts = paymentData.PCD_PAY_OID.split('_')
    const courseId = orderParts[1]
    const userId = orderParts[2]

    // 1. 결제 정보 저장
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        id: paymentData.PCD_PAY_OID,
        user_id: userId,
        course_id: courseId,
        amount: parseInt(paymentData.PCD_PAY_TOTAL),
        payment_method: 'card',
        payment_status: 'completed',
        transaction_id: paymentData.PCD_PAY_NO,
        payment_data: paymentData
      })
      .select()
      .single()

    if (paymentError) {
      console.error('결제 정보 저장 실패:', paymentError)
      throw paymentError
    }

    // 2. 수강 등록
    const { error: enrollmentError } = await supabase
      .from('course_enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
        payment_id: payment.id
      })

    if (enrollmentError) {
      console.error('수강 등록 실패:', enrollmentError)
      throw enrollmentError
    }

    // 3. 강의 수강생 수 증가
    const { error: updateError } = await supabase
      .rpc('increment_students_count', { course_id: courseId })

    if (updateError) {
      console.error('수강생 수 업데이트 실패:', updateError)
    }

    console.log('결제 및 수강 등록 완료:', payment.id)
  } catch (error) {
    console.error('결제 결과 저장 오류:', error)
    throw error
  }
}