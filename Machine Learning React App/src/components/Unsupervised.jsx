import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Target, TrendingUp, Lightbulb, Layers } from 'lucide-react'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

const Unsupervised = ({ data }) => {
  const unsup = data.unsupervised_learning || {}
  const clustering = unsup.clustering || {}
  const pca = unsup.dimensionality_reduction || {}
  const insights = unsup.insights || {}

  // Prepare silhouette score data for chart
  const silhouetteData = clustering.optimization?.k_range_tested?.map((k, idx) => ({
    k: k,
    score: clustering.optimization.silhouette_scores[idx]
  })) || []

  // Prepare cluster distribution data for chart
  const clusterDistData = clustering.cluster_distribution ? 
    Object.entries(clustering.cluster_distribution).map(([cluster, data]) => ({
      name: `Cluster ${cluster.split('_')[1]}`,
      count: data.count,
      percentage: data.percentage
    })) : []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="text-2xl font-bold text-blue-700 flex items-center">
          <Layers className="w-7 h-7 mr-2" />
          {unsup.title || 'Unsupervised Learning Analysis'}
        </h2>
        <p className="text-gray-700 mt-2">{unsup.description || 'Discover natural patterns and groupings in patient data'}</p>
      </div>

      {/* Clustering Analysis */}
      {clustering.method && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              K-Means Clustering Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-purple-700">Clustering Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method</span>
                    <span className="font-bold">{clustering.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Samples Clustered</span>
                    <span className="font-bold">{clustering.samples_clustered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Features Used</span>
                    <span className="font-bold">{clustering.features_used}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Optimal K</span>
                    <span className="font-bold text-blue-600">{clustering.optimal_k}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Silhouette Score</span>
                    <span className="font-bold text-green-600">{clustering.final_silhouette_score?.toFixed(3)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-purple-700">Cluster Distribution</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={clusterDistData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {clusterDistData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Optimization Process */}
          {clustering.optimization && (
            <div className="card">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                Cluster Optimization
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-orange-700">Silhouette Score by K</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={silhouetteData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="k" label={{ value: 'Number of Clusters (k)', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Silhouette Score', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2} dot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-orange-700">Optimization Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method</span>
                      <span className="font-bold">{clustering.optimization.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">K Range Tested</span>
                      <span className="font-bold">
                        {clustering.optimization.k_range_tested?.[0]} - {clustering.optimization.k_range_tested?.[clustering.optimization.k_range_tested.length - 1]}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best K</span>
                      <span className="font-bold text-blue-600">{clustering.optimal_k}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best Score</span>
                      <span className="font-bold text-green-600">{clustering.final_silhouette_score?.toFixed(3)}</span>
                    </div>
                  </div>
                  {clustering.interpretation && (
                    <div className="mt-4 p-3 bg-orange-50 rounded border border-orange-200">
                      <h5 className="font-semibold text-orange-900 mb-1">Interpretation</h5>
                      <p className="text-sm text-gray-700 mb-2"><strong>Quality:</strong> {clustering.interpretation.quality}</p>
                      <p className="text-sm text-gray-700 mb-2"><strong>Meaning:</strong> {clustering.interpretation.meaning}</p>
                      <p className="text-sm text-gray-700"><strong>Clinical Relevance:</strong> {clustering.interpretation.clinical_relevance}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PCA Analysis */}
      {pca.method && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Dimensionality Reduction (PCA)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-700">PCA Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method</span>
                  <span className="font-bold">{pca.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Components</span>
                  <span className="font-bold">{pca.components}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PC1 Variance</span>
                  <span className="font-bold">{(pca.explained_variance_pc1 * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PC2 Variance</span>
                  <span className="font-bold">{(pca.explained_variance_pc2 * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Variance</span>
                  <span className="font-bold text-green-600">{(pca.total_explained_variance * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-700">Purpose</h4>
              <p className="text-sm text-gray-700 mb-4">{pca.purpose}</p>
              {pca.interpretation && (
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <h5 className="font-semibold text-green-900 mb-2">Interpretation</h5>
                  <p className="text-sm text-gray-700 mb-1"><strong>Variance:</strong> {pca.interpretation.variance_captured}</p>
                  <p className="text-sm text-gray-700 mb-1"><strong>Meaning:</strong> {pca.interpretation.meaning}</p>
                  <p className="text-sm text-gray-700"><strong>Visualization:</strong> {pca.interpretation.visualization}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Key Insights */}
      {insights.key_findings && insights.key_findings.length > 0 && (
        <div className="card bg-gradient-to-r from-purple-50 to-pink-50">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-purple-600" />
            Key Insights & Applications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-purple-700">Key Findings</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {insights.key_findings.map((finding, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
            {insights.applications && insights.applications.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 text-pink-700">Applications</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {insights.applications.map((app, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-pink-600 mr-2">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cluster Details */}
      {clustering.cluster_distribution && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">📊 Cluster Distribution Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(clustering.cluster_distribution).map(([cluster, data]) => (
              <div key={cluster} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-lg mb-2">Cluster {cluster.split('_')[1]}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Patient Count</span>
                    <span className="font-bold">{data.count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Percentage</span>
                    <span className="font-bold text-blue-600">{data.percentage.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Unsupervised
