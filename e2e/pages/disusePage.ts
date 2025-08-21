import { type Page } from '@playwright/test'
import { ContractPage } from './contractPage'
import { clickAutoWait } from '../hooks/customClickWait'

export class DisusePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  private createContractPage() {
    return new ContractPage(this.page)
  }

  async regionDisuse(orderNo: string, contractStatus?: string | null) {
    if (contractStatus === '盖章中') {
      await this.createContractPage().contract(orderNo, '盖章中')
      await this.page.getByRole('button', { name: '大区作废' }).click()
      await this.page.getByPlaceholder('请选择作废原因').click()
      await this.page.locator('li').filter({ hasText: '合同内容有误' }).click()
      await this.page
        .getByPlaceholder('请输入详细原因')
        .fill('GUI自动生成作废原因')
      await this.page.getByRole('button', { name: '确定' }).click()
      await clickAutoWait(
        this.page.getByRole('button', { name: '确认', exact: true })
      )
    } else {
      await this.createContractPage().contract(orderNo)
      await this.page.getByRole('button', { name: '大区作废' }).click()
      await this.page.getByPlaceholder('请选择作废原因').click()
      await this.page.locator('li').filter({ hasText: '合同内容有误' }).click()
      await this.page
        .getByPlaceholder('请输入详细原因')
        .fill('GUI自动生成作废原因')
      await this.page.getByRole('button', { name: '确定' }).click()
      await clickAutoWait(
        this.page.getByRole('button', { name: '确认', exact: true })
      )
    }
  }

  async headquartersDisuse(orderNo: string, contractStatus?: string | null) {
    if (contractStatus === '盖章中') {
      await this.createContractPage().contract(orderNo, '盖章中')
      await this.page.getByRole('button', { name: '总部作废' }).click()
      await this.page.getByPlaceholder('请选择作废原因').click()
      await this.page.locator('li').filter({ hasText: '合同内容有误' }).click()
      await this.page
        .getByPlaceholder('请输入详细原因')
        .fill('GUI自动生成作废原因')
      await this.page.getByRole('button', { name: '确定' }).click()
      await clickAutoWait(
        this.page.getByRole('button', { name: '确认', exact: true })
      )
    } else {
      await this.createContractPage().contract(orderNo)
      await this.page.getByRole('button', { name: '总部作废' }).click()
      await this.page.getByPlaceholder('请选择作废原因').click()
      await this.page.locator('li').filter({ hasText: '合同内容有误' }).click()
      await this.page
        .getByPlaceholder('请输入详细原因')
        .fill('GUI自动生成作废原因')
      await this.page.getByRole('button', { name: '确定' }).click()
      await clickAutoWait(
        this.page.getByRole('button', { name: '确认', exact: true })
      )
    }
  }

  async headquartersSpecialDisuse(
    orderNo: string,
    contractStatus?: string | null
  ) {
    if (contractStatus === '已盖章') {
      await this.createContractPage().contract(orderNo, '已盖章')
      await this.page.getByRole('button', { name: '总部作废（特殊）' }).click()
      await this.page.getByPlaceholder('请选择作废原因').click()
      await this.page.locator('li').filter({ hasText: '合同内容有误' }).click()
      await this.page
        .getByPlaceholder('请输入详细原因')
        .fill('GUI自动生成作废原因')
      await this.page.getByRole('button', { name: '确定' }).click()
      await clickAutoWait(
        this.page.getByRole('button', { name: '确认', exact: true })
      )
    } else {
      await this.createContractPage().contract(orderNo)
      await this.page.getByRole('button', { name: '总部作废（特殊）' }).click()
      await this.page.getByPlaceholder('请选择作废原因').click()
      await this.page.locator('li').filter({ hasText: '合同内容有误' }).click()
      await this.page
        .getByPlaceholder('请输入详细原因')
        .fill('GUI自动生成作废原因')
      await this.page.getByRole('button', { name: '确定' }).click()
      await clickAutoWait(
        this.page.getByRole('button', { name: '确认', exact: true })
      )
    }
  }
}
