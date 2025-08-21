import { test } from '../e2e/fixtures/publicFixture'
import { CustomTestStep } from '../e2e/hooks/customTestStep'

test.describe('', () => {
  // 示例1：使用默认超时（30秒）
  test('default timeout test', async ({ page }) => {
    const customStep = new CustomTestStep(test, page)

    await customStep.b2bTestStep('默认超时步骤', async () => {
      // 使用默认30秒超时
      await page.click('button.submit')
    })
  })

  // 示例2：创建时设置默认值 + 运行时覆盖
  test('mixed timeout test', async ({ page }) => {
    // 设置所有步骤默认超时为10秒
    const customStep = new CustomTestStep(test, page, 10_000)

    // 使用默认10秒超时
    await customStep.contractTestStep('合同管理步骤1', async () => {
      // ...
    })

    // 覆盖为5秒超时
    await customStep.contractTestStep(
      '关键合同步骤',
      async () => {
        // ...
      },
      5_000
    )
  })

  // 示例3：动态修改默认值 + 链式调用
  test('dynamic timeout test', async ({ page }) => {
    const customStep = new CustomTestStep(test, page)

    // 设置超时为2秒并立即使用（链式调用）
    await customStep.setStepTimeout(2_000).b2bTestStep('快速操作', async () => {
      // 使用2秒超时
    })

    // 修改为15秒超时
    customStep.setStepTimeout(15_000)

    // 使用新超时值
    await customStep.b2bTestStep('长时间操作', async () => {
      // 使用15秒超时
    })

    // 覆盖当前设置，使用60秒超时
    await customStep.b2bTestStep(
      '特殊操作',
      async () => {
        // ...
      },
      60_000
    )
  })
})
