/**
 * Footer component
 * Displays the author's name, email, and a "Built for Digital Heroes" link.
 */
import starIcon from '../assets/icons/star.svg'

const user = 'tijitk4i';
const domain = 'gmail.com';
const email = `${user}@${domain}`;

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
      {/* Author info */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="font-medium text-slate-400">JSON Formatter © 2026 — Built with AI by Tijy Thomas</span>
        <span className="text-slate-700">·</span>
        <a
          href={`mailto:${email}`}
          className="hover:text-indigo-400 transition-colors duration-150"
        >
          {email}
        </a>
      </div>

      {/* Digital Heroes button */}
      <a
        id="digital-heroes-btn"
        href="https://digitalheroesco.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-200 hover:-translate-y-px active:translate-y-0"
      >
        <img src={starIcon} alt="" className="w-3.5 h-3.5" />
        Built for Digital Heroes
      </a>
    </footer>
  )
}
