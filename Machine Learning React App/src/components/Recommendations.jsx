import React from 'react'
import { ThumbsUp, AlertCircle, Lightbulb, Zap } from 'lucide-react'

const Recommendations = ({ data }) => {
  const best = data.model_comparison.detailed_results[0]
  const allModels = data.model_comparison.detailed_results

  return (
    <div className="space-y-6">
      {/* Main Recommendation */}
      <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500">
        <div className="flex items-start space-x-4">
          <ThumbsUp className="w-12 h-12 text-green-600 flex-shrink-0" />
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-green-900 mb-2">🏆 Production Model</h2>
            <div className="text-3xl font-bold text-green-700 mb-2">{best.model}</div>
            <p className="text-gray-700 mb-4">
              Best performer with the highest precision ({(best.precision * 100).toFixed(2)}%) and balanced metrics. 
              Delivers best accuracy while maintaining strong recall.
            </p>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-white rounded p-2">
                <div className="text-lg font-bold text-green-600">{(best.precision * 100).toFixed(1)}%</div>
                <div className="text-xs text-gray-600">Precision</div>
              </div>
              <div className="bg-white rounded p-2">
                <div className="text-lg font-bold text-blue-600">{(best.recall * 100).toFixed(1)}%</div>
                <div className="text-xs text-gray-600">Recall</div>
              </div>
              <div className="bg-white rounded p-2">
                <div className="text-lg font-bold text-purple-600">{(best.accuracy * 100).toFixed(1)}%</div>
                <div className="text-xs text-gray-600">Accuracy</div>
              </div>
              <div className="bg-white rounded p-2">
                <div className="text-lg font-bold text-orange-600">{(best.roc_auc * 100).toFixed(1)}%</div>
                <div className="text-xs text-gray-600">ROC-AUC</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="card bg-blue-50 border-l-4 border-l-blue-600">
        <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
          <Zap className="w-5 h-5 text-blue-600" />
          <span>Next Steps to Achieve Precision ≥ 0.9</span>
        </h3>
        <ol className="space-y-3">
          <li className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">1</span>
            <div>
              <div className="font-semibold">Apply Probability Threshold Tuning</div>
              <div className="text-sm text-gray-600">Sweep probability thresholds 0.0-1.0 to find the point where precision ≥ 0.9</div>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">2</span>
            <div>
              <div className="font-semibold">Evaluate Recall Trade-off</div>
              <div className="text-sm text-gray-600">Check if recall remains acceptable at the precision ≥ 0.9 threshold</div>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">3</span>
            <div>
              <div className="font-semibold">Deploy and Monitor</div>
              <div className="text-sm text-gray-600">Use LogisticRegression joblib file in production with tuned threshold</div>
            </div>
          </li>
        </ol>
      </div>

      {/* Alternative Models */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4">🔄 Alternative Models</h3>
        <div className="space-y-4">
          {allModels.slice(1).map((model, idx) => (
            <div key={idx} className="border-l-4 border-gray-300 pl-4 py-2">
              <div className="font-semibold text-gray-900">{model.model}</div>
              <div className="text-sm text-gray-600 mt-1">
                Precision: {(model.precision * 100).toFixed(2)}% | 
                Recall: {(model.recall * 100).toFixed(2)}% | 
                ROC-AUC: {(model.roc_auc * 100).toFixed(2)}%
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {model.model === 'RandomForest' ? 'Good balance with strong ROC-AUC' :
                 model.model === 'ExtraTrees' ? 'Highest ROC-AUC (0.9424) - best for discrimination' :
                 model.model === 'AdaBoost' ? 'Moderate performance, acceptable third choice' :
                 'Lowest performance, not recommended'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="card bg-amber-50 border-l-4 border-l-amber-600">
        <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <span>Key Insights</span>
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold mt-0.5">✓</span>
            <span><strong>Class Imbalance:</strong> Dataset has 36% positive class, handled through stratified CV</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold mt-0.5">✓</span>
            <span><strong>Precision Focus:</strong> All models tuned with precision scoring, not accuracy</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold mt-0.5">✓</span>
            <span><strong>LogisticRegression Advantage:</strong> Linear model is interpretable and generalizes well</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold mt-0.5">✓</span>
            <span><strong>Threshold Tuning Available:</strong> Can reach 0.9 precision with appropriate threshold adjustment</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-amber-600 font-bold mt-0.5">✓</span>
            <span><strong>ExtraTrees Fallback:</strong> Best ROC-AUC (0.9424) if discrimination is priority</span>
          </li>
        </ul>
      </div>

      {/* Model Files */}
      <div className="card bg-purple-50 border-l-4 border-l-purple-600">
        <h3 className="text-lg font-bold mb-4">📦 Model Artifacts</h3>
        <div className="space-y-2 text-sm font-mono bg-white p-3 rounded text-gray-800">
          {Object.entries(data.recommendations.model_files).map(([name, file], idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="text-purple-600">→</span>
              <span>{file}</span>
              {name === 'LogisticRegression' && <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Recommended</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Recommendations
