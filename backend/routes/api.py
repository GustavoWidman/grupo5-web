from fastapi import APIRouter
from endpoints import journeys, gestors


router = APIRouter()
router.include_router(journeys.router)
router.include_router(gestors.router)

