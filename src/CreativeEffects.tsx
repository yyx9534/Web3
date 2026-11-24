import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

/**
 * Editorial Motion Choreography Primitives (Warm Ivory Gallery Feel)
 * Compositor-only transforms (y, scale) + opacity for 60fps transitions.
 */
export const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

export const editorialPageVariants: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EDITORIAL_EASE,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: 0.26,
      ease: EDITORIAL_EASE,
    },
  },
};

export const editorialSectionVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      delay,
      ease: EDITORIAL_EASE,
    },
  }),
  exit: {
    opacity: 0,
    y: -14,
    transition: {
      duration: 0.24,
      ease: EDITORIAL_EASE,
    },
  },
};

export const editorialStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

export const editorialCardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: EDITORIAL_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.22,
      ease: EDITORIAL_EASE,
    },
  },
};

export const EditorialBlock: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}> = ({ children, className = "", delay = 0, id }) => (
  <motion.div
    id={id}
    variants={editorialSectionVariants}
    custom={delay}
    initial="hidden"
    whileInView="visible"
    exit="exit"
    viewport={{ once: false, amount: "some" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const EditorialSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}> = ({ children, className = "", delay = 0, id }) => (
  <motion.section
    id={id}
    variants={editorialSectionVariants}
    custom={delay}
    initial="hidden"
    whileInView="visible"
    exit="exit"
    viewport={{ once: false, amount: "some" }}
    className={className}
  >
    {children}
  </motion.section>
);

/**
 * Razor-thin top viewport scroll progress bar in Dutch Vermilion
 */
export const ScrollProgressHairline: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#D94E28] origin-left z-[100] pointer-events-none"
    />
  );
};

/**
 * Live Amsterdam (Europe/Amsterdam CET/CEST) digital clock for hero editorial dateline
 */
export const AmsterdamLiveClock: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>(() =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Amsterdam",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date())
  );

  useEffect(() => {
    const update = () => {
      setTimeStr(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Amsterdam",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <span className="tabular-nums">{timeStr} AMS</span>;
};

/**
 * Magnetic attraction wrapper for primary hero & contact actions
 */
export const MagneticWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
  strength?: number;
}> = ({ children, className = "", strength = 0.22 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 320, damping: 24, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 24, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

/**
 * Tactile 3D Perspective Tilt + Warm Gallery Sheen container
 */
export const TiltGalleryFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}> = ({ children, className = "", maxTilt = 5 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 260,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 260,
    damping: 26,
  });
  const glareOpacity = useMotionValue(0);
  const smoothGlare = useSpring(glareOpacity, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(px);
    mouseY.set(py);
    glareOpacity.set(1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      <motion.div
        aria-hidden="true"
        style={{ opacity: smoothGlare }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-[#D94E28]/10 transition-opacity"
      />
    </motion.div>
  );
};

/**
 * Subtle organic atmospheric gradient wash behind the warm ivory hero canvas
 */
export const AmbientGalleryMesh: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Warm Dutch Apricot / Vermilion glow */}
      <div
        className="animate-mesh-slow absolute -top-28 right-[-8%] w-[520px] h-[520px] md:w-[760px] md:h-[760px] rounded-full opacity-35 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(217,78,40,0.28) 0%, rgba(235,168,108,0.18) 45%, rgba(246,244,239,0) 72%)",
        }}
      />
      {/* Soft Golden / Sand atmospheric wash */}
      <div
        className="animate-mesh-reverse absolute top-[18%] -left-[10%] w-[460px] h-[460px] md:w-[680px] md:h-[680px] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(214,193,155,0.45) 0%, rgba(169,185,173,0.18) 52%, rgba(246,244,239,0) 75%)",
        }}
      />
      {/* Delicate architectural grid hairline accent */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(20,20,19,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,19,0.04) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 25%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 25%, black 20%, transparent 100%)",
        }}
      />
    </div>
  );
};

/**
 * Editorial Marquee Ribbon showcasing agency works, brands & Amsterdam coordinates
 */
const MARQUEE_ITEMS = [
  "AMSTERDAM · 52.3676° N, 4.9041° E",
  "GLASS SHARP FILMS",
  "TRAM DATING REALITY SERIES",
  "TOOBIT × CHRIS SHARMA",
  "FIXICO × MYWHEELS",
  "HERMIJNTJE DRENTH OLYMPIC PROFILE",
  "EUROPEAN DESTINATION WEDDING CINEMA",
  "DUTCH BV & KVK FORMATION",
  "EPR & KENNISMIGRANT DISPATCH",
  "DRIVEVIEWER IOS APP",
  "ENTERPRISE GDPR CLOUD ARCHITECTURE",
];

export const EditorialMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden border-y border-[#141413]/12 bg-[#ECE8DF]/75 py-3.5 select-none">
      <div className="animate-marquee flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.22em] text-[#141413]/75">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="whitespace-nowrap">{item}</span>
            <span className="text-[#D94E28] text-xs" aria-hidden="true">
              ✦
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

/**
 * Contextual Desktop Cursor that morphs over interactive agency cards / artwork
 */
export const AgencyCustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 380, mass: 0.4 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reducedMotion) return;
    setEnabled(true);

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl) {
        setCursorText(cursorEl.getAttribute("data-cursor") || "VIEW ↗");
        setIsPointer(true);
        return;
      }

      const clickable = target.closest("a, button, [role='button']");
      setCursorText(null);
      setIsPointer(Boolean(clickable));
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY, visible]);

  if (!enabled || !visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y }}
      className="fixed top-0 left-0 z-[9990] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center"
    >
      {cursorText ? (
        <motion.div
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="px-3.5 py-1.5 rounded-full bg-[#D94E28] text-white font-mono text-[10px] uppercase tracking-[0.2em] font-medium shadow-lg whitespace-nowrap"
        >
          {cursorText}
        </motion.div>
      ) : (
        <motion.div
          animate={{
            width: isPointer ? 34 : 12,
            height: isPointer ? 34 : 12,
            backgroundColor: isPointer ? "rgba(217, 78, 40, 0.14)" : "rgba(20, 20, 19, 0.85)",
            borderColor: isPointer ? "rgba(217, 78, 40, 0.8)" : "transparent",
          }}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full border"
        />
      )}
    </motion.div>
  );
};

/**
 * Interactive Radial Spotlight Sheen (Warm Vermilion / Ivory Gallery Illumination)
 * Purely pointer-events-none overlay that illuminates card surfaces without reducing contrast.
 */
export const SpotlightSurface: React.FC<{
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  radius?: number;
}> = ({
  children,
  className = "",
  spotlightColor = "rgba(217, 78, 40, 0.10)",
  radius = 340,
}) => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const [hovered, setHovered] = useState(false);

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative ${className}`}
    >
      <motion.div
        aria-hidden="true"
        style={{ background }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute inset-0 z-10"
      />
      {children}
    </div>
  );
};

/**
 * Precision Architectural / Cinema Viewfinder Corner Registration Marks
 */
export const ArchitecturalCornerMarks: React.FC<{
  dark?: boolean;
  className?: string;
}> = ({ dark = false, className = "" }) => {
  const color = dark
    ? "border-[#F6F4EF]/30 group-hover:border-[#D94E28]"
    : "border-[#141413]/25 group-hover:border-[#D94E28]";
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-20 ${className}`}>
      <span className={`absolute top-2 left-2 w-2.5 h-2.5 border-t border-l transition-colors duration-300 ${color}`} />
      <span className={`absolute top-2 right-2 w-2.5 h-2.5 border-t border-r transition-colors duration-300 ${color}`} />
      <span className={`absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l transition-colors duration-300 ${color}`} />
      <span className={`absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r transition-colors duration-300 ${color}`} />
    </div>
  );
};

/**
 * Viewport-Triggered Metric Counter (renders full target initially for crawlers/no-JS, animates smoothly on view)
 */
export const CountUpMetric: React.FC<{
  target: number;
  suffix?: string;
  prefix?: string;
  startFrom?: number;
  durationMs?: number;
}> = ({ target, suffix = "", prefix = "", startFrom = 0, durationMs = 1100 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: "some" });
  const [displayValue, setDisplayValue] = useState<number>(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(target);
      return;
    }
    hasAnimated.current = true;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startFrom + (target - startFrom) * eased);
      setDisplayValue(current);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [inView, target, startFrom, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

