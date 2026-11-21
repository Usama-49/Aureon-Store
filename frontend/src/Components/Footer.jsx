import { useState } from "react";
import { Mail, Bug, Store, X, ExternalLink } from "lucide-react";
import { STORE_ADMIN_EMAIL, DEVELOPER_EMAIL, adminMailto, devMailto } from "../config/contact";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-gray-950 text-gray-400 border-t border-zinc-800/80 py-6 mt-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          {/* Copyright */}
          <p className="tracking-wide text-zinc-500">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-zinc-300 font-semibold">Aureon Store</span>. All rights reserved.
          </p>

          {/* Contact Support Trigger Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-zinc-400 hover:text-orange-400 transition-colors duration-200 bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-orange-500" />
            <span>Contact Support</span>
          </button>
        </div>
      </footer>

      {/* ================= SUPPORT MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-800 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Mail className="text-orange-400" size={22} />
                Contact Support
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                Choose who you would like to reach out to below.
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-4">
              {/* Option 1: Developer */}
              <a
                href={devMailto("Bug Report")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsModalOpen(false)}
                className="group block bg-gray-800/60 hover:bg-gray-800 border border-gray-700/80 hover:border-orange-500/60 rounded-xl p-4 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-400 border border-orange-500/20 group-hover:bg-orange-500/20 transition-colors">
                      <Bug size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm group-hover:text-orange-400 transition-colors">
                        Contact Developer
                      </h4>
                      <p className="text-gray-400 text-xs mt-0.5">
                        Report a bug, technical glitch, or app issue.
                      </p>
                    </div>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-gray-500 group-hover:text-orange-400 transition-colors mt-1"
                  />
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700/50 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Email:</span>
                  <span className="text-orange-400 font-mono">{DEVELOPER_EMAIL}</span>
                </div>
              </a>

              {/* Option 2: Store Admin */}
              <a
                href={adminMailto("Support Request")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsModalOpen(false)}
                className="group block bg-gray-800/60 hover:bg-gray-800 border border-gray-700/80 hover:border-orange-500/60 rounded-xl p-4 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-400 border border-orange-500/20 group-hover:bg-orange-500/20 transition-colors">
                      <Store size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm group-hover:text-orange-400 transition-colors">
                        Contact Store Admin
                      </h4>
                      <p className="text-gray-400 text-xs mt-0.5">
                        Inquire about orders, products, shipments, or store policies.
                      </p>
                    </div>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-gray-500 group-hover:text-orange-400 transition-colors mt-1"
                  />
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700/50 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Email:</span>
                  <span className="text-orange-400 font-mono">{STORE_ADMIN_EMAIL}</span>
                </div>
              </a>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
