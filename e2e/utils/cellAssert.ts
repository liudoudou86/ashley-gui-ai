import { Page, expect } from '@playwright/test'

// 定义断言内容的类型
export interface Assertion {
  columnName: string
  description: string
}

/**
 * 断言整行的单元格内容
 * @param page Playwright 的 Page 对象
 * @param assertions 断言内容
 */
export async function assertRowCells(
  page: Page,
  assertions: Assertion[]
): Promise<void> {
  // 遍历数组并执行断言
  for (const assertion of assertions) {
    const { columnName } = assertion
    try {
      // 使用更精确的定位方式，结合行和列信息
      const cell = page
        .getByRole('cell', { name: columnName, exact: true })
        .filter({ visible: true })
      await expect(cell).toContainText(columnName)
      console.log(`【✅Pass】【${assertion.description}】符合预期`)
    } catch (error) {
      throw new Error(
        `【❌Fail】【${assertion.description}】错误 → 预期结果:${assertion.columnName}\n${error}`
      )
    }
  }
}
