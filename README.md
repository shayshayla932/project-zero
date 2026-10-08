# Driven 营销落地页

Driven 中文营销站点：擅长期权交易、由实时行情驱动的投资 Agent。页面按产品价值（实时数据、专业 Skill / MCP、主动自动化、个性化记忆）与「值得信赖」板块组织，英雄区只有口号、副文案和行动按钮，不含产品截图。

## 本地运行

需要 Node.js 20+。

```bash
npm install
npm run dev
```

开发服务器默认监听 [http://127.0.0.1:38427](http://127.0.0.1:38427)。`next.config.ts` 已允许本机与 Cursor 预览源，避免客户端脚本无法水合。

## 静态页面

别人不需要安装 Node，也不用连这台开发机。在项目里执行：

```bash
npm run export:html
```

生成的文件在 `out/`。把整个 `out` 文件夹发给对方，让他们用浏览器打开里面的 `index.html` 即可。图片、字体和页面脚本都用相对路径，双击打开也能看到。

```bash
npm run build
```

## 技术栈

- Next.js（App Router）+ TypeScript
- Tailwind CSS
- shadcn/ui
- 自托管 Noto Sans SC（简体 + Latin，400/700），不依赖系统中文字体

不含登录、数据库或其他后端服务。页内演示是前端分镜动画，用于说明产品流程。
