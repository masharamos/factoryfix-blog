'use client'

interface Stat {
  number: string
  label: string
  hidden: boolean
}

interface StatsEditorProps {
  stats: Stat[]
  onChange: (stats: Stat[]) => void
}

export default function StatsEditor({ stats, onChange }: StatsEditorProps) {
  const update = (i: number, field: keyof Stat, val: string | boolean) => {
    onChange(stats.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)))
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Column headers */}
      <div className="grid grid-cols-[96px_1fr_80px] gap-3 px-1">
        <span className="text-body-xs font-semibold text-gray-800">Number</span>
        <span className="text-body-xs font-semibold text-gray-800">Subtext</span>
        <span className="text-body-xs font-semibold text-gray-800 text-center">Show</span>
      </div>

      {stats.map((stat, i) => (
        <div
          key={i}
          className={`grid grid-cols-[96px_1fr_80px] gap-3 items-center py-1.5 transition-all ${
            stat.hidden ? 'opacity-40' : ''
          }`}
        >
          <input
            type="text"
            value={stat.number}
            onChange={e => update(i, 'number', e.target.value)}
            placeholder="e.g. 10M+"
            disabled={stat.hidden}
            className="w-full px-3 py-2 rounded-lg border border-gray-100 text-body-sm text-gray-900 placeholder:text-body-xs placeholder:text-gray-400 outline-none focus:border-highlight-500 focus:ring-2 focus:ring-highlight-500/10 transition-all disabled:cursor-not-allowed bg-white"
          />
          <input
            type="text"
            value={stat.label}
            onChange={e => update(i, 'label', e.target.value)}
            placeholder="e.g. Skilled pros in network"
            disabled={stat.hidden}
            className="w-full px-3 py-2 rounded-lg border border-gray-100 text-body-sm text-gray-900 placeholder:text-body-xs placeholder:text-gray-400 outline-none focus:border-highlight-500 focus:ring-2 focus:ring-highlight-500/10 transition-all disabled:cursor-not-allowed bg-white"
          />
          {/* Toggle: ON = show (green), OFF = hide (gray) */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => update(i, 'hidden', !stat.hidden)}
              className={`relative inline-flex items-center w-10 h-6 rounded-full transition-colors duration-200 ${!stat.hidden ? 'bg-primary-500' : 'bg-gray-200'}`}
              aria-label={stat.hidden ? 'Show metric' : 'Hide metric'}
            >
              <span
                className={`inline-block w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ml-1 ${!stat.hidden ? 'translate-x-4' : 'translate-x-0'}`}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
