/**
 * Toolbar component
 * Action buttons: Format, Minify, and indent-size selector.
 */
import formatIcon from '../assets/icons/format.svg'
import minifyIcon from '../assets/icons/minify.svg'
import sampleIcon from '../assets/icons/sample.svg'

export default function Toolbar({ onFormat, onMinify, onSample, indent, onIndentChange, disabled }) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-1">
      {/* Format button */}
      <button
        id="format-btn"
        type="button"
        aria-label="Format JSON"
        onClick={onFormat}
        disabled={disabled}
        className={[
          'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
          disabled
            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-px active:translate-y-0',
        ].join(' ')}
      >
        <img src={formatIcon} alt="" className="w-4 h-4" />
        Format
      </button>

      {/* Minify button */}
      <button
        id="minify-btn"
        type="button"
        onClick={onMinify}
        disabled={disabled}
        className={[
          'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
          disabled
            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
            : 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600/50 hover:border-slate-500/50 hover:-translate-y-px active:translate-y-0',
        ].join(' ')}
      >
        <img src={minifyIcon} alt="" className="w-4 h-4" />
        Minify
      </button>

      {/* Sample JSON button */}
      <button
        id="sample-json-btn"
        type="button"
        onClick={onSample}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-500/50 hover:bg-slate-800/50 transition-all duration-200 hover:-translate-y-px active:translate-y-0"
      >
        <img src={sampleIcon} alt="" className="w-4 h-4" />
        Load Sample
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Indent selector */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="indent-select"
          className="text-xs text-slate-500 whitespace-nowrap"
        >
          Indent
        </label>
        <select
          id="indent-select"
          value={indent}
          onChange={(e) => onIndentChange(Number(e.target.value))}
          className="bg-slate-800 border border-slate-700/60 text-slate-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all duration-200 cursor-pointer"
        >
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
          <option value={8}>8 spaces</option>
        </select>
      </div>
    </div>
  )
}
