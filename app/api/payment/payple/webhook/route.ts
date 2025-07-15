import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Payple 웹훅 - 결제 결과 수신
export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }
    
    const body = await request.json()
    console.log('Payple 웹훅 데이터:', body)

    // 결제 성공 처리
    if (body.PCD_PAY_RST === 'success') {
      await handlePaymentSuccess(body)
      
      return NextResponse.json({
        success: true,
        message: '웹훅 처리 완료'
      })
    } 
    // 결제 취소/실패 처리
    else if (body.PCD_PAY_RST === 'cancel' || body.PCD_PAY_RST === 'error') {
      await handlePaymentFailure(body)
      
      return NextResponse.json({
        success: true,
        message: '웹훅 처리 완료'
      })
    }
    // 환불 처리
    else if (body.PCD_PAY_RST === 'refund') {
      await handleRefund(body)
      
      return NextResponse.json({
        success: true,
        message: '환불 웹훅 처리 완료'
      })
    }

    return NextResponse.json({
      success: true,
      message: '알 수 없는 웹훅 타입'
    })
  } catch (error) {
    console.error('웹훅 처리 오류:', error)
    return NextResponse.json({
      success: false,
      message: '웹훅 처리 중 오류가 발생했습니다.'
    }, { status: 500 })
  }
}

// 결제 성공 처리
async function handlePaymentSuccess(webhookData: any) {
  try {
    // 주문 정보 파싱 (ORDER_courseId_userId_timestamp 형태)
    const orderParts = webhookData.PCD_PAY_OID.split('_')
    const courseId = orderParts[1]
    const userId = orderParts[2]

    // 1. 결제 정보 저장/업데이트
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .upsert({
        id: webhookData.PCD_PAY_OID,
        user_id: userId,
        course_id: courseId,
        amount: parseInt(webhookData.PCD_PAY_TOTAL),
        payment_method: 'card',
        payment_status: 'completed',
        transaction_id: webhookData.PCD_PAY_NO,
        payment_data: webhookData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (paymentError) {
      console.error('결제 정보 저장 실패:', paymentError)
      throw paymentError
    }

    // 2. 수강 등록 (중복 방지)
    const { error: enrollmentError } = await supabase
      .from('course_enrollments')
      .upsert({
        user_id: userId,
        course_id: courseId,
        payment_id: payment.id,
        enrolled_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,course_id'
      })

    if (enrollmentError) {
      console.error('수강 등록 실패:', enrollmentError)
      throw enrollmentError
    }

    // 3. 강의 수강생 수 증가
    const { error: updateError } = await supabase
      .rpc('increment_course_students', { course_id: courseId })

    if (updateError) {
      console.error('수강생 수 업데이트 실패:', updateError)
    }

    console.log('결제 및 수강 등록 완료:', payment.id)
  } catch (error) {
    console.error('결제 성공 처리 오류:', error)
    throw error
  }
}

// 결제 실패/취소 처리
async function handlePaymentFailure(webhookData: any) {
  try {
    // 결제 정보 업데이트
    const { error } = await supabase
      .from('payments')
      .upsert({
        id: webhookData.PCD_PAY_OID,
        payment_status: webhookData.PCD_PAY_RST === 'cancel' ? 'cancelled' : 'failed',
        payment_data: webhookData,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('결제 실패 정보 저장 실패:', error)
      throw error
    }

    console.log('결제 실패/취소 처리 완료:', webhookData.PCD_PAY_OID)
  } catch (error) {
    console.error('결제 실패 처리 오류:', error)
    throw error
  }
}

// 환불 처리
async function handleRefund(webhookData: any) {
  try {
    const orderParts = webhookData.PCD_PAY_OID.split('_')
    const courseId = orderParts[1]
    const userId = orderParts[2]

    // 1. 결제 정보 업데이트
    const { error: paymentError } = await supabase
      .from('payments')
      .update({
        payment_status: 'refunded',
        payment_data: webhookData,
        updated_at: new Date().toISOString()
      })
      .eq('id', webhookData.PCD_PAY_OID)

    if (paymentError) {
      console.error('환불 정보 업데이트 실패:', paymentError)
      throw paymentError
    }

    // 2. 수강 등록 취소
    const { error: enrollmentError } = await supabase
      .from('course_enrollments')
      .delete()
      .eq('user_id', userId)
      .eq('course_id', courseId)

    if (enrollmentError) {
      console.error('수강 등록 취소 실패:', enrollmentError)
      throw enrollmentError
    }

    // 3. 강의 수강생 수 감소
    const { error: updateError } = await supabase
      .rpc('decrement_course_students', { course_id: courseId })

    if (updateError) {
      console.error('수강생 수 감소 실패:', updateError)
    }

    console.log('환불 처리 완료:', webhookData.PCD_PAY_OID)
  } catch (error) {
    console.error('환불 처리 오류:', error)
    throw error
  }
}