import { test } from '../../../fixtures/publicFixture'
import { basename } from 'path'
import { CustomTestStep } from '../../../hooks/customTestStep'
import { Assertion, assertTextExists } from '../../../utils/textAssert'

test.describe('', () => {
  let orderId: string | null = null

  test('【取消】【购销合同】【信用】订单节点: SAP返回ECCID && 取消提交 && 撤销购销合同 && 合同状态: 已撤销', async ({
    page,
    copyOrderPage,
    approvalPage,
    contractPage,
    cancelPage,
    orderApi
  }) => {
    const customTestStep = new CustomTestStep(test, page)
    const fileName = basename(test.info().file, '.test.ts')
    console.log(`【🚀启动测试】用例为 → ${fileName}`)
    await customTestStep.b2bTestStep('1. 复制订单 → 待商务审核', async () => {
      orderId = await copyOrderPage.copyOrder(process.env.CREDIT_ORDER_NO)
      if (!orderId) {
        test.fail(true, '【❌Fail】创建订单失败')
      }
      console.log('创建的订单号: ', orderId)
    })
    await customTestStep.b2bTestStep('2. 商务审核通过', async () => {
      await approvalPage.businessApproval(orderId!, '通过')
      await orderApi.createPositiveEccId(orderId!, 'S')
    })
    await customTestStep.b2bTestStep('3. 取消提交', async () => {
      await cancelPage.cancelSubmit(orderId!, '查看')
    })
    await customTestStep.b2bTestStep('4. 查看购销合同', async () => {
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
