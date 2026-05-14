"""
Auth routes — POST /api/auth/login and /api/auth/register
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret-change-me")
ALGORITHM  = os.getenv("ALGORITHM", "HS256")
EXPIRE_MIN = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 10080))

# ── In-memory user store (replace with DB in production) ──────────
USERS_DB: dict[str, dict] = {}


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "tourist"   # tourist | vendor


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


def create_token(data: dict) -> str:
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(minutes=EXPIRE_MIN)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/register", status_code=201)
async def register(body: RegisterRequest):
    if body.email in USERS_DB:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = pwd_context.hash(body.password)
    user = {"id": str(len(USERS_DB) + 1), "name": body.name, "email": body.email, "role": body.role, "hashed_password": hashed}
    USERS_DB[body.email] = user
    token = create_token({"sub": user["id"], "email": user["email"], "role": user["role"]})
    return {"token": token, "user": {k: v for k, v in user.items() if k != "hashed_password"}}


@router.post("/login")
async def login(body: LoginRequest):
    user = USERS_DB.get(body.email)
    if not user or not pwd_context.verify(body.password, user["hashed_password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    token = create_token({"sub": user["id"], "email": user["email"], "role": user["role"]})
    return {"token": token, "user": {k: v for k, v in user.items() if k != "hashed_password"}}
