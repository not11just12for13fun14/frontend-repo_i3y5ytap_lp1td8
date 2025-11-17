import { useState } from 'react'
import Hero from './components/Hero'
import Results from './components/Results'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const apiBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onCompare = async (text, strategy) => {
    setLoading(true)
    setError('')
    try {
      // Ensure demo data exists for a good first-run experience
      await fetch(`${apiBase}/seed-demo`, { method: 'POST' })
      const res = await fetch(`${apiBase}/compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items_text: text, strategy })
      })
      if (!res.ok) throw new Error('Kunne ikke sammenligne priser')
      const json = await res.json()
      setData(json)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="relative min-h-screen p-6 md:p-12">
        <header className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="Flames" className="w-10 h-10" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">Dagligvare-sammenligner</h1>
          </div>
          <a href="/test" className="text-blue-300 hover:text-white text-sm">Status</a>
        </header>

        <main className="max-w-5xl mx-auto space-y-6">
          <Hero onCompare={onCompare} />

          {loading && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-blue-100">Beregner ...</div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-200 rounded-2xl p-4">{error}</div>
          )}

          <Results data={data} />

          <section className="text-blue-200/80 text-sm">
            <p>
              Merk: Dette er en demoversjon. Faktiske priser hentes via planlagte oppdateringer og kan variere.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
