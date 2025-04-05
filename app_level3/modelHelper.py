import pandas as pd
import numpy as np
import pickle

class ModelHelper():
    def __init__(self):
        pass

    def make_predictions(self, amount_usd, transaction_type, industry, reported_by_authority, risk_score, shell_co_involved):
        df = pd.DataFrame()
        df["amount_usd"] = [amount_usd]  
        df["transaction_type"] = [transaction_type]
        df["industry"] = [industry]
        df["reported_by_authority"] = [reported_by_authority]
        df["risk_score"] = [risk_score]
        df["shell_co_involved"] = [shell_co_involved]

        # Load model
        model = pickle.load(open("black_money_model.h5", 'rb'))

        preds = model.predict_proba(df)
        legal_source_of_money = preds[0][1]

        return(legal_source_of_money)
