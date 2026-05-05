from pydantic import BaseModel
from typing import List, Literal

class EDASRequest(BaseModel):
    matrix: List[List[float]]
    weights: List[float]
    types: List[Literal["benefit", "cost"]]
    alternatives: List[str]

class RankingItem(BaseModel):
    rank: int
    alternative: str
    as_score: float
    nsp: float
    nsn: float

class EDASResponse(BaseModel):
    av: List[float]
    pda: List[List[float]]
    nda: List[List[float]]
    sp: List[float]
    sn: List[float]
    nsp: List[float]
    nsn: List[float]
    ranking: List[RankingItem]
