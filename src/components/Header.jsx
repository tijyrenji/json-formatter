/**
 * Header component
 * Displays the app brand, title, and tagline.
 */
import brandIcon from '../assets/icons/brand.svg'

export default function Header() {
  return (
    <header className="flex items-center gap-4 py-5 px-6 border-b border-slate-800/80">
      {/* Brand icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 flex-shrink-0">
        <img src={brandIcon} alt="JSON Formatter" className="w-5 h-5" />
      </div>

      {/* Title & subtitle */}
      <div>
        <h1 className="text-lg font-bold text-white leading-tight tracking-tight">
          JSON Formatter{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            &amp; Validator
          </span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Format, validate, and minify JSON instantly
        </p>
      </div>

      {/* Right badge */}
      <div className="ml-auto hidden sm:flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/50 rounded-full px-3 py-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-slate-400 font-medium">Live</span>
      </div>
    </header>
  )
}
