import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '.env') })

export default defineConfig({
  testDir: './e2e/case',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* 在 CI 环境中重试 1 次，本地重试 0 次 */
  retries: process.env.CI ? 1 : 0,
  /* 在 CI 环境中启动 1 个，本地环境中启动 1 个 */
  workers: 1,
  /* 在 CI 环境中使用dot报告，本地环境中使用line报告 */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 200_000,
  use: {
    // 仅在测试失败时生成截图
    screenshot: 'only-on-failure',
    // 仅在测试失败时生成视频: 'off'- 不记录, 'on'- 记录每一个, 'retain-on-failure'- 只记录失败的
    video: process.env.CI ? 'off' : 'retain-on-failure',
    // 仅在测试失败时生成跟踪信息: 'off'- 不记录, 'on'- 记录每一个, 'retain-on-failure'- 只记录失败的
    trace: process.env.CI ? 'off' : 'retain-on-failure',
    // 启用无头模式
    headless: true
  },

  /* Configure projects for major browsers */
  projects: [
    // 正向流程
    {
      name: 'positive',
      testMatch: 'positive/*/*.test.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      }
    },
    // 取消流程
    {
      name: 'cancel',
      testMatch: 'cancel/*/*.test.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      }
    },
    // 作废流程
    {
      name: 'disuse',
      testMatch: 'disuse/*/*.test.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      }
    }
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI
  // }
})
