import numpy as np
import seaborn as sns
import pandas as pd
from sklearn.neighbors import LocalOutlierFactor

file_path = "data.csv" 
df = pd.read_csv(file_path)

columns_to_drop = ["MARK", "MODEL", "CAR_YEAR", "ENGINE_POWER", "AUTOMATIC", "VEHICLE_ID", "BAROMETRIC_PRESSURE(KPA)", "FUEL_LEVEL", "AMBIENT_AIR_TEMP", "INTAKE_MANIFOLD_PRESSURE", "MAF", "LONG TERM FUEL TRIM BANK 2", "FUEL_TYPE", "FUEL_PRESSURE", "SHORT TERM FUEL TRIM BANK 2", "SHORT TERM FUEL TRIM BANK 1", "ENGINE_RUNTIME", "DTC_NUMBER", "TROUBLE_CODES", "TIMING_ADVANCE", "EQUIV_RATIO", "MIN", "HOURS", "DAYS_OF_WEEK", "MONTHS", "YEAR"]

df.drop(columns=columns_to_drop, inplace=True)

df['ENGINE_LOAD'] = df['ENGINE_LOAD'].str.replace(',', '.').str.replace('%', '')
df['THROTTLE_POS'] = df['THROTTLE_POS'].str.replace(',', '.').str.replace('%', '')

# Convert the column to a numeric type
df['ENGINE_LOAD'] = pd.to_numeric(df['ENGINE_LOAD'], errors='coerce')
df['THROTTLE_POS'] = pd.to_numeric(df['THROTTLE_POS'], errors='coerce')

def remove_outliers(column):
    mean = column.mean()
    std = column.std()
    lower_bound = mean - 3 * std
    upper_bound = mean + 3 * std
    return column[(column >= lower_bound) & (column <= upper_bound)]

columns_to_process = ['ENGINE_COOLANT_TEMP', 'ENGINE_RPM', 'AIR_INTAKE_TEMP', 'SPEED']
for col in columns_to_process:
    df[col] = remove_outliers(df[col])

columns_to_exclude = ['TIMESTAMP']
df_subset = df.drop(columns_to_exclude, axis=1)
timestamp = df["TIMESTAMP"]

mean = df_subset.mean().values

for index, row in df_subset.iterrows():
  coolant_temp_eff = ((abs(mean[0]-row["ENGINE_COOLANT_TEMP"]))/mean[0])*100*0.25
  engine_load_eff = (abs(mean[1]-row["ENGINE_LOAD"])/mean[1])*100*0.1
  engine_rpm_eff = (abs(mean[2]-row["ENGINE_RPM"])/mean[2])*100*0.2
  air_int_eff = (abs(mean[3]-row["AIR_INTAKE_TEMP"])/mean[3])*100*0.1
  speed_eff = (abs(mean[4]-row["SPEED"])/mean[4])*100*0.05
  throttle_eff = (abs(mean[5]-row["THROTTLE_POS"])/mean[5])*100*0.3
  efficiency = coolant_temp_eff + engine_load_eff + engine_rpm_eff + air_int_eff + speed_eff + throttle_eff
  df_subset.at[index, "EFFICIENCY"] = efficiency

df_subset = pd.concat([timestamp.to_frame(), df_subset], axis=1)

df_subset.to_csv("processed_data.csv", index=False)
