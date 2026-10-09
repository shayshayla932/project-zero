import { publicAsset } from "@/lib/public-asset";

export const site = {
  name: "Driven",
  productUrl: "https://driven.ai",
  loginUrl: "https://driven.ai/login",
  pricingUrl: "https://driven.ai/pricing",
  whatsNewUrl: "https://driven.ai/whats-new",
  docsUrl: "https://docs.driven.ai/zh/get-started/what-is-driven",
  benchUrl: "https://driven.ai/drivenbench",
  title: "Driven — 擅长期权交易的投资 Agent",
  description: "实时、专业、主动、个性化的投资 Agent，帮你把交易落实",
};

export const nav = [
  { href: "https://driven.ai/about", label: "关于我们", external: true },
  { href: "https://driven.ai/zh-hans/options", label: "期权", external: true },
  { href: "https://driven.ai/zh-hans/connectors", label: "技能连接器", external: true },
  { href: "https://driven.ai/whats-new", label: "更新日志", external: true },
] as const;

export const navActions = {
  secondary: { href: "https://driven.ai/pricing", label: "定价" },
  primary: { href: "https://driven.ai/login", label: "免费试用 driven" },
} as const;

export const hero = {
  line1: "擅长期权交易的投资 Agent",
  line2: "由实时行情数据驱动",
  support: "专业、主动、个性化的投资 Agent，帮你把交易落实",
  primaryCta: "免费试用 driven",
  secondaryCta: "查看 DrivenBench",
};

export const outletLine = "Driven发布即登上 USA Today、AP 等 500+ 媒体与财经平台";

export const outletLogos = [
  { name: "USA Today", logo: "press-logos/mono/usa-today.svg" },
  { name: "AP", logo: "press-logos/mono/ap.svg" },
  { name: "FinancialContent", logo: "press-logos/mono/financialcontent.svg" },
  { name: "NewsBreak", logo: "press-logos/mono/newsbreak.svg" },
  { name: "Barchart", logo: "press-logos/mono/barchart.svg" },
  { name: "StreetInsider", logo: "press-logos/mono/streetinsider.svg" },
  { name: "IBTimes", logo: "press-logos/mono/ibtimes.svg" },
  { name: "Wedbush", logo: "press-logos/mono/wedbush.svg" },
] as const;

export const valueIntro = {
  label: "产品",
  title: "从实时数据，到把交易落实",
  support: "实时行情、专业 Skill、主动日程与个性化记忆，帮你把分析做成交易。",
  cta: { href: "#realtime", label: "了解更多" },
};

export const values = [
  {
    id: "realtime",
    eyebrow: "实时",
    title: "擅长期权交易，也是投资多面手。",
    body: "基于期权实时数据，帮你发现期权机会、比较交易策略；也有股票、ETF、外汇、加密货币与大宗商品实时行情，丰富你的投资体系。",
    stages: ["新对话", "点击财报期权", "工具调用", "数据引用", "期权追踪"],
  },
  {
    id: "professional",
    eyebrow: "专业",
    title: "连接券商账户，从专业分析到交易执行。",
    body: "连接你的持仓券商，调用丰富、专业的投资技能，提升你的投资能力和胜率。",
    stages: ["添加券商 MCP", "持仓诊断", "调仓建议", "自然语言下单"],
  },
  {
    id: "proactive",
    eyebrow: "主动",
    title: "7×24 小时主动监控与自动执行，投资省心省力。",
    body: "监控市场、捕捉信号、自动执行你的策略；多个任务可同时运行，每一步操作都完全透明。",
    stages: ["输入需求", "生成定时任务", "查看详情"],
  },
  {
    id: "personalized",
    eyebrow: "个性化",
    title: "记住投资风格及风险偏好，遵循你的投资原则。",
    body: "具备长期记忆，按照你的投资风格和偏好执行，越用越懂你。",
    stages: ["创建提问", "选股推荐"],
  },
] as const;

export const trust = {
  label: "值得信赖",
  cta: { href: "https://driven.ai/drivenbench", label: "打开完整榜单" },
};

export const dataSources = {
  title: "实时、专业的数据",
  sources: [
    { title: "港美股行情", body: "来自纳斯达克、港交所。", logos: ["nasdaq", "hkex"] },
    { title: "期权实时数据", body: "来自 OPRA、港交所 OMD。", logos: ["opra", "hkex"] },
    { title: "静态数据", body: "来自 FMP。", logos: ["fmp"] },
    { title: "大事件数据", body: "自研 Driven SEC tool 抓取及分析。", logos: ["driven"] },
  ],
};

export const drivenBench = {
  title: "基于投资实战的专业投资模型测评：DrivenBench",
  body: "DrivenBench 在 Driven 内对 11 个模型进行评测，共 55 项基于真实投资工作流与任务的能力评估。排名依据能力通过率，得分相同则并列排名。",
  note: "结果仅反映测试时的模型版本与条件，可能随时间变化，仅供比较研究参考，不构成投资建议。",
  rows: [
    { rank: "=1", model: "Claude Sonnet 5", vendor: "Anthropic", score: "93.9%", passes: "155/165", cost: "$57.69", latency: "30s/70s" },
    { rank: "=1", model: "Kimi K3", vendor: "Moonshot AI", score: "93.9%", passes: "155/165", cost: "$59.42", latency: "59s/169s" },
    { rank: "3", model: "Claude Opus 5", vendor: "Anthropic", score: "90.9%", passes: "150/165", cost: "$160.37", latency: "40s/90s" },
    { rank: "4", model: "DeepSeek V4 Pro", vendor: "DeepSeek", score: "89.7%", passes: "148/165", cost: "$30.64", latency: "24s/61s" },
    { rank: "5", model: "Grok 4.6", vendor: "xAI", score: "89.1%", passes: "147/165", cost: "$73.65", latency: "75s/158s" },
    { rank: "6", model: "GLM 5.2", vendor: "Zhipu AI", score: "87.3%", passes: "144/165", cost: "$25.64", latency: "23s/62s" },
    { rank: "7", model: "GPT-5.6 Sol", vendor: "OpenAI", score: "85.5%", passes: "141/165", cost: "$92.72", latency: "27s/61s" },
    { rank: "8", model: "Gemini 3.7 Flash", vendor: "Google", score: "81.8%", passes: "135/165", cost: "$13.74", latency: "23s/44s" },
    { rank: "9", model: "GPT-5.6 Luna", vendor: "OpenAI", score: "79.4%", passes: "131/165", cost: "$3.63", latency: "19s/39s" },
    { rank: "10", model: "DeepSeek V4 Flash", vendor: "DeepSeek", score: "77.6%", passes: "128/165", cost: "$2.97", latency: "20s/46s" },
    { rank: "11", model: "GPT-5.6 Terra", vendor: "OpenAI", score: "76.4%", passes: "126/165", cost: "$33.54", latency: "16s/32s" },
  ],
};

export const privacy = {
  title: "数据和隐私保护",
  points: [
    {
      title: "可核验的数据，而不是幻觉",
      body: "行情、期权链与衍生指标来自 260+ 专业数据端点。每一步可追溯来源，而不是靠模型回想。",
    },
    {
      title: "持仓与券商连接按授权使用",
      body: "券商 MCP 只在你主动授权后接入。Agent 可以起草交易，签字和责任始终在你。",
    },
    {
      title: "过程留痕，决策仍由你做主",
      body: "分析、日程与下单都有日志。Driven 是队友，不是自动驾驶，也不是持牌财务顾问。",
    },
  ],
};

export const testimonials = {
  title: "听听用户怎么说",
  subtitle: "真实的对话 · 真实的策略",
  items: [
    {
      name: "Jens Capital",
      handle: "@JensCapital",
      avatar: publicAsset("/user-voice/discord-avatar.webp"),
      href: "https://discord.com/channels/1404776438036434944/1443190350582911027/1497112045563281509",
      platform: "discord",
      span: "lg:col-span-2",
      quote:
        "I'm extremely impressed by the capabilities of this model. The skills within it are extremely powerful. This is the INTC model that I previously built. After the performance was disclosed, the model immediately updated the financial data and made comments based on the previously provided information. The understanding ability of context is extremely strong.",
    },
    {
      name: "Ash Davidson",
      handle: "@AshDavidsonUK",
      avatar: publicAsset("/user-voice/user-avatar-Ash.webp"),
      href: "https://x.com/AshDavidsonUK/status/2061458262009020803",
      platform: "x",
      quote:
        "Been using @Driven the last few weeks. With full data sets from FMP, you can build your own little finance tools. Helps with research, finding information and even automation. Very impressive for finance.",
    },
    {
      name: "Black",
      handle: "@Blk1115",
      avatar: publicAsset("/user-voice/user-avatar-blk.webp"),
      href: "https://x.com/Blk1115/status/2062068684303327437",
      platform: "x",
      quote:
        "To be honest, I've always been a bit reluctant to try out new AI startups, because I always feel like their quality definitely can't match the big established ones. But @Driven is genuinely pretty good. I've used it and compared it multiple times with the AI I'm currently using for investment research, and it really surprised me a bit.",
    },
    {
      name: "Wenz",
      handle: "@wenzherunze",
      avatar: publicAsset("/user-voice/user-avatar-Wenz.webp"),
      href: "https://x.com/wenzherunze/status/2062023476412887113",
      platform: "x",
      quote:
        "You should try @Driven. Investing in U.S. and A-share stocks has gotten increasingly complicated. I'm always switching between tabs to research, monitor signals, and manage my portfolio. Driven seems like it could make the whole process much easier.",
    },
    {
      name: "卫斯理",
      handle: "@imwsl90",
      avatar: publicAsset("/user-voice/user-avatar-Wesley.webp"),
      href: "https://x.com/imwsl90/status/2062008719098175678",
      platform: "x",
      quote:
        "After reading the original post, I feel this is the right way to approach vertical AI products. The product concept behind @Driven is spot-on: it's not just another financial chatbot, but genuinely equips you with an AI investment team.",
    },
    {
      name: "Bally_AgenticAI",
      handle: "@bally_kehal",
      avatar: publicAsset("/user-voice/user-avatar-Bally.webp"),
      href: "https://x.com/bally_kehal/status/2080338220114686409",
      platform: "x",
      quote:
        "This is what maturity looks like in agentic AI. Anyone can ship a prompt library — the hard part is what @Driven did here: reviewed, versioned Skills running on reliable market data. That's the line between a demo and infrastructure you can trust with real money.",
    },
    {
      name: "qinbafrank",
      handle: "@qinbafrank",
      avatar: publicAsset("/user-voice/user-avatar-frank.webp"),
      href: "https://x.com/qinbafrank/status/2080237471552680314",
      platform: "x",
      quote:
        "Recently used @Driven to help research several Hong Kong stock companies, and the experience was pretty good. The data provided is more accurate than that from general models, and many features are quite interesting. Today, they also updated this Skill Store, where you can install various skills uploaded by other users.",
    },
    {
      name: "Sea",
      handle: "@Sea_Bitcoin",
      avatar: publicAsset("/user-voice/user-avatar-Sea.webp"),
      href: "https://x.com/Sea_Bitcoin/status/2061765499508384126",
      platform: "x",
      quote:
        "Whether you're investing in U.S. stocks, A-shares, funds, or other products, you can use @Driven to let smart AI assist you with market research, signal monitoring, strategy building, and portfolio management. You can even execute orders through conversation.",
    },
    {
      name: "Lucy L.",
      handle: "@LucyBuilding",
      avatar: publicAsset("/user-voice/user-avatar-Lucy.webp"),
      href: "https://x.com/LucyBuilding/status/2080246212868096183",
      platform: "x",
      span: "lg:col-span-2",
      quote:
        "I've been using @Driven ai for a while now. It integrates multiple models, but compared to regular AI tools, it places more emphasis on investment research scenarios. In daily use, you can rely on it to organize company information, financial reports, valuations, and portfolio-related details, cutting down on the need to switch back and forth between different tools.",
    },
    {
      name: "kafkaworld",
      handle: "@kafkaworld14",
      avatar: publicAsset("/user-voice/user-avatar-kafkaworld.webp"),
      href: "https://x.com/kafkaworld14/status/2061446816219177166",
      platform: "x",
      quote:
        "@Driven is absolutely stunning! This product defines what a true investment-savvy AI agent should be",
    },
  ],
} as const;

export const press = {
  title: "媒体报道",
  items: [
    {
      outlet: "USA Today",
      logo: "press-logos/usa-today.svg",
      date: "2026-09-29",
      title: "Driven 发布 DrivenBench：用真实投资任务比较主流模型",
      href: "https://www.usatoday.com/press-release/story/44567/driven-launches-drivenbench-to-compare-leading-ai-models-across-real-world-investment-tasks/",
    },
    {
      outlet: "AP News",
      logo: "press-logos/ap.svg",
      date: "2026-09-25",
      title: "Driven 发布 DrivenBench：用真实投资任务比较主流模型",
      href: "https://apnews.com/press-release/marketersmedia/press-release-3536e20915909c5f1b37bb6c1f986076",
    },
    {
      outlet: "IBTimes",
      logo: "press-logos/ibtimes.svg",
      date: "2026-09-25",
      title: "Driven 发布 DrivenBench：用真实投资任务比较主流模型",
      href: "https://markets.financialcontent.com/ibtimes/news/article/marketersmedia-2026-9-25-driven-launches-drivenbench-to-compare-leading-ai-models-across-real-world-investment-tasks",
    },
    {
      outlet: "NewsBreak",
      logo: "press-logos/newsbreak.svg",
      date: "2026-09-29",
      title: "Driven 发布 DrivenBench：用真实投资任务比较主流模型",
      href: "https://www.newsbreak.com/dmr-news-321522575/4907480135322-driven-launches-drivenbench-to-compare-leading-ai-models-across-real-world-investment-tasks",
    },
  ],
};

export const faq = {
  title: "还有问题？",
  compare: {
    question: "Driven 和 ChatGPT 有什么不同？",
    generalHeader: "通用 AI（ChatGPT、Claude 等）",
    drivenHeader: "Driven",
    rows: [
      { label: "金融数据", general: "依赖训练数据和网页搜索", driven: "接入 260+ 个专业行情数据接口" },
      { label: "分析能力", general: "通用知识问答", driven: "机构级技能，为投研场景专门设计的工作流" },
      { label: "记忆", general: "通用记忆", driven: "持久且不断演进的投资策略记忆" },
      { label: "任务", general: "只有基础的低频定时能力", driven: "7×24 小时自动监控与执行" },
      { label: "组合管理", general: "没有", driven: "模拟交易，以及通过已支持的连接器接入券商的实盘执行" },
    ],
  },
  items: [
    {
      question: "Driven 支持哪些平台？",
      lines: [
        { label: "网页版：", text: "功能完整，桌面端与移动端浏览器都能用，无需安装。" },
        { label: "Telegram：", text: "通过 Telegram Bot 与你的 Agent 对话，几乎支持全部核心功能。" },
        { text: "更多平台（Slack、Discord、微信等）正在路上。你的 Agent、策略与数据在所有平台间保持同步。" },
      ],
    },
    {
      question: "我可以创建多个 Agent 吗？",
      intro: "可以。Free 与 Pro 包含 1 个 Agent，Max 与 Ultra 可解锁更多。",
      lead: "每个 Agent 都有自己的策略手册、投资组合与定时任务。常见搭配：",
      lines: [
        { text: "一个 Agent 盯美股，另一个盯港股。" },
        { text: "一个稳健收益型 Agent，搭配一个进取成长型 Agent。" },
        { text: "一个专职监控 Agent，跟踪宏观指标。" },
      ],
      outro: "各个 Agent 完全独立，不同策略之间互不干扰。",
    },
    {
      question: "支持哪些市场和资产类型？",
      lines: [
        { label: "市场：", text: "研究覆盖美股、港股与 A 股，以及全球宏观与市场背景数据。" },
        { label: "资产类型：", text: "股票、ETF 与基金、美股期权、外汇、加密货币、大宗商品，以及用于研究分析的宏观数据。" },
        { text: "覆盖范围与更新频率因市场和数据集而异。模拟交易目前支持美股与港股账户。券商持仓分析与实盘下单需通过已支持的券商连接器，且仅在开放地区可用。" },
      ],
    },
    {
      question: "Driven 如何保护我的数据？",
      lead: "Driven 采用隐私优先的架构：",
      lines: [
        { label: "边缘计算：", text: "数据在 Cloudflare 的全球边缘网络上处理，而非集中式服务器。" },
        { label: "数据隔离：", text: "每位用户的数据都存放在各自独立的环境中。" },
        { label: "静态加密：", text: "所有存储的数据都经过加密。" },
        { label: "身份认证：", text: "通过 Google OAuth 安全登录。" },
        { label: "不共享：", text: "你的策略、投资组合与对话不会被共享，也不会用于训练 AI 模型。" },
      ],
    },
    {
      question: "Driven 提供投资建议吗？",
      paragraphs: [
        "Driven 的 Agent 会收集信息、进行分析，不提供投资建议。这些内容仅供参考。",
        "最终的投资决策始终应由你自己作出。Driven 帮你研究得更充分、更省时间，但你需要为自己的投资完全负责。",
      ],
      emphasis: "这些内容仅供参考。",
    },
    {
      question: "AI 会出错吗？",
      lead: "会，这一点很重要。AI 模型可能会：",
      lines: [
        { text: "误读数据或得出错误结论。" },
        { text: "基于不完整的信息进行分析。" },
        { text: "在计算或推理中出错。" },
      ],
      outro: "正因如此，透明性是 Driven 设计的核心。Agent 的每一步都有记录，你可以查看它的推理过程、核对数据来源，并推翻任何决定。Agent 是强大的助手，不是自动驾驶。",
    },
    {
      question: "我可以导出自己的数据吗？",
      paragraphs: [
        "可以。每个 Agent 都有自己的工作区，生成的研究报告与分析文件可直接下载。策略手册、交易记录与持仓数据也可随时在 Agent 面板中查看。",
      ],
    },
    {
      question: "试用需要绑定信用卡吗？",
      paragraphs: ["不需要。新用户可以直接从 Free 套餐开始，无需信用卡。"],
    },
    {
      question: "哪里可以获得帮助？",
      lines: [
        { label: "产品内反馈：", text: "在 Driven 中点击 Feedback 按钮直接提交反馈。" },
        {
          label: "Discord：",
          before: "加入 ",
          link: { href: "https://discord.gg/sZxgvQfvga", label: "Discord 上的 Driven 社区" },
          text: "，反馈产品意见、交流投资策略。",
        },
        {
          label: "邮件：",
          before: "通过 ",
          link: { href: "mailto:community@driven.ai", label: "community@driven.ai" },
          text: " 联系我们。",
        },
      ],
    },
  ],
};

export const footer = {
  tagline: "Made by investors, for investors",
  copyright: "© 2026 SNOWBALL WEALTH PRIVATE LIMITED",
  social: [
    { href: "https://x.com/getDrivenAI", label: "X (Twitter)", icon: "x" },
    { href: "https://discord.gg/sZxgvQfvga", label: "Discord", icon: "discord" },
    { href: "https://www.youtube.com/@GetDrivenAI", label: "YouTube", icon: "youtube" },
    {
      href: "https://www.linkedin.com/company/getdrivenai/posts/?feedView=all",
      label: "LinkedIn",
      icon: "linkedin",
    },
  ],
  columns: [
    {
      title: "Product",
      links: [
        { href: "https://driven.ai/about", label: "About" },
        { href: "https://driven.ai/options", label: "Options" },
        { href: "https://driven.ai/skills", label: "Skills" },
        { href: "https://driven.ai/connectors", label: "Connectors" },
        { href: "https://driven.ai/whats-new", label: "What's New" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "https://driven.ai/drivenbench", label: "DrivenBench" },
        { href: "https://docs.driven.ai", label: "Docs", external: true },
        { href: "https://driven.ai/comparisons", label: "Comparisons" },
        { href: "mailto:community@driven.ai", label: "Contact Us" },
      ],
    },
    {
      title: "Legal & Regulatory",
      links: [
        { href: "https://driven.ai/terms", label: "Terms of Service" },
        { href: "https://driven.ai/privacy", label: "Privacy Policy" },
        {
          href: "https://driven.ai/risk-disclosure",
          label: "Risk Disclosure & Disclaimer",
        },
      ],
    },
  ],
} as const;
