import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowLeft, 
  ExternalLink, 
  Building2, 
  Film, 
  Camera, 
  Cpu, 
  CheckCircle2, 
  Mail, 
  ArrowUpRight,
  HelpCircle,
  Eye,
  FileText,
  Download,
  BookOpen
} from "lucide-react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { GuidePage } from "./GuidePage";
import { DETAILED_GUIDES } from "./guidesData";

// --- Types & Data Models ---

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
  externalLink?: {
    label: string;
    url: string;
  };
  pdfLink?: {
    label: string;
    url: string;
  };
  metrics?: { label: string; value: string }[];
}

export interface ServiceDefinition {
  id: string;
  number: string;
  title: string;
  subBrand?: string;
  badge: string;
  tagline: string;
  desc: string;
  longOverview: string;
  icon: typeof Building2;
  heroImage: string;
  secondaryImage: string;
  scopeList: { title: string; desc: string }[];
  methodologySteps: { step: string; title: string; desc: string }[];
  externalUrl?: {
    label: string;
    description: string;
    url: string;
  };
  pdfUrl?: {
    label: string;
    filename: string;
    url: string;
  };
  metrics: { value: string; label: string }[];
  faqs: { q: string; a: string }[];
  featuredSpotlight?: {
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    image: string;
    pdfUrl?: string;
    stats: { label: string; value: string }[];
    link?: { label: string; url: string };
  };
}

// --- The Four Practices Data ---
// 1. Corporate Consulting (企业咨询)
// 2. Video Production (视频制作)
// 3. Fine Art Representation (艺术品代理)
// 4. Software Development (软件开发)

export const SERVICES: ServiceDefinition[] = [
  { 
    id: "business-consulting",
    number: "01",
    title: "Corporate Consulting",
    subBrand: "Dutch BV Formation, EPR & Personnel Dispatch",
    badge: "DUTCH BV FORMATION · EPR COMPLIANCE · PERSONNEL DISPATCH",
    tagline: "Turnkey Dutch corporate landing, EPR environmental compliance, personnel dispatch visas, and European fiscal governance.",
    desc: "End-to-end operational execution for international enterprises establishing and scaling across Europe — from Dutch BV incorporation and KvK registration to EPR environmental compliance (Packaging, WEEE, Batteries) and third-party personnel dispatch work visas (Kennismigrant).",
    longOverview: "Entering and scaling within the European single market via the Netherlands unlocks premier logistics hubs, bilateral tax treaties, and regulatory certainty. YEAH operates as your direct operational general contractor in Amsterdam. We eliminate bureaucratic friction across every dimension: executing turnkey Dutch BV incorporation, filing Extended Producer Responsibility (EPR) registrations for cross-border commerce, facilitating third-party personnel dispatch work permits and Kennismigrant visas, and coordinating directly with the Dutch Tax Authority (Belastingdienst) and commercial banks.",
    icon: Building2,
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1974&auto=format&fit=crop",
    externalUrl: {
      label: "View Dedicated Market Entry Dossier",
      description: "Explore our comprehensive visual brief detailing Dutch BV incorporation procedures, tax regimes, and foreign enterprise landing.",
      url: "https://yeah-business-amsterdam-m6sjyle.gamma.site/yeah-en"
    },
    metrics: [
      { value: "100%", label: "Compliance & Regulatory Track Record" },
      { value: "4-6 Wks", label: "Average Turnkey BV Incorporation" },
      { value: "EU-Wide", label: "EPR Environmental Clearance & Dispatch Mobility" }
    ],
    scopeList: [
      {
        title: "Dutch BV Incorporation & Chamber of Commerce (KvK)",
        desc: "Drafting articles of association, coordinating with Dutch civil-law notaries, official KvK registry filing, and legal entity structuring."
      },
      {
        title: "EPR Environmental Compliance (Packaging, WEEE & Batteries)",
        desc: "Turnkey Extended Producer Responsibility (EPR / 生产者责任延伸) registration and volume reporting across the Netherlands and the EU. Mandatory compliance for Afvalfonds Verpakkingen (packaging waste), electronic equipment (WEEE), and batteries."
      },
      {
        title: "Third-Party Personnel Dispatch & Work Visa Sponsorship",
        desc: "Personnel secondment, Employer of Record (EOR), and third-party personnel dispatch visa handling. Sponsoring and expediting Dutch Kennismigrant (Highly Skilled Migrant) visas, Intra-Corporate Transferees (ICT), and posted worker compliance without your own Dutch sponsor entity."
      },
      {
        title: "Tax Structuring & Dutch Belastingdienst Setup",
        desc: "Value Added Tax (BTW/VAT) and Corporate Income Tax (CIT) filings, EORI customs clearance registrations, and 30% Tax Ruling advisory."
      },
      {
        title: "Commercial Banking & Financial Rails",
        desc: "Navigating stringent European Anti-Money Laundering (AML) and Ultimate Beneficial Owner (UBO) compliance to open corporate accounts."
      },
      {
        title: "Executive Mobility & IND Recognized Sponsor Status",
        desc: "Applying directly for IND Recognized Sponsor status, corporate relocation governance, BSN municipality registrations, and executive management contracts."
      }
    ],
    methodologySteps: [
      {
        step: "01",
        title: "Entity & Compliance Blueprinting",
        desc: "Analyzing cross-border corporate structure, tax treaties, EPR liability scopes, and cross-border personnel secondment needs."
      },
      {
        step: "02",
        title: "Notarial Execution & KvK Entry",
        desc: "Coordinating notarial deeds via power of attorney, securing the official Chamber of Commerce registry number and deed of incorporation."
      },
      {
        step: "03",
        title: "EPR Filings & Tax/Bank Rails",
        desc: "Securing Dutch BTW/CIT numbers, registering EPR environmental waste certificates, and onboarding institutional commercial banking."
      },
      {
        step: "04",
        title: "Personnel Dispatch & Operational Launch",
        desc: "Filing third-party personnel dispatch work permits or IND Kennismigrant visas, municipal BSN registrations, and handing over an operational Dutch enterprise."
      }
    ],
    faqs: [
      {
        q: "What is EPR registration in the Netherlands and the EU, and who is legally required to register?",
        a: "Extended Producer Responsibility (EPR / 生产者责任延伸) is mandatory EU environmental legislation requiring businesses selling physical goods in Europe to fund recycling systems. In the Netherlands, this covers Packaging (Afvalfonds Verpakkingen / Packaging Waste Fund), Electrical & Electronic Equipment (WEEE), and Batteries. Cross-border e-commerce brands, importers, and manufacturers selling directly or via marketplaces (such as Amazon or Bol.com) must register, report annual weight volumes, and hold compliance certificates to prevent market suspensions and customs hold-ups. YEAH manages all registrations, calculations, and compliance filings."
      },
      {
        q: "How does third-party personnel dispatch and visa sponsorship work for companies without a Dutch sponsor entity?",
        a: "If your foreign enterprise needs key managers, technical directors, or engineers working legally on the ground in the Netherlands before establishing a local entity or qualifying for IND Recognized Sponsor status, YEAH provides compliant third-party personnel dispatch (secondment / EOR). Through verified Dutch accredited sponsor partners, your employees receive legitimate Kennismigrant (Highly Skilled Migrant) work and residence permits, Dutch payroll, and BSN registrations in full compliance with Dutch labour and immigration laws."
      },
      {
        q: "What is the typical timeframe to incorporate a Dutch BV, and is physical presence required in Amsterdam?",
        a: "With prepared legalized and apostilled corporate documents from the parent entity, the entire BV incorporation can be executed remotely via notarial power of attorney. Turnkey delivery—from notarial execution and KvK registration to tax number issuance—is typically completed within 4 to 6 weeks."
      },
      {
        q: "How does a newly established Dutch entity qualify for IND Recognized Sponsor status and the 30% Tax Ruling?",
        a: "The company applies directly to the Dutch Immigration Authority (IND) for 'Recognized Sponsor' status by demonstrating solvency and business intent. Once granted, the company can independently sponsor highly skilled migrants (Kennismigranten). Qualifying foreign specialists can apply for the 30% Tax Ruling, exempting 30% of gross salary from income tax."
      }
    ]
  },
  { 
    id: "creative-agency",
    number: "02",
    title: "Video Production", 
    subBrand: "Glass Sharp Films (glasssharpfilms.nl)",
    badge: "COMMERCIAL CINEMATOGRAPHY & BROADCAST",
    tagline: "Commercial brand campaigns, broadcast reality series, and luxury destination wedding films.",
    desc: "A dedicated cinema-grade production studio (Glass Sharp Films) crafting high-impact commercials, original reality television including 'Tram Dating', Olympic athlete profiles, and European destination wedding films.",
    longOverview: "Glass Sharp Films (glasssharpfilms.nl) operates as the dedicated video production practice of YEAH Agency Amsterdam. Founded in 2021, the studio bridges cinematic visual storytelling with broadcast commercial precision. Equipped with cinema-grade camera packages (ARRI, RED, Sony Cinema Line), licensed aerial drone systems, and full-spectrum post-production, we deliver films commanding international acclaim.",
    icon: Film,
    heroImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop",
    externalUrl: {
      label: "Visit Glass Sharp Films (glasssharpfilms.nl)",
      description: "Explore the official film production website featuring full commercial reels, showreels, and international project archives.",
      url: "https://glasssharpfilms.nl/"
    },
    featuredSpotlight: {
      title: "Glass Sharp Films — Dedicated Production House",
      subtitle: "Amsterdam Commercial & Broadcast Studio",
      description: "Official film production label based in Amsterdam. Commercial clients include Fixico x MyWheels, Dutch Olympic Champion Hermijntje Drenth, global brand campaigns for crypto exchange Toobit featuring climber Chris Sharma, and the in-production reality dating series 'Tram Dating'.",
      badge: "OFFICIAL SUB-BRAND · GLASSSHARPFILMS.NL",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop",
      stats: [
        { label: "Established", value: "2021 (AMS)" },
        { label: "Reach", value: "EMEA & APAC" },
        { label: "Camera Standard", value: "ARRI / RED 6K" }
      ],
      link: { label: "glasssharpfilms.nl", url: "https://glasssharpfilms.nl/" }
    },
    metrics: [
      { value: "4K / 6K", label: "Cinema Standard Camera Packages" },
      { value: "Millions", label: "Broadcast & Digital Campaign Views" },
      { value: "Full-Cycle", label: "Script, Production, Sound & DaVinci DI" }
    ],
    scopeList: [
      {
        title: "Commercial Film & TVC Advertising",
        desc: "Cinema-grade commercials, digital brand campaigns, visual storytelling, and high-production product visual assets."
      },
      {
        title: "Broadcast Series & Reality Show Production",
        desc: "Unscripted reality television series (including 'Tram Dating'), multi-camera synchronized mobile rigs, and rapid daily editorial turns."
      },
      {
        title: "Luxury Destination Wedding Cinematography",
        desc: "Cinematic destination wedding films across Amsterdam canals, French châteaux, Lake Como, and historic European estates."
      },
      {
        title: "Corporate Documentaries & Executive Profiles",
        desc: "Global brand identity films, listed company financial media suites, and C-level thought leadership interviews."
      },
      {
        title: "DaVinci Resolve DI Color Grading & Sound Design",
        desc: "Precision film color timing, Dolby Atmos spatial sound design, original soundtrack composition, and multilingual subtitles."
      }
    ],
    methodologySteps: [
      {
        step: "01",
        title: "Script Treatment & Storyboarding",
        desc: "Translating commercial objectives, reality formats, or wedding narratives into precise scene treatments and location permits."
      },
      {
        step: "02",
        title: "On-Location Multi-Camera Cinematography",
        desc: "Deploying ARRI Alexa, RED, and Sony Cine packages with specialized wireless audio arrays and authorized drone flights."
      },
      {
        step: "03",
        title: "Editorial & DaVinci Color Mastering",
        desc: "Narrative pacing, precision color science grading in DaVinci Resolve, sound mixing, and bespoke acoustic arrangement."
      },
      {
        step: "04",
        title: "Broadcast & Multi-Platform Delivery",
        desc: "Delivering theatrical DCP masters, broadcast television packages, 4K archives, and vertical social teaser cuts."
      }
    ],
    faqs: [
      {
        q: "What commercial work has Glass Sharp Films produced in the Netherlands and Europe?",
        a: "Glass Sharp Films has produced prominent commercial and documentary projects, including the corporate testimonial film for Fixico in collaboration with MyWheels, a cinematic documentary for Dutch Olympic Champion Hermijntje Drenth, and a global commercial for crypto exchange Toobit starring rock climber Chris Sharma."
      },
      {
        q: "What is 'Tram Dating' and what is its current production status?",
        a: "'Tram Dating' is an original reality dating series currently in active production across the Netherlands. The show captures Asian singles meeting and dating aboard historic and scenic Dutch trams, pairing intimate romantic storytelling with vibrant urban cinematography."
      },
      {
        q: "What is included in destination wedding cinematography packages?",
        a: "We offer comprehensive wedding film packages across Europe: pre-wedding script consultations, scenic shoots along Amsterdam canals or European estates, dual or triple 4K cinema cameras, official civil aviation drone permits, a 48-hour social preview teaser, and a full-length feature film."
      }
    ]
  },
  { 
    id: "fine-art",
    number: "03",
    title: "Fine Art Representation", 
    subBrand: "Exclusive Representation: Ming Ye (叶明)",
    badge: "LARGE-FORMAT PHOTOGRAPHY & ANALOG PRACTICE",
    tagline: "Exclusive global representation of Large-Format Photography Artist Ming Ye (叶明).",
    desc: "Sole representative of acclaimed Large-Format Photography Artist Ming Ye (叶明). Specializing in 8x10 analog view cameras, darkroom silver gelatin craftsmanship, and European museum curation. Access the complete artist monograph and catalog via shorturl.at/TYn8P.",
    longOverview: "YEAH Agency exclusively represents Large-Format Photography Artist Ming Ye (叶明). Graduated from Shenzhen University Media in the 1980s, Ming Ye operates with 8x10 and 4x5 large-format view cameras and handcrafted silver gelatin darkroom chemistry, creating profound symbolic and philosophical visual works. Ming Ye's work has been prominently exhibited across European institutions, including 'Konstruierte Natur: Landschaft im Wandel in der zeitgenössischen Kunst' (Schloss Plüschow, Germany) and '洞见 – Einblick II' (Rostock, Germany). All curated photographic plates, exhibition portfolios, and catalog entries are documented within the official Artist Monograph (https://shorturl.at/TYn8P). We handle all museum acquisitions, limited-edition collector folios, European solo exhibitions, and scholarly monographs.",
    icon: Camera,
    heroImage: "/images/artwork-heaven-0102.jpg",
    secondaryImage: "/images/artwork-lies-0305.jpg",
    pdfUrl: {
      label: "Official Artist Monograph & Portfolio (PDF)",
      filename: "Artist Ming Monograph",
      url: "https://shorturl.at/TYn8P"
    },
    featuredSpotlight: {
      title: "Ming Ye (叶明) — Featured Master Series: 《Heaven 渡》, 《Lies 谎言》, 《Prophecy 预言》",
      subtitle: "Exclusive Representation · Conceptual & Symbolic Large-Format Photography",
      description: "Dedicated exclusively to Large-Format Photography Artist Ming Ye (叶明). Operating with 8x10 view cameras and handcrafted silver gelatin darkroom craftsmanship, Ming Ye's practice explores existential and philosophical themes across master series including 《Heaven 渡》, 《Lies 谎言》, and 《Prophecy 预言》. Exhibited in premier German art institutions ('Konstruierte Natur', Schloss Plüschow, 2024; '洞见 – Einblick II', Rostock, 2022). All curated works and acquisition protocols are presented within the official Artist Monograph.",
      badge: "EXCLUSIVE ARTIST REPRESENTATION · MING YE (叶明)",
      image: "/images/artwork-heaven-0102.jpg",
      pdfUrl: "https://shorturl.at/TYn8P",
      stats: [
        { label: "Represented Artist", value: "Ming Ye (叶明)" },
        { label: "Master Series", value: "Heaven · Lies · Prophecy" },
        { label: "Official Monograph", value: "Verified PDF" }
      ],
      link: { label: "Open Official Monograph PDF (shorturl.at/TYn8P)", url: "https://shorturl.at/TYn8P" }
    },
    metrics: [
      { value: "8x10", label: "Large-Format View Camera Standard" },
      { value: "100%", label: "Exclusive Global Representation (Ming Ye)" },
      { value: "Museum-Tier", label: "Archival Silver Gelatin Conservation" }
    ],
    scopeList: [
      {
        title: "Exclusive Global Artist Representation (Ming Ye 叶明)",
        desc: "Sole representation for Large-Format Photography Artist Ming Ye globally, managing museum acquisitions, gallery rights, private collector sales, and institutional commissions."
      },
      {
        title: "Official Monograph & Portfolio Curation",
        desc: "Publishing and distributing the official Artist Monograph (https://shorturl.at/TYn8P), presenting verified plates, curatorial essays, and catalog raisonné records."
      },
      {
        title: "Archival Silver Gelatin Darkroom Printing",
        desc: "Museum-grade fiber paper darkroom processing, selenium/gold toning for multi-century permanence, and authenticated limited collector editions."
      },
      {
        title: "European Museum Exhibitions & Foundation Placements",
        desc: "Accessioning Ming Ye's master photographic portfolios into permanent European photography archives, art museums, and distinguished private foundations (e.g. Plüschow, Rostock)."
      },
      {
        title: "Scholarly Monograph Publishing & Curatorial Scenography",
        desc: "Designing contemplative gallery scenography, anti-reflective museum framing, and distributing the official Artist Monograph (available at shorturl.at/TYn8P)."
      }
    ],
    methodologySteps: [
      {
        step: "01",
        title: "Philosophical Conception & Metaphor",
        desc: "Drawing upon classical philosophy and symbolic visual language, composing meditative large-format photographic studies."
      },
      {
        step: "02",
        title: "8x10 View Camera Field Capture",
        desc: "Rigorous analog view camera exposure, bellows tilt/shift perspective control, and individual sheet film development capturing nuanced tonality."
      },
      {
        step: "03",
        title: "Darkroom Silver Gelatin Crafting",
        desc: "Handcrafted darkroom enlargement onto fiber-base silver gelatin paper, archival chemical washing, and selenium toning."
      },
      {
        step: "04",
        title: "Archival Certification & Institutional Placement",
        desc: "Stamping with artist authenticity seals, catalog raisonné registration, museum conservation framing, and institutional accession."
      }
    ],
    faqs: [
      {
        q: "Who is Ming Ye (叶明) and what defines his large-format photography?",
        a: "Ming Ye (叶明) is an acclaimed Large-Format Photography Artist who graduated from Shenzhen University Media in the 1980s. He works with 8x10 and 4x5 large-format view cameras and darkroom silver gelatin craftsmanship, specializing in symbolic and metaphorical photography. His work has been widely exhibited in European institutions, including 'Konstruierte Natur' (Plüschow, 2024) and '洞见 – Einblick II' (Rostock, 2022)."
      },
      {
        q: "Does YEAH Agency represent other artists?",
        a: "No. Our fine art division is dedicated exclusively to Large-Format Photography Artist Ming Ye (叶明). We concentrate our curatorial, exhibition, and archival resources entirely on his practice and photographic legacy."
      },
      {
        q: "How can museums and private collectors access the artist monograph and acquisition details?",
        a: "The official Artist Monograph and exhibition catalog can be accessed directly at https://shorturl.at/TYn8P. All original prints are strictly limited editions, hand-printed in the darkroom, signed, and accompanied by provenance certificates."
      }
    ]
  },
  { 
    id: "custom-it-services",
    number: "04",
    title: "Software Development", 
    subBrand: "Digital Ventures & DriveViewer iOS",
    badge: "ENTERPRISE SYSTEMS & MOBILE PLATFORMS",
    tagline: "Resilient systems architecture, GDPR compliance, and proprietary software ventures.",
    desc: "Engineering custom enterprise software, multi-region cloud backbones, and proprietary software ventures — exemplified by DriveViewer, our driving school management platform live on the Apple App Store.",
    longOverview: "Operating digital products and enterprise systems across Europe demands rigorous GDPR data protection, low-latency cross-border networks, and refined UX. YEAH Software Development engineers bespoke enterprise platforms and incubates venture software. From our proprietary App Store product DriveViewer to multi-currency trading engines and high-availability cloud microservices, we build software designed for long-term operational resilience.",
    icon: Cpu,
    heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    externalUrl: {
      label: "View DriveViewer on Apple App Store",
      description: "Our proprietary iOS business application for modern driving schools and instructors, live on the App Store.",
      url: "https://apps.apple.com/nl/app/driveviewer/id6765847978?l=en-GB"
    },
    featuredSpotlight: {
      title: "DriveViewer — Modern Driving School iOS Platform",
      subtitle: "Proprietary Software Venture Live on App Store",
      description: "Designed and engineered in Amsterdam by YEAH's engineering team, DriveViewer is a specialized iOS application built for driving schools (Rijscholen), instructors, and students across the Netherlands and Europe. Features include real-time lesson booking, 46-point CBR examination grading, dynamic calendar scheduling, and custom school branding.",
      badge: "LIVE ON APPLE APP STORE · DRIVEVIEWER",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
      stats: [
        { label: "Platform", value: "iOS / iPadOS" },
        { label: "Grading Criteria", value: "46 CBR Points" },
        { label: "App Store", value: "Business Category" }
      ],
      link: { label: "App Store Page", url: "https://apps.apple.com/nl/app/driveviewer/id6765847978?l=en-GB" }
    },
    metrics: [
      { value: "99.99%", label: "System Availability SLA Benchmark" },
      { value: "Sub-200ms", label: "Cross-Continent Synchronization Latency" },
      { value: "GDPR", label: "Full European Data Compliance Adherence" }
    ],
    scopeList: [
      {
        title: "DriveViewer & Proprietary Mobile Product Engineering",
        desc: "Designing and engineering iOS/Android business applications, including the DriveViewer platform with real-time lesson booking and CBR examination grading."
      },
      {
        title: "Bespoke Cross-Border ERP & Customs Trading Engines",
        desc: "Multi-currency foreign exchange settlement, direct integration with Dutch Douane EDI customs clearance, and supply chain inventory management."
      },
      {
        title: "European GDPR Privacy & Cryptographic Security",
        desc: "End-to-end data encryption, isolated European cloud storage (Frankfurt/Amsterdam), and tamper-evident cryptographic audit logs."
      },
      {
        title: "Multi-Region Cloud Infrastructure (AWS / GCP / Azure)",
        desc: "High-availability Kubernetes clusters, automated zero-downtime failover, and sub-200ms latency between European and Asian nodes."
      },
      {
        title: "Enterprise AI & Low-Latency API Middleware",
        desc: "Private generative AI workflows, intelligent document processing for trade documents, and robust REST/GraphQL microservices."
      }
    ],
    methodologySteps: [
      {
        step: "01",
        title: "Architecture & Compliance Audit",
        desc: "Assessing data flows, EU GDPR regulatory boundaries, latency requirements, and system integration points."
      },
      {
        step: "02",
        title: "Prototyping & Database Schema Design",
        desc: "Defining microservice API contracts, encrypted PostgreSQL schemas, and real-time event-driven messaging topologies."
      },
      {
        step: "03",
        title: "Iterative Engineering & Concurrency Testing",
        desc: "Automated CI/CD pipelines, stringent automated unit tests, and rigorous load simulations under high network concurrency."
      },
      {
        step: "04",
        title: "Zero-Downtime Deployment & 24/7 SLA Support",
        desc: "Live migration with zero operational disruption, real-time APM telemetry, and guaranteed enterprise SLA maintenance."
      }
    ],
    faqs: [
      {
        q: "What is DriveViewer and how does it demonstrate YEAH's software engineering capabilities?",
        a: "DriveViewer is a native iOS business app developed and launched on the Apple App Store by YEAH. It serves driving schools and instructors with real-time lesson booking, grading against 46 professional examination criteria (aligned with CBR standards), timeline scheduling, and white-label branding."
      },
      {
        q: "How does YEAH guarantee GDPR compliance for international businesses?",
        a: "We architect systems following European GDPR guidelines from day one. Personal data is isolated within EU cloud regions (such as Amsterdam or Frankfurt), with strict data pseudonymization, user consent mechanisms, and automated right-to-erasure workflows."
      },
      {
        q: "Can you integrate custom software with legacy ERP systems and customs authorities?",
        a: "Yes. We frequently develop high-performance API middleware that seamlessly bridges legacy accounting or warehousing systems with modern web/mobile interfaces and direct Dutch Customs (Douane EDI) declarations."
      }
    ]
  }
];

// --- Case Studies Archive ---

export const CASE_STUDIES: CaseStudy[] = [
  // 01. Corporate Consulting (企业咨询)
  {
    id: "case-tech-landing",
    title: "Global Technology European Headquarters & Dutch BV Incorporation",
    clientCategory: "Publicly Listed Asian Technology Enterprise",
    serviceId: "business-consulting",
    serviceName: "Corporate Consulting",
    tag: "DUTCH BV FORMATION · ADVISORY",
    summary: "Established the wholly-owned European headquarters subsidiary for an Asian publicly traded enterprise, completing KvK registration, tax filings, and prime office setup in Amsterdam Zuidas.",
    challenge: "Client required full EU corporate legal status, compliant anti-money laundering (AML) bank clearance, and local employment contracts within a rigid 6-week deadline to qualify for a €10M+ European commercial tender.",
    solution: "YEAH coordinated the entire process: drafting articles of association with Dutch civil-law notaries, securing the KvK registration, obtaining BTW/CIT tax numbers, opening tier-1 corporate banking facilities, and drafting localized management contracts.",
    deliverables: [
      "Official Dutch BV entity incorporated at Chamber of Commerce (KvK)",
      "Tier-1 commercial banking with multi-currency SEPA/SWIFT rails",
      "Executive 30% Tax Ruling applications submitted and approved",
      "Prime Amsterdam Zuidas commercial office lease established"
    ],
    outcome: "Turnkey operational status achieved within 6 weeks; 12 executive work permits secured; client successfully qualified and won the €10M+ European contract.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    metrics: [
      { label: "Turnaround", value: "6 Weeks" },
      { label: "Tender Value", value: "€10M+" }
    ]
  },
  {
    id: "case-corporate-immigration",
    title: "Executive Mobility, IND Recognized Sponsor & 30% Tax Ruling",
    clientCategory: "Multinational Corporate Leadership",
    serviceId: "business-consulting",
    serviceName: "Corporate Consulting",
    tag: "IND RECOGNIZED SPONSOR · IMMIGRATION",
    summary: "Secured Dutch Immigration Authority (IND) Recognized Sponsor status and relocated 8 multinational executive families with 30% Tax Ruling benefits.",
    challenge: "Overcoming stringent IND financial solvency audits for a newly formed entity while ensuring seamless family relocation, schooling, and tax optimization without operational disruptions.",
    solution: "Prepared comprehensive business substance documentation, submitted sponsor certification, expedited Kennismigrant visa approvals, and facilitated municipal BSN registrations and health coverage.",
    deliverables: [
      "IND Recognized Sponsor certification granted with full sponsorship rights",
      "8 Kennismigrant residence permits and BSN registrations completed",
      "30% Tax Ruling fiscal exemptions approved for qualifying leadership",
      "Amsterdam residential leasing and international school enrollment"
    ],
    outcome: "100% visa approval rate; all 8 executive families smoothly settled in Amsterdam within scheduled deadlines.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop"
  },
  {
    id: "case-corporate-epr-dispatch",
    title: "European EPR Environmental Compliance & Third-Party Personnel Dispatch Visas",
    clientCategory: "Cross-Border Consumer Technology & Hardware Group",
    serviceId: "business-consulting",
    serviceName: "Corporate Consulting",
    tag: "EPR REGISTRATION · PERSONNEL DISPATCH · VISA SPONSORSHIP",
    summary: "Secured comprehensive Dutch and European EPR environmental compliance (Packaging, WEEE, Batteries) and deployed key engineering leadership to Amsterdam via third-party personnel dispatch visa sponsorship.",
    challenge: "Client faced European marketplace listing suspensions and customs delays due to mandatory EU Extended Producer Responsibility (EPR) regulations, while urgently requiring senior engineers on-site in Amsterdam months before their own Dutch entity could qualify for IND Recognized Sponsor status.",
    solution: "YEAH registered the enterprise across the Dutch Packaging Waste Fund (Afvalfonds Verpakkingen) and WEEE registries with automated recurring volume declarations. In parallel, facilitated compliant third-party personnel dispatch (secondment), securing Kennismigrant work and residence permits within 3 weeks.",
    deliverables: [
      "Official Dutch & EU EPR compliance registration numbers (Afvalfonds Verpakkingen & WEEE)",
      "Periodic volume reporting protocol and environmental audit certification",
      "Compliant third-party personnel dispatch framework with Dutch payroll secondment",
      "6 Kennismigrant work residence permits and BSN municipal registrations expedited"
    ],
    outcome: "100% environmental compliance unlocked full EU marketplace distribution; foreign technical team operating legally on-site in Amsterdam within 21 days without waiting for independent corporate sponsorship qualification.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    metrics: [
      { label: "EPR Clearance", value: "100% Certified" },
      { label: "Personnel Dispatched", value: "6 Engineers" }
    ]
  },

  // 02. Video Production (视频制作 - Glass Sharp Films)
  {
    id: "case-tram-dating",
    title: "Tram Dating — Reality Dating Series (In Active Production)",
    clientCategory: "Original Asian Reality Dating Series · The Netherlands",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "REALITY SERIES · IN PRODUCTION",
    summary: "Principal photography and technical cinematography for 'Tram Dating', an original reality dating series capturing Asian singles dating aboard historic and scenic trams across the Netherlands.",
    challenge: "Designing multi-camera mobile cinema rigs inside moving heritage trams, capturing authentic unscripted romantic chemistry under changing urban natural light and ambient transit acoustics.",
    solution: "Glass Sharp Films engineered custom vibration-damped cinema camera mounts, wireless multi-channel lavalier audio arrays, and dynamic street-level tracking alongside Dutch municipal transit authorities.",
    deliverables: [
      "Custom multi-camera mobile tram cinema rig and wireless audio capture",
      "Principal photography across Amsterdam and Dutch transit networks",
      "Real-time storyline assembly, daily rushes, and character edits",
      "DaVinci Resolve cinematic urban color grading and broadcast mastering"
    ],
    outcome: "Currently in active production; capturing genuine cross-cultural romance against the backdrop of historic Dutch canals and vintage tramways.",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "case-fixico-mywheels",
    title: "Fixico x MyWheels Commercial Campaign & Customer Testimonial",
    clientCategory: "European Automotive & Fleet Technology Leaders",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "COMMERCIAL CAMPAIGN · GLASSSHARPFILMS.NL",
    summary: "Produced an impactful commercial customer testimonial video for automotive repair platform Fixico in collaboration with shared mobility leader MyWheels in Amsterdam.",
    challenge: "Showcasing technical fleet repair management while maintaining an engaging, human narrative centered on urban sustainability and mobility innovation.",
    solution: "Glass Sharp Films directed dynamic multi-camera footage across Amsterdam locations, capturing real-world fleet maintenance with crisp cinematography, pacing, and color science.",
    deliverables: [
      "Commercial brand customer testimonial video master",
      "Multi-platform social media campaign cutdowns (16:9 & 9:16)",
      "High-fidelity sound design and licensed acoustic soundtrack",
      "Bilingual English and Dutch subtitled delivery"
    ],
    outcome: "Featured prominently across European B2B automotive channels and corporate keynotes; drove high stakeholder engagement for both brands.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    externalLink: {
      label: "View on glasssharpfilms.nl",
      url: "https://glasssharpfilms.nl/"
    }
  },
  {
    id: "case-hermijntje-drenth",
    title: "Hermijntje Drenth — Dutch Olympic Champion Cinematic Film",
    clientCategory: "Olympic Gold Medalist & Elite Athletic Profile",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "OLYMPIC PROFILE · CINEMATIC DOCUMENTARY",
    summary: "Crafted a cinematic visual portrait for Dutch Olympic rowing champion Hermijntje Drenth, highlighting the rigorous mental and physical discipline of world-class athletics.",
    challenge: "Capturing intense on-water training sessions under variable Dutch weather while capturing intimate, emotionally resonant audio and close-up cinematic portraiture.",
    solution: "Deployed cinema cameras with water-resistant stabilized rigs, specialized telephoto lenses, and drone tracking along rowing courses, coupled with deep personal voiceover interviews.",
    deliverables: [
      "Cinematic documentary athlete profile film",
      "High-speed 120fps water cinematography and aerial footage",
      "DaVinci Resolve dramatic color grade emphasizing dawn light",
      "International festival and digital showcase masters"
    ],
    outcome: "Widely acclaimed in Dutch sports media and athletic foundation presentations for its artistic depth and cinematic storytelling.",
    image: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=2070&auto=format&fit=crop",
    externalLink: {
      label: "View on glasssharpfilms.nl",
      url: "https://glasssharpfilms.nl/"
    }
  },
  {
    id: "case-toobit-sharma",
    title: "Toobit Global Commercial featuring Chris Sharma",
    clientCategory: "Global Cryptocurrency Platform & Action Sports",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "GLOBAL COMMERCIAL · TOOBIT X CHRIS SHARMA",
    summary: "Directed and produced an international online commercial campaign for crypto platform Toobit starring world champion rock climber Chris Sharma.",
    challenge: "Filming in high-exposure cliffside outdoor locations while maintaining commercial brand discipline, safety protocols, and intense visual pacing.",
    solution: "Assembled a specialized extreme-sports camera team, utilizing lightweight RED cinema rigs and precision drone flight paths to parallel the climber's ascent with brand themes of resilience.",
    deliverables: [
      "High-energy global digital commercial (4K Cinema Master)",
      "Ad-set vertical video variations for global digital advertising",
      "Custom sound effects and cinematic sound score mixing",
      "Full international broadcast license packaging"
    ],
    outcome: "Surpassed 2.5M+ global impressions across international markets, cementing Toobit's campaign as a high-performing digital brand commercial.",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2070&auto=format&fit=crop",
    externalLink: {
      label: "View on glasssharpfilms.nl",
      url: "https://glasssharpfilms.nl/"
    }
  },
  {
    id: "case-destination-wedding",
    title: "European Destination Wedding & Historic Canal Heritage Film",
    clientCategory: "Luxury International Couple & High-End Wedding Planner",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "LUXURY WEDDING · CANAL HERITAGE",
    summary: "Cinematic destination wedding film capturing ceremonies along UNESCO-listed Amsterdam canals and a 17th-century country estate using dual 4K cinema cameras and aerial drone flights.",
    challenge: "Coordinating waterborne canal cruise shoots, estate historic preservation rules, and civil aviation drone clearances across a tight 3-day multi-cultural celebration.",
    solution: "Glass Sharp Films deployed dual RED/Sony Cine camera teams, secured Dutch civil aviation permits, and employed wireless audio arrays to create a deeply emotional film.",
    deliverables: [
      "12-minute feature wedding documentary film",
      "60-second cinematic preview trailer (delivered within 48 hours)",
      "Multi-camera synchronized ceremony and banquet archives",
      "Custom DaVinci Resolve color science grading"
    ],
    outcome: "Delivered to glowing praise from the couple and premier European wedding planners; over 500,000 views across digital platforms.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
  },

  // 03. Fine Art Representation (艺术品代理 - Ming Ye 叶明)
  {
    id: "case-ming-ye",
    title: "Ming Ye (叶明) — Large-Format Analog Photography: 《Heaven 渡》, 《Lies 谎言》, 《Prophecy 预言》",
    clientCategory: "Sole Represented Artist · Large-Format Photography Artist Ming Ye (叶明)",
    serviceId: "fine-art",
    serviceName: "Fine Art Representation",
    tag: "EXCLUSIVE ARTIST CASE · MING YE (叶明)",
    summary: "Exclusive agency representation, European museum acquisitions, darkroom silver gelatin editions, and curatorial solo exhibition management for Large-Format Photography Artist Ming Ye (叶明). Access the complete Artist Monograph via https://shorturl.at/TYn8P.",
    challenge: "Preserving and presenting the profound philosophical depth, symbolic subtlety, and optical fidelity of the artist's large-format analog practice across the master series 《Heaven 渡》, 《Lies 谎言》, and 《Prophecy 预言》, while connecting limited editions with premier European cultural institutions and discerning collectors.",
    solution: "YEAH Agency serves as the exclusive global representative for Ming Ye, orchestrating institutional exhibitions across Europe (including Germany's 'Konstruierte Natur' and '洞见 – Einblick II'), museum conservation framing, scholarly monograph distribution, and institutional permanent collection accessions.",
    deliverables: [
      "Exclusive global representation and curatorial archive management",
      "Signature large-format works: 《Heaven No.0102》, 《Lies No.0305》, 《Prophecy No.0009》",
      "Official Artist Monograph & Exhibition Portfolio (https://shorturl.at/TYn8P)",
      "Curatorial solo exhibition scenography and scholarly publication distribution",
      "European museum permanent collection accessions and verified provenance certificates",
      "Limited edition 8x10 darkroom silver gelatin prints and institutional acquisition liaison"
    ],
    outcome: "Exhibited in prominent German cultural institutions (Schloss Plüschow, Rostock); signature large-format works accessioned into prestigious private foundations and European photography collections.",
    image: "/images/artwork-heaven-0102.jpg",
    pdfLink: {
      label: "Open Artist Monograph PDF (shorturl.at/TYn8P)",
      url: "https://shorturl.at/TYn8P"
    },
    metrics: [
      { label: "Artist", value: "Ming Ye (叶明)" },
      { label: "Practice", value: "8x10 Large-Format" },
      { label: "Official Monograph", value: "shorturl.at/TYn8P" }
    ]
  },

  // 04. Software Development (软件开发 - DriveViewer & Cloud)
  {
    id: "case-driveviewer-ios",
    title: "DriveViewer — Modern Driving School & Instructor Management Platform",
    clientCategory: "Proprietary Software Venture · Live on Apple App Store",
    serviceId: "custom-it-services",
    serviceName: "Software Development",
    tag: "LIVE ON APPLE APP STORE · DRIVEVIEWER",
    summary: "Engineered and launched DriveViewer (iOS), a specialized mobile platform for modern driving schools (Rijscholen), certified instructors, and learner drivers across the Netherlands and Europe.",
    challenge: "Replacing fragmented paper lesson books and chaotic WhatsApp scheduling with a unified, real-time mobile app meeting Dutch CBR examination standards and European GDPR regulations.",
    solution: "Engineered native iOS app featuring real-time lesson slot bookings, interactive grading against all 46 official CBR examination points, dynamic instructor timeline calendars, and custom school branding.",
    deliverables: [
      "Native iOS application available on the Apple App Store (Developer: Yixin Ye)",
      "Interactive 46-point CBR examination grading and student feedback engine",
      "Real-time instructor schedule board with daily and weekly calendar filters",
      "Custom driving school white-label branding (logo, cover imagery & themes)",
      "Full European GDPR compliance with encrypted local user storage"
    ],
    outcome: "Live on the Apple App Store; streamlines operations for driving schools and independent instructors with sub-second booking updates and instant student progress tracking.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    externalLink: {
      label: "Download on Apple App Store",
      url: "https://apps.apple.com/nl/app/driveviewer/id6765847978?l=en-GB"
    },
    metrics: [
      { label: "App Store", value: "Business" },
      { label: "CBR Criteria", value: "46 Points" },
      { label: "Platform", value: "iOS / iPadOS" }
    ]
  },
  {
    id: "case-cross-border-it",
    title: "Multi-Region Distributed Data Synchronization Backbone & GDPR Isolation",
    clientCategory: "Global Manufacturing & Trade Conglomerate",
    serviceId: "custom-it-services",
    serviceName: "Software Development",
    tag: "ENTERPRISE CLOUD · GDPR ARCHITECTURE",
    summary: "Designed and engineered an event-driven distributed data sync backbone between Asian manufacturing hubs and European headquarters.",
    challenge: "Legacy systems suffered 4-hour synchronization lags and inventory conflicts, exposing the enterprise to European GDPR data violation liabilities.",
    solution: "Implemented Kafka + Kubernetes event-driven microservices on Frankfurt and Singapore cloud nodes, with automated GDPR privacy filtering.",
    deliverables: [
      "Distributed event-driven microservices using Apache Kafka",
      "GDPR-compliant European data storage and automated pseudonymization",
      "Sub-200ms real-time replication between Europe and Asia",
      "Automated zero-downtime failover and APM telemetry"
    ],
    outcome: "Achieved 99.995% uptime SLA; cut inter-continental sync latency from 4 hours to under 200ms; passed independent GDPR security audits.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "case-custom-erp",
    title: "Rotterdam Port Customs EDI & Automated Multi-Currency Trade ERP",
    clientCategory: "Multinational Import-Export Enterprise",
    serviceId: "custom-it-services",
    serviceName: "Software Development",
    tag: "CUSTOM ERP · DOUANE EDI INTEGRATION",
    summary: "Engineered a cloud-native ERP trading platform integrated with Dutch Customs (Douane EDI) for goods entering Europe via the Port of Rotterdam.",
    challenge: "Manual paper clearance at Rotterdam led to costly clearance delays, currency exchange friction, and complex cross-border VAT reconciliation.",
    solution: "Developed modern web ERP with direct Douane EDI API connectivity, dynamic FX hedging, and automated EU one-stop-shop VAT calculations.",
    deliverables: [
      "Custom enterprise web ERP application with role-based security",
      "Direct API integration with Dutch Customs Douane EDI gateway",
      "Automated EU cross-border VAT and duty calculation engine",
      "Real-time container tracking and tamper-proof audit trail"
    ],
    outcome: "Processes over €45M in annual import-export volume; reduced port clearance processing time by 65%; eliminated calculation errors.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
  }
];

// --- Client-Side Dynamic SEO Hook ---

const usePageSEO = ({
  title,
  description,
  keywords,
  canonicalUrl
}: {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
}) => {
  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    if (canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", canonicalUrl);
    }
  }, [title, description, keywords, canonicalUrl]);
};

// --- Scroll To Top On Navigation ---

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// --- Navigation Bar ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 px-6 md:px-12 py-5 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 group">
        <span className="font-serif text-2xl tracking-widest text-white uppercase group-hover:text-gray-300 transition-colors">
          YEAH
        </span>
        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase border-l border-white/20 pl-3 hidden sm:inline">
          Agency Amsterdam
        </span>
      </Link>

      {/* Desktop Links: 4 Sovereign Practices with Refined Subtitles */}
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
          01. Corporate
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
          02. Video Production
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
          03. Fine Art
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
          04. Software
        </Link>
        <span className="text-gray-700">|</span>
        <Link 
          to="/guides/dutch-branch-office-formation"
          className={cn(
            "transition-colors py-1 border-b",
            location.pathname.startsWith("/guides") || location.pathname.includes("wedding-photography") || location.pathname.includes("branch-office")
              ? "text-emerald-400 border-emerald-400 font-medium"
              : "text-gray-400 border-transparent hover:text-white"
          )}
        >
          Dossiers &amp; Guides
        </Link>
        <a href="/#divisions" className="text-gray-400 hover:text-white transition-colors">
          Practices
        </a>
        <a href="/#about" className="text-gray-400 hover:text-white transition-colors">
          About
        </a>
        <a href="mailto:info@yeah-amsterdam.nl" className="text-white hover:text-gray-300 transition-colors font-medium">
          Inquire
        </a>
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
            className="fixed inset-0 top-[73px] bg-black/98 backdrop-blur-xl z-40 flex flex-col p-8 lg:hidden border-t border-white/10 overflow-y-auto"
          >
            <div className="space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 block">The Four Practice Subpages</span>
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
                    {s.subBrand && (
                      <p className="text-[11px] text-gray-400 mt-0.5 pl-7 font-mono uppercase tracking-wider">{s.subBrand}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1 pl-7 line-clamp-1">{s.tagline}</p>
                  </Link>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4 text-xs font-mono uppercase tracking-widest text-gray-400">
                <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-white">Home Portal</Link>
                <Link to="/guides/dutch-branch-office-formation" onClick={() => setIsOpen(false)} className="block text-emerald-400 hover:text-white">Dossiers &amp; SEO Guides (专栏)</Link>
                <a href="/#divisions" onClick={() => setIsOpen(false)} className="block hover:text-white">The Four Practices</a>
                <a href="/#about" onClick={() => setIsOpen(false)} className="block hover:text-white">About YEAH Collective</a>
                <a href="mailto:info@yeah-amsterdam.nl" onClick={() => setIsOpen(false)} className="block text-white">Direct Inquiry</a>
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

// --- Home Hero Section (Atmospheric, Evocative, Elevated Agency Copy) ---

const Hero = () => {
  return (
    <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 px-6 md:px-12 border-b border-white/10 bg-radial-[at_top_center] from-[#151515] via-black to-black">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-white/5 border border-white/10 text-gray-300 text-[11px] font-mono uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Amsterdam Studio · Four Sovereign Practices
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-white leading-[1.08] mb-8 text-balance">
            A Multidisciplinary Studio in Amsterdam.
          </h1>

          <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed mb-12 max-w-3xl">
            Operating across sovereign practices united by cross-border vision — bridging strategic corporate counsel, cinematic moving image, rare visual art, and precision digital engineering.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#divisions"
              className="inline-flex items-center gap-3 px-6 py-4 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors font-medium"
            >
              Explore 4 Dedicated Subpages <ArrowRight size={14} />
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
              className="p-5 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-2">
                <span>PRACTICE {s.number}</span>
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

// --- Four Practices Portal (Section Headers as Corporate Consulting, Video Production, Fine Art Representation, Software Development) ---

const DivisionPortals = () => {
  return (
    <section id="divisions" className="py-24 md:py-36 px-6 md:px-12 bg-[#050505] border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-gray-400 block mb-3">Core Structure</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white">The Four Independent Practices</h2>
          </div>
          <p className="text-sm md:text-base text-gray-400 max-w-md font-light leading-relaxed">
            Rather than a conventional single-discipline firm, YEAH operates four sovereign practices. Each discipline maintains dedicated partners, verified archives, and independent subpages.
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
                      alt={`${service.title} — Practice ${service.number} at YEAH Agency Amsterdam`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-mono px-3 py-1 bg-black/85 backdrop-blur-md border border-white/10 text-white">
                        PRACTICE {service.number}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="text-[11px] font-mono uppercase tracking-widest bg-black/85 backdrop-blur-md px-2.5 py-1 text-gray-300 border border-white/10">
                        {relatedCases.length} {relatedCases.length === 1 ? "Documented Case" : "Documented Cases"}
                      </span>
                    </div>
                    {service.subBrand && (
                      <div className="absolute bottom-4 left-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest bg-black/80 backdrop-blur-md px-2 py-0.5 text-white/90 border border-white/10">
                          {service.subBrand}
                        </span>
                      </div>
                    )}
                    {service.id === "fine-art" && (
                      <a 
                        href="https://shorturl.at/TYn8P"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-4 right-4 text-[10px] font-mono uppercase tracking-widest bg-black/90 hover:bg-white hover:text-black px-2.5 py-1 text-white border border-white/20 transition-all flex items-center gap-1.5 z-10"
                        title="Open Official Artist Monograph PDF (https://shorturl.at/TYn8P)"
                      >
                        <FileText size={11} className="text-emerald-400 group-hover:text-black" />
                        <span>Monograph PDF ↗</span>
                      </a>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-8">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">
                      {service.badge}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 group-hover:text-gray-200">
                      {service.title}
                    </h3>
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
                          {item.title}
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
                      <span>Direct Portal</span>
                      <ExternalLink size={13} />
                    </a>
                  )}

                  {service.pdfUrl && (
                    <a 
                      href={service.pdfUrl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3.5 bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs uppercase tracking-wider border border-white/20 transition-all shrink-0 font-medium"
                      title="Open Official Artist Monograph PDF (Artist Ming_2022_EN.pdf)"
                    >
                      <FileText size={13} className="text-emerald-400 hover:text-black" />
                      <span>Monograph PDF</span>
                      <ExternalLink size={12} />
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

// --- About & Operational Foundations Section ---

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-12 bg-[#060606] border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-gray-400 block mb-3">Agency Foundations</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
              Rooted in Amsterdam, Operating Across Continents.
            </h2>
            <div className="space-y-6 text-gray-300 font-light leading-relaxed text-base">
              <p>
                The Netherlands represents the optimal European gateway for commerce, culture, and digital infrastructure. However, international founders, media productions, and visual artists frequently encounter bureaucratic friction, cultural distance, and fragmented execution.
              </p>
              <p>
                YEAH Agency Amsterdam eliminates that friction through focused, sovereign practices. Whether navigating Dutch corporate incorporation, producing broadcast commercials via Glass Sharp Films, curating large-format photographic works representing Ming Ye, or engineering proprietary iOS software like DriveViewer — we deliver direct execution with European institutional rigor.
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
              <span className="text-xs font-mono text-gray-400 block mb-2">01 / Corporate Consulting</span>
              <h4 className="text-lg font-serif text-white mb-3">European Governance & Mobility</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Turnkey Dutch KvK incorporation, EPR environmental registration (packaging & WEEE), third-party personnel dispatch visas (Kennismigrant), and tier-1 banking setup.
              </p>
            </div>
            <div className="p-8 bg-black border border-white/10">
              <span className="text-xs font-mono text-gray-400 block mb-2">02 / Video Production</span>
              <h4 className="text-lg font-serif text-white mb-3">Glass Sharp Films</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Cinema-grade production for brand campaigns (Fixico, Toobit), the reality dating series 'Tram Dating', and luxury destination weddings.
              </p>
            </div>
            <div className="p-8 bg-black border border-white/10">
              <span className="text-xs font-mono text-gray-400 block mb-2">03 / Fine Art Representation</span>
              <h4 className="text-lg font-serif text-white mb-3">Artist Ming Ye (叶明)</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Sole representation of Large-Format Photography Artist Ming Ye, curatorially representing the landmark series 《Heaven 渡》, silver gelatin fiber prints, and European museum exhibitions.
              </p>
            </div>
            <div className="p-8 bg-black border border-white/10">
              <span className="text-xs font-mono text-gray-400 block mb-2">04 / Software Development</span>
              <h4 className="text-lg font-serif text-white mb-3">DriveViewer & Enterprise IT</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Proprietary iOS platform for modern driving schools live on the App Store, coupled with multi-region GDPR enterprise backbones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Contact & Direct Inquiries ---

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
                <span>{s.number}. {s.title}</span>
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
              Multidisciplinary agency collective bridging Corporate Consulting (Dutch BV formation, EPR compliance & third-party personnel dispatch visas), Video Production under Glass Sharp Films, Fine Art Representation exclusively representing Large-Format Photography Artist Ming Ye, and Software Development including DriveViewer.
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
            <span className="text-xs font-mono uppercase tracking-widest text-white block mb-4">Direct Portals & Links</span>
            <div className="space-y-2 text-xs font-mono text-gray-400">
              <p>Amsterdam, The Netherlands</p>
              <p>Direct: <a href="mailto:info@yeah-amsterdam.nl" className="text-white hover:underline">info@yeah-amsterdam.nl</a></p>
              
              <div className="pt-2 space-y-1.5">
                <div>
                  <a 
                    href="https://glasssharpfilms.nl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-300 hover:text-white inline-flex items-center gap-1.5"
                  >
                    Glass Sharp Films (Official) <ExternalLink size={11} />
                  </a>
                </div>
                <div>
                  <a 
                    href="https://apps.apple.com/nl/app/driveviewer/id6765847978?l=en-GB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-300 hover:text-white inline-flex items-center gap-1.5"
                  >
                    DriveViewer iOS App <ExternalLink size={11} />
                  </a>
                </div>
                <div>
                  <a 
                    href="https://yeah-business-amsterdam-m6sjyle.gamma.site/yeah-en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-300 hover:text-white inline-flex items-center gap-1.5"
                  >
                    Market Entry Dossier <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Global Practice Semantic Quick Jump */}
        <div className="py-8 border-b border-white/10 text-xs font-mono">
          <span className="text-gray-400 uppercase tracking-widest block mb-3 text-[11px]">
            Sovereign Practice Archive
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-400 text-xs">
            <Link to="/services/business-consulting" className="hover:text-white transition-colors">
              • Corporate Consulting — Dutch BV Incorporation & KvK
            </Link>
            <Link to="/services/business-consulting" className="hover:text-white transition-colors">
              • Corporate Consulting — EPR Environmental Compliance (Packaging & WEEE)
            </Link>
            <Link to="/services/business-consulting" className="hover:text-white transition-colors">
              • Corporate Consulting — Third-Party Personnel Dispatch & Visas
            </Link>
            <Link to="/services/creative-agency" className="hover:text-white transition-colors">
              • Video Production — Glass Sharp Films & Commercials
            </Link>
            <Link to="/services/creative-agency" className="hover:text-white transition-colors">
              • Video Production — Tram Dating Reality Series
            </Link>
            <Link to="/services/creative-agency" className="hover:text-white transition-colors">
              • Video Production — Destination Wedding Cinematography
            </Link>
            <Link to="/services/fine-art" className="hover:text-white transition-colors">
              • Fine Art Representation — Artist Ming Ye (叶明)
            </Link>
            <Link to="/services/fine-art" className="hover:text-white transition-colors">
              • Fine Art Representation — 8x10 Large-Format Photography
            </Link>
            <Link to="/services/custom-it-services" className="hover:text-white transition-colors">
              • Software Development — DriveViewer Driving School App (iOS)
            </Link>
            <Link to="/services/custom-it-services" className="hover:text-white transition-colors">
              • Software Development — Custom Cloud Architecture & GDPR
            </Link>
          </div>
        </div>

        {/* High-Authority Practice Dossiers & Topic Clusters (SEO Long-Tail Authority Hub) */}
        <div className="py-8 border-b border-white/10 text-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-emerald-400 font-mono uppercase tracking-widest text-[11px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              High-Authority Practice Dossiers &amp; Topic Guides (行业深度专栏与出海指南)
            </span>
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider hidden sm:inline">
              Verified Practice Knowledge
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/guides/dutch-branch-office-formation"
              className="p-4 bg-[#0a0a0a] border border-white/10 hover:border-emerald-500/40 transition-all group rounded-sm"
            >
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1">Corporate · 出海合规</div>
              <h5 className="font-serif text-sm text-white group-hover:text-emerald-300 transition-colors mb-1">
                荷兰开分公司全流程实操指南
              </h5>
              <p className="text-[11px] text-gray-400 font-light line-clamp-2">
                分公司(Branch Office) vs 荷兰BV子公司对比、商会KvK注册、公证海牙认证与外派员工工作签证全攻略。
              </p>
            </Link>

            <Link 
              to="/guides/video-production-amsterdam"
              className="p-4 bg-[#0a0a0a] border border-white/10 hover:border-emerald-500/40 transition-all group rounded-sm"
            >
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1">Film · 影视制作</div>
              <h5 className="font-serif text-sm text-white group-hover:text-emerald-300 transition-colors mb-1">
                Commercial Video Production in Amsterdam
              </h5>
              <p className="text-[11px] text-gray-400 font-light line-clamp-2">
                Cinema commercials, reality series ('Tram Dating'), 4K/6K ARRI &amp; RED packages, and Dutch drone filming permits.
              </p>
            </Link>

            <Link 
              to="/guides/wedding-photography-amsterdam"
              className="p-4 bg-[#0a0a0a] border border-white/10 hover:border-emerald-500/40 transition-all group rounded-sm"
            >
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1">Weddings · 婚礼旅拍</div>
              <h5 className="font-serif text-sm text-white group-hover:text-emerald-300 transition-colors mb-1">
                Destination Wedding Photography &amp; Cinema
              </h5>
              <p className="text-[11px] text-gray-400 font-light line-clamp-2">
                Amsterdam canal elopements, Kasteel De Haar castles, tulip fields &amp; bilingual Chinese-European film crew.
              </p>
            </Link>
          </div>
        </div>

        {/* Semantic Crawler Multilingual Screen-Reader Index (Ensuring Top Search Engine Discovery Across 4 Languages) */}
        <div className="sr-only" aria-label="International Search Engine Keyword Index">
          <p>
            YEAH Agency Amsterdam provides multilingual services across English, Dutch (Nederlands), Spanish (Español), and Chinese (中文):
          </p>
          <p>
            Nederlands: Bedrijfsadvies Amsterdam, BV oprichten Nederland, KvK inschrijving Amsterdam, EPR registratie Nederland (verpakkingen, AEEA/WEEE, batterijen), personeelsdetachering en kennismigrant visumbegeleiding, videoproductie Amsterdam, Glass Sharp Films, bruiloft videograaf Amsterdam, trouwfilm Nederland, Tram Dating reality serie, kunstgalerie Amsterdam, grootformaat fotografie Ming Ye kunstenaar, softwareontwikkeling Amsterdam, rijschool software DriveViewer iOS app.
          </p>
          <p>
            Español: Asesoría corporativa en Ámsterdam, constitución de empresas BV en Países Bajos, registro mercantil KvK, registro EPR / REP de envases y residuos de aparatos eléctricos, gestión de visados por desplazamiento y cesión de personal técnico altamente cualificado, producción audiovisual en Ámsterdam, Glass Sharp Films, videos de boda en Europa, serie de telerrealidad Tram Dating, representación artística, artista fotógrafo de gran formato Ming Ye, desarrollo de software a medida, app para escuelas de conducción DriveViewer.
          </p>
          <p>
            中文: 荷兰阿姆斯特丹企业咨询、荷兰公司设立、荷兰企业注册、荷兰BV注册、荷兰商会KvK合规咨询、EPR注册合规（包装法申报Afvalfonds Verpakkingen、WEEE电子电气设备、电池法）、第三方人员派遣签证办理（荷兰高技术移民Kennismigrant派遣、跨国派遣工作签证）；视频制作工作室 Glass Sharp Films、欧洲商业广告片拍摄、品牌TVC制作、欧洲目的地婚礼拍摄微电影、荷兰亚裔真人秀节目 Tram Dating 摄制；艺术品代理、大画幅摄影艺术家叶明 (Ming Ye) 独家代理、《Heaven 渡》代表作系列、8x10银盐暗房手工冲印、欧洲美术馆典藏；定制软件开发、企业级云架构与出海软件、荷兰驾校管理软件 DriveViewer iOS版。
          </p>
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

// --- Subpage FAQ Component ---

const SubpageFAQSection = ({ service }: { service: ServiceDefinition }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!service.faqs || service.faqs.length === 0) return null;

  return (
    <div className="py-20 border-b border-white/10">
      <div className="max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-[11px] font-mono uppercase tracking-widest mb-3">
          <HelpCircle size={12} className="text-emerald-400" />
          Practice Guide & FAQ
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-white">
          Frequently Answered Questions
        </h2>
        <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mt-2">
          Key considerations regarding {service.title}
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
                    <p className="px-6 pb-6 text-sm text-gray-300 font-light leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </p>
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

// --- Dedicated Practice Subpage View ---

const ServicePage = ({ defaultId }: { defaultId?: string }) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = defaultId || params.id;

  const service = SERVICES.find((s) => s.id === id);

  useEffect(() => {
    if (!service && id) {
      navigate("/");
    }
  }, [service, id, navigate]);

  if (!service) return null;

  const relatedCases = CASE_STUDIES.filter((c) => c.serviceId === service.id);

  // Dynamic SEO metadata per subpage
  usePageSEO({
    title: `${service.title} | YEAH Agency Amsterdam`,
    description: `${service.desc} Explore documented case studies, technical deliverables, and methodology at YEAH Agency Amsterdam.`,
    keywords: `${service.title}, YEAH Agency Amsterdam, ${service.badge}, ${service.scopeList.map(s => s.title).join(", ")}`,
    canonicalUrl: `https://yeah-amsterdam.nl/services/${service.id}`
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="pt-32 pb-28 px-6 md:px-12 bg-black min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-10 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Agency Home
          </Link>
          <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            Practice Division {service.number} / 04
          </div>
        </div>

        {/* Subpage Hero */}
        <div className="pb-16 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-[11px] font-mono uppercase tracking-widest mb-6">
            <span>{service.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white mb-6 leading-tight max-w-4xl">
            {service.title}
          </h1>

          {service.subBrand && (
            <p className="text-sm md:text-base font-mono text-gray-400 uppercase tracking-widest mb-6">
              {service.subBrand}
            </p>
          )}

          <p className="text-lg md:text-2xl text-gray-300 font-light max-w-3xl leading-relaxed mb-10">
            {service.tagline}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 border-t border-white/10 items-start">
            <div className="lg:col-span-8">
              <p className="text-base text-gray-300 font-light leading-relaxed">
                {service.longOverview}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <a 
                href={`mailto:info@yeah-amsterdam.nl?subject=${encodeURIComponent(`Inquiry for ${service.title}`)}`}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors font-medium"
              >
                Inquire With Practice Partners <ArrowRight size={14} />
              </a>
              {service.externalUrl && (
                <a 
                  href={service.externalUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider border border-white/10 transition-colors"
                >
                  <span>{service.externalUrl.label}</span>
                  <ExternalLink size={13} />
                </a>
              )}
              {service.pdfUrl && (
                <a 
                  href={service.pdfUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs uppercase tracking-wider border border-white/20 transition-all font-medium"
                >
                  <FileText size={14} className="text-emerald-400" />
                  <span>{service.pdfUrl.label}</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="py-12 border-b border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {service.metrics.map((m, idx) => (
            <div key={idx} className="border-l border-white/15 pl-6">
              <span className="text-3xl md:text-4xl font-serif text-white block mb-1">{m.value}</span>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Featured Spotlight (Glass Sharp Films / Ming Ye / DriveViewer) */}
        {service.featuredSpotlight && (
          <div className="py-20 border-b border-white/10">
            <div className="bg-[#080808] border border-white/15 p-8 md:p-12 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400 block mb-2">
                    {service.featuredSpotlight.badge}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-2">
                    {service.featuredSpotlight.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-6">
                    {service.featuredSpotlight.subtitle}
                  </p>
                  <p className="text-sm text-gray-300 font-light leading-relaxed mb-8">
                    {service.featuredSpotlight.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10 mb-8">
                    {service.featuredSpotlight.stats.map((st, stIdx) => (
                      <div key={stIdx}>
                        <span className="text-sm md:text-base font-serif text-white block">{st.value}</span>
                        <span className="text-[10px] font-mono text-gray-500 uppercase">{st.label}</span>
                      </div>
                    ))}
                  </div>

                  {service.featuredSpotlight.link && (
                    <a
                      href={service.featuredSpotlight.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors font-medium"
                    >
                      {service.featuredSpotlight.pdfUrl || service.featuredSpotlight.link.url.includes("shorturl") || service.featuredSpotlight.link.url.endsWith(".pdf") ? (
                        <>
                          <FileText size={14} className="text-emerald-600" />
                          <span>{service.featuredSpotlight.link.label}</span>
                          <ExternalLink size={13} />
                        </>
                      ) : (
                        <>
                          <span>Visit {service.featuredSpotlight.link.label}</span>
                          <ExternalLink size={13} />
                        </>
                      )}
                    </a>
                  )}
                </div>

                <div className="lg:col-span-5">
                  {service.featuredSpotlight.pdfUrl ? (
                    <a 
                      href={service.featuredSpotlight.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-[4/3] overflow-hidden border border-white/20 group cursor-pointer"
                      title="Open Official Artist Monograph PDF (https://shorturl.at/TYn8P)"
                    >
                      <img 
                        src={service.featuredSpotlight.image} 
                        alt={`${service.featuredSpotlight.title} — 《Heaven 渡》 Series by Ming Ye`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover contrast-125 group-hover:scale-105 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-black/90 text-white font-mono text-xs uppercase tracking-widest border border-white/30 flex items-center gap-2">
                          <FileText size={14} className="text-emerald-400" /> Open Monograph PDF ↗
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1 text-[11px] font-mono text-white border border-white/10 flex items-center gap-1.5">
                        <FileText size={12} className="text-emerald-400" />
                        <span>Official Monograph & Portfolio (PDF)</span>
                      </div>
                    </a>
                  ) : (
                    <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                      <img 
                        src={service.featuredSpotlight.image} 
                        alt={service.featuredSpotlight.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Curated Authentic Artworks Showcase by Ming Ye */}
        {service.id === "fine-art" && (
          <div className="py-20 border-b border-white/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.4em] text-emerald-400 block mb-3">
                  Curated Oeuvre · Master Analog Photography
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-white">
                  Signature Works by Ming Ye (叶明)
                </h2>
              </div>
              <p className="text-xs md:text-sm text-gray-400 max-w-md font-light leading-relaxed">
                Authentic plates from the master series 《Heaven 渡》, 《Lies 谎言》, and 《Prophecy 预言》. Handcrafted 8x10 analog view camera darkroom silver gelatin fiber prints.
              </p>
            </div>

            {/* 3 Authentic Artworks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {/* Work 01: Heaven No.0102 */}
              <div className="bg-[#080808] border border-white/10 flex flex-col justify-between group overflow-hidden">
                <div>
                  <a 
                    href="https://shorturl.at/TYn8P"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-[16/10] overflow-hidden bg-black cursor-pointer"
                    title="View 《Heaven No.0102》 in Official Monograph PDF"
                  >
                    <img 
                      src="/images/artwork-heaven-0102.jpg"
                      alt="Ming Ye (叶明) — Heaven No.0102 Large-Format Analog Photograph"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover contrast-110 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-white border border-white/10">
                      Series 《Heaven 渡》
                    </div>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="px-3 py-1.5 bg-black/90 text-white font-mono text-[11px] uppercase tracking-wider border border-white/20 flex items-center gap-1.5 shadow-xl">
                        <FileText size={12} className="text-emerald-400" /> View in PDF ↗
                      </span>
                    </div>
                  </a>
                  <div className="p-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                      Series 《Heaven 渡》 · Plate No.0102
                    </span>
                    <h4 className="text-xl font-serif text-white mb-2">《Heaven No.0102》</h4>
                    <p className="text-xs text-gray-300 font-light leading-relaxed mb-4">
                      Contemplative figures upon monumental coastal boulders and animal skeletons, investigating spiritual transcendence, mortality, and the Buddhist philosophy of crossing over (&ldquo;渡&rdquo;).
                    </p>
                    <div className="text-[11px] font-mono text-gray-400 space-y-1 pt-3 border-t border-white/10">
                      <div>Medium: 8x10 View Camera · Silver Gelatin Print</div>
                      <div>Curated Status: Permanent European Archive</div>
                      <div>Authenticity: Artist Red Seal &amp; Provenance Certificate</div>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a 
                    href="https://shorturl.at/TYn8P"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full py-2.5 px-3 bg-white/5 hover:bg-white hover:text-black text-white font-mono text-[11px] uppercase tracking-wider border border-white/10 transition-all"
                  >
                    <span>Inspect Monograph Sheet</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Work 02: Lies No.0305 */}
              <div className="bg-[#080808] border border-white/10 flex flex-col justify-between group overflow-hidden">
                <div>
                  <a 
                    href="https://shorturl.at/TYn8P"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-[16/10] overflow-hidden bg-black cursor-pointer"
                    title="View 《Lies No.0305》 in Official Monograph PDF"
                  >
                    <img 
                      src="/images/artwork-lies-0305.jpg"
                      alt="Ming Ye (叶明) — Lies No.0305 Large-Format Darkroom Photograph"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover contrast-110 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-white border border-white/10">
                      Series 《Lies 谎言》
                    </div>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="px-3 py-1.5 bg-black/90 text-white font-mono text-[11px] uppercase tracking-wider border border-white/20 flex items-center gap-1.5 shadow-xl">
                        <FileText size={12} className="text-emerald-400" /> View in PDF ↗
                      </span>
                    </div>
                  </a>
                  <div className="p-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                      Series 《Lies 谎言》 · Plate No.0305
                    </span>
                    <h4 className="text-xl font-serif text-white mb-2">《Lies No.0305》</h4>
                    <p className="text-xs text-gray-300 font-light leading-relaxed mb-4">
                      An avian bird skeleton perched delicately on dark scholar stone amidst blooming white plum blossoms, contrasting the vanity of truth, ephemeral beauty, and silence.
                    </p>
                    <div className="text-[11px] font-mono text-gray-400 space-y-1 pt-3 border-t border-white/10">
                      <div>Medium: Large-Format Darkroom Fiber Print</div>
                      <div>Theme: Vanitas &amp; Philosophical Stillness</div>
                      <div>Curated Status: Museum Exhibition Catalogued</div>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a 
                    href="https://shorturl.at/TYn8P"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full py-2.5 px-3 bg-white/5 hover:bg-white hover:text-black text-white font-mono text-[11px] uppercase tracking-wider border border-white/10 transition-all"
                  >
                    <span>Inspect Monograph Sheet</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Work 03: Prophecy No.0009 */}
              <div className="bg-[#080808] border border-white/10 flex flex-col justify-between group overflow-hidden">
                <div>
                  <a 
                    href="https://shorturl.at/TYn8P"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-[16/10] overflow-hidden bg-black cursor-pointer"
                    title="View 《Prophecy No.0009》 in Official Monograph PDF"
                  >
                    <img 
                      src="/images/artwork-prophecy-0009.jpg"
                      alt="Ming Ye (叶明) — Prophecy No.0009 Large-Format Analog Photograph"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover contrast-110 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-white border border-white/10">
                      Series 《Prophecy 预言》
                    </div>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="px-3 py-1.5 bg-black/90 text-white font-mono text-[11px] uppercase tracking-wider border border-white/20 flex items-center gap-1.5 shadow-xl">
                        <FileText size={12} className="text-emerald-400" /> View in PDF ↗
                      </span>
                    </div>
                  </a>
                  <div className="p-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                      Series 《Prophecy 预言》 · Plate No.0009
                    </span>
                    <h4 className="text-xl font-serif text-white mb-2">《Prophecy No.0009》</h4>
                    <p className="text-xs text-gray-300 font-light leading-relaxed mb-4">
                      A hooded contemplative figure seated upon a desolate rocky shore with an animal skull resting on the sand, exploring prophetic visions, cosmic stillness, and existential time.
                    </p>
                    <div className="text-[11px] font-mono text-gray-400 space-y-1 pt-3 border-t border-white/10">
                      <div>Medium: 8x10 View Camera · Archival Silver Gelatin</div>
                      <div>Theme: Metaphysical Prophecy &amp; Solitude</div>
                      <div>Representation: Sole Global Agent (YEAH Agency)</div>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a 
                    href="https://shorturl.at/TYn8P"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full py-2.5 px-3 bg-white/5 hover:bg-white hover:text-black text-white font-mono text-[11px] uppercase tracking-wider border border-white/10 transition-all"
                  >
                    <span>Inspect Monograph Sheet</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* Institutional Provenance & Monograph Publication Layout */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.4em] text-emerald-400 block mb-3">
                  Institutional Archives · European Museum Provenance
                </span>
                <h3 className="text-2xl md:text-4xl font-serif text-white">
                  Official Monograph &amp; European Retrospective Record
                </h3>
              </div>
            </div>

            {/* Curatorial Dual Layout: Institutional Provenance & Monograph Publication Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              {/* Left Column: Curatorial Background & Documented European Exhibitions */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-8 bg-[#080808] border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-2 py-0.5 bg-emerald-950/40 border border-emerald-500/30">
                      Authentic Provenance &amp; Conservation Standard
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3">
                    Institutional Catalog Raisonné &amp; Archival Integrity
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-6">
                    To preserve the optical fidelity of the analog silver gelatin darkroom prints, artist copyright, and museum conservation standards, all authorized plates, series documentation, and curatorial essays are curated exclusively within the official Artist Monograph. Access the verified publication below.
                  </p>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Documented European Institutional Exhibitions:
                    </div>
                    <div className="p-4 bg-black/60 border border-white/5 space-y-1">
                      <div className="text-sm font-serif text-white italic">
                        &ldquo;Konstruierte Natur: Landschaft im Wandel in der zeitgenössischen Kunst&rdquo;
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400">
                        Schloss Plüschow, Mecklenburgisches Künstlerhaus, Germany · 2024
                      </div>
                      <div className="text-[11px] text-gray-400 font-light">
                        Curated institutional presentation of large-format landscape and conceptual analog photography.
                      </div>
                    </div>

                    <div className="p-4 bg-black/60 border border-white/5 space-y-1">
                      <div className="text-sm font-serif text-white italic">
                        &ldquo;洞见 – Einblick II: Zeitgenössische Fotografie&rdquo;
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400">
                        Rostock, Germany · 2022
                      </div>
                      <div className="text-[11px] text-gray-400 font-light">
                        Institutional survey of contemporary photographic vision and darkroom silver gelatin printing.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-[#080808] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      Museum Acquisitions &amp; Collector Liaison
                    </div>
                    <div className="text-xs text-gray-300 font-light">
                      Strictly limited editions, signed and authenticated with the artist&apos;s personal seal.
                    </div>
                  </div>
                  <a
                    href="mailto:info@yeah-amsterdam.nl?subject=Acquisition%20Inquiry%20for%20Artist%20Ming%20Ye"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white hover:text-black text-white font-mono text-xs uppercase tracking-wider border border-white/20 transition-all shrink-0"
                  >
                    <span>Curatorial Inquiry</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Monograph Publication Card */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="bg-[#080808] border border-white/10 flex-1 flex flex-col justify-between group overflow-hidden">
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                        Official Publication
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">
                        PDF Format · Verified Document
                      </span>
                    </div>
                    <h3 className="text-xl font-serif text-white mb-2">
                      Artist Ming Ye Monograph
                    </h3>
                    <p className="text-xs text-gray-400 font-light mb-4">
                      Complete exhibition portfolio, photographic essays, high-resolution archival plates, and artist biography.
                    </p>
                  </div>

                  <a 
                    href="https://shorturl.at/TYn8P"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-[4/5] mx-6 mb-6 overflow-hidden border border-white/20 group/card cursor-pointer bg-black"
                    title="Open Official Artist Monograph PDF (https://shorturl.at/TYn8P)"
                  >
                    <img 
                      src="/images/artist-mingye.svg"
                      alt="Ming Ye (叶明) — Official Artist Monograph & Catalogue Raisonné"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain p-2 group-hover/card:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover/card:opacity-100 transition-opacity px-4 py-2 bg-black/95 text-white font-mono text-xs uppercase tracking-widest border border-white/40 flex items-center gap-2 shadow-2xl">
                        <FileText size={14} className="text-emerald-400" /> Open Monograph PDF ↗
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 bg-black/90 backdrop-blur-md px-3 py-1.5 text-[11px] font-mono text-white border border-white/10 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <FileText size={12} />
                        <span className="text-white">shorturl.at/TYn8P</span>
                      </span>
                      <ExternalLink size={12} className="text-gray-400" />
                    </div>
                  </a>

                  <div className="p-6 pt-0">
                    <a 
                      href="https://shorturl.at/TYn8P"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors font-medium border border-white"
                    >
                      <FileText size={14} className="text-emerald-600" />
                      <span>Open Monograph PDF (shorturl.at/TYn8P)</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Monograph Callout Banner */}
            <div className="p-8 md:p-10 bg-[#0c0c0c] border border-white/15 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-2 py-0.5 bg-emerald-950/40 border border-emerald-500/30">
                    Verified Institutional Provenance
                  </span>
                  <span className="text-xs font-mono text-gray-500">Exhibitions in Germany &amp; Europe</span>
                </div>
                <h3 className="text-2xl font-serif text-white">
                  Official Monograph, Catalog Raisonné &amp; Acquisition Folio
                </h3>
                <p className="text-xs text-gray-300 font-light max-w-2xl leading-relaxed">
                  Including documented exhibitions: <span className="text-white italic">&ldquo;Konstruierte Natur: Landschaft im Wandel in der zeitgenössischen Kunst&rdquo;</span> (Schloss Plüschow, 2024) and <span className="text-white italic">&ldquo;洞见 – Einblick II&rdquo;</span> (Rostock, 2022). All catalog essays, plates, and acquisition protocols are collected in the official PDF document.
                </p>
              </div>
              <a 
                href="https://shorturl.at/TYn8P"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors font-medium shrink-0 shadow-lg"
              >
                <FileText size={16} className="text-emerald-600" />
                <span>Open Monograph PDF (shorturl.at/TYn8P)</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}

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

        {/* Dedicated Case Studies for this Practice */}
        <div className="py-20 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-gray-400 block mb-3">Case History</span>
              <h2 className="text-3xl md:text-4xl font-serif text-white">Documented Case Studies</h2>
            </div>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              {relatedCases.length} {relatedCases.length === 1 ? "Verified Case Study" : "Verified Engagements"}
            </p>
          </div>

          <div className={cn(
            "grid gap-8",
            relatedCases.length === 1 ? "grid-cols-1 max-w-4xl" : "grid-cols-1 md:grid-cols-2"
          )}>
            {relatedCases.map((cs) => (
              <div key={cs.id} className="bg-[#090909] border border-white/10 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    {cs.pdfLink ? (
                      <a 
                        href={cs.pdfLink.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full h-full relative group/img cursor-pointer"
                        title={cs.pdfLink.label}
                      >
                        <img 
                          src={cs.image} 
                          alt={`${cs.title} — Ming Ye 《Heaven 渡》 Series Large-Format Photography`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover grayscale contrast-125 group-hover/img:scale-105 group-hover/img:grayscale-0 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover/img:bg-black/10 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover/img:opacity-100 transition-opacity px-4 py-2 bg-black/90 text-white font-mono text-xs uppercase tracking-widest border border-white/30 flex items-center gap-2">
                            <FileText size={14} className="text-emerald-400" /> Open Monograph PDF ↗
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-3 z-10 bg-black/90 backdrop-blur-md px-2.5 py-1 text-white border border-white/20 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 group-hover/img:bg-white group-hover/img:text-black transition-colors">
                          <FileText size={11} className="text-emerald-400 group-hover/img:text-black" />
                          <span>PDF Monograph ↗</span>
                        </div>
                      </a>
                    ) : (
                      <img 
                        src={cs.image} 
                        alt={cs.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover grayscale contrast-125"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="absolute top-4 left-4 z-10 pointer-events-none">
                      <span className="text-[10px] font-mono uppercase tracking-widest bg-black/85 px-3 py-1 text-white border border-white/10">
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

                <div className="p-8 pt-0 space-y-4">
                  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-sm">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 size={12} /> Results & Measured Impact
                    </span>
                    <p className="text-xs text-gray-300 font-light">{cs.outcome}</p>
                  </div>

                  {cs.externalLink && (
                    <a
                      href={cs.externalLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-white hover:text-gray-300 transition-colors uppercase tracking-wider"
                    >
                      <span>{cs.externalLink.label}</span>
                      <ExternalLink size={12} />
                    </a>
                  )}

                  {cs.pdfLink && (
                    <a
                      href={cs.pdfLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-white text-black font-mono text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors font-medium border border-white"
                    >
                      <FileText size={14} />
                      <span>{cs.pdfLink.label}</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice FAQ Guide */}
        <SubpageFAQSection service={service} />

        {/* Practice Direct Inquire Banner */}
        <div className="mt-16 p-8 md:p-12 bg-[#090909] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400 block mb-2">Dedicated Practice Inquiry</span>
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">Initiate an Engagement with Practice {service.number}</h3>
            <p className="text-xs text-gray-400 font-light max-w-xl">
              Direct consultation with our senior practice partners in Amsterdam. All business proposals and corporate records are treated with strict confidentiality.
            </p>
          </div>
          <a 
            href={`mailto:info@yeah-amsterdam.nl?subject=${encodeURIComponent(`Engagement Inquiry for Practice ${service.number}: ${service.title}`)}`}
            className="inline-flex items-center gap-3 px-6 py-4 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors font-medium shrink-0"
          >
            Email info@yeah-amsterdam.nl <ArrowRight size={14} />
          </a>
        </div>

        {/* Cross-Practice Navigation */}
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
                    <span>PRACTICE {s.number}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-gray-400 group-hover:text-white" />
                  </div>
                  <h4 className="font-serif text-lg text-white group-hover:italic transition-all">{s.title}</h4>
                  {s.subBrand && (
                    <p className="text-[11px] font-mono text-gray-400 mt-1">{s.subBrand}</p>
                  )}
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
// Notice: The intrusive CapabilitiesDirectory index is removed completely from the visual homepage as requested!

const HomePage = () => {
  usePageSEO({
    title: "YEAH Agency Amsterdam | Multidisciplinary Agency · Video Production, Corporate Consulting, Fine Art & Software",
    description: "YEAH Agency Amsterdam is an international multidisciplinary agency collective in Amsterdam. Specializing in Corporate Consulting, Video Production under Glass Sharp Films, Fine Art Representation of Large-Format Photography Artist Ming Ye, and Software Development including DriveViewer.",
    keywords: "Corporate Consulting Amsterdam, Dutch BV Formation, Video Production Amsterdam, Glass Sharp Films, Tram Dating, Wedding Videography Amsterdam, Fine Art Representation, Artist Ming Ye, Ming Ye Photography, Large Format Photography Artist, Software Development Amsterdam, DriveViewer iOS, Enterprise Cloud Architecture",
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

              {/* Dedicated High-Authority SEO Topic Dossiers & Long-Tail Landing Routes */}
              <Route path="/guides/:slug" element={<GuidePage />} />
              <Route path="/guides/dutch-branch-office-formation" element={<GuidePage defaultSlug="dutch-branch-office-formation" />} />
              <Route path="/dutch-branch-office" element={<GuidePage defaultSlug="dutch-branch-office-formation" />} />
              <Route path="/guides/video-production-amsterdam" element={<GuidePage defaultSlug="video-production-amsterdam" />} />
              <Route path="/video-production-amsterdam" element={<GuidePage defaultSlug="video-production-amsterdam" />} />
              <Route path="/guides/wedding-photography-amsterdam" element={<GuidePage defaultSlug="wedding-photography-amsterdam" />} />
              <Route path="/wedding-photography" element={<GuidePage defaultSlug="wedding-photography-amsterdam" />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
