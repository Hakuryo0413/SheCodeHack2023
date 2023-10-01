import pipeline
import pandas as pd

# # save class to file
# import pickle
# with open('F:/Downloads/pipeline.pkl', 'wb') as f:
#     pickle.dump(pipeline_, f)
#     print("Save pipeline to file successfully!")

df = pd.read_excel("D:/SheCopy/foldername/SheCodeHack2023/client/src/components/HomePage/data_.xlsx")
pipeline_ = pipeline.Pipeline()
pipeline_.train(df)
# save to pickle
import pickle
with open('F:/Code/shecode/pipeline.pkl', 'wb') as f:
    pickle.dump(pipeline_, f)
    print("Save pipeline to file successfully!")
print("done")