import pandas as pd
from pydantic import BaseModel

class SuperfitModel(BaseModel):
	superfit_dis: int
	superfit_sin: int
	superfit_cur: int
	superfit_int: int
	superfit_eng: int
	superfit_res: int

class Superfit():
	def __init__(self, superfit_dis: int, superfit_sin: int, superfit_cur: int, superfit_int: int, superfit_eng: int, superfit_res: int):
		self.superfit_dis = superfit_dis
		self.superfit_sin = superfit_sin
		self.superfit_cur = superfit_cur
		self.superfit_int = superfit_int
		self.superfit_eng = superfit_eng
		self.superfit_res = superfit_res


	def check_values(self):
		range = [0, 100]

		if self.superfit_dis < range[0] or self.superfit_dis > range[1]:
			return {'error': True, 'message': f'superfit_dis must be between {range[0]} and {range[1]}'}

		if self.superfit_sin < range[0] or self.superfit_sin > range[1]:
			return {'error': True, 'message': f'superfit_sin must be between {range[0]} and {range[1]}'}

		if self.superfit_cur < range[0] or self.superfit_cur > range[1]:
			return {'error': True, 'message': f'superfit_cur must be between {range[0]} and {range[1]}'}

		if self.superfit_int < range[0] or self.superfit_int > range[1]:
			return {'error': True, 'message': f'superfit_int must be between {range[0]} and {range[1]}'}

		if self.superfit_eng < range[0] or self.superfit_eng > range[1]:
			return {'error': True, 'message': f'superfit_eng must be between {range[0]} and {range[1]}'}

		if self.superfit_res < range[0] or self.superfit_res > range[1]:
			return {'error': True, 'message': f'superfit_res must be between {range[0]} and {range[1]}'}

		return {'error': False, 'message': 'OK'}

	def encode_with_scaler(self, scaler):
		# encode the superfit grades
		self.superfit_scaled = [[
			self.superfit_dis, self.superfit_sin, self.superfit_cur,
	   		self.superfit_int, self.superfit_eng, self.superfit_res
		]]

		self.superfit_scaled = pd.DataFrame(self.superfit_scaled, columns=[
			'superfit_dis', 'superfit_sin', 'superfit_cur',
			'superfit_int', 'superfit_eng', 'superfit_res'
		])


		self.superfit_scaled = scaler.transform(self.superfit_scaled)

		for i in range(len(self.superfit_scaled[0])):
			setattr(self, list(self.__dict__.keys())[i], self.superfit_scaled[0][i])

		# remove the superfit_scaled attribute
		del self.superfit_scaled
