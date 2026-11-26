import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ExternalLink, ChevronLeft, ChevronRight, Loader2, Play } from "lucide-react";
import type { CaseStudy } from "./App";

interface CaseVideoPlayerModalProps {
  activeCase: CaseStudy | null;
  playableCases: CaseStudy[];
  onSelectCase: (nextCase: CaseStudy) => void;
  onClose: () => void;
}

const isDirectVideoFile = (url: string) => /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url);

const resolveEmbedSrc = (rawUrl: string): string => {
  // Normalize Vimeo links (e.g. https://vimeo.com/1080128369?fl=tl&fe=ec or player.vimeo.com/video/1080128369)
  const vimeoMatch = rawUrl.match(/(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`;
  }

  // Normalize YouTube links (watch?v=, youtu.be/, shorts/, embed/)
  const ytMatch = rawUrl.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i
  );
  if (ytMatch) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`;
  }

  return rawUrl;
};

const getPlatformHint = (url?: string): string => {
  if (!url) return "Direct Cinema Player";
  if (/vimeo\.com/i.test(url)) return "Direct Vimeo Stream · No Login Required";
  if (/youtube\.com|youtu\.be/i.test(url)) return "Direct YouTube Stream · No Login Required";
  if (isDirectVideoFile(url)) return "Direct HTML5 Master Playback";
  return "Interactive Showcase Player";
};

export const CaseVideoPlayerModal = ({
  activeCase,
  playableCases,
  onSelectCase,
  onClose,
}: CaseVideoPlayerModalProps) => {
  const [isFrameLoading, setIsFrameLoading] = useState(true);

  useEffect(() => {
    if (activeCase) {
      setIsFrameLoading(true);
    }
  }, [activeCase?.id]);

  const currentIndex = activeCase
    ? playableCases.findIndex((item) => item.id === activeCase.id)
    : -1;
  const hasMultiple = playableCases.length > 1 && currentIndex !== -1;

  const handlePrev = () => {
    if (!hasMultiple) return;
    const prevIdx = currentIndex === 0 ? playableCases.length - 1 : currentIndex - 1;
    onSelectCase(playableCases[prevIdx]);
  };

  const handleNext = () => {
    if (!hasMultiple) return;
    const nextIdx = currentIndex === playableCases.length - 1 ? 0 : currentIndex + 1;
    onSelectCase(playableCases[nextIdx]);
  };

  useEffect(() => {
    if (!activeCase) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCase, currentIndex, playableCases.length]);

  const resolvedSrc = activeCase?.embedUrl ? resolveEmbedSrc(activeCase.embedUrl) : "";

  return (
    <AnimatePresence>
      {activeCase && activeCase.embedUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#161514]/92 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Playing case study: ${activeCase.title}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl bg-[#1C1B1A] text-[#F6F4EF] border border-white/15 shadow-[0_32px_90px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Theater Header */}
            <div className="px-5 sm:px-7 py-4 border-b border-white/10 flex items-start justify-between gap-4 bg-[#161514]">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[#D94E28] mb-1">
                  <Play size={10} className="fill-current shrink-0" />
                  <span>{activeCase.tag}</span>
                  <span className="text-white/30" aria-hidden="true">·</span>
                  <span className="text-[#F6F4EF]/60 truncate">{activeCase.clientCategory}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif text-white leading-snug truncate">
                  {activeCase.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close player"
                className="w-9 h-9 shrink-0 flex items-center justify-center border border-white/15 text-[#F6F4EF]/75 hover:text-white hover:border-[#D94E28] hover:bg-[#D94E28] transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Cinema Viewport */}
            <div className="relative w-full aspect-video max-h-[68vh] bg-[#0D0D0C]">
              {isDirectVideoFile(resolvedSrc) ? (
                <video
                  key={resolvedSrc}
                  src={resolvedSrc}
                  poster={activeCase.image}
                  controls
                  autoPlay
                  playsInline
                  onLoadedData={() => setIsFrameLoading(false)}
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <>
                  {isFrameLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0D0D0C] text-[#F6F4EF]/70">
                      <Loader2 size={24} className="animate-spin text-[#D94E28]" />
                      <span className="text-[11px] font-mono uppercase tracking-widest">
                        Loading Cinema Stream...
                      </span>
                    </div>
                  )}
                  <iframe
                    key={activeCase.id}
                    src={resolvedSrc}
                    title={activeCase.title}
                    onLoad={() => setIsFrameLoading(false)}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="w-full h-full border-0 bg-black"
                  />
                </>
              )}
            </div>

            {/* Footer Controls & Direct Link */}
            <div className="px-5 sm:px-7 py-3.5 border-t border-white/10 bg-[#161514] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/15 text-[11px] font-mono uppercase tracking-wider text-[#F6F4EF]/80 hover:text-white hover:border-[#D94E28] transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={13} />
                      <span>Prev</span>
                    </button>
                    <span className="text-[11px] font-mono text-[#F6F4EF]/50 tabular-nums px-1">
                      {String(currentIndex + 1).padStart(2, "0")} / {String(playableCases.length).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/15 text-[11px] font-mono uppercase tracking-wider text-[#F6F4EF]/80 hover:text-white hover:border-[#D94E28] transition-colors cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight size={13} />
                    </button>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 ml-auto">
                <span className="hidden md:inline text-[11px] font-mono text-[#F6F4EF]/45">
                  {getPlatformHint(activeCase.embedUrl)} · Press ESC to close
                </span>
                {activeCase.externalLink && (
                  <a
                    href={activeCase.externalLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#D94E28] hover:bg-[#F6F4EF] text-white hover:text-[#141413] text-[11px] font-mono uppercase tracking-wider transition-colors font-medium"
                  >
                    <span>{activeCase.externalLink.label}</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
