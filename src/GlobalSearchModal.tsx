import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  X, 
  ArrowRight, 
  Building2, 
  Video, 
  Camera, 
  Code2, 
  FileText, 
  Sparkles,
  HelpCircle,
  Briefcase
} from "lucide-react";
import { DETAILED_GUIDES } from "./guidesData";
import { SERVICES } from "./App";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator?: () => void;
}

interface SearchItem {
  id: string;
  type: "guide" | "service" | "tool" | "faq";
  title: string;
  subtitle: string;
  keywords: string[];
  url?: string;
  action?: () => void;
  badge: string;
  icon: any;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onOpenCalculator,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Construct indexed search database
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [
      {
        id: "tool-calc",
        type: "tool",
        title: "⚡ Scope & Feasibility Estimator (方案与可行性评估器)",
        subtitle: "评估荷兰分公司设立、商业影视摄制、欧洲婚礼电影与定制软件的交付范围、配置与周期",
        keywords: ["测算", "预算", "报价", "计算器", "费用", "周期", "多少钱", "calculator", "price", "estimator"],
        badge: "Interactive Tool",
        action: () => {
          onClose();
          onOpenCalculator?.();
        },
        icon: Sparkles
      }
    ];

    // Guides
    Object.values(DETAILED_GUIDES).forEach(g => {
      items.push({
        id: `guide-${g.slug}`,
        type: "guide",
        title: g.title,
        subtitle: `${g.readTime} · ${g.sections.length} 个实操章节深度剖析`,
        keywords: [...g.keywords.split(","), ...(g.sections.map(s => s.title)), "指南", "实操", "白皮书", "深度"],
        url: `/guides/${g.slug}`,
        badge: "Industry Dossier",
        icon: FileText
      });
    });

    // Services
    SERVICES.forEach(s => {
      items.push({
        id: `service-${s.id}`,
        type: "service",
        title: `${s.number}. ${s.title} (${s.subBrand || "Sovereign Practice"})`,
        subtitle: s.desc,
        keywords: [s.tagline, ...(s.scopeList.map(item => item.title)), ...(s.faqs.map(f => f.q))],
        url: `/services/${s.id}`,
        badge: "Core Practice",
        icon: s.icon
      });

      // Index FAQs as individual items
      s.faqs.forEach((faq, idx) => {
        items.push({
          id: `faq-${s.id}-${idx}`,
          type: "faq",
          title: faq.q,
          subtitle: faq.a.slice(0, 100) + "...",
          keywords: [s.title, "FAQ", "问答", "常见问题"],
          url: `/services/${s.id}`,
          badge: "FAQ Answer",
          icon: HelpCircle
        });
      });
    });

    return items;
  }, [onClose, onOpenCalculator]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems.slice(0, 8);

    return allItems.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSub = item.subtitle.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(q));
      return matchTitle || matchSub || matchKeywords;
    }).slice(0, 10);
  }, [allItems, query]);

  const handleSelect = (item: SearchItem) => {
    if (item.action) {
      item.action();
    } else if (item.url) {
      onClose();
      navigate(item.url);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 sm:pt-20">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Search Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-2xl bg-neutral-950 border border-white/20 rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
        >
          {/* Search Input Bar */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3 bg-white/[0.02]">
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="快速搜索业务、出海开分公司、影视拍摄、婚礼跟拍、FAQ问答..."
              className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm font-sans"
            />
            {query && (
              <button 
                onClick={() => setQuery("")}
                className="text-gray-500 hover:text-white p-1"
              >
                <X size={14} />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-gray-400 bg-white/10 border border-white/10 rounded">
              ESC
            </kbd>
          </div>

          {/* Quick Filter Tags */}
          <div className="px-5 py-2.5 border-b border-white/5 bg-white/[0.01] flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-gray-400">
            <span className="text-gray-500">热门搜索:</span>
            {[
              "分公司设立",
              "KvK",
              "影视拍摄",
              "婚礼电影",
              "EPR申报",
              "高技术移民派遣",
              "30% ruling"
            ].map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setQuery(tag);
                  setSelectedIndex(0);
                }}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-2 divide-y divide-white/5 max-h-[460px]">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-xs font-mono">
                未找到与 "{query}" 相关的业务或指南，您可以直接发邮件至 info@yeah-amsterdam.nl 获得定制解答。
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const Icon = item.icon || Briefcase;
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full p-3 rounded-lg text-left transition-all flex items-start justify-between gap-3 ${
                      isSelected 
                        ? "bg-white/10 text-white" 
                        : "text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`p-2 rounded mt-0.5 flex-shrink-0 ${
                        isSelected ? "bg-white/20 text-white" : "bg-white/5 text-gray-400"
                      }`}>
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-medium text-white truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-emerald-400 flex-shrink-0">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-1 font-sans">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={14} className={`flex-shrink-0 mt-2 transition-transform ${isSelected ? "text-white translate-x-0.5" : "text-gray-600"}`} />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Guide */}
          <div className="px-5 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] font-mono text-gray-500">
            <div className="flex items-center gap-3">
              <span>↑↓ 切换</span>
              <span>↵ 确认跳转</span>
            </div>
            <div className="text-gray-400">
              YEAH Agency Amsterdam · Global Index
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
