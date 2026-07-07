import { useEffect, useRef, useState } from 'react';
import {
  Github, Linkedin, Mail, BookOpen, Globe,
  ChevronRight, Award, Cpu, TrendingUp, Zap, Database,
  GraduationCap, FileText, Building2, Calendar, Menu, X, ArrowUpRight,
  BookMarked, Microscope, Newspaper, ShoppingCart,
  Network, Coins, Bot, Lightbulb,
  ArrowRight, BarChart3, Shield, Layers, GitBranch, Workflow, Cpu as CpuIcon, CircleDot,
  Search, PenLine, FlaskConical, Users
} from 'lucide-react';

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    title: 'Payment Intelligence',
    desc: 'AI-driven multi-rail payment routing with real-time orchestration logic and analytics dashboard.',
    tags: ['AI', 'Payments', 'Analytics'],
    url: 'https://avikcincy-sanju.github.io/Payment_Intelligence/',
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'BNPL Calculator',
    desc: 'Buy Now Pay Later cost & conversion calculator for merchants evaluating BNPL adoption economics.',
    tags: ['BNPL', 'FinTech', 'Calculator'],
    url: 'https://avikcincy-sanju.github.io/BNPL_Cost_Conversion_Calculator/',
    icon: <ShoppingCart className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'Merchant Intelligence Monitor',
    desc: 'Enterprise merchant monitoring platform with intelligent alerting and performance diagnostics.',
    tags: ['Merchant', 'Intelligence', 'Monitor'],
    url: 'https://avikcincy-sanju.github.io/Merchant-Intelligence-Edition/',
    icon: <Building2 className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'AI Route Advisor',
    desc: 'AI-powered payment route advisor using ML models to optimize authorization rates and reduce costs.',
    tags: ['AI', 'Routing', 'ML'],
    url: 'https://avikcincy-sanju.github.io/AI_SBC_Route_Advisor/',
    icon: <Cpu className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'MCP Agentic Commerce',
    desc: 'Model Context Protocol demo for agentic commerce — autonomous AI agents orchestrating payments.',
    tags: ['MCP', 'Agentic', 'AI'],
    url: 'https://avikcincy-sanju.github.io/MCPDemo/',
    icon: <Zap className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'GTM & Ops Simulator',
    desc: 'Platform Payments GTM & Operating Model Simulator for strategy teams evaluating go-to-market plays.',
    tags: ['GTM', 'Strategy', 'Simulator'],
    url: 'https://avikcincy-sanju.github.io/GTM_Ops_Simulator/',
    icon: <Globe className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'Stablecoin OS',
    desc: 'Stablecoin operating system prototype demonstrating treasury, settlement, and liquidity management.',
    tags: ['Stablecoin', 'DeFi', 'Treasury'],
    url: 'https://avikcincy-sanju.github.io/stablecoinOS/',
    icon: <Database className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'Agentic Commerce MCP',
    desc: 'Open-source MCP server implementation enabling AI agents to autonomously execute commerce transactions.',
    tags: ['Open Source', 'MCP', 'Commerce'],
    url: 'https://github.com/avikcincy-sanju/agentic-commerce-mcp',
    icon: <Github className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'Agentic Commerce Revenue Impact Simulator',
    desc: 'Synthetic framework simulator modeling revenue impact scenarios for agentic commerce adoption across merchant segments.',
    tags: ['Agentic', 'Revenue', 'Simulator'],
    url: 'https://avikcincy-sanju.github.io/Agentic_commerce_rev_impact/',
    meta: 'Version 1.0  |  Synthetic Framework  |  July 1, 2026',
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
];

const SSRN_PAPERS = [
  {
    title: 'The Emergence of Intelligent Payment Systems: An AI-Driven Framework for Multi-Rail Payment Orchestration',
    url: 'https://ssrn.com/abstract=6613638',
    id: '6613638',
  },
  {
    title: 'AI-Native Intelligent Payment Systems: Autonomous Financial Execution in Multi-Rail Infrastructure',
    url: 'https://ssrn.com/abstract=6708820',
    id: '6708820',
  },
  {
    title: 'A Conceptual Systems Governance Framework for Autonomous Financial Execution: The Sovereign Payment Agent Model',
    url: 'https://ssrn.com/abstract=6765180',
    id: '6765180',
  },
  {
    title: 'Verifiable Agent Identity and Delegated Authority in Autonomous Payment Systems',
    url: 'https://ssrn.com/abstract=6920081',
    id: '6920081',
  },
];

const ZENODO_PAPERS = [
  { title: 'Zenodo Research Paper', record: '20261877', url: 'https://zenodo.org/records/20261877' },
  { title: 'Zenodo Research Paper', record: '20261969', url: 'https://zenodo.org/records/20261969' },
  { title: 'Zenodo Research Paper', record: '20315696', url: 'https://zenodo.org/records/20315696' },
  { title: 'Zenodo Research Paper', record: '20599540', url: 'https://zenodo.org/records/20599540' },
  { title: 'AI Route Advisor Prototype', record: '20140629', url: 'https://zenodo.org/records/20140629' },
];

const MEDIUM_ARTICLES = [
  { title: 'The Stablecoin Periodic Table: A Framework for Mapping the Architecture of the Internet Financial System', url: 'https://medium.com/@avikcincy/the-stablecoin-stack-mapping-the-architecture-of-the-internet-financial-system-ac2d4ff16f5d' },
  { title: 'The Emergence of Intelligent Payment Systems', url: 'https://medium.com/@avikcincy/the-emergence-of-intelligent-payment-systems-154044c1905d' },
  { title: 'From Stablecoin Infrastructure to Agentic Commerce', url: 'https://medium.com/@avikcincy/from-stablecoin-infrastructure-to-agentic-commerce-853afaf7b2c6' },
  { title: 'The Agentic Commerce Stack: From Protocols to Real-World Payments', url: 'https://medium.com/@avikcincy/the-agentic-commerce-stack-from-protocols-to-real-world-payments-81a136d8b275' },
  { title: 'Beyond Agentic Commerce: The Rise of the Autonomous Money Stack — The shift no one is fully pricing in', url: 'https://medium.com/@avikcincy/beyond-agentic-commerce-the-rise-of-the-autonomous-money-stack-the-shift-no-one-is-fully-pricing-3684939e0c1e' },
  { title: 'The Stablecoin Acquiring Playbook: How to Build, Monetize, and Scale the Next Generation of Payments', url: 'https://medium.com/@avikcincy/the-stablecoin-acquiring-playbook-how-to-build-monetize-and-scale-the-next-generation-of-49ee4bdc3b08' },
  { title: 'Why Stablecoins Still Need an Intelligence Engine to Power Global Payments', url: 'https://medium.com/@avikcincy/why-stablecoins-still-need-an-intelligence-engine-to-power-global-payments-a3fe9fcd860e' },
  { title: 'The Missing Layer in Stablecoins: Testing, Assurance, and Trust in an Irreversible Payment World', url: 'https://medium.com/@avikcincy/the-missing-layer-in-stablecoins-testing-assurance-and-trust-in-an-irreversible-payment-world-57e333f69410' },
  { title: 'From Payments to Intelligent Value Orchestration: How AI, Programmable Money, and Multi-Rail Systems Are Redefining Finance', url: 'https://medium.com/@avikcincy/from-payments-to-intelligent-value-orchestration-how-ai-programmable-money-and-multi-rail-68a08d879faf' },
  { title: 'The Internet Was Built Without a Payment Layer. HTTP 402 May Finally Have One.', url: 'https://medium.com/@avikcincy/the-internet-was-built-without-a-payment-layer-http-402-may-finally-have-one-f3e13fed358b' },
  { title: 'Global Stablecoin Regulation Power Map: What\'s Changing, Who\'s Impacted and How FX & Settlement Rails Are Being Rebuilt', url: 'https://medium.com/@avikcincy/global-stablecoin-regulation-power-map-whats-changing-who-s-impacted-and-how-fx-settlement-31e94df40b04' },
  { title: 'The Stablecoin Merchant Stack: Why Acceptance Models, Card Rails, and Regional Demand Are Colliding Into a $600B Opportunity', url: 'https://medium.com/@avikcincy/the-stablecoin-merchant-stack-why-acceptance-models-card-rails-and-regional-demand-are-colliding-4250a1deb96a' },
  { title: 'When Orchestration Stops Being a Feature and Becomes the Infrastructure', url: 'https://medium.com/@avikcincy/when-orchestration-stops-being-a-feature-and-becomes-the-infrastructure-b4de01600908' },
  { title: 'Payments Was Never a Transaction Problem', url: 'https://medium.com/@avikcincy/payments-was-never-a-transaction-problem-99bd1bf5f266' },
  { title: 'The Stablecoin Stack War Is Actually a Fight Over Who Controls the Agent\'s Wallet', url: 'https://medium.com/@avikcincy/the-stablecoin-stack-waris-actually-a-fight-overwho-controls-the-agents-wallet-65e9e909a245' },
  { title: 'Mastercard Just Put Its Trust Layer on Rails It Doesn\'t Own', url: 'https://medium.com/@avikcincy/mastercard-just-put-its-trust-layer-on-rails-it-doesnt-own-25f3313e6686' },
  { title: 'The Checkout Disappears', url: 'https://medium.com/@avikcincy/the-checkout-disappears-da5e624f64ab' },
  { title: 'Your AI Wants to Take a Payment. Right Now, It Can\'t.', url: 'https://medium.com/@avikcincy/your-ai-wants-to-take-a-payment-right-now-it-cant-4538a50d5e33' },
  { title: 'The Acquirer\'s Second Act', url: 'https://medium.com/@avikcincy/the-acquirers-second-act-4beb12d47b8b' },
  { title: 'When the Checkout Disappears: The Complete Protocol Stack Behind Agent-Initiated Payments', url: 'https://medium.com/@avikcincy/when-the-checkout-disappears-the-complete-protocol-stack-behind-agent-initiated-payments-e4e8c93b6294' },
  { title: 'Open USD and the Consortium Turn', url: 'https://medium.com/@avikcincy/open-usd-and-the-consortium-turn-3093f19489a1' },
];

const FINEXTRA_ARTICLES = [
  { title: 'Stablecoins Aren\'t Replacing Payments — They\'re Rewriting Settlement', url: 'https://www.finextra.com/blogposting/30625/stablecoins-arent-replacing-payments--theyre-rewriting-settlement' },
  { title: 'The Science of Settlement: How Stablecoins Are Reshaping Merchant Payments', url: 'https://www.finextra.com/blogposting/30655/the-science-of-settlement-how-stablecoins-are-reshaping-merchant-payments' },
  { title: 'When Should a Payment Use Stablecoins? The Decision Framework Institutions Are Building', url: 'https://www.finextra.com/blogposting/30706/when-should-a-payment-use-stablecoins-the-decision-framework-institutions-are-building' },
  { title: 'From Rails to Reasoning: Stablecoins in the Next Payments Stack', url: 'https://www.finextra.com/blogposting/30762/from-rails-to-reasoning-stablecoins-in-the-next-payments-stack' },
  { title: 'Beyond Checkout: How Stablecoins Will Enable Autonomous Merchant Treasury Networks', url: 'https://www.finextra.com/blogposting/30771/beyond-checkout-how-stablecoins-will-enable-autonomous-merchant-treasury-networks' },
  { title: 'Why Loyalty and Rewards Are About to Stop Being "Points" and Start Being Smart Money', url: 'https://www.finextra.com/blogposting/30849/why-loyalty-and-rewards-are-about-to-stop-being-points-and-start-being-smart-money' },
  { title: 'Stablecoin Debit: When Your Wallet Becomes a Global, Programmable Checking Account', url: 'https://www.finextra.com/blogposting/30866/stablecoin-debit-when-your-wallet-becomes-a-global-programmable-checking-account' },
  { title: 'The Control Plane for Stablecoins', url: 'https://www.finextra.com/blogposting/30909/the-control-plane-for-stablecoins' },
  { title: 'The Missing Layer in Stablecoin Payments: Verifiable Intent for Agentic Commerce', url: 'https://www.finextra.com/blogposting/30956/the-missing-layer-in-stablecoin-payments-verifiable-intent-for-agentic-commerce' },
  { title: 'Stablecoins as State Machines: The Architecture of Programmable Settlement', url: 'https://www.finextra.com/blogposting/31021/stablecoins-as-state-machines-the-architecture-of-programmable-settlement' },
  { title: 'The Stablecoin Orchestration Layer: Who Controls the Stack?', url: 'https://www.finextra.com/blogposting/31048/the-stablecoin-orchestration-layer-who-controls-the-stack' },
  { title: 'Stablecoins and the Financial Plumbing Behind Digital Money', url: 'https://www.finextra.com/blogposting/31092/stablecoins-and-the-financial-plumbing-behind-digital-money' },
  { title: 'Stablecoins and the Rise of the Internet Financial System', url: 'https://www.finextra.com/blogposting/31158/stablecoins-and-the-rise-of-the-internet-financial-system' },
];

const EXPERIENCE = [
  {
    title: 'Product Manager — Payments Platform & AI Strategy',
    company: 'Wipro',
    period: 'Feb 2024 – Present',
    bullets: [
      'Led payments platform modernization across ISO 20022 card acquiring, CAAA messaging, POS-to-acquirer-to-issuer flows, proprietary tender enablement, failover routing, and enhanced transaction observability.',
      'Drove cross-border payments strategy for global Merchant of Record platforms, optimizing fund flows between MOR entities, licensees, and third parties through Stripe payment splits, settlement design, compliance alignment, and cost management.',
      'Designed AI-driven commerce solutions for global payments networks, including SMB micro-campaign automation, predictive personalization, smart POS integrations, contextual merchant offers, and ambient loyalty through IoT and wearable channels.',
      'Built AI-enabled product strategy tools and prototypes across payments, BNPL, refunds, settlement, and merchant economics, including payment intelligence simulators, BNPL cost/conversion calculators, and market signal copilots.',
      'Created agentic commerce and MCP-based architecture concepts to support AI-assisted payment simulations, vendor comparisons, treasury modernization, stablecoin use cases, marketplace design, and executive decision support.',
    ],
  },
  {
    title: 'Consulting Manager — Financial Services & Payments',
    company: 'Deloitte',
    period: 'Mar 2022 – Feb 2024',
    bullets: [
      'Led a complex M&A initiative across 3 financial institutions, integrating payment channels and banking apps for 1.8M clients (commercial, retail, wealth, business banking) including SWIFT and Fedwire platform migrations and TSA alignment.',
      'Drove analysis of refund failures across global Stripe connected accounts; developed API-log-based workaround for weekly refund-failure visibility and informed future automation strategy.',
      'Architected AWS cloud modernization as solutions architect for a retirement provider\'s key record-keeping platform, including SaaS build-vs-buy evaluation.',
      'Served as SME for US single-message debit transactions covering dispute/chargeback management and AID implementation in Debit Single Message Systems.',
      'Integrated PAX devices with Jigsaw for retail merchants, reducing manual transaction times by 30% and error rates by 40%.',
    ],
  },
  {
    title: 'Payments Product Management',
    company: 'FIS',
    period: 'Jan 2019 – Mar 2022',
    bullets: [
      'Aligned SMBs with ISVs and software platforms, managing owned platforms, vertical SaaS, and payment partner integrations spanning revenue-sharing arrangements to complex API integrations.',
      'Integrated Worldpay payment solutions (Frontend/Backend/VAS) with partner applications via plug-and-play APIs; built ACH reject revenue assurance and debt recovery mechanisms with GL integration.',
      'Architected merchant retention tool leveraging LTV scoring, VAS recommendations, attrition risk models, and data-science-guided giveback strategies.',
    ],
  },
  {
    title: 'Payments Product Owner',
    company: 'Worldpay',
    period: 'Feb 2016 – Dec 2018',
    bullets: [
      'Institutionalized end-to-end digital onboarding, reducing onboarding times and enabling real-time SLA dashboards for deal lifecycle visibility across POS activation, documentation, and verification.',
      'Identified and fixed revenue leakages driving merchant attrition; implemented pricing optimization tools to eliminate leakage and improve margin.',
      'Led payment gateway integration supporting diverse tender types, authentication methods, and comprehensive addenda data; managed timeout/offline stand-ins and full/partial reversal/refund flows.',
      'Authored concept for vendor-agnostic payment platform enabling Worldpay POS across all devices without ADKs via middleware hardware abstraction.',
    ],
  },
  {
    title: 'Payments Product Owner',
    company: 'Vantiv',
    period: 'Mar 2014 – Jan 2016',
    bullets: [
      'Established Salesforce Service Cloud servicing framework for merchant operations, defining SLAs and milestone benchmarks to enhance back-office efficiency.',
      'Led legacy payment gateway modernization for e-commerce, creating a unified go-to-market strategy combining gateways for multi-payment-mode authorization.',
      'Implemented frontend rules for sanctions-country auth pausing and integrated OCT for Visa Fast Access Funding into frontend applications.',
      'Unified Salesforce instance strategy across 250+ business processes including merchant onboarding automation, ISO 8583 certification, and refund automation with approval workflows.',
    ],
  },
  {
    title: 'Principal Consultant — Banking & Financial Services',
    company: 'Wipro',
    period: 'Sep 2005 – Mar 2014',
    bullets: [
      'Implemented Salesforce CRM for merchant servicing and retail payments; built revenue assurance application for ACH rejects and debt reclamation with GL reconciliation.',
      'Led CDCVM feature development for seamless debit card authentication via mobile across Always, Flexible, and Card Like models with Early CDCVM and Two-Tap options.',
      'Drove least-cost PIN-less CNP debit routing using data science and debit-network relationships to lower acceptance costs and increase margins for Card Not Present merchants.',
      'Designed co-branded card application on PAX devices for instant digital credit card issuance with loyalty integrations for a leading retail merchant.',
      'Implemented PIN debit setups and smart LCR for dual-network debit transactions including cashback at POS, refunds, and pre-authorizations.',
    ],
  },
];

const SKILLS = [
  'Enterprise Payments Strategy', 'Generative AI in FinTech', 'Payment Orchestration',
  'Merchant of Record (MoR)', 'Multi-Rail Payments', 'AI Strategy',
  'Stablecoins', 'Agentic Commerce', 'MCP Framework', 'BNPL & Credit Risk',
  'Merchant Acquiring', 'ISO 20022', 'Cross-Border Payments', 'Embedded Finance',
  'Platform Payments', 'Real-Time Rails (RTP/FedNow)', 'PCI Compliance',
  'ML/AI Products', 'GTM Strategy', 'Treasury Automation', 'Fraud & Risk Intelligence',
  'ERP & Payments Integration', 'API Design', 'Revenue Architecture',
];

const CASE_STUDIES = [
  {
    id: 1,
    num: '01',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#39FF14',
    accentRgb: '57,255,20',
    category: 'AI · Payments · Merchant Intelligence',
    title: 'AI-Native Payment Intelligence for Merchant Commerce',
    positioning: 'Designed an AI-enabled payment intelligence framework to help merchant platforms improve routing decisions, settlement visibility, cost transparency, refund monitoring, and operational observability across multi-rail payment ecosystems.',
    challenge: 'Modern merchant platforms operate across multiple payment methods, processors, markets, settlement timelines, and risk conditions. Product and operations teams often lack a unified view of payment cost, authorization performance, refund behavior, settlement timing, and merchant-level friction. The challenge was to explore how AI and data intelligence could help payment platforms move from reactive reporting to proactive decision support.',
    builtIntro: 'I developed a product concept and prototype-led framework for payment intelligence across merchant commerce platforms. The solution explored how payment data, routing logic, settlement rules, refund signals, and merchant performance patterns could be combined into a decision-support layer.',
    builtCapabilities: [
      'AI-assisted payment route recommendations',
      'Cost and settlement comparison across rails',
      'Merchant-level payment diagnostics',
      'Refund and failure monitoring',
      'Authorization and operational observability',
      'Payment performance insights for product and operations teams',
    ],
    thinkingIntro: 'The goal was not just to create another dashboard. The goal was to create an intelligence layer that could help payment teams answer practical questions:',
    thinkingQuestions: [
      'Which route or rail is best for this merchant, market, or transaction type?',
      'Where are payment costs increasing?',
      'Which merchants are experiencing payment friction?',
      'Which failures or refunds require attention?',
      'Where can settlement visibility be improved?',
    ],
    value: 'This type of capability can help merchant platforms improve payment performance, reduce manual investigation, increase transparency, support better product decisions, and create a stronger merchant experience.',
    role: 'Product strategy, payment architecture, AI use-case definition, prototype design, merchant workflow mapping, and executive narrative development.',
    tags: ['AI Payments', 'Merchant Commerce', 'Payment Routing', 'Settlement Intelligence', 'Payment Observability'],
    flow: [
      {
        label: 'Input Layer',
        nodes: [
          { Icon: Database, label: 'Transaction Data' },
          { Icon: Building2, label: 'Merchant Signals' },
          { Icon: Network, label: 'Rail & Route Data' },
        ],
      },
      {
        label: 'AI Intelligence',
        nodes: [
          { Icon: Cpu, label: 'Route Optimizer' },
          { Icon: BarChart3, label: 'Cost Modeler' },
          { Icon: Shield, label: 'Risk Engine' },
        ],
      },
      {
        label: 'Decision Output',
        nodes: [
          { Icon: TrendingUp, label: 'Route Decision' },
          { Icon: Zap, label: 'Settlement Track' },
          { Icon: Globe, label: 'Observability' },
        ],
      },
    ],
  },
  {
    id: 2,
    num: '02',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#00BFFF',
    accentRgb: '0,191,255',
    category: 'Agentic Commerce · MCP · AI Agents',
    title: 'Agentic Commerce MCP for AI-Enabled Merchant Platforms',
    positioning: 'Created an agentic commerce and MCP-based product concept showing how AI agents can support merchant enablement, payment simulations, vendor comparisons, revenue impact modeling, and autonomous commerce decisioning.',
    challenge: 'Merchant platforms are becoming more complex. Product, sales, operations, and strategy teams need to evaluate payment options, platform capabilities, revenue opportunities, vendor tradeoffs, and merchant readiness faster than traditional manual analysis allows. The challenge was to explore how AI agents could become practical decision-support partners for commerce and payments teams.',
    builtIntro: 'I created an MCP-based architecture concept and supporting simulator to demonstrate how AI agents could assist with commerce and payment decisioning. The concept explored AI-assisted payment simulations, merchant readiness scoring, vendor and PSP comparison, revenue impact modeling, payment architecture recommendations, and delegated commerce decisioning with controls and governance.',
    builtCapabilities: [
      'AI-assisted payment simulations',
      'Merchant readiness scoring',
      'Vendor and PSP comparison',
      'Revenue impact modeling',
      'Payment architecture recommendations',
      'Agent-driven product and strategy workflows',
      'Delegated commerce decisioning with controls and governance',
    ],
    thinkingIntro: 'The core idea was to move AI from a generic chatbot into a structured commerce copilot. Instead of simply answering questions, the agentic layer could use defined tools, rules, and payment logic to support repeatable product decisions. This is especially relevant for merchant platforms where teams need to evaluate:',
    thinkingQuestions: [
      'Which payment capabilities should be prioritized?',
      'What is the revenue impact of a new payment feature?',
      'Which merchant segment benefits most?',
      'What operating model is required?',
      'Which risks or controls need to be considered?',
    ],
    value: 'An agentic commerce layer can help product and strategy teams accelerate decision-making, improve consistency, reduce analysis effort, and create new AI-enabled merchant experiences.',
    role: 'Concept creation, MCP architecture, product framing, simulator design, AI workflow definition, research synthesis, and open-source prototype development.',
    tags: ['Agentic Commerce', 'MCP', 'AI Agents', 'Merchant Enablement', 'Autonomous Financial Execution'],
    flow: [
      {
        label: 'Platform Inputs',
        nodes: [
          { Icon: Building2, label: 'Merchant Platform' },
          { Icon: Database, label: 'Payment Data' },
          { Icon: TrendingUp, label: 'Revenue Context' },
        ],
      },
      {
        label: 'AI Agent Layer',
        nodes: [
          { Icon: Bot, label: 'MCP Agent' },
          { Icon: Network, label: 'Tool Orchestration' },
          { Icon: Cpu, label: 'Context Engine' },
        ],
      },
      {
        label: 'Commerce Actions',
        nodes: [
          { Icon: Zap, label: 'Simulations' },
          { Icon: BarChart3, label: 'Revenue Model' },
          { Icon: Globe, label: 'Vendor Compare' },
        ],
      },
    ],
  },
  {
    id: 3,
    num: '03',
    image: 'https://images.pexels.com/photos/7682340/pexels-photo-7682340.jpeg?auto=compress&cs=tinysrgb&w=1200',
    accent: '#FFB800',
    accentRgb: '255,184,0',
    category: 'Stablecoins · Multi-Rail · Treasury Infrastructure',
    title: 'Stablecoin & Multi-Rail Settlement Infrastructure',
    positioning: 'Developed a stablecoin and multi-rail settlement framework exploring how tokenized settlement, fiat/stablecoin conversion, treasury mobility, liquidity controls, and compliance-aware payout flows could support future merchant and enterprise payment infrastructure.',
    challenge: 'Cross-border settlement and treasury movement remain slow, expensive, fragmented, and operationally complex. Many enterprises still depend on traditional banking rails, batch settlement cycles, limited transparency, and manual reconciliation processes. The challenge was to explore how stablecoins and tokenized settlement models could complement existing payment rails without replacing the controls required in enterprise financial infrastructure.',
    builtIntro: 'I created a stablecoin operating model and product architecture concept focused on practical enterprise use cases. The framework explored fiat-to-stablecoin flows, treasury wallet and liquidity management models, cross-border payout modernization, hybrid rail orchestration, on/off-ramp design, and KYT/compliance checkpoints.',
    builtCapabilities: [
      'Fiat-to-stablecoin and stablecoin-to-fiat flows',
      'Treasury wallet and liquidity management models',
      'Cross-border payout modernization',
      'Hybrid fiat and stablecoin rail orchestration',
      'On-ramp and off-ramp design',
      'KYT, compliance, and control checkpoints',
      'Settlement reporting and reconciliation considerations',
      'Stablecoin-enabled treasury mobility',
    ],
    thinkingIntro: 'The goal was to frame stablecoins not as speculative crypto, but as a possible infrastructure layer for faster settlement, programmable treasury movement, and cross-border payout optionality. The framework focused on practical questions:',
    thinkingQuestions: [
      'Where can stablecoins reduce settlement friction?',
      'How should treasury teams manage liquidity?',
      'What controls are needed before funds move?',
      'How do fiat rails and stablecoin rails coexist?',
      'What reporting and reconciliation models are required?',
      'Where does tokenized settlement create real enterprise value?',
    ],
    value: 'Stablecoin-enabled infrastructure can create future opportunities around faster settlement, lower cross-border friction, improved liquidity mobility, programmable payouts, and more flexible treasury operations.',
    role: 'Product strategy, stablecoin operating model design, multi-rail settlement architecture, compliance-aware workflow framing, treasury use-case development, and research-backed product narrative.',
    tags: ['Stablecoins', 'Tokenized Settlement', 'Multi-Rail Treasury', 'Cross-Border Payments', 'Future Payments Infrastructure'],
    flow: [
      {
        label: 'Fiat Entry',
        nodes: [
          { Icon: Database, label: 'Fiat Funds' },
          { Icon: Shield, label: 'KYT & Compliance' },
          { Icon: Network, label: 'On-Ramp Design' },
        ],
      },
      {
        label: 'Stablecoin Layer',
        nodes: [
          { Icon: Coins, label: 'USDC Settlement' },
          { Icon: Zap, label: 'Treasury Wallet' },
          { Icon: TrendingUp, label: 'Liquidity Controls' },
        ],
      },
      {
        label: 'Output & Exit',
        nodes: [
          { Icon: Globe, label: 'Cross-border Payout' },
          { Icon: BarChart3, label: 'Settlement Report' },
          { Icon: Building2, label: 'Off-Ramp' },
        ],
      },
    ],
  },
];

/* ─── PARTICLE CANVAS ──────────────────────────────────────────────────── */

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    const COUNT = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.3 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.05 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}

/* ─── REVEAL HOOK ──────────────────────────────────────────────────────── */

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── NAV ──────────────────────────────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const primary = [
    { label: 'About', href: 'about' },
    { label: 'Experience', href: 'experience' },
    { label: 'Projects', href: 'projects' },
    { label: 'Research', href: 'research' },
    { label: 'Case Studies', href: 'casestudies' },
    { label: 'Contact', href: 'contact' },
  ];

  const more = [
    { label: 'Core Capabilities', href: 'capabilities' },
    { label: 'Selected Impact', href: 'impact' },
    { label: 'Product Vision', href: 'productvision' },
    { label: 'How I Work', href: 'howiwork' },
  ];

  const allLinks = [...primary, ...more];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-0 bg-[#0a0a0a]/96 backdrop-blur-md border-b border-[#1a1a1a]' : 'py-0 bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group flex-shrink-0">
          <span className="text-[#39FF14] font-black text-lg tracking-[0.15em] uppercase group-hover:opacity-80 transition-opacity duration-200">AN</span>
          <span className="hidden sm:block text-[#333] text-[10px] font-black uppercase tracking-[0.25em] group-hover:text-[#444] transition-colors duration-200">Portfolio</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {primary.map(l => (
            <a
              key={l.href}
              href={`#${l.href}`}
              className="px-3 py-1.5 text-[11px] font-bold text-[#555] uppercase tracking-[0.12em] rounded-md hover:text-white hover:bg-white/[0.04] transition-all duration-200"
            >
              {l.label}
            </a>
          ))}

          {/* More dropdown */}
          <div ref={moreRef} className="relative ml-1">
            <button
              onClick={() => setMoreOpen(v => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] rounded-md transition-all duration-200 ${moreOpen ? 'text-white bg-white/[0.06]' : 'text-[#555] hover:text-white hover:bg-white/[0.04]'}`}
            >
              More
              <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${moreOpen ? 'rotate-90' : ''}`} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#0f0f0f] border border-[#222] rounded-xl shadow-2xl shadow-black/60 overflow-hidden">
                <div className="p-1.5 flex flex-col gap-0.5">
                  {more.map(l => (
                    <a
                      key={l.href}
                      href={`#${l.href}`}
                      onClick={() => setMoreOpen(false)}
                      className="px-3 py-2.5 text-[11px] font-bold text-[#666] uppercase tracking-[0.1em] rounded-lg hover:text-white hover:bg-white/[0.05] transition-all duration-150 flex items-center justify-between group"
                    >
                      {l.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity duration-150" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#222] text-[#666] hover:text-white hover:border-[#333] transition-all duration-200"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#0a0a0a] border-b border-[#1a1a1a] px-6 py-5">
          <div className="grid grid-cols-2 gap-1">
            {allLinks.map(l => (
              <a
                key={l.href}
                href={`#${l.href}`}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 text-[11px] font-bold text-[#555] uppercase tracking-[0.1em] rounded-lg hover:text-white hover:bg-white/[0.04] transition-all duration-150"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO ─────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      <div className="scan-line" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="relative w-56 h-56 lg:w-64 lg:h-64">
              <div className="absolute inset-0 photo-ring rounded-full p-[3px]">
                <img
                  src={`${import.meta.env.BASE_URL}IMG_2985.jpg`}
                  alt="Avik Nandi"
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="section-num mb-4">Director of Product</div>

            <h1 className="text-6xl lg:text-8xl font-black mb-2 leading-none tracking-tight uppercase text-white">
              Avik
            </h1>
            <h1 className="text-6xl lg:text-8xl font-black mb-4 leading-none tracking-tight uppercase text-[#39FF14]">
              Nandi
            </h1>

            <div className="nike-divider-red mb-6" />

            <p className="text-[#666] text-xs mb-6 font-semibold uppercase tracking-[0.18em]">
              Driving Global Scale in MoR, Stablecoins & Multi-Rail Orchestration
            </p>
            <p className="text-[#888] text-base max-w-xl mb-10 leading-relaxed">
              20+ years building and modernizing enterprise payment platforms — from merchant acquiring, MOR, and multi-rail orchestration to stablecoin settlement, AI-native commerce, and autonomous financial execution.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="#research" className="btn-outline">Research & Papers</a>
              <a href="https://www.linkedin.com/in/avikz/" target="_blank" rel="noopener noreferrer" className="btn-outline">LinkedIn</a>
            </div>

            <div className="grid grid-cols-3 gap-0 max-w-sm mx-auto lg:mx-0 border border-[#222]">
              {[
                { val: '20+', label: 'Years' },
                { val: '9', label: 'Projects' },
                { val: '25+', label: 'Publications' },
              ].map((s, i) => (
                <div key={s.label} className={`text-center py-5 px-2 ${i < 2 ? 'border-r border-[#222]' : ''}`}>
                  <div className="text-3xl font-black text-white">{s.val}</div>
                  <div className="text-[10px] text-[#666] mt-1 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────────────────── */

function About() {
  return (
    <section id="about" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-8">
          <div className="section-num mb-3">01 — About</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white">Executive Profile</h2>
          <div className="nike-divider-red mt-4" />
        </div>

        {/* Bio + Skills two-column */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="reveal">
            <div className="glass-card p-8 h-full">
              <p className="text-[#aaa] leading-relaxed mb-5 text-base font-semibold">
                I build the financial infrastructure behind modern commerce.
              </p>
              <p className="text-[#aaa] leading-relaxed mb-5">
                I am a product leader focused on AI-native payments, merchant commerce infrastructure, Merchant of Record platforms, multi-rail orchestration, stablecoins, real-time rails, treasury automation, and intelligent financial systems.
              </p>
              <p className="text-[#777] leading-relaxed mb-5">
                With 20+ years across Wipro, Deloitte, FIS, Worldpay, and Vantiv, I have led product, platform, and modernization initiatives across complex payment ecosystems — spanning merchant acquiring, issuing, payment gateways, settlement, reconciliation, cross-border payments, AI-enabled commerce, and regulated financial infrastructure.
              </p>
              <p className="text-[#777] leading-relaxed">
                My work sits at the intersection of product strategy, platform architecture, and execution — turning complex payment ecosystems into scalable, resilient, and commercially effective platforms that improve merchant outcomes, optimize cost, strengthen compliance, and unlock new revenue models.
              </p>
            </div>
          </div>

          <div className="reveal flex flex-col gap-6">
            <div className="glass-card p-8">
              <h3 className="text-xs font-black text-[#39FF14] uppercase tracking-[0.2em] mb-4">Academic Profiles</h3>
              <div className="flex flex-col gap-3">
                <a href="https://scholar.google.com/citations?user=Tag_oNkAAAAJ&hl=en&oi=ao" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <GraduationCap className="w-5 h-5 text-white flex-shrink-0" />
                  <div>
                    <div className="font-bold text-sm uppercase tracking-wide">Google Scholar</div>
                    <div className="text-xs text-[#666]">Published Research Citations</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto flex-shrink-0 text-[#444]" />
                </a>
                <a href="https://orcid.org/0009-0001-1217-3174" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Award className="w-5 h-5 text-white flex-shrink-0" />
                  <div>
                    <div className="font-bold text-sm uppercase tracking-wide">ORCID</div>
                    <div className="text-xs text-[#666]">0009-0001-1217-3174</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto flex-shrink-0 text-[#444]" />
                </a>
                <a href="https://www.amazon.com/Evolution-Financial-Systems-Age-Stablecoins/dp/B0GVL7Q4GG/" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <BookMarked className="w-5 h-5 text-white flex-shrink-0" />
                  <div>
                    <div className="font-bold text-sm uppercase tracking-wide">Amazon Author</div>
                    <div className="text-xs text-[#666]">The Evolution of Financial Systems…</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto flex-shrink-0 text-[#444]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CORE CAPABILITIES ──────────────────────────────────────────────────── */

function CoreCapabilities() {
  const capabilities = [
    {
      num: '01',
      Icon: Network,
      accentColor: '#39FF14',
      iconBg: 'bg-[#0a1a0a]',
      iconBorder: 'border-[#39FF14]/20',
      hoverBorder: 'hover:border-[#39FF14]/25',
      tagStyle: 'border-[#39FF14]/20 text-[#39FF14]/80',
      title: 'AI-Native Payment Platform Strategy',
      desc: 'Designing enterprise payment platforms where AI enhances routing, observability, reconciliation, settlement, treasury workflows, Merchant of Record models, payment splits, cross-border payments, ISO 20022, RTP/FedNow, and platform payment operations.',
      sub: 'My focus is on building payment infrastructure that is not only scalable and compliant, but intelligent — capable of improving route decisions, reducing operational friction, strengthening transaction visibility, and enabling better merchant and enterprise outcomes.',
      tags: ['AI Routing', 'ISO 20022', 'RTP/FedNow', 'MoR', 'Settlement', 'Treasury', 'Cross-border'],
    },
    {
      num: '02',
      Icon: Coins,
      accentColor: '#00BFFF',
      iconBg: 'bg-[#0a0f1a]',
      iconBorder: 'border-[#00BFFF]/20',
      hoverBorder: 'hover:border-[#00BFFF]/25',
      tagStyle: 'border-[#00BFFF]/20 text-[#00BFFF]/80',
      title: 'Stablecoin, Tokenized Settlement & Multi-Rail Treasury',
      desc: 'Designing product concepts and operating models for stablecoin-enabled financial infrastructure, including USDC-style settlement, tokenized cash concepts, fiat-to-stablecoin conversion flows, on/off-ramp design, cross-border treasury movement, liquidity management, payout modernization, KYT/compliance considerations, and hybrid fiat/stablecoin rail orchestration.',
      sub: 'This work connects stablecoins with practical enterprise use cases — faster settlement, reduced cross-border friction, improved treasury mobility, programmable payouts, alternative settlement rails, and future-ready payment infrastructure.',
      tags: ['USDC', 'Stablecoin', 'On/Off-Ramp', 'KYT', 'Tokenized Cash', 'Programmable Payouts', 'Liquidity'],
    },
    {
      num: '03',
      Icon: Bot,
      accentColor: '#FF3864',
      iconBg: 'bg-[#1a0a0f]',
      iconBorder: 'border-[#FF3864]/20',
      hoverBorder: 'hover:border-[#FF3864]/25',
      tagStyle: 'border-[#FF3864]/20 text-[#FF3864]/80',
      title: 'Payment Intelligence, Agentic Commerce & Autonomous Execution',
      desc: 'Building AI-enabled tools, simulators, and decision-support frameworks across payment routing, BNPL economics, merchant intelligence, refund analysis, settlement intelligence, stablecoin treasury, and agentic commerce.',
      sub: 'This includes AI route advisory, predictive merchant insights, micro-campaign automation, smart POS experiences, ambient loyalty, fraud/risk intelligence, MCP-based commerce agents, and autonomous financial execution models where AI can evaluate vendors, simulate payment flows, compare rails, and support complex product decisions.',
      tags: ['Agentic Commerce', 'BNPL', 'MCP Agents', 'Fraud Intelligence', 'Smart POS', 'Ambient Loyalty', 'Autonomous Execution'],
    },
    {
      num: '04',
      Icon: Lightbulb,
      accentColor: '#FFB800',
      iconBg: 'bg-[#120f00]',
      iconBorder: 'border-[#FFB800]/20',
      hoverBorder: 'hover:border-[#FFB800]/25',
      tagStyle: 'border-[#FFB800]/20 text-[#FFB800]/80',
      title: 'Executive Product Leadership for AI-Enabled FinTech',
      desc: 'Turning complex financial infrastructure problems into product strategy, roadmap decisions, architecture concepts, operating models, GTM narratives, vendor evaluations, prototypes, and executive-ready decision support.',
      sub: 'I bring a product-leadership lens to emerging technologies — using AI, automation, data intelligence, stablecoin infrastructure thinking, and prototype-led exploration to help organizations move from abstract ideas to practical payment products, scalable platforms, and commercially meaningful outcomes.',
      tags: ['Product Strategy', 'Roadmap', 'GTM', 'Operating Models', 'Prototypes', 'Vendor Eval', 'Executive Storytelling'],
    },
  ];

  return (
    <section id="capabilities" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-10">
          <div className="section-num mb-3">02 — Core Capabilities</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white">Core Capabilities</h2>
          <div className="nike-divider-red mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {capabilities.map((cap) => (
            <div
              key={cap.num}
              className={`group relative bg-[#0c0c0c] border border-[#1a1a1a] ${cap.hoverBorder} rounded-xl overflow-hidden transition-all duration-300 p-7 cursor-default`}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: cap.accentColor }}
              />
              <div
                className="absolute top-2 right-5 text-[96px] font-black leading-none select-none pointer-events-none transition-opacity duration-300 opacity-[0.03] group-hover:opacity-[0.06]"
                style={{ color: cap.accentColor }}
              >
                {cap.num}
              </div>
              <div className="flex items-start gap-4 mb-5 relative z-10">
                <div className={`w-12 h-12 rounded-xl ${cap.iconBg} border ${cap.iconBorder} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                  <cap.Icon className="w-6 h-6" style={{ color: cap.accentColor }} />
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-[9px] font-black uppercase tracking-[0.3em] mb-1.5 opacity-60" style={{ color: cap.accentColor }}>
                    {cap.num} — Capability
                  </div>
                  <div className="text-white font-black text-sm uppercase tracking-wide leading-snug">{cap.title}</div>
                </div>
              </div>
              <div className="h-px bg-[#1a1a1a] mb-5 relative z-10 group-hover:bg-[#222] transition-colors duration-300" />
              <p className="text-[#6e6e6e] text-sm leading-relaxed mb-3 relative z-10">{cap.desc}</p>
              <p className="text-[#454545] text-xs leading-relaxed mb-6 relative z-10">{cap.sub}</p>
              <div className="flex flex-wrap gap-1.5 relative z-10">
                {cap.tags.map(t => (
                  <span key={t} className={`text-[10px] px-2.5 py-0.5 rounded-full border ${cap.tagStyle} font-medium tracking-wide`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SELECTED IMPACT ────────────────────────────────────────────────────── */

function SelectedImpact() {
  const impacts = [
    {
      num: '01',
      headline: 'Payment Modernization',
      detail: 'Led payment modernization initiatives across merchant acquiring, gateways, treasury, settlement, and financial operations ecosystems.',
    },
    {
      num: '02',
      headline: 'Global MoR Strategy',
      detail: 'Designed cross-border Merchant of Record and licensee payment strategies across global markets.',
    },
    {
      num: '03',
      headline: 'AI Strategy Tools',
      detail: 'Built AI-enabled product strategy tools across payments, BNPL, refunds, settlement, merchant economics, stablecoin treasury, and agentic commerce.',
    },
    {
      num: '04',
      headline: 'Live Prototypes',
      detail: 'Created live product prototypes demonstrating multi-rail orchestration, BNPL cost modeling, merchant intelligence, stablecoin operating models, and MCP-based agentic commerce.',
    },
    {
      num: '05',
      headline: 'Research Published',
      detail: 'Published research on AI-native payments, stablecoins, multi-rail orchestration, autonomous financial execution, verifiable agent identity, and delegated authority in payment systems.',
    },
  ];

  return (
    <section id="impact" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-10">
          <div className="section-num mb-3">03 — Selected Impact</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white">Selected Impact</h2>
          <div className="nike-divider-red mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#161616] border border-[#161616] rounded-xl overflow-hidden">
          {impacts.map((imp, i) => (
            <div
              key={imp.num}
              className="bg-[#0a0a0a] p-6 flex flex-col gap-3 group hover:bg-[#0e0e0e] transition-colors duration-200 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#39FF14]/0 via-[#39FF14]/20 to-[#39FF14]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-4xl font-black leading-none tabular-nums" style={{ color: '#39FF14', opacity: 0.5 }}>
                {imp.num}
              </div>
              <div className="text-white font-black text-[11px] uppercase tracking-widest leading-snug">{imp.headline}</div>
              <div className="h-px w-6 bg-[#222] group-hover:w-10 group-hover:bg-[#39FF14]/30 transition-all duration-300" />
              <p className="text-[#4a4a4a] text-xs leading-relaxed group-hover:text-[#5a5a5a] transition-colors duration-200">{imp.detail}</p>
              <div className="mt-auto pt-3 text-[10px] text-[#2a2a2a] font-mono uppercase tracking-widest">{String(i + 1).padStart(2, '0')} / 05</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─── EXPERIENCE ────────────────────────────────────────────────────────── */

function Experience() {
  return (
    <section id="experience" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-8">
          <div className="section-num mb-3">04 — Experience</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white">Career Timeline</h2>
          <div className="nike-divider-red mt-4" />
        </div>

        <div className="relative">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="reveal flex gap-6 mb-10">
              <div className="flex flex-col items-center">
                <div className="timeline-dot mt-1" />
                {i < EXPERIENCE.length - 1 && <div className="timeline-line flex-1 mt-2" />}
              </div>
              <div className="glass-card p-6 flex-1 mb-0">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-base font-black text-white uppercase tracking-wide">{exp.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Building2 className="w-4 h-4 text-[#39FF14]" />
                      <span className="text-[#39FF14] font-bold text-sm uppercase tracking-wider">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#666] badge badge-cyan">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-[#888] text-sm">
                      <ChevronRight className="w-4 h-4 text-[#39FF14] flex-shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ──────────────────────────────────────────────────────────── */

function Projects() {
  return (
    <section id="projects" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-8">
          <div className="section-num mb-3">05 — Projects</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white">Live GitHub Projects</h2>
          <div className="nike-divider-red mt-4" />
          <p className="text-[#555] text-sm mt-4 uppercase tracking-widest">Click any card to open the live project</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1c1c1c]">
          {PROJECTS.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal group bg-[#0a0a0a] p-6 flex flex-col transition-colors duration-200 hover:bg-[#111] border border-transparent hover:border-white"
            >
              <div className="mb-4 text-[#39FF14] group-hover:text-white transition-colors duration-200">{p.icon}</div>
              <h3 className="text-sm font-black text-white mb-2 uppercase tracking-wide">{p.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed flex-1">{p.desc}</p>
              {p.meta && <p className="text-[#444] text-xs mt-2 font-mono">{p.meta}</p>}
              <div className="flex items-center justify-between mt-5">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(t => <span key={t} className="badge badge-cyan text-[#666]">{t}</span>)}
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#333] group-hover:text-[#39FF14] flex-shrink-0 transition-colors duration-200" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── RESEARCH ──────────────────────────────────────────────────────────── */

function Research() {
  const [tab, setTab] = useState('ssrn');

  const tabs = [
    { id: 'ssrn', label: 'SSRN Papers' },
    { id: 'zenodo', label: 'Zenodo' },
    { id: 'medium', label: 'Medium' },
    { id: 'finextra', label: 'Finextra' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <section id="research" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-8">
          <div className="section-num mb-3">06 — Research & Publications</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white">Thought Leadership</h2>
          <div className="nike-divider-red mt-4" />
          <p className="text-[#555] text-sm mt-4">Academic papers, industry articles, and original research on AI payments & stablecoins</p>
        </div>

        {/* Stats */}
        <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#1c1c1c] mb-8">
          {[
            { val: '4', label: 'SSRN Papers', icon: <Microscope className="w-5 h-5 text-[#39FF14]" /> },
            { val: '14', label: 'Finextra Articles', icon: <Newspaper className="w-5 h-5 text-[#39FF14]" /> },
            { val: '20+', label: 'Medium Articles', icon: <FileText className="w-5 h-5 text-[#39FF14]" /> },
            { val: '2', label: 'Published Books', icon: <BookOpen className="w-5 h-5 text-[#39FF14]" /> },
          ].map(s => (
            <div key={s.label} className="stat-card bg-[#0a0a0a] border-0">
              <div className="flex justify-center mb-2">{s.icon}</div>
              <div className="text-2xl font-black text-white">{s.val}</div>
              <div className="text-[10px] text-[#555] mt-1 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="reveal mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map(t => (
              <button key={t.id} className={`tab-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="reveal">
          {tab === 'ssrn' && (
            <div className="space-y-2">
              {SSRN_PAPERS.map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="paper-card flex items-start gap-4 group">
                  <div className="badge badge-cyan flex-shrink-0 mt-1 text-[#39FF14] border-[#39FF14]/30">SSRN</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white group-hover:text-[#39FF14] transition-colors leading-snug text-sm">{p.title}</h3>
                    <div className="text-xs text-[#555] mt-1 uppercase tracking-wide">Abstract ID: {p.id}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#444] group-hover:text-[#39FF14] flex-shrink-0 mt-1 transition-colors" />
                </a>
              ))}
            </div>
          )}

          {tab === 'zenodo' && (
            <div className="space-y-2">
              {ZENODO_PAPERS.map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="paper-card flex items-start gap-4 group">
                  <div className="badge badge-teal flex-shrink-0 mt-1">Zenodo</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white group-hover:text-[#39FF14] transition-colors text-sm">{p.title}</h3>
                    <div className="text-xs text-[#555] mt-1 uppercase tracking-wide">Record: {p.record}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#444] group-hover:text-[#39FF14] flex-shrink-0 mt-1 transition-colors" />
                </a>
              ))}
            </div>
          )}

          {tab === 'medium' && (
            <div className="grid sm:grid-cols-2 gap-2">
              {MEDIUM_ARTICLES.map((a, i) => (
                <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" className="paper-card flex items-center gap-3 group">
                  <FileText className="w-4 h-4 text-[#444] group-hover:text-[#39FF14] flex-shrink-0 transition-colors" />
                  <span className="text-sm text-[#888] group-hover:text-white transition-colors leading-snug flex-1">{a.title}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#444] group-hover:text-[#39FF14] flex-shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          )}

          {tab === 'finextra' && (
            <div className="grid sm:grid-cols-2 gap-2">
              {FINEXTRA_ARTICLES.map((a, i) => (
                <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" className="paper-card flex items-center gap-3 group">
                  <Newspaper className="w-4 h-4 text-[#444] group-hover:text-[#39FF14] flex-shrink-0 transition-colors" />
                  <span className="text-sm text-[#888] group-hover:text-white transition-colors leading-snug flex-1">{a.title}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#444] group-hover:text-[#39FF14] flex-shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          )}

          {tab === 'other' && (
            <div className="space-y-2">
              {/* THE ARCHITECT — thriller novel */}
              <a
                href="https://www.amazon.com/ARCHITECT-Novel-Interrupted-Sequences/dp/B0H4Z26CZ9/ref=sr_1_2?crid=3PD4K2KUCI5TE&dib=eyJ2IjoiMSJ9.oYXqu3BKt2LQtjvIAPbXKU9NPekE5LagPH53N9_0ums.aUq_4ABOi1CZPhrwj8c_jabciaRe78qcMSkqoQatYUQ&dib_tag=se&keywords=avik+nandi&qid=1783373795&sprefix=%2Caps%2C99&sr=8-2"
                target="_blank"
                rel="noopener noreferrer"
                className="paper-card flex items-start gap-4 group border-[#39FF14]/30 hover:border-[#39FF14]"
              >
                <div className="badge flex-shrink-0 mt-1 bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/40">Novel</div>
                <div className="flex-1">
                  <h3 className="font-black text-white group-hover:text-[#39FF14] transition-colors text-base uppercase tracking-wide">THE ARCHITECT</h3>
                  <p className="text-xs text-[#777] mt-1 leading-relaxed">
                    A high-concept psychological thriller blending systems intelligence, behavioral science, global finance, and philosophical fiction into a story about observation, free will, and the terrifying possibility that reality itself can be shaped through patterns hidden in plain sight.
                  </p>
                  <div className="text-xs text-[#555] mt-2 uppercase tracking-wide">Available on Amazon · Novel: Interrupted Sequences</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#444] group-hover:text-[#39FF14] flex-shrink-0 mt-1 transition-colors" />
              </a>

              <a href="https://www.amazon.com/Evolution-Financial-Systems-Age-Stablecoins/dp/B0GVL7Q4GG/" target="_blank" rel="noopener noreferrer" className="paper-card flex items-start gap-4 group">
                <div className="badge badge-gold flex-shrink-0 mt-1">Book</div>
                <div className="flex-1">
                  <h3 className="font-bold text-white group-hover:text-[#39FF14] transition-colors text-sm">The Evolution of Financial Systems in the Age of AI and Stablecoins</h3>
                  <div className="text-xs text-[#555] mt-1 uppercase tracking-wide">Available on Amazon</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#444] group-hover:text-[#39FF14] flex-shrink-0 mt-1 transition-colors" />
              </a>

              <a href="https://www.linkedin.com/pulse/shifting-payments-from-passive-flows-active-avik-nandi-dxtfc" target="_blank" rel="noopener noreferrer" className="paper-card flex items-start gap-4 group">
                <div className="badge badge-cyan flex-shrink-0 mt-1">LinkedIn</div>
                <div className="flex-1">
                  <h3 className="font-bold text-white group-hover:text-[#39FF14] transition-colors text-sm">Shifting Payments from Passive Flows to Active Intelligence</h3>
                  <div className="text-xs text-[#555] mt-1 uppercase tracking-wide">LinkedIn Article</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#444] group-hover:text-[#39FF14] flex-shrink-0 mt-1 transition-colors" />
              </a>

              {[
                { title: 'Stablecoin Acquiring Infrastructure', url: 'https://www.researchgate.net/publication/404948087_Stablecoin_Acquiring_Infrastructure_Bridging_the_Gap_Between_Payment_Viability_and_Merchant_Readiness?channel=doi&linkId=6a0a3a84e48e8125fa39074d&showFulltext=true', badge: 'ResearchGate', badgeClass: 'badge-gold' },
                { title: 'Stablecoin Acquiring Infrastructure: Bridging the Gap Between Payment Viability and Merchant Readiness', url: 'https://www.academia.edu/167344174/Stablecoin_Acquiring_Infrastructure_Bridging_the_Gap_Between_Payment_Viability_and_Merchant_Readiness', badge: 'Academia', badgeClass: 'badge-teal' },
                { title: 'AI-Driven Multi-Rail Orchestration', url: 'https://www.academia.edu/167344045/The_Emergence_of_Intelligent_Payment_Systems_An_AI_Driven_Framework_for_Multi_Rail_Payment_Orchestration', badge: 'Academia', badgeClass: 'badge-teal' },
                { title: 'Autonomous Financial Execution Framework', url: 'https://www.academia.edu/167344155/AI_Native_Intelligent_Payment_Systems_Autonomous_Financial_Execution_in_Multi_Rail_Infrastructure_An_Evolution_of_Intelligent_Payment_Systems_in_Multi_Rail_Financial_Infrastructure', badge: 'Academia', badgeClass: 'badge-teal' },
              ].map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="paper-card flex items-start gap-4 group">
                  <div className={`badge ${p.badgeClass} flex-shrink-0 mt-1`}>{p.badge}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white group-hover:text-[#39FF14] transition-colors text-sm">{p.title}</h3>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#444] group-hover:text-[#39FF14] flex-shrink-0 mt-1 transition-colors" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── PRODUCT VISION & ARCHITECTURE ─────────────────────────────────────── */

function ProductVision() {
  const cards = [
    {
      num: '01',
      accentColor: '#39FF14',
      Icon: Layers,
      title: 'Intelligent Payment Infrastructure',
      desc: 'AI-native payment platforms will move beyond static processing rules toward intelligent decisioning layers that continuously evaluate cost, authorization performance, risk signals, settlement timing, merchant profile, and rail availability.',
      flow: ['Transaction Data', 'Merchant Signals', 'AI Route Optimizer', 'Cost & Risk Model', 'Rail Decision', 'Settlement Visibility', 'Merchant Insights'],
      capabilities: ['AI-assisted routing', 'Cost optimization', 'Authorization intelligence', 'Refund and failure monitoring', 'Transaction observability', 'Merchant-level diagnostics'],
      iconBg: 'bg-[#0a1a0a]',
      iconBorder: 'border-[#39FF14]/20',
      tagStyle: 'border-[#39FF14]/20 text-[#39FF14]/80',
      hoverBorder: 'hover:border-[#39FF14]/30',
    },
    {
      num: '02',
      accentColor: '#00BFFF',
      Icon: Workflow,
      title: 'Merchant Commerce Operating System',
      desc: 'Modern merchant platforms should become operating systems for commerce — combining POS, payments, customer data, loyalty, inventory, offers, reporting, and financial insights into one intelligent merchant experience.',
      flow: ['POS / eCommerce / ISV', 'Payments Layer', 'Merchant Data Layer', 'AI Insights', 'Loyalty & Offers', 'Business Actions', 'Performance Feedback'],
      capabilities: ['Smart POS experiences', 'Merchant insights', 'Customer segmentation', 'Micro-campaign automation', 'Ambient loyalty', 'Embedded growth tools', 'Business performance recommendations'],
      iconBg: 'bg-[#0a0f1a]',
      iconBorder: 'border-[#00BFFF]/20',
      tagStyle: 'border-[#00BFFF]/20 text-[#00BFFF]/80',
      hoverBorder: 'hover:border-[#00BFFF]/30',
    },
    {
      num: '03',
      accentColor: '#FFB800',
      Icon: GitBranch,
      title: 'Multi-Rail Settlement & Treasury Layer',
      desc: 'Future payment platforms will support flexible settlement across cards, ACH, RTP/FedNow, wallets, BNPL, local rails, cross-border corridors, and stablecoin/tokenized settlement models.',
      flow: ['Payment Acceptance', 'Rail Selection', 'Settlement Rules', 'Treasury Ledger', 'Liquidity Controls', 'Payout Routing', 'Reconciliation'],
      capabilities: ['Multi-rail orchestration', 'Real-time settlement visibility', 'Treasury automation', 'Payout modernization', 'Cross-border settlement', 'Reconciliation intelligence', 'Stablecoin optionality'],
      iconBg: 'bg-[#120f00]',
      iconBorder: 'border-[#FFB800]/20',
      tagStyle: 'border-[#FFB800]/20 text-[#FFB800]/80',
      hoverBorder: 'hover:border-[#FFB800]/30',
    },
    {
      num: '04',
      accentColor: '#FF3864',
      Icon: CircleDot,
      title: 'Stablecoin & Tokenized Settlement Architecture',
      desc: 'Stablecoins should be framed as enterprise financial infrastructure, not speculative crypto. Their value is in faster settlement, treasury mobility, programmable payouts, liquidity movement, and cross-border optionality when paired with strong compliance and controls.',
      flow: ['Fiat Entry', 'KYT / Compliance', 'On-Ramp', 'Stablecoin Treasury', 'Liquidity Rules', 'Cross-Border Payout', 'Off-Ramp → Settlement'],
      capabilities: ['USDC-style settlement', 'Fiat-to-stablecoin flows', 'On/off-ramp design', 'KYT and compliance checkpoints', 'Treasury wallet model', 'Programmable payouts', 'Tokenized cash concepts'],
      iconBg: 'bg-[#1a0a0f]',
      iconBorder: 'border-[#FF3864]/20',
      tagStyle: 'border-[#FF3864]/20 text-[#FF3864]/80',
      hoverBorder: 'hover:border-[#FF3864]/30',
    },
    {
      num: '05',
      accentColor: '#B44FFF',
      Icon: CpuIcon,
      title: 'Agentic Commerce & AI Decisioning Layer',
      desc: 'Agentic commerce will introduce AI agents that support merchant and platform teams with simulations, vendor comparisons, rail recommendations, pricing analysis, revenue modeling, and controlled financial decisioning.',
      flow: ['Merchant Context', 'MCP Tools', 'AI Agent Layer', 'Payment Simulator', 'Vendor / Rail Comparison', 'Revenue Model', 'Controlled Action'],
      capabilities: ['MCP-based commerce agents', 'AI-assisted payment simulations', 'Vendor comparison', 'Merchant readiness scoring', 'Revenue impact modeling', 'Delegated financial workflows', 'Autonomous execution controls'],
      iconBg: 'bg-[#110a1a]',
      iconBorder: 'border-[#B44FFF]/20',
      tagStyle: 'border-[#B44FFF]/20 text-[#B44FFF]/80',
      hoverBorder: 'hover:border-[#B44FFF]/30',
    },
  ];

  return (
    <section id="productvision" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="reveal mb-4">
          <div className="section-num mb-3">07 — Product Vision & Architecture</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white">Product Vision & Architecture</h2>
          <div className="nike-divider-red mt-4" />
        </div>

        {/* Subtitle */}
        <div className="reveal mb-12">
          <p className="text-[#777] text-sm leading-relaxed max-w-3xl">
            My product vision is that the next generation of merchant payment platforms will be AI-native, multi-rail, data-driven, and deeply embedded into merchant workflows. Payments will evolve from a transaction-processing layer into an intelligent commerce operating system — helping merchants route payments, manage cash flow, personalize engagement, reduce risk, optimize settlement, and make better business decisions in real time.
          </p>
        </div>

        {/* Architecture stack infographic */}
        <div className="reveal mb-14">
          <div className="relative overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#080808] p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/[0.02] via-transparent to-[#00BFFF]/[0.02]" />
            <div className="relative z-10">
              <div className="text-[10px] font-black text-[#39FF14] uppercase tracking-[0.4em] mb-6">Architecture Overview</div>
              <div className="grid grid-cols-5 gap-0 relative">
                {[
                  { label: 'Merchant Layer', sub: 'POS · eCommerce · ISV · APIs', color: '#39FF14' },
                  { label: 'Intelligence Layer', sub: 'AI · Routing · Risk · Analytics', color: '#00BFFF' },
                  { label: 'Payment Rails', sub: 'Cards · ACH · RTP · Stablecoin', color: '#FFB800' },
                  { label: 'Settlement', sub: 'Treasury · Ledger · Reconciliation', color: '#FF3864' },
                  { label: 'Agentic Layer', sub: 'MCP · Agents · Decisioning', color: '#B44FFF' },
                ].map((layer, i) => (
                  <div key={i} className="relative">
                    {i < 4 && (
                      <div className="absolute top-1/2 -right-px -translate-y-1/2 z-20 flex items-center">
                        <div className="w-px h-8 bg-[#222]" />
                        <div className="w-2 h-2 rounded-full border border-[#333] bg-[#0a0a0a] absolute -right-[3px]" />
                      </div>
                    )}
                    <div className="px-4 py-5 text-center group cursor-default">
                      <div
                        className="w-8 h-8 rounded-lg mx-auto mb-3 flex items-center justify-center"
                        style={{ backgroundColor: `${layer.color}15`, border: `1px solid ${layer.color}25` }}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color, opacity: 0.7 }} />
                      </div>
                      <div className="text-white font-black text-[10px] uppercase tracking-widest leading-snug mb-1.5" style={{ color: layer.color, opacity: 0.9 }}>{layer.label}</div>
                      <div className="text-[#444] text-[9px] leading-relaxed tracking-wide">{layer.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-[#161616] flex items-center gap-3">
                <div className="flex-1 h-[2px] bg-gradient-to-r from-[#39FF14]/40 via-[#00BFFF]/40 via-[#FFB800]/40 via-[#FF3864]/40 to-[#B44FFF]/40 rounded-full" />
                <span className="text-[9px] text-[#333] uppercase tracking-[0.3em] font-black whitespace-nowrap">Unified Commerce Operating System</span>
                <div className="flex-1 h-[2px] bg-gradient-to-l from-[#39FF14]/40 via-[#00BFFF]/40 via-[#FFB800]/40 via-[#FF3864]/40 to-[#B44FFF]/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Architecture cards */}
        <div className="flex flex-col gap-6">
          {cards.map((card) => (
            <div
              key={card.num}
              className={`group relative bg-[#0c0c0c] border border-[#1a1a1a] ${card.hoverBorder} rounded-xl overflow-hidden transition-all duration-300 cursor-default`}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${card.accentColor}, transparent)` }} />

              <div className="p-8">
                <div className="grid lg:grid-cols-[1fr_auto] gap-8">

                  {/* Left: header + desc + flow */}
                  <div>
                    {/* Card header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className={`w-12 h-12 rounded-xl ${card.iconBg} border ${card.iconBorder} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}
                      >
                        <card.Icon className="w-6 h-6" style={{ color: card.accentColor }} />
                      </div>
                      <div className="pt-1">
                        <div className="text-[9px] font-black uppercase tracking-[0.3em] mb-1.5 opacity-60" style={{ color: card.accentColor }}>
                          {card.num} — Architecture
                        </div>
                        <h3 className="text-white font-black text-base uppercase tracking-wide leading-snug">{card.title}</h3>
                      </div>
                    </div>

                    <p className="text-[#6e6e6e] text-sm leading-relaxed mb-7">{card.desc}</p>

                    {/* Architecture flow */}
                    <div className="mb-2">
                      <div className="text-[9px] font-black uppercase tracking-[0.3em] mb-4 opacity-50" style={{ color: card.accentColor }}>
                        Architecture Flow
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {card.flow.map((step, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div
                              className="text-[10px] font-semibold px-3 py-1.5 rounded-md border whitespace-nowrap"
                              style={{
                                borderColor: `${card.accentColor}20`,
                                color: `${card.accentColor}cc`,
                                backgroundColor: `${card.accentColor}08`,
                              }}
                            >
                              {step}
                            </div>
                            {i < card.flow.length - 1 && (
                              <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: card.accentColor, opacity: 0.35 }} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: capabilities */}
                  <div className="lg:w-56 xl:w-64 flex-shrink-0">
                    <div
                      className="h-full rounded-xl p-5 border"
                      style={{
                        backgroundColor: `${card.accentColor}05`,
                        borderColor: `${card.accentColor}15`,
                      }}
                    >
                      <div className="text-[9px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: card.accentColor, opacity: 0.7 }}>
                        Capabilities
                      </div>
                      <ul className="flex flex-col gap-2.5">
                        {card.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: card.accentColor, opacity: 0.6 }} />
                            <span className="text-[11px] text-[#666] leading-snug group-hover:text-[#777] transition-colors duration-200">{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW I WORK ─────────────────────────────────────────────────────────── */

function HowIWork() {
  const steps = [
    {
      num: '01',
      label: 'Discover',
      Icon: Search,
      accentColor: '#39FF14',
      iconBg: 'bg-[#0a1a0a]',
      iconBorder: 'border-[#39FF14]/20',
      tagStyle: 'border-[#39FF14]/15 text-[#39FF14]/70',
      hoverBorder: 'hover:border-[#39FF14]/30',
      desc: 'Understand merchant pain points, payment flows, platform constraints, risk, compliance, economics, and operating realities.',
      details: ['Merchant pain point mapping', 'Payment flow analysis', 'Platform constraint review', 'Risk & compliance scoping', 'Economics & operating model audit'],
    },
    {
      num: '02',
      label: 'Frame',
      Icon: PenLine,
      accentColor: '#00BFFF',
      iconBg: 'bg-[#0a0f1a]',
      iconBorder: 'border-[#00BFFF]/20',
      tagStyle: 'border-[#00BFFF]/15 text-[#00BFFF]/70',
      hoverBorder: 'hover:border-[#00BFFF]/30',
      desc: 'Translate complex problems into product opportunities, architecture options, tradeoffs, roadmap priorities, and executive narratives.',
      details: ['Problem-to-opportunity translation', 'Architecture option mapping', 'Tradeoff articulation', 'Roadmap prioritisation', 'Executive narrative development'],
    },
    {
      num: '03',
      label: 'Prototype',
      Icon: FlaskConical,
      accentColor: '#FFB800',
      iconBg: 'bg-[#120f00]',
      iconBorder: 'border-[#FFB800]/20',
      tagStyle: 'border-[#FFB800]/15 text-[#FFB800]/70',
      hoverBorder: 'hover:border-[#FFB800]/30',
      desc: 'Use demos, AI tools, simulators, and structured models to validate ideas before scaling.',
      details: ['Live product demos', 'AI-assisted simulators', 'Structured cost models', 'Decision-support frameworks', 'Proof-of-concept prototypes'],
    },
    {
      num: '04',
      label: 'Align',
      Icon: Users,
      accentColor: '#FF3864',
      iconBg: 'bg-[#1a0a0f]',
      iconBorder: 'border-[#FF3864]/20',
      tagStyle: 'border-[#FF3864]/15 text-[#FF3864]/70',
      hoverBorder: 'hover:border-[#FF3864]/30',
      desc: 'Bring product, engineering, risk, compliance, finance, operations, sales, and leadership around a shared path.',
      details: ['Cross-functional alignment', 'Risk & compliance buy-in', 'Leadership briefings', 'Stakeholder narrative design', 'Shared delivery commitment'],
    },
    {
      num: '05',
      label: 'Scale',
      Icon: TrendingUp,
      accentColor: '#00E5CC',
      iconBg: 'bg-[#001a18]',
      iconBorder: 'border-[#00E5CC]/20',
      tagStyle: 'border-[#00E5CC]/15 text-[#00E5CC]/70',
      hoverBorder: 'hover:border-[#00E5CC]/30',
      desc: 'Move from concept to roadmap, operating model, GTM story, delivery plan, governance, and measurable impact.',
      details: ['Roadmap to delivery', 'Operating model design', 'GTM story & positioning', 'Governance framework', 'Impact measurement'],
    },
  ];

  return (
    <section id="howiwork" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="reveal mb-4">
          <div className="section-num mb-3">08 — How I Work</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white">How I Work</h2>
          <div className="nike-divider-red mt-4" />
        </div>

        {/* Intro */}
        <div className="reveal mb-12">
          <p className="text-[#777] text-sm leading-relaxed max-w-3xl">
            I operate at the intersection of product strategy, platform architecture, stakeholder alignment, and execution. My approach is to turn ambiguous payment infrastructure problems into clear product decisions, scalable operating models, and practical delivery paths.
          </p>
        </div>

        {/* Pipeline infographic */}
        <div className="reveal mb-12">
          <div className="relative overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#080808] px-6 py-7">
            <div className="absolute inset-0 bg-gradient-to-r from-[#39FF14]/[0.015] via-transparent to-[#00E5CC]/[0.015]" />
            <div className="relative z-10">
              <div className="text-[9px] font-black text-[#444] uppercase tracking-[0.4em] mb-6">Process Pipeline</div>
              <div className="flex items-center gap-0">
                {steps.map((step, i) => (
                  <div key={step.num} className="flex items-center flex-1 min-w-0">
                    <div className="flex-1 flex flex-col items-center gap-2 group cursor-default px-2">
                      {/* Node */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${step.accentColor}12`, border: `1px solid ${step.accentColor}30` }}
                      >
                        <step.Icon className="w-4 h-4" style={{ color: step.accentColor, opacity: 0.8 }} />
                      </div>
                      {/* Label */}
                      <div className="text-center">
                        <div className="text-[8px] font-black uppercase tracking-[0.3em] mb-0.5" style={{ color: step.accentColor, opacity: 0.55 }}>{step.num}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white">{step.label}</div>
                      </div>
                    </div>
                    {/* Connector */}
                    {i < steps.length - 1 && (
                      <div className="flex items-center gap-0 flex-shrink-0 w-6">
                        <div className="h-px flex-1 bg-gradient-to-r"
                          style={{ backgroundImage: `linear-gradient(to right, ${step.accentColor}40, ${steps[i + 1].accentColor}40)` }}
                        />
                        <div className="w-0 h-0" style={{
                          borderTop: '3px solid transparent',
                          borderBottom: '3px solid transparent',
                          borderLeft: `5px solid ${steps[i + 1].accentColor}40`,
                        }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step cards — 2 columns then last centred on lg */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`group relative bg-[#0c0c0c] border border-[#1a1a1a] ${step.hoverBorder} rounded-xl overflow-hidden transition-all duration-300 p-7 cursor-default flex flex-col ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] opacity-40 group-hover:opacity-90 transition-opacity duration-300"
                style={{ backgroundColor: step.accentColor }}
              />

              {/* Faded background number */}
              <div
                className="absolute top-0 right-4 text-[100px] font-black leading-none select-none pointer-events-none opacity-[0.025] group-hover:opacity-[0.05] transition-opacity duration-300"
                style={{ color: step.accentColor }}
              >
                {step.num}
              </div>

              {/* Header */}
              <div className="flex items-start gap-4 mb-5 relative z-10">
                <div
                  className={`w-11 h-11 rounded-xl ${step.iconBg} border ${step.iconBorder} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}
                >
                  <step.Icon className="w-5 h-5" style={{ color: step.accentColor }} />
                </div>
                <div className="pt-1">
                  <div
                    className="text-[9px] font-black uppercase tracking-[0.3em] mb-1.5 opacity-55"
                    style={{ color: step.accentColor }}
                  >
                    {step.num} — Step
                  </div>
                  <div className="text-white font-black text-sm uppercase tracking-wide leading-snug">{step.label}</div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#1a1a1a] mb-5 relative z-10 group-hover:bg-[#252525] transition-colors duration-300" />

              {/* Description */}
              <p className="text-[#6e6e6e] text-sm leading-relaxed mb-6 relative z-10 flex-1">{step.desc}</p>

              {/* Detail pills */}
              <div className="flex flex-wrap gap-1.5 relative z-10">
                {step.details.map(d => (
                  <span
                    key={d}
                    className={`text-[10px] px-2.5 py-0.5 rounded-full border ${step.tagStyle} font-medium tracking-wide`}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CASE STUDIES ──────────────────────────────────────────────────────── */

function CaseStudies() {
  const [activeTabs, setActiveTabs] = useState<Record<number, string>>({
    0: 'overview', 1: 'overview', 2: 'overview',
  });

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'challenge', label: 'Challenge' },
    { id: 'built', label: 'What I Built' },
    { id: 'thinking', label: 'Thinking' },
    { id: 'impact', label: 'Impact' },
  ];

  return (
    <section id="casestudies" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="reveal mb-10">
          <div className="section-num mb-3">09 — Case Studies</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white leading-tight">Featured Case Studies</h2>
          <div className="nike-divider-red mt-4 mb-6" />
          <p className="text-[#888] text-base font-semibold max-w-3xl leading-relaxed">
            Building the Next Generation of Intelligent Merchant Payment Platforms
          </p>
          <p className="text-[#4a4a4a] text-sm mt-2 max-w-3xl leading-relaxed">
            These case studies reflect my work across AI-native payments, merchant commerce infrastructure, agentic commerce, stablecoin settlement, and multi-rail financial systems. Presented as sanitized product and architecture case studies without client-specific or confidential information.
          </p>
        </div>

        {/* Case study cards */}
        <div className="flex flex-col gap-14">
          {CASE_STUDIES.map((cs, i) => (
            <div key={cs.id} className="reveal">

              {/* ── Hero image banner ── */}
              <div className="relative h-80 rounded-t-2xl overflow-hidden">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                {/* Dark gradient — heavier on left for readability */}
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(105deg, rgba(8,8,8,0.97) 35%, rgba(8,8,8,0.6) 70%, rgba(8,8,8,0.3) 100%)` }}
                />
                {/* Accent glow edge */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ background: `radial-gradient(ellipse at 80% 50%, rgba(${cs.accentRgb},0.4) 0%, transparent 60%)` }}
                />
                <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span
                      className="text-[9px] font-black uppercase tracking-[0.4em] px-2.5 py-1 rounded-full border"
                      style={{ color: cs.accent, borderColor: `rgba(${cs.accentRgb},0.3)`, backgroundColor: `rgba(${cs.accentRgb},0.06)` }}
                    >
                      {cs.num} — Case Study
                    </span>
                    <span className="text-[10px] text-[#555] uppercase tracking-wider font-medium">{cs.category}</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tight leading-tight mb-3 max-w-2xl">{cs.title}</h3>
                  <p className="text-[#777] text-sm max-w-xl leading-relaxed hidden sm:block">{cs.positioning}</p>
                </div>
              </div>

              {/* ── Architecture infographic ── */}
              <div className="bg-[#060606] border-x border-[#151515] px-6 py-5">
                <div
                  className="text-[8px] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-2"
                  style={{ color: cs.accent, opacity: 0.6 }}
                >
                  <div className="w-4 h-px" style={{ backgroundColor: cs.accent }} />
                  Architecture Overview
                  <div className="h-px flex-1" style={{ backgroundColor: `rgba(${cs.accentRgb},0.1)` }} />
                </div>

                <div className="flex flex-col lg:flex-row gap-3">
                  {cs.flow.map((layer, li) => (
                    <div key={li} className="flex lg:flex-col items-stretch lg:items-start flex-1 gap-2">
                      {/* Layer block */}
                      <div className="flex-1 bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl p-4 relative overflow-hidden">
                        {/* Faint layer number */}
                        <div
                          className="absolute top-1 right-2 text-5xl font-black leading-none select-none pointer-events-none opacity-[0.04]"
                          style={{ color: cs.accent }}
                        >
                          {li + 1}
                        </div>
                        <div
                          className="text-[8px] font-black uppercase tracking-[0.35em] mb-3"
                          style={{ color: cs.accent, opacity: 0.5 }}
                        >
                          {layer.label}
                        </div>
                        <div className="flex flex-col gap-2.5">
                          {layer.nodes.map((node, ni) => {
                            const NodeIcon = node.Icon;
                            return (
                              <div key={ni} className="flex items-center gap-2.5">
                                <div
                                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: `rgba(${cs.accentRgb},0.06)`, border: `1px solid rgba(${cs.accentRgb},0.12)` }}
                                >
                                  <NodeIcon className="w-3 h-3" style={{ color: cs.accent, opacity: 0.7 }} />
                                </div>
                                <span className="text-[11px] text-[#5a5a5a] leading-snug">{node.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Arrow connector (horizontal on mobile, below on desktop) */}
                      {li < cs.flow.length - 1 && (
                        <div className="flex items-center justify-center lg:justify-start py-1 lg:py-0 lg:px-1">
                          <ArrowRight className="w-4 h-4 rotate-90 lg:rotate-0" style={{ color: cs.accent, opacity: 0.2 }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Tabs ── */}
              <div className="border border-t-0 border-[#151515] rounded-b-2xl overflow-hidden">

                {/* Tab header */}
                <div className="flex border-b border-[#151515] overflow-x-auto bg-[#080808]">
                  {TABS.map(tab => {
                    const isActive = activeTabs[i] === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTabs(prev => ({ ...prev, [i]: tab.id }))}
                        className={`px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-200 border-b-2 flex-1 lg:flex-none ${
                          isActive ? 'bg-[#0d0d0d]' : 'hover:bg-[#0a0a0a] border-transparent text-[#3a3a3a] hover:text-[#555]'
                        }`}
                        style={isActive ? { color: cs.accent, borderColor: cs.accent } : {}}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab content */}
                <div className="bg-[#090909] p-7 min-h-[200px]">

                  {/* Overview */}
                  {activeTabs[i] === 'overview' && (
                    <div>
                      <p className="text-[#777] text-sm leading-relaxed mb-7">{cs.positioning}</p>
                      <div className="grid sm:grid-cols-3 gap-px bg-[#151515] rounded-xl overflow-hidden">
                        {[
                          { label: 'Capabilities', val: cs.builtCapabilities.length, sub: 'Core features designed' },
                          { label: 'Key Questions', val: cs.thinkingQuestions.length, sub: 'Product questions addressed' },
                          { label: 'Domain Tags', val: cs.tags.length, sub: 'Specialization areas' },
                        ].map(stat => (
                          <div key={stat.label} className="bg-[#0c0c0c] p-5">
                            <div className="text-[8px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: cs.accent, opacity: 0.55 }}>{stat.label}</div>
                            <div className="text-3xl font-black text-white mb-1">{stat.val}</div>
                            <div className="text-[10px] text-[#3a3a3a]">{stat.sub}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Challenge */}
                  {activeTabs[i] === 'challenge' && (
                    <div>
                      <div className="text-[8px] font-black uppercase tracking-[0.4em] mb-5 flex items-center gap-3" style={{ color: cs.accent, opacity: 0.55 }}>
                        <div className="w-4 h-px" style={{ backgroundColor: cs.accent }} />
                        The Challenge
                      </div>
                      <p className="text-[#6e6e6e] text-sm leading-relaxed">{cs.challenge}</p>
                    </div>
                  )}

                  {/* Built */}
                  {activeTabs[i] === 'built' && (
                    <div>
                      <div className="text-[8px] font-black uppercase tracking-[0.4em] mb-5 flex items-center gap-3" style={{ color: cs.accent, opacity: 0.55 }}>
                        <div className="w-4 h-px" style={{ backgroundColor: cs.accent }} />
                        What I Built / Designed
                      </div>
                      <p className="text-[#6e6e6e] text-sm leading-relaxed mb-6">{cs.builtIntro}</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {cs.builtCapabilities.map((cap, ci) => (
                          <div
                            key={ci}
                            className="flex items-start gap-3 bg-[#0d0d0d] border border-[#181818] rounded-xl p-4 hover:border-[#222] transition-colors duration-200"
                          >
                            <div
                              className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ backgroundColor: `rgba(${cs.accentRgb},0.07)`, border: `1px solid rgba(${cs.accentRgb},0.15)` }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cs.accent, opacity: 0.7 }} />
                            </div>
                            <span className="text-[#5e5e5e] text-xs leading-relaxed">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Thinking */}
                  {activeTabs[i] === 'thinking' && (
                    <div>
                      <div className="text-[8px] font-black uppercase tracking-[0.4em] mb-5 flex items-center gap-3" style={{ color: cs.accent, opacity: 0.55 }}>
                        <div className="w-4 h-px" style={{ backgroundColor: cs.accent }} />
                        Product Thinking
                      </div>
                      <p className="text-[#6e6e6e] text-sm leading-relaxed mb-6">{cs.thinkingIntro}</p>
                      <div className="flex flex-col gap-2.5">
                        {cs.thinkingQuestions.map((q, qi) => (
                          <div
                            key={qi}
                            className="flex items-start gap-4 bg-[#0d0d0d] border border-[#181818] rounded-xl p-4"
                            style={{ borderLeft: `2px solid rgba(${cs.accentRgb},0.15)` }}
                          >
                            <span
                              className="text-[9px] font-black tabular-nums flex-shrink-0 pt-0.5 w-6"
                              style={{ color: cs.accent, opacity: 0.4 }}
                            >
                              Q{qi + 1}
                            </span>
                            <span className="text-[#5e5e5e] text-xs leading-relaxed italic">{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Impact */}
                  {activeTabs[i] === 'impact' && (
                    <div className="flex flex-col gap-6">
                      <div>
                        <div className="text-[8px] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-3" style={{ color: cs.accent, opacity: 0.55 }}>
                          <div className="w-4 h-px" style={{ backgroundColor: cs.accent }} />
                          Business Value
                        </div>
                        <p className="text-[#6e6e6e] text-sm leading-relaxed">{cs.value}</p>
                      </div>
                      <div className="h-px bg-[#161616]" />
                      <div>
                        <div className="text-[8px] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-3" style={{ color: cs.accent, opacity: 0.55 }}>
                          <div className="w-4 h-px" style={{ backgroundColor: cs.accent }} />
                          My Role
                        </div>
                        <p className="text-[#6e6e6e] text-sm leading-relaxed">{cs.role}</p>
                      </div>
                    </div>
                  )}

                </div>

                {/* Tags footer */}
                <div className="bg-[#060606] border-t border-[#141414] px-7 py-4 flex flex-wrap items-center gap-2">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#2a2a2a] mr-2">Tags</span>
                  {cs.tags.map(t => (
                    <span
                      key={t}
                      className="text-[10px] px-3 py-1 rounded-full border font-medium tracking-wide"
                      style={{ borderColor: `rgba(${cs.accentRgb},0.18)`, color: `rgba(${cs.accentRgb},0.65)` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer note */}
        <div className="reveal mt-10 flex items-start gap-3 bg-[#080808] border border-[#1a1a1a] rounded-xl px-6 py-4">
          <div className="w-1 h-1 rounded-full bg-[#333] flex-shrink-0 mt-[7px]" />
          <p className="text-[#333] text-xs leading-relaxed">
            <span className="text-[#444] font-black uppercase tracking-wider text-[10px]">Note: </span>
            These case studies are based on sanitized product concepts, prototypes, public research, and generalized platform experience. They do not disclose confidential client information, proprietary implementation details, or non-public business data.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ───────────────────────────────────────────────────────────── */

function Contact() {
  return (
    <section id="contact" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="reveal text-center mb-8">
          <div className="section-num mb-3">10 — Contact</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white mb-2">Let's Connect</h2>
          <div className="nike-divider-red mx-auto mt-4 mb-6" />
          <p className="text-[#666] max-w-lg mx-auto text-sm">
            Interested in payments product leadership, advisory conversations, research collaboration, or fintech strategy discussions? Reach out.
          </p>
        </div>

        <div className="reveal glass-card p-8">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: <Mail className="w-5 h-5 text-[#39FF14]" />, label: 'Email', sub: 'avik.nandi@outlook.com', url: 'mailto:avik.nandi@outlook.com' },
              { icon: <Linkedin className="w-5 h-5 text-[#39FF14]" />, label: 'LinkedIn', sub: 'linkedin.com/in/avikz', url: 'https://www.linkedin.com/in/avikz/' },
              { icon: <GraduationCap className="w-5 h-5 text-[#39FF14]" />, label: 'Google Scholar', sub: 'View Citations', url: 'https://scholar.google.com/citations?user=Tag_oNkAAAAJ&hl=en&oi=ao' },
              { icon: <FileText className="w-5 h-5 text-[#39FF14]" />, label: 'Medium', sub: '20+ Articles', url: 'https://medium.com/@avikcincy' },
              { icon: <BookOpen className="w-5 h-5 text-[#39FF14]" />, label: 'Amazon — Finance Book', sub: 'The Evolution of Financial Systems in the Age of AI & Stablecoins', url: 'https://www.amazon.com/Evolution-Financial-Systems-Age-Stablecoins/dp/B0GVL7Q4GG/' },
              { icon: <BookMarked className="w-5 h-5 text-[#39FF14]" />, label: 'Amazon — Novel', sub: 'THE ARCHITECT · Novel: Interrupted Sequences', url: 'https://www.amazon.com/ARCHITECT-Novel-Interrupted-Sequences/dp/B0H4Z26CZ9/' },
              { icon: <Github className="w-5 h-5 text-[#39FF14]" />, label: 'GitHub', sub: 'avikcincy-sanju', url: 'https://github.com/avikcincy-sanju' },
            ].map((c, i) => (
              <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="contact-link">
                {c.icon}
                <div>
                  <div className="font-black text-sm uppercase tracking-wider">{c.label}</div>
                  <div className="text-xs text-[#555]">{c.sub}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 ml-auto flex-shrink-0 text-[#333] group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-[#1c1c1c] py-10 relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[#39FF14] font-black text-xl tracking-widest uppercase">AN</span>
        <div className="text-center">
          <p className="text-[#444] text-xs uppercase tracking-[0.2em]">© 2026 Avik Nandi</p>
          <p className="text-[#333] text-xs uppercase tracking-[0.15em] mt-1">Payments Platform & AI Strategy Leader · Director of Product · Researcher · Author</p>
        </div>
        <div className="w-8" />
      </div>
    </footer>
  );
}

/* ─── APP ───────────────────────────────────────────────────────────────── */

export default function App() {
  useReveal();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      <ParticleCanvas />
      <Nav />
      <main>
        <Hero />
        <About />
        <CoreCapabilities />
        <SelectedImpact />
        <Experience />
        <Projects />
        <Research />
        <ProductVision />
        <HowIWork />
        <CaseStudies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
