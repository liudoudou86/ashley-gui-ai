import { type Page } from '@playwright/test'
import { clickAutoWait } from '../hooks/customClickWait'

export class CancelPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async cancelSubmit(
    orderNo: string,
    orderStatus: '商务审核' | '特殊审核' | '人工审核' | '查看'
  ) {
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
      .getByRole('row', { name: orderStatus })
      .locator('span')
      .nth(1)
      .click()
    await this.page.getByRole('button', { name: '取消订单' }).click()
    await this.page.getByRole('button', { name: '确认' }).click()
    await this.page.waitForURL(
      '**/#/sub-order/order-manage/unshipped-cancel-manage-cancel-apply**'
    )
    // 此处硬编码为取消10行, 因为不同行的元素获取不统一
    await this.page
      .locator(
        'td > .cell > .el-checkbox > .el-checkbox__input > .el-checkbox__inner'
      )
      .first()
      .click()
    await this.page
      .getByPlaceholder('必填，不超过50个字')
      .fill('GUI自动取消10行')
    await this.page.getByRole('button', { name: '提交' }).click()
    await clickAutoWait(this.page.getByRole('button', { name: '确认提交' }))
    await clickAutoWait(
      this.page.getByRole('button', { name: '确认', exact: true })
    )
  }

  async businessApproval(
    orderNo: string,
    approvalStatus: '审核通过' | '审核否决'
  ) {
    await this.page.getByText('订单', { exact: true }).click()
    await this.page.getByText('未发货取消管理', { exact: true }).click()
    await this.page.waitForURL(
      '**/#/sub-order/order-manage/unshipped-cancel-manage-tabulation'
    )
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
    await this.page.getByRole('button', { name: '待商务审核' }).click()
    await this.page.waitForURL(
      '**/#/sub-order/order-manage/unshipped-cancel-manage-cancel-audit**'
    )
    if (approvalStatus === '审核通过') {
      await this.page.getByRole('button', { name: approvalStatus }).click()
      await clickAutoWait(
        this.page.getByRole('button', { name: '确认', exact: true })
      )
    } else {
      await this.page.getByRole('button', { name: approvalStatus }).click()
      await this.page
        .getByPlaceholder('请输入否决意见')
        .fill('GUI自动特殊审核否决')
      await this.page.getByRole('button', { name: '确定否决' }).click()
      await clickAutoWait(
        this.page.getByRole('button', { name: '确认', exact: true })
      )
    }
  }

  async manualApproval(
    orderNo: string,
    approvalStatus: '审核通过' | '审核否决'
  ) {
    await this.page.getByText('订单', { exact: true }).click()
    await this.page.getByText('未发货取消管理', { exact: true }).click()
    await this.page.waitForURL(
      '**/#/sub-order/order-manage/unshipped-cancel-manage-tabulation'
    )
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
    await this.page.getByRole('button', { name: '待运营审核' }).click()
    await this.page.waitForURL(
      '**/#/sub-order/order-manage/unshipped-cancel-manage-cancel-audit**'
    )
    if (approvalStatus === '审核通过') {
      await this.page.getByRole('button', { name: approvalStatus }).click()
      await clickAutoWait(
        this.page.getByRole('button', { name: '确认', exact: true })
      )
    } else {
      await this.page.getByRole('button', { name: approvalStatus }).click()
      await this.page
        .getByPlaceholder('请输入否决意见')
        .fill('GUI自动特殊审核否决')
      await this.page.getByRole('button', { name: '确定否决' }).click()
      await clickAutoWait(
        this.page.getByRole('button', { name: '确认', exact: true })
      )
    }
  }
}
