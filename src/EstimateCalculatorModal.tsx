import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Calculator, 
  Clock, 
  CheckCircle2, 
  Copy, 
  Mail, 
  Check, 
  Sparkles,
  Building2,
  Video,
  Camera,
  Code2,
  Globe,
  Layers,
  FileText
} from "lucide-react";

export type EstimatorLanguage = "en" | "nl" | "zh";

interface EstimateCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: "consulting" | "video" | "wedding" | "software";
}

type ServiceCategory = "consulting" | "video" | "wedding" | "software";

// --- Dictionaries for Multilingual UI ---

const I18N = {
  en: {
    modalTitle: "Project Scope & Feasibility Estimator",
    modalSubtitle: "YEAH Agency Amsterdam · Tailored Engagement & Production Planning",
    scopeTierLabel: "Engagement Tier & Scale",
    pricingModelLabel: "Pricing Structure",
    itemizedQuoteNote: "Itemized Quote on Brief Review",
    estimatedTimelineLabel: "Estimated Turnaround",
    crewAllocationLabel: "Team & Resource Allocation",
    deliverablesLabel: "Key Deliverables & Specifications",
    itemsUnit: "modules",
    copyButton: "Copy Project Brief (Direct Clipboard)",
    copiedButton: "Brief Copied to Clipboard!",
    defaultMailButton: "Default Email Client",
    webGmailButton: "Web Gmail Compose",
    disclaimer: "* Formal line-item quotations are issued within 24 business hours following review of specific project briefs.",
    tabs: {
      consulting: "01. NL Corporate & KvK",
      video: "02. Commercial Film & TVC",
      wedding: "03. European Wedding & Film",
      software: "04. Digital Systems & Code"
    },
    consulting: {
      entityTypeTitle: "Legal Entity Form in the Netherlands",
      branchLabel: "Branch Office",
      branchSub: "Direct branch of foreign parent (KvK)",
      bvLabel: "Dutch BV Entity",
      bvSub: "Independent private limited company",
      liaisonLabel: "Representative Office",
      liaisonSub: "Non-commercial liaison presence",
      modulesTitle: "Legal & Operations Modules",
      addressLabel: "Amsterdam Commercial Registered Address",
      addressSub: "Zuidas / Canal Ring legal address with official KvK mail receipt",
      visaLabel: "IND Sponsor Accreditation & Executive Visas",
      visaSub: "Intra-company transfer (ICT) or highly skilled migrant visas",
      eprLabel: "EPR Environmental Compliance & Packaging Code",
      eprSub: "Afvalfonds waste registry & WEEE cross-border compliance",
      urgencyTitle: "Project Urgency & Schedule",
      urgencyStandard: "Standard Schedule (2-4 Weeks)",
      urgencyUrgent: "Priority Fast-Track (1-2 Weeks)"
    },
    video: {
      typeTitle: "Production Format & Objective",
      commercialLabel: "Brand Commercial & TVC",
      commercialSub: "High-impact cinematic campaign",
      documentaryLabel: "Corporate Documentary",
      documentarySub: "Brand story & thought leadership",
      eventLabel: "European Summit & Event",
      eventSub: "Multi-cam live & recap package",
      interviewLabel: "Executive Dialogue",
      interviewSub: "Studio lighting & 4K broadcast",
      daysTitle: "Principal Photography Days",
      dayUnit: "Day(s) On-Set",
      addonsTitle: "Production Rig & Crew Add-ons",
      cinemaGearLabel: "ARRI / RED Cinema Rig + Prime Lenses",
      cinemaGearSub: "Cinema prime glass vs. Sony FX documentary setup",
      droneLabel: "EASA Certified Aerial Drone Recording",
      droneSub: "Licensed European drone pilot with flight permissions",
      colorGradingLabel: "DaVinci Resolve Cinema Color & Sound Master",
      colorGradingSub: "High-end color grading and acoustic mastering"
    },
    wedding: {
      packageTitle: "Wedding & Elopement Collection",
      elopementLabel: "Intimate Canal Elopement",
      elopementSub: "Half/full day editorial couple stroll",
      fullDayLabel: "Full-Day Wedding Cinema",
      fullDaySub: "10-12 hours dual-cam narrative film",
      multiDayLabel: "Multi-Day European Destination",
      multiDaySub: "Amsterdam + Paris / Swiss Alps / Lake Como",
      locationTitle: "Shooting Geographic Scope",
      locAmsterdam: "Amsterdam Heritage & Canals",
      locNetherlands: "Netherlands Castles & Keukenhof",
      locEurope: "Pan-European Destination Tour",
      addonsTitle: "Cinematography & Fine Art Add-ons",
      droneWeddingLabel: "Certified Drone Cinematic Aerials",
      droneWeddingSub: "Sweeping views of Dutch castles and canals",
      filmPhotoLabel: "Kodak Portra Medium Format Analog Film",
      filmPhotoSub: "Authentic film grain and timeless optical tone"
    },
    software: {
      scopeTitle: "Engineering Scope & Architecture",
      mvpLabel: "Agile MVP Prototype",
      mvpSub: "Rapid launch in React/Next.js/Node",
      fullCustomLabel: "Enterprise Platform",
      fullCustomSub: "Custom backend, multi-role & RBAC",
      migrationLabel: "Cloud-Native Modernization",
      migrationSub: "Docker, microservices & SLA upgrade",
      scaleTitle: "SLA & Infrastructure Tier",
      smbLabel: "Growth Tier (Standard Cloud Hosting)",
      enterpriseLabel: "Enterprise High-Availability (24/7 SLA & Retainer)"
    }
  },
  nl: {
    modalTitle: "Project Scope & Haalbaarheidsestimator",
    modalSubtitle: "YEAH Agency Amsterdam · Maatwerk Productie- en Vestigingsplanning",
    scopeTierLabel: "Projectniveau & Schaal",
    pricingModelLabel: "Tarievenstructuur",
    itemizedQuoteNote: "Gespecificeerde Offerte op Aanvraag",
    estimatedTimelineLabel: "Geschatte Doorlooptijd",
    crewAllocationLabel: "Team- & Middelenallocatie",
    deliverablesLabel: "Kernopleveringen & Specificaties",
    itemsUnit: "modules",
    copyButton: "Kopieer Projectbriefing (Klembord)",
    copiedButton: "Briefing Gekopieerd naar Klembord!",
    defaultMailButton: "Standaard E-mailclient",
    webGmailButton: "Web Gmail Openen",
    disclaimer: "* Bindende offertes met uitsplitsing worden binnen 24 kantooruren verstrekt na ontvangst van de specifieke projectbriefing.",
    tabs: {
      consulting: "01. NL Vestiging & KvK",
      video: "02. Commerciële Film & TVC",
      wedding: "03. Bruiloft & Elopement",
      software: "04. Digitale Systemen & Code"
    },
    consulting: {
      entityTypeTitle: "Rechtsvorm in Nederland",
      branchLabel: "Nevenvestiging",
      branchSub: "Filiaal van buitenlandse moeder (KvK)",
      bvLabel: "Nederlandse BV",
      bvSub: "Besloten vennootschap met beperkte aansprakelijkheid",
      liaisonLabel: "Vertegenwoordigingskantoor",
      liaisonSub: "Niet-commerciële liaison en marktverkenning",
      modulesTitle: "Juridische & Operationele Modules",
      addressLabel: "Statutair Vestigingsadres Amsterdam",
      addressSub: "Zuidas / Grachtengordel adres inclusief officiële postverwerking",
      visaLabel: "IND Erkend Referent & Expatsvisum",
      visaSub: "Kennismigrantenregeling & intra-concern overplaatsing",
      eprLabel: "EPR Milieuregelgeving & Afvalfonds",
      eprSub: "Verpakkingsbeheer & WEEE-milieunummers",
      urgencyTitle: "Prioriteit & Planning",
      urgencyStandard: "Standaard Traject (2-4 Weken)",
      urgencyUrgent: "Prioriteit Spoedtraject (1-2 Weken)"
    },
    video: {
      typeTitle: "Productieformaat & Doelstelling",
      commercialLabel: "Merkfilm & Commerciële TVC",
      commercialSub: "Impactvolle filmische merkcampagne",
      documentaryLabel: "Bedrijfsdocumentaire",
      documentarySub: "Authentiek bedrijfsverhaal & thought leadership",
      eventLabel: "Europese Topconferentie & Event",
      eventSub: "Meercamera verslaggeving & aftermovie",
      interviewLabel: "Executive & Leiderschapsinterview",
      interviewSub: "Studiobelichting & 4K uitzendkwaliteit",
      daysTitle: "Aantal Draaidagen",
      dayUnit: "Draaidag(en) op Locatie",
      addonsTitle: "Camera-uitrusting & Crew Modules",
      cinemaGearLabel: "ARRI / RED Cinema Rig + Prime Lenzen",
      cinemaGearSub: "Cinema prime lenzen t.o.v. Sony FX serie",
      droneLabel: "EASA Gecertificeerde Drone Luchtbeelden",
      droneSub: "Gelicentieerde piloot met Europese vluchtvergunning",
      colorGradingLabel: "DaVinci Resolve Kleur- & Geluidsnabewerking",
      colorGradingSub: "Bioscoopkwaliteit kleurcorrectie & audio mastering"
    },
    wedding: {
      packageTitle: "Bruiloft & Elopement Collectie",
      elopementLabel: "Intieme Grachten Elopement",
      elopementSub: "Halve of hele dag redactionele wandeling",
      fullDayLabel: "Volledige Dag Bruiloftsfilm",
      fullDaySub: "10-12 uur verhalende dubbele cameraregistratie",
      multiDayLabel: "Meerdaagse Europese Bestemmingstour",
      multiDaySub: "Amsterdam + Parijs / Zwitserse Alpen / Comomeer",
      locationTitle: "Geografische Locatie",
      locAmsterdam: "Historisch Amsterdam & Grachten",
      locNetherlands: "Nederlandse Kastelen & Keukenhof",
      locEurope: "Pan-Europese Bestemmingstour",
      addonsTitle: "Cinematografie & Fine Art Modules",
      droneWeddingLabel: "Gecertificeerde Drone Luchtopnamen",
      droneWeddingSub: "Overzicht van historische kastelen en landgoederen",
      filmPhotoLabel: "Kodak Portra Middenformaat Analoge Film",
      filmPhotoSub: "Klassieke filmkorrel en tijdloze optische kleuren"
    },
    software: {
      scopeTitle: "Ontwikkelingsomvang & Architectuur",
      mvpLabel: "Agile MVP Prototype",
      mvpSub: "Snelle livegang in React/Next.js/Node",
      fullCustomLabel: "Volledig Bedrijfsplatform",
      fullCustomSub: "Complexe backend, multi-rol & RBAC",
      migrationLabel: "Cloud-Native Modernisering",
      migrationSub: "Docker, microservices & SLA upgrade",
      scaleTitle: "SLA & Infrastructuur Tier",
      smbLabel: "Groeifase (Standaard Cloud Hosting)",
      enterpriseLabel: "Enterprise Hoge Beschikbaarheid (24/7 SLA & Beheer)"
    }
  },
  zh: {
    modalTitle: "业务交付范围与可行性评估器",
    modalSubtitle: "YEAH Agency Amsterdam · 荷兰出海方案与高端制作规划",
    scopeTierLabel: "项目定位与规模等级",
    pricingModelLabel: "报价核算模式",
    itemizedQuoteNote: "需求评估后出具明细核算单",
    estimatedTimelineLabel: "预估交付/办理周期",
    crewAllocationLabel: "专业团队与资源配置",
    deliverablesLabel: "核心交付成果与要点清单",
    itemsUnit: "项",
    copyButton: "一键复制方案简报 (直接粘贴发我)",
    copiedButton: "方案简报已复制到剪贴板！",
    defaultMailButton: "默认邮件客户端发送",
    webGmailButton: "网页 Gmail 发送",
    disclaimer: "* 本测算仅作为项目可行性与交付范围框架。收到具体需求简报后，阿姆斯特丹事务所将在 24 小时内出具正式明细报价单，按实际工时与专业资源透明核算。",
    tabs: {
      consulting: "01. 荷兰设立与 KvK",
      video: "02. 商业影视与纪录片",
      wedding: "03. 欧洲婚礼与电影",
      software: "04. 企业软件与系统开发"
    },
    consulting: {
      entityTypeTitle: "设立法律主体类型",
      branchLabel: "分公司",
      branchSub: "国内母公司直接境外分支 (KvK登记)",
      bvLabel: "荷兰 BV 有限公司",
      bvSub: "独立法人资格，欧洲主流投资实体",
      liaisonLabel: "联络代表处",
      liaisonSub: "非营业性质，用于前期商务联络",
      modulesTitle: "合规与运营模块增选",
      addressLabel: "阿姆斯特丹核心商务区合规法定注册地址",
      addressSub: "Zuidas / 运河商圈法定地址，含官方信函代收",
      visaLabel: "荷兰移民局 IND 担保资质 / 跨国派遣签证",
      visaSub: "高技术移民雇主资质认证及核心骨干签证",
      eprLabel: "荷兰环保包装法 (Afvalfonds) 及 WEEE 申报代码",
      eprSub: "跨境贸易与欧陆合规准入法定备案",
      urgencyTitle: "办理优先级与排期",
      urgencyStandard: "标准推进流程 (2-4 周)",
      urgencyUrgent: "加急绿色通道 (1-2 周)"
    },
    video: {
      typeTitle: "影视拍摄形式与传播目标",
      commercialLabel: "品牌商业广告 TVC",
      commercialSub: "高质感视觉大片与品牌主视觉",
      documentaryLabel: "企业深度纪录片",
      documentarySub: "品牌创业历程与思想领袖访谈",
      eventLabel: "欧洲峰会盛典记录",
      eventSub: "多机位大会直播与快剪精华短片",
      interviewLabel: "高管思想专访",
      interviewSub: "专业演播室布光与 4K 广播级收音",
      daysTitle: "拍摄执行天数",
      dayUnit: "天 现场实拍",
      addonsTitle: "影视级设备与团队增配",
      cinemaGearLabel: "ARRI / RED 电影机系统 + 电影定焦镜头组",
      cinemaGearSub: "顶级电影质感 vs. 索尼 FX 系列机动配置",
      droneLabel: "欧洲民航 EASA 认证专业航拍执飞",
      droneSub: "持证飞手与合法空域申报许可",
      colorGradingLabel: "DaVinci Resolve 达芬奇电影级调色与母带混音",
      colorGradingSub: "胶片级色彩科学与声音工程母带"
    },
    wedding: {
      packageTitle: "婚礼与旅拍微电影套餐",
      elopementLabel: "双人私密漫步旅拍 (Elopement)",
      elopementSub: "半天/全天 阿姆斯特丹经典运河定制漫步",
      fullDayLabel: "全天定制婚礼电影 (Full Day)",
      fullDaySub: "10-12 小时双机位深度记录叙事长片",
      multiDayLabel: "跨国多日欧陆尊享旅拍 (Multi-Day)",
      multiDaySub: "阿姆斯特丹 + 巴黎 / 瑞士雪山 / 意大利科莫湖",
      locationTitle: "拍摄地理范围",
      locAmsterdam: "阿姆斯特丹经典运河老城",
      locNetherlands: "荷兰古典城堡与郁金香花海",
      locEurope: "欧洲跨国旅拍与异地协调",
      addonsTitle: "电影质感与艺术增配",
      droneWeddingLabel: "欧洲认证无人机全景航拍",
      droneWeddingSub: "庄园城堡宏大远景俯瞰记录",
      filmPhotoLabel: "柯达中画幅人文胶片 (Kodak Portra)",
      filmPhotoSub: "经典中画幅真实颗粒感与光学色调"
    },
    software: {
      scopeTitle: "系统研发范围与技术定位",
      mvpLabel: "敏捷验证 MVP",
      mvpSub: "极速交付核心可用产品 (React/Next/Node)",
      fullCustomLabel: "全功能定制业务中台",
      fullCustomSub: "前后端全套架构、复杂业务逻辑与多角色权限",
      migrationLabel: "云原生与微服务架构升级",
      migrationSub: "Docker 容器化改造与高并发优化",
      scaleTitle: "SLA 可用性与运维等级",
      smbLabel: "标准云端托管 (敏捷成长型)",
      enterpriseLabel: "企业级高可用 (7×24 SLA 响应与长期维保)"
    }
  }
};

export const EstimateCalculatorModal: React.FC<EstimateCalculatorModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = "consulting",
}) => {
  const [lang, setLang] = useState<EstimatorLanguage>("en");
  const [category, setCategory] = useState<ServiceCategory>(defaultCategory);
  const [copied, setCopied] = useState(false);

  // Consulting options
  const [entityType, setEntityType] = useState<"branch" | "bv" | "liaison">("branch");
  const [needAddress, setNeedAddress] = useState<boolean>(true);
  const [needVisa, setNeedVisa] = useState<boolean>(true);
  const [needEpr, setNeedEpr] = useState<boolean>(false);
  const [consultingUrgency, setConsultingUrgency] = useState<"standard" | "urgent">("standard");

  // Video options
  const [videoType, setVideoType] = useState<"commercial" | "documentary" | "event" | "interview">("commercial");
  const [shootingDays, setShootingDays] = useState<number>(2);
  const [needCinemaGear, setNeedCinemaGear] = useState<boolean>(true);
  const [needDrone, setNeedDrone] = useState<boolean>(true);
  const [needColorGrading, setNeedColorGrading] = useState<boolean>(true);

  // Wedding options
  const [weddingPackage, setWeddingPackage] = useState<"elopement" | "full_day" | "multi_day">("full_day");
  const [weddingLocation, setWeddingLocation] = useState<"amsterdam" | "netherlands" | "europe">("amsterdam");
  const [needDroneWedding, setNeedDroneWedding] = useState<boolean>(true);
  const [needFilmPhotography, setNeedFilmPhotography] = useState<boolean>(false);

  // Software options
  const [softwareScope, setSoftwareScope] = useState<"mvp" | "full_custom" | "cloud_migration">("mvp");
  const [softwareScale, setSoftwareScale] = useState<"smb" | "enterprise">("smb");

  // Synchronize when defaultCategory changes
  React.useEffect(() => {
    if (defaultCategory) setCategory(defaultCategory);
  }, [defaultCategory]);

  const t = I18N[lang];

  // Dynamic calculations: qualitative scope tiers and deliverables (NO explicit price ranges)
  const calculation = useMemo(() => {
    let tierTitle = "";
    let complexityBadge = "";
    let tierDescription = "";
    let timelineText = "";
    let crewText = "";
    let checklist: string[] = [];

    if (category === "consulting") {
      if (lang === "en") {
        tierTitle = entityType === "branch" 
          ? "Dutch Branch Office Formation (KvK Filiaal)" 
          : entityType === "bv" 
          ? "Independent Dutch BV Corporate Structure" 
          : "Dutch Commercial Liaison Office";
        
        complexityBadge = consultingUrgency === "urgent" ? "Fast-Track Priority" : "Turnkey Corporate Tier";
        tierDescription = entityType === "branch"
          ? "Comprehensive overseas expansion structure preserving existing parent branding with direct KvK branch filing."
          : entityType === "bv"
          ? "Autonomous legal entity under Dutch corporate law, qualified for European enterprise agreements and banking."
          : "Streamlined non-trading representation for European market intelligence and vendor coordination.";

        timelineText = consultingUrgency === "urgent" ? "1 - 2 Weeks" : "2 - 4 Weeks";
        crewText = "Corporate Legal Specialist · Notary Liaison · KvK Registrar Agent";

        if (entityType === "branch") {
          checklist.push("Parent company articles & notarized Dutch/English Apostille coordination");
          checklist.push("Official Netherlands Chamber of Commerce (KvK) statutory registration");
        } else if (entityType === "bv") {
          checklist.push("Dutch Civil Law Notary deed drafting, execution & statutory validation");
          checklist.push("Shareholders registry, UBO declaration & managing director filings");
        } else {
          checklist.push("Representative office KvK dossier filing & administrative onboarding");
        }

        if (needAddress) {
          checklist.push("Amsterdam Prime Business Address (KvK compliant statutory registered office)");
        }
        if (needVisa) {
          checklist.push("IND recognized sponsor qualification & executive intra-company relocation permits");
        }
        if (needEpr) {
          checklist.push("EPR Afvalfonds packaging compliance registry & European WEEE certification");
        }
        if (consultingUrgency === "urgent") {
          checklist.push("Priority fast-track processing with dedicated case manager");
        }
      } else if (lang === "nl") {
        tierTitle = entityType === "branch" 
          ? "Oprichting Nevenvestiging in Nederland (KvK Filiaal)" 
          : entityType === "bv" 
          ? "Zelfstandige Nederlandse BV Bedrijfsstructuur" 
          : "Nederlands Vertegenwoordigingskantoor";
        
        complexityBadge = consultingUrgency === "urgent" ? "Spoedtraject Prioriteit" : "Turnkey Ondernemingsniveau";
        tierDescription = entityType === "branch"
          ? "Volledige internationale uitbreiding met behoud van de bestaande merkidentiteit en directe KvK-inschrijving."
          : entityType === "bv"
          ? "Zelfstandige rechtspersoon naar Nederlands recht, geschikt voor Europese contracten en bankrelaties."
          : "Vereenvoudigde niet-commerciële aanwezigheid voor marktonderzoek en Europese partnerrelaties.";

        timelineText = consultingUrgency === "urgent" ? "1 - 2 Weken" : "2 - 4 Weken";
        crewText = "Bedrijfsjurist · Notaris Liaison · KvK Registratie-expert";

        if (entityType === "branch") {
          checklist.push("Statuten moederbedrijf, beëdigde vertaling & apostillering");
          checklist.push("Officiële Kamer van Koophandel (KvK) registratie nevenvestiging");
        } else if (entityType === "bv") {
          checklist.push("Oprichtingsakte door Nederlandse notaris & statutencontrole");
          checklist.push("Aandeelhoudersregister, UBO-registratie & bestuurdersaanwijzing");
        } else {
          checklist.push("Registratiedossier vertegenwoordigingskantoor bij de KvK");
        }

        if (needAddress) {
          checklist.push("Statutair vestigingsadres in Amsterdam met officiële postbehandeling");
        }
        if (needVisa) {
          checklist.push("IND erkend referentschap & kennismigranten visumaanvraag");
        }
        if (needEpr) {
          checklist.push("EPR Afvalfonds verpakkingsregistratie & WEEE milieunummers");
        }
        if (consultingUrgency === "urgent") {
          checklist.push("Geprioriteerde spoedbehandeling met vaste dossierbegeleider");
        }
      } else {
        tierTitle = entityType === "branch" 
          ? "荷兰分公司设立 (Branch Office)" 
          : entityType === "bv" 
          ? "荷兰有限责任公司 (Dutch BV) 架构" 
          : "荷兰商务代表联络处设立";
        
        complexityBadge = consultingUrgency === "urgent" ? "加急绿色通道" : "企业全周期交付级";
        tierDescription = entityType === "branch"
          ? "国内母公司直接境外分支，承载母公司海外商誉与资产，合规快速落地。"
          : entityType === "bv"
          ? "独立法人资格，欧洲主流商业架构，具备独立签署合同与开设欧洲银行账户能力。"
          : "非营业性联络驻点，适合前期欧洲市场考察、供应链联络及商机开拓。";

        timelineText = consultingUrgency === "urgent" ? "1 - 2 周" : "2 - 4 周";
        crewText = "荷兰出海合规顾问 · 执业公证人(Notaris)联络 · KvK商会法定代理人";

        if (entityType === "branch") {
          checklist.push("国内母公司营业执照中英文公证及海牙认证 (Apostille) 指引与核验");
          checklist.push("荷兰商会 KvK (Kamer van Koophandel) 分支机构法定登记备案");
        } else if (entityType === "bv") {
          checklist.push("荷兰执业公证人 (Notaris) 公司设立契约起草与法律公证");
          checklist.push("股东决议及法定代表人人选 UBO 登记备案与税号申请");
        } else {
          checklist.push("非营业性质联络处基础 KvK 登记与基础档案建档");
        }

        if (needAddress) {
          checklist.push("阿姆斯特丹核心商务区合规法定注册地址 (含信件收发与转寄服务)");
        }
        if (needVisa) {
          checklist.push("荷兰移民局 IND 担保资质认证申请 / 跨国派遣高管签证全套协同");
        }
        if (needEpr) {
          checklist.push("荷兰环保包装法 (Afvalfonds) 及 WEEE 申报代码开通合规备案");
        }
        if (consultingUrgency === "urgent") {
          checklist.push("加急通道优先排期处理，专人专属对接全流程");
        }
      }

    } else if (category === "video") {
      const isCinematic = needCinemaGear;
      
      if (lang === "en") {
        tierTitle = videoType === "commercial" 
          ? "High-Impact Commercial Campaign & TVC" 
          : videoType === "documentary" 
          ? "Corporate Documentary & Storytelling Film" 
          : videoType === "event" 
          ? "European Summit & Multi-Camera Production" 
          : "Executive Thought-Leadership Interview";

        complexityBadge = isCinematic ? "Cinema Tier (ARRI/RED)" : "Commercial Production Tier";
        tierDescription = `Tailored visual production across Amsterdam & Europe with ${shootingDays} production day(s), dedicated lighting setup and post-production mastery.`;
        timelineText = `${shootingDays + 1} - ${shootingDays + 3} Weeks`;
        crewText = `Director · Director of Photography (DP) · Gaffer · Sound Recordist · Drone Pilot`;

        checklist.push(`${shootingDays} Day(s) On-Set Principal Photography with bilingual European crew`);
        checklist.push(needCinemaGear ? "ARRI / RED cinema camera system with cinema prime lenses" : "Sony FX series full-frame multi-camera system");
        if (needDrone) checklist.push("EASA certified commercial aerial drone filming with air permits");
        if (needColorGrading) checklist.push("DaVinci Resolve theatrical color grading & mastered audio mix");
      } else if (lang === "nl") {
        tierTitle = videoType === "commercial" 
          ? "Hoogwaardige Commerciële Merkcampagne & TVC" 
          : videoType === "documentary" 
          ? "Bedrijfsdocumentaire & Merkverhaal" 
          : videoType === "event" 
          ? "Europese Topconferentie & Meercamera Productie" 
          : "Executive & Leiderschapsinterview";

        complexityBadge = isCinematic ? "Cinema Niveau (ARRI/RED)" : "Commercieel Productieniveau";
        tierDescription = `Op maat gemaakte filmproductie in Amsterdam en Europa met ${shootingDays} draaidag(en), professionele belichting en postproductie.`;
        timelineText = `${shootingDays + 1} - ${shootingDays + 3} Weken`;
        crewText = `Regisseur · Director of Photography (DP) · Gaffer · Geluidstechnicus · Dronepiloot`;

        checklist.push(`${shootingDays} Draaidag(en) op locatie met tweetalige Europese filmploeg`);
        checklist.push(needCinemaGear ? "ARRI / RED bioscoopcamerasysteem met prime lenzen" : "Sony FX-serie full-frame multi-camerasysteem");
        if (needDrone) checklist.push("EASA gecertificeerde commerciële drone-opnamen met vergunningen");
        if (needColorGrading) checklist.push("DaVinci Resolve bioscoopkleurcorrectie & gemasterde audio mix");
      } else {
        tierTitle = videoType === "commercial" 
          ? "阿姆斯特丹商业影视广告与 TVC 大片" 
          : videoType === "documentary" 
          ? "品牌深度纪实与企业纪录片" 
          : videoType === "event" 
          ? "欧洲峰会活动与全景纪实" 
          : "高管思想领袖深度专访";

        complexityBadge = isCinematic ? "院线电影级配置 (ARRI/RED)" : "商业广告专业级";
        tierDescription = `阿姆斯特丹及欧陆现场影视级拍摄，规划 ${shootingDays} 天实拍，配置专业灯光组、电影级收音及全流程后期母带制作。`;
        timelineText = `${shootingDays + 1} - ${shootingDays + 3} 周`;
        crewText = `导演 · 摄影指导 (DP) · 灯光师 · 录音师 · 航拍摄影师`;

        checklist.push(`${shootingDays} 天 现场双语影视摄制组 (DP + 灯光 + 录音小组)`);
        checklist.push(needCinemaGear ? "RED / ARRI 电影机系统 + 电影定焦镜头组" : "索尼 FX 系列全画幅多机位系统");
        if (needDrone) checklist.push("欧洲民航合规无人机航拍执飞许可与专业航拍摄影师");
        if (needColorGrading) checklist.push("DaVinci Resolve 达芬奇专业电影级色彩科学与声学母带");
      }

    } else if (category === "wedding") {
      if (lang === "en") {
        tierTitle = weddingPackage === "elopement"
          ? "Intimate Amsterdam Elopement & Canal Stroll"
          : weddingPackage === "full_day"
          ? "Full-Day European Wedding Cinema Film"
          : "Multi-Day European Destination Film & Photo";

        complexityBadge = weddingPackage === "multi_day" ? "Destination Flagship" : "Editorial Cinema Tier";
        tierDescription = "Timeless narrative storytelling capturing natural emotions across historical Dutch landmarks and Europe's iconic sceneries.";
        timelineText = weddingPackage === "elopement" ? "3 - 4 Weeks" : weddingPackage === "full_day" ? "4 - 6 Weeks" : "5 - 7 Weeks";
        crewText = "Lead Wedding Cinematographer · Master Photographer · Aerial Operator";

        if (weddingPackage === "elopement") {
          checklist.push("Curated Amsterdam canal ring & hidden garden bespoke route");
          checklist.push("4K Highlight Film (3-5 min) + 60+ fully retouched editorial photographs");
        } else if (weddingPackage === "full_day") {
          checklist.push("Full 10-12 hour dual-operator coverage (Lead Photographer + Filmmaker)");
          checklist.push("Cinematic Feature Film (15-20 min) + Teaser Trailer (2-3 min) + Complete color gallery");
        } else {
          checklist.push("Two-day multi-destination journey (Amsterdam, windmills, castle or Paris/Swiss Alps)");
          checklist.push("4-operator production team + comprehensive drone recording + express teaser delivery");
        }
        if (needDroneWedding) checklist.push("EASA certified aerial panorama of castles & waterways");
        if (needFilmPhotography) checklist.push("Kodak Portra medium format analog film rolls & laboratory optical scans");
      } else if (lang === "nl") {
        tierTitle = weddingPackage === "elopement"
          ? "Intieme Amsterdam Grachten Elopement"
          : weddingPackage === "full_day"
          ? "Volledige Dag Europese Bruiloftsfilm"
          : "Meerdaagse Europese Bestemmingstour";

        complexityBadge = weddingPackage === "multi_day" ? "Bestemming Vlaggenschip" : "Redactioneel Bioscoopniveau";
        tierDescription = "Tijdloze visuele verhalen die pure emoties vastleggen langs historische Nederlandse monumenten en Europese landschappen.";
        timelineText = weddingPackage === "elopement" ? "3 - 4 Weken" : weddingPackage === "full_day" ? "4 - 6 Weken" : "5 - 7 Weken";
        crewText = "Hoofd Bruidsfilmer · Master Fotograaf · Drone Operator";

        if (weddingPackage === "elopement") {
          checklist.push("Exclusieve route langs Amsterdamse grachten en hofjes");
          checklist.push("4K Highlight Film (3-5 min) + 60+ professioneel geretoucheerde foto's");
        } else if (weddingPackage === "full_day") {
          checklist.push("10-12 uur volledige dekking met dubbele operators (Fotograaf + Filmer)");
          checklist.push("Cinematic Speelfilm (15-20 min) + Teaser (2-3 min) + Volledige galerij");
        } else {
          checklist.push("Tweedagse bestemmingsreis (Amsterdam, molens, kasteel of Parijs/Alpen)");
          checklist.push("4-persoons productieteam + drone-opnamen + spoedteaser");
        }
        if (needDroneWedding) checklist.push("EASA gecertificeerde luchtpanorama's van kastelen en grachten");
        if (needFilmPhotography) checklist.push("Kodak Portra middenformaat analoge film & laboratoriumscans");
      } else {
        tierTitle = weddingPackage === "elopement"
          ? "双人私密漫步旅拍微电影 (Elopement)"
          : weddingPackage === "full_day"
          ? "全天定制欧陆婚礼电影 (Full Day)"
          : "跨国两日尊享旅拍微电影 (Multi-Day)";

        complexityBadge = weddingPackage === "multi_day" ? "跨国旗舰尊享级" : "电影级定制人文典藏";
        tierDescription = "光影交织的人文纪实叙事，阿姆斯特丹运河、欧洲古典城堡与自然风光真实情绪记录。";
        timelineText = weddingPackage === "elopement" ? "3 - 4 周" : weddingPackage === "full_day" ? "4 - 6 周" : "5 - 7 周";
        crewText = "主创电影摄像师 · 资深人文摄影师 · 航拍飞手";

        if (weddingPackage === "elopement") {
          checklist.push("半天/全天 阿姆斯特丹经典运河与老城街景专属定制路线");
          checklist.push("4K 电影级精修微电影 (3-5分钟) + 精修照片 60+ 张");
        } else if (weddingPackage === "full_day") {
          checklist.push("全天 10-12 小时双机位 (主创摄影师 + 电影摄像师) 深度记录");
          checklist.push("电影长片剪辑 (15-20分钟) + 预告片 (2-3分钟) + 全套调色底片云端交付");
        } else {
          checklist.push("两日跨城深度记录 (阿姆斯特丹 + 荷兰城堡/巴黎/瑞士雪山)");
          checklist.push("四机位影视团队 + 无人机全景航拍 + 预告片加急交付");
        }
        if (needDroneWedding) checklist.push("欧洲民航认证无人机全景航拍记录古堡与大远景");
        if (needFilmPhotography) checklist.push("柯达中画幅人文胶片 (Kodak Portra) 经典人文拍摄与专业冲扫");
      }

    } else {
      // software
      if (lang === "en") {
        tierTitle = softwareScope === "mvp"
          ? "Agile MVP & Rapid Prototype Sprint"
          : softwareScope === "full_custom"
          ? "Enterprise Custom Web & Backend Platform"
          : "Cloud-Native Architecture Modernization";

        complexityBadge = softwareScale === "enterprise" ? "Enterprise SLA Tier" : "Agile Engineering Tier";
        tierDescription = "Engineered on modern TypeScript, React, Next.js, and cloud-native architecture with GDPR compliance built-in.";
        timelineText = softwareScope === "mvp" ? "3 - 5 Weeks" : softwareScope === "full_custom" ? "6 - 10 Weeks" : "4 - 7 Weeks";
        crewText = "Lead Full-Stack Architect · UI/UX Designer · DevOps Engineer";

        if (softwareScope === "mvp") {
          checklist.push("Modern React/Next.js/Node.js responsive application architecture");
          checklist.push("Cloud deployment (GCP / AWS / Vercel) with CI/CD automation");
        } else if (softwareScope === "full_custom") {
          checklist.push("Full-stack engineering, scalable database schemas & multi-role RBAC");
          checklist.push("GDPR compliance hardening, audit logs & automated testing suite");
        } else {
          checklist.push("Containerization (Docker / K8s), zero-downtime data migration & observability");
        }
        if (softwareScale === "enterprise") {
          checklist.push("Enterprise High-Availability SLA architecture & 12-month maintenance retainer");
        }
      } else if (lang === "nl") {
        tierTitle = softwareScope === "mvp"
          ? "Agile MVP & Snelle Prototype Sprint"
          : softwareScope === "full_custom"
          ? "Enterprise Maatwerk Web & Backend Platform"
          : "Cloud-Native Architectuur Modernisering";

        complexityBadge = softwareScale === "enterprise" ? "Enterprise SLA Niveau" : "Agile Engineering Niveau";
        tierDescription = "Ontwikkeld in modern TypeScript, React, Next.js en cloud-native architecturen met ingebouwde AVG/GDPR-naleving.";
        timelineText = softwareScope === "mvp" ? "3 - 5 Weken" : softwareScope === "full_custom" ? "6 - 10 Weken" : "4 - 7 Weken";
        crewText = "Lead Full-Stack Architect · UI/UX Designer · DevOps Engineer";

        if (softwareScope === "mvp") {
          checklist.push("Moderne React/Next.js/Node.js responsieve applicatie-architectuur");
          checklist.push("Cloud deployment (GCP / AWS / Vercel) met geautomatiseerde CI/CD");
        } else if (softwareScope === "full_custom") {
          checklist.push("Full-stack engineering, schaalbare database & multi-rol RBAC autorisatie");
          checklist.push("AVG/GDPR privacy-beveiliging, audit logs & geautomatiseerde testsuite");
        } else {
          checklist.push("Containerisatie (Docker / K8s), datamigratie zonder downtime & monitoring");
        }
        if (softwareScale === "enterprise") {
          checklist.push("Enterprise High-Availability SLA & 12 maanden onderhoudscontract");
        }
      } else {
        tierTitle = softwareScope === "mvp"
          ? "核心原型与 MVP 敏捷极速验证"
          : softwareScope === "full_custom"
          ? "企业级全功能定制数字化中台系统"
          : "云原生与微服务架构升级改造";

        complexityBadge = softwareScale === "enterprise" ? "企业级高可用 SLA" : "敏捷工程级交付";
        tierDescription = "基于现代化 React, Next.js, Node.js 及云原生高可靠体系，原生符合欧洲 GDPR 数据合规要求。";
        timelineText = softwareScope === "mvp" ? "3 - 5 周" : softwareScope === "full_custom" ? "6 - 10 周" : "4 - 7 周";
        crewText = "全栈架构师 · UI/UX 设计师 · DevOps 云计算工程师";

        if (softwareScope === "mvp") {
          checklist.push("现代化 React/Next.js/Node.js 极速原型开发与响应式交互系统");
          checklist.push("云端部署 (GCP / AWS / Vercel) 与自动化 CI/CD 流水线");
        } else if (softwareScope === "full_custom") {
          checklist.push("前后端完整工程体系、高并发数据库架构设计与多角色 RBAC 权限系统");
          checklist.push("欧盟 GDPR 数据隐私安全加固、操作审计日志与自动化测试套件");
        } else {
          checklist.push("容器化改造 (Docker / K8s)、平滑无停机数据迁移与全链路监控系统");
        }
        if (softwareScale === "enterprise") {
          checklist.push("企业级高可用 SLA 架构设计与 12 个月技术维保支持保障");
        }
      }
    }

    return {
      tierTitle,
      complexityBadge,
      tierDescription,
      timelineText,
      crewText,
      checklist
    };
  }, [
    category,
    lang,
    entityType,
    needAddress,
    needVisa,
    needEpr,
    consultingUrgency,
    videoType,
    shootingDays,
    needCinemaGear,
    needDrone,
    needColorGrading,
    weddingPackage,
    weddingLocation,
    needDroneWedding,
    needFilmPhotography,
    softwareScope,
    softwareScale
  ]);

  // Multilingual Brief text generation WITHOUT explicit prices
  const summaryBrief = useMemo(() => {
    if (lang === "en") {
      return `【YEAH Agency Amsterdam · Project Scope & Feasibility Brief】
Practice Domain: ${category.toUpperCase()} - ${calculation.tierTitle}
Engagement Tier: ${calculation.complexityBadge}
Estimated Turnaround: ${calculation.timelineText}
Team & Resource Allocation: ${calculation.crewText}

Key Deliverables & Specifications:
${calculation.checklist.map((c, i) => `${i + 1}. ${c}`).join("\n")}

Pricing Model: Line-Item Dedicated Proposal upon Brief Review
Client Action: Request custom quote / Schedule introductory discussion
Source: YEAH Agency Amsterdam (yeah-amsterdam.nl)`;
    } else if (lang === "nl") {
      return `【YEAH Agency Amsterdam · Project Scope & Haalbaarheidsbriefing】
Domein: ${category.toUpperCase()} - ${calculation.tierTitle}
Projectniveau: ${calculation.complexityBadge}
Geschatte Doorlooptijd: ${calculation.timelineText}
Team- & Middelenallocatie: ${calculation.crewText}

Kernopleveringen & Specificaties:
${calculation.checklist.map((c, i) => `${i + 1}. ${c}`).join("\n")}

Tarievenstructuur: Gespecificeerde offerte op maat na briefingbeoordeling
Klantvraag: Offerte op maat aanvragen / Kennismakingsgesprek inplannen
Bron: YEAH Agency Amsterdam (yeah-amsterdam.nl)`;
    } else {
      return `【YEAH Agency Amsterdam 业务需求与可行性简报】
业务领域: ${category.toUpperCase()} - ${calculation.tierTitle}
项目定位与规模: ${calculation.complexityBadge}
预估交付/办理周期: ${calculation.timelineText}
团队与资源配置: ${calculation.crewText}

包含核心范围与要点清单:
${calculation.checklist.map((c, i) => `${i + 1}. ${c}`).join("\n")}

报价核算方式: 需求评估后出具明细核算单 (按实际工时与专业资源透明核算)
客户意向: 咨询详细定制方案 / 预约前期沟通
来源: YEAH Agency Amsterdam (yeah-amsterdam.nl)`;
    }
  }, [calculation, category, lang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const subjectText = lang === "en" 
    ? `[Project Inquiry] ${calculation.tierTitle}` 
    : lang === "nl" 
    ? `[Projectaanvraag] ${calculation.tierTitle}` 
    : `[业务咨询意向] ${calculation.tierTitle}`;

  const mailtoHref = `mailto:info@yeah-amsterdam.nl?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(summaryBrief)}`;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-neutral-950 border border-white/20 rounded-xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-white/10 text-emerald-400">
                <Calculator size={18} />
              </div>
              <div>
                <h3 className="font-serif text-lg tracking-wide text-white">
                  {t.modalTitle}
                </h3>
                <p className="text-xs font-mono text-gray-400">
                  {t.modalSubtitle}
                </p>
              </div>
            </div>

            {/* Language Switcher + Close */}
            <div className="flex items-center gap-3">
              {/* Multilingual Selector */}
              <div className="flex items-center bg-white/5 border border-white/15 rounded-lg p-0.5 text-xs font-mono">
                <div className="px-1.5 py-0.5 text-gray-400 flex items-center gap-1">
                  <Globe size={11} />
                </div>
                {(["en", "nl", "zh"] as EstimatorLanguage[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2 py-0.5 rounded transition-all text-[11px] font-medium cursor-pointer ${
                      lang === l 
                        ? "bg-emerald-500 text-black font-semibold shadow" 
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {l === "en" ? "EN" : l === "nl" ? "NL" : "中文"}
                  </button>
                ))}
              </div>

              <button 
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex border-b border-white/10 bg-black/40 overflow-x-auto text-xs font-mono">
            {[
              { id: "consulting", label: t.tabs.consulting, icon: Building2 },
              { id: "video", label: t.tabs.video, icon: Video },
              { id: "wedding", label: t.tabs.wedding, icon: Camera },
              { id: "software", label: t.tabs.software, icon: Code2 }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = category === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCategory(tab.id as ServiceCategory)}
                  className={`flex-1 min-w-[170px] py-3 px-4 flex items-center justify-center gap-2 transition-all border-b-2 cursor-pointer ${
                    isActive 
                      ? "border-emerald-400 text-white bg-white/[0.04] font-medium" 
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/[0.02]"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-emerald-400" : "text-gray-500"} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Body: Two Column Layout */}
          <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            
            {/* Left Controls Column */}
            <div className="lg:col-span-7 p-6 space-y-6">
              
              {/* Consulting Config */}
              {category === "consulting" && (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-300 block mb-2">
                      {t.consulting.entityTypeTitle}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "branch", label: t.consulting.branchLabel, sub: t.consulting.branchSub },
                        { id: "bv", label: t.consulting.bvLabel, sub: t.consulting.bvSub },
                        { id: "liaison", label: t.consulting.liaisonLabel, sub: t.consulting.liaisonSub },
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => setEntityType(item.id as any)}
                          className={`p-3 rounded text-left border transition-all cursor-pointer ${
                            entityType === item.id 
                              ? "border-emerald-500 bg-emerald-500/10 text-white" 
                              : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20"
                          }`}
                        >
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5 leading-snug">{item.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-300 block">
                      {t.consulting.modulesTitle}
                    </label>
                    
                    <label className="flex items-center justify-between p-3 rounded border border-white/10 bg-white/[0.02] cursor-pointer hover:border-white/20 transition-colors">
                      <div>
                        <div className="text-sm text-white">{t.consulting.addressLabel}</div>
                        <div className="text-xs text-gray-400">{t.consulting.addressSub}</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={needAddress} 
                        onChange={e => setNeedAddress(e.target.checked)}
                        className="w-4 h-4 accent-emerald-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded border border-white/10 bg-white/[0.02] cursor-pointer hover:border-white/20 transition-colors">
                      <div>
                        <div className="text-sm text-white">{t.consulting.visaLabel}</div>
                        <div className="text-xs text-gray-400">{t.consulting.visaSub}</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={needVisa} 
                        onChange={e => setNeedVisa(e.target.checked)}
                        className="w-4 h-4 accent-emerald-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded border border-white/10 bg-white/[0.02] cursor-pointer hover:border-white/20 transition-colors">
                      <div>
                        <div className="text-sm text-white">{t.consulting.eprLabel}</div>
                        <div className="text-xs text-gray-400">{t.consulting.eprSub}</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={needEpr} 
                        onChange={e => setNeedEpr(e.target.checked)}
                        className="w-4 h-4 accent-emerald-500 cursor-pointer"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-300 block mb-2">
                      {t.consulting.urgencyTitle}
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <button
                        onClick={() => setConsultingUrgency("standard")}
                        className={`p-2.5 rounded border text-left cursor-pointer transition-colors ${
                          consultingUrgency === "standard" 
                            ? "border-emerald-500 bg-emerald-500/10 text-white" 
                            : "border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        {t.consulting.urgencyStandard}
                      </button>
                      <button
                        onClick={() => setConsultingUrgency("urgent")}
                        className={`p-2.5 rounded border text-left cursor-pointer transition-colors ${
                          consultingUrgency === "urgent" 
                            ? "border-emerald-500 bg-emerald-500/10 text-white" 
                            : "border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        {t.consulting.urgencyUrgent}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Video Config */}
              {category === "video" && (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-300 block mb-2">
                      {t.video.typeTitle}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: "commercial", label: t.video.commercialLabel, sub: t.video.commercialSub },
                        { id: "documentary", label: t.video.documentaryLabel, sub: t.video.documentarySub },
                        { id: "event", label: t.video.eventLabel, sub: t.video.eventSub },
                        { id: "interview", label: t.video.interviewLabel, sub: t.video.interviewSub },
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => setVideoType(item.id as any)}
                          className={`p-3 rounded text-left border transition-all cursor-pointer ${
                            videoType === item.id 
                              ? "border-emerald-500 bg-emerald-500/10 text-white" 
                              : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20"
                          }`}
                        >
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5 leading-snug">{item.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-gray-300">
                        {t.video.daysTitle}
                      </label>
                      <span className="text-xs font-mono text-emerald-400">
                        {shootingDays} {t.video.dayUnit}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 5].map(days => (
                        <button
                          key={days}
                          onClick={() => setShootingDays(days)}
                          className={`flex-1 py-2 rounded text-xs font-mono border transition-all cursor-pointer ${
                            shootingDays === days 
                              ? "border-emerald-500 bg-emerald-500/10 text-white font-medium" 
                              : "border-white/10 text-gray-400 hover:border-white/20"
                          }`}
                        >
                          {days} {lang === "en" ? "Day" : lang === "nl" ? "Dag" : "天"}{days > 1 && lang === "en" ? "s" : ""}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-300 block">
                      {t.video.addonsTitle}
                    </label>

                    <label className="flex items-center justify-between p-3 rounded border border-white/10 bg-white/[0.02] cursor-pointer hover:border-white/20 transition-colors">
                      <div>
                        <div className="text-sm text-white">{t.video.cinemaGearLabel}</div>
                        <div className="text-xs text-gray-400">{t.video.cinemaGearSub}</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={needCinemaGear} 
                        onChange={e => setNeedCinemaGear(e.target.checked)}
                        className="w-4 h-4 accent-emerald-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded border border-white/10 bg-white/[0.02] cursor-pointer hover:border-white/20 transition-colors">
                      <div>
                        <div className="text-sm text-white">{t.video.droneLabel}</div>
                        <div className="text-xs text-gray-400">{t.video.droneSub}</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={needDrone} 
                        onChange={e => setNeedDrone(e.target.checked)}
                        className="w-4 h-4 accent-emerald-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded border border-white/10 bg-white/[0.02] cursor-pointer hover:border-white/20 transition-colors">
                      <div>
                        <div className="text-sm text-white">{t.video.colorGradingLabel}</div>
                        <div className="text-xs text-gray-400">{t.video.colorGradingSub}</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={needColorGrading} 
                        onChange={e => setNeedColorGrading(e.target.checked)}
                        className="w-4 h-4 accent-emerald-500 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Wedding Config */}
              {category === "wedding" && (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-300 block mb-2">
                      {t.wedding.packageTitle}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "elopement", label: t.wedding.elopementLabel, sub: t.wedding.elopementSub },
                        { id: "full_day", label: t.wedding.fullDayLabel, sub: t.wedding.fullDaySub },
                        { id: "multi_day", label: t.wedding.multiDayLabel, sub: t.wedding.multiDaySub },
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => setWeddingPackage(item.id as any)}
                          className={`p-3 rounded text-left border transition-all cursor-pointer ${
                            weddingPackage === item.id 
                              ? "border-emerald-500 bg-emerald-500/10 text-white" 
                              : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20"
                          }`}
                        >
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5 leading-snug">{item.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-300 block mb-2">
                      {t.wedding.locationTitle}
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                      {[
                        { id: "amsterdam", label: t.wedding.locAmsterdam },
                        { id: "netherlands", label: t.wedding.locNetherlands },
                        { id: "europe", label: t.wedding.locEurope },
                      ].map(loc => (
                        <button
                          key={loc.id}
                          onClick={() => setWeddingLocation(loc.id as any)}
                          className={`p-2.5 rounded border text-left cursor-pointer transition-colors ${
                            weddingLocation === loc.id 
                              ? "border-emerald-500 bg-emerald-500/10 text-white" 
                              : "border-white/10 text-gray-400 hover:border-white/20"
                          }`}
                        >
                          {loc.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-300 block">
                      {t.wedding.addonsTitle}
                    </label>

                    <label className="flex items-center justify-between p-3 rounded border border-white/10 bg-white/[0.02] cursor-pointer hover:border-white/20 transition-colors">
                      <div>
                        <div className="text-sm text-white">{t.wedding.droneWeddingLabel}</div>
                        <div className="text-xs text-gray-400">{t.wedding.droneWeddingSub}</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={needDroneWedding} 
                        onChange={e => setNeedDroneWedding(e.target.checked)}
                        className="w-4 h-4 accent-emerald-500 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded border border-white/10 bg-white/[0.02] cursor-pointer hover:border-white/20 transition-colors">
                      <div>
                        <div className="text-sm text-white">{t.wedding.filmPhotoLabel}</div>
                        <div className="text-xs text-gray-400">{t.wedding.filmPhotoSub}</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={needFilmPhotography} 
                        onChange={e => setNeedFilmPhotography(e.target.checked)}
                        className="w-4 h-4 accent-emerald-500 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Software Config */}
              {category === "software" && (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-300 block mb-2">
                      {t.software.scopeTitle}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "mvp", label: t.software.mvpLabel, sub: t.software.mvpSub },
                        { id: "full_custom", label: t.software.fullCustomLabel, sub: t.software.fullCustomSub },
                        { id: "cloud_migration", label: t.software.migrationLabel, sub: t.software.migrationSub },
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => setSoftwareScope(item.id as any)}
                          className={`p-3 rounded text-left border transition-all cursor-pointer ${
                            softwareScope === item.id 
                              ? "border-emerald-500 bg-emerald-500/10 text-white" 
                              : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20"
                          }`}
                        >
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5 leading-snug">{item.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-gray-300 block mb-2">
                      {t.software.scaleTitle}
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <button
                        onClick={() => setSoftwareScale("smb")}
                        className={`p-3 rounded border text-left cursor-pointer transition-colors ${
                          softwareScale === "smb" 
                            ? "border-emerald-500 bg-emerald-500/10 text-white" 
                            : "border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        {t.software.smbLabel}
                      </button>
                      <button
                        onClick={() => setSoftwareScale("enterprise")}
                        className={`p-3 rounded border text-left cursor-pointer transition-colors ${
                          softwareScale === "enterprise" 
                            ? "border-emerald-500 bg-emerald-500/10 text-white" 
                            : "border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        {t.software.enterpriseLabel}
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Right Result Column: Qualitative & Scope Driven (NO explicit prices) */}
            <div className="lg:col-span-5 p-6 bg-white/[0.01] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">
                    {t.scopeTierLabel}
                  </span>
                  <h4 className="font-serif text-lg text-white">
                    {calculation.tierTitle}
                  </h4>
                </div>

                {/* Scope & Engagement Tier Card (NO explicit price figures) */}
                <div className="p-4 rounded-lg bg-neutral-900 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                      <Sparkles size={13} />
                      {t.scopeTierLabel}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {calculation.complexityBadge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {calculation.tierDescription}
                  </p>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">{t.pricingModelLabel}:</span>
                    <span className="text-white font-medium">{t.itemizedQuoteNote}</span>
                  </div>
                </div>

                {/* Turnaround Timeline */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/10">
                  <Clock size={16} className="text-emerald-400 flex-shrink-0" />
                  <div className="text-xs font-mono">
                    <span className="text-gray-400">{t.estimatedTimelineLabel}: </span>
                    <span className="text-white font-medium">{calculation.timelineText}</span>
                  </div>
                </div>

                {/* Resource Allocation */}
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 space-y-1">
                  <div className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
                    <Layers size={13} className="text-emerald-400 flex-shrink-0" />
                    <span>{t.crewAllocationLabel}</span>
                  </div>
                  <div className="text-xs text-gray-200 font-mono">
                    {calculation.crewText}
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                    {t.deliverablesLabel} ({calculation.checklist.length} {t.itemsUnit})
                  </span>
                  <ul className="space-y-2 max-h-36 overflow-y-auto pr-2 text-xs">
                    {calculation.checklist.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300">
                        <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <button
                  onClick={handleCopy}
                  className="w-full py-2.5 px-4 rounded text-xs font-mono uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span>{t.copiedButton}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>{t.copyButton}</span>
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={mailtoHref}
                    className="py-2.5 px-4 rounded text-xs font-mono uppercase tracking-wider bg-white text-black hover:bg-gray-200 transition-all font-medium flex items-center justify-center gap-1.5 cursor-pointer text-center"
                  >
                    <Mail size={13} />
                    <span>{t.defaultMailButton}</span>
                  </a>

                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=info@yeah-amsterdam.nl&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(summaryBrief)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-4 rounded text-xs font-mono uppercase tracking-wider bg-red-600/90 hover:bg-red-600 text-white transition-all font-medium flex items-center justify-center gap-1.5 cursor-pointer text-center"
                  >
                    <span>{t.webGmailButton}</span>
                  </a>
                </div>
                
                <div className="text-[10px] text-center font-mono text-gray-400 leading-normal">
                  {t.disclaimer}
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
