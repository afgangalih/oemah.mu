from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.edas import router as edas_router

app = FastAPI(title="EDAS Decision Support System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(edas_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "EDAS API is running"}
