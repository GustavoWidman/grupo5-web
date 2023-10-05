import numpy as np
import pandas as pd
from classes import superfit, lifestyle
from data.gestors import init

jobs, knn, superfit_scaler, lifestyle_scaler, users = init()

def generate_jobs(superfit: superfit.Superfit, lifestyle: lifestyle.GestorLifestyle):
	print('Generating jobs...')
	input = np.array([
		superfit.superfit_dis, superfit.superfit_sin, superfit.superfit_cur,
		superfit.superfit_int, superfit.superfit_eng, superfit.superfit_res,
		lifestyle.lifestyle_classic, lifestyle.lifestyle_order, lifestyle.lifestyle_change,
		lifestyle.lifestyle_tireless, lifestyle.lifestyle_explorer, lifestyle.lifestyle_specialist,
		lifestyle.lifestyle_generalist
	])

	# make input into a dataframe with column names
	input = pd.DataFrame(input.reshape(1, -1), columns=[
		'superfit_dis', 'superfit_sin', 'superfit_cur',
		'superfit_int', 'superfit_eng', 'superfit_res',
		'lifestyle_classic', 'lifestyle_order', 'lifestyle_change',
		'lifestyle_tireless', 'lifestyle_explorer', 'lifestyle_specialist',
		'lifestyle_generalist'
	])

	# Find the nearest neighbors
	_, indices = knn.kneighbors(input)

	# Gets the IDs of the most similar jobs
	ids = jobs.iloc[indices[0]].job_id.values

	# Find existing jobs for the IDs
	similar_jobs = jobs[jobs['job_id'].isin(ids)].copy()

	# sort by how similar the jobs are to the user
	similar_jobs['similarity'] = knn.kneighbors(input)[0][0]

	# sort by similarity
	similar_jobs.sort_values('similarity', ascending=False, inplace=True)

	# drop the similarity column
	# similar_jobs.drop('similarity', axis=1, inplace=True)

	# remove duplicates based on job_id
	similar_jobs.drop_duplicates(subset='job_id', inplace=True)

	return similar_jobs.head(3).to_dict('records')