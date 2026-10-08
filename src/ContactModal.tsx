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
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative w-full max-w-xl bg-[#0d0d0d] border border-white/15 rounded-sm p-6 sm:p-8 text-white shadow-2xl z-10 my-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-5 border-b border-white/10 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1.5">
                <Sparkles size={13} /> Direct Contact &amp; Inquiry
              </div>
              <h3 className="font-serif text-2xl text-white">Contact YEAH Agency Amsterdam</h3>
              <p className="text-xs text-gray-400 mt-1 font-light">
                Official engagement portal for European corporate consulting, production, fine art, and software.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Copy Box */}
          <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-0.5">
                Direct Practice Mailbox
              </span>
              <span className="font-mono text-sm text-emerald-300 font-medium select-all">
                {email}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-white text-black hover:bg-gray-200 transition-colors rounded-sm shrink-0 uppercase tracking-wider"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-700" /> Copied!
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
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-2.5">
              Choose How to Open Your Email:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              <a
                href={mailtoHref}
                className="flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-gray-200 transition-colors text-center"
              >
                <Mail size={14} className="text-emerald-400" />
                <span>Default App</span>
              </a>
              <a
                href={gmailHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-gray-200 transition-colors text-center"
              >
                <ExternalLink size={14} className="text-red-400" />
                <span>Web Gmail</span>
              </a>
              <a
                href={outlookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-gray-200 transition-colors text-center"
              >
                <ExternalLink size={14} className="text-blue-400" />
                <span>Web Outlook</span>
              </a>
            </div>
          </div>

          {/* Quick Message Composer Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
                  Practice of Interest
                </label>
                <select
                  value={practice}
                  onChange={(e) => setPractice(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-xs text-white rounded-sm focus:border-emerald-500 outline-none font-mono"
                >
                  <option value="corporate-consulting">01. Corporate Consulting (Dutch BV / EPR)</option>
                  <option value="video-production">02. Video Production (Glass Sharp Films)</option>
                  <option value="fine-art">03. Fine Art Representation (Ming Ye)</option>
                  <option value="software">04. Software Development (DriveViewer)</option>
                  <option value="wedding">Destination Wedding Cinema</option>
                  <option value="general">General Engagement</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
                  Your Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-xs text-white rounded-sm focus:border-emerald-500 outline-none font-mono placeholder:text-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
                Message or Project Brief
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe your objectives, timeline, or inquiries..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-black/60 border border-white/15 p-3 text-xs text-white rounded-sm focus:border-emerald-500 outline-none font-light placeholder:text-gray-600 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
                <Clock size={12} className="text-emerald-400" />
                <span>Response within 24 business hours (CET)</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors"
                >
                  <Send size={12} /> Launch Email
                </button>
              </div>
            </div>
          </form>

          {/* Footer note */}
          <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-gray-500 flex items-center justify-between">
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
