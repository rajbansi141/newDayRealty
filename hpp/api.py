"""
Flask API for House Price Prediction
Provides REST endpoint for the ML model
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model at startup
MODEL_PATH = 'house_price_model.joblib'
try:
    model = joblib.load(MODEL_PATH)
    print(f"✓ Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"✗ Error loading model: {e}")
    model = None

@app.route('/', methods=['GET'])
def home():
    """Health check endpoint"""
    return jsonify({
        'status': 'running',
        'message': 'House Price Prediction API',
        'version': '1.0.0',
        'model_loaded': model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict house price based on property features
    
    Expected JSON input:
    {
        "Bedrooms": 3,
        "Bathrooms": 2,
        "Parking": 1,
        "Floors": 2,
        "Road Access": 14.0,
        "Area (sq.ft)": 1500,
        "Location": "Kathmandu"
    }
    """
    try:
        # Check if model is loaded
        if model is None:
            return jsonify({
                'success': False,
                'error': 'Model not loaded'
            }), 500
        
        # Get JSON data
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400
        
        # Validate required fields
        required_fields = ['Bedrooms', 'Bathrooms', 'Parking', 'Floors', 
                          'Road Access', 'Area (sq.ft)', 'Location']
        
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({
                'success': False,
                'error': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400
        
        # Create DataFrame with exact column order
        input_data = pd.DataFrame([{
            'Bedrooms': data['Bedrooms'],
            'Bathrooms': data['Bathrooms'],
            'Parking': data['Parking'],
            'Floors': data['Floors'],
            'Road Access': data['Road Access'],
            'Area (sq.ft)': data['Area (sq.ft)'],
            'Location': data['Location']
        }])
        
        # Make prediction
        predicted_price = model.predict(input_data)[0]
        
        # Calculate price per sq.ft
        price_per_sqft = predicted_price / data['Area (sq.ft)']
        
        # Return result
        return jsonify({
            'success': True,
            'predicted_price': float(predicted_price),
            'price_per_sqft': float(price_per_sqft),
            'currency': 'NPR',
            'input_data': data
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/predict/batch', methods=['POST'])
def predict_batch():
    """
    Predict prices for multiple properties
    
    Expected JSON input:
    {
        "properties": [
            { property_1_data },
            { property_2_data },
            ...
        ]
    }
    """
    try:
        if model is None:
            return jsonify({
                'success': False,
                'error': 'Model not loaded'
            }), 500
        
        data = request.get_json()
        
        if not data or 'properties' not in data:
            return jsonify({
                'success': False,
                'error': 'No properties data provided'
            }), 400
        
        properties = data['properties']
        
        if not isinstance(properties, list) or len(properties) == 0:
            return jsonify({
                'success': False,
                'error': 'Properties must be a non-empty array'
            }), 400
        
        # Create DataFrame
        input_data = pd.DataFrame(properties)
        
        # Make predictions
        predictions = model.predict(input_data)
        
        # Prepare results
        results = []
        for i, (prop, pred) in enumerate(zip(properties, predictions)):
            results.append({
                'index': i,
                'predicted_price': float(pred),
                'price_per_sqft': float(pred / prop['Area (sq.ft)']),
                'input_data': prop
            })
        
        return jsonify({
            'success': True,
            'count': len(results),
            'predictions': results,
            'currency': 'NPR'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/model/info', methods=['GET'])
def model_info():
    """Get model information"""
    try:
        if model is None:
            return jsonify({
                'success': False,
                'error': 'Model not loaded'
            }), 500
        
        # Get model details
        regressor = model.named_steps['regressor']
        
        return jsonify({
            'success': True,
            'model_type': 'Random Forest Regressor',
            'n_estimators': regressor.n_estimators,
            'features': [
                'Bedrooms', 'Bathrooms', 'Parking', 'Floors',
                'Road Access', 'Area (sq.ft)', 'Location'
            ],
            'target': 'Price (NPR)',
            'version': '1.0.0'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    print("="*60)
    print("HOUSE PRICE PREDICTION API")
    print("="*60)
    print(f"Model Status: {'Loaded ✓' if model else 'Not Loaded ✗'}")
    print("\nAvailable Endpoints:")
    print("  GET  /           - Health check")
    print("  POST /predict    - Single prediction")
    print("  POST /predict/batch - Batch predictions")
    print("  GET  /model/info - Model information")
    print(f"\nStarting server on port {port}")
    print("="*60)
    
    app.run(host='0.0.0.0', port=port, debug=False)
