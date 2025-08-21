import { APIRequestContext, APIResponse } from '@playwright/test'

export class ContractApi {
  constructor(private request: APIRequestContext) {}

  /**
   * 模拟用印审批至待盖章
   * @param contractNo 合同编号
   * @returns Promise<APIResponse>
   */
  async sealApprovalToStamp(contractNo: string): Promise<APIResponse> {
    const params = new URLSearchParams({
      contractNo
    })
    const url = `${process.env.TEST_SERVICE_URL}/oa/approvalContract?${params.toString()}`

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
