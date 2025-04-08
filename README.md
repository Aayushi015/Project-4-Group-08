#Capstone Project: Predicting Legal vs. Illegal Transactions

##Project Overview
This project focuses on building a machine learning model to classify global financial transactions as legal or illegal black money. By leveraging data-driven methods and a robust modeling pipeline, we aim to develop a fraud detection system that can help identify and prevent illicit financial activity such as money laundering and black-market operations.

## Dataset
Name: Global Black Money Transactions Dataset

Source: Kaggle

Description: The dataset contains anonymized financial transaction records, some of which are labeled as fraudulent or illegal. It includes features such as transaction method, transaction amount, geographic location, and more.

## Problem Statement
The objective is to create a supervised learning model that classifies each transaction as either legal or illegal based on transaction-level features. This classification can assist financial institutions and regulators in automating fraud detection systems.

## Research Questions
Can machine learning algorithms accurately predict whether a transaction is legal or illegal?

Which classification model performs best on this dataset based on accuracy and generalization?

What transaction features most influence the legality of a transaction?

##Model Pipeline
Data Preprocessing:
Handling missing values

Encoding categorical features

Scaling numerical features using StandardScaler

Splitting data into train and test sets

## Pipeline & Cross-Validation
We implemented a scikit-learn Pipeline for consistent preprocessing and model training. Each model was evaluated using 5-fold cross-validation to assess generalizability and minimize overfitting.

## Machine Learning Models
We tested and evaluated four classification models on the fraud detection dataset. Below is a summary of each model's performance on the test set:

Model    Accuracy    AUC    Notes
Logistic Regression    70.0%    0.492    Predicted only legal transactions; failed to detect fraud.
Random Forest    65.0%    0.500    Overfit training data (100% accuracy), weak generalization.
AdaBoost Classifier    70.0%    0.480    Same result as Logistic Regression; ignored minority class.
Gradient Boosting    70.0%    0.494    Slight improvement: identified a few fraudulent cases (recall = 1.3%).

## Model Evaluation Metrics
Logistic Regression and AdaBoost performed identically — predicting all transactions as legal, leading to 0% recall for fraud.

Random Forest learned the training set too well (perfect train accuracy) but failed to generalize — catching just 13% of fraud cases on the test set.

Gradient Boosting was slightly better — it managed to flag 10 fraudulent cases on the test set. While recall was still very low, it was the only model that didn’t fully ignore fraud and showed some balance between classes during training.

## Exploratory Data Analysis (EDA)
Before modeling, we explored the dataset to uncover trends and patterns:

Transaction Distribution: Count of legal vs. illegal transactions

Feature Correlations: Relationships between input features and transaction legality

Geographic Trends: Identified countries/regions with high frequencies of illegal activity


## Next Steps
Finalize Tableau dashboard visuals
Explore deep learning models
Deploy the model using Flask for real time prediction

# Project-4-Group-08
## Aayushi Patel, Kim Nguyen, Marcanthony Solorzano, Matthew Adent 
