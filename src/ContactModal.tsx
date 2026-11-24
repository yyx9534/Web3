import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  Send, 
  MessageSquare, 
  Building2, 
  Sparkles,
  Clock,
  MapPin
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
  defaultPractice?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultSubject,
  defaultPractice
}) => {
  const [copied, setCopied] = useState(false);
  const [practice, setPractice] = useState(defaultPractice || "general");
  const [subject, setSubject] = useState(defaultSubject || "General Practice Inquiry");
  const [message, setMessage] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const email = "info@yeah-amsterdam.nl";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getEncodedSubject = () => encodeURIComponent(subject || "Inquiry for YEAH Agency Amsterdam");
  const getEncodedBody = () => encodeURIComponent(
    `Practice: ${practice}\nContact: ${senderEmail || "Not provided"}\n\nMessage:\n${message}\n\n---\nSent via YEAH Agency Amsterdam (yeah-amsterdam.nl)`
  );

  const mailtoHref = `mailto:${email}?subject=${getEncodedSubject()}&body=${getEncodedBody()}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${getEncodedSubject()}&body=${getEncodedBody()}`;
  const outlookHref = `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${getEncodedSubject()}&body=${getEncodedBody()}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prepares mailto and confirms
    window.location.href = mailtoHref;
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#141413]/45 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative w-full max-w-xl bg-[#F6F4EF] border border-[#141413]/15 rounded-sm p-6 sm:p-8 text-[#141413] shadow-2xl z-10 my-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-5 border-b border-[#141413]/10 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#D94E28] uppercase tracking-widest mb-1.5">
                <Sparkles size={13} /> Direct Contact &amp; Inquiry
              </div>
              <h3 className="font-serif text-2xl text-[#141413]">Contact YEAH Agency Amsterdam</h3>
              <p className="text-xs text-[#141413]/65 mt-1 font-light">
                Official engagement portal for European corporate consulting, video production, and software engineering.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#141413]/50 hover:text-[#141413] rounded hover:bg-[#141413]/5 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Copy Box */}
          <div className="mb-6 p-4 bg-white border border-[#141413]/12 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#141413]/55 block mb-0.5">
                Direct Practice Mailbox
              </span>
              <span className="font-mono text-sm text-[#D94E28] font-medium select-all">
                {email}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#141413] text-[#F6F4EF] hover:bg-[#D94E28] hover:text-white transition-colors rounded-sm shrink-0 uppercase tracking-wider cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={13} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={13} /> Copy Email
                </>
              )}
            </button>
          </div>

          {/* Mail Client Triggers */}
          <div className="mb-6">
            <span className="text-[11px] font-mono text-[#141413]/60 uppercase tracking-wider block mb-2.5">
              Choose How to Open Your Email:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              <a
                href={mailtoHref}
                className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-[#ECE8DF] border border-[#141413]/12 rounded-sm text-[#141413] transition-colors text-center"
              >
                <Mail size={14} className="text-[#D94E28]" />
                <span>Default App</span>
              </a>
              <a
                href={gmailHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-[#ECE8DF] border border-[#141413]/12 rounded-sm text-[#141413] transition-colors text-center"
              >
                <ExternalLink size={14} className="text-[#D94E28]" />
                <span>Web Gmail</span>
              </a>
              <a
                href={outlookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-[#ECE8DF] border border-[#141413]/12 rounded-sm text-[#141413] transition-colors text-center"
              >
                <ExternalLink size={14} className="text-[#141413]/70" />
                <span>Web Outlook</span>
              </a>
            </div>
          </div>

          {/* Quick Message Composer Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-[#141413]/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono text-[#141413]/65 uppercase tracking-wider block mb-1">
                  Practice of Interest
                </label>
                <select
                  value={practice}
                  onChange={(e) => setPractice(e.target.value)}
                  className="w-full bg-white border border-[#141413]/15 px-3 py-2 text-xs text-[#141413] rounded-sm focus:border-[#D94E28] outline-none font-mono"
                >
                  <option value="corporate-consulting">01. Corporate Consulting (Dutch BV / EPR)</option>
                  <option value="video-production">02. Video Production (Glass Sharp Films)</option>
                  <option value="software">03. Software Development (DriveViewer)</option>
                  <option value="wedding">Destination Wedding Cinema</option>
                  <option value="general">General Engagement</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#141413]/65 uppercase tracking-wider block mb-1">
                  Your Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-white border border-[#141413]/15 px-3 py-2 text-xs text-[#141413] rounded-sm focus:border-[#D94E28] outline-none font-mono placeholder:text-[#141413]/35"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#141413]/65 uppercase tracking-wider block mb-1">
                Message or Project Brief
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe your objectives, timeline, or inquiries..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white border border-[#141413]/15 p-3 text-xs text-[#141413] rounded-sm focus:border-[#D94E28] outline-none font-light placeholder:text-[#141413]/35 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#141413]/60">
                <Clock size={12} className="text-[#D94E28]" />
                <span>Response within 24 business hours (CET)</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-mono text-[#141413]/60 hover:text-[#141413] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D94E28] hover:bg-[#141413] text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors cursor-pointer"
                >
                  <Send size={12} /> Launch Email
                </button>
              </div>
            </div>
          </form>

          {/* Footer note */}
          <div className="mt-4 pt-3 border-t border-[#141413]/10 text-[10px] font-mono text-[#141413]/50 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <MapPin size={11} /> Keizersgracht &amp; Herengracht, Amsterdam
            </span>
            <span>GDPR Secure</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
