import { test } from '../../../fixtures/publicFixture'
import { basename } from 'path'
import { CustomTestStep } from '../../../hooks/customTestStep'
import { Assertion, assertRowCells } from '../../../utils/cellAssert'

test.describe('', () => {
  let orderId: string | null = null

  test('【购销合同】【信用】合同节点: 已盖章 && 盖章状态: 甲方乙方已盖章 && 未核查 && 总部特殊作废 && 不生成购销合同 && 合同状态: 作废中', async ({
    page,
    copyOrderPage,
    approvalPage,
    contractPage,
    stampPage,
    disusePage,
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
      await orderApi.createPositiveEccId(orderId!, 'S')
      await orderApi.issueContract()
      await contractApi.sealApprovalToStamp(orderId! + 'V1.0')
    })
    await customTestStep.b2bTestStep('3. 发起盖章', async () => {
      await stampPage.iinitiateStamp(orderId!, '待盖章')
    })
    await customTestStep.contractTestStep('4. 甲方盖章', async () => {
      await stampPage.partyAStamp(orderId!)
    })
    await customTestStep.b2bTestStep('5. 乙方上传合同', async () => {
      await stampPage.partyBUpload(orderId!, '盖章中')
    })
    await customTestStep.b2bTestStep('6. 总部特殊作废', async () => {
      await disusePage.headquartersSpecialDisuse(orderId!)
    })
    await customTestStep.b2bTestStep('7. 查看购销合同', async () => {
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
          columnName: '郑英',
          description: '当前处理人'
        },
        {
          columnName: '作废中',
          description: '合同状态'
        }
      ]
      // 使用工具函数执行断言
      await assertRowCells(page, assertions)
    })
  })
})
