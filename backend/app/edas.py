from fastapi import APIRouter
from models import EDASRequest, EDASResponse
from engine import edas_calculate

router = APIRouter()

@router.post("/calculate", response_model=EDASResponse)
async def calculate(request: EDASRequest):
    result = edas_calculate(
        request.matrix, 
        request.weights, 
        request.types, 
        request.alternatives
    )
    return result

@router.get("/defaults")
async def get_defaults():
    return {
        "alternatives": [f"Rumah Type {i + 1}" for i in range(20)],
        "matrix": [
            [450, 72, 120, 15, 8, 4, 5, 7],
            [500, 80, 150, 10, 9, 5, 2, 8],
            [350, 60, 100, 20, 7, 3, 10, 6],
            [600, 120, 200, 5, 10, 5, 1, 9],
            [420, 70, 110, 12, 8, 4, 4, 7],
            [380, 65, 95, 18, 7, 3, 8, 6],
            [550, 90, 160, 8, 9, 5, 3, 8],
            [470, 75, 125, 14, 8, 4, 6, 7],
            [320, 55, 90, 25, 6, 2, 12, 5],
            [650, 150, 250, 2, 10, 5, 0, 10],
            [440, 68, 115, 16, 7, 4, 5, 7],
            [490, 78, 145, 11, 9, 5, 2, 8],
            [360, 62, 105, 19, 7, 3, 9, 6],
            [580, 110, 180, 6, 10, 5, 1, 9],
            [410, 72, 108, 13, 8, 4, 4, 7],
            [390, 64, 98, 17, 7, 3, 7, 6],
            [540, 85, 155, 9, 9, 5, 3, 8],
            [460, 74, 122, 15, 8, 4, 6, 7],
            [330, 58, 92, 22, 6, 2, 11, 5],
            [620, 130, 220, 4, 10, 5, 1, 10],
        ],
        "weights": [0.2, 0.15, 0.1, 0.1, 0.15, 0.1, 0.1, 0.1],
        "types": ["cost", "benefit", "benefit", "cost", "benefit", "benefit", "cost", "benefit"]
    }
