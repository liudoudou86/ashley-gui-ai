import { Locator } from '@playwright/test'

// 扩展 Locator 添加带等待的点击方法
export async function clickAutoWait(
  locator: Locator,
  timeout = 1500
): Promise<void> {
  await locator.page().waitForTimeout(timeout)
  await locator.click()
  await locator.page().waitForTimeout(timeout)
}
