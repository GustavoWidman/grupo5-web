import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler



def init():
	journeys = pd.read_csv("./storage/csv/journeys_inteli.csv")

	user_interests = pd.read_csv('./storage/csv/user_interests_inteli.csv')
	user_journeys = pd.read_csv('./storage/csv/user_journeys_inteli.csv')
	user_superfit = pd.read_csv('./storage/csv/user_superfit.csv')
	user_lifestyle = pd.read_csv('./storage/csv/user_lifestyle.csv')
	user_objectives = pd.read_csv('./storage/csv/user_objectives_inteli.csv')

	# Slicing off data
	user_journeys.drop(['fim'], axis=1, inplace=True)
	user_lifestyle = user_lifestyle[[
		'id', 'lifestyle_classic',	'lifestyle_order',		'lifestyle_change',
       	'lifestyle_tireless', 		'lifestyle_explorer',	'lifestyle_specialist',
       	'lifestyle_generalist', 	'lifestyle_hybrid'
	]]
	user_superfit = user_superfit[[
		'id', 'superfit_dis', 'superfit_sin', 'superfit_cur',
       'superfit_int',		  'superfit_eng', 'superfit_res'
	]]
	train_journeys = journeys[['id', 'type', 'category_type']].copy()

	# Merging prep
	train_journeys.rename(columns={'id': 'journey_id', 'category_type': 'category'}, inplace=True)
	user_interests.rename(columns={'id': 'user_id', 'name': 'interest'}, inplace=True)
	user_objectives.rename(columns={'id': 'user_id', 'name': 'objective'}, inplace=True)
	user_lifestyle.rename(columns={'id': 'user_id'}, inplace=True)
	user_superfit.rename(columns={'id': 'user_id'}, inplace=True)

	# Merging into users
	users = user_superfit
	users = pd.merge(users, user_interests, on='user_id', how='left')
	users = pd.merge(users, user_lifestyle, on='user_id', how='left')
	users = pd.merge(users, user_objectives, on='user_id', how='left')



	# Scaling
	# MinMax Scale superfit grades and lifestyle grades
	superfit_scaler = MinMaxScaler()
	lifestyle_scaler = MinMaxScaler()
	users[['superfit_dis', 'superfit_sin', 'superfit_cur',
		'superfit_int', 'superfit_eng', 'superfit_res']] = superfit_scaler.fit_transform(users[['superfit_dis', 'superfit_sin', 'superfit_cur',
		'superfit_int', 'superfit_eng', 'superfit_res']])
	users[['lifestyle_classic', 'lifestyle_order', 'lifestyle_change',
		'lifestyle_tireless', 'lifestyle_explorer', 'lifestyle_specialist',
		'lifestyle_generalist', 'lifestyle_hybrid']] = lifestyle_scaler.fit_transform(users[['lifestyle_classic', 'lifestyle_order', 'lifestyle_change',
		'lifestyle_tireless', 'lifestyle_explorer', 'lifestyle_specialist',
		'lifestyle_generalist', 'lifestyle_hybrid']])

	# Dropping duplicates and NaNs
	users.drop_duplicates(subset='user_id', inplace=True)
	for column in users.columns:
		users.dropna(subset=[column], inplace=True)



	# Encoding
	objective_le = LabelEncoder()
	users.objective = objective_le.fit_transform(users.objective)
	users.objective.unique()

	interest_le = LabelEncoder()
	users.interest = interest_le.fit_transform(users.interest)
	users.interest.unique()



	# Pre-Training
	X = users[['superfit_dis', 'superfit_sin', 'superfit_cur',
       'superfit_int', 'superfit_eng', 'superfit_res', 'interest',
       'lifestyle_classic', 'lifestyle_order', 'lifestyle_change',
       'lifestyle_tireless', 'lifestyle_explorer', 'lifestyle_specialist',
       'lifestyle_generalist', 'lifestyle_hybrid', 'objective']]


	# Scale features with StandardScaler just to be sure
	scaler = StandardScaler()
	X_std = scaler.fit_transform(X)



	# Training
	knn = NearestNeighbors(n_neighbors=7, metric='euclidean')
	knn.fit(X_std)


	return knn, scaler, objective_le, interest_le, superfit_scaler, lifestyle_scaler, user_journeys, journeys, users