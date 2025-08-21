import { type Page } from '@playwright/test'
import { getHashParam } from '../utils/getHashParam'
import { clickAutoWait } from '../hooks/customClickWait'

export class CopyOrderPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async copyOrder(orderNo: string) {
    await this.page.getByText('订单', { exact: true }).click()
    await this.page.getByText('订单管理', { exact: true }).click()
    await this.page.waitForURL('**/#/sub-order/order-manage/list')
    await this.page.waitForResponse(
      response =>
        response.url() ===
          `${process.env.MGMT_BASE_URL}/api/medicine-mgmt/v1/channel/saleOrg/querySaleOrgWithSapCode` &&
        response.status() === 200
    )
    await this.page.getByRole('button', { name: '展开' }).click()
    await this.page.getByPlaceholder('请输入b2b订单号检索').fill(orderNo)
    await clickAutoWait(
      this.page.getByRole('button', { name: '查询', exact: true })
    )
    await this.page
      .getByRole('row', { name: orderNo })
      .locator('span')
      .nth(1)
      .click()
    await this.page.getByRole('button', { name: '订单复制' }).click()
    await this.page.getByRole('button', { name: '确认' }).click()
    await this.page.waitForURL('**/#/sub-order/order-manage/create**')
    await this.page
      .getByRole('textbox', { name: '本备注只做内部沟通使用' })
      .fill('GUI自动生成订单备注')
    await this.page
      .getByRole('textbox', {
        name: '本备注将签署在购销合同中，请使用规范用语'
      })
      .fill('GUI自动生成合同备注')
    await this.page
      .getByRole('button', { name: '提交' })
      .waitFor({ state: 'visible' })
    await this.page.getByRole('button', { name: '提交' }).click()
    await this.page.getByRole('button', { name: '确认' }).click()
    await clickAutoWait(
      this.page.locator('button').filter({ hasText: /^确认$/ })
    )
    await clickAutoWait(
      this.page.locator('button').filter({ hasText: /^确认$/ })
    )
    await clickAutoWait(
      this.page.locator('button').filter({ hasText: /^确认$/ })
    )
    await this.page.waitForResponse(
      response =>
        response.url() ===
          `${process.env.MGMT_BASE_URL}/api/medicine-mgmt/v1/purchase/order/createOrder` &&
        response.status() === 200
    )
    await this.page.getByRole('button', { name: '展开' }).click()
    await this.page.getByRole('button', { name: '重置' }).click()
    await this.page.getByPlaceholder('请输入客户编码或名称检索').click()
    await this.page
      .getByPlaceholder('请输入客户编码或名称检索')
      .fill(`${process.env.COMPANY_NAME}`)
    await this.page
      .getByRole('tooltip', { name: `${process.env.COMPANY_NAME}-` })
      .getByRole('listitem')
      .click()
    await this.page.getByLabel('订单状态').click()
    await this.page.locator('li').filter({ hasText: '待商务审核' }).click()
    await clickAutoWait(
      this.page.getByRole('button', { name: '查询', exact: true })
    )
    await this.page
      .getByRole('row', { name: '商务审核' })
      .first()
      .getByRole('button')
      .click()
    await this.page.waitForURL(
      '**/#/sub-order/order-manage/business-approval**'
    )
    const orderId: string | null = await getHashParam(this.page, 'id')
    return orderId
  }
}
