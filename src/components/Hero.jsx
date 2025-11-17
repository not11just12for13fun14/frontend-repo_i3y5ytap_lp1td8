import { useState } from 'react'

export default function Hero({ onCompare }) {
  const [text, setText] = useState('melk 1l\nbrød\negg 12stk\nbanan 1kg')
  const [strategy, setStrategy] = useState('total')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await onCompare(text, strategy)
    } catch (err) {
      setError(err.message || 'Noe gikk galt')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Finn billigste butikk for din handleliste</h2>
      <p className="text-blue-200/80 mb-4">Lim inn listen din – vi matcher mot norske dagligvarekjeder og regner ut totalpris.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full rounded-xl bg-slate-900/70 border border-blue-400/30 text-blue-100 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={"melk 1l\nbrød\negg 12stk"}
        />
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-blue-100">
            <label className="text-sm">Strategi:</label>
            <select
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="bg-slate-900/70 border border-blue-400/30 rounded-lg px-3 py-2 text-sm"
            >
              <option value="total">Laveste totalpris</option>
              <option value="per_category">Lavest pr. kategori</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold disabled:opacity-60"
          >
            {loading ? 'Beregner...' : 'Sammenlign priser'}
          </button>
        </div>
        {error && <p className="text-red-300 text-sm">{error}</p>}
      </form>
    </div>
  )
}
