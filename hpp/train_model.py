import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib
import os

print("Loading data...")
df = pd.read_csv("hhhhhh.csv")

print("Cleaning data...")
# Clean price column -> remove spaces, commas, quotes and convert to float
df[' Price (NPR) '] = df[' Price (NPR) '].astype(str).str.replace(',', '', regex=False).str.strip().astype(float)

# Clean Road Access -> Extract numeric value, e.g., "14 ft" -> 14.0
df['Road Access'] = df['Road Access'].astype(str).str.extract(r'(\d+\.?\d*)', expand=False).astype(float)
df['Road Access'] = df['Road Access'].fillna(0) # Handle parsing errors

# Map Parking
df['Parking'] = df['Parking'].map({'Available': 1, 'Not Available': 0})
df['Parking'] = df['Parking'].fillna(0) # In case missing

# Drop missing values in crucial columns
df = df.dropna(subset=['Bedrooms', 'Bathrooms', 'Floors', 'Area (sq.ft)', ' Price (NPR) ', 'Location'])

# Define Features and Target
X = df[['Bedrooms', 'Bathrooms', 'Parking', 'Floors', 'Road Access', 'Area (sq.ft)', 'Location']]
y = df[' Price (NPR) ']

print("Building pipeline...")
# Categorical vs Numerical logic
numeric_features = ['Bedrooms', 'Bathrooms', 'Parking', 'Floors', 'Road Access', 'Area (sq.ft)']
categorical_features = ['Location']

numeric_transformer = StandardScaler()
# Setting handle_unknown='ignore' strictly for predictions on unseen locations later
categorical_transformer = OneHotEncoder(handle_unknown='ignore')

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])

# Pipeline with Random Forest
model = Pipeline(steps=[('preprocessor', preprocessor),
                        ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))])

print("Splitting data...")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Training model...")
model.fit(X_train, y_train)

# Evaluation
print("Evaluating model...")
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Model Evaluation Metrics:")
print(f"  Mean Absolute Error: {mae:,.2f} NPR")
print(f"  R-squared (R2) Score: {r2:.4f}")

# Export
model_file = "house_price_model.joblib"
print(f"Saving model pipeline to {model_file}...")
joblib.dump(model, model_file)
print("Process Complete. Model saved successfully!")
