import { test } from '../../../fixtures/publicFixture'
import { basename } from 'path'
import { CustomTestStep } from '../../../hooks/customTestStep'
import { Assertion, assertRowCells } from '../../../utils/cellAssert'

test.describe('', () => {
  let orderId: string | null = null

  test('【购销合同】【预收款】订单节点: 待发货 && 合同状态: 待用印审批', async ({
    page,
    copyOrderPage,
    approvalPage,
    contractPage,
    orderApi
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
    await customTestStep.b2bTestStep('2. 商务审核通过', async () => {
      await approvalPage.businessApproval(orderId!, '通过')
      await orderApi.createPositiveEccId(orderId!, 'E')
    })

    await customTestStep.b2bTestStep('3. 人工审核通过', async () => {
      await approvalPage.manualApproval(orderId!, '通过')
      await orderApi.createPositiveEccId(orderId!, 'S')
      await orderApi.issueContract()
    })
    await customTestStep.b2bTestStep('4. 查看购销合同', async () => {
      await contractPage.contract(orderId!)
      // 定义每一列的断言内容
      const assertions: Assertion[] = [
        { columnName: orderId, description: '订单号' },
        {
          columnName: 'V1.0',
          description: '合同版本'
        },
        {
          columnName: '待发货',
          description: '订单状态'
        },
        {
          columnName: '未取消',
          description: '取消状态'
        },
        {
          columnName: '待用印审批',
          description: '合同状态'
        }
      ]
      // 使用工具函数执行断言
      await assertRowCells(page, assertions)
    })
  })
})
