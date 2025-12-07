import React, { useState, useEffect } from 'react'
import ModelComparison from './ModelComparison'
import ProcessFlow from './ProcessFlow'
import Recommendations from './Recommendations'
import Unsupervised from './Unsupervised'
import EDAInsights from './EDAInsights'
import { BarChart3, GitBranch, Lightbulb, Home, Layers, TrendingUp } from 'lucide-react'

const Dashboard = ({ data }) => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'eda', label: 'EDA Insights', icon: TrendingUp },
    { id: 'comparison', label: 'Model Comparison', icon: BarChart3 },
    { id: 'unsupervised', label: 'Unsupervised', icon: Layers },
    { id: 'process', label: 'Process Flow', icon: GitBranch },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold">🎯 {data.project?.title || 'ML Model Dashboard'}</h1>
          <p className="text-blue-100 mt-2">{data.project?.description || 'Heart Disease Prediction - Comprehensive Analysis'}</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-blue-100">Dataset Size</div>
              <div className="text-2xl font-bold">{data.project?.dataset?.original_samples || 0} samples</div>
            </div>
            <div>
              <div className="text-blue-100">Features</div>
              <div className="text-2xl font-bold">{data.project?.dataset?.features || 0}</div>
            </div>
            <div>
              <div className="text-blue-100">Models Trained</div>
              <div className="text-2xl font-bold">{data.model_comparison?.models?.length || 0}</div>
            </div>
            <div>
              <div className="text-blue-100">Best Model</div>
              <div className="text-lg font-bold">{data.analysis_insights_summary?.model_performance?.best_model || 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 font-medium flex items-center space-x-2 border-b-2 transition ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card">
                <div className="text-gray-600 text-sm">Training Samples</div>
                <div className="text-3xl font-bold text-blue-600">{data.project?.dataset?.train_test_split?.train || 0}</div>
                <div className="text-xs text-gray-500 mt-2">After SMOTE balancing</div>
              </div>
              <div className="card">
                <div className="text-gray-600 text-sm">Test Samples</div>
                <div className="text-3xl font-bold text-green-600">{data.project?.dataset?.train_test_split?.test || 0}</div>
                <div className="text-xs text-gray-500 mt-2">{data.project?.dataset?.train_test_split?.ratio || '80/20 split'}</div>
              </div>
              <div className="card">
                <div className="text-gray-600 text-sm">Features</div>
                <div className="text-3xl font-bold text-purple-600">{data.project?.dataset?.features || 0}</div>
                <div className="text-xs text-gray-500 mt-2">After cleaning</div>
              </div>
              <div className="card">
                <div className="text-gray-600 text-sm">Best Precision</div>
                <div className="text-3xl font-bold text-orange-600">{data.analysis_insights_summary?.model_performance?.precision_achieved ? (data.analysis_insights_summary.model_performance.precision_achieved * 100).toFixed(2) + '%' : 'N/A'}</div>
                <div className="text-xs text-gray-500 mt-2">{data.analysis_insights_summary?.model_performance?.best_model || ''}</div>
              </div>
            </div>

            {/* Pipeline Flow Summary */}
            {data.pipeline_flow && (
              <div className="card bg-gradient-to-r from-blue-50 to-purple-50">
                <h3 className="font-bold text-lg mb-4">🔄 Pipeline Overview</h3>
                <p className="text-gray-700 mb-4">{data.pipeline_flow.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {data.pipeline_flow.stages?.slice(0, 8).map((stage, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Stage {stage.stage}</div>
                      <div className="font-semibold text-sm">{stage.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-bold text-lg mb-4">📊 Class Distribution (Original)</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Class 0 (No Disease)</span>
                      <span className="font-bold">{data.project?.dataset?.class_distribution?.class_0 || 0}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ 
                        width: data.project?.dataset?.class_distribution ? 
                          `${(data.project.dataset.class_distribution.class_0 / (data.project.dataset.class_distribution.class_0 + data.project.dataset.class_distribution.class_1) * 100).toFixed(1)}%` 
                          : '0%' 
                      }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Class 1 (Disease)</span>
                      <span className="font-bold">{data.project?.dataset?.class_distribution?.class_1 || 0}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ 
                        width: data.project?.dataset?.class_distribution ? 
                          `${(data.project.dataset.class_distribution.class_1 / (data.project.dataset.class_distribution.class_0 + data.project.dataset.class_distribution.class_1) * 100).toFixed(1)}%` 
                          : '0%' 
                      }}></div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Imbalance Ratio</span>
                      <span className="font-bold text-orange-600">{data.project?.dataset?.imbalance_ratio?.toFixed(2) || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-bold text-lg mb-4">🎯 Project Goals</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Primary Goal</div>
                    <div className="font-semibold text-blue-700">{data.project?.goal || 'Achieve high precision for heart disease prediction'}</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pipeline Type</span>
                      <span className="font-bold">{data.metadata?.pipeline_type?.split('-')[0] || 'End-to-End'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Domain</span>
                      <span className="font-bold">{data.metadata?.domain || 'Healthcare'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Version</span>
                      <span className="font-bold">{data.metadata?.version || '1.0'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Model Rankings */}
            {data.model_comparison?.detailed_results && data.model_comparison.detailed_results.length > 0 && (
              <div className="card">
                <h3 className="font-bold text-lg mb-4">🏅 Top Model Rankings</h3>
                <div className="space-y-3">
                  {data.model_comparison.detailed_results.slice(0, 5).map((model, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-3 rounded ${idx === 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                      <div className="flex items-center space-x-4 flex-grow">
                        <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${
                          idx === 0 ? 'bg-green-500' :
                          idx === 1 ? 'bg-blue-500' :
                          idx === 2 ? 'bg-purple-500' : 'bg-gray-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-bold">{model.model}</div>
                          <div className="text-xs text-gray-500">
                            Precision: {(model.precision * 100).toFixed(2)}% | 
                            Recall: {(model.recall * 100).toFixed(2)}% | 
                            F1: {(model.f1 * 100).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{(model.accuracy * 100).toFixed(1)}%</div>
                        <div className="text-xs text-gray-500">Accuracy</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analysis Insights Summary */}
            {data.analysis_insights_summary && (
              <div className="card bg-gradient-to-r from-purple-50 to-pink-50">
                <h3 className="font-bold text-lg mb-4">💡 Key Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.analysis_insights_summary.recommendations_implemented && (
                    <div>
                      <h4 className="font-semibold mb-2 text-purple-700">Recommendations Implemented</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        {data.analysis_insights_summary.recommendations_implemented.map((rec, idx) => (
                          <li key={idx}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {data.analysis_insights_summary.model_performance && (
                    <div>
                      <h4 className="font-semibold mb-2 text-pink-700">Model Performance</h4>
                      <div className="text-sm space-y-2 text-gray-700">
                        <div className="flex justify-between">
                          <span>Best Model:</span>
                          <span className="font-bold">{data.analysis_insights_summary.model_performance.best_model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Precision:</span>
                          <span className="font-bold text-green-600">
                            {(data.analysis_insights_summary.model_performance.precision_achieved * 100).toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Target Met:</span>
                          <span className={`font-bold ${data.analysis_insights_summary.model_performance.target_met ? 'text-green-600' : 'text-red-600'}`}>
                            {data.analysis_insights_summary.model_performance.target_met ? '✓ Yes' : '✗ No'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'eda' && <EDAInsights data={data} />}
        {activeTab === 'comparison' && <ModelComparison data={data} />}
        {activeTab === 'process' && <ProcessFlow data={data} />}
        {activeTab === 'unsupervised' && <Unsupervised data={data} />}
        {activeTab === 'recommendations' && <Recommendations data={data} />}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-12">
        <p>ML Model Dashboard | {data.project?.title || 'Heart Disease Prediction'} | {data.metadata?.created ? new Date(data.metadata.created).toLocaleDateString() : new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  )
}

export default Dashboard
