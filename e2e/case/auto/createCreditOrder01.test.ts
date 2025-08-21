import { test } from '../../fixtures/publicFixture'
import { basename } from 'path'
import { CustomTestStep } from '../../hooks/customTestStep'

test.describe('', () => {
  let orderId: string | null = null

  test('【购销合同】【信用】订单节点: 商务审核通过 && 合同状态: 待用印审批', async ({
    page,
    copyOrderPage,
    approvalPage,
    orderApi,
    contractApi
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
      await orderApi.issueContract()
      await contractApi.sealApprovalToStamp(orderId! + 'V1.0')
    })
  })
})
