import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/src/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center mix-blend-difference">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-serif tracking-widest uppercase"
      >
        YEAH
      </motion.div>
      <motion.button 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:opacity-50 transition-opacity"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Fullscreen Menu */}
      <motion.div 
        initial={false}
        animate={isOpen ? { opacity: 1, visibility: "visible" } : { opacity: 0, visibility: "hidden" }}
        className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center space-y-8 text-4xl md:text-6xl font-serif italic"
      >
        {["Home", "Philosophy", "Capabilities", "Contact"].map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-500 transition-colors"
          >
            {item}
          </motion.a>
        ))}
      </motion.div>
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
  const [selectedService, setSelectedService] = useState<null | number>(null);

  const services = [
    { 
      title: "Business Consulting", 
      desc: "Strategic business consulting for the modern era.",
      detail: "Navigating complexity with surgical precision. We provide strategic roadmaps for legacy enterprises and disruptive startups alike, focusing on sustainable growth and operational excellence in a volatile global market."
    },
    { 
      title: "Creative Agency", 
      desc: "Crafting narratives that define the future.",
      detail: "Where imagination meets execution. Our creative studio specializes in high-fidelity brand identities, digital experiences, and narrative-driven campaigns that resonate at a frequency others cannot reach."
    },
    { 
      title: "Fine Art", 
      desc: "Curating the essential and the extraordinary.",
      detail: "Curating the extraordinary. We bridge the gap between traditional craftsmanship and contemporary vision, offering bespoke art advisory and acquisition services for private collectors and institutional spaces."
    },
    { 
      title: "Custom IT Services", 
      desc: "Bespoke technology solutions for complex challenges.",
      detail: "Bespoke digital architecture. From high-performance cloud infrastructure to custom-built software ecosystems, we engineer the invisible foundations that power the world's most ambitious organizations."
    }
  ];

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
          {services.map((service, i) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedService(i)}
              className="bg-black p-12 md:p-24 group hover:bg-[#080808] transition-colors cursor-pointer relative overflow-hidden"
            >
              <span className="text-gray-700 font-mono text-sm mb-8 block">0{i + 1}</span>
              <h3 className="text-3xl font-serif mb-6 group-hover:italic transition-all">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed max-w-xs mb-8">
                {service.desc}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors">
                View Details <ArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal Overlay */}
      <motion.div
        initial={false}
        animate={selectedService !== null ? { opacity: 1, visibility: "visible" } : { opacity: 0, visibility: "hidden" }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6 md:p-24"
      >
        <button 
          onClick={() => setSelectedService(null)}
          className="absolute top-8 right-8 md:top-12 md:right-12 p-4 hover:opacity-50 transition-opacity"
        >
          <X size={32} />
        </button>
        
        {selectedService !== null && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-4xl w-full"
          >
            <span className="text-xs font-mono uppercase tracking-[0.5em] text-gray-600 block mb-8">
              0{selectedService + 1} / {services[selectedService].title}
            </span>
            <h2 className="text-4xl md:text-7xl font-serif mb-12 leading-tight italic">
              {services[selectedService].title}
            </h2>
            <p className="text-xl md:text-3xl font-light text-gray-300 leading-relaxed">
              {services[selectedService].detail}
            </p>
            <motion.button
              whileHover={{ x: 10 }}
              onClick={() => setSelectedService(null)}
              className="mt-16 flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-white border-b border-white pb-2"
            >
              Back to Services <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
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
        © 2026 YEAH Studio. All Rights Reserved.
      </div>
      <div>
        Privacy / Terms
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-white selection:text-black">
      <div className="grain" />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Capabilities />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
