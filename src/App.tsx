import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Menu, X, ChevronDown, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/src/lib/utils";

// --- Constants ---

const SERVICES = [
  { 
    id: "business-consulting",
    title: "Business Consulting & Market Entry", 
    desc: "Comprehensive support for foreign enterprises entering the Netherlands.",
    detail: "We specialize in guiding international companies through the complexities of the Dutch business landscape. From initial legal registration and tax structuring to full-scale operational support, we ensure your entry into Europe is seamless and strategic.",
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1974&auto=format&fit=crop",
    methodology: "Our 'Soft Landing' methodology minimizes risk and accelerates growth. We handle the bureaucracy so you can focus on your core business, providing a single point of contact for legal, financial, and administrative requirements.",
    caseStudies: [
      { title: "Global Tech Branch Establishment", desc: "Facilitated the complete setup of a Dutch subsidiary for a major Asian tech firm, including office acquisition, local compliance, and HR infrastructure." },
      { title: "Corporate Immigration & EU Mobility", desc: "Managed the corporate immigration process for a multinational leadership team, securing residency and work permits for seamless European operations." }
    ]
  },
  { 
    id: "creative-agency",
    title: "Video Production House", 
    desc: "High-end media production for TVC, documentaries, and corporate narratives.",
    detail: "YEAH is a premier video production house dedicated to crafting high-fidelity visual content. We bridge the gap between cinematic artistry and commercial impact, producing everything from television commercials to deep-dive documentaries.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    methodology: "We operate with a 'Media-First' mindset. Our process involves strategic storytelling, high-end cinematography, and meticulous post-production to ensure every frame resonates with your target audience.",
    caseStudies: [
      { title: "Listed Law Firm Media Suite", desc: "Produced a series of high-impact internal speeches and exhibition videos for multiple publicly listed law firms, elevating their corporate communication." },
      { title: "Dutch Dating Show 2026", desc: "Currently in production for a major Dutch reality dating show, managing full-scale on-site filming and creative direction for the 2026 season." }
    ]
  },
  { 
    id: "fine-art",
    title: "Fine Art & Cultural Exchange", 
    desc: "Connecting international artists with the Dutch art market.",
    detail: "We curate the extraordinary by attracting international artists to the Netherlands. Leveraging our extensive network of Asian artists, we facilitate cultural exchange and provide a platform for diverse voices in the European contemporary art scene.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2090&auto=format&fit=crop",
    methodology: "Our curation is a bridge between East and West. We provide artists with residency support, exhibition opportunities, and strategic positioning within the Dutch and European art markets.",
    caseStudies: [
      { title: "Asian Contemporary Art Showcase", desc: "Curated a landmark exhibition in Amsterdam featuring 12 emerging artists from East Asia, attracting over 5,000 visitors and critical acclaim." },
      { title: "Artist Residency Program", desc: "Established a recurring residency program that has successfully integrated 20+ international artists into the local Dutch creative ecosystem." }
    ]
  },
  { 
    id: "custom-it-services",
    title: "Enterprise IT Solutions", 
    desc: "Bespoke digital architecture for global organizations.",
    detail: "We provide critical IT support and custom software engineering for enterprises facing complex digital challenges. Our focus is on building robust, scalable foundations that empower cross-border operations.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    methodology: "We engineer for resilience. Our IT solutions are built on a foundation of security and scalability, ensuring that your digital infrastructure can grow alongside your global ambitions.",
    caseStudies: [
      { title: "Cross-Border System Integration", desc: "Designed and implemented a unified IT infrastructure for a multinational corporation, enabling real-time data synchronization across three continents." },
      { title: "Custom ERP for Global Trade", desc: "Developed a bespoke Enterprise Resource Planning system tailored for the specific regulatory and logistical needs of international trade." }
    ]
  }
];

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center mix-blend-difference">
      <Link 
        to="/"
        className="text-2xl font-serif tracking-widest uppercase"
      >
        YEAH
      </Link>
      <motion.button 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:opacity-50 transition-opacity text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center space-y-8 text-4xl md:text-6xl font-serif italic"
          >
            {[
              { name: "Home", path: "/" },
              { name: "Philosophy", path: "/#philosophy" },
              { name: "Capabilities", path: "/#capabilities" },
              { name: "Contact", path: "/#contact" }
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                {item.path.startsWith("/#") ? (
                  <a
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-gray-500 transition-colors text-white"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-gray-500 transition-colors text-white"
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <motion.div 
        style={{ y: y1, opacity }}
        className="text-center z-10"
      >
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-7xl md:text-[12rem] font-serif leading-none tracking-tighter mb-4"
        >
          YEAH
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-sm md:text-base font-mono uppercase tracking-[0.4em] text-gray-500"
        >
          Architects of the Unseen
        </motion.p>
      </motion.div>

      {/* Background Element */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-gradient-to-tr from-gray-900 to-black blur-[120px]" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
};

const Manifesto = () => {
  return (
    <section id="philosophy" className="py-32 px-6 md:px-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
            alt="Abstract" 
            className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl md:text-5xl font-serif italic mb-8 leading-tight">
            "We do not build for the eye, but for the intuition."
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">
            In a world saturated with noise, we seek the silence. Our methodology is not defined by industry, but by essence. We operate at the intersection of logic and poetry, crafting experiences that resonate beyond the surface.
          </p>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
            Est. 2020, Amsterdam The Netherlands
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Capabilities = () => {
  return (
    <section id="capabilities" className="py-32 bg-[#050505] relative">
      <div className="px-6 md:px-24 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <span className="text-xs font-mono uppercase tracking-[0.5em] text-gray-600 block mb-4">Capabilities</span>
          <h2 className="text-5xl md:text-7xl font-serif">Our Services</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-900">
          {SERVICES.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black p-12 md:p-24 group hover:bg-[#080808] transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              <Link to={`/services/${service.id}`} className="block h-full relative z-10">
                <span className="text-gray-700 font-mono text-sm mb-8 block">0{i + 1}</span>
                <h3 className="text-3xl font-serif mb-6 group-hover:italic transition-all">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed max-w-xs mb-8">
                  {service.desc}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors">
                  View Subpage <ArrowRight size={12} />
                </div>
              </Link>
              
              {/* Subtle Background Image on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                <img 
                  src={service.image} 
                  alt="" 
                  className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-48 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <h2 className="text-4xl md:text-8xl font-serif mb-12">Begin the Inquiry.</h2>
        <a 
          href="mailto:info@yeah-amsterdam.nl" 
          className="inline-flex items-center gap-4 text-xl md:text-2xl font-light hover:gap-8 transition-all duration-500 group"
        >
          info@yeah-amsterdam.nl
          <ArrowRight className="text-gray-600 group-hover:text-white transition-colors" />
        </a>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-24 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono uppercase tracking-widest text-gray-600">
      <div className="flex gap-8">
        <a href="#" className="hover:text-white transition-colors">Instagram</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
      </div>
      <div>
        © 2026 YEAH Agency. All Rights Reserved.
      </div>
      <div>
        Privacy / Terms
      </div>
    </footer>
  );
};

const HomePage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Hero />
    <Manifesto />
    <Capabilities />
    <Contact />
  </motion.div>
);

const ServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!service) {
    return (
      <div className="h-screen flex items-center justify-center text-white font-serif italic text-2xl">
        Service not found.
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-40 pb-32 px-6 md:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-16"
        >
          <ArrowLeft size={16} /> Back to Home
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs font-mono uppercase tracking-[0.5em] text-gray-600 block mb-8">
              Service Detail
            </span>
            <h1 className="text-5xl md:text-8xl font-serif mb-12 leading-tight italic">
              {service.title}
            </h1>
            <p className="text-xl md:text-3xl font-light text-gray-300 leading-relaxed mb-12">
              {service.detail}
            </p>
            
            <div className="space-y-4 pt-12 border-t border-gray-900">
              {/* Methodology */}
              <div className="border-b border-gray-900 pb-4">
                <button 
                  onClick={() => setExpandedSection(expandedSection === 'methodology' ? null : 'methodology')}
                  className="w-full flex justify-between items-center group py-4"
                >
                  <span className={cn(
                    "text-xs font-mono uppercase tracking-widest transition-colors",
                    expandedSection === 'methodology' ? "text-white" : "text-gray-500 group-hover:text-white"
                  )}>Methodology</span>
                  <motion.div
                    animate={{ rotate: expandedSection === 'methodology' ? 90 : 0 }}
                  >
                    <ArrowRight size={16} className={cn(
                      "transition-colors",
                      expandedSection === 'methodology' ? "text-white" : "text-gray-800 group-hover:text-white"
                    )} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedSection === 'methodology' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400 font-light leading-relaxed pb-6">
                        {service.methodology}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Case Studies */}
              <div className="border-b border-gray-900 pb-4">
                <button 
                  onClick={() => setExpandedSection(expandedSection === 'cases' ? null : 'cases')}
                  className="w-full flex justify-between items-center group py-4"
                >
                  <span className={cn(
                    "text-xs font-mono uppercase tracking-widest transition-colors",
                    expandedSection === 'cases' ? "text-white" : "text-gray-500 group-hover:text-white"
                  )}>Case Studies</span>
                  <motion.div
                    animate={{ rotate: expandedSection === 'cases' ? 90 : 0 }}
                  >
                    <ArrowRight size={16} className={cn(
                      "transition-colors",
                      expandedSection === 'cases' ? "text-white" : "text-gray-800 group-hover:text-white"
                    )} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedSection === 'cases' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-8 pb-6">
                        {service.caseStudies?.map((cs, idx) => (
                          <div key={idx} className="group/item">
                            <h4 className="text-white font-serif italic text-lg mb-2">{cs.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{cs.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* External Details Link for Business Consulting */}
              {service.id === "business-consulting" && (
                <div className="border-b border-gray-900 pb-4">
                  <a 
                    href="https://yeah-business-amsterdam-m6sjyle.gamma.site/yeah-en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-between items-center group py-4"
                  >
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">More Details</span>
                    <ArrowRight size={16} className="text-gray-800 group-hover:text-white transition-colors" />
                  </a>
                </div>
              )}

              {/* Inquire */}
              <div className="pb-4">
                <a 
                  href="mailto:info@yeah-amsterdam.nl"
                  className="w-full flex justify-between items-center group py-4"
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">Inquire</span>
                  <ArrowRight size={16} className="text-gray-800 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

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
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
