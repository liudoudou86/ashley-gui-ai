import { APIRequestContext, APIResponse } from '@playwright/test'

export class OrderApi {
  constructor(private request: APIRequestContext) {}

  /**
   * 模拟SAP返回ECCID
   * @param orderNo 订单号
   * @param status 状态
   * @returns Promise<APIResponse>
   */
  async createPositiveEccId(
    orderNo: string,
    status: string
  ): Promise<APIResponse> {
    const params = new URLSearchParams({
      orderNo,
      status,
      message: 'GUI自动SAP审核通过'
    })
    const url = `${process.env.TEST_SERVICE_URL}/orderPositiveProcess/createPositiveEccId?${params.toString()}`

    const response = await this.request.get(url)
    console.log('Status Code:', response.status())

    if (response.status() !== 200) {
      throw new Error(`接口返回错误 ${response.status()}`)
    }

    const jsonResponse = await response.json()
    console.log('Response Body:', jsonResponse)

    return response
  }

  /**
   * 下发合同中心
   * @returns Promise<APIResponse>
   */
  async issueContract(): Promise<APIResponse> {
    const url = `${process.env.TEST_SERVICE_URL}/scheduleTask/issueContract`

    const response = await this.request.get(url)
    console.log('Status Code:', response.status())

    if (response.status() !== 200) {
      throw new Error(`接口返回错误 ${response.status()}`)
    }

    const jsonResponse = await response.json()
    console.log('Response Body:', jsonResponse)

    return response
  }

  /**
   * 模拟SAP取消单回调
   * @param orderNo 订单号
   * @param status 状态
   * @returns Promise<APIResponse>
   */
  async createCancelSapReturn(
    orderNo: string,
    status: string
  ): Promise<APIResponse> {
    const params = new URLSearchParams({
      orderNo,
      cancelOrderItem: '10',
      status,
      message: 'GUI自动SAP审核通过'
    })
    const url = `${process.env.TEST_SERVICE_URL}/orderReverseProcess/createCancelRequest?${params.toString()}`

    const response = await this.request.get(url)
    console.log('Status Code:', response.status())

    if (response.status() !== 200) {
      throw new Error(`接口返回错误 ${response.status()}`)
    }

    const jsonResponse = await response.json()
    console.log('Response Body:', jsonResponse)

    return response
  }

  /**
   * 生成补充协议
   * @returns Promise<APIResponse>
   */
  async createAgreement(): Promise<APIResponse> {
    const url = `${process.env.TEST_SERVICE_URL}/scheduleTask/createSupplementaryAgreement`

    const response = await this.request.get(url)
    console.log('Status Code:', response.status())

    if (response.status() !== 200) {
      throw new Error(`接口返回错误 ${response.status()}`)
    }

    const jsonResponse = await response.json()
    console.log('Response Body:', jsonResponse)

    return response
  }
}
