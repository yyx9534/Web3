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
  embedUrl?: string;
  videoMeta?: {
    uploadDate: string;
    duration?: string;
  };
  seoKeywords?: string[];
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

export const toCanonicalVideoEmbedUrl = (rawUrl: string): string => {
  const vimeoMatch = rawUrl.match(/(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  const ytMatch = rawUrl.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i
  );
  if (ytMatch) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
  }
  return rawUrl;
};

export const VIDEO_PRODUCTION_CASES: CaseStudy[] = [
  {
    id: "case-aspadz-fatbike",
    title: "Aspadz Fatbike Amsterdam — Urban E-Mobility Commercial",
    clientCategory: "Electric Mobility & Lifestyle · Amsterdam, Netherlands",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "01 · COMMERCIAL AD · ASPADZ AMSTERDAM",
    summary:
      "High-energy urban e-bike commercial filmed across Amsterdam streets and canals for Aspadz Fatbike, showcasing power, ride agility, and contemporary Dutch commuter style.",
    challenge:
      "Capturing fast-moving fatbike tracking shots through busy Amsterdam bike lanes and cobblestone bridges while keeping dynamic stability and crisp product focus.",
    solution:
      "Deployed stabilized gimbal and vehicle tracking rigs paired with rhythmic commercial sound design and urban color grading built for social and retail campaigns.",
    deliverables: [
      "Hero commercial brand spot (0:57 master edit)",
      "Dynamic Amsterdam street tracking & product detail cinematography",
      "Multi-ratio paid social ad cutdowns for Meta, TikTok & YouTube",
      "Custom motion sound design and DaVinci Resolve film grade",
    ],
    outcome:
      "Delivered a high-impact commercial launch asset showcasing Aspadz fatbikes across real Amsterdam riding environments.",
    image:
      "https://i.vimeocdn.com/video/2010646482-5398af13c453aaad0f98b8c5bc813c10f1a9bca1ca8d715547e036055189cba6-d_1280?region=us",
    embedUrl: "https://vimeo.com/1080128369",
    videoMeta: {
      uploadDate: "2025-04-30T05:45:16Z",
      duration: "PT57S",
    },
    seoKeywords: [
      "E-bike commercial video Amsterdam",
      "Fatbike brand film Netherlands",
      "Product launch video production",
      "Bedrijfsfilm laten maken Amsterdam",
      "荷兰电动车广告拍摄",
      "阿姆斯特丹商业广告制作",
    ],
    externalLink: {
      label: "Watch on Vimeo",
      url: "https://vimeo.com/1080128369",
    },
  },
  {
    id: "case-hanshow-budapest",
    title: "Hanshow Budapest — Enterprise Customer Interview & Retail Tech Film",
    clientCategory: "Smart Retail IoT & Global Enterprise · Budapest, Hungary",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "02 · CUSTOMER INTERVIEW · HANSHOW EUROPE",
    summary:
      "Pan-European B2B customer testimonial film shot on-site in Budapest for global digital retail leader Hanshow, documenting live electronic shelf label deployment in active supermarket aisles.",
    challenge:
      "Recording clean, authoritative executive interviews inside operating retail stores while illustrating real-time ESL hardware performance under mixed fluorescent store lighting.",
    solution:
      "Dispatched a lean European travel cinema unit to Budapest with controlled interview key lighting, wireless dual-channel audio, and macro hardware B-roll.",
    deliverables: [
      "Enterprise customer case study & executive interview film (3:19 master)",
      "Live retail store workflow cinematography in Budapest",
      "Broadcast-clean multilingual audio mixing and subtitle finishing",
      "Global B2B sales enablement and trade show presentation edit",
    ],
    outcome:
      "Enabled Hanshow's European commercial team to present authentic client proof across international retail expos and enterprise sales.",
    image:
      "https://i.vimeocdn.com/video/2010649515-d24f0c46c92d52bf90dcd6031019fbb04010e73372c7d81a5a2cf8b9313809d5-d_1280?region=us",
    embedUrl: "https://vimeo.com/1080130834",
    videoMeta: {
      uploadDate: "2025-04-30T05:54:59Z",
      duration: "PT3M19S",
    },
    seoKeywords: [
      "B2B customer interview video Europe",
      "Retail technology case study film",
      "Corporate testimonial videographer Budapest",
      "Klantvideo laten maken Europa",
      "欧洲B2B企业客户采访拍摄",
      "出海企业品牌宣传片制作",
    ],
    externalLink: {
      label: "Watch on Vimeo",
      url: "https://vimeo.com/1080130834",
    },
  },
  {
    id: "case-ymoas-pet-commercial",
    title: "Ymoas Pet Supplies — E-Commerce Brand & Product Commercial",
    clientCategory: "Consumer Pet Products · D2C Brand Commercial",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "03 · PRODUCT COMMERCIAL · YMOAS PET",
    summary:
      "Playful, tactile commercial spot for pet lifestyle brand Ymoas highlighting durable dog toy design, joyful pet interaction, and clean studio-to-lifestyle storytelling.",
    challenge:
      "Directing unpredictable canine talent in tight commercial timing while showcasing product texture, bite resilience, and immediate visual appeal within a 22-second ad window.",
    solution:
      "Shot high-frame-rate action close-ups with bright natural daylight shaping and snappy pacing engineered specifically for high conversion on Amazon and D2C storefronts.",
    deliverables: [
      "Conversion-focused product commercial master (0:22 ad spot)",
      "High-frame-rate pet action and tactile product macro shots",
      "Clean lifestyle lighting and bright color grading",
      "Marketplace and paid social video variations",
    ],
    outcome:
      "Created an engaging, repeatable commercial showcase driving product trust across European e-commerce channels.",
    image:
      "https://i.vimeocdn.com/video/2010649308-32779288c7b56f77abcf48a391a7b72dc5b3ed003a8ba4f344ae902130d692fd-d_1280?region=us",
    embedUrl: "https://vimeo.com/1080130627",
    videoMeta: {
      uploadDate: "2025-04-30T05:54:17Z",
      duration: "PT22S",
    },
    seoKeywords: [
      "Pet product commercial video Netherlands",
      "Amazon EU product video production",
      "D2C brand ad shoot Amsterdam",
      "Productvideo laten maken Nederland",
      "荷兰跨境电商产品广告拍摄",
      "宠物用品TVC短视频制作",
    ],
    externalLink: {
      label: "Watch on Vimeo",
      url: "https://vimeo.com/1080130627",
    },
  },
  {
    id: "case-chinese-restaurant-trailer",
    title: "Chinese Restaurant Documentary — Concept Trailer",
    clientCategory: "Culinary & Cultural Documentary · Original Production",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "04 · DOCUMENTARY TRAILER · CULINARY",
    summary:
      "Atmospheric concept trailer exploring the culinary heritage, kitchen craft, and diaspora stories behind overseas Chinese restaurants.",
    challenge:
      "Distilling rich multi-generational human stories and intense wok-kitchen energy into a 74-second emotional trailer that hooks commissioning broadcasters and audiences alike.",
    solution:
      "Combined intimate observational kitchen cinematography, evocative ambient cooking acoustics, and tight dramatic montage.",
    deliverables: [
      "Documentary pitch & concept trailer (1:14 master)",
      "Observational back-of-house kitchen cinematography",
      "Atmospheric sound design & rhythmic culinary edit",
      "Festival and streaming pitch packaging",
    ],
    outcome:
      "Established the visual tone and emotional spine for the documentary series presentation.",
    image:
      "https://i.vimeocdn.com/video/978318861-95f5103cb925d8bc6f1f6319a6a17870488bf8a754a8c433f402b8ac39746ab8-d_1280?region=us",
    embedUrl: "https://vimeo.com/469988343",
    videoMeta: {
      uploadDate: "2020-10-19T19:38:22Z",
      duration: "PT1M14S",
    },
    seoKeywords: [
      "Culinary documentary production Europe",
      "Food documentary filmmaker Amsterdam",
      "Hospitality story film Netherlands",
      "Documentaire laten maken Nederland",
      "海外中餐纪录片拍摄",
      "欧洲美食纪录片预告片剪辑",
    ],
    externalLink: {
      label: "Watch on Vimeo",
      url: "https://vimeo.com/469988343",
    },
  },
  {
    id: "case-chinese-restaurant-intro",
    title: "Amazing Chinese Restaurants — Documentary Title Sequence & Opening Edit",
    clientCategory: "Culinary Documentary Series · Opening Montage",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "05 · DOCUMENTARY INTRO · TITLE EDIT",
    summary:
      "Signature 49-second documentary opening sequence and rhythmic montage for 'Amazing Chinese Restaurants', blending steam, flame, knife precision, and narrative pacing.",
    challenge:
      "Establishing immediate visual identity and appetite-driven cinematic momentum within the first 45 seconds of a multi-episode culinary documentary.",
    solution:
      "Edited kinetic match-cuts across fire, ingredients, and chef portraits paired with cohesive warm cinema color science and dynamic audio transitions.",
    deliverables: [
      "Series opening title sequence & intro montage (0:49 master)",
      "Kinetic rhythmic montage editing and match-cut sound design",
      "Cinema widescreen mastering and title typography integration",
      "Consistent warm film color look across multi-location footage",
    ],
    outcome:
      "Defined the recurring broadcast opening signature for the documentary series.",
    image:
      "https://i.vimeocdn.com/video/831950411-835ac8cbfb9691bb26bb1761d12207a7c41f6d97ae30a6fed0c27041a1836a0c-d_1280?region=us",
    embedUrl: "https://vimeo.com/373732197",
    videoMeta: {
      uploadDate: "2019-11-17T09:54:43Z",
      duration: "PT49S",
    },
    seoKeywords: [
      "Documentary title sequence editing",
      "Culinary documentary opening montage",
      "DaVinci Resolve color grading Amsterdam",
      "Documentaire montage Nederland",
      "纪录片片头剪辑制作",
      "荷兰影视后期调色",
    ],
    externalLink: {
      label: "Watch on Vimeo",
      url: "https://vimeo.com/373732197",
    },
  },
  {
    id: "case-arch-mist-youtube",
    title: "Arch Mist — Architectural & Spatial Design Film",
    clientCategory: "Architecture & Spatial Design · Documentary Showcase",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "06 · ARCHITECTURE FILM · ARCH MIST",
    summary:
      "Atmospheric architectural design showcase film translating contemporary spatial geometry, natural light, and serene materiality into cinema.",
    challenge:
      "Revealing architectural proportion, surface texture, and quiet spatial rhythm without distracting camera movement or artificial staging.",
    solution:
      "Filmed controlled dawn lighting windows with precision stabilized glides, wide-format cinema framing, and minimalist ambient soundscapes.",
    deliverables: [
      "Architectural & spatial project promo film (4K Cinema Master)",
      "Stabilized architectural tracking and environmental atmosphere sequences",
      "Custom minimal sound design & DaVinci Resolve color grading",
      "Portfolio and design exhibition digital delivery",
    ],
    outcome:
      "Elevated the architectural project's international visual presentation with an evocative, gallery-grade cinema piece.",
    image: "https://i.ytimg.com/vi/VBlEo_ARWkw/maxresdefault.jpg",
    embedUrl: "https://youtu.be/VBlEo_ARWkw",
    videoMeta: {
      uploadDate: "2026-11-26T00:00:00+01:00",
    },
    seoKeywords: [
      "Architectural video production Amsterdam",
      "Architecture design showcase film Europe",
      "Spatial & real estate videographer",
      "Architectuur video laten maken",
      "建筑设计宣传片拍摄",
      "空间美学影像制作",
    ],
    externalLink: {
      label: "Watch on YouTube",
      url: "https://youtu.be/VBlEo_ARWkw",
    },
  },
  {
    id: "case-chinese-restaurant-iqiyi-teaser2",
    title: "Chinese Restaurant Documentary Series — Official Teaser 2 (iQIYI)",
    clientCategory: "Streaming Documentary Series · iQIYI Platform",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "07 · DOCUMENTARY TEASER 2 · IQIYI",
    summary:
      "Second official documentary series teaser produced for streaming release on iQIYI, diving deeper into overseas Chinese gastronomy, family resilience, and cultural memory.",
    challenge:
      "Expanding the emotional arc beyond the first concept trailer to build streaming audience anticipation across multiple culinary stories.",
    solution:
      "Intercut visceral wok-kitchen momentum with intimate character soundbites and evocative musical scoring tailored for major streaming distribution.",
    deliverables: [
      "Series Documentary Teaser 2 (iQIYI streaming release edit)",
      "Multi-location culinary documentary cinematography",
      "Broadcast-standard stereo sound mix & subtitle mastering",
      "Platform promotional cutdowns",
    ],
    outcome:
      "Delivered an emotionally resonant streaming teaser driving viewer anticipation for the full documentary series on iQIYI.",
    image: "https://i.ytimg.com/vi/1S55-AqVIP4/maxresdefault.jpg",
    embedUrl: "https://youtu.be/1S55-AqVIP4",
    videoMeta: {
      uploadDate: "2026-11-26T00:00:00+01:00",
    },
    seoKeywords: [
      "iQIYI documentary production Europe",
      "Streaming food documentary Netherlands",
      "International bilingual film crew",
      "Food documentaire productie",
      "爱奇艺纪录片欧洲摄制",
      "海外中餐系列纪录片拍摄",
    ],
    externalLink: {
      label: "Watch on YouTube",
      url: "https://youtu.be/1S55-AqVIP4",
    },
  },
  {
    id: "case-wedding-woerden",
    title: "Woerden Destination Wedding — Documentary Short Film",
    clientCategory: "Couples & Wedding Cinematography · Woerden, Netherlands",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "08 · WEDDING SHORT FILM · WOERDEN",
    summary:
      "Intimate documentary wedding short film captured in Woerden, the Netherlands, preserving unscripted vows, warm natural daylight, and joyful celebration.",
    challenge:
      "Documenting every authentic emotional beat discreetly across indoor historic ceremony spaces and open Dutch countryside estates.",
    solution:
      "Used compact full-frame cinema cameras with fast prime optics and discreet wireless ceremony audio to craft an unobtrusive, filmic keepsake.",
    deliverables: [
      "Signature destination wedding highlight short film",
      "Ceremony vows & environmental live audio integration",
      "Warm editorial DaVinci Resolve film emulation grade",
      "Multi-device master delivery for sharing and archive",
    ],
    outcome:
      "Delivered an emotionally timeless wedding film celebrating an unforgettable celebration in the heart of Holland.",
    image: "https://i.ytimg.com/vi/bgHHhahhqHs/maxresdefault.jpg",
    embedUrl: "https://youtu.be/bgHHhahhqHs",
    videoMeta: {
      uploadDate: "2026-11-26T00:00:00+01:00",
    },
    seoKeywords: [
      "Wedding videographer Woerden Utrecht",
      "Destination wedding film Netherlands",
      "Bilingual wedding videography Amsterdam",
      "Bruiloft videograaf Woerden Utrecht",
      "荷兰婚礼短片跟拍",
      "荷兰中文婚礼摄影摄像",
    ],
    externalLink: {
      label: "Watch on YouTube",
      url: "https://youtu.be/bgHHhahhqHs",
    },
  },
  {
    id: "case-event-rai-amsterdam",
    title: "Amsterdam RAI — International Trade Expo & Event Aftermovie",
    clientCategory: "B2B Exhibition & Live Event Coverage · Amsterdam RAI",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "09 · EVENT COVERAGE · AMSTERDAM RAI",
    summary:
      "High-tempo exhibition coverage and corporate aftermovie filmed at Amsterdam RAI, capturing keynote energy, booth engagement, and live product showcases.",
    challenge:
      "Navigating crowded international convention halls with fast turnaround requirements while isolating crisp spoken interviews from venue noise.",
    solution:
      "Deployed an agile gimbal cinema unit with directional wireless mics and rhythmic post-production pacing built for immediate B2B social rollout.",
    deliverables: [
      "Amsterdam RAI conference & exhibition highlight aftermovie",
      "Executive booth interviews & live crowd atmosphere B-roll",
      "Fast-turnaround LinkedIn & corporate recap edits",
      "Broadcast-level audio leveling and color matching",
    ],
    outcome:
      "Captured the scale and momentum of the Amsterdam RAI showcase for immediate post-event marketing and stakeholder reporting.",
    image: "https://i.ytimg.com/vi/-pzFrK7J8fE/maxresdefault.jpg",
    embedUrl: "https://youtu.be/-pzFrK7J8fE",
    videoMeta: {
      uploadDate: "2026-11-26T00:00:00+01:00",
    },
    seoKeywords: [
      "Amsterdam RAI event videographer",
      "Trade show aftermovie Amsterdam",
      "IBC & exhibition video crew RAI",
      "Evenementen video Amsterdam RAI",
      "阿姆斯特丹RAI展会跟拍",
      "荷兰国际展会活动视频制作",
    ],
    externalLink: {
      label: "Watch on YouTube",
      url: "https://youtu.be/-pzFrK7J8fE",
    },
  },
  {
    id: "case-hotking-the-hague",
    title: "Hotking The Hague — Restaurant Brand & Culinary Promo Film",
    clientCategory: "Hospitality & Culinary Commercial · The Hague (Den Haag)",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "10 · RESTAURANT PROMO · THE HAGUE",
    summary:
      "Appetite-forward commercial promo video produced for Hotking in The Hague, spotlighting signature spicy dishes, dynamic plating, and vibrant dining room energy.",
    challenge:
      "Showcasing bold culinary textures and bubbling table-side presentation inside an active Den Haag dining venue.",
    solution:
      "Paired close-up macro food cinematography and warm accent lighting with energetic culinary sound design and snappy montage editing.",
    deliverables: [
      "Commercial restaurant brand film for The Hague hospitality market",
      "Macro dish plating & steam motion sequences",
      "Dynamic culinary sound design & warm film color grade",
      "Social media promotional formats for Dutch dining audiences",
    ],
    outcome:
      "Equipped Hotking The Hague with a standout visual showcase boosting local brand appeal across digital channels.",
    image: "https://i.ytimg.com/vi/IswjQdAJxMQ/maxresdefault.jpg",
    embedUrl: "https://youtu.be/IswjQdAJxMQ",
    videoMeta: {
      uploadDate: "2026-11-26T00:00:00+01:00",
    },
    seoKeywords: [
      "Restaurant promo video The Hague",
      "Horeca video Den Haag",
      "Food & hospitality commercial Netherlands",
      "Restaurant promotievideo Den Haag",
      "海牙餐馆宣传片拍摄",
      "荷兰餐饮美食广告视频",
    ],
    externalLink: {
      label: "Watch on YouTube",
      url: "https://youtu.be/IswjQdAJxMQ",
    },
  },
  {
    id: "case-eindhoven-ramen",
    title: "Eindhoven Ramen — Craft Culinary & Kitchen Commercial",
    clientCategory: "Japanese Culinary Brand · Eindhoven, Netherlands",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "11 · RESTAURANT COMMERCIAL · EINDHOVEN",
    summary:
      "Sensory-rich restaurant promo film shot in Eindhoven, celebrating slow-simmered broth, open-kitchen precision, and authentic Japanese hospitality.",
    challenge:
      "Balancing tight kitchen working quarters and steamy ambient heat while preserving sharp culinary highlights and rich contrast.",
    solution:
      "Utilized high-speed macro cinema lenses, compact key lighting, and ASMR-inspired kitchen acoustics to immerse viewers in the craft.",
    deliverables: [
      "Hero hospitality commercial video master",
      "High-frame-rate macro noodle, broth & chef motion shots",
      "Rhythmic kitchen sound design & cinematic color grading",
      "Multi-platform restaurant marketing cutdowns",
    ],
    outcome:
      "Delivered an atmospheric commercial asset elevating the Eindhoven restaurant's digital dining presence.",
    image: "https://i.ytimg.com/vi/ieOTR_5LKdQ/maxresdefault.jpg",
    embedUrl: "https://youtu.be/ieOTR_5LKdQ",
    videoMeta: {
      uploadDate: "2026-11-26T00:00:00+01:00",
    },
    seoKeywords: [
      "Restaurant commercial video Eindhoven",
      "Japanese ramen food videography Netherlands",
      "Hospitality brand film Brabant",
      "Horeca bedrijfsvideo Eindhoven",
      "埃因霍温餐馆宣传片拍摄",
      "荷兰餐饮探店广告制作",
    ],
    externalLink: {
      label: "Watch on YouTube",
      url: "https://youtu.be/ieOTR_5LKdQ",
    },
  },
  {
    id: "case-tram-dating",
    title: "Tram Dating — Reality Dating Series (In Active Production)",
    clientCategory: "Original Asian Reality Dating Series · The Netherlands",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "REALITY SERIES · IN PRODUCTION",
    summary:
      "Principal photography and technical cinematography for 'Tram Dating', an original reality dating series capturing Asian singles dating aboard historic and scenic trams across the Netherlands.",
    challenge:
      "Designing multi-camera mobile cinema rigs inside moving heritage trams, capturing authentic unscripted romantic chemistry under changing urban natural light and ambient transit acoustics.",
    solution:
      "Glass Sharp Films engineered custom vibration-damped cinema camera mounts, wireless multi-channel lavalier audio arrays, and dynamic street-level tracking alongside Dutch municipal transit authorities.",
    deliverables: [
      "Custom multi-camera mobile tram cinema rig and wireless audio capture",
      "Principal photography across Amsterdam and Dutch transit networks",
      "Real-time storyline assembly, daily rushes, and character edits",
      "DaVinci Resolve cinematic urban color grading and broadcast mastering",
    ],
    outcome:
      "Currently in active production; capturing genuine cross-cultural romance against the backdrop of historic Dutch canals and vintage tramways.",
    image:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2070&auto=format&fit=crop",
    seoKeywords: [
      "Reality TV production Amsterdam",
      "Asian reality series Netherlands",
      "Multi-camera transit filming crew",
      "荷兰真人秀综艺拍摄",
      "阿姆斯特丹电车综艺摄制",
    ],
  },
  {
    id: "case-fixico-mywheels",
    title: "Fixico x MyWheels Commercial Campaign & Customer Testimonial",
    clientCategory: "European Automotive & Fleet Technology Leaders",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "COMMERCIAL CAMPAIGN · GLASSSHARPFILMS.NL",
    summary:
      "Produced an impactful commercial customer testimonial video for automotive repair platform Fixico in collaboration with shared mobility leader MyWheels in Amsterdam.",
    challenge:
      "Showcasing technical fleet repair management while maintaining an engaging, human narrative centered on urban sustainability and mobility innovation.",
    solution:
      "Glass Sharp Films directed dynamic multi-camera footage across Amsterdam locations, capturing real-world fleet maintenance with crisp cinematography, pacing, and color science.",
    deliverables: [
      "Commercial brand customer testimonial video master",
      "Multi-platform social media campaign cutdowns (16:9 & 9:16)",
      "High-fidelity sound design and licensed acoustic soundtrack",
      "Bilingual English and Dutch subtitled delivery",
    ],
    outcome:
      "Featured prominently across European B2B automotive channels and corporate keynotes; drove high stakeholder engagement for both brands.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    seoKeywords: [
      "Automotive commercial Amsterdam",
      "EV fleet case study video Netherlands",
      "B2B corporate video agency Amsterdam",
      "Zakelijke video laten maken Amsterdam",
      "荷兰新能源汽车商业片拍摄",
    ],
    externalLink: {
      label: "View on glasssharpfilms.nl",
      url: "https://glasssharpfilms.nl/",
    },
  },
  {
    id: "case-hermijntje-drenth",
    title: "Hermijntje Drenth — Dutch Olympic Champion Cinematic Film",
    clientCategory: "Olympic Gold Medalist & Elite Athletic Profile",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "OLYMPIC PROFILE · CINEMATIC DOCUMENTARY",
    summary:
      "Crafted a cinematic visual portrait for Dutch Olympic rowing champion Hermijntje Drenth, highlighting the rigorous mental and physical discipline of world-class athletics.",
    challenge:
      "Capturing intense on-water training sessions under variable Dutch weather while capturing intimate, emotionally resonant audio and close-up cinematic portraiture.",
    solution:
      "Deployed cinema cameras with water-resistant stabilized rigs, specialized telephoto lenses, and drone tracking along rowing courses, coupled with deep personal voiceover interviews.",
    deliverables: [
      "Cinematic documentary athlete profile film",
      "High-speed 120fps water cinematography and aerial footage",
      "DaVinci Resolve dramatic color grade emphasizing dawn light",
      "International festival and digital showcase masters",
    ],
    outcome:
      "Widely acclaimed in Dutch sports media and athletic foundation presentations for its artistic depth and cinematic storytelling.",
    image:
      "https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=2070&auto=format&fit=crop",
    seoKeywords: [
      "Sports documentary filmmaker Netherlands",
      "Olympic athlete profile video",
      "High-speed 120fps cinematography Amsterdam",
      "Sportdocumentaire laten maken",
      "荷兰奥运冠军人物纪录片",
    ],
    externalLink: {
      label: "View on glasssharpfilms.nl",
      url: "https://glasssharpfilms.nl/",
    },
  },
  {
    id: "case-toobit-sharma",
    title: "Toobit Global Commercial featuring Chris Sharma",
    clientCategory: "Global Cryptocurrency Platform & Action Sports",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "GLOBAL COMMERCIAL · TOOBIT X CHRIS SHARMA",
    summary:
      "Directed and produced an international online commercial campaign for crypto platform Toobit starring world champion rock climber Chris Sharma.",
    challenge:
      "Filming in high-exposure cliffside outdoor locations while maintaining commercial brand discipline, safety protocols, and intense visual pacing.",
    solution:
      "Assembled a specialized extreme-sports camera team, utilizing lightweight RED cinema rigs and precision drone flight paths to parallel the climber's ascent with brand themes of resilience.",
    deliverables: [
      "High-energy global digital commercial (4K Cinema Master)",
      "Ad-set vertical video variations for global digital advertising",
      "Custom sound effects and cinematic sound score mixing",
      "Full international broadcast license packaging",
    ],
    outcome:
      "Surpassed 2.5M+ global impressions across international markets, cementing Toobit's campaign as a high-performing digital brand commercial.",
    image:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2070&auto=format&fit=crop",
    seoKeywords: [
      "Global brand commercial production Europe",
      "Action sports TVC director",
      "Fintech & crypto campaign film",
      "Internationale commercial productie",
      "全球品牌TVC广告导演制作",
    ],
    externalLink: {
      label: "View on glasssharpfilms.nl",
      url: "https://glasssharpfilms.nl/",
    },
  },
  {
    id: "case-destination-wedding",
    title: "European Destination Wedding & Historic Canal Heritage Film",
    clientCategory: "Luxury International Couple & High-End Wedding Planner",
    serviceId: "creative-agency",
    serviceName: "Video Production",
    tag: "LUXURY WEDDING · CANAL HERITAGE",
    summary:
      "Cinematic destination wedding film capturing ceremonies along UNESCO-listed Amsterdam canals and a 17th-century country estate using dual 4K cinema cameras and aerial drone flights.",
    challenge:
      "Coordinating waterborne canal cruise shoots, estate historic preservation rules, and civil aviation drone clearances across a tight 3-day multi-cultural celebration.",
    solution:
      "Glass Sharp Films deployed dual RED/Sony Cine camera teams, secured Dutch civil aviation permits, and employed wireless audio arrays to create a deeply emotional film.",
    deliverables: [
      "12-minute feature wedding documentary film",
      "60-second cinematic preview trailer (delivered within 48 hours)",
      "Multi-camera synchronized ceremony and banquet archives",
      "Custom DaVinci Resolve color science grading",
    ],
    outcome:
      "Delivered to glowing praise from the couple and premier European wedding planners; over 500,000 views across digital platforms.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    seoKeywords: [
      "Luxury destination wedding videographer Amsterdam",
      "Canal heritage wedding film Netherlands",
      "4K aerial drone wedding cinema Europe",
      "Trouwfilm Amsterdam",
      "阿姆斯特丹运河婚礼跟拍",
      "欧洲城堡海外婚礼摄影",
    ],
  },
];

export const buildVideoObjectSchemas = () =>
  VIDEO_PRODUCTION_CASES.filter((c) => Boolean(c.embedUrl && c.videoMeta)).map((c) => ({
    "@type": "VideoObject",
    name: c.title,
    description: `${c.summary} ${c.outcome}`,
    thumbnailUrl: [c.image],
    uploadDate: c.videoMeta!.uploadDate,
    ...(c.videoMeta!.duration ? { duration: c.videoMeta!.duration } : {}),
    embedUrl: toCanonicalVideoEmbedUrl(c.embedUrl!),
    contentUrl: c.embedUrl!,
    keywords: c.seoKeywords?.join(", "),
    publisher: {
      "@type": "Organization",
      name: "Glass Sharp Films — YEAH Agency Amsterdam",
      url: "https://yeah-amsterdam.nl/services/creative-agency",
    },
  }));
