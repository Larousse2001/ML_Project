# 🎯 Heart Disease Prediction - Complete ML Project

A comprehensive end-to-end machine learning project for heart disease prediction, featuring exploratory data analysis, model training with hyperparameter tuning, and an interactive React dashboard for visualization.

## 📋 Project Overview

This project demonstrates a complete ML pipeline from data exploration to model deployment, achieving **90.91% precision** in predicting heart disease. The project consists of two main components:

1. **Machine Learning Pipeline** - Data analysis, preprocessing, and model training
2. **Interactive Dashboard** - React-based visualization of results and insights

## 🎯 Project Goal

Achieve **precision ≥ 0.9** for heart disease prediction to minimize false positives in clinical applications.

**Result**: ✅ **90.91% precision** achieved with ExtraTrees Classifier

---

## 📁 Project Structure

```
ML Project/
├── README.md (this file)
├── Machine Learning Steps/          # ML Pipeline & Analysis
│   ├── complete_ml_pipeline.ipynb  # Main notebook with full pipeline
│   ├── data.ipynb                  # Initial data exploration
│   ├── data.csv                    # Original dataset (294 samples)
│   ├── cleaned_data.csv            # Cleaned dataset
│   ├── ml_project_complete_results.json  # Full results (683 lines)
│   ├── export_results_to_json.py   # Script to export results
│   ├── model_*.joblib              # Trained model files (10 models)
│   └── *.csv                       # Model comparison results
│
└── Machine Learning Dashboard/      # React Visualization App
    ├── src/
    │   ├── components/             # React components
    │   │   ├── Dashboard.jsx       # Main dashboard with tabs
    │   │   ├── ModelComparison.jsx # Model performance comparison
    │   │   ├── EDAInsights.jsx     # Exploratory data analysis
    │   │   ├── Recommendations.jsx # Key findings & recommendations
    │   │   ├── ProcessFlow.jsx     # Pipeline workflow visualization
    │   │   └── Unsupervised.jsx    # Clustering analysis
    │   ├── App.jsx                 # Root component
    │   └── main.jsx                # Entry point
    ├── public/
    │   └── ml_project_results.json # Results data for dashboard
    ├── package.json                # Dependencies
    ├── vite.config.js              # Vite configuration
    ├── tailwind.config.js          # Tailwind CSS config
    ├── run_dashboard.bat           # Quick start script (Windows)
    └── README.md                   # Dashboard-specific docs
```

---

## 🚀 Quick Start Guide

### Prerequisites

- **Python 3.8+** (for ML pipeline)
- **Node.js 16+** (for dashboard)
- **npm or yarn** (package manager)

### 1️⃣ Machine Learning Pipeline

#### Installation

```bash
cd "Machine Learning Steps"

# Install Python dependencies
pip install pandas numpy scikit-learn matplotlib seaborn joblib imbalanced-learn
```

#### Running the Pipeline

```bash
# Open Jupyter Notebook
jupyter notebook complete_ml_pipeline.ipynb

# Or run as Python script (if converted)
python complete_ml_pipeline.py
```

#### What the Pipeline Does:

1. **Data Loading & Cleaning** - Handles missing values, removes weak features
2. **Exploratory Data Analysis** - Distribution analysis, correlation, outliers
3. **Feature Engineering** - StandardScaler normalization, feature selection
4. **Class Balancing** - SMOTE to handle class imbalance (56% ratio)
5. **Model Training** - 5 models with GridSearchCV hyperparameter tuning
6. **Model Evaluation** - Precision-focused comparison
7. **Clustering Analysis** - K-means patient stratification
8. **Results Export** - JSON format for dashboard

#### Output Files:

- `cleaned_data.csv` - Preprocessed dataset
- `ml_project_complete_results.json` - Comprehensive results (683 lines)
- `model_initial_*.joblib` - Initial trained models
- `model_tuned_*.joblib` - Hyperparameter-tuned models
- `model_comparison_*.csv` - Performance comparisons

---

### 2️⃣ Interactive Dashboard

#### Installation

```bash
cd "Machine Learning Dashboard"

# Install dependencies
npm install
```

#### Running the Dashboard

**Option A: Quick Start (Windows)**
```bash
# Double-click or run:
run_dashboard.bat
```

**Option B: Manual Start**
```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build
npm run preview
```

#### Access the Dashboard

Open your browser to: **http://localhost:5173**

#### Dashboard Features:

- **📊 Overview** - Project summary, dataset stats, key metrics
- **🔍 EDA Insights** - Target distribution, feature analysis, correlations, outliers
- **📈 Model Comparison** - Performance metrics, radar charts, model rankings
- **🎨 Unsupervised Learning** - K-means clustering visualization
- **🔄 Process Flow** - Complete pipeline workflow diagram
- **💡 Recommendations** - Key findings, implemented strategies, generated files

---

## 📊 Dataset Information

- **Source**: Heart Disease Dataset
- **Samples**: 294 patients
- **Features**: 10 (after cleaning from 12 original)
- **Target**: Binary classification (0: No disease, 1: Heart disease)
- **Class Distribution**: 
  - Class 0: 188 samples (64%)
  - Class 1: 106 samples (36%)
- **Imbalance Ratio**: 0.56 (handled with SMOTE)

### Features Used:

- `age` - Patient age
- `sex` - Gender (1: male, 0: female)
- `cp` - Chest pain type (4 values)
- `trestbps` - Resting blood pressure
- `chol` - Serum cholesterol (mg/dl)
- `fbs` - Fasting blood sugar > 120 mg/dl
- `thalach` - Maximum heart rate achieved
- `exang` - Exercise induced angina
- `oldpeak` - ST depression induced by exercise
- `ca` - Number of major vessels colored by fluoroscopy

**Removed Feature**: `restecg` (very weak correlation < 0.05)

---

## 🤖 Models Trained

### All Models (with Hyperparameter Tuning):

| Model | Accuracy | Precision | Recall | F1-Score | ROC-AUC |
|-------|----------|-----------|--------|----------|---------|
| **ExtraTrees** 🏆 | **85.53%** | **90.91%** | 78.95% | 84.51% | **94.46%** |
| RandomForest | 85.53% | 88.57% | 81.58% | 84.93% | 90.79% |
| GradientBoosting | 82.89% | 85.71% | 78.95% | 82.19% | 85.60% |
| LogisticRegression | 81.58% | 85.29% | 76.32% | 80.56% | 88.02% |
| AdaBoost | 81.58% | 83.33% | 78.95% | 81.08% | 86.98% |

**Winner**: 🏆 **ExtraTrees Classifier** - Achieved 90.91% precision (exceeding 90% target)

---

## 🔍 Key Findings

### 1. Data Quality
- ✅ No missing values after cleaning
- ✅ Removed 1 weak feature (restecg)
- ✅ Shape: 294 samples × 11 features → 294 × 10 features

### 2. Class Imbalance
- ⚠️ Initial imbalance: 64% vs 36%
- ✅ Applied SMOTE: Balanced to 300 training samples per class
- ✅ Used stratified train-test split (80/20)

### 3. Feature Quality
- 📊 4 highly skewed features detected
- ✅ StandardScaler applied to handle skewness
- ✅ 5 strong correlations with target identified

### 4. Patterns Discovered
- 🎯 K-means clustering: 3 natural patient groups
- 📈 Silhouette score: 0.239 (moderate separation)
- 🔬 Clinical significance retained (kept outliers)

---

## 🎨 Technologies Used

### Machine Learning Pipeline
- **Python 3.x**
- **pandas** - Data manipulation
- **NumPy** - Numerical computing
- **scikit-learn** - ML algorithms, preprocessing
- **imbalanced-learn** - SMOTE for class balancing
- **matplotlib/seaborn** - Visualization
- **joblib** - Model serialization

### Dashboard
- **React 18.2** - UI framework
- **Vite 5.0** - Build tool & dev server
- **Recharts 2.12** - Data visualization charts
- **Tailwind CSS 3.4** - Styling framework
- **Lucide React** - Icon library

---

## 📈 Results & Achievements

✅ **Target Achievement**: Precision ≥ 0.9 (achieved 90.91%)  
✅ **Best Model**: ExtraTrees Classifier  
✅ **ROC-AUC**: 94.46% (excellent discrimination)  
✅ **Comprehensive EDA**: 5 analysis sections with interpretations  
✅ **Production-Ready**: Models saved, results documented  
✅ **Interactive Dashboard**: 6 visualization tabs  

---

## 🛠️ Development Workflow

### Phase 1: Data Exploration
1. Load dataset & inspect structure
2. Handle missing values
3. Analyze distributions & correlations
4. Detect outliers

### Phase 2: Data Preprocessing
1. Remove weak features
2. Apply StandardScaler
3. Balance classes with SMOTE
4. Stratified train-test split (80/20)

### Phase 3: Model Training
1. Train 5 different algorithms
2. Hyperparameter tuning with GridSearchCV
3. 5-fold cross-validation
4. Precision-focused evaluation

### Phase 4: Analysis & Insights
1. Model comparison
2. K-means clustering analysis
3. Generate comprehensive results
4. Export to JSON format

### Phase 5: Visualization
1. Build React dashboard
2. Create 6 interactive tabs
3. Integrate charts & metrics
4. Deploy locally

---

## 📝 Files Generated

### Data Files
- `cleaned_data.csv` - Preprocessed dataset

### Model Files (10 total)
- `model_initial_*.joblib` - Initial models (5 algorithms)
- `model_tuned_*.joblib` - Tuned models (5 algorithms)

### Results Files
- `ml_project_complete_results.json` - Full pipeline results (683 lines)
- `model_comparison_initial.csv` - Initial model comparison
- `all_models_precision_comparison.csv` - Precision comparison

### Plots
- `model_comparison_final.png` - Performance visualization
- Various EDA plots in notebook

---

## 🔄 Updating the Dashboard with New Results

If you retrain models and want to update the dashboard:

```bash
# 1. Export new results from notebook
cd "Machine Learning Steps"
python export_results_to_json.py

# 2. Copy results to dashboard
copy ml_project_complete_results.json "../Machine Learning Dashboard/public/"

# 3. Restart dashboard
cd "../Machine Learning Dashboard"
npm run dev
```

---

## 🎯 Recommendations Implemented

1. ✅ **Applied SMOTE** to balance classes (56% → 50%)
2. ✅ **Removed weak features** to reduce noise (restecg)
3. ✅ **Kept outliers** due to clinical significance
4. ✅ **Used StandardScaler** to handle skewness
5. ✅ **Applied correlation-based** feature selection
6. ✅ **Used stratified split** to maintain class proportions

---

## 🚧 Troubleshooting

### Dashboard Issues

**Problem**: White screen or console errors  
**Solution**: Check browser console (F12) and verify `ml_project_results.json` exists in `public/` folder

**Problem**: Models Trained shows 0  
**Solution**: Ensure JSON file is copied to `public/` and matches expected structure

**Problem**: Charts not rendering  
**Solution**: Clear browser cache and restart dev server

### Pipeline Issues

**Problem**: ModuleNotFoundError  
**Solution**: Install missing packages: `pip install [package-name]`

**Problem**: Memory errors  
**Solution**: Close other applications or use smaller dataset samples

---

## 📖 Additional Documentation

- **Dashboard README**: `Machine Learning Dashboard/README.md`
- **Update Summary**: `Machine Learning Dashboard/UPDATE_SUMMARY.md`
- **Quick Start**: `Machine Learning Dashboard/QUICK_START.md`

---

## 👨‍💻 Author

Created as a comprehensive machine learning project demonstrating end-to-end pipeline development and interactive visualization.

**Date**: December 7, 2025  
**Version**: 2.0  
**Domain**: Healthcare - Heart Disease Prediction

---

## 📄 License

This project is for educational and research purposes.

---

## 🙏 Acknowledgments

- Heart Disease Dataset contributors
- scikit-learn community
- React & Vite communities
- Healthcare ML research community

---

## 📞 Support

For questions or issues:
1. Check the documentation in each folder
2. Review the Jupyter notebook for detailed explanations
3. Inspect browser console for dashboard errors
4. Verify all dependencies are installed

---

**🎉 Enjoy exploring the complete ML pipeline and interactive dashboard!**
