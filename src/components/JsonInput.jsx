/**
 * JsonInput component
 * Renders the textarea for raw JSON input with character count and clear button.
 */
import closeIcon from '../assets/icons/close.svg'

export default function JsonInput({ value, onChange, onClear, hasError }) {
  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <label
          htmlFor="json-input"
          className="text-xs font-semibold uppercase tracking-widest text-slate-400"
        >
          Input JSON
        </label>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 tabular-nums">
            {value.length.toLocaleString()} chars
          </span>
          {value && (
            <button
              id="clear-input-btn"
              type="button"
              onClick={onClear}
              className="text-xs text-slate-400 hover:text-red-400 transition-colors duration-150 flex items-center gap-1"
              title="Clear input"
            >
              <img src={closeIcon} alt="" className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Textarea */}
      <textarea
        id="json-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Paste your JSON here... e.g. {"name":"Alice","age":30}'
        spellCheck={false}
        className={[
          'flex-1 w-full rounded-xl border bg-[#0d1117] p-4 resize-none',
          'font-mono text-sm leading-relaxed text-slate-200 placeholder:text-slate-600',
          'focus:outline-none focus:ring-2 transition-all duration-200',
          hasError
            ? 'border-red-500/60 focus:ring-red-500/40'
            : 'border-slate-700/60 focus:ring-indigo-500/40 focus:border-indigo-500/60',
        ].join(' ')}
        style={{ fontFamily: "'JetBrains Mono', monospace", minHeight: '300px' }}
      />
    </div>
  )
}
