
import { useEffect, useRef, useState } from 'react';
import {
  Github, Linkedin, Mail, BookOpen, Globe,
  ChevronRight, Award, Cpu, TrendingUp, Zap, Database,
  GraduationCap, FileText, Building2, Calendar, Menu, X, ArrowUpRight,
  BookMarked, Microscope, Newspaper, ShoppingCart,
  Network, Coins, Bot, Lightbulb,
  ArrowRight, BarChart3, Shield, Layers, GitBranch, Workflow, Cpu as CpuIcon, CircleDot,
  Search, PenLine, FlaskConical, Users, Plane
} from 'lucide-react';
 
/* ─── DATA ──────────────────────────────────────────────────────────────── */
 
const PROJECTS = [
  {
    title: 'Agentic Money Movement',
    desc: 'Interactive command center prototype for agent-directed money movement, multi-rail orchestration, controls, and real-time operational decisioning.',
    value: 'Explores how governed AI agents can select rails, execute money movement, and surface operational decisions.',
    tags: ['Agentic AI', 'Money Movement', 'Orchestration'],
    demoUrl: 'https://avikcincy-sanju.github.io/agentic-money-movement-command-center/',
    sourceUrl: 'https://github.com/avikcincy-sanju/agentic-money-movement-command-center',
    caseStudyUrl: '#case-study-2',
    doiUrl: 'https://doi.org/10.5281/zenodo.21400904',
    meta: 'Creator: Avik Nandi  |  ORCID: 0009-0001-1217-3174  |  Software DOI: 10.5281/zenodo.21400904',
    icon: <Coins className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'Payment Intelligence',
    desc: 'AI-driven multi-rail payment routing with real-time orchestration logic and analytics dashboard.',
    value: 'Helps payment teams compare routing, cost, settlement, and performance signals across rails.',
    tags: ['AI', 'Payments', 'Analytics'],
    demoUrl: 'https://avikcincy-sanju.github.io/Payment_Intelligence/',
    sourceUrl: 'https://github.com/avikcincy-sanju/Payment_Intelligence',
    caseStudyUrl: '#case-study-1',
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'BNPL Calculator',
    desc: 'Buy Now Pay Later cost and conversion calculator for merchants evaluating BNPL adoption economics.',
    value: 'Quantifies whether conversion improvement offsets higher BNPL acceptance costs.',
    tags: ['BNPL', 'FinTech', 'Calculator'],
    demoUrl: 'https://avikcincy-sanju.github.io/BNPL_Cost_Conversion_Calculator/',
    sourceUrl: 'https://github.com/avikcincy-sanju/BNPL_Cost_Conversion_Calculator',
    icon: <ShoppingCart className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'AI Route Advisor',
    desc: 'AI-powered payment route advisor using ML models to optimize authorization rates and reduce costs.',
    value: 'Demonstrates how routing decisions can balance authorization performance, cost, and operational constraints.',
    tags: ['AI', 'Routing', 'ML'],
    demoUrl: 'https://avikcincy-sanju.github.io/AI_SBC_Route_Advisor/',
    sourceUrl: 'https://github.com/avikcincy-sanju/AI_SBC_Route_Advisor',
    doiUrl: 'https://doi.org/10.5281/zenodo.20140629',
    icon: <Cpu className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'MCP Agentic Commerce',
    desc: 'Model Context Protocol demo for agentic commerce — autonomous AI agents orchestrating payments.',
    value: 'Shows how tool-enabled AI agents can evaluate and orchestrate governed commerce workflows.',
    tags: ['MCP', 'Agentic', 'AI'],
    demoUrl: 'https://avikcincy-sanju.github.io/MCPDemo/',
    sourceUrl: 'https://github.com/avikcincy-sanju/MCPDemo',
    caseStudyUrl: '#case-study-2',
    icon: <Zap className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'GTM & Ops Simulator',
    desc: 'Platform Payments GTM and Operating Model Simulator for strategy teams evaluating go-to-market plays.',
    value: 'Turns platform-strategy assumptions into clearer go-to-market, operating-model, and prioritization decisions.',
    tags: ['GTM', 'Strategy', 'Simulator'],
    demoUrl: 'https://avikcincy-sanju.github.io/GTM_Ops_Simulator/',
    sourceUrl: 'https://github.com/avikcincy-sanju/GTM_Ops_Simulator',
    icon: <Globe className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'Stablecoin OS',
    desc: 'Stablecoin operating system prototype demonstrating treasury, settlement, and liquidity management.',
    value: 'Models treasury, liquidity, settlement, and control requirements for enterprise stablecoin flows.',
    tags: ['Stablecoin', 'DeFi', 'Treasury'],
    demoUrl: 'https://avikcincy-sanju.github.io/stablecoinOS/',
    sourceUrl: 'https://github.com/avikcincy-sanju/stablecoinOS',
    caseStudyUrl: '#case-study-3',
    icon: <Database className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'Agentic Commerce MCP',
    desc: 'Open-source MCP server implementation enabling AI agents to autonomously execute commerce transactions.',
    value: 'Provides an open-source tool layer for structured AI-agent interactions with commerce and payment capabilities.',
    tags: ['Open Source', 'MCP', 'Commerce'],
    sourceUrl: 'https://github.com/avikcincy-sanju/agentic-commerce-mcp',
    caseStudyUrl: '#case-study-2',
    icon: <Github className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
  {
    title: 'Agentic Commerce Revenue Impact Simulator',
    desc: 'Synthetic framework simulator modeling revenue impact scenarios for agentic commerce adoption across merchant segments.',
    value: 'Tests how agentic-commerce adoption assumptions translate into merchant-segment revenue scenarios.',
    tags: ['Agentic', 'Revenue', 'Simulator'],
    demoUrl: 'https://avikcincy-sanju.github.io/Agentic_commerce_rev_impact/',
    sourceUrl: 'https://github.com/avikcincy-sanju/Agentic_commerce_rev_impact',
    caseStudyUrl: '#case-study-2',
    meta: 'Version 1.0  |  Synthetic Framework  |  July 1, 2026',
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    color: 'from-[#111] to-[#1c1c1c]',
  },
];

// Nine cards are shown in the complete portfolio; Merchant Intelligence Monitor is the tenth
// personal fintech build and is highlighted in Featured Live Builds and Industry Intelligence.
const TOTAL_PERSONAL_FINTECH_BUILDS = PROJECTS.length + 1;

const FEATURED_BUILDS = [
  {
    title: 'Agentic Money Movement',
    category: 'Agentic Execution · Multi-Rail Money Movement',
    desc: 'A command-center prototype for governed agent-directed money movement, rail selection, controls, and operational decisioning.',
    value: 'Explores how AI agents can move from recommendations toward controlled financial execution.',
    tags: ['Agentic AI', 'Money Movement', 'Controls'],
    demoUrl: 'https://avikcincy-sanju.github.io/agentic-money-movement-command-center/',
    sourceUrl: 'https://github.com/avikcincy-sanju/agentic-money-movement-command-center',
    caseStudyUrl: '#case-study-2',
    doiUrl: 'https://doi.org/10.5281/zenodo.21400904',
    Icon: Coins,
    accent: '#39FF14',
  },
  {
    title: 'Payment Intelligence',
    category: 'AI-Native Payments · Routing Intelligence',
    desc: 'A multi-rail payment-intelligence experience combining routing, cost, settlement, and performance signals.',
    value: 'Helps payment teams compare complex tradeoffs and move from fragmented reporting toward actionable decision support.',
    tags: ['Payments', 'AI Routing', 'Analytics'],
    demoUrl: 'https://avikcincy-sanju.github.io/Payment_Intelligence/',
    sourceUrl: 'https://github.com/avikcincy-sanju/Payment_Intelligence',
    caseStudyUrl: '#case-study-1',
    Icon: TrendingUp,
    accent: '#00BFFF',
  },
  {
    title: 'Merchant Intelligence Monitor',
    category: 'Industry Intelligence · Merchant Platforms',
    desc: 'A live signal-monitoring product tracking developments across merchant payments, acquiring, platforms, stablecoins, and agentic commerce.',
    value: 'Converts a fast-moving industry landscape into a focused stream of signals aligned to my core product expertise.',
    tags: ['Merchant Signals', 'Payments News', 'Monitoring'],
    demoUrl: 'https://avikcincy-sanju.github.io/Merchant-Intelligence-Edition/',
    sourceUrl: 'https://github.com/avikcincy-sanju/Merchant-Intelligence-Edition',
    Icon: Newspaper,
    accent: '#39FF14',
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
  {
    title: 'Agentic Money Movement Command Center — Software Release',
    record: '21400904',
    url: 'https://doi.org/10.5281/zenodo.21400904',
    type: 'Software',
    year: '2026',
    doi: '10.5281/zenodo.21400904',
  },
  { title: 'Zenodo Research Record 20261877', record: '20261877', url: 'https://zenodo.org/records/20261877', type: 'Research', year: '2026', doi: '10.5281/zenodo.20261877' },
  { title: 'Zenodo Research Record 20261969', record: '20261969', url: 'https://zenodo.org/records/20261969', type: 'Research', year: '2026', doi: '10.5281/zenodo.20261969' },
  { title: 'Zenodo Research Record 20315696', record: '20315696', url: 'https://zenodo.org/records/20315696', type: 'Research', year: '2026', doi: '10.5281/zenodo.20315696' },
  {
    title: 'Stablecoin Acquiring Infrastructure: Bridging the Gap Between Payment Viability and Merchant Readiness',
    record: '20599540',
    url: 'https://zenodo.org/records/20599540',
    type: 'Preprint',
    year: '2026',
    doi: '10.5281/zenodo.20599540',
  },
  {
    title: 'The Emergence of Intelligent Payment Systems: An AI-Driven Framework for Multi-Rail Payment Orchestration',
    record: '20140629',
    url: 'https://zenodo.org/records/20140629',
    type: 'Research Paper',
    year: '2026',
    doi: '10.5281/zenodo.20140629',
  },
];
 
const MEDIUM_ARTICLES = [
  {
    title: 'The Yellow Button and the Invisible Empire',
    url: 'https://medium.com/@avikcincy/the-yellow-button-and-the-invisible-empire-cd9591f3dead?postPublishedType=initial',
  },
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
  {title: 'Who Sent This Agent?', url: 'https://medium.com/@avikcincy/who-sent-this-agent-36690a186201?postPublishedType=initial'},
  {title: 'Two Rails, One Race: Why Swift Just Built a Blockchain, and Fifty Startups Are Racing It', url: 'https://medium.com/@avikcincy/two-rails-one-race-why-swift-just-built-a-blockchain-and-fifty-startups-are-racing-it-6aa388fd557f' },
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

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let running = true;
    const particleCount = window.innerWidth < 768 ? 28 : 60;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const seedParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i += 1) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.2 + 0.3,
          alpha: Math.random() * 0.3 + 0.05,
        });
      }
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${particle.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.05 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      running = !document.hidden;
      if (running) {
        cancelAnimationFrame(animId);
        draw();
      } else {
        cancelAnimationFrame(animId);
      }
    };

    resize();
    seedParticles();
    draw();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" aria-hidden="true" />;
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
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMoreOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const primary = [
    { label: 'Builds', href: 'featured-builds' },
    { label: 'About', href: 'about' },
    { label: 'Vision', href: 'productvision' },
    { label: 'Experience', href: 'experience' },
    { label: 'Research', href: 'research' },
    { label: 'Contact', href: 'contact' },
  ];

  const more = [
    { label: 'All Product Builds', href: 'projects' },
    { label: 'Selected Impact', href: 'impact' },
    { label: 'Core Capabilities', href: 'capabilities' },
    { label: 'Case Studies', href: 'casestudies' },
    { label: 'How I Work', href: 'howiwork' },
    { label: 'Beyond Work', href: 'beyondwork' },
  ];

  const allLinks = [...primary, ...more];

  return (
    <nav aria-label="Primary navigation" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-0 bg-[#0a0a0a]/96 backdrop-blur-md border-b border-[#1a1a1a]' : 'py-0 bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/60 rounded-md">
          <span className="text-[#39FF14] font-black text-lg tracking-[0.15em] uppercase group-hover:opacity-80 transition-opacity duration-200">AN</span>
          <span className="hidden sm:block text-[#333] text-[10px] font-black uppercase tracking-[0.25em] group-hover:text-[#444] transition-colors duration-200">Portfolio</span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {primary.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              className="px-3 py-1.5 text-[11px] font-bold text-[#555] uppercase tracking-[0.12em] rounded-md hover:text-white hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}

          <div ref={moreRef} className="relative ml-1">
            <button
              type="button"
              onClick={() => setMoreOpen((value) => !value)}
              aria-expanded={moreOpen}
              aria-controls="more-navigation-menu"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50 transition-all duration-200 ${moreOpen ? 'text-white bg-white/[0.06]' : 'text-[#555] hover:text-white hover:bg-white/[0.04]'}`}
            >
              More
              <ChevronRight aria-hidden="true" className={`w-3 h-3 transition-transform duration-200 ${moreOpen ? 'rotate-90' : ''}`} />
            </button>
            {moreOpen && (
              <div id="more-navigation-menu" className="absolute right-0 top-full mt-2 w-52 bg-[#0f0f0f] border border-[#222] rounded-xl shadow-2xl shadow-black/60 overflow-hidden">
                <div className="p-1.5 flex flex-col gap-0.5">
                  {more.map((link) => (
                    <a
                      key={link.href}
                      href={`#${link.href}`}
                      onClick={() => setMoreOpen(false)}
                      className="px-3 py-2.5 text-[11px] font-bold text-[#666] uppercase tracking-[0.1em] rounded-lg hover:text-white hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50 transition-all duration-150 flex items-center justify-between group"
                    >
                      {link.label}
                      <ArrowUpRight aria-hidden="true" className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity duration-150" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#222] text-[#666] hover:text-white hover:border-[#333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50 transition-all duration-200"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-menu"
        >
          {mobileOpen ? <X aria-hidden="true" className="w-4 h-4" /> : <Menu aria-hidden="true" className="w-4 h-4" />}
        </button>
      </div>

      <div id="mobile-navigation-menu" className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#0a0a0a] border-b border-[#1a1a1a] px-6 py-5">
          <div className="grid grid-cols-2 gap-1">
            {allLinks.map((link) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 text-[11px] font-bold text-[#555] uppercase tracking-[0.1em] rounded-lg hover:text-white hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50 transition-all duration-150"
              >
                {link.label}
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
            <div className="section-num mb-3">Product Leader — Payments, AI & Merchant Platforms</div>
            <div className="mb-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#444]">
              Executive Product Portfolio · Independent Fintech Product Lab
            </div>
 
            <h1 className="text-6xl lg:text-8xl font-black mb-2 leading-none tracking-tight uppercase text-white">
              Avik
            </h1>
            <h1 className="text-6xl lg:text-8xl font-black mb-4 leading-none tracking-tight uppercase text-[#39FF14]">
              Nandi
            </h1>
 
            <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mb-6" />
 
            <p className="text-[#666] text-xs mb-6 font-semibold uppercase tracking-[0.18em]">
              Product Leadership Backed by Working Fintech Builds
            </p>
            <p className="text-[#888] text-base max-w-xl mb-10 leading-relaxed">
              I lead and build across payments, merchant platforms, AI, stablecoins, and multi-rail money movement—combining 20+ years of industry experience with independently developed products, research, and working prototypes.
            </p>
 
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <a href="#featured-builds" className="btn-primary">Explore Live Builds</a>
              <a href="#impact" className="btn-outline">View Product Leadership</a>
              <a href="https://www.linkedin.com/in/avikz/" target="_blank" rel="noopener noreferrer" className="btn-outline">LinkedIn</a>
            </div>
 
            <div className="grid grid-cols-3 gap-0 max-w-sm mx-auto lg:mx-0 border border-[#222]">
              {[
                { val: '20+', label: 'Years' },
                { val: String(TOTAL_PERSONAL_FINTECH_BUILDS), label: 'Personal Builds' },
                { val: '40+', label: 'Published Works' },
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
 
/* ─── FEATURED LIVE BUILDS ───────────────────────────────────────────────── */

function FeaturedBuilds() {
  return (
    <section id="featured-builds" className="scroll-mt-16 py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-10">
          <div className="section-num mb-3">Independent Fintech Product Lab</div>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">Featured Live Builds</h2>
              <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4" />
            </div>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 self-start rounded-md border border-[#2a2a2a] px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#777] hover:border-[#39FF14]/40 hover:text-[#39FF14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50 lg:self-auto"
            >
              Explore All {TOTAL_PERSONAL_FINTECH_BUILDS} Builds
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </a>
          </div>
          <p className="text-[#666] text-sm mt-5 max-w-3xl leading-relaxed">
            Working fintech products independently designed and built by Avik Nandi to explore emerging payment architectures, merchant intelligence, agentic commerce, stablecoins, and multi-rail money movement.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {FEATURED_BUILDS.map((build, index) => (
            <article
              key={build.title}
              className="reveal group relative flex min-h-full flex-col overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0c0c0c] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#39FF14]/25"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] opacity-70"
                style={{ background: `linear-gradient(to right, transparent, ${build.accent}, transparent)` }}
              />

              <div className="flex items-start justify-between gap-4 mb-6">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl border bg-[#080808]"
                  style={{ borderColor: `${build.accent}33` }}
                >
                  <build.Icon className="h-6 w-6" style={{ color: build.accent }} />
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: build.accent }}>
                    Featured Build
                  </div>
                  <div className="mt-1 text-[9px] font-mono text-[#333]">0{index + 1} / 03</div>
                </div>
              </div>

              <div className="mb-3 text-[9px] font-black uppercase tracking-[0.2em] text-[#555]">{build.category}</div>
              <h3 className="text-lg font-black uppercase tracking-wide text-white leading-tight mb-3">{build.title}</h3>
              <p className="text-sm leading-relaxed text-[#777]">{build.desc}</p>

              <div className="my-5 border-l-2 border-[#39FF14]/30 pl-3">
                <div className="text-[9px] font-black uppercase tracking-[0.18em] text-[#39FF14]/70">Business Value</div>
                <p className="mt-1 text-xs leading-relaxed text-[#666]">{build.value}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {build.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[#222] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#666]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-2 border-t border-[#1a1a1a] pt-5 mt-6">
                <a
                  href={build.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#39FF14]/25 bg-[#39FF14]/5 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#39FF14] hover:bg-[#39FF14]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50"
                >
                  Launch Demo <ArrowUpRight aria-hidden="true" className="w-3 h-3" />
                </a>
                <a
                  href={build.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#252525] px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#777] hover:border-[#444] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50"
                >
                  Source <Github aria-hidden="true" className="w-3 h-3" />
                </a>
                {'caseStudyUrl' in build && build.caseStudyUrl && (
                  <a
                    href={build.caseStudyUrl}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#252525] px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#777] hover:border-[#444] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50"
                  >
                    Case Study <FileText aria-hidden="true" className="w-3 h-3" />
                  </a>
                )}
                {'doiUrl' in build && build.doiUrl && (
                  <a
                    href={build.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#00BFFF]/25 bg-[#00BFFF]/5 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#00BFFF] hover:bg-[#00BFFF]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFFF]/50"
                  >
                    DOI <Award aria-hidden="true" className="w-3 h-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
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
          <div className="section-num mb-3">02 — About</div>
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
                He is a product leader focused on AI-native payments, merchant commerce infrastructure, Merchant of Record platforms, multi-rail orchestration, stablecoins, real-time rails, treasury automation, and intelligent financial systems.
              </p>
              <p className="text-[#777] leading-relaxed mb-5">
                Across Wipro, Deloitte, FIS, Worldpay, and Vantiv, he has led product, platform, and modernization initiatives across complex payment ecosystems — spanning merchant acquiring, issuing, payment gateways, settlement, reconciliation, cross-border payments, AI-enabled commerce, and regulated financial infrastructure.
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
          <div className="section-num mb-3">03 — Core Capabilities</div>
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
      metric: '20+',
      headline: 'Years in Payments',
      detail: 'Building and modernizing payment platforms across acquiring, gateways, banking, settlement, treasury, and AI-enabled commerce.',
    },
    {
      metric: '1.8M',
      headline: 'Clients Served by Integrated Platforms',
      detail: 'Led a complex banking integration spanning payment channels and digital applications serving 1.8 million clients.',
    },
    {
      metric: '30%',
      headline: 'Reduction in Manual Transaction Time',
      detail: 'Reduced manual transaction time through integrated payment-device and retail workflow modernization.',
    },
    {
      metric: '40%',
      headline: 'Reduction in Transaction Errors',
      detail: 'Reduced transaction errors through improved payment-device integration and operating workflows.',
    },
    {
      metric: String(TOTAL_PERSONAL_FINTECH_BUILDS),
      headline: 'Personal Fintech Builds',
      detail: 'Independently created prototypes spanning payment intelligence, agentic commerce, stablecoins, BNPL, routing, and merchant monitoring.',
    },
  ];
 
  return (
    <section id="impact" className="py-14 relative z-10 border-t border-[#1c1c1c] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-10">
          <div className="section-num mb-3">01 — Selected Impact</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white">Selected Impact</h2>
          <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4" />
          <p className="text-[#666] text-sm mt-5 max-w-3xl leading-relaxed">
            Quantified highlights from my professional experience and independently built fintech portfolio.
          </p>
        </div>
 
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#161616] border border-[#161616] rounded-xl overflow-hidden">
          {impacts.map((imp, i) => (
            <div
              key={imp.headline}
              className="reveal bg-[#0a0a0a] p-6 flex flex-col gap-3 group hover:bg-[#0e0e0e] transition-colors duration-200 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#39FF14]/0 via-[#39FF14]/25 to-[#39FF14]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-4xl font-black leading-none tabular-nums text-[#39FF14]">
                {imp.metric}
              </div>
              <div className="text-white font-black text-[11px] uppercase tracking-widest leading-snug">{imp.headline}</div>
              <div className="h-px w-6 bg-[#222] group-hover:w-10 group-hover:bg-[#39FF14]/30 transition-all duration-300" />
              <p className="text-[#555] text-xs leading-relaxed group-hover:text-[#666] transition-colors duration-200">{imp.detail}</p>
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
    <section id="experience" className="scroll-mt-16 py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-8">
          <div className="section-num mb-3">07 — Experience</div>
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
 
/* ─── INDUSTRY INTELLIGENCE TICKER ───────────────────────────────────────── */

// Curated headline snapshot. Update this array periodically to keep the portfolio current.
type IndustryHeadline = {
  category: string;
  title: string;
  source: string;
  date: string;
  url: string;
};

type IndustryHeadlineFeed = {
  updatedAt: string;
  headlines: IndustryHeadline[];
};

const FALLBACK_INDUSTRY_HEADLINES: IndustryHeadline[] = [
  {
    category: 'Payments',
    title: 'Payments leaders continue to reshape multi-rail commerce, stablecoin settlement and merchant infrastructure',
    source: 'Merchant Intelligence Monitor',
    date: 'Latest signals',
    url: 'https://avikcincy-sanju.github.io/Merchant-Intelligence-Edition/',
  },
  {
    category: 'Agentic Commerce',
    title: 'AI agents are moving from research concepts toward governed commerce and payment execution',
    source: 'Merchant Intelligence Monitor',
    date: 'Latest signals',
    url: 'https://avikcincy-sanju.github.io/Merchant-Intelligence-Edition/',
  },
  {
    category: 'Stablecoins',
    title: 'Institutional adoption is shifting attention from issuance toward acceptance, orchestration and controls',
    source: 'Merchant Intelligence Monitor',
    date: 'Latest signals',
    url: 'https://avikcincy-sanju.github.io/Merchant-Intelligence-Edition/',
  },
];

function formatHeadlineUpdate(value?: string) {
  if (!value) return 'Refresh pending';
  const updated = new Date(value);
  if (Number.isNaN(updated.getTime())) return 'Refresh pending';

  const diffMinutes = Math.max(0, Math.floor((Date.now() - updated.getTime()) / 60000));
  if (diffMinutes < 1) return 'Updated just now';
  if (diffMinutes < 60) return `Updated ${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `Updated ${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `Updated ${diffDays}d ago`;
  return `Updated ${updated.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
}

function IndustryIntelligenceTicker() {
  const [feed, setFeed] = useState<IndustryHeadlineFeed>({
    updatedAt: '',
    headlines: FALLBACK_INDUSTRY_HEADLINES,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${import.meta.env.BASE_URL}headlines.json`, {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Headline feed returned ${response.status}`);
        return response.json() as Promise<IndustryHeadlineFeed>;
      })
      .then((data) => {
        if (Array.isArray(data.headlines) && data.headlines.length > 0) {
          setFeed({ updatedAt: data.updatedAt, headlines: data.headlines.slice(0, 10) });
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.warn('Using fallback industry headlines.', error);
      });

    return () => controller.abort();
  }, []);

  const tickerItems = [...feed.headlines, ...feed.headlines];
  const updateLabel = formatHeadlineUpdate(feed.updatedAt);

  return (
    <section aria-label="Current payments and fintech industry headlines" className="relative z-10 overflow-hidden border-y border-[#1c1c1c] bg-[#080808]">
      <style>{`
        @keyframes industryTickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .industry-ticker-track { width: max-content; animation: industryTickerScroll 72s linear infinite; }
        .industry-ticker-shell:hover .industry-ticker-track,
        .industry-ticker-shell:focus-within .industry-ticker-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .industry-ticker-track { animation: none; transform: none; }
        }
      `}</style>

      <div className="industry-ticker-shell max-w-6xl mx-auto px-6 py-4 flex items-center gap-5">
        <div className="flex flex-shrink-0 items-center gap-3">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39FF14] opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#39FF14]" />
          </span>
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-[#39FF14]">Industry Intelligence</div>
            <div className="hidden text-[10px] uppercase tracking-[0.14em] text-[#555] sm:block">Personal Fintech Build 10 of 10 · {updateLabel}</div>
          </div>
        </div>

        <div className="hidden h-10 w-px flex-shrink-0 bg-[#222] sm:block" />

        <div className="min-w-0 flex-1 overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
          <div className="industry-ticker-track flex items-center whitespace-nowrap">
            {tickerItems.map((headline, index) => {
              const duplicate = index >= feed.headlines.length;
              return (
                <a
                  key={`${headline.title}-${index}`}
                  href={headline.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={duplicate ? -1 : 0}
                  aria-hidden={duplicate ? true : undefined}
                  className="group/headline mx-2 inline-flex items-center gap-3 rounded-lg border border-transparent px-4 py-2 hover:border-[#2a2a2a] hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50"
                >
                  <span className="rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#39FF14]/80">{headline.category}</span>
                  <span className="max-w-[560px] overflow-hidden text-ellipsis text-xs font-bold tracking-wide text-[#8a8a8a] transition-colors group-hover/headline:text-white">{headline.title}</span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#444]">{headline.source} · {headline.date}</span>
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-[#333] transition-colors group-hover/headline:text-[#39FF14]" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="hidden flex-shrink-0 items-center gap-2 lg:flex">
          <a href="https://avikcincy-sanju.github.io/Merchant-Intelligence-Edition/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-[#39FF14]/25 bg-[#39FF14]/5 px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#39FF14] hover:bg-[#39FF14]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50">
            Launch Monitor
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
          <a href="https://github.com/avikcincy-sanju/Merchant-Intelligence-Edition" target="_blank" rel="noopener noreferrer" aria-label="View Merchant Intelligence Monitor source code" className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#222] text-[#555] hover:border-[#444] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50">
            <Github aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="border-t border-[#151515] px-6 py-2 lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <span className="text-[9px] uppercase tracking-[0.14em] text-[#444]">Personal Build 10 of 10 · {updateLabel}</span>
          <a href="https://avikcincy-sanju.github.io/Merchant-Intelligence-Edition/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#39FF14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50 rounded-sm">
            Launch Monitor
            <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
 
/* ─── PROJECTS ──────────────────────────────────────────────────────────── */
 
function Projects() {
  return (
    <section id="projects" className="scroll-mt-16 py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-8">
          <div className="section-num mb-3">05 — Complete Product Portfolio</div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tight text-white">Explore All Fintech Builds</h2>
              <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4" />
            </div>
            <div className="rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#39FF14]">
              {TOTAL_PERSONAL_FINTECH_BUILDS} Personal Fintech Builds
            </div>
          </div>
          <p className="text-[#666] text-sm mt-5 max-w-3xl leading-relaxed">
            A broader portfolio of independently created fintech products spanning payment intelligence, agentic commerce, money movement, stablecoins, BNPL, routing, merchant monitoring, and product strategy. Nine are presented below; Merchant Intelligence is highlighted in Featured Live Builds and Industry Intelligence.
          </p>
        </div>
 
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1c1c1c]">
          {PROJECTS.map((p, i) => (
            <article
              key={p.title}
              className="reveal group bg-[#0a0a0a] p-6 flex flex-col transition-colors duration-200 hover:bg-[#111] border border-transparent hover:border-white"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="text-[#39FF14] group-hover:text-white transition-colors duration-200">{p.icon}</div>
                <div className="text-right">
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#39FF14]/70">Personal Build</div>
                  <div className="text-[9px] font-mono text-[#333] mt-1">{String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</div>
                </div>
              </div>
              <h3 className="text-sm font-black text-white mb-2 uppercase tracking-wide">{p.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed flex-1">{p.desc}</p>
              <div className="mt-4 border-l-2 border-[#39FF14]/30 pl-3">
                <div className="text-[9px] font-black uppercase tracking-[0.18em] text-[#39FF14]/70">Business Value</div>
                <p className="mt-1 text-xs leading-relaxed text-[#555]">{p.value}</p>
              </div>
              {p.meta && <p className="text-[#444] text-xs mt-3 font-mono leading-relaxed">{p.meta}</p>}
              <div className="flex flex-wrap gap-1.5 mt-5">
                {p.tags.map(t => <span key={t} className="badge badge-cyan text-[#666]">{t}</span>)}
              </div>

              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-[#1a1a1a]">
                {p.demoUrl && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#39FF14]/25 bg-[#39FF14]/5 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#39FF14] hover:bg-[#39FF14]/10"
                  >
                    Demo <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
                {p.sourceUrl && (
                  <a
                    href={p.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#252525] px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#777] hover:border-[#444] hover:text-white"
                  >
                    Source <Github className="w-3 h-3" />
                  </a>
                )}
                {p.caseStudyUrl && (
                  <a
                    href={p.caseStudyUrl}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#252525] px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#777] hover:border-[#444] hover:text-white"
                  >
                    Case Study <FileText className="w-3 h-3" />
                  </a>
                )}
                {p.doiUrl && (
                  <a
                    href={p.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#00BFFF]/25 bg-[#00BFFF]/5 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#00BFFF] hover:bg-[#00BFFF]/10"
                  >
                    DOI <Award className="w-3 h-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
 
/* ─── RESEARCH ──────────────────────────────────────────────────────────── */
 
function Research() {
  const [tab, setTab] = useState('ssrn');
  const [zenodoPapers, setZenodoPapers] = useState(ZENODO_PAPERS);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${import.meta.env.BASE_URL}zenodo-records.json`, { cache: 'no-store', signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Zenodo metadata returned ${response.status}`);
        return response.json() as Promise<{ records: typeof ZENODO_PAPERS }>;
      })
      .then((data) => {
        if (Array.isArray(data.records) && data.records.length > 0) setZenodoPapers(data.records);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.warn('Using embedded Zenodo metadata.', error);
      });
    return () => controller.abort();
  }, []);
 
  const tabs = [
    { id: 'ssrn', label: 'SSRN Papers' },
    { id: 'zenodo', label: 'Zenodo' },
    { id: 'medium', label: 'Medium' },
    { id: 'finextra', label: 'Finextra' },
    { id: 'other', label: 'Other' },
  ];
 
  return (
    <section id="research" className="scroll-mt-16 py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-8">
          <div className="section-num mb-3">09 — Research & Publications</div>
          <h2 className="text-5xl font-black uppercase tracking-tight text-white">Thought Leadership</h2>
          <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4" />
          <p className="text-[#555] text-sm mt-4">Academic papers, industry articles, and original research on AI payments & stablecoins</p>
        </div>
 
        {/* Stats */}
        <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#1c1c1c] mb-8">
          {[
            { val: String(SSRN_PAPERS.length), label: 'SSRN Papers', icon: <Microscope className="w-5 h-5 text-[#39FF14]" /> },
            { val: String(FINEXTRA_ARTICLES.length), label: 'Finextra Articles', icon: <Newspaper className="w-5 h-5 text-[#39FF14]" /> },
            { val: String(MEDIUM_ARTICLES.length), label: 'Medium Articles', icon: <FileText className="w-5 h-5 text-[#39FF14]" /> },
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
          <div role="tablist" aria-label="Research publication categories" className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                id={`research-tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                aria-controls={`research-panel-${t.id}`}
                className={`tab-btn ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
 
        {/* Content */}
        <div className="reveal" role="tabpanel" id={`research-panel-${tab}`} aria-labelledby={`research-tab-${tab}`}>
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
              {zenodoPapers.map((p, i) => (
                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="paper-card flex items-start gap-4 group">
                  <div className="badge badge-teal flex-shrink-0 mt-1">Zenodo</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white group-hover:text-[#39FF14] transition-colors text-sm">{p.title}</h3>
                    <div className="text-xs text-[#555] mt-1 uppercase tracking-wide">
                      {p.type ? `${p.type} · ` : ''}{p.year ? `${p.year} · ` : ''}Record: {p.record}
                    </div>
                    {p.doi && <div className="text-[10px] text-[#3f3f3f] mt-1 font-mono">DOI: {p.doi}</div>}
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
          <div className="section-num mb-3">04 — Product Vision</div>
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
    <section id="howiwork" className="scroll-mt-16 py-14 relative z-10 border-t border-[#1c1c1c]">
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
  const [activeCaseStudy, setActiveCaseStudy] = useState<(typeof CASE_STUDIES)[number] | null>(null);

  useEffect(() => {
    if (!activeCaseStudy) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveCaseStudy(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCaseStudy]);

  return (
    <section id="casestudies" className="py-14 relative z-10 border-t border-[#1c1c1c] scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-10">
          <div className="section-num mb-3">06 — Case Studies</div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">Featured Case Studies</h2>
          <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4 mb-6" />
          <p className="text-[#777] text-sm max-w-3xl leading-relaxed">Sanitized product and architecture case studies showing the problem, design approach, capabilities, business value, and my role—without client-specific or confidential information.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {CASE_STUDIES.map((caseStudy, index) => {
            const accent = index % 2 === 0 ? '#39FF14' : '#00BFFF';
            const accentRgb = index % 2 === 0 ? '57,255,20' : '0,191,255';

            return (
              <article id={`case-study-${caseStudy.id}`} key={caseStudy.id} className="reveal scroll-mt-24 group relative bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl overflow-hidden hover:border-[#39FF14]/25 transition-all duration-300">
                <div className="relative h-44 overflow-hidden">
                  <img src={caseStudy.image} alt="" loading="lazy" className="w-full h-full object-cover opacity-45 group-hover:opacity-60 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/70 to-transparent" />
                  <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(ellipse at 70% 30%, rgba(${accentRgb},0.45), transparent 60%)` }} />
                </div>

                <div className="p-6">
                  <span className="inline-flex text-[9px] font-black uppercase tracking-[0.3em] px-2.5 py-1 rounded-full border mb-4" style={{ color: accent, borderColor: `rgba(${accentRgb},0.3)`, backgroundColor: `rgba(${accentRgb},0.06)` }}>{caseStudy.num} — Case Study</span>
                  <h3 className="text-white text-base font-black uppercase tracking-wide leading-snug mb-3">{caseStudy.title}</h3>
                  <p className="text-[#777] text-sm leading-relaxed mb-5">{caseStudy.positioning}</p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {caseStudy.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-full border border-[#222] text-[#666] font-medium tracking-wide">{tag}</span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveCaseStudy(caseStudy)}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50"
                    style={{ color: accent }}
                  >
                    Read Full Case Study
                    <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {activeCaseStudy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveCaseStudy(null); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="case-study-dialog-title" className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-[#252525] bg-[#0b0b0b] shadow-2xl shadow-black/70">
            <button type="button" onClick={() => setActiveCaseStudy(null)} aria-label="Close case study" className="sticky top-4 z-20 ml-auto mr-4 mt-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#111] text-[#777] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50">
              <X aria-hidden="true" className="h-4 w-4" />
            </button>

            <div className="px-6 pb-10 sm:px-10">
              <div className="max-w-4xl">
                <div className="text-[10px] font-black uppercase tracking-[0.28em] text-[#39FF14] mb-3">{activeCaseStudy.category}</div>
                <h3 id="case-study-dialog-title" className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-5">{activeCaseStudy.title}</h3>
                <p className="text-[#999] leading-relaxed mb-8">{activeCaseStudy.positioning}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-5 mb-5">
                <div className="rounded-xl border border-[#1d1d1d] bg-[#090909] p-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.22em] text-[#39FF14] mb-3">The Problem</h4>
                  <p className="text-sm leading-relaxed text-[#777]">{activeCaseStudy.challenge}</p>
                </div>
                <div className="rounded-xl border border-[#1d1d1d] bg-[#090909] p-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.22em] text-[#00BFFF] mb-3">What I Designed</h4>
                  <p className="text-sm leading-relaxed text-[#777]">{activeCaseStudy.builtIntro}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-5 mb-5">
                <div className="rounded-xl border border-[#1d1d1d] bg-[#090909] p-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.22em] text-[#39FF14] mb-4">Core Capabilities</h4>
                  <ul className="space-y-2">
                    {activeCaseStudy.builtCapabilities.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-[#777]"><ChevronRight aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#39FF14]" />{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-[#1d1d1d] bg-[#090909] p-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.22em] text-[#00BFFF] mb-3">Product Questions Addressed</h4>
                  <p className="text-sm leading-relaxed text-[#666] mb-4">{activeCaseStudy.thinkingIntro}</p>
                  <ul className="space-y-2">
                    {activeCaseStudy.thinkingQuestions.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-[#777]"><CircleDot aria-hidden="true" className="mt-1 h-3 w-3 flex-shrink-0 text-[#00BFFF]" />{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-[#1d1d1d] bg-[#090909] p-6 mb-5">
                <h4 className="text-xs font-black uppercase tracking-[0.22em] text-[#39FF14] mb-4">Architecture Flow</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {activeCaseStudy.flow.map((stage) => (
                    <div key={stage.label} className="rounded-lg border border-[#1c1c1c] bg-[#0c0c0c] p-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white mb-3">{stage.label}</div>
                      <div className="space-y-2">
                        {stage.nodes.map((node) => (
                          <div key={node.label} className="flex items-center gap-2 text-xs text-[#666]"><node.Icon aria-hidden="true" className="h-4 w-4 text-[#39FF14]" />{node.label}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-5">
                <div className="rounded-xl border border-[#1d1d1d] bg-[#090909] p-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.22em] text-[#39FF14] mb-3">Business Value</h4>
                  <p className="text-sm leading-relaxed text-[#777]">{activeCaseStudy.value}</p>
                </div>
                <div className="rounded-xl border border-[#1d1d1d] bg-[#090909] p-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.22em] text-[#00BFFF] mb-3">My Role</h4>
                  <p className="text-sm leading-relaxed text-[#777]">{activeCaseStudy.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
 
/* ─── BEYOND WORK ───────────────────────────────────────────────────────── */
 
function BeyondWork() {
  const features = [
    {
      Icon: Globe,
      title: 'Local Airspace',
      desc: 'Scan nearby aircraft using a postal / ZIP code or latitude and longitude.',
    },
    {
      Icon: Search,
      title: 'Aircraft Intelligence',
      desc: 'Search and filter commercial, private, climbing, descending, level, or grounded traffic.',
    },
    {
      Icon: BarChart3,
      title: 'Session Analytics',
      desc: 'Track aircraft activity, closest passes, altitude, operators, and exportable session data.',
    },
  ];
 
  return (
    <section id="beyondwork" className="py-14 relative z-10 border-t border-[#1c1c1c]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-10">
          <div className="section-num mb-3">10 — Beyond Work</div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Aviation & Flight Tracking
          </h2>
          <div className="h-[2px] w-20 bg-[#39FF14] rounded-full mt-4" />
          <p className="text-[#666] text-sm mt-5 max-w-3xl leading-relaxed">
            Outside financial technology, I am an aviation enthusiast who enjoys exploring aircraft,
            routes, radar data, and the systems that keep global airspace moving.
          </p>
        </div>
 
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          <div className="reveal glass-card p-8 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl border border-[#39FF14]/20 bg-[#0a1a0a] flex items-center justify-center">
                <Plane className="w-7 h-7 text-[#39FF14]" />
              </div>
              <div>
                <div className="text-[10px] font-black text-[#39FF14] uppercase tracking-[0.3em] mb-1">
                  Personal Build
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-wide">AIRSPACE</h3>
              </div>
            </div>
 
            <p className="text-[#888] text-sm leading-relaxed mb-7">
              I built AIRSPACE as a live aviation command center for scanning nearby aircraft,
              inspecting radar targets and flight strips, filtering traffic, monitoring feed health,
              maintaining watchlists, and reviewing session analytics.
            </p>
 
            <div className="space-y-3 mb-7">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3 rounded-lg border border-[#1a1a1a] bg-[#090909] p-4">
                  <feature.Icon className="w-5 h-5 text-[#39FF14] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-black text-white uppercase tracking-wide mb-1">{feature.title}</div>
                    <p className="text-xs text-[#666] leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
 
            <div className="flex flex-wrap gap-2 mt-auto">
              {['Aviation', 'Live Radar', 'Flight Data', 'Personal Project'].map((tag) => (
                <span key={tag} className="badge badge-cyan text-[#666]">{tag}</span>
              ))}
            </div>
          </div>
 
          <a
            href="https://avikcincy-sanju.github.io/aviation/"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal group relative overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#080808] p-8 hover:border-[#39FF14]/40 transition-all duration-300 flex flex-col min-h-[440px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/[0.055] via-transparent to-[#00BFFF]/[0.055]" />
            <div className="absolute inset-0 grid-bg opacity-25" />
 
            <div className="relative z-10 flex items-center justify-between mb-10">
              <div>
                <div className="text-[10px] text-[#555] font-black uppercase tracking-[0.3em]">Live Aviation Command Center</div>
                <div className="text-3xl font-black text-white tracking-tight mt-2">AIRSPACE</div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                <span className="text-[10px] font-black text-[#39FF14] uppercase tracking-widest">Ready</span>
              </div>
            </div>
 
            <div className="relative z-10 flex-1 flex items-center justify-center py-6">
              <div className="relative w-52 h-52 rounded-full border border-[#39FF14]/20 flex items-center justify-center">
                <div className="absolute inset-5 rounded-full border border-[#39FF14]/10" />
                <div className="absolute inset-12 rounded-full border border-[#39FF14]/10" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#39FF14]/10" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#39FF14]/10" />
                <div className="absolute left-1/2 top-1/2 w-[48%] h-px origin-left -rotate-45 bg-gradient-to-r from-[#39FF14]/70 to-transparent" />
                <Plane className="w-12 h-12 text-[#39FF14] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300" />
              </div>
            </div>
 
            <div className="relative z-10 grid grid-cols-3 gap-px bg-[#1a1a1a] border border-[#1a1a1a] mb-7">
              {[
                { label: 'Radar', value: 'Live' },
                { label: 'Flights', value: 'Track' },
                { label: 'Alerts', value: 'Watch' },
              ].map((item) => (
                <div key={item.label} className="bg-[#090909] py-4 text-center">
                  <div className="text-sm font-black text-white uppercase">{item.value}</div>
                  <div className="text-[9px] text-[#555] uppercase tracking-widest mt-1">{item.label}</div>
                </div>
              ))}
            </div>
 
            <div className="relative z-10 flex items-center justify-between border-t border-[#1a1a1a] pt-5">
              <span className="text-xs font-black text-white uppercase tracking-[0.18em] group-hover:text-[#39FF14] transition-colors">
                Launch Flight Scanner
              </span>
              <ArrowUpRight className="w-5 h-5 text-[#444] group-hover:text-[#39FF14] transition-colors" />
            </div>
          </a>
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
          <div className="section-num mb-3">11 — Contact</div>
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
              { icon: <FileText className="w-5 h-5 text-[#39FF14]" />, label: 'Medium', sub: `${MEDIUM_ARTICLES.length} Articles`, url: 'https://medium.com/@avikcincy' },
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
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[#39FF14] font-black text-xl tracking-widest uppercase">AN</span>
          <div className="text-center">
            <p className="text-[#444] text-xs uppercase tracking-[0.2em]">© 2026 Avik Nandi</p>
            <p className="text-[#333] text-xs uppercase tracking-[0.15em] mt-1">Product Leader — Payments, AI & Merchant Platforms · Researcher · Author</p>
          </div>
          <div className="w-8" />
        </div>

        <p className="mx-auto mt-7 max-w-4xl border-t border-[#171717] pt-5 text-center text-[10px] leading-relaxed tracking-wide text-[#3f3f3f]">
          Views and projects presented here are personal and independent. Product demonstrations use public, synthetic, or illustrative data and do not represent confidential client or employer systems.
        </p>
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
        <FeaturedBuilds />
        <SelectedImpact />
        <About />
        <CoreCapabilities />
        <ProductVision />
        <Projects />
        <IndustryIntelligenceTicker />
        <CaseStudies />
        <Experience />
        <HowIWork />
        <Research />
        <BeyondWork />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
