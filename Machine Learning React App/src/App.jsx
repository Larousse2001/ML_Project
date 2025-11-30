import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import './index.css'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load JSON from public folder served by Vite
        const response = await fetch('/ml_project_results.json')
        if (!response.ok) {
          throw new Error('Failed to load results')
        }
        const jsonData = await response.json()
        setData(jsonData)
      } catch (err) {
        console.error('Error loading data:', err)
        // Use mock data if file not found or fetch fails
        setData(createMockData())
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p className="text-lg font-bold">Error: {error}</p>
          <p className="text-sm mt-2">Please ensure ml_project_results.json is in the correct directory</p>
        </div>
      </div>
    )
  }

  return data ? <Dashboard data={data} /> : null
}

function createMockData() {
  return {
    project: {
      title: "ML Model Comparison - Heart Disease Prediction",
      date: new Date().toISOString(),
      dataset: {
        original_samples: 294,
        features: 11,
        train_test_split: { train: 235, test: 59 },
        class_distribution: { class_0: 188, class_1: 106 }
      }
    },
    model_comparison: {
      detailed_results: [
        { model: "LogisticRegression", accuracy: 0.8983, precision: 0.8571, recall: 0.8571, f1: 0.8571, roc_auc: 0.8960 },
        { model: "RandomForest", accuracy: 0.8814, precision: 0.8500, recall: 0.8095, f1: 0.8293, roc_auc: 0.9236 },
        { model: "AdaBoost", accuracy: 0.8475, precision: 0.8000, recall: 0.7619, f1: 0.7805, roc_auc: 0.8872 },
        { model: "GradientBoosting", accuracy: 0.7966, precision: 0.7647, recall: 0.6190, f1: 0.6842, roc_auc: 0.8684 },
        { model: "ExtraTrees", accuracy: 0.7966, precision: 0.7647, recall: 0.6190, f1: 0.6842, roc_auc: 0.9424 }
      ],
      models: []
    },
    data_preparation: {
      steps: [
        { step: 1, title: "Data Loading", description: "Load heart disease dataset" },
        { step: 2, title: "Column Normalization", description: "Normalize column names" },
        { step: 3, title: "Missing Value Handling", description: "Handle missing tokens" },
        { step: 4, title: "Data Type Coercion", description: "Coerce data types" },
        { step: 5, title: "Column Dropping", description: "Drop high-missing columns" },
        { step: 6, title: "Final Validation", description: "Validate and save cleaned data" }
      ]
    },
    
    results_summary: {
      best_precision_model: 'LogisticRegression',
      best_precision_score: 0.8571,
      best_recall_score: 0.8571,
      best_f1_score: 0.8571,
      best_roc_auc_model: 'ExtraTrees',
      best_roc_auc_score: 0.9424,
      models_meeting_target: 0,
      precision_target: 0.9,
      next_steps: [
        'Apply threshold tuning to LogisticRegression',
        'Find probability threshold maximizing recall with precision ≥ 0.9',
        'Deploy best-tuned model for production'
      ]
    },
    recommendations: {
      production_model: 'LogisticRegression',
      model_files: {
        LogisticRegression: "tuned_precision_LogisticRegression.joblib",
        RandomForest: "tuned_precision_RandomForest.joblib",
        AdaBoost: "tuned_precision_AdaBoost.joblib",
        GradientBoosting: "tuned_precision_GradientBoosting.joblib",
        ExtraTrees: "tuned_precision_ExtraTrees.joblib"
      }
    }
  }
}

export default App
