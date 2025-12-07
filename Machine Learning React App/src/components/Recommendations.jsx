import React from 'react'
import { ThumbsUp, AlertCircle, Lightbulb, Zap, CheckCircle, FileCode } from 'lucide-react'

const Recommendations = ({ data }) => {
  const recommendations = data.recommendations || {}
  const analysisInsights = data.analysis_insights_summary || {}
  const modelPerformance = analysisInsights.model_performance || {}
  const bestModel = data.model_comparison?.best_model || {}
  const allModels = data.model_comparison?.models || []

  return (
    <div className="space-y-6">
      {/* Main Recommendation */}
      <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500">
        <div className="flex items-start space-x-4">
          <ThumbsUp className="w-12 h-12 text-green-600 flex-shrink-0" />
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-green-900 mb-2">🏆 Recommended Production Model</h2>
            <div className="text-3xl font-bold text-green-700 mb-2">
              {recommendations.production_model || bestModel.name || 'N/A'}
            </div>
            <p className="text-gray-700 mb-4">
              {recommendations.reason || `Best performing model with highest precision (${((bestModel.precision || 0) * 100).toFixed(2)}%). Delivers optimal balance of accuracy, recall, and interpretability for heart disease prediction.`}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white rounded p-3 shadow-sm">
                <div className="text-2xl font-bold text-green-600">
                  {((bestModel.precision || 0) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600">Precision</div>
              </div>
              <div className="bg-white rounded p-3 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">
                  {((bestModel.recall || 0) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600">Recall</div>
              </div>
              <div className="bg-white rounded p-3 shadow-sm">
                <div className="text-2xl font-bold text-purple-600">
                  {((bestModel.f1 || 0) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600">F1 Score</div>
              </div>
              <div className="bg-white rounded p-3 shadow-sm">
                <div className="text-2xl font-bold text-orange-600">
                  {((bestModel.roc_auc || 0) * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-600">ROC-AUC</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Achievement Status */}
      {data.model_comparison?.precision_target && (
        <div className={`card ${
          data.model_comparison.target_met
            ? 'bg-green-50 border-l-4 border-l-green-600' 
            : 'bg-yellow-50 border-l-4 border-l-yellow-600'
        }`}>
          <h3 className="text-lg font-bold mb-3 flex items-center space-x-2">
            {data.model_comparison.target_met ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            )}
            <span>Precision Target Achievement</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Target Precision</div>
              <div className="text-2xl font-bold text-blue-600">
                {(data.model_comparison.precision_target * 100).toFixed(0)}%
              </div>
            </div>
            <div>
              <div className="text-gray-600">Best Achieved</div>
              <div className="text-2xl font-bold text-green-600">
                {((bestModel.precision || 0) * 100).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-gray-600">Target Met</div>
              <div className={`text-2xl font-bold ${
                data.model_comparison.target_met ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {data.model_comparison.target_met ? '✓ Yes' : '✗ No'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next Steps */}
      {recommendations.next_steps && recommendations.next_steps.length > 0 && (
        <div className="card bg-blue-50 border-l-4 border-l-blue-600">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <span>Recommended Next Steps</span>
          </h3>
          <ol className="space-y-3">
            {recommendations.next_steps.map((step, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <div className="text-sm text-gray-700 pt-0.5">{step}</div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Analysis Insights Summary */}
      {analysisInsights && Object.keys(analysisInsights).length > 0 && (
        <div className="card bg-gradient-to-r from-purple-50 to-pink-50">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            <span>Analysis Insights Summary</span>
          </h3>
          
          {/* Key Findings - Object Structure */}
          {analysisInsights.key_findings && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-purple-700">Key Findings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisInsights.key_findings.data_quality && (
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <h5 className="font-semibold text-sm mb-2">Data Quality</h5>
                    <div className="text-xs space-y-1 text-gray-700">
                      <div>Status: <span className="font-medium">{analysisInsights.key_findings.data_quality.status}</span></div>
                      <div>Features Removed: <span className="font-medium">{analysisInsights.key_findings.data_quality.features_removed}</span></div>
                    </div>
                  </div>
                )}
                {analysisInsights.key_findings.class_imbalance && (
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <h5 className="font-semibold text-sm mb-2">Class Imbalance</h5>
                    <div className="text-xs space-y-1 text-gray-700">
                      <div>Severity: <span className="font-medium">{analysisInsights.key_findings.class_imbalance.severity}</span></div>
                      <div>Solution: <span className="font-medium">{analysisInsights.key_findings.class_imbalance.solution}</span></div>
                    </div>
                  </div>
                )}
                {analysisInsights.key_findings.feature_quality && (
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <h5 className="font-semibold text-sm mb-2">Feature Quality</h5>
                    <div className="text-xs space-y-1 text-gray-700">
                      <div>Strong Predictors: <span className="font-medium">{analysisInsights.key_findings.feature_quality.strong_predictors}</span></div>
                      <div>Skewed Features: <span className="font-medium">{analysisInsights.key_findings.feature_quality.highly_skewed_features}</span></div>
                    </div>
                  </div>
                )}
                {analysisInsights.key_findings.patterns_discovered && (
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <h5 className="font-semibold text-sm mb-2">Patterns Discovered</h5>
                    <div className="text-xs space-y-1 text-gray-700">
                      <div>Patient Groups: <span className="font-medium">{analysisInsights.key_findings.patterns_discovered.patient_groups}</span></div>
                      <div>Quality: <span className="font-medium">{analysisInsights.key_findings.patterns_discovered.cluster_quality}</span></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recommendations Implemented */}
          {analysisInsights.recommendations_implemented && analysisInsights.recommendations_implemented.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-pink-700">Recommendations Implemented</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                {analysisInsights.recommendations_implemented.map((rec, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-pink-600 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Model Performance */}
          {analysisInsights.model_performance && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2 text-purple-700">Model Performance Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Best Model</div>
                  <div className="font-bold text-purple-600">{analysisInsights.model_performance.best_model}</div>
                </div>
                <div>
                  <div className="text-gray-600">Precision</div>
                  <div className="font-bold text-green-600">
                    {(analysisInsights.model_performance.precision_achieved * 100).toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Target</div>
                  <div className="font-bold text-blue-600">
                    {(analysisInsights.model_performance.precision_target * 100).toFixed(0)}%
                  </div>
                </div>
                <div>
                  <div className="text-gray-600">Target Met</div>
                  <div className={`font-bold ${analysisInsights.model_performance.target_met ? 'text-green-600' : 'text-red-600'}`}>
                    {analysisInsights.model_performance.target_met ? '✓ Yes' : '✗ No'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Alternative Models */}
      {allModels.length > 1 && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4">🔄 Alternative Models</h3>
          <div className="space-y-3">
            {allModels.filter(m => m.model !== bestModel.name).slice(0, 4).map((model, idx) => (
              <div key={idx} className="border-l-4 border-gray-300 pl-4 py-3 bg-gray-50 rounded-r">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-900">{model.model}</div>
                  <div className="text-xs text-gray-500">Rank #{idx + 2}</div>
                </div>
                <div className="text-sm text-gray-600 mt-1 grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div>
                    <span className="text-gray-500">Precision:</span>{' '}
                    <span className="font-medium">{(model.precision * 100).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Recall:</span>{' '}
                    <span className="font-medium">{(model.recall * 100).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">F1:</span>{' '}
                    <span className="font-medium">{(model.f1 * 100).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">ROC-AUC:</span>{' '}
                    <span className="font-medium">{(model.roc_auc * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Model Files */}
      {recommendations.model_files && Object.keys(recommendations.model_files).length > 0 && (
        <div className="card bg-indigo-50 border-l-4 border-l-indigo-600">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <FileCode className="w-5 h-5 text-indigo-600" />
            <span>Saved Model Files</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(recommendations.model_files).map(([modelName, fileName]) => (
              <div key={modelName} className="bg-white p-3 rounded-lg shadow-sm">
                <div className="font-semibold text-sm text-indigo-700 mb-1">{modelName}</div>
                <div className="text-xs font-mono text-gray-600 truncate">{fileName}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generated Files */}
      {data.files_generated && (
        <div className="card bg-purple-50 border-l-4 border-l-purple-600">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <FileCode className="w-5 h-5 text-purple-600" />
            <span>Generated Files & Artifacts</span>
          </h3>
          <div className="space-y-4">
            {/* Cleaned Data */}
            {data.files_generated.cleaned_data && (
              <div>
                <h4 className="font-semibold text-sm text-purple-700 mb-2">Cleaned Data</h4>
                <div className="bg-white p-2 rounded text-sm font-mono text-gray-700">
                  <span className="text-purple-600">→</span> {data.files_generated.cleaned_data}
                </div>
              </div>
            )}
            
            {/* Model Comparisons */}
            {data.files_generated.model_comparisons && data.files_generated.model_comparisons.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-purple-700 mb-2">Model Comparisons</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {data.files_generated.model_comparisons.map((file, idx) => (
                    <div key={idx} className="bg-white p-2 rounded text-sm font-mono text-gray-700">
                      <span className="text-purple-600">→</span> {file}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Model Artifacts */}
            {data.files_generated.model_artifacts && data.files_generated.model_artifacts.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-purple-700 mb-2">Model Artifacts (.joblib)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {data.files_generated.model_artifacts.map((file, idx) => (
                    <div key={idx} className="bg-white p-2 rounded text-xs font-mono text-gray-700 truncate">
                      <span className="text-purple-600">→</span> {file}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Plots */}
            {data.files_generated.plots && data.files_generated.plots.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-purple-700 mb-2">Plots & Visualizations ({data.files_generated.plots.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {data.files_generated.plots.map((file, idx) => (
                    <div key={idx} className="bg-white p-2 rounded text-xs font-mono text-gray-700 truncate">
                      <span className="text-purple-600">→</span> {file}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Recommendations
