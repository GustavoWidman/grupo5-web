import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.neighbors import NearestNeighbors


def init():
	user_superfit = pd.read_csv('./storage/csv/user_superfit.csv')
	user_lifestyle = pd.read_csv('./storage/csv/user_lifestyle.csv')
	gestor_superfit = pd.read_csv('./storage/csv/job_opportunity_superfit_consolidates.csv')
	gestor_lifestyle = pd.read_csv('./storage/csv/job_opportunity_workstyle_consolidates.csv')

	# Compiling User
	user_lifestyle = user_lifestyle[[
		'id', 'lifestyle_classic', 'lifestyle_order', 'lifestyle_change',
		'lifestyle_tireless', 'lifestyle_explorer', 'lifestyle_specialist',
		'lifestyle_generalist'
	]]
	user_superfit = user_superfit[[
		'id', 'superfit_dis', 'superfit_sin', 'superfit_cur',
		'superfit_int', 'superfit_eng', 'superfit_res'
	]]

	user_lifestyle.rename(columns={'id': 'user_id'}, inplace=True)
	user_superfit.rename(columns={'id': 'user_id'}, inplace=True)

	users = user_superfit
	users = pd.merge(users, user_lifestyle, on='user_id', how='left')

	users.drop_duplicates(subset='user_id', inplace=True)
	for column in users.columns:
		users.dropna(subset=[column], inplace=True)



	# Compiling Jobs
	gestor_lifestyle = gestor_lifestyle[[
	'job_opportunity_id', 'score_classic', 'score_order', 'score_change',
	'score_tireless', 'score_explorer', 'score_specialist',
	'score_generalist'
	]].copy()
	gestor_lifestyle.rename(columns={
		'score_classic': 'lifestyle_classic',
		'score_order': 'lifestyle_order',
		'score_change': 'lifestyle_change',
		'score_tireless': 'lifestyle_tireless',
		'score_explorer': 'lifestyle_explorer',
		'score_specialist': 'lifestyle_specialist',
		'score_generalist': 'lifestyle_generalist',
		'job_opportunity_id': 'job_id'
	}, inplace=True)
	gestor_superfit = gestor_superfit[[
		'job_opportunity_id', 'score_dis', 'score_sin', 'score_cur',
		'score_int', 'score_eng', 'score_res'
	]].copy()
	gestor_superfit.rename(columns={
		'score_dis': 'superfit_dis',
		'score_sin': 'superfit_sin',
		'score_cur': 'superfit_cur',
		'score_int': 'superfit_int',
		'score_eng': 'superfit_eng',
		'score_res': 'superfit_res',
		'job_opportunity_id': 'job_id'
	}, inplace=True)

	jobs = gestor_superfit
	jobs = pd.merge(jobs, gestor_lifestyle, on='job_id', how='left')

	jobs.drop_duplicates(subset='job_id', inplace=True)
	for column in jobs.columns:
		jobs.dropna(subset=[column], inplace=True)



	# MinMaxScaling Jobs
	dummy_df_superfit = pd.DataFrame({
		'superfit_dis': [0, 100],
		'superfit_sin': [0, 100],
		'superfit_cur': [0, 100],
		'superfit_int': [0, 100],
		'superfit_eng': [0, 100],
		'superfit_res': [0, 100]
	})
	superfit_scaler = MinMaxScaler()
	superfit_scaler.fit(dummy_df_superfit)

	dummy_df_lifestyle = pd.DataFrame({
		'lifestyle_classic': [0, 25],
		'lifestyle_order': [0, 25],
		'lifestyle_change': [0, 25],
		'lifestyle_tireless': [0, 25],
		'lifestyle_explorer': [0, 25],
		'lifestyle_specialist': [0, 25],
		'lifestyle_generalist': [0, 25]
	})
	lifestyle_scaler = MinMaxScaler()
	lifestyle_scaler.fit(dummy_df_lifestyle)

	# Transforming data
	jobs_scaled = jobs.copy()
	jobs_scaled[[
		'superfit_dis', 'superfit_sin', 'superfit_cur',
		'superfit_int', 'superfit_eng', 'superfit_res'
	]] = superfit_scaler.transform(jobs[[
		'superfit_dis', 'superfit_sin', 'superfit_cur',
		'superfit_int', 'superfit_eng', 'superfit_res'
	]])

	jobs_scaled[[
		'lifestyle_classic', 'lifestyle_order', 'lifestyle_change',
		'lifestyle_tireless', 'lifestyle_explorer', 'lifestyle_specialist',
		'lifestyle_generalist'
	]] = lifestyle_scaler.transform(jobs[[
		'lifestyle_classic', 'lifestyle_order', 'lifestyle_change',
		'lifestyle_tireless', 'lifestyle_explorer', 'lifestyle_specialist',
		'lifestyle_generalist'
	]])



	# Fitting into KNN
	X = jobs_scaled[[
		'superfit_dis', 'superfit_sin', 'superfit_cur',
		'superfit_int', 'superfit_eng', 'superfit_res',
		'lifestyle_classic', 'lifestyle_order', 'lifestyle_change',
		'lifestyle_tireless', 'lifestyle_explorer', 'lifestyle_specialist',
		'lifestyle_generalist'
	]]

	knn = NearestNeighbors(n_neighbors=5, metric='euclidean')
	knn.fit(X)

	return jobs, knn, superfit_scaler, lifestyle_scaler, users