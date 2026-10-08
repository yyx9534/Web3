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
  Camera
} from "lucide-react";
import { DETAILED_GUIDES, DetailedGuide } from "./guidesData";

export const GuidePage: React.FC<{ defaultSlug?: string }> = ({ defaultSlug }) => {
  const params = useParams();
  const navigate = useNavigate();
  const slug = defaultSlug || params.slug;

  const guide = DETAILED_GUIDES.find((g) => g.slug === slug);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!guide && slug) {
      navigate("/");
    }
  }, [guide, slug, navigate]);

  useEffect(() => {
    if (guide) {
      document.title = guide.metaTitle;
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", guide.metaDescription);

      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", guide.keywords);

      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", guide.canonicalUrl);
    }
  }, [guide]);

  if (!guide) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="pt-28 md:pt-36 pb-28 px-6 md:px-12 bg-black min-h-screen text-white"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation & Breadcrumb */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Agency Home
          </Link>
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-400">
              <Sparkles size={12} /> {guide.category}
            </span>
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors rounded-sm"
              title="Copy share link"
            >
              <Share2 size={12} />
              <span>{copied ? "Copied!" : "Share Dossier"}</span>
            </button>
          </div>
        </div>

        {/* Header Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-white text-[11px] font-mono uppercase tracking-widest">
            {guide.badge}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-6 leading-[1.25] tracking-tight">
          {guide.title}
        </h1>

        {/* Subtitle / Executive Summary */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-8 max-w-4xl border-l-2 border-white/30 pl-4 py-1">
          {guide.subtitle}
        </p>

        {/* Meta Stats Row */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-gray-400 mb-10 pb-8 border-b border-white/10">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} className="text-gray-500" /> {guide.readTime}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} className="text-gray-500" /> {guide.updatedDate}
          </span>
          <span>
            Practice Lead: <Link to={`/services/${guide.relatedPracticeId}`} className="text-white hover:underline ml-1">{guide.relatedPracticeName}</Link>
          </span>
        </div>

        {/* Hero Visual Banner with Key Metrics Overlay */}
        <div className="relative mb-14 overflow-hidden border border-white/15 bg-[#0a0a0a]">
          <div className="relative aspect-[21/9] sm:aspect-[21/8] overflow-hidden">
            <img 
              src={guide.heroImage} 
              alt={guide.title}
              className="w-full h-full object-cover opacity-60"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          <div className="p-6 md:p-8 bg-[#090909] border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {guide.highlights.map((h, i) => (
                <div key={i} className="p-3 bg-white/5 border border-white/5">
                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">{h.label}</div>
                  <div className="text-xs md:text-sm font-medium text-white">{h.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-invert max-w-none mb-16">
          <div className="p-6 md:p-8 bg-white/[0.03] border border-white/10 leading-relaxed text-sm md:text-base text-gray-200 font-light">
            <p className="mb-0">{guide.introduction}</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          {guide.sections.map((section, sIdx) => (
            <section key={sIdx} className="scroll-mt-28 border-b border-white/10 pb-12">
              <h2 className="text-2xl sm:text-3xl font-serif text-white mb-2 leading-snug">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-6">
                  {section.subtitle}
                </p>
              )}

              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-6">
                {section.content}
              </p>

              {/* Bullet Points */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-3 mb-6 pl-2">
                  {section.bulletPoints.map((bp, bpIdx) => (
                    <li key={bpIdx} className="flex items-start gap-3 text-sm text-gray-300 font-light">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span className="leading-relaxed">{bp}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Table Data */}
              {section.tableData && (
                <div className="my-8 overflow-x-auto border border-white/15 bg-[#080808]">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-white/20 bg-white/5 text-gray-200 font-mono uppercase tracking-wider">
                        {section.tableData.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-4 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-light text-gray-300">
                      {section.tableData.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className={cIdx === 0 ? "p-4 font-medium text-white font-mono text-xs" : "p-4"}>
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
                <div className="my-6 p-5 border border-emerald-500/30 bg-emerald-950/20 text-emerald-200 text-xs md:text-sm leading-relaxed rounded-sm flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                  <div>{section.calloutBox.text}</div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        {guide.faqs && guide.faqs.length > 0 && (
          <div className="py-14 border-b border-white/10">
            <div className="mb-8">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mb-2">
                Frequently Addressed Inquiries
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white">
                Detailed Practice FAQ
              </h3>
            </div>

            <div className="space-y-4">
              {guide.faqs.map((faq, fIdx) => {
                const isOpen = openFaqIdx === fIdx;
                return (
                  <div key={fIdx} className="border border-white/10 bg-[#090909] overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : fIdx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 group"
                    >
                      <span className="text-sm md:text-base font-serif text-white group-hover:text-gray-200">
                        {faq.q}
                      </span>
                      <ChevronDown 
                        size={16} 
                        className={`text-gray-400 transition-transform shrink-0 ${isOpen ? "rotate-180 text-white" : ""}`}
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
                          <div className="px-5 pb-5 pt-2 text-xs md:text-sm text-gray-300 font-light leading-relaxed border-t border-white/5">
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
        )}

        {/* Engagement CTA Banner */}
        <div className="mt-14 p-8 md:p-12 bg-white/5 border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400 block mb-2">
              Operational Liaison in Amsterdam
            </span>
            <h4 className="text-2xl md:text-3xl font-serif text-white mb-2">
              Ready to Initiate Your Engagement?
            </h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Contact our senior practice partners in Amsterdam for bespoke legal assessment, production quotation, or wedding booking availability.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a 
              href={`mailto:info@yeah-amsterdam.nl?subject=${encodeURIComponent(`Engagement Inquiry regarding ${guide.title}`)}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors font-medium"
            >
              <Mail size={14} />
              <span>Email Practice Partners</span>
            </a>
            <Link
              to={`/services/${guide.relatedPracticeId}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest border border-white/10 transition-colors"
            >
              <span>Explore Practice</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Explore Other Guides */}
        <div className="pt-20">
          <span className="text-xs font-mono uppercase tracking-[0.4em] text-gray-400 block mb-6">
            Explore Other High-Authority Long-Tail Dossiers (SEO Topic Hub)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DETAILED_GUIDES.filter((g) => g.slug !== guide.slug).map((other) => (
              <Link 
                key={other.slug}
                to={`/guides/${other.slug}`}
                className="p-6 bg-[#080808] border border-white/10 hover:border-white/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-2">
                    {other.category}
                  </div>
                  <h5 className="font-serif text-lg text-white group-hover:italic transition-all mb-2 leading-snug">
                    {other.title}
                  </h5>
                  <p className="text-xs text-gray-400 font-light line-clamp-2">
                    {other.subtitle}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-400 group-hover:text-white">
                  <span>{other.readTime}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
