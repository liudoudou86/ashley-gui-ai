import { type Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async b2bLogin() {
    await this.page.goto(`${process.env.B2B_BASE_URL}/#/login`)
    await this.page.waitForURL(`${process.env.B2B_BASE_URL}/#/login`)
    await this.page
      .getByPlaceholder('账号')
      .fill(`${process.env.B2B_USER_NAME}`)
    await this.page.getByPlaceholder('密码').fill(`${process.env.B2B_PASSWORD}`)
    await this.page.getByRole('button', { name: '登录' }).click()
    await this.page.waitForURL(`${process.env.B2B_BASE_URL}/#/dashboard`)
    const headingLocator = this.page.getByRole('heading', {
      name: '新B2B系统制单注意事项'
    })
    if (await headingLocator.isVisible()) {
      await this.page
        .getByRole('button', { name: '我已知晓以上注意事项' })
        .click()
    }
  }

  async b2bLogout() {
    await this.page
      .getByRole('button', { name: `${process.env.B2B_CHINESE_NAME}` })
      .click()
    await this.page.getByRole('menuitem', { name: '退出系统' }).click()
    await this.page.waitForURL(`${process.env.B2B_BASE_URL}/#/login`)
  }

  async contractLogin() {
    await this.page.goto(`${process.env.CONTRACT_BASE_URL}/#/login`)
    await this.page.waitForURL(`${process.env.CONTRACT_BASE_URL}/#/login`)
    // 删除遮罩层
    await this.page.evaluate(() => {
      const mask = document.querySelector('.el-loading-mask')
      if (mask) {
        // 从DOM中移除遮罩层
        mask.remove()
      }
    })
    // 检查遮罩层是否已删除
    await this.page.waitForSelector('.el-loading-mask', { state: 'hidden' })
    await this.page
      .getByPlaceholder('输入登录账号')
      .fill(`${process.env.CONTRACT_USER_NAME}`)
    await this.page
      .getByPlaceholder('输入登录密码')
      .fill(`${process.env.CONTRACT_PASSWORD}`)
    await this.page.getByRole('button', { name: '登录' }).click()
    await this.page.waitForURL(`${process.env.CONTRACT_BASE_URL}/#/dashboard`)
  }

  async contractLogout() {
    await this.page
      .getByRole('button', { name: `${process.env.CONTRACT_CHINESE_NAME} ` })
      .click()
    await this.page.getByText('退出').click()
    await this.page.waitForURL(
      `${process.env.CONTRACT_BASE_URL}/#/login?redirect=%2Fcontract-management%2Fcontract-seal-manage`
    )
  }
}
