import { useState, useCallback } from 'react'

const SAMPLE_JSON = {
  id: 1,
  name: "Alice Johnson",
  email: "alice@example.com",
  age: 30,
  isActive: true,
  address: {
    street: "123 Main St",
    city: "Wonderland",
    zip: "00001"
  },
  tags: ["developer", "react", "open-source"],
  metadata: null
}

/**
 * useJsonFormatter
 * Encapsulates all JSON formatting, validation, and minification logic.
 */
export function useJsonFormatter() {
  const [input, setInput] = useState('')
  const [formatted, setFormatted] = useState('')
  const [error, setError] = useState(null)
  const [indent, setIndent] = useState(2)

  const parse = useCallback(
    (raw, spaces) => {
      if (!raw.trim()) {
        setFormatted('')
        setError(null)
        return
      }
      try {
        const parsed = JSON.parse(raw)
        setFormatted(JSON.stringify(parsed, null, spaces))
        setError(null)
      } catch (err) {
        setFormatted('')
        setError(err.message)
      }
    },
    []
  )

  const handleInputChange = useCallback(
    (value) => {
      setInput(value)
      parse(value, indent)
    },
    [indent, parse]
  )

  const handleFormat = useCallback(() => {
    parse(input, indent)
  }, [input, indent, parse])

  const handleMinify = useCallback(() => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      setFormatted(JSON.stringify(parsed))
      setError(null)
    } catch (err) {
      setError(err.message)
      setFormatted('')
    }
  }, [input])

  const handleClear = useCallback(() => {
    setInput('')
    setFormatted('')
    setError(null)
  }, [])

  const handleLoadSample = useCallback(() => {
    const raw = JSON.stringify(SAMPLE_JSON)
    setInput(raw)
    parse(raw, indent)
  }, [indent, parse])

  const handleIndentChange = useCallback(
    (spaces) => {
      setIndent(spaces)
      parse(input, spaces)
    },
    [input, parse]
  )

  return {
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
  }
}
