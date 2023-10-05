import numpy as np
import pandas as pd

from data.journeys import init
from classes.superfit import Superfit
from classes.lifestyle import Lifestyle
from classes.extras import Extras

knn, scaler, objective_le, interest_le, superfit_scaler, lifestyle_scaler, user_journeys, journeys, users = init()
print('Journeys model initialized')

def generate_journeys_unknown(superfit: Superfit, lifestyle: Lifestyle, extras: Extras):
	# Initialize all the scalers in the classes
	superfit.encode_with_scaler(superfit_scaler)
	lifestyle.encode_with_scaler(lifestyle_scaler)
	extras.encode(interest_le, objective_le)

	# obtain a numpy array for knn input in the following order:
	# ['superfit_dis', 'superfit_sin', 'superfit_cur',
    #   'superfit_int', 'superfit_eng', 'superfit_res', 'interest',
    #   'lifestyle_classic', 'lifestyle_order', 'lifestyle_change',
    #   'lifestyle_tireless', 'lifestyle_explorer', 'lifestyle_specialist',
    #   'lifestyle_generalist', 'lifestyle_hybrid', 'objective']

	input = np.array([superfit.superfit_dis, superfit.superfit_sin, superfit.superfit_cur,
				   	superfit.superfit_int, superfit.superfit_eng, superfit.superfit_res, extras.interest,
	   				lifestyle.lifestyle_classic, lifestyle.lifestyle_order, lifestyle.lifestyle_change,
	   				lifestyle.lifestyle_tireless, lifestyle.lifestyle_explorer, lifestyle.lifestyle_specialist,
	   				lifestyle.lifestyle_generalist, lifestyle.lifestyle_hybrid, extras.objective])

	input = pd.DataFrame(input.reshape(1, -1), columns=[
		'superfit_dis', 'superfit_sin', 'superfit_cur',
	   	'superfit_int', 'superfit_eng', 'superfit_res', 'interest',
	   	'lifestyle_classic', 'lifestyle_order', 'lifestyle_change',
	   	'lifestyle_tireless', 'lifestyle_explorer', 'lifestyle_specialist',
	   	'lifestyle_generalist', 'lifestyle_hybrid', 'objective'
	])

	# Standardize the input
	input_std = scaler.transform(input)

	# Find the nearest neighbors
	distances, indices = knn.kneighbors(input_std)

	# Gets the IDs of the most similar users
	ids = users.iloc[indices[0]].user_id.values

	# Find the journeys completed by these similar users
	similar_user_journeys = user_journeys[user_journeys['user_id'].isin(ids)]

	# find those journeys in the journeys dataframe
	locate_journeys = journeys.rename(columns={'id': 'journey_id'})

	similar_user_journeys = pd.merge(similar_user_journeys, locate_journeys, on='journey_id', how='left')

	# Recommend the top 3 highest rated journeys and highest rating count aswell
	recommended_journeys = similar_user_journeys.sort_values(by=['average_rating', 'ratings_count'], ascending=False)

	# remove duplicates based on journey_id
	recommended_journeys.drop_duplicates(subset='journey_id', inplace=True)

	# drop the user_id column
	recommended_journeys.drop('user_id', axis=1, inplace=True)

	return recommended_journeys.head(3).to_dict('records')


def generate_journeys(user_id):
	# Find the nearest neighbors
	given_user = users[users['user_id'] == user_id]

	if given_user.empty:
		return {'error': True, 'message': 'User not found'}

	given_user = given_user.drop('user_id', axis=1)

	# Standardize the input
	input_std = scaler.transform(given_user)

	# Find the nearest neighbors
	distances, indices = knn.kneighbors(input_std)

	# Gets the IDs of the most similar users
	ids = users.iloc[indices[0]].user_id.values

	# Find the journeys completed by these similar users
	similar_user_journeys = user_journeys[user_journeys['user_id'].isin(ids)]

	# remove all journeys the user has already completed
	similar_user_journeys = similar_user_journeys[~similar_user_journeys['journey_id'].isin(user_journeys[user_journeys['user_id'] == user_id].journey_id)]

	# find those journeys in the journeys dataframe
	locate_journeys = journeys.rename(columns={'id': 'journey_id'})

	similar_user_journeys = pd.merge(similar_user_journeys, locate_journeys, on='journey_id', how='left')

	# Recommend the top 3 highest rated journeys and highest rating count aswell
	recommended_journeys = similar_user_journeys.sort_values(by=['average_rating', 'ratings_count'], ascending=False)

	# remove duplicates based on journey_id
	recommended_journeys.drop_duplicates(subset='journey_id', inplace=True)

	# drop the user_id column
	recommended_journeys.drop('user_id', axis=1, inplace=True)

	# return only top 3 as dict
	return recommended_journeys.head(3).to_dict('records')