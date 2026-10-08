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
  primary: { href: "https://driven.ai/login", label: "开始使用" },
} as const;

export const hero = {
  line1: "擅长期权交易的投资 Agent",
  line2: "由实时行情数据驱动",
  support: "实时、专业、主动、个性化的投资 Agent，帮你把交易落实",
  primaryCta: "开始使用",
  secondaryCta: "查看 DrivenBench",
};

export const valueIntro = {
  label: "产品",
  title: "从实时数据，到把交易落实",
  support: "实时行情、专业 Skill、主动日程与个性化记忆，帮你把分析做成交易。",
  cta: { href: "#realtime", label: "了解更多" },
};

export const values = [
  {
    id: "realtime",
    title: "精通期权交易，更是投资多面手。",
    body: "内置美、港、A 市场股票、ETF 、期货实时行情，更有丰富的期权链数据和衍生指标",
    stages: ["点击提示", "获取与计算", "数据引用", "期权 Space"],
  },
  {
    id: "professional",
    title: "从专业分析到交易执行，不纸上谈兵。",
    body: "专业基金经理创建的 skill 提升分析能力，连接你的持仓券商把交易落实。",
    stages: ["持仓诊断", "调仓建议", "添加券商 MCP", "自然语言下单"],
  },
  {
    id: "proactive",
    title: "自动帮你干活，投资省心省力。",
    body: "利用 schedule task 和大事件信号等触发条件，将 AI 自动化能力发挥到极致。",
    stages: ["创建日程", "产出报告 H5", "Telegram 通知"],
  },
  {
    id: "personalized",
    title: "懂你。",
    body: "长期记忆，越用越懂你，按照既定 Playbook 执行且逐渐进化。",
    stages: ["记忆召回", "Playbook 执行", "进化建议"],
  },
] as const;

export const trust = {
  label: "值得信赖",
  title: "用实战标准衡量，而不是用话术。",
  support: "DrivenBench 在真实投资工作流中比较模型的能力、成本与延迟，而不是套用通用榜单。",
  cta: { href: "https://driven.ai/drivenbench", label: "打开完整榜单" },
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
  body: "数字来自数据库，而不是模型的记忆。你始终握有拍板权。",
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
      outlet: "MarketersMedia",
      date: "2026-09",
      title: "Driven 发布 DrivenBench：用真实投资任务比较主流模型",
      href: "https://news.marketersmedia.com/driven-launches-drivenbench-to-compare-leading-ai-models-across-real-world-investment-tasks/89204395",
    },
    {
      outlet: "Driven Blog",
      date: "2026-08",
      title: "最贵的模型不一定最好：11 个模型在 15 类投资任务中的结果",
      href: "https://driven.ai/whats-new/blog/most-expensive-ai-model-isnt-always-the-best",
    },
    {
      outlet: "Product Hunt",
      date: "2026",
      title: "Driven 在 Product Hunt 发布：你的 AI 投资团队",
      href: "https://driven.ai",
    },
    {
      outlet: "雪球",
      date: "2026-06",
      title: "内测用户：拆解财报、筛查市场信息，并沉淀为私有知识库",
      href: "https://www.xueqiu.com/u/3932375174",
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
