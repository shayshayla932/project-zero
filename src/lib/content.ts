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
  { href: "https://driven.ai/about", label: "About", external: true },
  { href: "https://driven.ai/options", label: "Options", external: true },
  { href: "https://driven.ai/connectors", label: "Skills connector", external: true },
  { href: "https://driven.ai/whats-new", label: "What's new", external: true },
] as const;

export const navActions = {
  secondary: { href: "https://driven.ai/pricing", label: "定价" },
  primary: { href: "https://driven.ai/login", label: "开始使用" },
} as const;

export const hero = {
  slogan: "擅长期权交易的投资 Agent — 由实时行情数据驱动",
  support: "实时、专业、主动、个性化的投资 Agent，帮你把交易落实",
  primaryCta: "开始使用",
  secondaryCta: "查看 DrivenBench",
};

export const valueIntro = {
  eyebrow: "产品价值",
  title: "从实时数据，到把交易落实",
};

export const values = [
  {
    id: "realtime",
    eyebrow: "Real-time：Data",
    title: "精通期权交易，更是投资多面手。",
    body: "内置美、港、A 市场股票、ETF 、期货实时行情，更有丰富的期权链数据和衍生指标",
    stages: ["点击提示", "获取与计算", "数据引用", "期权 Space"],
  },
  {
    id: "professional",
    eyebrow: "Professional：Skill Store、MCP",
    title: "从专业分析到交易执行，不纸上谈兵。",
    body: "专业基金经理创建的 skill 提升分析能力，连接你的持仓券商把交易落实。",
    stages: ["持仓诊断", "调仓建议", "添加券商 MCP", "自然语言下单"],
  },
  {
    id: "proactive",
    eyebrow: "Proactive：Schedule、Event Trigger、Telegram Channel",
    title: "自动帮你干活，投资省心省力。",
    body: "利用 schedule task 和大事件信号等触发条件，将 AI 自动化能力发挥到极致。",
    stages: ["创建日程", "产出报告 H5", "Telegram 通知"],
    comingSoon: ["Event Trigger"],
  },
  {
    id: "personalized",
    eyebrow: "Personalized：Memory、Playbook、Suggest tool",
    title: "懂你。",
    body: "长期记忆，越用越懂你，按照既定 Playbook 执行且逐渐进化。",
    stages: ["记忆召回", "Playbook 执行", "进化建议"],
    comingSoon: ["Suggest tool"],
  },
] as const;

export const trust = {
  eyebrow: "值得信赖",
  title: "用实战标准衡量，而不是用话术。",
};

export const drivenBench = {
  title: "基于投资实战的专业投资模型测评：DrivenBench",
  body: "DrivenBench 在真实投资工作流中比较模型的能力、成本与延迟，而不是套用通用榜单。第一版覆盖 11 个模型、55 项能力评测、15 个任务类别。",
  note: "排名按能力通过率；同分并列。结果随版本与环境变化，仅供比较研究，不构成投资建议。",
  rows: [
    { rank: "=1", model: "Claude Sonnet 5", vendor: "Anthropic", score: "93.9%", cost: "$57.69", latency: "30s / 70s" },
    { rank: "=1", model: "Kimi K3", vendor: "Moonshot AI", score: "93.9%", cost: "$59.42", latency: "59s / 169s" },
    { rank: "3", model: "Claude Opus 5", vendor: "Anthropic", score: "90.9%", cost: "$160.37", latency: "40s / 90s" },
    { rank: "4", model: "DeepSeek V4 Pro", vendor: "DeepSeek", score: "89.7%", cost: "$30.64", latency: "24s / 61s" },
    { rank: "5", model: "Grok 4.6", vendor: "xAI", score: "89.1%", cost: "$73.65", latency: "75s / 158s" },
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
  title: "用户声音",
  subtitle: "真实对话，而不是轮播口号",
  items: [
    {
      name: "Jens Capital",
      handle: "@JensCapital",
      quote:
        "模型的能力让我非常惊讶，里面的 Skill 非常强。这是我之前建的 INTC 模型。业绩披露后，它立刻更新财务数据，并基于先前信息作出点评。上下文理解能力极强。",
    },
    {
      name: "Black",
      handle: "@Blk1115",
      quote:
        "说实话，我一直不太愿意尝试新的 AI 创业公司，总觉得质量肯定比不上大厂。但 Driven 确实不错。我和正在使用的投研 AI 对比过多次，还真有点惊喜。",
    },
    {
      name: "kafkaworld",
      handle: "@kafkaworld14",
      quote: "Driven 太惊艳了。这个产品定义了什么才是真正懂投资的 AI Agent。",
    },
    {
      name: "卫斯理",
      handle: "@imwsl90",
      quote:
        "这才是垂直 AI 该有的做法。Driven 的产品理念非常准：它不是又一个金融聊天机器人，而是真正给你配备一支 AI 投资团队。",
    },
    {
      name: "qinbafrank",
      handle: "@qinbafrank",
      quote:
        "最近用 Driven 研究了几家港股公司，体验不错。数据比通用模型更准，不少功能也很有意思。他们还更新了 Skill Store，可以安装其他用户上传的各种 Skill。",
    },
    {
      name: "Bally_AgenticAI",
      handle: "@bally_kehal",
      quote:
        "这才是 agentic AI 该有的成熟度。谁都能做一堆 prompt 库——难的是 Driven 做的这些：经过审阅、带版本的 Skill，跑在可靠的行情数据上。这才是 demo 和能托付真金白银的基础设施之间的分界线。",
    },
  ],
};

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
