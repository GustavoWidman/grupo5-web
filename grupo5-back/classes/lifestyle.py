import pandas as pd
from pydantic import BaseModel

class LifestyleModel(BaseModel):
	lifestyle_classic: float
	lifestyle_order: float
	lifestyle_change: float
	lifestyle_tireless: float
	lifestyle_explorer: float
	lifestyle_specialist: float
	lifestyle_generalist: float
	lifestyle_hybrid: float

class Lifestyle():
	def __init__(self, lifestyle_classic: float, lifestyle_order: float, lifestyle_change: float, lifestyle_tireless: float, lifestyle_explorer: float, lifestyle_specialist: float, lifestyle_generalist: float, lifestyle_hybrid: float):
		self.lifestyle_classic = lifestyle_classic
		self.lifestyle_order = lifestyle_order
		self.lifestyle_change = lifestyle_change
		self.lifestyle_tireless = lifestyle_tireless
		self.lifestyle_explorer = lifestyle_explorer
		self.lifestyle_specialist = lifestyle_specialist
		self.lifestyle_generalist = lifestyle_generalist
		self.lifestyle_hybrid = lifestyle_hybrid


	def check_values(self):
		range = [0.0, 25.0]

		if self.lifestyle_classic < range[0] or self.lifestyle_classic > range[1]:
			return {'error': True, 'message': f'lifestyle_classic must be between {range[0]} and {range[1]}'}

		if self.lifestyle_order < range[0] or self.lifestyle_order > range[1]:
			return {'error': True, 'message': f'lifestyle_order must be between {range[0]} and {range[1]}'}

		if self.lifestyle_change < range[0] or self.lifestyle_change > range[1]:
			return {'error': True, 'message': f'lifestyle_change must be between {range[0]} and {range[1]}'}

		if self.lifestyle_tireless < range[0] or self.lifestyle_tireless > range[1]:
			return {'error': True, 'message': f'lifestyle_tireless must be between {range[0]} and {range[1]}'}

		if self.lifestyle_explorer < range[0] or self.lifestyle_explorer > range[1]:
			return {'error': True, 'message': f'lifestyle_explorer must be between {range[0]} and {range[1]}'}

		if self.lifestyle_specialist < range[0] or self.lifestyle_specialist > range[1]:
			return {'error': True, 'message': f'lifestyle_specialist must be between {range[0]} and {range[1]}'}

		if self.lifestyle_generalist < range[0] or self.lifestyle_generalist > range[1]:
			return {'error': True, 'message': f'lifestyle_generalist must be between {range[0]} and {range[1]}'}

		if self.lifestyle_hybrid < range[0] or self.lifestyle_hybrid > range[1]:
			return {'error': True, 'message': f'lifestyle_hybrid must be between {range[0]} and {range[1]}'}

		return {'error': False, 'message': 'OK'}


	def encode_with_scaler(self, scaler):
		# encode the superfit grades
		self.lifestyle_scaled = [[
			self.lifestyle_classic, self.lifestyle_order, self.lifestyle_change,
	   		self.lifestyle_tireless, self.lifestyle_explorer, self.lifestyle_specialist,
	   		self.lifestyle_generalist, self.lifestyle_hybrid
		]]

		self.lifestyle_scaled = pd.DataFrame(self.lifestyle_scaled, columns=[
			'lifestyle_classic', 'lifestyle_order', 'lifestyle_change',
	   		'lifestyle_tireless', 'lifestyle_explorer', 'lifestyle_specialist',
	   		'lifestyle_generalist', 'lifestyle_hybrid'
		])

		self.lifestyle_scaled = scaler.transform(self.lifestyle_scaled)

		for i in range(len(self.lifestyle_scaled[0])):
			setattr(self, list(self.__dict__.keys())[i], self.lifestyle_scaled[0][i])

		# remove the superfit_scaled attribute
		del self.lifestyle_scaled




class GestorLifestyleModel(BaseModel):
	lifestyle_classic: float
	lifestyle_order: float
	lifestyle_change: float
	lifestyle_tireless: float
	lifestyle_explorer: float
	lifestyle_specialist: float
	lifestyle_generalist: float


class GestorLifestyle():
	def __init__(self, lifestyle_classic: float, lifestyle_order: float, lifestyle_change: float, lifestyle_tireless: float, lifestyle_explorer: float, lifestyle_specialist: float, lifestyle_generalist: float):
		range = [0.0, 25.0]

		self.lifestyle_classic = lifestyle_classic
		self.lifestyle_order = lifestyle_order
		self.lifestyle_change = lifestyle_change
		self.lifestyle_tireless = lifestyle_tireless
		self.lifestyle_explorer = lifestyle_explorer
		self.lifestyle_specialist = lifestyle_specialist
		self.lifestyle_generalist = lifestyle_generalist


	def check_values(self):
		range = [0.0, 25.0]

		if self.lifestyle_classic < range[0] or self.lifestyle_classic > range[1]:
			return {'error': True, 'message': f'lifestyle_classic must be between {range[0]} and {range[1]}'}

		if self.lifestyle_order < range[0] or self.lifestyle_order > range[1]:
			return {'error': True, 'message': f'lifestyle_order must be between {range[0]} and {range[1]}'}

		if self.lifestyle_change < range[0] or self.lifestyle_change > range[1]:
			return {'error': True, 'message': f'lifestyle_change must be between {range[0]} and {range[1]}'}

		if self.lifestyle_tireless < range[0] or self.lifestyle_tireless > range[1]:
			return {'error': True, 'message': f'lifestyle_tireless must be between {range[0]} and {range[1]}'}

		if self.lifestyle_explorer < range[0] or self.lifestyle_explorer > range[1]:
			return {'error': True, 'message': f'lifestyle_explorer must be between {range[0]} and {range[1]}'}

		if self.lifestyle_specialist < range[0] or self.lifestyle_specialist > range[1]:
			return {'error': True, 'message': f'lifestyle_specialist must be between {range[0]} and {range[1]}'}

		if self.lifestyle_generalist < range[0] or self.lifestyle_generalist > range[1]:
			return {'error': True, 'message': f'lifestyle_generalist must be between {range[0]} and {range[1]}'}

		return {'error': False, 'message': 'OK'}


	def encode_with_scaler(self, scaler):
		# encode the superfit grades
		self.lifestyle_scaled = [[
			self.lifestyle_classic, self.lifestyle_order, self.lifestyle_change,
	   		self.lifestyle_tireless, self.lifestyle_explorer, self.lifestyle_specialist,
	   		self.lifestyle_generalist
		]]

		self.lifestyle_scaled = pd.DataFrame(self.lifestyle_scaled, columns=[
			'lifestyle_classic', 'lifestyle_order', 'lifestyle_change',
	   		'lifestyle_tireless', 'lifestyle_explorer', 'lifestyle_specialist',
	   		'lifestyle_generalist'
		])

		self.lifestyle_scaled = scaler.transform(self.lifestyle_scaled)

		for i in range(len(self.lifestyle_scaled[0])):
			setattr(self, list(self.__dict__.keys())[i], self.lifestyle_scaled[0][i])

		# remove the superfit_scaled attribute
		del self.lifestyle_scaled