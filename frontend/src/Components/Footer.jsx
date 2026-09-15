import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-zinc-800/80 py-6 mt-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
        {/* Copyright */}
        <p className="tracking-wide text-zinc-500">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-zinc-300 font-semibold">Aureon Store</span>. All rights reserved.
        </p>
        <a
          href="mailto:usamahere49@gmail.com"
          className="flex items-center gap-2 text-zinc-400 hover:text-orange-400 transition-colors duration-200 bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg"
        >
          <Mail className="w-3.5 h-3.5 text-orange-500" />
          <span>Contact Support</span>
        </a>
      </div>
    </footer>
  );
}
