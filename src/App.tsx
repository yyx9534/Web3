import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowLeft, 
  ExternalLink, 
  Building2, 
  Film, 
  Palette, 
  Cpu, 
  CheckCircle2, 
  Mail, 
  Globe2, 
  ArrowUpRight,
  Search,
  Heart,
  Camera,
  Code2,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Layers
} from "lucide-react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/src/lib/utils";

// --- SEO & Data Models ---

export interface CaseStudy {
  id: string;
  title: string;
  clientCategory: string;
  serviceId: string;
  serviceName: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  outcome: string;
  image: string;
  tag: string;
}

export interface ServiceDefinition {
  id: string;
  number: string;
  title: string;
  chineseTitle: string;
  seoBadge: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  tagline: string;
  desc: string;
  longOverview: string;
  icon: typeof Building2;
  heroImage: string;
  secondaryImage: string;
  scopeList: { title: string; desc: string; keywords?: string }[];
  methodologySteps: { step: string; title: string; desc: string }[];
  externalUrl?: {
    label: string;
    description: string;
    url: string;
  };
  metrics: { value: string; label: string }[];
  faqs: { q: string; a: string }[];
}

export interface SEOPillar {
  id: string;
  serviceId: string;
  category: string;
  chineseTitle: string;
  englishTitle: string;
  tagline: string;
  keywords: string[];
  description: string;
  highlights: string[];
}

export const SEO_PILLARS: SEOPillar[] = [
  {
    id: "wedding-videography",
    serviceId: "creative-agency",
    category: "婚礼拍摄",
    chineseTitle: "婚礼拍摄与欧洲纪实微电影",
    englishTitle: "Destination Wedding Videography & Photography",
    tagline: "阿姆斯特丹运河、欧洲历史古堡与庄园奢华婚礼跟拍",
    keywords: [
      "婚礼拍摄", "荷兰婚礼拍摄", "欧洲婚礼跟拍", "阿姆斯特丹婚礼摄影", 
      "海外目的地婚礼", "古堡婚礼摄制", "婚礼纪实微电影", "双机位4K拍摄", "航拍特批", "Wedding Videography Amsterdam"
    ],
    description: "YEAH Films 提供欧洲与荷兰顶级目的地婚礼电影摄制。由院线级摄影指导掌镜，配置 ARRI/RED 电影机与航拍设备，提供多语种现场统筹、48小时先导片与院线级4K长片交付。",
    highlights: ["4K双机位电影级纪实", "荷兰民航局特批航拍", "48小时先导预告片极速交付", "中英荷三语现场摄制统筹"]
  },
  {
    id: "commercial-shoots",
    serviceId: "creative-agency",
    category: "商业拍摄",
    chineseTitle: "商业拍摄与品牌广告大片",
    englishTitle: "Commercial Film, TVC & Visual Campaigns",
    tagline: "院线级商业广告片、时尚品牌视觉、高端产品视频与商业静物摄影",
    keywords: [
      "商业拍摄", "商业广告片拍摄", "荷兰商业摄制", "TVC广告制作", 
      "品牌宣传片", "欧洲摄制组", "产品视效拍摄", "Commercial Video Amsterdam"
    ],
    description: "专为出海企业及国际品牌打造具备全球传播力的商业广告大片。涵盖策划脚本分镜、欧洲外景勘景、双语摄制组统筹与达芬奇电影级调色。",
    highlights: ["电影级商业TVC广告片", "欧洲外景地深度踩点与勘景", "高规格产品静物视效", "跨国多渠道全格式宣发交付"]
  },
  {
    id: "corporate-films",
    serviceId: "creative-agency",
    category: "企业拍摄",
    chineseTitle: "企业拍摄与高管全球形象片",
    englishTitle: "Corporate Documentaries & Executive Keynotes",
    tagline: "跨国企业全球形象宣传片、欧洲行业峰会纪录、上市公司财报专访",
    keywords: [
      "企业拍摄", "企业宣传片拍摄", "高管专访纪实", "欧洲峰会摄制", 
      "世界法学展视听", "展会多媒体展项", "上市企业宣发", "Corporate Film Europe"
    ],
    description: "服务全球上市企业、跨国律所及行业协会，以纪录片级别视听语言展现企业格局与思想领袖对话，提升机构公信力与全球投资者好感度。",
    highlights: ["上市企业全球形象宣传片", "CEO及高管思想领袖深度专访", "欧洲大型会展多媒体视听工程", "企业多语言财报宣讲片"]
  },
  {
    id: "dutch-company-formation",
    serviceId: "business-consulting",
    category: "荷兰企业注册",
    chineseTitle: "荷兰企业注册与合规出海设立",
    englishTitle: "Dutch BV Formation, KvK & Corporate Landing",
    tagline: "荷兰商会KvK建档、公证处章程公证、税号申报、银行开户与高技术移民",
    keywords: [
      "荷兰企业注册", "荷兰公司注册", "荷兰公司设立", "荷兰BV注册", 
      "荷兰商会KvK", "荷兰税号BTW申请", "荷兰银行开户", "高技术移民IND", "30% Ruling减税"
    ],
    description: "荷兰阿姆斯特丹本土全流程交钥匙商业咨询：4-6周完成荷兰BV公司设立，无缝搞定公证处、税务局税号、商业银行反洗钱审核及高管居留落地。",
    highlights: ["荷兰BV极速设立与公证", "KvK与税务局BTW/CIT税号直办", "欧洲商业银行合规开户穿透", "IND高技术移民担保人资质与30%减税"]
  },
  {
    id: "software-development",
    serviceId: "custom-it-services",
    category: "软件开发",
    chineseTitle: "定制软件开发与数字化出海系统",
    englishTitle: "Custom Software Development & Enterprise IT",
    tagline: "企业级定制ERP/CRM、跨国出海Web/App系统、GDPR数据合规与云架构",
    keywords: [
      "软件开发", "定制软件开发", "欧洲IT外包", "阿姆斯特丹软件研发", 
      "跨国系统研发", "出海App开发", "GDPR数据合规", "微服务架构", "企业AI系统集成"
    ],
    description: "专为跨国贸易、出海企业及数字机构研发高可用软件系统。保障亚欧多区域数据毫秒级实时同步，100% 符合欧洲 GDPR 数据合规与企业级安全。",
    highlights: ["跨国定制全栈Web与移动端开发", "跨欧亚多区域数据库实时秒级同步", "严格遵循欧盟GDPR数据合规", "企业私有化AI业务流与微服务架构"]
  },
  {
    id: "asian-art-gallery",
    serviceId: "fine-art",
    category: "亚洲艺术家画廊",
    chineseTitle: "亚洲艺术家画廊与欧洲国际策展",
    englishTitle: "Asian Contemporary Art Gallery & Curatorial Exchange",
    tagline: "阿姆斯特丹亚洲现当代艺术家画廊空间、国际学术特展、艺术家驻留项目",
    keywords: [
      "亚洲艺术家画廊", "荷兰画廊", "阿姆斯特丹当代艺术展", "艺术策展", 
      "艺术家驻留计划", "欧洲美术馆收藏", "东亚当代艺术", "Asian Art Gallery Amsterdam"
    ],
    description: "立足阿姆斯特丹文化核心地带，搭建亚洲与欧洲顶级艺术生态对话桥梁。常设亚洲现当代艺术家精选展览，协助作品进入欧洲美术馆馆藏及顶级藏家视野。",
    highlights: ["阿姆斯特丹独立画廊展厅与常设展", "联合欧洲知名美术馆策展", "欧亚艺术家阿姆斯特丹驻留计划", "欧洲机构馆藏推荐与学术出版"]
  }
];

export const SERVICES: ServiceDefinition[] = [
  { 
    id: "business-consulting",
    number: "01",
    title: "Market Entry & Business Consulting",
    chineseTitle: "市场准入与商业咨询（荷兰企业注册 · 公司设立 · 商务出海）",
    seoBadge: "荷兰企业注册 · 荷兰公司设立 · 商务合规",
    seoTitle: "荷兰企业注册 · 荷兰公司设立与商务咨询 | YEAH Business Consulting Netherlands",
    seoDescription: "专业办理荷兰企业注册、荷兰BV公司设立、荷兰商会KvK建档、荷兰税号BTW申请、商业银行开户及高技术移民IND资质。4-6周交钥匙交付。",
    keywords: [
      "荷兰企业注册", "荷兰公司注册", "荷兰公司设立", "荷兰BV注册", 
      "荷兰商会KvK", "荷兰企业税号", "荷兰银行开户", "荷兰高技术移民", 
      "30% ruling", "荷兰外资企业设立", "荷兰商务咨询", "Dutch Company Formation"
    ],
    tagline: "Corporate landing, Dutch BV incorporation & cross-border European expansion.",
    desc: "End-to-end advisory for international companies establishing operations in the Netherlands — from legal entity registration and tax structuring to executive mobility and banking setup.",
    longOverview: "Entering the European single market via the Netherlands offers unmatched tax treaties, logistics hubs, and regulatory stability. YEAH acts as your on-the-ground operational general contractor in Amsterdam. We eliminate bureaucratic bottlenecks and provide turn-key corporate execution so foreign leadership can focus strictly on commercial scale.",
    icon: Building2,
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1974&auto=format&fit=crop",
    externalUrl: {
      label: "View Dedicated Market Entry Dossier",
      description: "Access our comprehensive presentation on Dutch BV setup, tax regimes, and foreign enterprise landing.",
      url: "https://yeah-business-amsterdam-m6sjyle.gamma.site/yeah-en"
    },
    metrics: [
      { value: "100%", label: "Compliance & Regulatory Track Record" },
      { value: "4-6 Wks", label: "Average Turnkey BV Incorporation" },
      { value: "EU-Wide", label: "Market Mobility & Direct Banking Access" }
    ],
    scopeList: [
      {
        title: "荷兰企业注册与商会建档 (Dutch BV Incorporation & Chamber of Commerce KvK)",
        desc: "公司章程起草、荷兰公证处 (Civil-Law Notary) 协同、KvK商会正式登记以及公司法人治理架构确立。"
      },
      {
        title: "税号申请与荷兰税务局合规 (Tax Structuring & Dutch Belastingdienst Setup)",
        desc: "增值税号 (BTW/VAT)、企业所得税号 (CIT)、欧盟海关EORI清关号申报，以及符合条件的30% Ruling减税咨询。"
      },
      {
        title: "商业银行合规开户 (Commercial Banking & Financial Rails)",
        desc: "穿透欧洲严苛的反洗钱 (AML) 与KYC合规审核，顺利开设荷兰主流商业银行账户及多币种国际清算通道。"
      },
      {
        title: "高技术移民与管理层工签 (Corporate Immigration & Executive Relocation)",
        desc: "荷兰移民局 (IND) 保荐人资质 (Recognized Sponsor) 申请、高技术移民 (Kennismigrant) 居留及高管家庭移居服务。"
      },
      {
        title: "阿姆斯特丹办公落地与实体运营 (Amsterdam Landing & Local Operations)",
        desc: "阿姆斯特丹核心商务区（Zuidas）办公选址租赁、本地劳动合同合规本地化以及日常财税簿记托管。"
      }
    ],
    methodologySteps: [
      {
        step: "01",
        title: "架构规划与法律论证 (Entity & Tax Blueprinting)",
        desc: "分析母公司跨境税务协定、合规要求与业务模式，设计最具税收效益与抗风险能力的荷兰BV架构。"
      },
      {
        step: "02",
        title: "公证签署与商会注册 (Notarial Execution & Banking)",
        desc: "对接资深荷兰公证人完成公证文件签署，获取荷兰商会KvK官方注册号与公司全套法定文件。"
      },
      {
        step: "03",
        title: "税号获批与银行开户 (Tax Filings & Banking Setup)",
        desc: "向荷兰税务局提交BTW和所得税申报申请，配合商业银行进行背景穿透尽调并开通支付通道。"
      },
      {
        step: "04",
        title: "人员居留与交钥匙运营 (Immigration & Operational Handover)",
        desc: "完成IND高技术移民审批，办理市政厅BSN税号登记，交付即刻可运营的完整荷兰商业实体。"
      }
    ],
    faqs: [
      {
        q: "在荷兰注册一家BV公司的标准周期是多久？需要本人必须前往荷兰吗？",
        a: "在准备好母公司主体公证双认证（或海牙认证）文件的前提下，通过公证授权委托书，企业法人与股东无需亲自前往荷兰即可由公证处远程完成设立。从公证建档、商会KvK设立到税务局税号下发，通常耗时4至6周即可实现交钥匙交付。"
      },
      {
        q: "荷兰企业设立后，如何申请高技术移民（Kennismigrant）及30% Ruling减税政策？",
        a: "新注册的荷兰实体需先向荷兰移民局（IND）申请成为“公认赞助人（Recognized Sponsor）”。获批后，公司可直接为从海外引进的合格高管或核心技术人员申请高技术移民工作许可。同时，符合特定稀缺技术与薪酬标准的海外员工，可向荷兰税务局申请前5年最高30%所得税免税额度。"
      },
      {
        q: "开设荷兰商业银行账户的难点是什么？YEAH如何保障开户成功率？",
        a: "受欧盟严苛的反洗钱（AML）及非本土实益拥有人（UBO）穿透监管影响，外资背景企业在欧洲开行账户审查极其严格。YEAH协助企业梳理详实的商业计划书、上下游交易凭证与合规股权穿透报告，直接与荷兰具备深厚合作基础的商业银行对公经理对接，规避被拒风险。"
      }
    ]
  },
  { 
    id: "creative-agency",
    number: "02",
    title: "Video Production House", 
    chineseTitle: "影视制作工坊（婚礼拍摄 · 商业拍摄 · 企业拍摄）",
    seoBadge: "婚礼拍摄 · 商业广告拍摄 · 企业宣传片",
    seoTitle: "商业拍摄 · 婚礼拍摄 · 企业宣传片制作 | YEAH Video Production Amsterdam",
    seoDescription: "阿姆斯特丹电影级影视制作团队：专注欧洲目的地婚礼跟拍与纪实微电影、品牌商业广告大片(TVC)、上市企业形象宣传片与高管专访。配备ARRI/RED电影机组与特批航拍。",
    keywords: [
      "婚礼拍摄", "荷兰婚礼拍摄", "欧洲婚礼跟拍", "商业拍摄", 
      "商业广告片拍摄", "企业拍摄", "企业宣传片", "TVC广告制作", 
      "阿姆斯特丹视频制作", "欧洲摄制组", "婚纱微电影", "Corporate Film Amsterdam"
    ],
    tagline: "High-end television commercials, corporate documentaries & broadcast media.",
    desc: "A dedicated production label crafting cinematic media assets — from prime-time television and reality shows to global corporate keynote films and exhibition documentaries.",
    longOverview: "YEAH Creative operates as a premier full-service video production house based in Amsterdam. We bridge commercial precision with international film-grade cinematography. From conceptual scriptwriting and multi-camera studio/location shoots to high-end DI color grading and multi-language post-production, we deliver media that commands institutional respect.",
    icon: Film,
    heroImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop",
    metrics: [
      { value: "4K / 6K", label: "Cinema Standard Camera Packages" },
      { value: "10+", label: "International Episodes in Pipeline" },
      { value: "Full-Cycle", label: "Pre-Production to Broadcast Delivery" }
    ],
    scopeList: [
      {
        title: "高端婚礼拍摄与纪实微电影 (Cinematic Destination Wedding Films)",
        desc: "欧洲古堡、阿姆斯特丹运河与海外目的地奢华婚礼摄制，电影级画质、官方特批航拍与多机位4K纪实跟拍。"
      },
      {
        title: "商业拍摄与品牌广告大片 (Commercial Video Production & TVC)",
        desc: "院线级商业广告片、时尚品牌视觉、高端产品视频摄制、商业静物摄影以及跨国多渠道全格式宣发素材。"
      },
      {
        title: "企业宣传片与高管专访 (Corporate Documentaries & Executive Keynotes)",
        desc: "跨国企业全球品牌形象片、上市公司财报会议大片、海外峰会/展会现场纪实以及CEO思想领袖深度纪录。"
      },
      {
        title: "大型电视真人秀与节目摄制 (Broadcast Television & Reality Series)",
        desc: "全流程现场多机位广播级拍摄系统、欧洲实景真人秀联合摄制、叙事剧本导演统筹与高频快速剪辑。"
      },
      {
        title: "会展多媒体视听工程与艺术纪录片 (Exhibition Media & Installations)",
        desc: "全球大型展会全景环幕与巨幕LED交互视听展项、世界法学展多媒体视听套件与艺术机构专题文献片。"
      },
      {
        title: "电影级后期调色与声音设计 (Cinema Post-Production, DaVinci & Sound)",
        desc: "达芬奇 (DaVinci Resolve) 电影级调色、杜比环绕声效混音、特效包装设计与中英荷多语言本地化字幕制作。"
      }
    ],
    methodologySteps: [
      {
        step: "01",
        title: "创意策划与分镜分工 (Script Treatment & Storyboarding)",
        desc: "将商业诉求或婚礼纪实核心转化为精准镜头脚本、视觉调色基调以及欧洲取景勘景计划。"
      },
      {
        step: "02",
        title: "现场执导与多机位摄制 (Cinematography & Rigging)",
        desc: "配置 ARRI / RED / Sony Cine 电影级主机套件、专业灯光与无线收音系统，中英荷双语现场高效统筹调度。"
      },
      {
        step: "03",
        title: "精剪剪辑与电影级调色 (Editorial & DaVinci Mastering)",
        desc: "情绪节奏剪辑、专业达芬奇色彩科学调色、杜比空间音效制作及定制音乐声学配乐。"
      },
      {
        step: "04",
        title: "广播级与多格式交付 (Multi-Format Delivery)",
        desc: "提供院线 DCP、主流电视台广播标准母带、4K 超清档案以及社交媒体短视频垂直剪裁包。"
      }
    ],
    faqs: [
      {
        q: "在荷兰及欧洲进行婚礼拍摄，服务流程与交付内容包括哪些？",
        a: "我们为欧洲及海外目的地婚礼提供一站式影视摄制：包括婚前视觉沟通与分镜脚本、欧洲外景地（如阿姆斯特丹运河游船、赞丹风车村、古堡庄园）踩点、婚礼当天双机位或三机位4K超清电影机全程跟拍、取得民航许可的合法专业航拍。通常在婚礼结束后48小时内提供社交媒体先导预告片，4-6周内交付精剪调色的电影级长片及全套原始高清纪实素材。"
      },
      {
        q: "企业拍摄与商业广告片（TVC）支持跨欧洲多城市执行吗？团队语言如何配合？",
        a: "是的，我们的影视制作组常驻阿姆斯特丹，可敏捷辐射巴黎、法兰克福、伦敦、布鲁塞尔等欧洲主要枢纽。摄制组核心成员均具备中英荷三语工作能力，可无缝协调国内品牌方领导、海外欧洲外籍演员与欧洲当地场地许可部门，免去跨国沟通成本。"
      },
      {
        q: "商业拍摄使用的摄制设备和画质标准是什么？",
        a: "我们自有及合作设备库采用业内顶级的院线级电影机（如 ARRI Alexa Mini LF、RED V-Raptor、Sony FX6/FX9），搭配蔡司电影定焦镜头组、专业级无线跟焦系统、Aputure专业影视灯光与森海塞尔高保真无线录音套件，确保每一帧画面均达院线级与国际主流电视网播出水准。"
      }
    ]
  },
  { 
    id: "fine-art",
    number: "03",
    title: "Fine Art & Cultural Exchange", 
    chineseTitle: "当代艺术与文化交流（亚洲艺术家画廊 · 国际策展 · 艺术驻留）",
    seoBadge: "亚洲艺术家画廊 · 国际艺术策展 · 驻留交流",
    seoTitle: "亚洲艺术家画廊 · 当代艺术策展与欧亚交流 | YEAH Art Gallery Amsterdam",
    seoDescription: "阿姆斯特丹专属亚洲现当代艺术家画廊空间：定期举办高水准学术展览、欧亚艺术家驻留计划、欧洲顶尖美术馆与双年展策展对接、艺术藏家推介与学术画册出版。",
    keywords: [
      "亚洲艺术家画廊", "荷兰画廊", "阿姆斯特丹当代艺术展", "艺术策展", 
      "艺术家驻留计划", "欧洲美术馆收藏", "东亚当代艺术", "当代艺术画廊", 
      "阿姆斯特丹艺术展", "Asian Art Gallery Amsterdam", "Curatorial Practice Europe"
    ],
    tagline: "Connecting international artists, Asian talent networks & European curatorial platforms.",
    desc: "Facilitating international art exchange by representing top Asian contemporary artists, curating institutional exhibitions in Amsterdam, and bridging global collectors with European institutions.",
    longOverview: "Amsterdam is historically Europe's cultural epicenter. YEAH Fine Art leverages an extensive established network of prominent and emerging East Asian contemporary artists, bringing their visionary practices to European galleries, art fairs, and museums. We provide curatorial direction, artist residency facilitation, catalog publishing, and cross-border art logistics.",
    icon: Palette,
    heroImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2090&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop",
    metrics: [
      { value: "5,000+", label: "Exhibition Visitors per Signature Show" },
      { value: "20+", label: "International Artists Supported in EU" },
      { value: "Cross-Border", label: "Amsterdam to East Asia Cultural Bridge" }
    ],
    scopeList: [
      {
        title: "亚洲现当代艺术家画廊空间运营 (Asian Contemporary Artist Gallery Amsterdam)",
        desc: "位于阿姆斯特丹的专属艺术画廊空间，常年举办具有学术高度的亚洲现当代艺术家个展与联展。"
      },
      {
        title: "国际美术馆策展与双年展合作 (Curatorial Direction & Museum Exhibitions)",
        desc: "联合欧洲主流美术馆与策展机构，构筑欧亚跨文化学术语境，策划高水准当代艺术专题大展。"
      },
      {
        title: "欧亚艺术家阿姆斯特丹驻留计划 (Trans-Eurasian Artist Residencies)",
        desc: "提供阿姆斯特丹核心区独立工作室空间、荷兰文化交流签证协助、学术交流访问与驻留创作成果推广。"
      },
      {
        title: "欧洲机构馆藏推荐与藏家咨询 (Institutional Acquisitions & Collector Advisory)",
        desc: "协助亚洲杰出艺术家作品进入欧洲国立美术馆永久馆藏、知名基金会及国际高净值藏家收藏系统。"
      },
      {
        title: "博物馆级艺术品跨境物流与出版 (Museum-Grade Fine Art Transit & Publishing)",
        desc: "提供国际温控保税艺术品运输、专业海关报关、中英荷三语精装学术画册出版发行与国际媒体宣发。"
      }
    ],
    methodologySteps: [
      {
        step: "01",
        title: "策展构想与学术甄选 (Curatorial Thesis & Artist Selection)",
        desc: "深度挖掘东亚当代艺术创作脉络与欧洲当代艺术话语的交汇点，确立具备国际前瞻性的学术策展主题。"
      },
      {
        step: "02",
        title: "驻留创作与学术支持 (Residency & Creation Management)",
        desc: "为入选艺术家办理荷兰文化交流居留许可，协调阿姆斯特丹工作室空间，协助在地材料采购与学术交流。"
      },
      {
        step: "03",
        title: "展陈空间设计与开幕宣发 (Exhibition Scenography & Opening)",
        desc: "阿姆斯特丹展厅空间建筑与灯光工程规划、国际艺术媒体专访发布、VIP藏家预览及学术研讨会。"
      },
      {
        step: "04",
        title: "机构永久馆藏与文献归档 (Permanent Placement & Archiving)",
        desc: "协助国际艺术史学者开展文献批评写作，推动作品被欧洲重要美术馆收藏并建立长久学术声誉。"
      }
    ],
    faqs: [
      {
        q: "YEAH在阿姆斯特丹的亚洲艺术家画廊空间如何支持中国及亚洲当代艺术家？",
        a: "画廊为亚洲艺术家提供全方位的欧洲落地展示平台：从阿姆斯特丹黄金地段的展览空间、学术策展前言撰写、多语言国际艺术媒体发布，到邀请荷兰及欧洲当地知名策展人、评论家与画廊主出席开幕研讨，全面提升艺术家在欧洲艺术圈的知晓度与学术声望。"
      },
      {
        q: "艺术家如何申请参与阿姆斯特丹艺术驻留计划（Artist Residency）？",
        a: "我们全年接受具有成熟艺术语言与创作实验性的亚洲当代艺术家申请。艺术家需提交个人陈述、创作简历、高画质作品集以及驻留创作研究计划。入选者可获阿姆斯特丹创作工坊支持、荷兰文化访问签证协助，并在驻留期满时于画廊举办成果汇报个展。"
      },
      {
        q: "欧洲与国际艺术藏家如何通过YEAH进行艺术品收藏？",
        a: "我们提供经严格学术梳理与保真溯源的签约艺术家原作流通咨询。所有作品均附带权威艺术家签名防伪证书与完备学术文献记录，并配套恒温恒湿博物馆级全球保价航运，确保艺术品收藏的安全与长远增值价值。"
      }
    ]
  },
  { 
    id: "custom-it-services",
    number: "04",
    title: "Enterprise IT Solutions", 
    chineseTitle: "企业级IT与定制软件开发（软件开发 · 跨境系统 · 云架构）",
    seoBadge: "定制软件开发 · 数字化出海 · 云原生架构",
    seoTitle: "定制软件开发 · 数字化出海系统 · GDPR合规架构 | YEAH Enterprise IT Amsterdam",
    seoDescription: "专业全栈定制软件开发：跨国出海定制ERP/CRM、多语言电商与协作App、欧盟GDPR数据合规架构、高可用云原生微服务(AWS/GCP)与企业级AI业务流嵌入。",
    keywords: [
      "软件开发", "定制软件开发", "欧洲IT外包", "阿姆斯特丹软件研发", 
      "跨国系统研发", "出海App开发", "GDPR数据合规", "微服务架构", 
      "企业定制ERP", "企业AI系统集成", "Custom Software Amsterdam"
    ],
    tagline: "Resilient systems architecture, cross-border cloud & bespoke software engineering.",
    desc: "Engineering custom software systems, multi-region cloud backbones, and GDPR-compliant digital infrastructure for multinational enterprises operating across Europe and Asia.",
    longOverview: "Operating an enterprise across multiple jurisdictions requires software that withstands regulatory scrutiny, high concurrency, and heterogeneous legacy networks. YEAH Enterprise IT architects custom enterprise resource planning (ERP) platforms, cross-border real-time data pipelines, and secured cloud environments tailored for international trade and corporate management.",
    icon: Cpu,
    heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    metrics: [
      { value: "99.99%", label: "System Availability SLA Benchmark" },
      { value: "Sub-200ms", label: "Cross-Continent Synchronization Latency" },
      { value: "GDPR", label: "Full European Data Compliance Adherence" }
    ],
    scopeList: [
      {
        title: "全栈定制软件开发与系统集成 (Custom Software Engineering & Web/App Platforms)",
        desc: "针对跨国企业核心业务定制开发高并发 Web 应用、移动端 iOS/Android App 及分布式业务系统架构。"
      },
      {
        title: "跨境电商与出海多语言协同系统 (Cross-Border Trade Platforms & Custom ERP)",
        desc: "多币种智能换汇结算、荷兰及欧盟海关电子申报 (Douane EDI) 接口直连、多仓跨境物流一体化管理软件。"
      },
      {
        title: "欧盟 GDPR 数据合规与隐私安全架构 (European GDPR Compliance & Security)",
        desc: "全面贯彻欧盟通用数据保护条例 (GDPR)，实现敏感数据物理隔离、端到端加密存储与不可篡改区块链级审计日志。"
      },
      {
        title: "多区域合规云架构部署与灾备 (Multi-Region Cloud Infrastructure - AWS/GCP/Azure)",
        desc: "设计高可用 Kubernetes 集群、跨欧亚骨干网络加速专线、毫秒级容灾备份以及 99.99% 系统可用性保障。"
      },
      {
        title: "企业级 AI 业务流定制与大模型落地 (Enterprise AI Integration & API Middleware)",
        desc: "基于生成式 AI 与大语言模型为企业定制内部私有知识库、智能自动化业务流处理以及低延迟 API 中台。"
      }
    ],
    methodologySteps: [
      {
        step: "01",
        title: "架构审计与合规可行性研究 (Architecture & Compliance Audit)",
        desc: "深度评估现有系统数据流向、安全边界、欧盟GDPR法规红线以及亚欧跨洲际网络延迟瓶颈。"
      },
      {
        step: "02",
        title: "原型工程与数据库契约定义 (System Prototyping & Schema Design)",
        desc: "确立严格的微服务接口契约 (REST/GraphQL)、加密数据库模式设计与多区域容灾冗余策略。"
      },
      {
        step: "03",
        title: "敏捷迭代与高并发压力测试 (Iterative Engineering & Load Testing)",
        desc: "持续集成 CI/CD 自动化流水线部署、模拟海量并发压力测试以及严格的数据穿透测试。"
      },
      {
        step: "04",
        title: "平滑割接与 24/7 SLA 运维监控 (Live Migration & 24/7 SLA Support)",
        desc: "实现零停机时间旧系统数据平滑割接，配套全面的云原生观测报警看板与全天候技术保障。"
      }
    ],
    faqs: [
      {
        q: "出海欧洲的中国企业在软件开发中面临的最大挑战是什么？YEAH如何解决？",
        a: "最大的核心挑战在于欧盟严苛的通用数据保护条例（GDPR）与跨欧亚数据延迟。一旦违反GDPR最高可面临全球营收4%的巨额罚金。YEAH软件工程团队在欧洲本地架构，从设计之初即落实数据脱敏、欧盟本地化服务器存储（如法兰克福或阿姆斯特丹节点）与合规传输协议，确保客户系统百分之百安全无虞。"
      },
      {
        q: "YEAH支持哪些主流技术栈和开发模式？",
        a: "我们精通现代全栈工程技术：前端采用 React / Next.js / TypeScript / React Native / Flutter；后端基于 Node.js / Go / Python / Java 高性能微服务；数据库采用 PostgreSQL / Redis / Kafka 配合 Docker 与 Kubernetes 容器编排；云设施无缝适配 AWS、Google Cloud (GCP) 与 Microsoft Azure。"
      },
      {
        q: "如果企业已有现有系统，能进行定制二次开发或接口打通吗？",
        a: "完全支持。我们擅长在不影响企业现有业务运转的前提下，通过研发现代化 API 中间件与适配器，将原有老旧 ERP/CRM 系统与新型出海业务系统、欧盟海关接口及多币种支付网关无缝串联。"
      }
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  // Business Consulting
  {
    id: "case-tech-landing",
    title: "Global Tech Branch Establishment & European Hub",
    clientCategory: "Publicly Listed Asian Technology Enterprise",
    serviceId: "business-consulting",
    serviceName: "Market Entry & Business Consulting",
    tag: "荷兰企业注册 · 荷兰BV设立",
    summary: "为亚洲大型上市硬件与智能科技企业设立荷兰全资子公司，完成商会KvK注册、税号申报及欧洲竞标合规全流程建档。",
    challenge: "客户面临欧洲严苛的反洗钱 (AML) 银行开户审查、荷兰本土劳动雇佣法规限制，并需在紧迫的6周内获得欧盟企业资质参与千万欧元级商业竞标。",
    solution: "YEAH全流程统筹执行：协调荷兰资深民法公证人起草并签署章程、极速完成KvK登记、获取荷兰BTW/CIT税号、打通商业银行对公账户、租赁阿姆斯特丹Zuidas核心商务区办公室，并起草本土化高管雇佣合同。",
    deliverables: [
      "荷兰BV实体在商会KvK官方注册完成",
      "荷兰商业银行账户与多币种跨境结算通道开通",
      "核心国际员工30% Ruling所得税减免政策申报",
      "合规荷兰员工劳动合同与社保工资册建档"
    ],
    outcome: "6周内实现交钥匙运营；顺利获批12位核心管理人员工作居留；成功入围并中标超1,000万欧元的欧洲企业级招投标项目。",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "case-corporate-immigration",
    title: "Corporate Immigration & Executive EU Mobility",
    clientCategory: "Multinational Leadership & Executive Family Relocation",
    serviceId: "business-consulting",
    serviceName: "Market Entry & Business Consulting",
    tag: "高技术移民 · 欧洲高管派遣",
    summary: "为跨国集团欧洲总部管理团队办理荷兰高技术移民（Kennismigrant）保荐人资质与全家移居落地服务。",
    challenge: "应对荷兰移民局（IND）对新设实体担保资质的严苛财务审查，在不影响企业业务运营的前提下，同步办理8位外籍高管及其家属的合法居留。",
    solution: "撰写并递交详实的企业商业实质报告，顺利获批IND公认赞助人（Recognized Sponsor）资质，协助高管家庭预约市政厅BSN登记、开通本地医保并协助国际学校入学。",
    deliverables: [
      "荷兰移民局 IND Recognized Sponsor 资质顺利获批",
      "高技术移民 (Kennismigrant) 居留许可获发",
      "市政厅 BSN 税号预约与荷兰本地商业医疗保险配置",
      "高管家庭阿姆斯特丹住所安家与国际学校对接"
    ],
    outcome: "签证获签率 100%；8 户核心高管家庭零延误平稳定居阿姆斯特丹，实现企业跨国管理架构的无缝平移。",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop"
  },

  // Video Production
  {
    id: "case-destination-wedding",
    title: "European Destination Wedding & Historic Canal Heritage Film",
    clientCategory: "Luxury International Couple & High-End Wedding Planner",
    serviceId: "creative-agency",
    serviceName: "Video Production House",
    tag: "婚礼拍摄 · 欧洲目的地婚礼",
    summary: "摄制阿姆斯特丹联合国教科文组织遗产运河与 17 世纪庄园豪华目的地婚礼微电影，全程采用电影级 4K 双机位与特批航拍跟拍。",
    challenge: "3 天跨文化婚礼流程紧凑，涉及运河游船水上拍摄、历史庄园古迹保护限制、严苛的欧盟无人机航拍许可申办，以及多语种现场统筹。",
    solution: "配置两组 RED/Sony Cine 电影级摄制组，取得荷兰民航局特定区域航拍特批，运用无线高保真收音阵列与电影叙事分镜，呈现极具艺术美感的纪实爱情电影。",
    deliverables: [
      "12 分钟电影级长片微电影 (4K Cinema Master)",
      "60 秒社交平台先导预告片 (48 小时极速交付)",
      "完整婚礼仪式与宴会多机位超清全纪实母带",
      "精修 DaVinci 电影色调色彩管理"
    ],
    outcome: "成片获新人及欧洲高端婚礼策划界高度赞誉；社交媒体曝光超 50 万次，树立阿姆斯特丹及欧洲华人高端婚礼影视摄制标杆。",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "case-law-firms",
    title: "Listed Law Firms Keynote & Exhibition Media Suite",
    clientCategory: "International Publicly Listed Legal Group",
    serviceId: "creative-agency",
    serviceName: "Video Production House",
    tag: "商业拍摄 · 企业宣传片",
    summary: "为多家国际上市律所及咨询集团制作高规格全球形象宣传片、欧洲峰会主题演讲视听套件与世界法学展展项影片。",
    challenge: "将严谨抽象的国际法学议题与高级合伙人思想领袖见解，转化为兼具电影质感与庄重学术威望的纪实视听作品。",
    solution: "出动 ARRI Alexa Mini LF 电影摄影机套件，在阿姆斯特丹与伦敦历史名邸搭建专属声光环境，以高端纪录片导演视角进行深度访谈与视觉镜头捕捉。",
    deliverables: [
      "14 部院线级企业高管思想领袖主题短片",
      "全球法学峰会展台全景环幕宣传样片",
      "全球合伙人内部年会保密级视听素材包",
      "中英法德多语言字幕及母带分发归档"
    ],
    outcome: "在阿姆斯特丹、伦敦及法兰克福峰会面向逾万名全球政商学界专业观众展映，被誉为将企业商务视听升华为电影艺术的杰作。",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop"
  },
  {
    id: "case-dating-show",
    title: "Dutch Reality Dating Show 2026 (In Production)",
    clientCategory: "European Commercial Television Network",
    serviceId: "creative-agency",
    serviceName: "Video Production House",
    tag: "电视真人秀 · 广播级摄制",
    summary: "担纲欧洲主流商业电视台 2026 年度大型恋爱真人秀的全流程现场拍摄、摄影指导与实景叙事摄制。",
    challenge: "欧洲多国多栋庄园实景别墅同步调度、十余位嘉宾无剧本突发情境抓取、多机位无线音频严苛同步与极高密度的每日素材转码归档。",
    solution: "搭建 18 机位同步广播级摄制流水线、工业级多通道无线录音矩阵、现场剧情编导统筹与每日实时粗剪工作流。",
    deliverables: [
      "全套现场导演与电影摄影指导摄制班底",
      "18 机位同步 4K 广播级采集系统",
      "每日剧情粗剪与故事弧线梳理归纳",
      "广播级母带达芬奇调色与 5.1 环绕声混音"
    ],
    outcome: "前期拍摄如期圆满推进；10 集黄金档正片正在紧锣密鼓后期制作中，预计 2026 年在欧洲主要电视频道及流媒体同步播出。",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2070&auto=format&fit=crop"
  },

  // Fine Art
  {
    id: "case-asian-art-showcase",
    title: "Amsterdam Asian Contemporary Art Showcase",
    clientCategory: "International Museum & Cultural Foundation",
    serviceId: "fine-art",
    serviceName: "Fine Art & Cultural Exchange",
    tag: "亚洲艺术家画廊 · 国际策展",
    summary: "在阿姆斯特丹核心艺术区策划并落地大型亚洲当代艺术展，呈现 12 位中国及东亚先锋艺术家的雕塑、绘画与多媒体装置。",
    challenge: "在欧洲学术界语境下精准传达亚洲复杂当代文化命题，同时攻克馆藏级国际艺术品保税运输与恒温恒湿文保展陈挑战。",
    solution: "拟定学术策展专论，设计沉浸式展陈空间架构，协调国际恒温海关保税通道，出版双语学术画册并举办欧洲美术馆长与顶级藏家 VIP 预览。",
    deliverables: [
      "完整学术策展方案与展厅空间美学架构",
      "48 件重磅艺术品博物馆级国际保价通关与布展",
      "中英双语精装收藏级学术画册编辑出版",
      "面向欧洲知名美术馆长与资深藏家的 VIP 专场预览"
    ],
    outcome: "3 周展期累计接待逾 5,200 名专业观众；促成 4 件重点作品被欧洲主流美术馆永久收藏；获荷兰国家级文化艺术媒体专题报道。",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2090&auto=format&fit=crop"
  },
  {
    id: "case-artist-residency",
    title: "Trans-Eurasian Artist Residency & European Placement",
    clientCategory: "International Artists & European Gallery Network",
    serviceId: "fine-art",
    serviceName: "Fine Art & Cultural Exchange",
    tag: "艺术驻留 · 国际交流",
    summary: "建立长效欧亚艺术家阿姆斯特丹驻留与代理推介机制，协助杰出亚洲当代艺术家在欧洲艺术圈构建学术声誉与市场基石。",
    challenge: "优秀的海外艺术家缺乏欧洲在地创作工坊、合法文化签证身份及与欧洲当地画廊机构的直接对接窗口。",
    solution: "在阿姆斯特丹提供独立生活与创作画室，协助办理荷兰文化访问签证，组织欧洲画廊主工作室访问，并策划欧洲艺术博览会专场展示。",
    deliverables: [
      "驻留艺术家专属文化访问签证与合规资助",
      "阿姆斯特丹核心区独立艺术工作室配套",
      "欧洲画廊主与美术馆策展人工作室拜访沙龙",
      "欧洲顶级艺术博览会个人独立单元展出推介"
    ],
    outcome: "已成功支持 20 余位青年艺术家完成欧洲驻留，超过 35 件重要代表作被欧洲知名私人收藏基金会与机构收藏。",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop"
  },

  // Enterprise IT
  {
    id: "case-cross-border-it",
    title: "Cross-Border Enterprise System Integration & Data Sync",
    clientCategory: "Global Manufacturing & Trade Conglomerate",
    serviceId: "custom-it-services",
    serviceName: "Enterprise IT Solutions",
    tag: "软件开发 · GDPR合规架构",
    summary: "设计并研发亚欧跨区域分布式企业系统数据同步中台，实现跨国制造中心与欧洲总部实时数据互联互通。",
    challenge: "传统孤岛系统跨国数据同步存在 4 小时严重延迟，库存数据冲突频发，且面临违反欧盟 GDPR 数据主权合规的巨大法律风险。",
    solution: "采用 Kafka + Kubernetes 打造事件驱动型分布式微服务架构，在法兰克福和新加坡设立合规云节点，内置自动化隐私合规过滤网关。",
    deliverables: [
      "高并发分布式微服务与 Kafka 实时数据通道",
      "符合 GDPR 严格法规的欧洲本地隔离数据库集群",
      "零宕机自动化容灾切换与多区域热备份机制",
      "全链路亚秒级监控看板与故障智能预警"
    ],
    outcome: "实现 99.995% 严苛可用性；亚欧跨洲数据同步延迟从 4 小时缩减至 200 毫秒以内；100% 通过欧盟第三方数据安全审计。",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "case-custom-erp",
    title: "Custom Multi-Currency ERP & Customs Trade Engine",
    clientCategory: "Multinational Import-Export Enterprise",
    serviceId: "custom-it-services",
    serviceName: "Enterprise IT Solutions",
    tag: "软件开发 · 跨境ERP系统",
    summary: "专为经由荷兰鹿特丹港进入欧洲市场的跨国贸易企业定制研发云原生 ERP 贸易系统与自动清关对接引擎。",
    challenge: "客户此前依靠人工处理鹿特丹港复杂报关单据，面对多币种外汇波动摩擦及各欧盟成员国增值税 (BTW/VAT) 繁琐核算，每年遭受巨额损耗。",
    solution: "自主研发集成荷兰海关 (Douane) EDI 自动化电子报关接口的现代 Web ERP，打通实时动态换汇、欧盟一站式增值税申报引擎与仓储物流跟踪。",
    deliverables: [
      "专为出海贸易定制的全栈 Web 端企业级 ERP 系统",
      "与荷兰海关 Douane 电子申报系统的直连集成 API",
      "欧盟多国跨国增值税 (BTW/VAT) 智能自动核算引擎",
      "细粒度权限管控与不可篡改金融级操作审计日志"
    ],
    outcome: "平稳支撑每年超 4,500 万欧元进出口贸易流水；鹿特丹港报关平均耗时缩短 65%；每年杜绝逾 28 万欧元的繁琐对账差错损失。",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
  }
];

// --- Subcomponents ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Client-Side Dynamic SEO Hook ---

const usePageSEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
}: {
  title: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
}) => {
  useEffect(() => {
    document.title = title;

    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", description);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", description);
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute("content", description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", title);

    if (keywords) {
      const metaKw = document.querySelector('meta[name="keywords"]');
      if (metaKw) metaKw.setAttribute("content", keywords);
    }

    if (canonicalUrl) {
      const linkCanon = document.querySelector('link[rel="canonical"]');
      if (linkCanon) linkCanon.setAttribute("href", canonicalUrl);
    }
  }, [title, description, keywords, canonicalUrl]);
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="flex items-center gap-6">
        <Link 
          to="/"
          className="flex items-baseline gap-2 group"
        >
          <span className="text-2xl font-serif tracking-widest uppercase font-medium text-white group-hover:text-gray-300 transition-colors">YEAH</span>
          <span className="text-[10px] font-mono tracking-[0.25em] text-gray-400 uppercase hidden sm:inline">Amsterdam</span>
        </Link>
      </div>

      {/* Desktop Quick Nav - Direct Subpages */}
      <div className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-widest uppercase">
        <Link 
          to="/services/business-consulting" 
          className={cn(
            "transition-colors py-1 border-b",
            isCurrent("/services/business-consulting") || isCurrent("/business-consulting")
              ? "text-white border-white"
              : "text-gray-400 border-transparent hover:text-white"
          )}
        >
          01. Consulting
        </Link>
        <Link 
          to="/services/creative-agency" 
          className={cn(
            "transition-colors py-1 border-b",
            isCurrent("/services/creative-agency") || isCurrent("/video-production")
              ? "text-white border-white"
              : "text-gray-400 border-transparent hover:text-white"
          )}
        >
          02. Video
        </Link>
        <Link 
          to="/services/fine-art" 
          className={cn(
            "transition-colors py-1 border-b",
            isCurrent("/services/fine-art")
              ? "text-white border-white"
              : "text-gray-400 border-transparent hover:text-white"
          )}
        >
          03. Art
        </Link>
        <Link 
          to="/services/custom-it-services" 
          className={cn(
            "transition-colors py-1 border-b",
            isCurrent("/services/custom-it-services") || isCurrent("/enterprise-it")
              ? "text-white border-white"
              : "text-gray-400 border-transparent hover:text-white"
          )}
        >
          04. IT
        </Link>
        <span className="text-gray-700">|</span>
        <a href="/#search-directory" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
          <Search size={11} className="text-emerald-400" />
          <span>业务索引</span>
        </a>
        <a href="/#about" className="text-gray-400 hover:text-white transition-colors">About</a>
        <a href="mailto:info@yeah-amsterdam.nl" className="text-white hover:text-gray-300 transition-colors font-medium">Inquire</a>
      </div>

      <div className="flex items-center gap-4">
        <a 
          href="mailto:info@yeah-amsterdam.nl"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-[11px] font-mono uppercase tracking-wider bg-white/10 hover:bg-white hover:text-black text-white transition-all rounded-sm border border-white/10"
        >
          <Mail size={12} /> info@yeah-amsterdam.nl
        </a>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white hover:text-gray-400 transition-colors lg:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[73px] bg-black/95 backdrop-blur-xl z-40 flex flex-col p-8 lg:hidden border-t border-white/10 overflow-y-auto"
          >
            <div className="space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 block">The 4 Independent Practice Subpages</span>
              <div className="space-y-4">
                {SERVICES.map((s) => (
                  <Link
                    key={s.id}
                    to={`/services/${s.id}`}
                    onClick={() => setIsOpen(false)}
                    className="block group py-2 border-b border-white/5"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-mono text-gray-500">{s.number}</span>
                      <span className="text-xl font-serif text-white group-hover:text-gray-300 transition-colors">{s.title}</span>
                    </div>
                    <p className="text-xs text-emerald-400/80 mt-0.5 pl-7 text-[11px] font-mono">{s.chineseTitle.split('（')[0]}</p>
                    <p className="text-xs text-gray-400 mt-1 pl-7 line-clamp-1">{s.tagline}</p>
                  </Link>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4 text-sm font-mono uppercase tracking-widest text-gray-400">
                <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-white">Home Portal (首页)</Link>
                <a href="/#search-directory" onClick={() => setIsOpen(false)} className="block text-emerald-400 hover:text-white flex items-center gap-2">
                  <Search size={14} /> 核心业务关键词检索 (Search Index)
                </a>
                <a href="/#about" onClick={() => setIsOpen(false)} className="block hover:text-white">About YEAH Amsterdam</a>
                <a href="/#contact" onClick={() => setIsOpen(false)} className="block text-white">Direct Inquiry</a>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-white/10">
              <a 
                href="mailto:info@yeah-amsterdam.nl"
                className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest font-medium"
              >
                <Mail size={14} /> info@yeah-amsterdam.nl
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Home Hero ---

const Hero = () => {
  return (
    <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 px-6 md:px-12 border-b border-white/10 bg-radial-[at_top_center] from-[#121212] via-black to-black">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-[11px] font-mono uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Amsterdam Boutique Agency · Four Specialized Practices
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-white leading-[1.08] mb-8 text-balance">
            Strategic Clarity Across Four Dedicated Practices.
          </h1>

          <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed mb-12 max-w-3xl">
            YEAH Agency Amsterdam is structured into four independent corporate divisions: <strong className="text-white font-normal">Market Entry Consulting</strong>, <strong className="text-white font-normal">Video Production</strong>, <strong className="text-white font-normal">Fine Art Curating</strong>, and <strong className="text-white font-normal">Enterprise IT Systems</strong>. Each division maintains its own dedicated subpage and verified case studies.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#divisions"
              className="inline-flex items-center gap-3 px-6 py-4 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors font-medium"
            >
              Explore 4 Division Subpages <ArrowRight size={14} />
            </a>
            <a 
              href="mailto:info@yeah-amsterdam.nl"
              className="inline-flex items-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest transition-colors border border-white/10"
            >
              <Mail size={13} /> Direct Inquiry
            </a>
          </div>
        </div>

        {/* Practice Quick Jump Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-white/10">
          {SERVICES.map((s) => (
            <Link 
              key={s.id} 
              to={`/services/${s.id}`}
              className="p-4 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-2">
                <span>DIV {s.number}</span>
                <ArrowUpRight size={14} className="text-gray-500 group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-serif text-sm md:text-base text-white group-hover:text-gray-200 line-clamp-1">{s.title}</h4>
              <p className="text-[11px] text-gray-400 font-light mt-1 line-clamp-1">{s.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Four Practices Portal (Clean Gateway Cards Linking to Subpages) ---

const DivisionPortals = () => {
  return (
    <section id="divisions" className="py-24 md:py-36 px-6 md:px-12 bg-[#050505] border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-gray-400 block mb-3">Our 4 Practice Subpages</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white">Dedicated Business Divisions</h2>
          </div>
          <p className="text-sm md:text-base text-gray-400 max-w-md font-light leading-relaxed">
            Each business line operates as an independent division with its own dedicated subpage, specialized service architecture, and verified case studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => {
            const relatedCases = CASE_STUDIES.filter(c => c.serviceId === service.id);

            return (
              <div 
                key={service.id}
                className="bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Visual Header */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-950">
                    <img 
                      src={service.heroImage} 
                      alt={service.title}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-mono px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-white">
                        DIVISION {service.number}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="text-[11px] font-mono uppercase tracking-widest bg-black/80 backdrop-blur-md px-2.5 py-1 text-gray-300 border border-white/10">
                        {relatedCases.length} Dedicated Cases
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                      {service.seoBadge}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-1 group-hover:text-gray-200">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono text-gray-300 font-normal mb-3">
                      {service.chineseTitle.split('（')[0]}
                    </p>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4">
                      {service.tagline}
                    </p>
                    <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    {/* Scope Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.scopeList.slice(0, 4).map((item, idx) => (
                        <span key={idx} className="text-[11px] font-mono bg-white/5 border border-white/5 px-2.5 py-1 text-gray-300">
                          {item.title.split('&')[0].split('(')[0].trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subpage CTA Button Footer */}
                <div className="p-8 pt-0 flex flex-wrap items-center gap-3">
                  <Link 
                    to={`/services/${service.id}`}
                    className="flex-1 inline-flex items-center justify-between px-5 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors font-medium"
                  >
                    <span>Enter Subpage & View Cases</span>
                    <ArrowRight size={14} />
                  </Link>

                  {service.externalUrl && (
                    <a 
                      href={service.externalUrl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3.5 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider border border-white/10 transition-colors shrink-0"
                      title={service.externalUrl.label}
                    >
                      <span>More Details</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- SEO Keyword & Core Service Directory Component ---

const SEOKeywordDirectory = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: "全部业务 (All)" },
    { id: "婚礼拍摄", label: "婚礼拍摄" },
    { id: "商业拍摄", label: "商业拍摄" },
    { id: "企业拍摄", label: "企业拍摄" },
    { id: "荷兰企业注册", label: "荷兰企业注册" },
    { id: "软件开发", label: "软件开发" },
    { id: "亚洲艺术家画廊", label: "亚洲艺术家画廊" }
  ];

  const filteredPillars = SEO_PILLARS.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = searchQuery.trim() === "" || 
      p.chineseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="search-directory" className="py-24 md:py-36 px-6 md:px-12 bg-black border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-[11px] font-mono uppercase tracking-widest mb-4">
              <Search size={12} className="text-emerald-400" />
              Specialized Service & Search Keywords Index
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-white">
              核心业务与服务范围检索
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-400 max-w-xl font-light leading-relaxed">
            涵盖 <strong className="text-white font-normal">婚礼拍摄</strong>、<strong className="text-white font-normal">商业拍摄</strong>、<strong className="text-white font-normal">企业拍摄</strong>、<strong className="text-white font-normal">荷兰企业注册</strong>、<strong className="text-white font-normal">定制软件开发</strong> 与 <strong className="text-white font-normal">亚洲艺术家画廊</strong>。支持精准索引与一键咨询。
          </p>
        </div>

        {/* Search bar & Category filter */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="按关键词快速筛选（例如：婚礼拍摄、商业广告、企业宣传片、荷兰注册、软件开发、画廊...）"
              className="w-full pl-11 pr-12 py-3.5 bg-[#0a0a0a] border border-white/15 focus:border-white text-white text-xs font-mono placeholder:text-gray-600 outline-none transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs font-mono"
              >
                清除
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={cn(
                  "px-4 py-2 text-xs font-mono tracking-wider transition-all border",
                  activeCategory === c.id
                    ? "bg-white text-black border-white font-medium"
                    : "bg-[#0b0b0b] text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPillars.map((pillar) => (
            <div 
              key={pillar.id}
              className="bg-[#080808] border border-white/10 hover:border-white/30 transition-all p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono px-2.5 py-1 bg-white/10 text-white border border-white/10">
                    {pillar.category}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    YEAH Amsterdam
                  </span>
                </div>

                <h3 className="text-xl font-serif text-white mb-1 group-hover:text-gray-200">
                  {pillar.chineseTitle}
                </h3>
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-4">
                  {pillar.englishTitle}
                </span>

                <p className="text-xs text-gray-300 font-light leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Highlights */}
                <div className="mb-6 space-y-2">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">
                    服务优势与交付标准
                  </span>
                  {pillar.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-gray-400 font-light">
                      <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Keywords Cloud */}
                <div className="pt-4 border-t border-white/5 mb-6">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2">
                    重点搜索关键词
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pillar.keywords.map((kw, kwIdx) => (
                      <span 
                        key={kwIdx}
                        className="text-[10px] font-mono bg-white/[0.04] text-gray-300 border border-white/5 px-2 py-0.5"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <Link 
                  to={`/services/${pillar.serviceId}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-white text-black font-mono text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors font-medium"
                >
                  <span>进入该业务子页面</span>
                  <ArrowRight size={13} />
                </Link>
                <a 
                  href={`mailto:info@yeah-amsterdam.nl?subject=${encodeURIComponent(`业务咨询: ${pillar.chineseTitle}`)}`}
                  className="px-3.5 py-3 bg-white/5 hover:bg-white/15 text-white border border-white/10 transition-colors"
                  title="针对该业务发信咨询"
                >
                  <Mail size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// --- About & Operational Foundation ---

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-12 bg-[#060606] border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-gray-400 block mb-3">Agency Foundations</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
              Rooted in Amsterdam, Operating Between Europe and Asia.
            </h2>
            <div className="space-y-6 text-gray-300 font-light leading-relaxed text-base">
              <p>
                The Netherlands represents the optimal continental gateway for commerce, culture, and digital infrastructure. However, international founders and institutions frequently struggle with rigid local bureaucracy, cultural nuances, and execution friction.
              </p>
              <p>
                YEAH Agency Amsterdam was founded to eliminate that friction. Whether you are an Asian technology firm incorporating your European headquarters, a broadcast network producing an unscripted series, an institutional curator exhibiting internationally acclaimed artists, or a trading house scaling cloud systems — we provide direct execution with European standards.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-left">
              <div>
                <span className="text-2xl font-serif text-white block">2020</span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Established</span>
              </div>
              <div>
                <span className="text-2xl font-serif text-white block">AMS</span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Headquarters</span>
              </div>
              <div>
                <span className="text-2xl font-serif text-white block">100%</span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Confidential</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-8 bg-black border border-white/10">
              <span className="text-xs font-mono text-gray-400 block mb-2">01 / Rigorous Compliance</span>
              <h4 className="text-lg font-serif text-white mb-3">European Standards</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Full adherence to Dutch KvK, Belastingdienst tax laws, IND immigration standards, and EU GDPR data privacy architecture.
              </p>
            </div>
            <div className="p-8 bg-black border border-white/10">
              <span className="text-xs font-mono text-gray-400 block mb-2">02 / Bilingual Bridges</span>
              <h4 className="text-lg font-serif text-white mb-3">East-West Fluency</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Seamless operational coordination bridging Asian executive leadership with Dutch civil notaries, banks, and production crews.
              </p>
            </div>
            <div className="p-8 bg-black border border-white/10">
              <span className="text-xs font-mono text-gray-400 block mb-2">03 / Production Grade</span>
              <h4 className="text-lg font-serif text-white mb-3">High-End Craft</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Cinema-grade camera rigs, institutional curatorial rigor, and resilient multi-region cloud infrastructures without compromises.
              </p>
            </div>
            <div className="p-8 bg-black border border-white/10">
              <span className="text-xs font-mono text-gray-400 block mb-2">04 / Dedicated Accountability</span>
              <h4 className="text-lg font-serif text-white mb-3">Single Point of Contact</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                No bureaucratic layers or junior handoffs. Every client engages directly with senior practice principals in Amsterdam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Contact & Inquiry ---

const Contact = () => {
  const [selectedPractice, setSelectedPractice] = useState<string>("business-consulting");

  const currentService = SERVICES.find(s => s.id === selectedPractice) || SERVICES[0];

  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-12 bg-black border-b border-white/10">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs font-mono uppercase tracking-[0.4em] text-gray-400 block mb-4">Direct Engagement</span>
        <h2 className="text-4xl md:text-7xl font-serif text-white mb-6">Initiate an Inquiry</h2>
        <p className="text-base md:text-xl text-gray-300 font-light max-w-2xl mx-auto mb-12">
          Contact our Amsterdam office directly for confidential consultations, corporate landing roadmaps, or production proposals.
        </p>

        {/* Practice Selector for Mailto Subject */}
        <div className="bg-[#0b0b0b] border border-white/10 p-6 md:p-8 rounded-sm text-left max-w-2xl mx-auto mb-10">
          <label className="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-3">
            Select Your Primary Area of Interest:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedPractice(s.id)}
                className={cn(
                  "p-3 text-left text-xs font-mono uppercase tracking-wider border transition-all flex items-center justify-between",
                  selectedPractice === s.id
                    ? "bg-white text-black border-white font-medium"
                    : "bg-black/50 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                )}
              >
                <span>{s.number}. {s.title.split('&')[0].trim()}</span>
                {selectedPractice === s.id && <CheckCircle2 size={14} />}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div>
              <span className="text-[11px] font-mono text-gray-400 block">Default Direct Channel:</span>
              <span className="text-sm font-mono text-white">info@yeah-amsterdam.nl</span>
            </div>

            <a 
              href={`mailto:info@yeah-amsterdam.nl?subject=${encodeURIComponent(`Inquiry for ${currentService.title}`)}`}
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors font-medium"
            >
              Compose Email to Amsterdam <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <p className="text-xs font-mono text-gray-400 tracking-wider">
          Typical response turnaround within 24 business hours. Amsterdam time (CET).
        </p>
      </div>
    </section>
  );
};

// --- Footer ---

const Footer = () => {
  return (
    <footer className="py-16 px-6 md:px-12 bg-black text-gray-500 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          <div className="md:col-span-5">
            <span className="text-2xl font-serif text-white tracking-widest uppercase block mb-3">YEAH</span>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-400 mb-6">Agency Amsterdam · The Netherlands</p>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-light">
              Multidisciplinary agency bridging global enterprise, television media, contemporary fine art, and cross-border digital architecture.
            </p>
          </div>

          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-widest text-white block mb-4">The Four Practices</span>
            <ul className="space-y-2 text-xs font-mono text-gray-400">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="hover:text-white transition-colors">
                    {s.number}. {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white block mb-4">Location & Contact</span>
            <div className="space-y-2 text-xs font-mono text-gray-400">
              <p>Amsterdam, The Netherlands</p>
              <p>Direct: <a href="mailto:info@yeah-amsterdam.nl" className="text-white hover:underline">info@yeah-amsterdam.nl</a></p>
              <div className="pt-2">
                <a 
                  href="https://yeah-business-amsterdam-m6sjyle.gamma.site/yeah-en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-300 hover:text-white inline-flex items-center gap-1.5"
                >
                  Market Entry Portal <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* SEO Practice Keywords Index Row */}
        <div className="py-8 border-b border-white/10 text-xs font-mono">
          <span className="text-gray-400 uppercase tracking-widest block mb-3 text-[11px] flex items-center gap-2">
            <Search size={12} className="text-emerald-400" />
            核心业务关键词快速索引 (Core Specialized Capabilities)
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-400 text-xs">
            <Link to="/services/creative-agency" className="hover:text-white transition-colors">
              • 欧洲与荷兰高端婚礼拍摄 (Destination Wedding Films)
            </Link>
            <Link to="/services/creative-agency" className="hover:text-white transition-colors">
              • 品牌商业拍摄与广告TVC (Commercial Video)
            </Link>
            <Link to="/services/creative-agency" className="hover:text-white transition-colors">
              • 企业宣传片与欧洲展会纪实 (Corporate Documentaries)
            </Link>
            <Link to="/services/business-consulting" className="hover:text-white transition-colors">
              • 荷兰企业注册与商会KvK设立 (Dutch BV Incorporation)
            </Link>
            <Link to="/services/custom-it-services" className="hover:text-white transition-colors">
              • 全栈定制软件开发与GDPR系统 (Custom Software)
            </Link>
            <Link to="/services/fine-art" className="hover:text-white transition-colors">
              • 阿姆斯特丹亚洲艺术家画廊 (Asian Art Gallery Amsterdam)
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-widest text-gray-400">
          <div>© {new Date().getFullYear()} YEAH Agency Amsterdam. All Rights Reserved.</div>
          <div className="flex gap-6">
            <span>KvK Amsterdam</span>
            <span>Dutch Registered Practice</span>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Subpage FAQ Component for High-Value SEO Signals ---

const SubpageFAQSection = ({ service }: { service: ServiceDefinition }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!service.faqs || service.faqs.length === 0) return null;

  return (
    <div className="py-20 border-b border-white/10">
      <div className="max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-[11px] font-mono uppercase tracking-widest mb-3">
          <HelpCircle size={12} className="text-emerald-400" />
          Advisory & FAQ Guide
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-white">
          常见业务咨询与合规答疑
        </h2>
        <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mt-2">
          针对 {service.title} 的高频搜索问题与专业解答
        </p>
      </div>

      <div className="space-y-4 max-w-4xl">
        {service.faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx}
              className="bg-[#090909] border border-white/10 transition-all overflow-hidden"
            >
              <button 
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 group"
              >
                <span className="text-base font-serif text-white group-hover:text-gray-200">
                  {faq.q}
                </span>
                <ChevronDown 
                  size={16} 
                  className={cn(
                    "text-gray-400 transition-transform shrink-0",
                    isOpen && "rotate-180 text-white"
                  )} 
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-xs md:text-sm text-gray-300 font-light leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Subpage: Detailed Division Landing Page ---

const ServicePage = ({ defaultId }: { defaultId?: string } = {}) => {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const id = paramId || defaultId;
  const service = SERVICES.find(s => s.id === id);
  const relatedCases = CASE_STUDIES.filter(c => c.serviceId === id);

  usePageSEO({
    title: service ? `${service.seoTitle} | YEAH Agency Amsterdam` : "YEAH Agency Amsterdam",
    description: service?.seoDescription,
    keywords: service?.keywords.join(", "),
    canonicalUrl: `https://yeah-amsterdam.nl/services/${id}`
  });

  if (!service) {
    return (
      <div className="min-h-screen pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-serif text-white mb-4">Division Not Found</h2>
        <p className="text-gray-400 text-sm font-mono mb-8">The requested practice line could not be identified.</p>
        <button 
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest"
        >
          Return to Overview
        </button>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-28 md:pt-36 pb-32 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Back navigation */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Practices Overview
        </button>

        {/* Division Header Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-white/10">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-mono px-3 py-1 bg-white/10 text-white border border-white/10">
                PRACTICE DIVISION {service.number}
              </span>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest px-2.5 py-0.5 bg-emerald-950/40 border border-emerald-500/20">
                {service.seoBadge}
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
                YEAH Agency Amsterdam
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-white mb-2 leading-tight">
              {service.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-300 font-mono mb-6 font-light">
              {service.chineseTitle}
            </p>

            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-8">
              {service.tagline}
            </p>

            <p className="text-base text-gray-400 font-light leading-relaxed mb-8">
              {service.longOverview}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href={`mailto:info@yeah-amsterdam.nl?subject=${encodeURIComponent(`Inquiry for Division: ${service.title} (${service.seoBadge})`)}`}
                className="inline-flex items-center gap-3 px-6 py-4 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors font-medium"
              >
                Inquire With Practice Team <ArrowRight size={14} />
              </a>

              {service.externalUrl && (
                <a 
                  href={service.externalUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider border border-white/20 transition-colors"
                >
                  {service.externalUrl.label} <ExternalLink size={14} />
                </a>
              )}
            </div>

            {service.externalUrl && (
              <p className="text-xs text-gray-400 font-mono mt-3">
                {service.externalUrl.description}
              </p>
            )}
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-gray-950">
              <img 
                src={service.heroImage} 
                alt={service.title}
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                  {service.seoBadge}
                </span>
                <span className="text-sm font-serif text-white italic">
                  {service.desc}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Division Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-b border-white/10">
          {service.metrics.map((m, idx) => (
            <div key={idx} className="p-6 bg-[#0a0a0a] border border-white/5">
              <span className="text-3xl md:text-4xl font-serif text-white block mb-1">{m.value}</span>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Keywords Ribbon for Search Relevance */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mr-2">
            <Search size={12} className="text-emerald-400" />
            核心搜索词索引 (SEO Keywords):
          </span>
          {service.keywords.map((kw, kwIdx) => (
            <span key={kwIdx} className="text-xs font-mono bg-white/5 border border-white/10 text-gray-300 px-3 py-1">
              #{kw}
            </span>
          ))}
        </div>

        {/* Scope of Practice & Capabilities */}
        <div className="py-20 border-b border-white/10">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-gray-400 block mb-3">Service Architecture</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Full Scope of Deliverables</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.scopeList.map((item, idx) => (
              <div key={idx} className="p-8 bg-[#080808] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-gray-400 block mb-4">0{idx + 1}</span>
                  <h3 className="text-lg font-serif text-white mb-3">{item.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology Roadmap */}
        <div className="py-20 border-b border-white/10">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-gray-400 block mb-3">Working Process</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Methodology & Execution Pipeline</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.methodologySteps.map((step, idx) => (
              <div key={idx} className="p-6 bg-[#080808] border border-white/10">
                <span className="text-2xl font-serif text-white block mb-2">{step.step}</span>
                <h4 className="text-sm font-mono uppercase tracking-wider text-gray-200 mb-3">{step.title}</h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated Case Studies for this Division */}
        <div className="py-20 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-gray-400 block mb-3">Case History</span>
              <h2 className="text-3xl md:text-4xl font-serif text-white">Documented Case Studies</h2>
            </div>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              {relatedCases.length} Specialized Engagements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedCases.map((cs) => (
              <div key={cs.id} className="bg-[#090909] border border-white/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={cs.image} 
                      alt={cs.title}
                      className="w-full h-full object-cover grayscale contrast-125"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest bg-black/80 px-3 py-1 text-white border border-white/10">
                        {cs.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-2">
                      {cs.clientCategory}
                    </span>
                    <h3 className="text-2xl font-serif text-white mb-4 italic">
                      {cs.title}
                    </h3>
                    <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
                      {cs.summary}
                    </p>

                    <div className="space-y-4 pt-4 border-t border-white/5 text-xs">
                      <div>
                        <strong className="text-gray-400 font-mono uppercase tracking-wider block mb-1">Challenge:</strong>
                        <p className="text-gray-400 font-light">{cs.challenge}</p>
                      </div>
                      <div>
                        <strong className="text-gray-400 font-mono uppercase tracking-wider block mb-1">Strategic Solution:</strong>
                        <p className="text-gray-400 font-light">{cs.solution}</p>
                      </div>
                      <div>
                        <strong className="text-gray-400 font-mono uppercase tracking-wider block mb-2">Key Scope & Deliverables:</strong>
                        <ul className="space-y-1 text-gray-400">
                          {cs.deliverables.map((d, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2">
                              <span className="text-white/40">•</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-sm">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 size={12} /> Results & Measured Impact
                    </span>
                    <p className="text-xs text-gray-300 font-light">{cs.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Division FAQ Guide */}
        <SubpageFAQSection service={service} />

        {/* Practice Direct Inquire Banner */}
        <div className="mt-16 p-8 md:p-12 bg-[#090909] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 block mb-2">Dedicated Practice Inquiry</span>
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">Initiate an Engagement with Division {service.number}</h3>
            <p className="text-xs text-gray-400 font-light max-w-xl">
              Direct consultation with our senior practice partners in Amsterdam. All business proposals and corporate records are treated with strict confidentiality.
            </p>
          </div>
          <a 
            href={`mailto:info@yeah-amsterdam.nl?subject=${encodeURIComponent(`Engagement Inquiry for Division ${service.number}: ${service.title} (${service.seoBadge})`)}`}
            className="inline-flex items-center gap-3 px-6 py-4 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors font-medium shrink-0"
          >
            Email info@yeah-amsterdam.nl <ArrowRight size={14} />
          </a>
        </div>

        {/* Cross-Division Navigation */}
        <div className="pt-20">
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-gray-400 block mb-6">Explore Other Practice Subpages</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SERVICES.filter(s => s.id !== id).map((s) => (
              <Link 
                key={s.id} 
                to={`/services/${s.id}`}
                className="p-6 bg-[#080808] border border-white/10 hover:border-white/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                    <span>DIV {s.number}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-gray-400 group-hover:text-white" />
                  </div>
                  <h4 className="font-serif text-lg text-white group-hover:italic transition-all">{s.title}</h4>
                  <p className="text-[11px] font-mono text-emerald-400/80 mt-1">{s.chineseTitle.split('（')[0]}</p>
                  <p className="text-xs text-gray-400 font-light mt-2 line-clamp-2">{s.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

// --- Home Page Composition ---

const HomePage = () => {
  usePageSEO({
    title: "YEAH Agency Amsterdam | 荷兰企业注册 · 商业/企业/婚礼拍摄 · 软件开发 · 亚洲艺术家画廊",
    description: "YEAH Agency Amsterdam (野禾阿姆斯特丹) 综合咨询与创意事务所：专注荷兰企业注册设立、荷兰及欧洲商业拍摄/企业宣传片/高端婚礼拍摄、定制全栈软件开发与数字化架构、以及阿姆斯特丹亚洲艺术家画廊与国际艺术策展交流。",
    keywords: "婚礼拍摄, 荷兰婚礼拍摄, 欧洲婚礼拍摄, 商业拍摄, 商业广告片拍摄, 企业拍摄, 企业宣传片, 荷兰企业注册, 荷兰公司注册, 荷兰BV注册, 软件开发, 定制软件开发, 亚洲艺术家画廊, 荷兰画廊, 阿姆斯特丹画廊, Dutch Company Formation, Amsterdam Video Production, Wedding Videography Europe, Custom Software Development",
    canonicalUrl: "https://yeah-amsterdam.nl/"
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <DivisionPortals />
      <SEOKeywordDirectory />
      <AboutSection />
      <Contact />
    </motion.div>
  );
};

// --- Root Application ---

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen font-sans selection:bg-white selection:text-black bg-black text-white">
        <div className="grain" />
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services/:id" element={<ServicePage />} />
              <Route path="/business-consulting" element={<ServicePage defaultId="business-consulting" />} />
              <Route path="/video-production" element={<ServicePage defaultId="creative-agency" />} />
              <Route path="/creative-agency" element={<ServicePage defaultId="creative-agency" />} />
              <Route path="/fine-art" element={<ServicePage defaultId="fine-art" />} />
              <Route path="/custom-it-services" element={<ServicePage defaultId="custom-it-services" />} />
              <Route path="/enterprise-it" element={<ServicePage defaultId="custom-it-services" />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
