### 简介

> **测试工程：** GUI自动化测试

> **测试类型：** GUI场景自动化测试

---

### 特点

- **开发语言**：_TypeScript_
- **开发工具**：_VS Code_
- **开发框架**：[Playwright](https://playwright.nodejs.cn/)
- **测试相关**：
  - 测试框架：_Playwright_
  - 测试工具：_Playwright_
  - 测试断言：_Playwright_
  - 测试报告：_Playwright_
  - 测试单元：_Playwright_
  - 代码质量：_SonarQube_
  - 埋点监控：_Prometheus_、_Grafana_
  - 模型加持: _Midscene_
- **作业流程**：_Playwright插件_
- **执行方式**：_Pnpm命令_
- **持续集成**：_GitLab CI_

---

```javascript
pnpm install --frozen-lockfile # 初始化项目
pnpm lint:fix # 检查并自动修复代码
pnpm format # 格式化代码
pnpm test # 以无头模式运行测试
pnpm codegen # 录制测试用例并存储登录token
pnpm open # 使用登录token打开录制
```
