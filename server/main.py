"""
Trails of Bharat — FastAPI Backend
Main application entry point.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv

load_dotenv()

from routes.auth         import router as auth_router
from routes.destinations import router as destinations_router
from routes.products     import router as products_router
from routes.guides       import router as guides_router

# ── App ───────────────────────────────────────────────────────────
app = FastAPI(
    title="Trails of Bharat API",
    description="Backend API for the Trails of Bharat India Tourism Platform",
    version="1.0.0",
)

# ── CORS ─────────────────────────────────────────────────────────
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────
app.include_router(auth_router,         prefix="/api/auth",         tags=["Auth"])
app.include_router(destinations_router, prefix="/api/destinations",  tags=["Destinations"])
app.include_router(products_router,     prefix="/api/products",      tags=["Products"])
app.include_router(guides_router,       prefix="/api/guides",        tags=["Guides"])

# ── Health check ─────────────────────────────────────────────────
@app.get("/", tags=["Health"])
async def root():
    return {"status": "ok", "message": "Trails of Bharat API is running 🇮🇳", "version": "1.0.0"}

@app.get("/api/health", tags=["Health"])
async def health():
    return {"status": "healthy", "service": "trails-of-bharat-api"}
