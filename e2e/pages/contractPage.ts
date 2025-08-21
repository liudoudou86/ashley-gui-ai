import { type Page } from '@playwright/test'
import { clickAutoWait } from '../hooks/customClickWait'

export class ContractPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async contract(orderNo: string, approvalStatus?: string) {
    await this.page
      .getByRole('menuitem', { name: '订单' })
      .locator('svg')
      .click()
    await this.page.getByText('购销合同管理').click()
    await this.page.waitForURL(
      '**/#/sub-order/order-manage/purchase-contract-mangage'
    )
    await this.page.waitForResponse(
      response =>
        response.url() ===
          `${process.env.MGMT_BASE_URL}/api/medicine-mgmt/v1/channel/saleOrg/querySaleOrgWithSapCode` &&
        response.status() === 200
    )
    await this.page.getByRole('button', { name: '展开' }).click()
    await this.page.getByPlaceholder('请输入b2b订单号检索').fill(orderNo)

    // 通过是否传入合同状态来确定数据唯一性
    if (approvalStatus) {
      await this.page.getByLabel('合同状态').click()
      await this.page.locator('li').filter({ hasText: approvalStatus }).click()
    }

    await clickAutoWait(
      this.page.getByRole('button', { name: '查询', exact: true })
    )
  }
}
