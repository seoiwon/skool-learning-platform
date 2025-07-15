// Payple 링크결제 연동 서비스

export interface PaymentRequest {
  courseId: string
  userId: string
  amount: number
  courseName: string
  customerName: string
  customerEmail: string
  customerPhone?: string
}

export interface PaymentResponse {
  success: boolean
  paymentUrl?: string
  paymentId?: string
  message?: string
  data?: any
}

// Payple 인증 토큰 발급
const getPaypleAuthToken = async (): Promise<string> => {
  const authData = {
    cst_id: process.env.NEXT_PUBLIC_PAYPLE_CST_ID || "test", // 가맹점 ID
    custKey: process.env.NEXT_PUBLIC_PAYPLE_CUST_KEY || "test_DF55F29DA654A8CBC0F0A9DD4B556486", // 가맹점 인증키
    PCD_PAYCANCEL_FLAG: "Y" // 취소 가능 여부
  }

  const response = await fetch('/api/payment/payple/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  })

  const result = await response.json()
  
  if (result.success && result.access_token) {
    return result.access_token
  } else {
    throw new Error(result.message || '인증 토큰 발급 실패')
  }
}

// 결제 링크 생성 요청
export const requestPaymentLink = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
  try {
    const orderId = generateOrderId(paymentData.courseId, paymentData.userId)
    
    // 결제 링크 생성 API 호출
    const response = await fetch('/api/payment/payple/create-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payType: 'card', // 카드 결제
        payWork: 'PAYMENT', // 결제
        payGoods: paymentData.courseName,
        payTotal: paymentData.amount,
        payOid: orderId,
        payerName: paymentData.customerName,
        payerEmail: paymentData.customerEmail,
        payerHp: paymentData.customerPhone || '',
        linkExpiredDate: getExpiredDate(), // 24시간 후 만료
        returnUrl: `${window.location.origin}/payment/success?orderId=${orderId}`,
        cancelUrl: `${window.location.origin}/payment/cancel?orderId=${orderId}`,
        webhookUrl: `${window.location.origin}/api/payment/payple/webhook`
      }),
    })

    const result = await response.json()
    
    if (result.success && result.paymentUrl) {
      return {
        success: true,
        paymentUrl: result.paymentUrl,
        paymentId: orderId,
        data: result
      }
    } else {
      return {
        success: false,
        message: result.message || '결제 링크 생성에 실패했습니다.'
      }
    }
  } catch (error) {
    console.error('결제 링크 생성 오류:', error)
    return {
      success: false,
      message: "결제 시스템 오류가 발생했습니다."
    }
  }
}

// 주문번호 생성
const generateOrderId = (courseId: string, userId: string): string => {
  const timestamp = Date.now()
  return `ORDER_${courseId}_${userId}_${timestamp}`
}

// 링크 만료 날짜 생성 (24시간 후)
const getExpiredDate = (): string => {
  const now = new Date()
  now.setHours(now.getHours() + 24)
  return now.toISOString().slice(0, 19).replace('T', ' ')
}

// 결제 상태 확인
export const checkPaymentStatus = async (orderId: string): Promise<PaymentResponse> => {
  try {
    const response = await fetch(`/api/payment/payple/status?orderId=${orderId}`)
    const result = await response.json()
    return result
  } catch (error) {
    console.error('결제 상태 확인 오류:', error)
    return {
      success: false,
      message: "결제 상태 확인 중 오류가 발생했습니다."
    }
  }
}

// 환불 요청
export const requestRefund = async (paymentId: string, refundAmount?: number): Promise<PaymentResponse> => {
  try {
    const response = await fetch('/api/payment/payple/refund', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentId,
        refundAmount
      }),
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('환불 요청 오류:', error)
    return {
      success: false,
      message: "환불 요청 중 오류가 발생했습니다."
    }
  }
}