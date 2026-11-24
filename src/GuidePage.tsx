import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Mail, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  BookOpen, 
  Share2, 
  Sparkles,
  Building2,
  Film,
  Camera,
  Printer,
  Calculator,
  Download
} from "lucide-react";
import { DETAILED_GUIDES, DetailedGuide } from "./guidesData";
import {
  editorialStaggerContainer,
  editorialCardVariants,
  EditorialBlock,
  EditorialSection,
} from "./CreativeEffects";

export const GuidePage: React.FC<{ 
  defaultSlug?: string;
  onOpenCalculator?: (cat?: "consulting" | "video" | "wedding" | "software") => void;
}> = ({ defaultSlug, onOpenCalculator }) => {
  const params = useParams();
  const navigate = useNavigate();
  const slug = defaultSlug || params.slug;

  const guide = DETAILED_GUIDES.find((g) => g.slug === slug);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const getCalcCategory = () => {
    if (guide?.slug.includes("branch-office")) return "consulting";
    if (guide?.slug.includes("video-production")) return "video";
    if (guide?.slug.includes("wedding-photography")) return "wedding";
    return "consulting";
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (!guide && slug) {
      navigate("/");
    }
  }, [guide, slug, navigate]);

  useEffect(() => {
    if (guide) {
      document.title = guide.metaTitle;

      const setMetaTag = (attrName: "name" | "property", attrValue: string, content: string) => {
        let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute(attrName, attrValue);
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
      };

      setMetaTag("name", "description", guide.metaDescription);
      setMetaTag("name", "keywords", guide.keywords);
      setMetaTag("property", "og:type", "article");
      setMetaTag("property", "og:title", guide.metaTitle);
      setMetaTag("property", "og:description", guide.metaDescription);
      setMetaTag("property", "og:url", guide.canonicalUrl);
      setMetaTag("property", "og:image", guide.heroImage);
      setMetaTag("name", "twitter:title", guide.metaTitle);
      setMetaTag("name", "twitter:description", guide.metaDescription);
      setMetaTag("name", "twitter:image", guide.heroImage);

      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", guide.canonicalUrl);

      const guideSchema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "YEAH Agency Amsterdam", item: "https://yeah-amsterdam.nl/" },
              { "@type": "ListItem", position: 2, name: guide.relatedPracticeName, item: `https://yeah-amsterdam.nl/services/${guide.relatedPracticeId}` },
              { "@type": "ListItem", position: 3, name: guide.title, item: guide.canonicalUrl },
            ],
          },
          {
            "@type": "Article",
            headline: guide.title,
            description: guide.metaDescription,
            image: guide.heroImage,
            dateModified: "2026-11-24",
            author: { "@type": "Organization", name: "YEAH Agency Amsterdam", url: "https://yeah-amsterdam.nl/" },
            publisher: { "@type": "Organization", name: "YEAH Agency Amsterdam" },
            mainEntityOfPage: guide.canonicalUrl,
          },
          ...(guide.faqs && guide.faqs.length > 0
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

      const existingScript = document.getElementById("dynamic-route-jsonld");
      const script = existingScript || document.createElement("script");
      script.id = "dynamic-route-jsonld";
      script.setAttribute("type", "application/ld+json");
      script.textContent = JSON.stringify(guideSchema);
      if (!existingScript) {
        document.head.appendChild(script);
      }
    }
  }, [guide]);

  if (!guide) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-28 md:pt-36 pb-28 px-6 md:px-12 bg-[#F6F4EF] min-h-screen text-[#141413]">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation & Breadcrumb */}
        <EditorialBlock className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#141413]/12 pb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#141413]/60 hover:text-[#D94E28] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Agency Home
          </Link>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-[#141413]/65 no-print">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[#D94E28] mr-2">
              {guide.category}
            </span>
            <button
              onClick={() => onOpenCalculator?.(getCalcCategory())}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D94E28] hover:bg-[#141413] text-white transition-colors rounded-sm cursor-pointer"
              title="测算预算与周期"
            >
              <Calculator size={12} />
              <span>智能测算方案</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#ECE8DF] text-[#141413] border border-[#141413]/15 transition-colors rounded-sm cursor-pointer"
              title="保存/打印为 PDF 备忘录"
            >
              <Printer size={12} />
              <span className="hidden sm:inline">导出 PDF</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#ECE8DF] text-[#141413] border border-[#141413]/15 transition-colors rounded-sm cursor-pointer"
              title="复制分享链接"
            >
              <Share2 size={12} />
              <span>{copied ? "已复制链接!" : "分享"}</span>
            </button>
          </div>
        </EditorialBlock>

        {/* Header Kicker, Title, Summary & Meta Stats */}
        <EditorialBlock delay={0.05}>
          <div className="mb-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D94E28]">
              {guide.badge}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#141413] mb-6 leading-[1.2] tracking-tight text-balance">
            {guide.title}
          </h1>

          {/* Subtitle / Executive Summary */}
          <p className="text-base sm:text-lg md:text-xl text-[#141413]/75 font-light leading-relaxed mb-8 max-w-4xl">
            {guide.subtitle}
          </p>

          {/* Meta Stats Row */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#141413]/60 mb-10 pb-8 border-b border-[#141413]/12">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} className="text-[#D94E28]" /> {guide.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} className="text-[#D94E28]" /> {guide.updatedDate}
            </span>
            <span>
              Practice Lead: <Link to={`/services/${guide.relatedPracticeId}`} className="text-[#141413] hover:text-[#D94E28] underline underline-offset-4 ml-1">{guide.relatedPracticeName}</Link>
            </span>
          </div>
        </EditorialBlock>

        {/* Hero Visual Banner with Key Metrics Overlay (Full Color Editorial Photo) */}
        <EditorialBlock delay={0.08} className="relative mb-14 overflow-hidden border border-[#141413]/12 bg-white shadow-sm">
          <div className="relative aspect-[21/9] sm:aspect-[21/8] overflow-hidden">
            <img 
              src={guide.heroImage} 
              alt={guide.title}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/45 via-transparent to-transparent" />
          </div>

          <div className="p-6 md:p-8 bg-white border-t border-[#141413]/10">
            <motion.div
              variants={editorialStaggerContainer}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: "some" }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {guide.highlights.map((h, i) => (
                <motion.div key={i} variants={editorialCardVariants} className="p-3 bg-[#F6F4EF] border border-[#141413]/8">
                  <div className="text-[10px] font-mono text-[#141413]/55 uppercase tracking-wider mb-1">{h.label}</div>
                  <div className="text-xs md:text-sm font-medium text-[#141413]">{h.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </EditorialBlock>

        {/* Introduction */}
        <EditorialBlock className="max-w-none mb-16">
          <div className="p-6 md:p-8 bg-white border border-[#141413]/12 leading-relaxed text-sm md:text-base text-[#141413]/85 font-light">
            <p className="mb-0">{guide.introduction}</p>
          </div>
        </EditorialBlock>

        {/* Content Sections */}
        <div className="space-y-16">
          {guide.sections.map((section, sIdx) => (
            <EditorialSection key={sIdx} className="scroll-mt-28 border-b border-[#141413]/12 pb-12">
              <h2 className="text-2xl sm:text-3xl font-serif text-[#141413] mb-2 leading-snug">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-xs font-mono uppercase tracking-wider text-[#D94E28] mb-6">
                  {section.subtitle}
                </p>
              )}

              <p className="text-sm md:text-base text-[#141413]/80 font-light leading-relaxed mb-6">
                {section.content}
              </p>

              {/* Bullet Points */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-3 mb-6 pl-2">
                  {section.bulletPoints.map((bp, bpIdx) => (
                    <li key={bpIdx} className="flex items-start gap-3 text-sm text-[#141413]/85 font-light">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D94E28] mt-2 shrink-0" />
                      <span className="leading-relaxed">{bp}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Table Data */}
              {section.tableData && (
                <div className="my-8 overflow-x-auto border border-[#141413]/15 bg-white">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-[#141413]/15 bg-[#ECE8DF] text-[#141413] font-mono uppercase tracking-wider">
                        {section.tableData.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-4 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#141413]/8 font-light text-[#141413]/80">
                      {section.tableData.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#F6F4EF] transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className={cIdx === 0 ? "p-4 font-medium text-[#141413] font-mono text-xs" : "p-4"}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Callout Box */}
              {section.calloutBox && (
                <div className="my-6 p-5 border border-[#D94E28]/30 bg-[#D94E28]/5 text-[#141413] text-xs md:text-sm leading-relaxed rounded-sm flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#D94E28] mt-0.5 shrink-0" />
                  <div>{section.calloutBox.text}</div>
                </div>
              )}
            </EditorialSection>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        {guide.faqs && guide.faqs.length > 0 && (
          <EditorialBlock className="py-14 border-b border-[#141413]/12">
            <div className="mb-8">
              <span className="text-[11px] font-mono text-[#D94E28] uppercase tracking-widest block mb-2">
                Frequently Addressed Inquiries
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#141413]">
                Detailed Practice FAQ
              </h3>
            </div>

            <div className="space-y-4">
              {guide.faqs.map((faq, fIdx) => {
                const isOpen = openFaqIdx === fIdx;
                return (
                  <div key={fIdx} className="border border-[#141413]/12 bg-white overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : fIdx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 group cursor-pointer"
                    >
                      <span className="text-sm md:text-base font-serif text-[#141413] group-hover:text-[#D94E28] transition-colors">
                        {faq.q}
                      </span>
                      <ChevronDown 
                        size={16} 
                        className={`text-[#141413]/50 transition-transform shrink-0 ${isOpen ? "rotate-180 text-[#D94E28]" : ""}`}
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
                          <div className="px-5 pb-5 pt-3 text-xs md:text-sm text-[#141413]/75 font-light leading-relaxed border-t border-[#141413]/8">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </EditorialBlock>
        )}

        {/* Engagement CTA Banner (Warm Obsidian Editorial Contrast Block) */}
        <EditorialBlock className="mt-14 p-8 md:p-12 bg-[#161514] text-[#F6F4EF] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D94E28] block mb-2">
              Operational Liaison in Amsterdam
            </span>
            <h4 className="text-2xl md:text-3xl font-serif text-white mb-2">
              Ready to Initiate Your Engagement?
            </h4>
            <p className="text-xs text-[#F6F4EF]/70 font-light leading-relaxed">
              Contact our senior practice partners in Amsterdam for bespoke legal assessment, production quotation, or wedding booking availability.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 no-print">
            <button 
              onClick={() => onOpenCalculator?.(getCalcCategory())}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#D94E28] hover:bg-[#e55b35] text-white font-mono text-xs uppercase tracking-widest transition-colors font-medium cursor-pointer whitespace-nowrap"
            >
              <Calculator size={14} />
              <span>智能预算测算</span>
            </button>
            <a 
              href={`mailto:info@yeah-amsterdam.nl?subject=${encodeURIComponent(`Engagement Inquiry regarding ${guide.title}`)}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#F6F4EF] text-[#141413] font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors font-medium whitespace-nowrap"
            >
              <Mail size={14} />
              <span>Email Practice</span>
            </a>
            <Link
              to={`/services/${guide.relatedPracticeId}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest border border-white/15 transition-colors whitespace-nowrap"
            >
              <span>Explore Practice</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </EditorialBlock>

        {/* Explore Other Guides */}
        <EditorialBlock className="pt-20">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#141413]/55 block mb-6">
            Explore Other Practice Dossiers
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DETAILED_GUIDES.filter((g) => g.slug !== guide.slug).map((other) => (
              <Link 
                key={other.slug}
                to={`/guides/${other.slug}`}
                className="p-6 bg-white border border-[#141413]/12 hover:border-[#D94E28] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono text-[#D94E28] uppercase tracking-wider mb-2">
                    {other.category}
                  </div>
                  <h5 className="font-serif text-lg text-[#141413] group-hover:italic transition-all mb-2 leading-snug">
                    {other.title}
                  </h5>
                  <p className="text-xs text-[#141413]/65 font-light line-clamp-2">
                    {other.subtitle}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#141413]/8 flex items-center justify-between text-xs font-mono text-[#141413]/60 group-hover:text-[#D94E28]">
                  <span>{other.readTime}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </EditorialBlock>

      </div>
    </div>
  );
};
