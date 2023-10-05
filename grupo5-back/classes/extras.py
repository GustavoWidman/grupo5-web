from pydantic import BaseModel
\
objectives = ['Procurar emprego', 'Melhorar minha carreira', 'Autoconhecimento', 'Desenvolvimento Pessoal']

interests = ['Finanças / Contabilidade', 'Logistica / Supply Chain', 'Engenharia', 'Tecnologia', 'Produção / Operações',
             'Comercial / Vendas', 'RH', 'Marketing / Comunicação', 'Administrativo', 'Saúde', 'Jurídico']


class ExtrasModel(BaseModel):
	interest: str
	objective: str


class Extras():
	def __init__(self, interest: str, objective: str):
		self.interest = interest
		self.objective = objective

	def check_values(self):
		if self.interest not in interests:
			return {'error': True, 'message': 'Interest not found'}

		if self.objective not in objectives:
			return {'error': True, 'message': 'Objective not found'}

		return {'error': False, 'message': 'OK'}

	def encode(self, interest_le, objective_le):
		# encode the interest and objective
		self.interest = interest_le.transform([self.interest])[0]
		self.objective = objective_le.transform([self.objective])[0]