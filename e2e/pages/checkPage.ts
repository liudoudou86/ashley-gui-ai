import { type Page } from '@playwright/test'
import { ContractPage } from './contractPage'
import { clickAutoWait } from '../hooks/customClickWait'

export class CheckPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  private createContractPage() {
    return new ContractPage(this.page)
  }

  async check(
    orderNo: string,
    approvalStatus: '通过' | '否决',
    contractStatus?: string | null
  ) {
    if (contractStatus === '已盖章') {
      await this.createContractPage().contract(orderNo, '已盖章')
      await this.page.getByRole('button', { name: '总部核查' }).click()
      if (approvalStatus === '通过') {
        await this.page.getByRole('button', { name: approvalStatus }).click()
        await clickAutoWait(
          this.page.getByRole('button', { name: '确认', exact: true })
        )
      } else {
        await this.page.getByRole('button', { name: approvalStatus }).click()
        await this.page
          .getByPlaceholder('请输入否决原因')
          .fill('GUI自动核查否决')
        await this.page.getByRole('button', { name: '确定' }).click()
        await clickAutoWait(
          this.page.getByRole('button', { name: '确认', exact: true })
        )
      }
    } else {
      await this.createContractPage().contract(orderNo)
      await this.page.getByRole('button', { name: '总部核查' }).click()
      if (approvalStatus === '通过') {
        await this.page.getByRole('button', { name: approvalStatus }).click()
        await clickAutoWait(
          this.page.getByRole('button', { name: '确认', exact: true })
        )
      } else {
        await this.page.getByRole('button', { name: approvalStatus }).click()
        await this.page
          .getByPlaceholder('请输入否决原因')
          .fill('GUI自动核查否决')
        await this.page.getByRole('button', { name: '确定' }).click()
        await clickAutoWait(
          this.page.getByRole('button', { name: '确认', exact: true })
        )
      }
    }
  }
}
