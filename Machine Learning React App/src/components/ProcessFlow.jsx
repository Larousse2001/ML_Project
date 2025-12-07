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
      {data.data_preparation && data.data_preparation.steps && (
        <div className="card bg-yellow-50 border-l-4 border-l-yellow-500">
          <h3 className="text-xl font-bold mb-4">📋 Data Preparation Details</h3>
          <div className="space-y-3">
            {data.data_preparation.steps.map((step, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                    {step.output && (
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Output:</span> {step.output}
                      </div>
                    )}
                    {step.dropped_columns && step.dropped_columns.length > 0 && step.dropped_columns[0] !== "None" && (
                      <div className="text-xs text-red-600 mt-1">
                        <span className="font-medium">Dropped:</span> {step.dropped_columns.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {data.data_preparation.features_after_cleaning && (
            <div className="mt-4 p-3 bg-white rounded border border-yellow-200">
              <div className="font-semibold mb-2">Features After Cleaning ({data.data_preparation.features_after_cleaning.length})</div>
              <div className="flex flex-wrap gap-2">
                {data.data_preparation.features_after_cleaning.map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Feature Engineering Details */}
      {data.feature_engineering && data.feature_engineering.steps && (
        <div className="card bg-purple-50 border-l-4 border-l-purple-600">
          <h3 className="text-xl font-bold mb-4">⚙️ Feature Engineering</h3>
          <div className="space-y-3">
            {data.feature_engineering.steps.map((step, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-purple-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-700 mb-2">{step.description}</p>
                {step.method && (
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Method:</span> {step.method}
                  </div>
                )}
                {step.removed_features && step.removed_features.length > 0 && step.removed_features[0] !== "None" && (
                  <div className="text-xs text-red-600 mt-1">
                    <span className="font-medium">Removed:</span> {step.removed_features.join(', ')}
                  </div>
                )}
                {step.features_remaining && (
                  <div className="text-xs text-green-600 mt-1">
                    <span className="font-medium">Remaining:</span> {step.features_remaining} features
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Class Balancing */}
      {data.class_balancing && (
        <div className="card bg-green-50 border-l-4 border-l-green-600">
          <h3 className="text-xl font-bold mb-4">⚖️ Class Balancing</h3>
          <div className="mb-4 p-3 bg-white rounded border border-green-200">
            <div className="font-semibold text-green-900 mb-1">Method: {data.class_balancing.method || 'SMOTE'}</div>
            <p className="text-sm text-gray-600">{data.class_balancing.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-900 mb-2">Before SMOTE</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                {data.class_balancing.before && Object.entries(data.class_balancing.before).map(([key, value]) => (
                  <li key={key}>• Class {key.replace('class_', '')}: <span className="font-bold">{value}</span> samples</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900 mb-2">After SMOTE</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                {data.class_balancing.after && Object.entries(data.class_balancing.after).map(([key, value]) => (
                  <li key={key}>• Class {key.replace('class_', '')}: <span className="font-bold">{value}</span> samples</li>
                ))}
              </ul>
            </div>
          </div>
          {data.class_balancing.samples_added && (
            <div className="mt-4 p-3 bg-white rounded border border-green-200">
              <span className="font-semibold text-green-700">Samples Added: </span>
              <span className="text-gray-700 font-bold">{data.class_balancing.samples_added}</span>
            </div>
          )}
        </div>
      )}

      {/* Model Training Strategy */}
      {data.model_training && (
        <div className="card bg-blue-50 border-l-4 border-l-blue-600">
          <h3 className="text-xl font-bold mb-4">🎯 Model Training Strategy</h3>
          
          {/* Initial Models */}
          {data.model_training.initial_models && (
            <div className="mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">{data.model_training.initial_models.description}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {data.model_training.initial_models.models_trained?.map((model, idx) => (
                  <div key={idx} className="bg-white p-2 rounded text-sm text-center font-medium text-blue-700">
                    {model}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Tuned Models */}
          {data.model_training.tuned_models && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-blue-900 mb-2">{data.model_training.tuned_models.description}</h4>
              <div className="text-sm text-gray-700 space-y-2">
                {data.model_training.tuned_models.method && (
                  <div>
                    <span className="font-medium">Method:</span> {data.model_training.tuned_models.method}
                  </div>
                )}
                {data.model_training.tuned_models.cv_folds && (
                  <div>
                    <span className="font-medium">CV Folds:</span> {data.model_training.tuned_models.cv_folds}
                  </div>
                )}
                {data.model_training.tuned_models.scoring && (
                  <div>
                    <span className="font-medium">Scoring Metric:</span> {data.model_training.tuned_models.scoring}
                  </div>
                )}
                {data.model_training.tuned_models.results_file && (
                  <div className="mt-2 text-xs text-gray-600">
                    <span className="font-medium">Results:</span> {data.model_training.tuned_models.results_file}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProcessFlow
