export interface GuideSection {
  title: string;
  subtitle?: string;
  content: string;
  bulletPoints?: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  calloutBox?: {
    type: "info" | "warning" | "tip";
    text: string;
  };
}

export interface DetailedGuide {
  slug: string;
  category: string;
  badge: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  heroImage: string;
  readTime: string;
  updatedDate: string;
  highlights: { label: string; value: string }[];
  introduction: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  relatedPracticeId: string;
  relatedPracticeName: string;
  canonicalUrl: string;
}

export const DETAILED_GUIDES: DetailedGuide[] = [
  // 1. 荷兰开分公司全流程实操指南
  {
    slug: "dutch-branch-office-formation",
    category: "Corporate Consulting · 出海与合规",
    badge: "2026 最新官方指南 · 荷兰分公司与BV设立",
    title: "荷兰开分公司全流程实操指南：分公司 (Branch Office) vs 荷兰BV子公司深度对比、商会KvK注册、税务与外派员工工作签证",
    subtitle: "中国及跨国企业在荷兰设立分支机构的法律架构、公证海牙认证流程、增值税BTW开户、EPR包装法合规与人员派遣全套落地手册。",
    metaTitle: "荷兰开分公司指南2026 | 外资企业设立分公司流程、KvK注册、税务与外派员工签证 · YEAH Agency",
    metaDescription: "详解中国企业在荷兰开分公司(Branch Office / Bijkantoor)全流程：分公司与荷兰BV优劣对比、KvK商会公证海牙认证清单、BTW增值税开户、高技术移民与跨国派遣工签、EPR合规托管。阿姆斯特丹本地专业顾问一站式服务。",
    keywords: "荷兰开分公司, 荷兰分公司设立, 荷兰开分公司流程, 荷兰BV注册, 荷兰商会KvK分公司注册, 荷兰设立办事处, 荷兰外派员工签证, 荷兰高技术移民派遣, 荷兰BTW税号, 荷兰企业所得税, 欧洲总部设在荷兰, EPR包装法荷兰",
    heroImage: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=2070&auto=format&fit=crop",
    readTime: "12 分钟深度阅读",
    updatedDate: "2026年10月最新更新",
    relatedPracticeId: "business-consulting",
    relatedPracticeName: "01. Corporate Consulting (企业咨询)",
    canonicalUrl: "https://yeah-amsterdam.nl/guides/dutch-branch-office-formation",
    highlights: [
      { label: "设立周期", value: "2 - 4 周完成商会登记" },
      { label: "注册资本", value: "€0 欧元法定最低资本要求" },
      { label: "法人身份", value: "国内母公司法定直接延伸" },
      { label: "员工签证", value: "支持跨国派遣 (ICT) 与 Kennismigrant" }
    ],
    introduction: "随着欧洲单一市场对供应链合规、EPR环保法规（包装法/WEEE）及本土化运营的要求日益严格，荷兰凭借其作为欧洲物流枢纽鹿特丹港、史基浦国际机场、极具竞争力的企业税收协定以及超过90%的英语普及率，已成为中国及跨国企业拓展欧洲大陆的绝对首选。企业进入荷兰通常面临两大路径选择：设立“外国企业分公司”（Branch Office / Bijkantoor）还是设立“独立的荷兰有限责任公司”（BV）。本文由阿姆斯特丹本土执业机构 YEAH Agency 团队撰写，系统拆解荷兰开分公司的核心步骤、法律责任、涉税要点与外派人员签证方案。",
    sections: [
      {
        title: "一、分公司 (Branch Office / Bijkantoor) vs 荷兰子公司 (BV) 核心对比",
        subtitle: "选择设立分公司还是设立独立BV，直接决定母公司的法律连带责任与税务架构。",
        content: "在荷兰法律框架下，外国企业的分公司不具备独立的荷兰法人资格，它在法律上是母公司商业实体的有机延伸；而荷兰BV（Besloten Vennootschap）则是独立的荷兰有限责任法人实体。对于测试欧洲市场、进行品牌代表联络、欧洲售后技术支持的企业，设立分公司手续精简且无注资门槛；而对于在欧洲独立签署高额采购合同、需要规避母公司财务风险的企业，设立独立BV则是更主流的选择。",
        tableData: {
          headers: ["对比维度", "荷兰分公司 (Branch Office)", "荷兰子公司 (Dutch BV)"],
          rows: [
            ["法人独立性", "无独立法人资格，属于母公司直接延伸", "独立荷兰法人，拥有专属章程与股份"],
            ["法律与债务责任", "母公司对分公司的一切债务承担无限连带责任", "以BV实缴出资为限承担有限责任，隔离母公司风险"],
            ["法定注册资本要求", "无最低资本要求（€0 起）", "法定最低 €0.01（通常建议 €100 - €1,000）"],
            ["荷兰公证处验资程序", "无需荷兰公证处验资流程", "需通过荷兰公证处起草公司章程及尽职审查"],
            ["商会 KvK 登记", "必须登记在荷兰商会 Handelsregister", "必须登记并备案 UBO 最终受益人信息"],
            ["企业所得税 (VPB)", "仅就归属于荷兰常设机构 (PE) 的利润纳税", "作为荷兰独立纳税实体就全球经营收益依法计税"],
            ["欧洲本土银行开户", "开户需审查国内母公司全部材料，耗时稍长", "以荷兰本土实体名义开立商业银行账户，适配度高"],
            ["外派员工工签申请", "可通过 ICT 跨国派遣或第三方名义雇主派遣", "可直接申请 IND 认可赞助商资质独立担保高技术移民"]
          ]
        },
        calloutBox: {
          type: "tip",
          text: "战略建议：若您首阶段目标为欧洲客户联络、本地仓储展示、售后协调，分公司可快速设立；若涉及大额欧洲本地应收应付、跨境电商主体清关或申请欧盟本土信贷融资，建议直接设立荷兰 BV 子公司。"
        }
      },
      {
        title: "二、荷兰开分公司所需资料清单与公证海牙认证流程",
        subtitle: "资料准备合规是保证 2-4 周内高效获批荷兰商会 KvK 注册码的关键。",
        content: "荷兰商会（Kamer van Koophandel, 简称 KvK）对外国企业登记分支机构的材料审核严格遵循《反洗钱及反恐融资法》（Wwft）与海牙公约要求。所有中国大陆母公司的官方文件均需经中国涉外公证处公证、省外办/外交部海牙认证（Apostille），并附具官方宣誓翻译件（英语或荷兰语）。",
        bulletPoints: [
          "母公司营业执照副本：需在中国涉外公证处出具公证书，并办理附加证明书（Apostille 海牙认证）。",
          "母公司现行有效章程（Articles of Association）：证明母公司合法存续及经营范围。",
          "董事会关于在荷兰设立分公司的正式决议：明确分公司设立决定、荷兰办公地址、分公司名称及授权代表权限范围。",
          "分公司首席代表 / 负责人的授权委托书（Power of Attorney, PoA）：经法定代表人签署及涉外公证。",
          "分公司代表及母公司董事身份证明：有效护照高清扫描件、居住地址证明及无犯罪声明文件。",
          "荷兰办公注册地址租赁协议或虚拟办公室服务协议（需具备 KvK 认可的商用办公注册编号）。"
        ]
      },
      {
        title: "三、荷兰分公司设立标准四步实操流程与时间线",
        subtitle: "从文件公证到取得商会注册号与银行账户的端到端实施周期。",
        content: "在准备好全套合规公证文件的前提下，整个流程通常在 3 至 5 周内平稳交付。",
        bulletPoints: [
          "第 1 阶段（第 1-2 周）：母公司材料梳理、涉外公证与海牙认证办理，同步起草荷兰分公司决议与设立表格（KvK Form 7 及相关附表）。",
          "第 2 阶段（第 2-3 周）：锁定阿姆斯特丹/鹿特丹商业注册地址，向荷兰商会递交全套材料，审核通过后获取唯一的 8 位数 KvK 商业登记号。",
          "第 3 阶段（第 3-4 周）：商会系统自动联通荷兰税务局（Belastingdienst），获取增值税号（BTW-identificatienummer / NL 开头）与 RSIN 税务识别码，并申请欧洲 EORI 海关通关号。",
          "第 4 阶段（第 4-5 周）：根据荷兰央行严格的 KYC/AML 规范，协助开通荷兰商业银行对公账户（如 ING、ABN AMRO 或符合欧盟监管的数字商业银行），完成企业财务闭环。"
        ]
      },
      {
        title: "四、荷兰企业税务要点：BTW增值税、企业所得税与常设机构判定",
        subtitle: "掌握荷兰优惠税制与欧盟跨境交易免税规则，确保财务合规无虞。",
        content: "荷兰分公司若构成荷兰税法上的“常设机构”（Permanent Establishment），其在荷兰境内产生的营业利润需缴纳荷兰企业所得税（Vennootschapsbelasting, VPB）：",
        bulletPoints: [
          "企业所得税税率（VPB）：应税利润在 20 万欧元以下部分适用 19% 优惠税率；超过 20 万欧元部分适用 25.8% 标准税率。",
          "增值税率（BTW）：标准税率为 21%，食品、图书等特定类别适用 9% 减免税率。对欧盟境内 B2B 跨境商品与服务适用增值税反向征税机制（Reverse Charge），极大优化企业现金流。",
          "EORI 欧盟海关单一清关识别号：分公司获取 EORI 号后，可在鹿特丹港与阿姆斯特丹机场直接办理货物进口清关，并申请荷兰 Article 23 进口增值税递延许可（无需在口岸预先垫付 21% 进口增值税）。",
          "欧洲 EPR 生产者责任延伸合规：跨境出海制造与电商品牌必须按季度申报包装废弃物回收费（Afvalfonds Verpakkingen）与电子设备 WEEE 回收认证，防范平台封禁与海关罚单。"
        ]
      },
      {
        title: "五、派遣国内员工至荷兰分公司：工作签证、高技术移民与名义雇主 (EOR)",
        subtitle: "解决中国核心管理人员与技术工程师合法常驻欧洲的关键合规方案。",
        content: "中国企业设立荷兰分支机构后，最急迫的需求往往是将熟悉业务的国内骨干员工派驻阿姆斯特丹。荷兰移民局（IND）提供了明确合规的工签路径：",
        bulletPoints: [
          "跨国公司内部派遣工作签证（ICT Directive）：适用于在中国母公司连续工作 3-6 个月以上的资深高级管理人员或核心专家，直接派遣至荷兰分公司常驻，最长居留期限达 3 年，流程严密合规。",
          "高技术移民（Kennismigrant）：荷兰分公司若符合资格，或通过荷兰本土具备 IND 资质的保荐机构，可直接担保外派员工申请高技术移民居留许可。薪资达到法定门槛（2026年30岁以上月薪约 €5,331，30岁以下月薪约 €3,909）即可全家携带配偶与子女在荷定居工作。",
          "第三方名义雇主（EOR / Personnel Dispatch）：对于新成立的荷兰分公司，尚未获得独立 IND 赞助商资质前，YEAH Agency 提供合规第三方人员派遣方案，由具备资质的实体为员工担保合法 Kennismigrant 签证，3-4 周即可飞抵阿姆斯特丹到岗办公。",
          "荷兰 30% 个人所得税免税裁定（30% Ruling）：符合特定国际招聘标准的海外专业人才，可在一定年限内享受最高 30% 工资免征个人所得税的重大利好。"
        ]
      }
    ],
    faqs: [
      {
        q: "中国企业在荷兰开分公司，法定代表人需要亲自前往荷兰吗？",
        a: "完全不需要。YEAH Agency 可作为您的阿姆斯特丹在地代理人，通过全套授权委托书（Power of Attorney）完成荷兰商会 KvK 登记、税务局税号申请及相关手续，国内法人及高管无需跨国往返即可完成分公司全套设立。"
      },
      {
        q: "荷兰分公司是否必须租赁实体办公室？虚拟地址可以吗？",
        a: "荷兰商会 KvK 要求分公司的注册地址必须是真实合法的商业办公用途地址，且该地址必须允许商事登记。单纯的“信箱地址（P.O. Box）”已被全面禁止。YEAH Agency 提供符合荷兰商会审核资质的阿姆斯特丹核心商务中心合规注册地址服务，支持信件代收与实地查验。"
      },
      {
        q: "设立分公司后，每年的财务审计与税务申报要求是什么？",
        a: "荷兰分公司每年必须向荷兰商会递交母公司的年度财务报表（附官方翻译件）。若分公司在荷兰雇佣员工，需按月申报个人所得税（Loonheffing）；每个季度需申报增值税（BTW）；每年需根据常设机构利润申报企业所得税（VPB）。"
      },
      {
        q: "如果想尽快派遣员工到荷兰，但分公司刚成立没有保荐资质怎么办？",
        a: "这是绝大多数中企初到欧洲的普遍痛点。新成立实体申请 IND Recognized Sponsor 资质通常需要提供本地商业账目与多重审查。YEAH Agency 拥有成熟的合规第三方人员派遣与第二人事雇佣（EOR）机制，可由成熟的具备 IND 资质的荷兰实体直接为您的员工办理高技术移民（Kennismigrant）居留卡，21个工作日内合法到岗。"
      }
    ]
  },

  // 2. Commercial Video Production in Amsterdam & Europe
  {
    slug: "video-production-amsterdam",
    category: "Video Production · 影视制作",
    badge: "CINEMA STANDARD · GLASSSHARPFILMS.NL",
    title: "Commercial Video Production in Amsterdam & Europe: Full-Cycle Commercials, Reality TV, TVC & Camera Crew Hire",
    subtitle: "From script treatment to DaVinci Resolve color mastering: cinema-grade film production studio Glass Sharp Films delivering global commercials, reality television, and luxury corporate films across Europe.",
    metaTitle: "Commercial Video Production Amsterdam | Glass Sharp Films Cinema Studio & Crew Hire",
    metaDescription: "Premier video production company based in Amsterdam, Netherlands. Specializing in commercial brand films, TVC advertising, unscripted reality series ('Tram Dating'), 4K/6K ARRI & RED camera packages, and licensed drone cinematography across Europe.",
    keywords: "video production Amsterdam, commercial video production Netherlands, corporate video production Europe, film production company Amsterdam, Glass Sharp Films, commercial camera crew hire Amsterdam, reality TV series production Netherlands, Tram Dating, 4K video crew Europe, DaVinci Resolve color grading Amsterdam",
    heroImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    readTime: "9 min read",
    updatedDate: "October 2026 Edition",
    relatedPracticeId: "creative-agency",
    relatedPracticeName: "02. Video Production (视频制作)",
    canonicalUrl: "https://yeah-amsterdam.nl/guides/video-production-amsterdam",
    highlights: [
      { label: "Studio Label", value: "Glass Sharp Films (Amsterdam)" },
      { label: "Camera Standard", value: "ARRI Alexa Mini LF / RED 8K / Sony FX9" },
      { label: "Turnaround", value: "2 - 4 Weeks Full Cycle Delivery" },
      { label: "Locations Covered", value: "Amsterdam, Rotterdam, Paris & Pan-Europe" }
    ],
    introduction: "In an era of generic digital media, visual authority is defined by optical weight, narrative tension, and broadcast-grade color science. Glass Sharp Films (glasssharpfilms.nl) operates as the dedicated cinema and commercial video production practice of YEAH Agency Amsterdam. From international broadcast brand campaigns and extreme-sports digital films to original reality television series like 'Tram Dating' and Olympic champion visual profiles, we engineer moving images that command cultural attention.",
    sections: [
      {
        title: "1. Full-Cycle Production Capabilities: Commercial, Broadcast & Corporate",
        subtitle: "Cinema-grade execution spanning every stage of creative development.",
        content: "We provide end-to-end film production services across the Netherlands, Western Europe, and global production deployments:",
        bulletPoints: [
          "Commercial TVC & Brand Campaigns: High-concept narrative brand commercials designed for multi-channel European broadcast and digital hero placements.",
          "Original Reality Television & Broadcast Series: Complete show development, multi-camera synchronized mobile rigs, and unscripted storytelling (exemplified by our active production 'Tram Dating').",
          "Executive Brand Documentaries & C-Level Profiles: Cinematic corporate storytelling communicating company vision, technological breakthrough, and ESG compliance to global investors.",
          "Product Visuals & Automotive Cinematography: Precision high-speed robotics, macro optical textures, and dynamic tracking cinematography across urban and studio sets.",
          "Post-Production, DaVinci DI Color Grading & Spatial Sound: Dedicated color suites with calibrated HDR monitoring, Dolby Atmos sound design, original scoring, and multilingual subtitle localization."
        ]
      },
      {
        title: "2. Equipment Arsenal: Cinema-Grade Hardware Standards",
        subtitle: "We shoot exclusively on industry-standard large-format cinema camera platforms.",
        content: "To deliver unmatched dynamic range, skin tone fidelity, and low-light optical rendering, our production packages include:",
        tableData: {
          headers: ["Category", "Hardware In-House Packages", "Cinematic Benefit"],
          rows: [
            ["Primary Cinema Cameras", "ARRI Alexa Mini LF, RED V-Raptor 8K VV, Sony FX6 / FX9", "Legendary highlight roll-off, 16+ stops dynamic range, native color science"],
            ["Prime & Anamorphic Glass", "Cooke Panchro/i Classic, Atlas Orion 2x Anamorphic, Zeiss Supreme Primes", "Character-rich bokeh, organic flares, distinctive cinematic optical separation"],
            ["Aerial Cinematography", "DJI Inspire 3 (8K Full Frame CinemaDNG), DJI Mavic 3 Pro Cine with RDW EU Flight Clearance", "Authorized legal drone flight over Amsterdam waterways and European landscapes"],
            ["Stabilization & Motion", "DJI Ronin 2, Tilta Hydra Alien Car Mount, EasyRig Vario 5 with Serene", "Ultra-stable high-speed tracking vehicles, mobile tram interiors, and handheld realism"],
            ["Location Audio Arrays", "Sound Devices 833, Wisycom / Lectrosonics wireless lavaliers, Schoeps shotgun mics", "Flawless multi-talent synchronized audio capture in challenging acoustic environments"]
          ]
        }
      },
      {
        title: "3. Landmark Case Highlights & Client Portfolios",
        subtitle: "Proven track record with multinational brands, Olympic athletes, and broadcast formats.",
        content: "Our work demonstrates creative agility and relentless execution across demanding briefs:",
        bulletPoints: [
          "Fixico x MyWheels European Commercial: Directed and captured commercial customer testimonial film highlighting urban fleet electrification across Amsterdam canals.",
          "Hermijntje Drenth (Dutch Olympic Champion Profile): Cinematic documentary portrait capturing dawn training, intense water-level cinematography at 120fps, and intimate voiceover reflection.",
          "Toobit x Chris Sharma Global Commercial: Action-sports brand campaign filming world champion rock climber Chris Sharma on sheer cliff faces, delivering over 2.5 million global views.",
          "Tram Dating Reality Series: Original reality dating show set inside heritage Amsterdam transit carriages; custom vibration-damped camera rigs capturing organic romantic chemistry."
        ]
      },
      {
        title: "4. Navigating Film Permits & Aerial Drone Approvals in the Netherlands",
        subtitle: "Ensuring 100% compliant shoots across UNESCO canals, historic monuments, and airports.",
        content: "Filming in Amsterdam requires nuanced knowledge of municipal regulations. Our local production management team handles:",
        bulletPoints: [
          "Amsterdam City Film Office (Gemeente Amsterdam) filming notifications and street/canal usage permits.",
          "Certified drone pilot operations compliant with European Union Aviation Safety Agency (EASA) and Dutch Civil Aviation Authority (ILenT) rules.",
          "Waterborne production clearances for dedicated camera boats on the Keizersgracht, Prinsengracht, and IJ River.",
          "Location scouting, multilingual casting calls (Dutch, English, Mandarin, Spanish, French), and professional talent contracts."
        ]
      }
    ],
    faqs: [
      {
        q: "What is the typical production timeline from initial brief to final delivery?",
        a: "A standard commercial or corporate brand film takes approximately 3 to 4 weeks: 1 week for creative treatment, storyboarding, and location permits; 2-3 shoot days; and 10-14 days for offline edit, DaVinci Resolve color grading, sound design, and client revisions. Fast-track delivery is available upon request."
      },
      {
        q: "Can you provide local production fixers and camera crew hire for foreign film teams?",
        a: "Yes. Glass Sharp Films regularly acts as the Amsterdam and European production fixer for international agencies and film studios from the US, UK, China, and Asia. We provide Director of Photography (DoP), gaffers, sound recordists, gear rental, transit logistics, and bilingual production coordinators."
      },
      {
        q: "How do you deliver final video masters for multi-platform broadcasting?",
        a: "We deliver full ProRes 4444 XQ / 422 HQ broadcast masters in 4K/6K cinema resolutions, accompanied by tailored social cutdowns in 9:16 vertical and 1:1 square ratios, with embedded or clean SRT subtitle files in multiple languages."
      }
    ]
  },

  // 3. Destination Wedding Photography & Luxury Videography in Amsterdam & Europe
  {
    slug: "wedding-photography-amsterdam",
    category: "Wedding Photography · 婚礼摄影与旅拍",
    badge: "DESTINATION WEDDINGS · AMSTERDAM & PAN-EUROPE",
    title: "Luxury Destination Wedding Photography & Videography in Amsterdam & Europe: Canal Elopements, Dutch Castles & European Windmills",
    subtitle: "Timeless documentary editorial photography, 4K cinema drone films, and bilingual Chinese-European wedding crews capturing unforgettable celebrations across the Netherlands and Western Europe.",
    metaTitle: "Wedding Photography Amsterdam | Luxury Wedding Videographer Netherlands & Europe",
    metaDescription: "Premier wedding photographer and luxury videographer based in Amsterdam. Specializing in European destination weddings, canal elopements, pre-wedding love story photoshoots, tulip fields, windmills, and castle celebrations with bilingual English-Chinese crews.",
    keywords: "wedding photography Amsterdam, destination wedding photography Netherlands, luxury wedding videography Europe, Amsterdam canal wedding photoshoot, European wedding photographer, wedding videographer Amsterdam, 阿姆斯特丹婚礼摄影, 欧洲海外婚礼跟拍, 荷兰婚纱摄影旅拍, 欧洲城堡婚礼摄影, 4K drone wedding video Netherlands",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    readTime: "8 min read",
    updatedDate: "2026/2027 Booking Season",
    relatedPracticeId: "creative-agency",
    relatedPracticeName: "02. Video Production (视频制作 · Glass Sharp Films)",
    canonicalUrl: "https://yeah-amsterdam.nl/guides/wedding-photography-amsterdam",
    highlights: [
      { label: "Style", value: "Timeless Editorial & Cinematic Documentary" },
      { label: "Bilingual Team", value: "Fluent English, Mandarin, Cantonese & Dutch" },
      { label: "Cinematography", value: "Dual 4K Cinema Cameras & Aerial Drone" },
      { label: "Delivery", value: "Curated High-Res Gallery + 4K Cinema Film" }
    ],
    introduction: "Amsterdam's romantic 17th-century canal rings, historic wooden bridges, atmospheric brick courtyards, and ethereal golden hour light make it one of the world's most enchanting destinations for couples in love. Combined with the majestic windmill landscapes of Zaanse Schans, spring tulip gardens of Keukenhof, and fairytale historic castles such as Kasteel De Haar, the Netherlands offers a cinematic backdrop unlike anywhere else in Europe. Under YEAH Agency's visual division (Glass Sharp Films), our wedding photography and cinematography collective brings cinema-grade visual storytelling to luxury destination weddings, elopements, and bespoke pre-wedding portrait sessions.",
    sections: [
      {
        title: "1. The Visual Approach: Documentary Emotion Meets Fashion Editorial",
        subtitle: "No stiff poses or artificial scripts — authentic emotional intimacy captured with cinema optics.",
        content: "Our team merges documentary photojournalism with high-fashion editorial sensitivity. We allow your day to unfold naturally, capturing unscripted laughter, tender glances, and spontaneous celebrations while framing each composition with cinematic discipline, natural backlight, and nuanced film color tonality.",
        bulletPoints: [
          "Documentary Storytelling: Unobtrusive observation of genuine emotion, family tears, and vibrant party energy.",
          "Editorial Portraiture: Effortless, magazine-caliber couple portraits that showcase your couture attire, accessories, and natural chemistry.",
          "Cinematic Wedding Film: 4K film master featuring original audio vows, emotional speeches, ambient acoustic sound design, and DaVinci Resolve color timing.",
          "Bilingual Harmony: Our team speaks fluent English, Mandarin Chinese (普通话), Cantonese, and Dutch, ensuring seamless communication with international couples and multi-generational families."
        ]
      },
      {
        title: "2. Iconic Photoshoot Locations Across Amsterdam & the Netherlands",
        subtitle: "Curated locations combining timeless Dutch heritage and dramatic natural landscapes.",
        content: "We provide bespoke location scouting tailored to your aesthetic preferences and seasonal timing:",
        tableData: {
          headers: ["Destination", "Atmosphere & Visual Character", "Best Season & Golden Hour"],
          rows: [
            ["Amsterdam Canal Ring (Keizersgracht & Jordaan)", "Historic 17th-century canal houses, blooming bicycle bridges, romantic private boat cruises", "All Year / Early morning sunrise & dusk blue hour"],
            ["Kasteel De Haar (Utrecht)", "The largest and most luxurious neo-Gothic castle in the Netherlands, grand rose gardens and moat bridges", "Spring to Autumn / Romantic midday and golden hour"],
            ["Zaanse Schans & Dutch Windmills", "Traditional green wooden heritage houses, authentic operating windmills, rural waterways", "All Year / Late afternoon warm sunset light"],
            ["Keukenhof & Lisse Tulip Fields", "Vibrant oceans of blooming tulips, hyacinths, and daffodils in kaleidoscopic color", "April – Early May only (Peak Dutch spring blooming)"],
            ["Bloemendaal aan Zee & Coastal Dunes", "Dramatic North Sea windswept sand dunes, coastal wild grasses, and expansive ocean horizon", "Summer & Autumn / Breathtaking seaside sunset"]
          ]
        }
      },
      {
        title: "3. Curated Destination Wedding & Elopement Collections",
        subtitle: "Transparent, comprehensive packages tailored for international celebrations.",
        content: "Every collection includes full commercial usage rights, curated high-resolution digital galleries, and private online sharing:",
        bulletPoints: [
          "Collection I: Amsterdam Canal Elopement & Pre-Wedding Story (4-6 Hours): Ideal for intimate couple celebrations, engagement portraits, and private canal boat cruises. Includes 250+ professionally edited high-res images and a 2-3 minute 4K cinematic highlight teaser film.",
          "Collection II: Full-Day European Destination Wedding (10-12 Hours): Complete wedding day coverage from morning bridal preparation, first look, and church/civil ceremony to sunset cocktail hour and evening dance party. Dual principal photographer and cinematographer team, licensed drone aerial coverage, 600+ curated high-res photos, 5-8 minute cinematic feature film, and full documentary ceremony speech edit.",
          "Collection III: Multi-Day European Grand Tour (Netherlands, Paris, Lake Como, Swiss Alps): Bespoke bespoke multi-day destination coverage combining welcome dinners, full wedding celebration, and post-wedding destination portrait editorial."
        ]
      },
      {
        title: "4. Technical Deliverables & Seamless International Workflow",
        subtitle: "From customized shooting itineraries to 48-hour social previews.",
        content: "We respect your time and provide rapid, reliable deliverables for international couples:",
        bulletPoints: [
          "Personalized Itinerary & Logistics Consultation: Detailed timeline planning accounting for Dutch natural lighting angles, canal cruise boarding, and permit access.",
          "48-Hour Sneak Peek Preview: 20-30 curated highlight photographs delivered within 48 hours for immediate social sharing with family and friends across the globe.",
          "Private Cloud Delivery Gallery: Complete high-resolution print gallery with lifetime cloud backup and integrated fine art print ordering.",
          "Archival USB Keepsake & Fine Art Photobook: Hand-bound archival linen albums crafted in Europe with museum-grade cotton paper."
        ]
      }
    ],
    faqs: [
      {
        q: "What happens if it rains on our photoshoot or wedding day in the Netherlands?",
        a: "The Dutch weather is famous for its dynamic character. Our team is fully prepared: we carry luxury transparent umbrellas that look stunning in photographs, coordinate historic indoor venues (such as the Rijksmuseum passage, elegant canal house hotels, or greenhouse orangeries), and dynamically adapt shooting windows around rain intervals."
      },
      {
        q: "Can you assist with booking private canal salon boats for couple photoshoots?",
        a: "Absolutely. We work directly with Amsterdam's premier historic salon boat operators. A private canal cruise allows you to sip champagne while avoiding street crowds, capturing peaceful canal reflections and historic bridges from the most flattering water-level perspective."
      },
      {
        q: "How far in advance should we reserve our destination wedding date?",
        a: "Due to high demand during the European wedding season (May through October), we recommend reserving your date 4 to 8 months in advance. For spring tulip season photoshoots (mid-April to early May), booking by January or February is strongly advised."
      }
    ]
  }
];
