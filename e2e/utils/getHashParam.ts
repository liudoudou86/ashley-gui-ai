import { Page } from '@playwright/test'

/**
 * 从当前页面的 URL 哈希部分提取指定的查询参数
 * @param page Playwright 的 Page 对象
 * @param param 需要提取的参数名
 * @returns 参数值（如果存在），否则返回 null
 */
export async function getHashParam(
  page: Page,
  param: string
): Promise<string | null> {
  try {
    // 获取当前页面的 URL
    const url: string = await page.url()
    const urlObject: URL = new URL(url)
    const hash: string = urlObject.hash

    // 检查哈希部分是否包含查询参数
    if (hash.includes('?')) {
      const hashParams = new URLSearchParams(hash.split('?')[1])
      return hashParams.get(param)
    }

    return null
  } catch (error) {
    console.error('解析 URL 失败:', error)
    return null
  }
}
