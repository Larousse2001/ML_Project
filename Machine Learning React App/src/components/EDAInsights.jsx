import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

const EDAInsights = ({ data }) => {
  const eda = data.exploratory_data_analysis || {}
  const targetAnalysis = eda.target_analysis || {}
  const featureDistribution = eda.feature_distribution_analysis || {}
  const correlationAnalysis = eda.correlation_analysis || {}
  const outlierAnalysis = eda.outlier_analysis || {}
  const cleaningActions = eda.data_cleaning_actions || {}

  // Prepare class distribution data for chart
  const classDistData = targetAnalysis.class_distribution ? [
    { 
      name: 'No Disease (0)', 
      value: targetAnalysis.class_distribution.class_0?.count || 0, 
      percentage: targetAnalysis.class_distribution.class_0?.percentage?.toFixed(1) || 0 
    },
    { 
      name: 'Disease (1)', 
      value: targetAnalysis.class_distribution.class_1?.count || 0, 
      percentage: targetAnalysis.class_distribution.class_1?.percentage?.toFixed(1) || 0 
    }
  ] : []

  // Prepare skewness data for chart - use highly_skewed array
  const skewnessData = featureDistribution.skewness_analysis?.highly_skewed ? 
    featureDistribution.skewness_analysis.highly_skewed.map(item => ({
      feature: item.feature,
      skewness: item.skewness
    })) : []

  // Prepare correlation data
  const correlationData = correlationAnalysis.top_correlations ? 
    correlationAnalysis.top_correlations.slice(0, 10).map(item => ({
      pair: `${item.feature1} - ${item.feature2}`,
      correlation: item.correlation
    })) : []

  return (
    <div className="space-y-6">
      {/* Target Distribution Analysis */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Target Distribution Analysis
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={classDistData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {classDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">📊 Distribution Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Class 0 (No Disease)</span>
                  <span className="font-bold">
                    {targetAnalysis.class_distribution?.class_0?.count} ({targetAnalysis.class_distribution?.class_0?.percentage?.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Class 1 (Disease)</span>
                  <span className="font-bold">
                    {targetAnalysis.class_distribution?.class_1?.count} ({targetAnalysis.class_distribution?.class_1?.percentage?.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Imbalance Ratio</span>
                  <span className="font-bold">{targetAnalysis.imbalance_ratio?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Severity</span>
                  <span className={`font-bold ${targetAnalysis.interpretation?.severity === 'severe' ? 'text-red-600' : 'text-orange-600'}`}>
                    {targetAnalysis.interpretation?.severity}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2 text-blue-600" />
                Interpretation
              </h4>
              <p className="text-sm text-gray-700 mb-2">{targetAnalysis.interpretation?.issue}</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Impact:</strong> {targetAnalysis.interpretation?.impact}</p>
              <p className="text-sm text-gray-700"><strong>Solution:</strong> {targetAnalysis.interpretation?.solution}</p>
            </div>
            {targetAnalysis.recommendations && targetAnalysis.recommendations.length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  Recommendations
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {targetAnalysis.recommendations.map((rec, idx) => (
                    <li key={idx}>• {rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feature Distribution Analysis */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <BarChart className="w-5 h-5 mr-2 text-purple-600" />
          Feature Distribution Analysis
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Skewness Analysis</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skewnessData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[-2, 2]} />
                <YAxis dataKey="feature" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="skewness" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">📈 Distribution Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="text-gray-600">Total Features: <span className="font-bold">{featureDistribution.total_features}</span></div>
                {featureDistribution.skewness_analysis?.highly_skewed && (
                  <>
                    <div className="text-gray-600 font-medium mt-2">Highly Skewed Features:</div>
                    <ul className="list-disc list-inside text-gray-700">
                      {featureDistribution.skewness_analysis.highly_skewed.map((item, idx) => (
                        <li key={idx}>{item.feature} ({item.direction} skew: {item.skewness.toFixed(2)})</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2 text-purple-600" />
                Interpretation
              </h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Issue:</strong> {featureDistribution.interpretation?.issue}</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Impact:</strong> {featureDistribution.interpretation?.impact}</p>
              <p className="text-sm text-gray-700"><strong>Solution:</strong> {featureDistribution.interpretation?.solution}</p>
            </div>
            {featureDistribution.recommendations && featureDistribution.recommendations.length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  Recommendations
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {featureDistribution.recommendations.map((rec, idx) => (
                    <li key={idx}>• {rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Correlation Analysis */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
          Correlation Analysis
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Top Feature Correlations</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={correlationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="pair" angle={-45} textAnchor="end" height={120} />
                <YAxis domain={[-1, 1]} />
                <Tooltip />
                <Bar dataKey="correlation" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">🔗 Correlation Insights</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Strong Features</span>
                  <span className="font-bold">{correlationAnalysis.correlation_with_target?.strong_count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weak Features</span>
                  <span className="font-bold">{correlationAnalysis.correlation_with_target?.weak_count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Multicollinearity</span>
                  <span className="font-bold text-green-600">{correlationAnalysis.multicollinearity?.status?.split('(')[0]}</span>
                </div>
                {correlationAnalysis.very_weak_features && correlationAnalysis.very_weak_features.length > 0 && (
                  <>
                    <div className="text-gray-600 font-medium mt-2">Very Weak Features (Removed):</div>
                    <ul className="list-disc list-inside text-gray-700">
                      {correlationAnalysis.very_weak_features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2 text-green-600" />
                Interpretation
              </h4>
              <p className="text-sm text-gray-700 mb-2">{correlationAnalysis.interpretation?.strong_predictors}</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Action:</strong> {correlationAnalysis.interpretation?.action_taken}</p>
              <p className="text-sm text-gray-700"><strong>Status:</strong> {correlationAnalysis.interpretation?.multicollinearity_status}</p>
            </div>
            {correlationAnalysis.recommendations && correlationAnalysis.recommendations.length > 0 && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
                  Recommendations
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {correlationAnalysis.recommendations.map((rec, idx) => (
                    <li key={idx}>• {rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Outlier Analysis */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
          Outlier Detection Analysis
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Outliers by Feature</h4>
            <div className="space-y-2 text-sm max-h-72 overflow-y-auto">
              {outlierAnalysis.features_with_outliers && outlierAnalysis.features_with_outliers.map((item) => (
                <div key={item.feature} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-700 font-medium">{item.feature}</span>
                  <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                    item.outlier_count > 15 ? 'bg-red-100 text-red-700' : 
                    item.outlier_count > 10 ? 'bg-orange-100 text-orange-700' : 
                    'bg-green-100 text-green-700'
                  }`}>
                    {item.outlier_count} ({item.outlier_percentage.toFixed(1)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">📊 Outlier Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Features with Outliers</span>
                  <span className="font-bold text-orange-600">{outlierAnalysis.interpretation?.total_features_with_outliers || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Detection Method</span>
                  <span className="font-bold">{outlierAnalysis.method || 'IQR'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Decision</span>
                  <span className="font-bold text-green-600">{outlierAnalysis.interpretation?.decision?.split('-')[0]}</span>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2 text-orange-600" />
                Reasoning
              </h4>
              {outlierAnalysis.interpretation?.reasoning && (
                <ul className="text-sm text-gray-700 space-y-1">
                  {outlierAnalysis.interpretation.reasoning.map((reason, idx) => (
                    <li key={idx}>• {reason}</li>
                  ))}
                </ul>
              )}
            </div>
            {outlierAnalysis.recommendations && outlierAnalysis.recommendations.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                  Recommendations
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {outlierAnalysis.recommendations.map((rec, idx) => (
                    <li key={idx}>• {rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Data Cleaning Actions */}
      {cleaningActions && Object.keys(cleaningActions).length > 0 && (
        <div className="card bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
            Data Cleaning Actions Taken
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-3 text-gray-800">📋 Cleaning Summary</h4>
              <p className="text-gray-700 mb-3">{cleaningActions.summary}</p>
              {cleaningActions.features_removed && cleaningActions.features_removed.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-semibold text-sm text-gray-700">Features Removed:</h5>
                  <div className="flex flex-wrap gap-2">
                    {cleaningActions.features_removed.map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Reason:</strong> {cleaningActions.reason}
                  </p>
                </div>
              )}
            </div>
            {cleaningActions.shape_before_cleaning && cleaningActions.shape_after_cleaning && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-3 text-gray-800">📊 Shape Changes</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-2xl font-bold text-gray-700">
                      {cleaningActions.shape_before_cleaning[0]} × {cleaningActions.shape_before_cleaning[1]}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Before Cleaning</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-700">
                      {cleaningActions.shape_after_cleaning[0]} × {cleaningActions.shape_after_cleaning[1]}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">After Cleaning</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default EDAInsights
