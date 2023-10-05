from fastapi import APIRouter
from models.journeys import generate_journeys, generate_journeys_unknown
from classes import superfit, lifestyle, extras
from pydantic import BaseModel

router = APIRouter(
	prefix="/api/rest/journeys",
	tags=["journeys"],
)



class KnownBody(BaseModel):
	user_id: int

class UnknownBody(BaseModel):
	superfit: superfit.SuperfitModel
	lifestyle: lifestyle.LifestyleModel
	extras: extras.ExtrasModel



@router.post("/known")
async def known_journeys(body: KnownBody):
	user_id = body.user_id

	try:
		journeys = generate_journeys(user_id)
	except Exception as e:
		return {
			'error': True,
			'message': str(e)
		}

	return {
		'error': False,
		'message': 'OK',
		'journeys': journeys
	}


@router.post("/unknown")
async def unknown_journeys(body: UnknownBody):
	# random ints in range 0, 100
	input_superfit = body.superfit
	input_lifestyle = body.lifestyle
	input_extras = body.extras

	input_superfit = superfit.Superfit(
		input_superfit.superfit_dis,
		input_superfit.superfit_sin,
		input_superfit.superfit_cur,
		input_superfit.superfit_int,
		input_superfit.superfit_eng,
		input_superfit.superfit_res
	)

	input_lifestyle = lifestyle.Lifestyle(
		input_lifestyle.lifestyle_classic,
		input_lifestyle.lifestyle_order,
		input_lifestyle.lifestyle_change,
		input_lifestyle.lifestyle_tireless,
		input_lifestyle.lifestyle_explorer,
		input_lifestyle.lifestyle_specialist,
		input_lifestyle.lifestyle_generalist,
		input_lifestyle.lifestyle_hybrid
	)

	input_extras = extras.Extras(
		input_extras.interest,
		input_extras.objective
	)

	checks = []
	checks.append(input_superfit.check_values())
	checks.append(input_lifestyle.check_values())
	checks.append(input_extras.check_values())

	for check in checks:
		if check['error']:
			return {
				'error': True,
				'message': check['message']
			}

	try:
		journeys = generate_journeys_unknown(input_superfit, input_lifestyle, input_extras)
	except Exception as e:
		return {
			'error': True,
			'message': str(e)
		}

	return {
		'error': False,
		'message': 'OK',
		'journeys': journeys
	}