import pandas as pd
from pymongo import MongoClient

df_test = pd.read_excel(r"data_.xlsx", nrows=0)
df_test.loc[len(df_test)] = [20, 'Đại học', 'Nam', 'Marketing', '3', 'Công nghệ', 'Hà Nội', 'Có', 'Tối', 'Online', 'Anh'] 
# read class from pipeline.pkl
import pickle
with open('G:/Code/shecode/pipeline.pkl', 'rb') as f:
    pipeline_ = pickle.load(f)
    print("Load pipeline from file successfully!")
    
# predict
y_pred = pipeline_.predict(df_test)
print(y_pred)