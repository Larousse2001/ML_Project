import React from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'

const ProcessFlow = ({ data }) => {
  const dataPrep = data.data_preparation.steps
  const modeling = [
    { title: 'Data Loading', description: 'Load heart disease dataset from CSV' },
    { title: 'Multi-Model Training', description: 'Train 5 different models (LogReg, RF, GB, ET, Ada)' },
    { title: 'Aggressive Search', description: 'RandomizedSearchCV with precision focus (50-80 iterations)' },
    { title: 'Model Evaluation', description: 'Compare metrics across all models' }
  ]

  
  return (
    <div className="space-y-8">
      {/* Data Preparation */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-blue-600">📋 Data Preparation</h2>
        <div className="space-y-3">
          {dataPrep.map((step, idx) => (
            <div key={idx} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                  {step.step}
                </div>
              </div>
              <div className="flex-grow card hover:shadow-lg transition">
                <div className="font-bold text-lg">{step.title}</div>
                <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                {step.dropped_columns && (
                  <div className="mt-2 text-xs text-red-600">
                    ❌ Dropped: {step.dropped_columns.join(', ')} ({step.reason})
                  </div>
                )}
              </div>
              {idx < dataPrep.length - 1 && (
                <div className="flex items-center">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Missing Data Stats */}
        <div className="mt-6 card bg-yellow-50 border-l-4 border-l-yellow-500">
          <h3 className="font-bold mb-3">⚠️ Missing Data Handling</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="font-semibold text-gray-700">Normalized Tokens</div>
              <div className="text-gray-600">?, -, NA, N/A, none, null, nan</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700">High Missing Columns</div>
              <div className="text-gray-600">ca (dropped), thal (dropped)</div>
            </div>
            <div className="col-span-2">
              <div className="font-semibold text-gray-700">Final Dataset</div>
              <div className="text-gray-600">294 samples × 12 features (cleaned from 294 × 13)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Development */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-purple-600">🤖 Model Development Pipeline</h2>
        <div className="space-y-4">
          {modeling.map((step, idx) => (
            <div key={idx} className="card flex items-start space-x-4 hover:shadow-lg transition">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex-grow">
                <div className="font-bold text-lg">{step.title}</div>
                <p className="text-gray-600 text-sm mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preprocessing Pipeline */}
      <div className="card bg-blue-50 border-l-4 border-l-blue-600">
        <h3 className="text-lg font-bold mb-4">⚙️ Preprocessing Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Numeric Features</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✓ Median imputation for missing values</li>
              <li>✓ StandardScaler normalization</li>
              <li>✓ Applied to 11 numeric columns</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Categorical Features</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✓ Most frequent imputation</li>
              <li>✓ OneHotEncoder transformation</li>
              <li>✓ Applied to remaining features</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cross-Validation Strategy */}
      <div className="card bg-green-50 border-l-4 border-l-green-600">
        <h3 className="text-lg font-bold mb-4">🎯 Evaluation Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-900 mb-2">Data Split</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>📊 Train: 235 samples (80%)</li>
              <li>📊 Test: 59 samples (20%)</li>
              <li>🔄 Stratified split by target</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-900 mb-2">Cross-Validation</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>📋 StratifiedKFold (5 folds)</li>
              <li>🎯 Scoring: Precision (focus)</li>
              <li>🔍 RandomizedSearchCV tuning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessFlow
