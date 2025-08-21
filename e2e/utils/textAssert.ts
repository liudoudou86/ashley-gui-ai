import { Page, expect } from '@playwright/test'

// 定义断言内容的类型
export interface Assertion {
  text: string // 需要断言的文本
  description: string // 断言的描述
}

/**
 * 断言页面中是否存在指定文本
 * @param page Playwright 的 Page 对象
 * @param assertions 断言内容数组
 */
export async function assertTextExists(
  page: Page,
  assertions: Assertion[]
): Promise<void> {
  // 遍历数组并执行断言
  for (const assertion of assertions) {
    const { text, description } = assertion
    try {
      // 定位页面中的文本
      const element = page.getByText(text).filter({ visible: true })
      await expect(element).toContainText(text)
      console.log(`【✅Pass】【${description}】符合预期`)
    } catch (error) {
      throw new Error(
        `【❌Fail】【${description}】错误 → 预期结果:${text}\n${error}`
      )
    }
  }
}
