import { type Page } from '@playwright/test'
import { CopyOrderPage } from '../pages/copyOrderPage'
import { ContractPage } from '../pages/contractPage'
import { ApprovalPage } from '../pages/approvalPage'
import { StampPage } from '../pages/stampPage'
import { CancelPage } from '../pages/cancelPage'
import { DisusePage } from '../pages/disusePage'
import { CheckPage } from '../pages/checkPage'

// 定义通用 fixture 工厂函数
function createPageFixture<T>(pageClass: new (page: Page) => T) {
  return async (
    { page }: { page: Page },
    use: (fixture: T) => Promise<void>
  ) => {
    const instance = new pageClass(page)
    await use(instance)
  }
}

// 自定义页面fixtures
export const pageFixtures = {
  copyOrderPage: createPageFixture(CopyOrderPage),
  contractPage: createPageFixture(ContractPage),
  approvalPage: createPageFixture(ApprovalPage),
  cancelPage: createPageFixture(CancelPage),
  stampPage: createPageFixture(StampPage),
  disusePage: createPageFixture(DisusePage),
  checkPage: createPageFixture(CheckPage)
}

// 导出页面fixtures类型
export type PageFixtures = {
  copyOrderPage: CopyOrderPage
  contractPage: ContractPage
  approvalPage: ApprovalPage
  cancelPage: CancelPage
  stampPage: StampPage
  disusePage: DisusePage
  checkPage: CheckPage
}
