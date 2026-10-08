# Driven 营销落地页

Driven 中文营销站点：擅长期权交易、由实时行情驱动的投资 Agent。页面按产品价值（实时数据、专业 Skill / MCP、主动自动化、个性化记忆）与「值得信赖」板块组织，英雄区只有口号、副文案和行动按钮，不含产品截图。

## 本地运行

需要 Node.js 20+。

```bash
npm install
npm run dev
```

开发服务器默认监听 [http://127.0.0.1:43261](http://127.0.0.1:43261)。`next.config.ts` 已允许本机与 Cursor 预览源，避免客户端脚本无法水合。

```bash
npm run build
npm run start
```

生产模式请自行指定端口，例如 `npx next start --port 43261`。

## 技术栈

- Next.js（App Router）+ TypeScript
- Tailwind CSS
- shadcn/ui
- 自托管 Noto Sans SC（简体 + Latin，400/700），不依赖系统中文字体

不含登录、数据库或其他后端服务。页内演示是前端分镜动画，用于说明产品流程。
