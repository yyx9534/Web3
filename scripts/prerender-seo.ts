import fs from "node:fs";
import path from "node:path";
import { DETAILED_GUIDES } from "../src/guidesData";

interface PrerenderRoute {
  routePath: string;
  canonicalUrl: string;
  lang: string;
  title: string;
  description: string;
  keywords: string;
  ogType: "website" | "article";
  ogImage: string;
  jsonLd: Record<string, unknown>;
  semanticBodyHtml: string;
}

const DIST_DIR = path.resolve(process.cwd(), "dist");
const BASE_HTML_PATH = path.join(DIST_DIR, "index.html");
const BASE_ORIGIN = "https://yeah-amsterdam.nl";

const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const escapeJsonForScript = (data: Record<string, unknown>): string =>
  JSON.stringify(data, null, 2).replace(/<\/script/gi, "<\\/script");

interface ServicePreRenderMeta {
  id: string;
  aliases: string[];
  number: string;
  title: string;
  shortTitle: string;
  badge: string;
  tagline: string;
  description: string;
  keywords: string;
  heroImage: string;
  highlights: string[];
  faqs: { q: string; a: string }[];
}

const SERVICES_PRERENDER: ServicePreRenderMeta[] = [
  {
    id: "business-consulting",
    aliases: ["business-consulting"],
    number: "01",
    title: "Corporate Consulting: Dutch BV Formation, EPR & Personnel Dispatch",
    shortTitle: "Corporate Consulting | YEAH Agency Amsterdam",
    badge: "DUTCH BV FORMATION · EPR COMPLIANCE · PERSONNEL DISPATCH",
    tagline:
      "Turnkey Dutch corporate landing, EPR environmental compliance, personnel dispatch visas, and European fiscal governance.",
    description:
      "Turnkey Dutch BV & Branch Office setup in Amsterdam: KvK registration, Verpact EPR packaging & WEEE compliance, and EOR Kennismigrant visas in ~21 business days.",
    keywords:
      "Corporate Consulting Amsterdam, Dutch BV Formation, Netherlands Branch Office, KvK Registration, EPR Registration Netherlands, Verpact Afvalfonds Verpakkingen, WEEE Stichting OPEN, Personnel Dispatch Kennismigrant Visa, 荷兰开分公司, 荷兰BV注册, 荷兰EPR注册, 第三方人员派遣",
    heroImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    highlights: [
      "Dutch BV Incorporation & Foreign Branch Office (Bijkantoor / 荷兰开分公司) KvK Registration in 2–5 weeks",
      "Extended Producer Responsibility (EPR / 荷兰包装法 Verpact, WEEE Stichting OPEN & Batteries Stibat)",
      "Third-Party Personnel Dispatch (EOR) & IND Kennismigrant Work Visas in ~21 business days",
      "Dutch Belastingdienst BTW (VAT), EU EORI Customs Number, Article 23 Deferment & 30% Tax Ruling",
    ],
    faqs: [
      {
        q: "How does third-party personnel dispatch work for companies without a Dutch IND sponsor entity?",
        a: "Through accredited Dutch IND Recognized Sponsor partners, YEAH Agency legally employs and dispatches your specialists to Amsterdam with valid Kennismigrant work and residence permits in approximately 21 business days.",
      },
      {
        q: "What is EPR registration in the Netherlands and who must comply?",
        a: "Companies placing packaged goods, electronics, or batteries onto the Dutch market must comply with Verpact (Afvalfonds Verpakkingen), Nationaal (W)EEE Register / Stichting OPEN, and Stibat battery reporting to avoid marketplace suspensions and customs fines.",
      },
    ],
  },
  {
    id: "creative-agency",
    aliases: ["video-production", "creative-agency"],
    number: "02",
    title: "Video Production & Destination Weddings — Glass Sharp Films",
    shortTitle: "Video Production | Glass Sharp Films Amsterdam",
    badge: "COMMERCIAL CINEMATOGRAPHY, REALITY TV & WEDDINGS",
    tagline:
      "Commercial brand campaigns, broadcast reality series ('Tram Dating'), and luxury destination wedding cinematography across Europe.",
    description:
      "Amsterdam video production studio Glass Sharp Films: commercial TVCs, Tram Dating reality series, ARRI & RED 8K packages, RDW drone aerials, and bilingual weddings.",
    keywords:
      "Video Production Amsterdam, Glass Sharp Films, Commercial Film Production Netherlands, Tram Dating Reality Series, ARRI Alexa Mini LF Amsterdam, RDW Drone Cinematography Netherlands, Wedding Photography Amsterdam, Destination Wedding Videographer Europe, 阿姆斯特丹视频制作, 欧洲婚礼摄影跟拍",
    heroImage:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    highlights: [
      "Commercial Brand Campaigns (Toobit x Chris Sharma 2.5M+ views, Fixico x MyWheels, Olympic athlete documentaries)",
      "Original Broadcast Reality Series Production ('Tram Dating' filmed aboard heritage Amsterdam trams)",
      "ARRI Alexa Mini LF, RED V-Raptor 8K & EASA/RDW-Certified Amsterdam Canal Aerial Drone Packages",
      "Bilingual Luxury Destination Wedding Photography & 4K Cinema Films (English, Mandarin, Cantonese, Dutch)",
    ],
    faqs: [
      {
        q: "What commercial work has Glass Sharp Films produced in the Netherlands?",
        a: "Glass Sharp Films produced global campaigns for Toobit featuring Chris Sharma, commercial films for Fixico x MyWheels, a documentary portrait of Dutch Olympic Champion Hermijntje Drenth, and the reality dating series Tram Dating.",
      },
      {
        q: "Do you handle Amsterdam municipal filming permits and aerial drone approvals?",
        a: "Yes. Our local production team secures Gemeente Amsterdam street and canal filming permits alongside certified EASA / ILenT / RDW commercial drone flight clearances.",
      },
    ],
  },
  {
    id: "custom-it-services",
    aliases: ["custom-it-services", "enterprise-it"],
    number: "03",
    title: "Software Development — DriveViewer iOS & Enterprise GDPR Cloud",
    shortTitle: "Software Development | DriveViewer & Cloud Systems",
    badge: "PROPRIETARY IOS PLATFORMS & ENTERPRISE SYSTEMS",
    tagline:
      "Resilient EU GDPR cloud architectures, Dutch Customs (Douane EDI) ERPs, and DriveViewer iOS on the Apple App Store.",
    description:
      "Amsterdam software development agency behind DriveViewer iOS for Dutch driving schools, EU GDPR multi-region cloud systems, and Douane EDI customs trade ERPs.",
    keywords:
      "Software Development Amsterdam, DriveViewer iOS, Rijschool Software Netherlands, Enterprise Cloud Architecture Europe, GDPR Compliant Software Amsterdam, Douane EDI ERP Rotterdam, 荷兰定制软件开发, 驾校软件 DriveViewer",
    heroImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    highlights: [
      "DriveViewer iOS (Apple App Store ID 6765847978): 46-point CBR exam progress grading and lesson telemetry for Dutch Rijscholen",
      "Rotterdam Port Customs & Automated Multi-Currency Trade ERP integrated with Dutch Douane EDI (€45M+ annual volume)",
      "Cross-Border Asia-Europe GDPR Cloud Backbones (Apache Kafka + Kubernetes, <200ms latency, 99.995% SLA)",
    ],
    faqs: [
      {
        q: "What is DriveViewer iOS and who uses it?",
        a: "DriveViewer is a proprietary iOS SaaS application developed by YEAH Agency Amsterdam for Dutch driving schools (Rijscholen), offering 46-point CBR exam tracking, scheduling, and real-time student progress dashboards.",
      },
    ],
  },
];

const renderSiteHeaderNav = (): string => `
      <header style="padding: 20px 24px; background: #F6F4EF; color: #141413; border-bottom: 1px solid #E2DDD3;">
        <nav aria-label="Primary Site Navigation">
          <a href="/" style="font-weight: 600; color: #141413; text-decoration: none; margin-right: 16px;">YEAH Agency Amsterdam</a>
          <a href="/services/business-consulting" style="color: #D94E28; margin-right: 14px;">01. Corporate Consulting</a>
          <a href="/services/creative-agency" style="color: #D94E28; margin-right: 14px;">02. Video Production</a>
          <a href="/services/custom-it-services" style="color: #D94E28; margin-right: 14px;">03. Software Development</a>
          <a href="/guides/dutch-branch-office-formation" style="color: #141413; margin-right: 12px;">Dossiers</a>
          <a href="/llms-full.txt" style="color: #141413;">llms-full.txt</a>
        </nav>
      </header>`;

const buildServiceRoute = (
  service: ServicePreRenderMeta,
  routePath: string
): PrerenderRoute => {
  const canonicalUrl = `${BASE_ORIGIN}/services/${service.id}`;
  const relatedGuides = DETAILED_GUIDES.filter(
    (g) => g.relatedPracticeId === service.id
  );

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "YEAH Agency Amsterdam",
            item: `${BASE_ORIGIN}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: service.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Service",
        name: service.title,
        serviceType: service.badge,
        description: service.description,
        url: canonicalUrl,
        provider: {
          "@type": "Organization",
          name: "YEAH Agency Amsterdam",
          url: `${BASE_ORIGIN}/`,
          email: "info@yeah-amsterdam.nl",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Amsterdam",
            addressCountry: "NL",
          },
        },
        areaServed: ["Netherlands", "European Union", "China", "United States"],
      },
      ...(service.id === "custom-it-services"
        ? [
            {
              "@type": "SoftwareApplication",
              name: "DriveViewer",
              operatingSystem: "iOS",
              applicationCategory: "BusinessApplication",
              url: "https://apps.apple.com/nl/app/driveviewer/id6765847978?l=en-GB",
              description:
                "Driving school management platform in the Netherlands featuring 46-point CBR exam tracking.",
            },
          ]
        : []),
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };

  const semanticBodyHtml = `
      ${renderSiteHeaderNav()}
      <main style="padding: 28px 24px; background: #F6F4EF; color: #141413; max-width: 980px; margin: 0 auto;">
        <article>
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.14em; color: #D94E28;">Practice ${escapeHtml(service.number)} · ${escapeHtml(service.badge)}</p>
          <h1>${escapeHtml(service.title)}</h1>
          <p>${escapeHtml(service.tagline)}</p>
          <p>${escapeHtml(service.description)}</p>
          <h2>Core Deliverables &amp; Capabilities</h2>
          <ul>
            ${service.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("\n            ")}
          </ul>
          ${
            relatedGuides.length > 0
              ? `<h2>In-Depth Practice Guides &amp; Dossiers</h2>
          <ul>
            ${relatedGuides
              .map(
                (g) =>
                  `<li><a href="/guides/${escapeHtml(g.slug)}">${escapeHtml(g.title)}</a> — ${escapeHtml(g.metaDescription)}</li>`
              )
              .join("\n            ")}
          </ul>`
              : ""
          }
          <h2>Frequently Asked Questions</h2>
          ${service.faqs
            .map(
              (f) =>
                `<section><h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p></section>`
            )
            .join("\n          ")}
        </article>
      </main>`;

  return {
    routePath,
    canonicalUrl,
    lang: "en",
    title: service.shortTitle,
    description: service.description,
    keywords: service.keywords,
    ogType: "website",
    ogImage: service.heroImage,
    jsonLd,
    semanticBodyHtml,
  };
};

const buildGuideRoute = (
  guide: (typeof DETAILED_GUIDES)[number],
  routePath: string
): PrerenderRoute => {
  const isZhPrimary = /[\u4e00-\u9fa5]/.test(guide.title);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "YEAH Agency Amsterdam",
            item: `${BASE_ORIGIN}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: guide.relatedPracticeName,
            item: `${BASE_ORIGIN}/services/${guide.relatedPracticeId}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.title,
            item: guide.canonicalUrl,
          },
        ],
      },
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.metaDescription,
        image: guide.heroImage,
        dateModified: "2026-11-24",
        inLanguage: isZhPrimary ? "zh-CN" : "en",
        author: {
          "@type": "Organization",
          name: "YEAH Agency Amsterdam",
          url: `${BASE_ORIGIN}/`,
        },
        publisher: {
          "@type": "Organization",
          name: "YEAH Agency Amsterdam",
        },
        mainEntityOfPage: guide.canonicalUrl,
      },
      ...(guide.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: guide.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  const semanticBodyHtml = `
      ${renderSiteHeaderNav()}
      <main style="padding: 28px 24px; background: #F6F4EF; color: #141413; max-width: 980px; margin: 0 auto;">
        <article>
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.14em; color: #D94E28;">${escapeHtml(guide.badge)}</p>
          <h1>${escapeHtml(guide.title)}</h1>
          <p>${escapeHtml(guide.subtitle)}</p>
          <p>${escapeHtml(guide.introduction)}</p>
          <section>
            <h2>Key Practice Highlights</h2>
            <ul>
              ${guide.highlights
                .map((h) => `<li><strong>${escapeHtml(h.label)}:</strong> ${escapeHtml(h.value)}</li>`)
                .join("\n              ")}
            </ul>
          </section>
          ${guide.sections
            .map(
              (sec) => `<section>
            <h2>${escapeHtml(sec.title)}</h2>
            ${sec.subtitle ? `<p><em>${escapeHtml(sec.subtitle)}</em></p>` : ""}
            <p>${escapeHtml(sec.content)}</p>
            ${
              sec.bulletPoints && sec.bulletPoints.length > 0
                ? `<ul>${sec.bulletPoints.map((bp) => `<li>${escapeHtml(bp)}</li>`).join("")}</ul>`
                : ""
            }
            ${
              sec.tableData
                ? `<table><thead><tr>${sec.tableData.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead><tbody>${sec.tableData.rows
                    .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
                    .join("")}</tbody></table>`
                : ""
            }
          </section>`
            )
            .join("\n          ")}
          ${
            guide.faqs.length > 0
              ? `<section>
            <h2>Frequently Asked Questions</h2>
            ${guide.faqs
              .map(
                (f) =>
                  `<div><h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p></div>`
              )
              .join("\n            ")}
          </section>`
              : ""
          }
          <p>Lead Practice: <a href="/services/${escapeHtml(guide.relatedPracticeId)}">${escapeHtml(guide.relatedPracticeName)}</a> · Contact: <a href="mailto:info@yeah-amsterdam.nl">info@yeah-amsterdam.nl</a></p>
        </article>
      </main>`;

  return {
    routePath,
    canonicalUrl: guide.canonicalUrl,
    lang: isZhPrimary ? "zh-CN" : "en",
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    ogType: "article",
    ogImage: guide.heroImage,
    jsonLd,
    semanticBodyHtml,
  };
};

const replaceOrInjectTag = (
  html: string,
  pattern: RegExp,
  replacement: string
): string => {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }
  return html.replace("</head>", `    ${replacement}\n  </head>`);
};

const renderHtmlForRoute = (baseHtml: string, route: PrerenderRoute): string => {
  let out = baseHtml;

  out = out.replace(/<html lang="[^"]*">/, `<html lang="${escapeHtml(route.lang)}">`);
  out = replaceOrInjectTag(
    out,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`
  );
  out = replaceOrInjectTag(
    out,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );
  out = replaceOrInjectTag(
    out,
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/,
    `<meta name="keywords" content="${escapeHtml(route.keywords)}" />`
  );
  out = replaceOrInjectTag(
    out,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtml(route.canonicalUrl)}" />`
  );
  out = out.replace(
    /<!-- Multilingual Alternate Links[\s\S]*?<link rel="alternate" hreflang="zh"[^>]*>/,
    `<!-- Multilingual Alternate Links -->\n    <link rel="alternate" hreflang="x-default" href="${escapeHtml(route.canonicalUrl)}" />\n    <link rel="alternate" hreflang="${escapeHtml(route.lang)}" href="${escapeHtml(route.canonicalUrl)}" />`
  );
  out = replaceOrInjectTag(
    out,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${route.ogType}" />`
  );
  out = replaceOrInjectTag(
    out,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  );
  out = replaceOrInjectTag(
    out,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );
  out = replaceOrInjectTag(
    out,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeHtml(route.canonicalUrl)}" />`
  );
  out = replaceOrInjectTag(
    out,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${escapeHtml(route.ogImage)}" />`
  );
  out = replaceOrInjectTag(
    out,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  );
  out = replaceOrInjectTag(
    out,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );
  out = replaceOrInjectTag(
    out,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${escapeHtml(route.ogImage)}" />`
  );

  // Replace root JSON-LD graph with route-specific structured data
  out = out.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n    ${escapeJsonForScript(route.jsonLd)}\n    </script>`
  );

  // Replace the inner contents of <div id="root">...</div> right before <script type="module"
  out = out.replace(
    /<div id="root">[\s\S]*?<\/div>\s*(?=<script type="module")/,
    `<div id="root">\n${route.semanticBodyHtml}\n    </div>\n    `
  );

  return out;
};

function runPrerender() {
  if (!fs.existsSync(BASE_HTML_PATH)) {
    throw new Error(`Missing compiled dist/index.html at ${BASE_HTML_PATH}`);
  }

  const baseHtml = fs.readFileSync(BASE_HTML_PATH, "utf-8");
  const routes: PrerenderRoute[] = [];

  for (const svc of SERVICES_PRERENDER) {
    routes.push(buildServiceRoute(svc, `services/${svc.id}`));
    for (const alias of svc.aliases) {
      routes.push(buildServiceRoute(svc, alias));
    }
  }

  const guideAliases: Record<string, string[]> = {
    "dutch-branch-office-formation": ["dutch-branch-office"],
    "video-production-amsterdam": ["video-production-amsterdam"],
    "wedding-photography-amsterdam": ["wedding-photography"],
  };

  for (const guide of DETAILED_GUIDES) {
    routes.push(buildGuideRoute(guide, `guides/${guide.slug}`));
    const aliases = guideAliases[guide.slug] || [];
    for (const alias of aliases) {
      routes.push(buildGuideRoute(guide, alias));
    }
  }

  for (const route of routes) {
    const cleanRel = route.routePath.replace(/^\/+|\/+$/g, "");
    const html = renderHtmlForRoute(baseHtml, route);

    // 1. Write clean extension file (dist/<route>.html) for Vercel cleanUrls & trailingSlash:false (HTTP 200, no redirect)
    const flatFile = path.join(DIST_DIR, `${cleanRel}.html`);
    fs.mkdirSync(path.dirname(flatFile), { recursive: true });
    fs.writeFileSync(flatFile, html, "utf-8");

    // 2. Write directory index file (dist/<route>/index.html) for standard static servers
    const targetDir = path.join(DIST_DIR, cleanRel);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, "index.html"), html, "utf-8");
  }

  console.log(
    `[SEO Prerender] Generated ${routes.length} static route HTML files in dist/ with unique canonicals, JSON-LD, and semantic markup.`
  );
}

runPrerender();
