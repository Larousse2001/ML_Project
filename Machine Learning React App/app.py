"""
Simple Flask server to serve the ML Dashboard
Run: python app.py
Then open http://localhost:5000 in your browser
"""

from flask import Flask, render_template, send_from_directory, jsonify
import os
import json

app = Flask(__name__)

@app.route('/')
def index():
    """Serve the standalone HTML dashboard"""
    return send_from_directory('.', 'index_standalone.html')

@app.route('/ml_project_results.json')
def get_results():
    """Serve the ML results JSON (legacy endpoint)"""
    return get_complete_results()

@app.route('/ml_project_complete_results.json')
def get_complete_results():
    """Serve the comprehensive ML results JSON"""
    try:
        with open('public/ml_project_complete_results.json', 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({'error': 'Results file not found'}), 404

@app.route('/public/<path:filename>')
def serve_public(filename):
    """Serve files from public directory"""
    return send_from_directory('public', filename)

if __name__ == '__main__':
    print("="*60)
    print("🚀 ML Dashboard Server - Comprehensive Analysis")
    print("="*60)
    print("\n📊 Server running at: http://localhost:5000")
    print("📁 Dashboard files loaded from: ./")
    print("📋 Results loaded from: ./public/ml_project_complete_results.json")
    print("\n💡 Press Ctrl+C to stop the server\n")
    print("="*60)
    app.run(debug=True, port=5000, host='0.0.0.0')
