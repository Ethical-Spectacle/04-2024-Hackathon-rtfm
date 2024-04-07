import numpy as np
import seaborn as sns
import pandas as pd
from sklearn.neighbors import LocalOutlierFactor

file_path = "final_filtered.csv" 
df = pd.read_csv(file_path)

def remove_outliers(column):
    mean = column.mean()
    std = column.std()
    lower_bound = mean - 3 * std
    upper_bound = mean + 3 * std
    return column[(column >= lower_bound) & (column <= upper_bound)]

columns_to_process = ['ENGINE_COOLANT_TEMP', 'ENGINE_RPM', 'AIR_INTAKE_TEMP', 'SPEED']
for col in columns_to_process:
    df[col] = remove_outliers(df[col])

columns_to_exclude = ['TIMESTAMP','Efficiency']
df_subset = df.drop(columns_to_exclude, axis=1)

std = df_subset.std().values

mean = df_subset.mean().values

coolant_temp_eff = ((mean[0]-std[0])/mean[0])*100*0.25
engine_load_eff = ((mean[1]-std[1])/mean[1])*100*0.1
engine_rpm_eff = ((mean[2]-std[2])/mean[2])*100*0.2
air_int_eff = ((mean[3]-std[3])/mean[3])*100*0.1
speed_eff = ((mean[4]-std[4])/mean[4])*100*0.05
throttle_eff = ((mean[5]-std[5])/mean[5])*100*0.3

efficiency = coolant_temp_eff + engine_load_eff + engine_rpm_eff + air_int_eff + speed_eff + throttle_eff

print(efficiency)