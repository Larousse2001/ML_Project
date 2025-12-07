import React from 'react'
import { CheckCircle, ArrowRight, Layers } from 'lucide-react'

const ProcessFlow = ({ data }) => {
  const pipelineFlow = data.pipeline_flow || {}
  const stages = pipelineFlow.stages || []
  
  return (
    <div className="space-y-8">
      {/* Pipeline Description */}
      {pipelineFlow.description && (
        <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-600">
          <h2 className="text-2xl font-bold mb-2 text-blue-600">🔄 Pipeline Overview</h2>
          <p className="text-gray-700">{pipelineFlow.description}</p>
        </div>
      )}

      {/* Pipeline Stages */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-purple-600">
          <Layers className="inline w-8 h-8 mr-2" />
          Pipeline Stages
        </h2>
        <div className="space-y-4">
          {stages.map((stage, idx) => (
            <div key={idx} className="relative">
              <div className="card hover:shadow-lg transition">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`flex items-center justify-center h-12 w-12 rounded-full font-bold text-white ${
                      idx === 0 ? 'bg-blue-500' :
                      idx === 1 ? 'bg-green-500' :
                      idx === 2 ? 'bg-yellow-500' :
                      idx === 3 ? 'bg-orange-500' :
                      idx === 4 ? 'bg-red-500' :
                      idx === 5 ? 'bg-purple-500' :
                      idx === 6 ? 'bg-pink-500' : 'bg-gray-500'
                    }`}>
                      {stage.stage}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg mb-2">{stage.name}</h3>
                    {stage.steps && stage.steps.length > 0 && (
                      <div className="space-y-1">
                        {stage.steps.map((step, stepIdx) => (
                          <div key={stepIdx} className="flex items-start space-x-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {idx < stages.length - 1 && (
                <div className="flex justify-center my-2">
                  <ArrowRight className="w-6 h-6 text-gray-400 transform rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Data Preparation Details */}
      {data.data_preparation && (
        <div className="card bg-yellow-50 border-l-4 border-l-yellow-500">
          <h3 className="text-xl font-bold mb-4">📋 Data Preparation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-semibold text-gray-700 mb-1">Original Shape</div>
              <div className="text-gray-600">{data.data_preparation.original_shape?.join(' × ')}</div>
            </div>
            <div>
              <div className="font-semibold text-gray-700 mb-1">Cleaned Shape</div>
              <div className="text-gray-600">{data.data_preparation.cleaned_shape?.join(' × ')}</div>
            </div>
            {data.data_preparation.dropped_columns && data.data_preparation.dropped_columns.length > 0 && (
              <div className="col-span-2">
                <div className="font-semibold text-gray-700 mb-1">Dropped Columns</div>
                <div className="text-gray-600">{data.data_preparation.dropped_columns.join(', ')}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feature Engineering Details */}
      {data.feature_engineering && (
        <div className="card bg-purple-50 border-l-4 border-l-purple-600">
          <h3 className="text-xl font-bold mb-4">⚙️ Feature Engineering</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.feature_engineering.scaling && (
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Scaling</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✓ Method: {data.feature_engineering.scaling.method}</li>
                  <li>✓ Applied to: {data.feature_engineering.scaling.applied_to}</li>
                </ul>
              </div>
            )}
            {data.feature_engineering.encoding && (
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Encoding</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✓ Method: {data.feature_engineering.encoding.method}</li>
                  <li>✓ Applied to: {data.feature_engineering.encoding.applied_to}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Class Balancing */}
      {data.class_balancing && (
        <div className="card bg-green-50 border-l-4 border-l-green-600">
          <h3 className="text-xl font-bold mb-4">⚖️ Class Balancing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-900 mb-2">Before SMOTE</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                {data.class_balancing.before_smote && Object.entries(data.class_balancing.before_smote).map(([key, value]) => (
                  <li key={key}>• Class {key}: {value}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900 mb-2">After SMOTE</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                {data.class_balancing.after_smote && Object.entries(data.class_balancing.after_smote).map(([key, value]) => (
                  <li key={key}>• Class {key}: {value}</li>
                ))}
              </ul>
            </div>
          </div>
          {data.class_balancing.technique && (
            <div className="mt-4 p-3 bg-white rounded border border-green-200">
              <span className="font-semibold">Technique: </span>
              <span className="text-gray-700">{data.class_balancing.technique}</span>
            </div>
          )}
        </div>
      )}

      {/* Cross-Validation Strategy */}
      {data.model_training && (
        <div className="card bg-blue-50 border-l-4 border-l-blue-600">
          <h3 className="text-xl font-bold mb-4">🎯 Model Training Strategy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Data Split</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>📊 Train: {data.model_training.train_samples} samples</li>
                <li>📊 Test: {data.model_training.test_samples} samples</li>
                <li>🔄 Stratified: {data.model_training.stratified ? 'Yes' : 'No'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Models Trained</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                {data.model_training.models_trained?.map((model, idx) => (
                  <li key={idx}>• {model}</li>
                ))}
              </ul>
            </div>
          </div>
          {data.model_training.hyperparameter_tuning && (
            <div className="mt-4 p-3 bg-white rounded border border-blue-200">
              <div className="font-semibold mb-2">Hyperparameter Tuning</div>
              <div className="text-sm text-gray-700 space-y-1">
                <div><span className="font-medium">Method:</span> {data.model_training.hyperparameter_tuning.method}</div>
                <div><span className="font-medium">CV Folds:</span> {data.model_training.hyperparameter_tuning.cv_folds}</div>
                <div><span className="font-medium">Scoring:</span> {data.model_training.hyperparameter_tuning.scoring}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProcessFlow
