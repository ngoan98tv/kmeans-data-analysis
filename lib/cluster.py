#!/usr/bin/python3
import sys
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import MinMaxScaler

work_dir    = "/home/tvngoan/projects/panasonic_data_analysis/"
file_path   = work_dir + sys.argv[1]
num_of_clusters  = int(sys.argv[2])
max_loops   = int(sys.argv[3])
fields      = sys.argv[4:]

origin_data = pd.read_csv(file_path)
data = origin_data[fields].copy()

data.fillna(data.mean(), inplace=True)
data.fillna("MyOwnValue", inplace=True)

labelEncoder = LabelEncoder()
for field in data.columns:
    if (data[field].dtype == np.object):
        labelEncoder.fit(data[field])
        data[field] = labelEncoder.transform(data[field])

X = np.array(data.astype(float))

scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)

kmeans = KMeans(n_clusters=num_of_clusters, max_iter=max_loops)
kmeans.fit(X_scaled)
labels = kmeans.predict(X_scaled)

summary = '['
for i in range(0, num_of_clusters):
    cluster = origin_data.loc[labels[origin_data.index] == i]
    cluster.to_csv(file_path + str(i), index=False)
    summary += cluster[fields].describe(include = ['object', 'float', 'int']).to_json()
    if (i+1 < num_of_clusters):
        summary += ','
summary += ']'

print(summary)

