import { type Page } from '@playwright/test'
import { clickAutoWait } from '../hooks/customClickWait'

export class ApprovalPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async businessApproval(
    orderNo: string,
    approvalStatus: '通过' | '否决',
    isRebate: boolean = false
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
    await this.page.getByRole('button', { name: '商务审核' }).click()
    await this.page.waitForURL(
      '**/#/sub-order/order-manage/business-approval**'
    )
    if (approvalStatus === '通过') {
      if (isRebate) {
        await this.page.getByRole('button', { name: '选择折让' }).click()
        await this.page.waitForResponse(
          response =>
            response
              .url()
              .includes(
                '/api/medicine-mgmt/v1/fulfillment/payment/rebate/order'
              ) && response.status() === 200
        )
        await this.page.waitForTimeout(2000)
        const headingDataDetail = this.page
          .locator('iframe')
          .contentFrame()
          .getByRole('heading', {
            name: '有效期90天内数据明细'
          })
        if (await headingDataDetail.isVisible()) {
          await this.page
            .locator('iframe')
            .contentFrame()
            .getByRole('button', { name: '关 闭' })
            .click()
        }
        await this.page
          .locator('iframe')
          .contentFrame()
          .getByRole('tab', { name: '使用金额' })
          .click()
        await this.page
          .locator('iframe')
          .contentFrame()
          .getByRole('button', { name: '编 辑' })
          .click()
        await this.page
          .locator('iframe')
          .contentFrame()
          .getByRole('spinbutton')
          .fill('300')
        await this.page
          .locator('iframe')
          .contentFrame()
          .getByRole('button', { name: '保 存' })
          .click()
        await this.page.waitForResponse(
          response =>
            response.url() ===
              `${process.env.MGMT_BASE_URL}/api/medicine-mgmt/v1/fulfillment/payment/rebate/calculateOrderLineRebate` &&
            response.status() === 200
        )
        await this.page
          .locator('iframe')
          .contentFrame()
          .getByLabel('商务')
          .check()
        await this.page
          .locator('iframe')
          .contentFrame()
          .getByRole('button', { name: '查 询' })
          .click()
        await this.page.waitForResponse(
          response =>
            response.url() ===
              `${process.env.MGMT_BASE_URL}/api/medicine-mgmt/v1/fulfillment/payment/rebate/module/rebate/detailsNewQuery` &&
            response.status() === 200
        )
        await this.page
          .locator('iframe')
          .contentFrame()
          .getByRole('row', {
            name: '全选 折让归属月 板块 180天内折让金额 本次使用金额'
          })
          .getByLabel('')
          .check()
        await this.page
          .locator('iframe')
          .contentFrame()
          .getByRole('button', { name: '自动分配' })
          .click()
        await this.page.waitForResponse(
          response =>
            response.url() ===
              `${process.env.MGMT_BASE_URL}/api/medicine-mgmt/v1/fulfillment/payment/rebate/module/rebate/detailsNewAutoCal` &&
            response.status() === 200
        )
        await this.page
          .locator('iframe')
          .contentFrame()
          .getByRole('button', { name: '保 存' })
          .click()
        await this.page
          .locator('iframe')
          .contentFrame()
          .getByRole('button', { name: '提 交' })
          .click()
        await this.page
          .locator('iframe')
          .contentFrame()
          .getByRole('button', { name: '确 定' })
          .click()
        await this.page.waitForURL(
          '**/#/sub-order/order-manage/business-approval**'
        )
        await this.page.getByRole('button', { name: approvalStatus }).click()
        await this.page
          .getByRole('button', { name: '确认通过', exact: true })
          .click()
        await clickAutoWait(
          this.page.getByRole('button', { name: '确认', exact: true })
        )
      } else {
        await this.page.getByRole('button', { name: approvalStatus }).click()
        await clickAutoWait(
          this.page.getByRole('button', { name: '确认', exact: true })
        )
      }
    } else {
      await this.page.getByRole('button', { name: approvalStatus }).click()
      await this.page
        .getByPlaceholder('请输入否决意见')
        .fill('GUI自动商务审核否决')
      await this.page.getByRole('button', { name: '确定否决' }).click()
      await clickAutoWait(
        this.page.getByRole('button', { name: '确认', exact: true })
      )
    }
  }

  async specialApproval(orderNo: string, approvalStatus: '通过' | '否决') {
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
    await this.page.getByRole('button', { name: '特殊审核' }).click()
    await this.page.waitForURL('**/#/sub-order/order-manage/special-approval**')
    if (approvalStatus === '通过') {
      await this.page.getByRole('button', { name: approvalStatus }).click()
      await this.page
        .getByRole('button', { name: '确认通过', exact: true })
        .click()
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

  async manualApproval(orderNo: string, approvalStatus: '通过' | '否决') {
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
    await this.page.getByRole('button', { name: '人工审核' }).click()
    await this.page.waitForURL('**/#/sub-order/order-manage/manual-review**')
    if (approvalStatus === '通过') {
      await this.page.getByRole('button', { name: approvalStatus }).click()
      await clickAutoWait(
        this.page.getByRole('button', { name: '确认', exact: true })
      )
    } else {
      await this.page.getByRole('button', { name: approvalStatus }).click()
      await this.page
        .getByPlaceholder('请输入否决意见')
        .fill('GUI自动人工审核否决')
      await this.page.getByRole('button', { name: '确定否决' }).click()
      await clickAutoWait(
        this.page.getByRole('button', { name: '确认', exact: true })
      )
    }
  }
}
