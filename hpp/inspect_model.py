"""
House Price Prediction Model Inspector
This script provides comprehensive insights into your trained model
"""

import pandas as pd
import numpy as np
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
import warnings
warnings.filterwarnings('ignore')

print("="*80)
print("HOUSE PRICE PREDICTION MODEL INSPECTION REPORT")
print("="*80)

# ============================================================================
# 1. LOAD MODEL AND DATA
# ============================================================================
print("\n[1] LOADING MODEL AND DATA...")
print("-"*80)

try:
    model = joblib.load("house_price_model.joblib")
    print("✓ Model loaded successfully: house_price_model.joblib")
except Exception as e:
    print(f"✗ Error loading model: {e}")
    exit(1)

try:
    df = pd.read_csv("hhhhhh.csv")
    print(f"✓ Dataset loaded successfully: {len(df)} records")
except Exception as e:
    print(f"✗ Error loading dataset: {e}")
    exit(1)

# ============================================================================
# 2. MODEL ARCHITECTURE
# ============================================================================
print("\n[2] MODEL ARCHITECTURE")
print("-"*80)
print(f"Model Type: {type(model).__name__}")
print(f"\nPipeline Steps:")
for i, (name, step) in enumerate(model.named_steps.items(), 1):
    print(f"  {i}. {name}: {type(step).__name__}")

# Get the regressor
regressor = model.named_steps['regressor']
print(f"\nRegressor Details:")
print(f"  Algorithm: Random Forest Regressor")
print(f"  Number of Trees: {regressor.n_estimators}")
print(f"  Random State: {regressor.random_state}")
print(f"  Max Features: {regressor.max_features}")
print(f"  Max Depth: {regressor.max_depth if regressor.max_depth else 'Unlimited'}")

# ============================================================================
# 3. DATA PREPROCESSING
# ============================================================================
print("\n[3] DATA PREPROCESSING DETAILS")
print("-"*80)

# Clean data (same as training)
df[' Price (NPR) '] = df[' Price (NPR) '].astype(str).str.replace(',', '', regex=False).str.strip().astype(float)
df['Road Access'] = df['Road Access'].astype(str).str.extract(r'(\d+\.?\d*)', expand=False).astype(float)
df['Road Access'] = df['Road Access'].fillna(0)
df['Parking'] = df['Parking'].map({'Available': 1, 'Not Available': 0})
df['Parking'] = df['Parking'].fillna(0)
df = df.dropna(subset=['Bedrooms', 'Bathrooms', 'Floors', 'Area (sq.ft)', ' Price (NPR) ', 'Location'])

print(f"Dataset Shape: {df.shape[0]} rows × {df.shape[1]} columns")
print(f"\nFeatures Used:")
features = ['Bedrooms', 'Bathrooms', 'Parking', 'Floors', 'Road Access', 'Area (sq.ft)', 'Location']
for i, feat in enumerate(features, 1):
    print(f"  {i}. {feat}")

print(f"\nTarget Variable: Price (NPR)")

# ============================================================================
# 4. DATASET STATISTICS
# ============================================================================
print("\n[4] DATASET STATISTICS")
print("-"*80)

X = df[['Bedrooms', 'Bathrooms', 'Parking', 'Floors', 'Road Access', 'Area (sq.ft)', 'Location']]
y = df[' Price (NPR) ']

print(f"\nPrice Statistics (NPR):")
print(f"  Mean Price:     {y.mean():>15,.2f}")
print(f"  Median Price:   {y.median():>15,.2f}")
print(f"  Min Price:      {y.min():>15,.2f}")
print(f"  Max Price:      {y.max():>15,.2f}")
print(f"  Std Deviation:  {y.std():>15,.2f}")

print(f"\nNumerical Features Statistics:")
numeric_cols = ['Bedrooms', 'Bathrooms', 'Parking', 'Floors', 'Road Access', 'Area (sq.ft)']
print(df[numeric_cols].describe().round(2))

print(f"\nCategorical Features:")
print(f"  Unique Locations: {df['Location'].nunique()}")
print(f"  Top 5 Locations:")
for loc, count in df['Location'].value_counts().head(5).items():
    print(f"    - {loc}: {count} properties")

# ============================================================================
# 5. MODEL PERFORMANCE
# ============================================================================
print("\n[5] MODEL PERFORMANCE METRICS")
print("-"*80)

# Split data (same as training)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Predictions
y_train_pred = model.predict(X_train)
y_test_pred = model.predict(X_test)

# Training Metrics
train_mae = mean_absolute_error(y_train, y_train_pred)
train_rmse = np.sqrt(mean_squared_error(y_train, y_train_pred))
train_r2 = r2_score(y_train, y_train_pred)

# Testing Metrics
test_mae = mean_absolute_error(y_test, y_test_pred)
test_rmse = np.sqrt(mean_squared_error(y_test, y_test_pred))
test_r2 = r2_score(y_test, y_test_pred)

print(f"\nTraining Set Performance:")
print(f"  Samples:              {len(X_train)}")
print(f"  Mean Absolute Error:  {train_mae:>15,.2f} NPR")
print(f"  Root Mean Sq Error:   {train_rmse:>15,.2f} NPR")
print(f"  R² Score:             {train_r2:>15.4f}")
print(f"  Accuracy:             {train_r2*100:>15.2f}%")

print(f"\nTesting Set Performance:")
print(f"  Samples:              {len(X_test)}")
print(f"  Mean Absolute Error:  {test_mae:>15,.2f} NPR")
print(f"  Root Mean Sq Error:   {test_rmse:>15,.2f} NPR")
print(f"  R² Score:             {test_r2:>15.4f}")
print(f"  Accuracy:             {test_r2*100:>15.2f}%")

# Error percentage
mean_price = y_test.mean()
error_percentage = (test_mae / mean_price) * 100
print(f"\nAverage Error Percentage: {error_percentage:.2f}%")

# ============================================================================
# 6. FEATURE IMPORTANCE
# ============================================================================
print("\n[6] FEATURE IMPORTANCE")
print("-"*80)

# Get feature names after preprocessing
preprocessor = model.named_steps['preprocessor']
numeric_features = ['Bedrooms', 'Bathrooms', 'Parking', 'Floors', 'Road Access', 'Area (sq.ft)']

# Get categorical feature names
cat_transformer = preprocessor.named_transformers_['cat']
categorical_features = cat_transformer.get_feature_names_out(['Location']).tolist()

all_feature_names = numeric_features + categorical_features

# Get feature importances
feature_importances = regressor.feature_importances_

# Create dataframe
importance_df = pd.DataFrame({
    'Feature': all_feature_names,
    'Importance': feature_importances
}).sort_values('Importance', ascending=False)

print("\nTop 10 Most Important Features:")
for i, row in importance_df.head(10).iterrows():
    print(f"  {row['Feature']:<30} {row['Importance']:.4f} {'█' * int(row['Importance'] * 100)}")

# ============================================================================
# 7. PREDICTION EXAMPLES
# ============================================================================
print("\n[7] SAMPLE PREDICTIONS")
print("-"*80)

# Get 5 random samples from test set
sample_indices = np.random.choice(X_test.index, 5, replace=False)
samples = X_test.loc[sample_indices]
actual_prices = y_test.loc[sample_indices]
predicted_prices = model.predict(samples)

print("\nRandom Test Samples:")
for i, idx in enumerate(sample_indices, 1):
    actual = actual_prices.iloc[i-1]
    predicted = predicted_prices[i-1]
    error = abs(actual - predicted)
    error_pct = (error / actual) * 100
    
    print(f"\n  Sample {i}:")
    print(f"    Bedrooms: {samples.loc[idx, 'Bedrooms']}, "
          f"Bathrooms: {samples.loc[idx, 'Bathrooms']}, "
          f"Area: {samples.loc[idx, 'Area (sq.ft)']} sq.ft")
    print(f"    Location: {samples.loc[idx, 'Location']}")
    print(f"    Actual Price:    {actual:>12,.2f} NPR")
    print(f"    Predicted Price: {predicted:>12,.2f} NPR")
    print(f"    Error:           {error:>12,.2f} NPR ({error_pct:.2f}%)")

# ============================================================================
# 8. MODEL INSIGHTS
# ============================================================================
print("\n[8] MODEL INSIGHTS & RECOMMENDATIONS")
print("-"*80)

print("\n✓ Model Strengths:")
if test_r2 > 0.8:
    print("  • Excellent R² score - model explains variance well")
elif test_r2 > 0.6:
    print("  • Good R² score - model has decent predictive power")
else:
    print("  • Moderate R² score - room for improvement")

if error_percentage < 10:
    print("  • Low error percentage - predictions are quite accurate")
elif error_percentage < 20:
    print("  • Moderate error percentage - acceptable accuracy")
else:
    print("  • High error percentage - consider model improvements")

print("\n⚠ Potential Improvements:")
print("  • Try hyperparameter tuning (GridSearchCV)")
print("  • Add more features (property age, amenities, etc.)")
print("  • Try other algorithms (XGBoost, LightGBM)")
print("  • Collect more training data")
print("  • Feature engineering (price per sq.ft, location clusters)")

# ============================================================================
# 9. USAGE EXAMPLE
# ============================================================================
print("\n[9] HOW TO USE THIS MODEL")
print("-"*80)

print("""
Example Code:
-------------
import joblib
import pandas as pd

# Load model
model = joblib.load('house_price_model.joblib')

# Prepare input data
property_data = pd.DataFrame({
    'Bedrooms': [3],
    'Bathrooms': [2],
    'Parking': [1],  # 1 = Available, 0 = Not Available
    'Floors': [2],
    'Road Access': [14.0],  # in feet
    'Area (sq.ft)': [1500],
    'Location': ['Kathmandu']
})

# Make prediction
predicted_price = model.predict(property_data)[0]
print(f"Predicted Price: {predicted_price:,.2f} NPR")
""")

# ============================================================================
# 10. SAVE DETAILED REPORT
# ============================================================================
print("\n[10] SAVING DETAILED REPORT")
print("-"*80)

# Save feature importance to CSV
importance_df.to_csv('feature_importance.csv', index=False)
print("✓ Feature importance saved to: feature_importance.csv")

# Save model summary
with open('model_summary.txt', 'w') as f:
    f.write("HOUSE PRICE PREDICTION MODEL SUMMARY\n")
    f.write("="*80 + "\n\n")
    f.write(f"Model Type: Random Forest Regressor\n")
    f.write(f"Number of Trees: {regressor.n_estimators}\n")
    f.write(f"Training Samples: {len(X_train)}\n")
    f.write(f"Testing Samples: {len(X_test)}\n\n")
    f.write(f"Performance Metrics:\n")
    f.write(f"  Test R² Score: {test_r2:.4f}\n")
    f.write(f"  Test MAE: {test_mae:,.2f} NPR\n")
    f.write(f"  Test RMSE: {test_rmse:,.2f} NPR\n")
    f.write(f"  Error Percentage: {error_percentage:.2f}%\n\n")
    f.write(f"Top 5 Important Features:\n")
    for i, row in importance_df.head(5).iterrows():
        f.write(f"  {i+1}. {row['Feature']}: {row['Importance']:.4f}\n")

print("✓ Model summary saved to: model_summary.txt")

print("\n" + "="*80)
print("INSPECTION COMPLETE!")
print("="*80)
print("\nGenerated Files:")
print("  1. feature_importance.csv - Feature importance rankings")
print("  2. model_summary.txt - Quick reference summary")
print("\nNext Steps:")
print("  • Review the metrics and feature importance")
print("  • Test predictions with new data")
print("  • Consider integrating into your web application")
print("  • Deploy as an API endpoint")
print("="*80)
