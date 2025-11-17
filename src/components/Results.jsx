export default function Results({ data }) {
  if (!data) return null
  const results = data.results || []
  if (!results.length) return null

  const best = results[0]
  const avg = results.reduce((s, r) => s + r.total_price, 0) / results.length
  const saving = avg - best.total_price

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Sammenligning</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-blue-100/90">
          <thead className="text-blue-300/80 text-sm">
            <tr>
              <th className="py-2 pr-4">Butikk</th>
              <th className="py-2 pr-4">Totalpris</th>
              <th className="py-2 pr-4">Innsparing vs. snitt</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.store_slug} className={r.store_slug === best.store_slug ? 'bg-blue-500/10' : ''}>
                <td className="py-2 pr-4 capitalize">{r.store_slug}</td>
                <td className="py-2 pr-4 font-semibold">{r.total_price.toFixed(2)} kr</td>
                <td className="py-2 pr-4">{(avg - r.total_price).toFixed(2)} kr</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h4 className="text-white font-semibold mb-2">Detaljer for billigste butikk ({best.store_slug}):</h4>
        <ul className="space-y-2 text-sm text-blue-100/90">
          {best.line_items.map((li, idx) => (
            <li key={idx} className="flex items-start justify-between gap-2 border-b border-white/10 pb-2">
              <div>
                <p className="font-medium">{li.query}</p>
                <p className="text-blue-300/80 text-xs">{li.status === 'substitute' ? 'Substitutt' : 'Match'}</p>
              </div>
              <div className="font-semibold">{li.price.toFixed(2)} kr</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
