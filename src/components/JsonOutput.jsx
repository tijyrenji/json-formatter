import { useState } from 'react'
import copyIcon from '../assets/icons/copy.svg'
import checkIcon from '../assets/icons/check.svg'
import errorIcon from '../assets/icons/error.svg'
import documentIcon from '../assets/icons/document.svg'

/**
 * JsonOutput component
 * Renders syntax-highlighted formatted JSON inside a <pre> block
 * with a "Copy to Clipboard" button.
 */

/** Applies token-level syntax highlighting to a JSON string */
function syntaxHighlight(json) {
  json = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = 'text-[#79c0ff]' // number
      if (/^"/.test(match)) {
        cls = /:$/.test(match)
          ? 'text-[#ff7b72]' // key
          : 'text-[#a5d6ff]' // string value
      } else if (/true|false/.test(match)) {
        cls = 'text-[#ffa657]' // boolean
      } else if (/null/.test(match)) {
        cls = 'text-[#8b949e]' // null
      }
      return `<span class="${cls}">${match}</span>`
    }
  )
}

export default function JsonOutput({ formatted, error, rawInput }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!formatted) return
    try {
      await navigator.clipboard.writeText(formatted)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = formatted
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const isEmpty = !rawInput
  const isError = Boolean(error)
  const isValid = !isError && formatted

  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Output
          </label>
          {!isEmpty && (
            <span
              className={[
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide',
                isError
                  ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                  : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
              ].join(' ')}
            >
              <span
                className={[
                  'w-1.5 h-1.5 rounded-full',
                  isError ? 'bg-red-400' : 'bg-emerald-400',
                ].join(' ')}
              />
              {isError ? 'Invalid JSON' : 'Valid JSON'}
            </span>
          )}
        </div>

        {/* Copy button */}
        <button
          id="copy-to-clipboard-btn"
          type="button"
          onClick={handleCopy}
          disabled={!isValid}
          className={[
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
            isValid
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-px active:translate-y-0'
              : 'bg-slate-800 text-slate-600 cursor-not-allowed',
          ].join(' ')}
          title={isValid ? 'Copy formatted JSON' : 'Nothing to copy'}
        >
          {copied ? (
            <>
              <img src={checkIcon} alt="" className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <img src={copyIcon} alt="" className="w-3.5 h-3.5" />
              Copy to Clipboard
            </>
          )}
        </button>
      </div>

      {/* Output area */}
      <div
        className={[
          'flex-1 rounded-xl border overflow-auto transition-all duration-200',
          isError
            ? 'border-red-500/40 bg-red-950/20'
            : 'border-slate-700/60 bg-[#0d1117]',
        ].join(' ')}
        style={{ minHeight: '300px' }}
      >
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-600 select-none p-8 gap-3">
            <img src={documentIcon} alt="" className="w-12 h-12 opacity-30" />
            <p className="text-sm">Formatted output will appear here</p>
          </div>
        ) : isError ? (
          <div className="p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-red-400">
              <img src={errorIcon} alt="" className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-semibold">Parse Error</span>
            </div>
            <pre
              className="text-red-300 text-sm leading-relaxed whitespace-pre-wrap break-all"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {error}
            </pre>
          </div>
        ) : (
          <pre
            id="json-output"
            className="p-4 text-sm leading-relaxed overflow-auto"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            dangerouslySetInnerHTML={{ __html: syntaxHighlight(formatted) }}
          />
        )}
      </div>
    </div>
  )
}
