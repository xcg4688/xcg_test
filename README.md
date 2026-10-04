# 灵库 v0.1 原型

零第三方运行依赖的第一版可运行骨架，用于先确认交互和数据结构。

## Windows / macOS / Linux
1. 安装 Node.js 18+
2. 在本目录运行：`node server.js`
3. 浏览器打开：`http://localhost:8787`

## 已实现
- H5 极简首页
- 文字/链接收藏骨架
- 本地 JSON 数据持久化（测试版）
- 规则引擎模拟 AI 初步提炼
- 知识卡列表、搜索
- 内容管理、编辑、删除
- AI 模型配置骨架
- 响应式移动端页面

## 下一开发批次
- DeepSeek/OpenAI 兼容 API Gateway 与连接测试
- Prompt 模板中心与 AI 动态知识卡
- 网页正文抓取/智能降级
- 图片上传/OCR
- 录音/音频上传/STT
- 分类标签/专题/工具百宝阁
- 去重、Embedding、Hybrid Search、RAG 问答与引用
- 数据导出

正式商业版再迁移 PostgreSQL + pgvector，并增加用户、登录、权限、套餐和平台总后台。
