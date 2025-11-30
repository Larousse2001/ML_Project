import React, { useState, useEffect } from 'react'
import ModelComparison from './ModelComparison'
import ProcessFlow from './ProcessFlow'
import Recommendations from './Recommendations'
import Unsupervised from './Unsupervised'
import { BarChart3, GitBranch, Lightbulb, Home, Layers } from 'lucide-react'

const Dashboard = ({ data }) => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'comparison', label: 'Model Comparison', icon: BarChart3 },
    { id: 'process', label: 'Process Flow', icon: GitBranch },
    { id: 'unsupervised', label: 'Unsupervised', icon: Layers },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold">🎯 ML Model Dashboard</h1>
          <p className="text-blue-100 mt-2">Heart Disease Prediction - Aggressive Precision-Focused Search</p>
          <div className="mt-4 grid grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-blue-100">Dataset Size</div>
              <div className="text-2xl font-bold">{data.project.dataset.original_samples} samples</div>
            </div>
            <div>
              <div className="text-blue-100">Models Compared</div>
              <div className="text-2xl font-bold">{data.model_comparison.models.length}</div>
            </div>
            <div>
              <div className="text-blue-100">Best Precision</div>
              <div className="text-2xl font-bold">{(data.model_comparison.detailed_results[0].precision * 100).toFixed(2)}%</div>
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
                <div className="text-3xl font-bold text-blue-600">{data.project.dataset.train_test_split.train}</div>
                <div className="text-xs text-gray-500 mt-2">80% of dataset</div>
              </div>
              <div className="card">
                <div className="text-gray-600 text-sm">Test Samples</div>
                <div className="text-3xl font-bold text-green-600">{data.project.dataset.train_test_split.test}</div>
                <div className="text-xs text-gray-500 mt-2">20% of dataset</div>
              </div>
              <div className="card">
                <div className="text-gray-600 text-sm">Features</div>
                <div className="text-3xl font-bold text-purple-600">{data.project.dataset.features}</div>
                <div className="text-xs text-gray-500 mt-2">After cleaning</div>
              </div>
              <div className="card">
                <div className="text-gray-600 text-sm">Best Model</div>
                <div className="text-xl font-bold text-orange-600">{data.recommendations.production_model}</div>
                <div className="text-xs text-gray-500 mt-2">{(data.results_summary.best_precision_score * 100).toFixed(2)}% precision</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-bold text-lg mb-4">📊 Class Distribution</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Class 0 (Negative)</span>
                      <span className="font-bold">188 (63.9%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '63.9%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Class 1 (Positive)</span>
                      <span className="font-bold">106 (36.1%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '36.1%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-bold text-lg mb-4">🔍 Search Configuration</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Search Strategy</span>
                    <span className="font-bold">RandomizedSearchCV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Scoring Metric</span>
                    <span className="font-bold">Precision</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cross-Validation</span>
                    <span className="font-bold">StratifiedKFold (5)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Iterations</span>
                    <span className="font-bold">360+ parameter combinations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Model Rankings */}
            <div className="card">
              <h3 className="font-bold text-lg mb-4">🏅 Model Rankings (by Precision)</h3>
              <div className="space-y-3">
                {data.model_comparison.detailed_results.map((model, idx) => (
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
                        <div className="text-xs text-gray-500">Precision: {(model.precision * 100).toFixed(2)}% | Recall: {(model.recall * 100).toFixed(2)}%</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{(model.roc_auc * 100).toFixed(1)}%</div>
                        <div className="text-xs text-gray-500">ROC-AUC</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && <ModelComparison data={data} />}
        {activeTab === 'process' && <ProcessFlow data={data} />}
        {activeTab === 'unsupervised' && <Unsupervised data={data} />}
        {activeTab === 'recommendations' && <Recommendations data={data} />}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-12">
        <p>ML Model Dashboard | Heart Disease Prediction Project | {new Date(data.project.date).toLocaleDateString()}</p>
      </footer>
    </div>
  )
}

export default Dashboard
