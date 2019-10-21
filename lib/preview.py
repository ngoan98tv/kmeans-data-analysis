#!/usr/bin/python3
import sys
import pandas as pd

work_dir    = "/home/tvngoan/projects/panasonic_data_analysis/"
file_path   = work_dir + sys.argv[1]
start       = int(sys.argv[2])
end         = int(sys.argv[3])
fields      = sys.argv[4:]

origin_data = pd.read_csv(file_path)
data_with_selected_fields = origin_data[fields]
data_with_selected_lines = data_with_selected_fields[start:end]

print(data_with_selected_lines.to_json(orient='records'))