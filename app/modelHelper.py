import pandas as pd
import numpy as np
import pickle # they turned me into a module morty
import os

class ModelHelper():
    def __init__(self):
        # Safe path: works even if working directory changes
        model_path = os.path.join(os.path.dirname(__file__), "black_money_model.h5")
        self.model = pickle.load(open(model_path, 'rb'))

    def make_predictions(self, amount_usd, transaction_type, industry, reported_by_authority, risk_score, shell_co_involved):
        import pandas as pd
        df = pd.DataFrame({
            "amount_usd": [amount_usd],
            "transaction_type": [transaction_type],
            "industry": [industry],
            "reported_by_authority": [reported_by_authority],
            "risk_score": [risk_score],
            "shell_co_involved": [shell_co_involved]
        })

        preds = self.model.predict_proba(df)
        return preds[0][1]
