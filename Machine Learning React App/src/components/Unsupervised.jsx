import React from 'react'

const Unsupervised = ({ data }) => {
  const unsup = data.unsupervised_analysis || {}
  const methods = unsup.methods || []

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-blue-700">🔬 Unsupervised Analysis</h2>
        <p className="text-sm text-gray-600 mt-2">{unsup.description || 'Exploratory unsupervised methods applied to the cleaned dataset to reveal structure and clusters.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {methods.map((m, idx) => (
          <div key={idx} className="card">
            <div className="flex items-start space-x-4">
              <div className="flex-grow">
                <div className="font-bold text-lg">{m.method}</div>
                <div className="text-sm text-gray-600 mt-1">{m.purpose}</div>
                {m.k_range && <div className="text-xs text-gray-500 mt-2">K range: {m.k_range}</div>}
                {m.scoring && <div className="text-xs text-gray-500 mt-1">Scoring: {m.scoring}</div>}
                {m.plot && (
                  <div className="mt-3">
                    <img src={`/${m.plot}`} alt={m.method + ' plot'} className="w-full h-auto rounded border" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-amber-50 border-l-4 border-l-amber-600">
        <h3 className="text-lg font-bold mb-2">What we did</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>Applied PCA (2 components) to produce a 2D projection and visually inspect separability.</li>
          <li>Ran KMeans over k=2..6 and evaluated silhouette scores to find natural cluster counts.</li>
        </ul>
      </div>
    </div>
  )
}

export default Unsupervised
