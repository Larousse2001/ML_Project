# ML Dashboard Application

A React-based interactive dashboard for visualizing ML model comparison results and the complete machine learning pipeline.

## Project Structure

```
ml-dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx        # Main dashboard layout and navigation
│   │   ├── ModelComparison.jsx  # Model metrics and visualizations
│   │   ├── ProcessFlow.jsx      # Data preparation pipeline
│   │   └── Recommendations.jsx  # Final recommendations
│   ├── App.jsx                  # Root component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind styles
├── index.html                   # HTML template
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS config
├── postcss.config.js            # PostCSS config
└── package.json                 # Dependencies
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd ml-dashboard
npm install
```

### 2. Copy Results File

Copy the `ml_project_results.json` from the ML project directory to this folder:

```bash
cp ../Projet\ Machine\ Learning/ml_project_results.json ./public/
```

### 3. Run Development Server

```bash
npm run dev
```

The dashboard will open automatically at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Features

### 📊 Overview Tab
- Key statistics (training samples, test samples, features)
- Class distribution visualization
- Search configuration details
- Model rankings by precision

### 📈 Model Comparison Tab
- Precision vs Recall vs F1-Score bar charts
- Multi-metric radar comparison
- Detailed metrics table
- Model performance analysis

### 🔄 Process Flow Tab
- Complete data preparation pipeline (6 steps)
- Missing data handling strategies
- Model development workflow
- Preprocessing pipeline details
- Cross-validation strategy

### 💡 Recommendations Tab
- Primary production model recommendation
- Next steps to achieve precision ≥ 0.9
- Alternative models with use cases
- Key insights and considerations
- Model artifacts location
- Important warnings and notes

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Recharts** - Interactive charts and visualizations
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library

## Data Integration

The dashboard loads results from `ml_project_results.json` which contains:

- Project metadata
- Dataset information
- Data preparation steps
- Model comparison results
- Preprocessing pipeline details
- Final recommendations
- Generated file artifacts

## Customization

### Adding New Charts

Edit `src/components/ModelComparison.jsx` to add new Recharts components.

### Styling

Modify colors in `tailwind.config.js` or add custom styles in `src/index.css`.

### Adding New Tabs

Create new component files and add to the tabs array in `src/components/Dashboard.jsx`.

## Deployment

### GitHub Pages

```bash
npm run build
# Upload dist/ folder to GitHub Pages
```

### Vercel

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker build -t ml-dashboard .
docker run -p 3000:3000 ml-dashboard
```

## Troubleshooting

**Dashboard not loading data:**
- Ensure `ml_project_results.json` is in the public folder
- Check browser console for errors
- Verify file paths in `src/App.jsx`

**Styles not working:**
- Run `npm install` again
- Clear node_modules and reinstall

**Port already in use:**
- Change port in `vite.config.js`
- Or use: `npm run dev -- --port 3000`

## License

Project-specific. Part of ML Model Comparison Initiative.
