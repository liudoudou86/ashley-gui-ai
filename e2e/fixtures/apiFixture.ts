import { APIRequestContext } from '@playwright/test'
import { OrderApi } from '../apis/orderApi'
import { ContractApi } from '../apis/contractApi'

// 定义通用 fixture 工厂函数
function createRequestFixture<T>(
  apiClass: new (request: APIRequestContext) => T
) {
  return async (
    { request }: { request: APIRequestContext },
    use: (fixture: T) => Promise<void>
  ) => {
    const instance = new apiClass(request)
    await use(instance)
  }
}

// 自定义接口fixtures
export const apiFixtures = {
  orderApi: createRequestFixture(OrderApi),
  contractApi: createRequestFixture(ContractApi)
}

// 使用通用函数创建 fixture
export type ApiFixtures = {
  orderApi: OrderApi
  contractApi: ContractApi
}
