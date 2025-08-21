import { Page, TestType } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'

export class CustomTestStep {
  readonly test: TestType<{ page: Page }, { page: Page }>
  readonly page: Page
  private stepTimeout: number

  constructor(
    test: TestType<{ page: Page }, { page: Page }>,
    page: Page,
    defaultTimeout: number = 60_000 // 单个测试步骤默认超时时间
  ) {
    this.test = test
    this.page = page
    this.stepTimeout = defaultTimeout
  }

  // 设置当前超时值
  setStepTimeout(timeout: number) {
    this.stepTimeout = timeout
    return this // 返回实例以支持链式调用
  }

  // 获取当前超时值
  getStepTimeout() {
    return this.stepTimeout
  }

  async b2bTestStep(
    stepName: string,
    stepFunction: () => Promise<void>,
    timeout?: number // 可选覆盖当前超时
  ) {
    const useTimeout = timeout ?? this.stepTimeout

    await this.test.step(
      stepName,
      async () => {
        console.log(stepName)
        const loginPage = new LoginPage(this.page)
        await loginPage.b2bLogin()
        await stepFunction()
        await loginPage.b2bLogout()
      },
      { timeout: useTimeout }
    )
  }

  async contractTestStep(
    stepName: string,
    stepFunction: () => Promise<void>,
    timeout?: number // 可选覆盖当前超时
  ) {
    const useTimeout = timeout ?? this.stepTimeout

    await this.test.step(
      stepName,
      async () => {
        console.log(stepName)
        const loginPage = new LoginPage(this.page)
        await loginPage.contractLogin()
        await stepFunction()
        await loginPage.contractLogout()
      },
      { timeout: useTimeout }
    )
  }
}
