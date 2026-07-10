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
    builtIntro: 'Avik developed a product concept and prototype-led framework for payment intelligence across merchant commerce platforms. The solution explored how payment data, routing logic, settlement rules, refund signals, and merchant performance patterns could be combined into a decision-support layer.',
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
    builtIntro: 'Avik created an MCP-based architecture concept and supporting simulator to demonstrate how AI agents could assist with commerce and payment decisioning. The concept explored AI-assisted payment simulations, merchant readiness scoring, vendor and PSP comparison, revenue impact modeling, payment architecture recommendations, and delegated commerce decisioning with controls and governance.',
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
    accent: '#00BFFF',
    accentRgb: '0,191,255',
    category: 'Stablecoins · Multi-Rail · Treasury Infrastructure',
    title: 'Stablecoin & Multi-Rail Settlement Infrastructure',
    positioning: 'Developed a stablecoin and multi-rail settlement framework exploring how tokenized settlement, fiat/stablecoin conversion, treasury mobility, liquidity controls, and compliance-aware payout flows could support future merchant and enterprise payment infrastructure.',
    challenge: 'Cross-border settlement and treasury movement remain slow, expensive, fragmented, and operationally complex. Many enterprises still depend on traditional banking rails, batch settlement cycles, limited transparency, and manual reconciliation processes. The challenge was to explore how stablecoins and tokenized settlement models could complement existing payment rails without replacing the controls required in enterprise financial infrastructure.',
    builtIntro: 'Avik created a stablecoin operating model and product architecture concept focused on practical enterprise use cases. The framework explored fiat-to-stablecoin flows, treasury wallet and liquidity management models, cross-border payout modernization, hybrid rail orchestration, on/off-ramp design, and KYT/compliance checkpoints.',
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
    { label: 'Vision', href: 'productvision' },
    { label: 'Projects', href: 'projects' },
    { label: 'Research', href: 'research' },
    { label: 'Experience', href: 'experience' },
    { label: 'Contact', href: 'contact' },
  ];
 
  const more = [
    { label: 'Core Capabilities', href: 'capabilities' },
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
 
            <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mb-6" />
 
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
          <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4" />
        </div>
 
        {/* Bio + Skills two-column */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="reveal">
            <div className="glass-card p-8 h-full">
              <p className="text-[#aaa] leading-relaxed mb-5 text-base font-semibold">
                Avik Nandi builds the financial infrastructure behind modern commerce.
              </p>
              <p className="text-[#aaa] leading-relaxed mb-5">
                Avik is a product leader focused on AI-native payments, merchant commerce infrastructure, Merchant of Record platforms, multi-rail orchestration, stablecoins, real-time rails, treasury automation, and intelligent financial systems.
              </p>
              <p className="text-[#777] leading-relaxed mb-5">
                With 20+ years across Wipro, Deloitte, FIS, Worldpay, and Vantiv, Avik has led product, platform, and modernization initiatives across complex payment ecosystems — spanning merchant acquiring, issuing, payment gateways, settlement, reconciliation, cross-border payments, AI-enabled commerce, and regulated financial infrastructure.
              </p>
              <p className="text-[#777] leading-relaxed">
                His work sits at the intersection of product strategy, platform architecture, and execution — turning complex payment ecosystems into scalable, resilient, and commercially effective platforms that improve merchant outcomes, optimize cost, strengthen compliance, and unlock new revenue models.
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
      title: 'AI-Native Payment Platforms',
      desc: 'Building intelligent merchant payment platforms across routing, observability, settlement, reconciliation, treasury workflows, and Merchant of Record operating models.',
      tags: ['AI Routing', 'MoR', 'Settlement', 'Observability'],
    },
    {
      num: '02',
      Icon: Coins,
      accentColor: '#00BFFF',
      iconBg: 'bg-[#0a0f1a]',
      iconBorder: 'border-[#00BFFF]/20',
      hoverBorder: 'hover:border-[#00BFFF]/25',
      tagStyle: 'border-[#00BFFF]/20 text-[#00BFFF]/80',
      title: 'Stablecoin & Multi-Rail Settlement',
      desc: 'Designing practical infrastructure concepts for stablecoin settlement, fiat on/off-ramps, treasury mobility, cross-border payouts, and hybrid fiat/real-time rail orchestration.',
      tags: ['USDC', 'RTP/FedNow', 'Treasury', 'Cross-border'],
    },
    {
      num: '03',
      Icon: Bot,
      accentColor: '#39FF14',
      iconBg: 'bg-[#0a1a0a]',
      iconBorder: 'border-[#39FF14]/20',
      hoverBorder: 'hover:border-[#39FF14]/25',
      tagStyle: 'border-[#39FF14]/20 text-[#39FF14]/80',
      title: 'Agentic Commerce & MCP',
      desc: 'Creating AI-enabled product concepts and tools where agents can support payment simulations, vendor comparison, merchant readiness, revenue impact, and commerce decisioning.',
      tags: ['MCP', 'AI Agents', 'Decisioning', 'Simulators'],
    },
    {
      num: '04',
      Icon: Lightbulb,
      accentColor: '#00BFFF',
      iconBg: 'bg-[#0a0f1a]',
      iconBorder: 'border-[#00BFFF]/20',
      hoverBorder: 'hover:border-[#00BFFF]/25',
      tagStyle: 'border-[#00BFFF]/20 text-[#00BFFF]/80',
      title: 'Executive Product Leadership',
      desc: 'Turning complex financial infrastructure problems into product strategy, roadmaps, operating models, prototypes, GTM narratives, and executive-ready decision support.',
      tags: ['Strategy', 'Roadmap', 'GTM', 'Execution'],
    },
  ];
 
  return (
    <section id="capabilities" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-10">
          <div className="section-num mb-3">02 — Core Capabilities</div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">Core Capabilities</h2>
          <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4" />
          <p className="text-[#666] text-sm mt-5 max-w-3xl leading-relaxed">
            A focused view of the areas Avik is known for: payments, merchant platforms, stablecoin settlement, and AI-native commerce.
          </p>
        </div>
 
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap) => (
            <div
              key={cap.num}
              className={`group relative bg-[#0c0c0c] border border-[#1a1a1a] ${cap.hoverBorder} rounded-xl overflow-hidden transition-all duration-300 p-6 cursor-default`}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                style={{ background: `linear-gradient(to right, transparent, ${cap.accentColor}, transparent)` }}
              />
              <div className="flex items-start gap-4 mb-5 relative z-10">
                <div className={`w-12 h-12 rounded-xl ${cap.iconBg} border ${cap.iconBorder} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                  <cap.Icon className="w-6 h-6" style={{ color: cap.accentColor }} />
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-[9px] font-black uppercase tracking-[0.3em] mb-1.5 opacity-70" style={{ color: cap.accentColor }}>
                    {cap.num} — Focus
                  </div>
                  <div className="text-white font-black text-sm uppercase tracking-wide leading-snug">{cap.title}</div>
                </div>
              </div>
              <p className="text-[#777] text-sm leading-relaxed mb-5 relative z-10">{cap.desc}</p>
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
          <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4" />
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
          <div className="section-num mb-3">06 — Experience</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white">Career Timeline</h2>
          <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4" />
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
          <div className="section-num mb-3">04 — Projects</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white">Live GitHub Projects</h2>
          <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4" />
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
          <div className="section-num mb-3">05 — Research & Publications</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white">Thought Leadership</h2>
          <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4" />
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
                <div className="badge badge-cyan flex-shrink-0 mt-1">Book</div>
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
                { title: 'Stablecoin Acquiring Infrastructure', url: 'https://www.researchgate.net/publication/404948087_Stablecoin_Acquiring_Infrastructure_Bridging_the_Gap_Between_Payment_Viability_and_Merchant_Readiness?channel=doi&linkId=6a0a3a84e48e8125fa39074d&showFulltext=true', badge: 'ResearchGate', badgeClass: 'badge-cyan' },
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
      title: 'Commerce Layer',
      desc: 'POS, eCommerce, ISVs, APIs, merchant data, and customer engagement working as one platform experience.',
      flow: ['POS / eCommerce', 'ISVs / APIs', 'Merchant Data'],
      capabilities: ['Merchant experience', 'Platform commerce', 'Embedded payments'],
      iconBg: 'bg-[#0a1a0a]',
      iconBorder: 'border-[#39FF14]/20',
      tagStyle: 'border-[#39FF14]/20 text-[#39FF14]/80',
      hoverBorder: 'hover:border-[#39FF14]/30',
    },
    {
      num: '02',
      accentColor: '#00BFFF',
      Icon: Workflow,
      title: 'Intelligence Layer',
      desc: 'AI-assisted routing, risk signals, cost logic, performance insights, and merchant-level observability.',
      flow: ['AI Routing', 'Risk Signals', 'Cost Logic'],
      capabilities: ['Decisioning', 'Observability', 'Merchant intelligence'],
      iconBg: 'bg-[#0a0f1a]',
      iconBorder: 'border-[#00BFFF]/20',
      tagStyle: 'border-[#00BFFF]/20 text-[#00BFFF]/80',
      hoverBorder: 'hover:border-[#00BFFF]/30',
    },
    {
      num: '03',
      accentColor: '#39FF14',
      Icon: GitBranch,
      title: 'Payments & Settlement',
      desc: 'Cards, ACH, RTP/FedNow, wallets, BNPL, stablecoin settlement, treasury controls, and reconciliation intelligence.',
      flow: ['Cards / ACH', 'RTP / FedNow', 'Settlement', 'Reconciliation'],
      capabilities: ['Multi-rail payments', 'Treasury', 'Settlement visibility'],
      iconBg: 'bg-[#0a1a0a]',
      iconBorder: 'border-[#39FF14]/20',
      tagStyle: 'border-[#39FF14]/20 text-[#39FF14]/80',
      hoverBorder: 'hover:border-[#39FF14]/30',
    },
  ];
 
  return (
    <section id="productvision" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
 
        <div className="reveal mb-4">
          <div className="section-num mb-3">03 — Product Vision</div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Product Vision
          </h2>
          <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4" />
        </div>
 
        <div className="reveal mb-10">
          <p className="text-[#777] text-sm leading-relaxed max-w-3xl">
            The next generation of merchant platforms will become AI-native commerce operating systems — combining payments, intelligence, settlement, treasury, and merchant workflows into one smarter platform experience.
          </p>
        </div>
 
        <div className="reveal mb-12">
          <div className="relative overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#080808] p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/[0.025] via-transparent to-[#00BFFF]/[0.025]" />
 
            <div className="relative z-10">
              <div className="text-[10px] font-black text-[#39FF14] uppercase tracking-[0.35em] mb-6">
                Architecture Overview
              </div>
 
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cards.map((layer) => (
                  <div
                    key={layer.num}
                    className="rounded-xl border border-[#1a1a1a] bg-[#0b0b0b] p-5"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl ${layer.iconBg} border ${layer.iconBorder} flex items-center justify-center mb-4`}
                    >
                      <layer.Icon className="w-5 h-5" style={{ color: layer.accentColor }} />
                    </div>
 
                    <div
                      className="text-[10px] font-black uppercase tracking-[0.25em] mb-2"
                      style={{ color: layer.accentColor }}
                    >
                      {layer.num} — Layer
                    </div>
 
                    <h3 className="text-white text-sm font-black uppercase tracking-wide mb-3 leading-snug">
                      {layer.title}
                    </h3>
 
                    <p className="text-[#666] text-xs leading-relaxed">
                      {layer.desc}
                    </p>
                  </div>
                ))}
              </div>
 
              <div className="mt-6 pt-5 border-t border-[#161616] flex items-center gap-3">
                <div className="flex-1 h-[2px] bg-gradient-to-r from-[#39FF14]/40 to-[#00BFFF]/40 rounded-full" />
                <span className="text-[9px] text-[#444] uppercase tracking-[0.25em] font-black whitespace-nowrap">
                  Intelligent Commerce Platform
                </span>
                <div className="flex-1 h-[2px] bg-gradient-to-l from-[#39FF14]/40 to-[#00BFFF]/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
 
        <div className="grid lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.num}
              className={`group relative bg-[#0c0c0c] border border-[#1a1a1a] ${card.hoverBorder} rounded-xl overflow-hidden transition-all duration-300 p-6`}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-50"
                style={{ background: `linear-gradient(to right, transparent, ${card.accentColor}, transparent)` }}
              />
 
              <div className="flex items-start gap-4 mb-5">
                <div
                  className={`w-12 h-12 rounded-xl ${card.iconBg} border ${card.iconBorder} flex items-center justify-center flex-shrink-0`}
                >
                  <card.Icon className="w-6 h-6" style={{ color: card.accentColor }} />
                </div>
 
                <div>
                  <div
                    className="text-[9px] font-black uppercase tracking-[0.3em] mb-1.5 opacity-70"
                    style={{ color: card.accentColor }}
                  >
                    {card.num} — Focus
                  </div>
                  <h3 className="text-white font-black text-sm uppercase tracking-wide leading-snug">
                    {card.title}
                  </h3>
                </div>
              </div>
 
              <p className="text-[#6e6e6e] text-sm leading-relaxed mb-5">
                {card.desc}
              </p>
 
              <div className="mb-5">
                <div
                  className="text-[9px] font-black uppercase tracking-[0.25em] mb-3 opacity-60"
                  style={{ color: card.accentColor }}
                >
                  Flow
                </div>
 
                <div className="flex flex-wrap gap-2">
                  {card.flow.map((step) => (
                    <span
                      key={step}
                      className="text-[10px] font-semibold px-3 py-1.5 rounded-md border"
                      style={{
                        borderColor: `${card.accentColor}20`,
                        color: `${card.accentColor}cc`,
                        backgroundColor: `${card.accentColor}08`,
                      }}
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>
 
              <div className="flex flex-wrap gap-1.5">
                {card.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className={`text-[10px] px-2.5 py-0.5 rounded-full border ${card.tagStyle} font-medium tracking-wide`}
                  >
                    {cap}
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
 
/* ─── HOW I WORK ─────────────────────────────────────────────────────────── */
 
function HowIWork() {
  const steps = [
    {
      num: '01',
      Icon: Search,
      accentColor: '#39FF14',
      title: 'Find the Business Problem',
      desc: 'Start with merchant pain, economics, platform friction, risk, and operational impact.',
      details: ['Merchant pain', 'Cost drivers', 'Operational friction'],
    },
    {
      num: '02',
      Icon: PenLine,
      accentColor: '#00BFFF',
      title: 'Frame the Product Narrative',
      desc: 'Turn complexity into a clear story, roadmap, operating model, and executive decision path.',
      details: ['Product story', 'Roadmap', 'Decision model'],
    },
    {
      num: '03',
      Icon: FlaskConical,
      accentColor: '#39FF14',
      title: 'Prototype Before Scaling',
      desc: 'Use demos, simulators, and structured models to validate product direction quickly.',
      details: ['Live demos', 'Simulators', 'Proof points'],
    },
    {
      num: '04',
      Icon: Users,
      accentColor: '#00BFFF',
      title: 'Align Teams Around Execution',
      desc: 'Bring product, engineering, risk, compliance, finance, sales, and leadership into one execution path.',
      details: ['Alignment', 'Governance', 'Execution'],
    },
  ];
 
  return (
    <section id="howiwork" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-10">
          <div className="section-num mb-3">08 — How Avik Works</div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">How Avik Works</h2>
          <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4" />
        </div>
 
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div key={step.num} className="reveal bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#39FF14]/25 transition-colors duration-300">
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl border border-[#1a1a1a] bg-[#080808] flex items-center justify-center">
                  <step.Icon className="w-5 h-5" style={{ color: step.accentColor }} />
                </div>
                <div className="text-3xl font-black opacity-20" style={{ color: step.accentColor }}>{step.num}</div>
              </div>
              <h3 className="text-white font-black text-sm uppercase tracking-wide leading-snug mb-3">{step.title}</h3>
              <p className="text-[#777] text-sm leading-relaxed mb-5">{step.desc}</p>
              <div className="space-y-2">
                {step.details.map((d) => (
                  <div key={d} className="flex items-center gap-2 text-xs text-[#666]">
                    <ArrowRight className="w-3 h-3" style={{ color: step.accentColor }} />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
 
        <div className="reveal mt-8 glass-card p-6">
          <div className="flex items-start gap-4">
            <CpuIcon className="w-6 h-6 text-[#39FF14] flex-shrink-0 mt-1" />
            <p className="text-[#777] text-sm leading-relaxed">
              My operating style is prototype-led, commercially grounded, and execution-focused: clarify the problem, shape the product narrative, validate with working artifacts, and align teams around measurable outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
 
/* ─── CASE STUDIES ──────────────────────────────────────────────────────── */
 
function CaseStudies() {
  return (
    <section id="casestudies" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-10">
          <div className="section-num mb-3">09 — Case Studies</div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">Featured Case Studies</h2>
          <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4 mb-6" />
          <p className="text-[#777] text-sm max-w-3xl leading-relaxed">
            A shorter, cleaner view of the themes behind Avik's portfolio — sanitized product and architecture case studies without client-specific or confidential information.
          </p>
        </div>
 
        <div className="grid lg:grid-cols-3 gap-4">
          {CASE_STUDIES.map((cs, i) => {
            const accent = i % 2 === 0 ? '#39FF14' : '#00BFFF';
            const accentRgb = i % 2 === 0 ? '57,255,20' : '0,191,255';
            return (
              <div key={cs.id} className="reveal group relative bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl overflow-hidden hover:border-[#39FF14]/25 transition-all duration-300">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="w-full h-full object-cover opacity-45 group-hover:opacity-60 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/70 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{ background: `radial-gradient(ellipse at 70% 30%, rgba(${accentRgb},0.45), transparent 60%)` }}
                  />
                </div>
 
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-[9px] font-black uppercase tracking-[0.3em] px-2.5 py-1 rounded-full border"
                      style={{ color: accent, borderColor: `rgba(${accentRgb},0.3)`, backgroundColor: `rgba(${accentRgb},0.06)` }}
                    >
                      {cs.num} — Case Study
                    </span>
                  </div>
 
                  <h3 className="text-white text-base font-black uppercase tracking-wide leading-snug mb-3">
                    {cs.title}
                  </h3>
 
                  <p className="text-[#777] text-sm leading-relaxed mb-5">
                    {cs.positioning}
                  </p>
 
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cs.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-full border border-[#222] text-[#666] font-medium tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
 
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em]" style={{ color: accent }}>
                    <span>Product strategy · Architecture · Execution</span>
                    <CircleDot className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
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
          <div className="section-num mb-3">07 — Contact</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white mb-2">Let's Connect</h2>
          <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mx-auto mt-4 mb-6" />
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
        <ProductVision />
        <Projects />
        <Research />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
