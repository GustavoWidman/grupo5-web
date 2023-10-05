from fastapi import APIRouter
from models.gestors import generate_jobs
from classes import superfit, lifestyle
from pydantic import BaseModel

router = APIRouter(
	prefix="/api/rest/gestors",
	tags=["gestors"],
)

class UserInput(BaseModel):
	"""User input for job generation"""
	superfit: superfit.SuperfitModel
	lifestyle: lifestyle.GestorLifestyleModel


@router.post('/')
def generate_gestor(user_input: UserInput):
	input_superfit = user_input.superfit
	input_lifestyle = user_input.lifestyle

	input_superfit = superfit.Superfit(
		input_superfit.superfit_dis,
		input_superfit.superfit_sin,
		input_superfit.superfit_cur,
		input_superfit.superfit_int,
		input_superfit.superfit_eng,
		input_superfit.superfit_res
	)

	input_lifestyle = lifestyle.GestorLifestyle(
		input_lifestyle.lifestyle_classic,
		input_lifestyle.lifestyle_order,
		input_lifestyle.lifestyle_change,
		input_lifestyle.lifestyle_tireless,
		input_lifestyle.lifestyle_explorer,
		input_lifestyle.lifestyle_specialist,
		input_lifestyle.lifestyle_generalist
	)

	checks = []
	checks.append(input_superfit.check_values())
	checks.append(input_lifestyle.check_values())

	for check in checks:
		if check['error']:
			return {
				'error': True,
				'message': check['message']
			}

	try:
		jobs = generate_jobs(input_superfit, input_lifestyle)
	except Exception as e:
		return {
			'error': True,
			'message': str(e)
		}

	return {
		'error': False,
		'message': 'OK',
		'jobs': jobs
	}

