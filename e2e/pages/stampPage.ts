import { type Page } from '@playwright/test'
import { ContractPage } from './contractPage'
import { clickAutoWait } from '../hooks/customClickWait'

export class StampPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  private createContractPage() {
    return new ContractPage(this.page)
  }

  async iinitiateStamp(orderNo: string, contractStatus?: string | null) {
    if (contractStatus === '待盖章') {
      await this.createContractPage().contract(orderNo, '待盖章')
      await this.page.getByRole('button', { name: '发起盖章' }).click()
      await this.page.waitForResponse(
        response =>
          response
            .url()
            .includes(
              `${process.env.MGMT_BASE_URL}/api/contract/v1/contract/getOrganizationSignatureAgentPersonList`
            ) && response.status() === 200
      )
      await this.page
        .getByRole('row', { name: '企业 甲方' })
        .getByPlaceholder('请选择签署方式')
        .click()
      await this.page
        .locator('li')
        .filter({ hasText: '电子签' })
        .first()
        .click()
      await this.page
        .getByRole('row', { name: '企业 乙方' })
        .getByPlaceholder('请选择签署方式')
        .click()
      await this.page
        .locator('li')
        .filter({ hasText: '线下签署' })
        .nth(2)
        .click()
      await this.page.getByRole('button', { name: '确 定' }).click()
      await clickAutoWait(this.page.getByRole('button', { name: '确认提交' }))
    } else {
      await this.createContractPage().contract(orderNo)
      await this.page.getByRole('button', { name: '发起盖章' }).click()
      await this.page.waitForResponse(
        response =>
          response
            .url()
            .includes(
              `${process.env.MGMT_BASE_URL}/api/contract/v1/contract/getOrganizationSignatureAgentPersonList`
            ) && response.status() === 200
      )
      await this.page
        .getByRole('row', { name: '企业 甲方' })
        .getByPlaceholder('请选择签署方式')
        .click()
      await this.page
        .locator('li')
        .filter({ hasText: '电子签' })
        .first()
        .click()
      await this.page
        .getByRole('row', { name: '企业 乙方' })
        .getByPlaceholder('请选择签署方式')
        .click()
      await this.page
        .locator('li')
        .filter({ hasText: '线下签署' })
        .nth(2)
        .click()
      await this.page.getByRole('button', { name: '确 定' }).click()
      await clickAutoWait(this.page.getByRole('button', { name: '确认提交' }))
    }
  }

  async partyAStamp(orderNo: string) {
    await this.page
      .locator('div')
      .filter({ hasText: /^合同管理$/ })
      .click()
    await this.page.getByText('合同盖章').click()
    await this.page.getByPlaceholder('请输入合同编号').fill(orderNo)
    await clickAutoWait(this.page.getByRole('button', { name: '搜索' }))
    await this.page
      .getByRole('row', {
        name: '操作 用印流程 合同编号 签署方 合同所属公司 合同类型 创建人/创建部门 接收时间'
      })
      .locator('span')
      .nth(1)
      .click()
    await clickAutoWait(this.page.getByRole('button', { name: '批量签署' }))
    await this.page
      .getByPlaceholder('请输入登录密码')
      .fill(`${process.env.CONTRACT_PASSWORD}`)
    await this.page.getByRole('button', { name: '确定' }).click()
    await this.page.waitForResponse(
      response =>
        response.url() ===
          `${process.env.MGMT_BASE_URL}/api/contract/v1/contract/signWithoutAuth` &&
        response.status() === 200
    )
    await this.page
      .getByLabel('签署结果')
      .getByRole('button', { name: 'Close' })
      .click()
  }

  async partyBUpload(orderNo: string, contractStatus?: string | null) {
    const uploadContract = async (status: string) => {
      await this.createContractPage().contract(orderNo, status)
      await clickAutoWait(this.page.getByRole('button', { name: '上传' }))
      await this.page
        .locator('input[type="file"]')
        .setInputFiles(`${process.env.FILE_PATH}`)
      await this.page.waitForTimeout(2000)
      await this.page
        .getByLabel('上传合同')
        .getByRole('button', { name: '上传', exact: true })
        .click()
      await clickAutoWait(this.page.getByRole('button', { name: '确认提交' }))
    }

    if (contractStatus === '盖章中') {
      await uploadContract('盖章中')
    } else if (contractStatus === '已盖章') {
      await uploadContract('已盖章')
    } else {
      await uploadContract('已确认')
    }
  }
}
