import { test } from '../../../fixtures/publicFixture'
import { basename } from 'path'
import { CustomTestStep } from '../../../hooks/customTestStep'
import { Assertion, assertTextExists } from '../../../utils/textAssert'

test.describe('', () => {
  let orderId: string | null = null

  test('【购销合同】【预收款】订单节点: 商务审核否决 && 合同状态: 已撤销', async ({
    page,
    copyOrderPage,
    approvalPage,
    contractPage
  }) => {
    const customTestStep = new CustomTestStep(test, page)
    const fileName = basename(test.info().file, '.test.ts')
    console.log(`【🚀启动测试】用例为 → ${fileName}`)
    await customTestStep.b2bTestStep('1. 复制订单 → 待商务审核', async () => {
      orderId = await copyOrderPage.copyOrder(process.env.PRE_PAYMENT_ORDER_NO)
      if (!orderId) {
        test.fail(true, '【❌Fail】创建订单失败')
      }
      console.log('创建的订单号: ', orderId)
    })
    await customTestStep.b2bTestStep('2. 商务审核否决', async () => {
      await approvalPage.businessApproval(orderId!, '否决')
    })
    await customTestStep.b2bTestStep('3. 查看购销合同', async () => {
      await contractPage.contract(orderId!)
      // 定义每一列的断言内容
      const assertions: Assertion[] = [
        { text: '暂无符合条件的数据', description: '列表页数据' }
      ]
      // 使用工具函数执行断言
      await assertTextExists(page, assertions)
    })
  })
})
