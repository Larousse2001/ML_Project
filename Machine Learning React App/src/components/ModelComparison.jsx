import React, { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { TrendingUp, TrendingDown, Award, Target } from 'lucide-react'

const ModelComparison = ({ data }) => {
  const models = data?.model_comparison?.models || []

  if (!models || models.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500">No model comparison data available</p>
      </div>
    )
  }

  const metricsData = models.map(m => ({
    name: m.model.replace('Regression', 'Reg'),
    Precision: (m.precision * 100).toFixed(1),
    Recall: (m.recall * 100).toFixed(1),
    F1: (m.f1 * 100).toFixed(1),
    Accuracy: (m.accuracy * 100).toFixed(1)
  }))

  const radarData = models.map(m => ({
    name: m.model.replace('Regression', 'Reg'),
    Precision: m.precision * 100,
    Recall: m.recall * 100,
    F1: m.f1 * 100,
    Accuracy: m.accuracy * 100,
    'ROC-AUC': m.roc_auc * 100
  }))

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="metric-card success">
          <div className="flex items-center justify-between">
            <div>
              <div className="metric-value text-green-600">{(models[0].precision * 100).toFixed(2)}%</div>
              <div className="metric-label">Best Precision</div>
              <div className="text-sm text-gray-500 mt-1">{models[0].model}</div>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="metric-card warning">
          <div className="flex items-center justify-between">
            <div>
              <div className="metric-value text-yellow-600">{(Math.max(...models.map(m => m.roc_auc)) * 100).toFixed(2)}%</div>
              <div className="metric-label">Best ROC-AUC</div>
              <div className="text-sm text-gray-500 mt-1">{models.find(m => m.roc_auc === Math.max(...models.map(m => m.roc_auc))).model}</div>
            </div>
            <Award className="w-12 h-12 text-yellow-600 opacity-20" />
          </div>
        </div>

        <div className="metric-card danger">
          <div className="flex items-center justify-between">
            <div>
              <div className="metric-value text-red-600">{(0.9 * 100).toFixed(0)}%</div>
              <div className="metric-label">Target Precision</div>
              <div className="text-sm text-gray-500 mt-1">Not achieved on test set</div>
            </div>
            <Target className="w-12 h-12 text-red-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Model Comparison Bar Chart */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4">Precision vs Recall vs F1-Score</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={metricsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar dataKey="Precision" fill="#10b981" />
            <Bar dataKey="Recall" fill="#3b82f6" />
            <Bar dataKey="F1" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4">Multi-Metric Comparison (Radar)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Precision" dataKey="Precision" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
            <Radar name="Recall" dataKey="Recall" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
            <Radar name="F1" dataKey="F1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} />
            <Legend />
            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Model Details Table */}
      <div className="card overflow-x-auto">
        <h3 className="text-lg font-bold mb-4">Detailed Model Metrics</h3>
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">Model</th>
              <th className="px-4 py-2 text-center">Accuracy</th>
              <th className="px-4 py-2 text-center">Precision</th>
              <th className="px-4 py-2 text-center">Recall</th>
              <th className="px-4 py-2 text-center">F1-Score</th>
              <th className="px-4 py-2 text-center">ROC-AUC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {models.map((model, idx) => (
              <tr key={idx} className={idx === 0 ? 'bg-green-50' : ''}>
                <td className="px-4 py-3 font-medium">{model.model}</td>
                <td className="px-4 py-3 text-center">{(model.accuracy * 100).toFixed(2)}%</td>
                <td className="px-4 py-3 text-center font-semibold">{(model.precision * 100).toFixed(2)}%</td>
                <td className="px-4 py-3 text-center">{(model.recall * 100).toFixed(2)}%</td>
                <td className="px-4 py-3 text-center">{(model.f1 * 100).toFixed(2)}%</td>
                <td className="px-4 py-3 text-center">{(model.roc_auc * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recommendations */}
      <div className="card border-l-4 border-l-blue-600">
        <h3 className="text-lg font-bold mb-3">📊 Detailed Analysis</h3>
        <div className="space-y-2 text-sm">
          {models.map((model, idx) => (
            <div key={idx} className="flex items-start space-x-3 pb-2 border-b border-gray-100 last:border-b-0">
              <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs ${idx === 0 ? 'bg-green-500' : 'bg-gray-400'}`}>
                {idx + 1}
              </span>
              <div>
                <div className="font-semibold">{model.model}</div>
                <div className="text-gray-600">{model.model === 'LogisticRegression' ? 'Best for this dataset with highest precision and balanced metrics' : `Precision: ${(model.precision * 100).toFixed(2)}% | ROC-AUC: ${(model.roc_auc * 100).toFixed(2)}%`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ModelComparison
