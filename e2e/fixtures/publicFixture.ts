import { test as base } from '@playwright/test'
import { apiFixtures, ApiFixtures } from './apiFixture'
import { pageFixtures, PageFixtures } from './pageFixture'
import {
  PlaywrightAiFixture,
  type PlayWrightAiFixtureType
} from '@midscene/web/playwright'

// 合并所有fixtures
export const test = base.extend<
  PageFixtures & ApiFixtures & PlayWrightAiFixtureType
>({
  ...pageFixtures,
  ...apiFixtures,
  ...PlaywrightAiFixture()
})

// 导出所有类型和expect
export { expect } from '@playwright/test'
export type { PageFixtures, ApiFixtures }
