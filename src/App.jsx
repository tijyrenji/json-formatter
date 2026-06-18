import Header from './components/Header'
import Footer from './components/Footer'
import Toolbar from './components/Toolbar'
import JsonInput from './components/JsonInput'
import JsonOutput from './components/JsonOutput'
import { useJsonFormatter } from './hooks/useJsonFormatter'

export default function App() {
  const {
    input,
    formatted,
    error,
    indent,
    handleInputChange,
    handleFormat,
    handleMinify,
    handleClear,
    handleLoadSample,
    handleIndentChange,
  } = useJsonFormatter()

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      {/* Ambient gradient background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden -z-10"
      >
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <Header />

      <main className="flex-1 flex flex-col gap-4 p-4 md:p-6 max-w-screen-xl mx-auto w-full">
        {/* Toolbar */}
        <Toolbar
          onFormat={handleFormat}
          onMinify={handleMinify}
          onSample={handleLoadSample}
          indent={indent}
          onIndentChange={handleIndentChange}
          disabled={!input.trim()}
        />

        {/* Editor grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
          {/* Input panel */}
          <section
            className="flex flex-col rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm p-4 shadow-xl"
            aria-label="JSON input panel"
          >
            <JsonInput
              value={input}
              onChange={handleInputChange}
              onClear={handleClear}
              hasError={Boolean(error)}
            />
          </section>

          {/* Output panel */}
          <section
            className="flex flex-col rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm p-4 shadow-xl"
            aria-label="JSON output panel"
          >
            <JsonOutput
              formatted={formatted}
              error={error}
              rawInput={input}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
