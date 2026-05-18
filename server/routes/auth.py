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


import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "tourist"   # tourist | vendor

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

def create_token(data: dict, expires_delta: timedelta = None) -> str:
    payload = data.copy()
    if expires_delta:
        payload["exp"] = datetime.utcnow() + expires_delta
    else:
        payload["exp"] = datetime.utcnow() + timedelta(minutes=EXPIRE_MIN)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def send_reset_email(to_email: str, reset_url: str) -> bool:
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = os.getenv("SMTP_PORT")
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    
    if not all([smtp_server, smtp_port, smtp_username, smtp_password]):
        return False
        
    try:
        msg = MIMEMultipart()
        msg["From"] = f"Trails of Bharat <{smtp_username}>"
        msg["To"] = to_email
        msg["Subject"] = "Trails of Bharat — Password Reset Request"
        
        html_content = f"""
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 2.5rem; border-radius: 1.5rem; background: #06100e; border: 1px solid #164e3d; color: #a7f3d0;">
          <div style="text-align: center; margin-bottom: 2rem;">
            <h2 style="color: #10b981; margin: 0;">Trails of Bharat 🇮🇳</h2>
            <p style="color: #34d399; font-size: 0.85rem; margin-top: 0.25rem;">AI-Powered Tourism Portal</p>
          </div>
          <h3 style="color: #ecfdf5; margin-bottom: 1rem;">Reset Your Password</h3>
          <p style="color: #a7f3d0; line-height: 1.6; font-size: 0.95rem;">
            Namaste! We received a request to reset the password for your Trails of Bharat account. Click the button below to establish a new password:
          </p>
          <div style="text-align: center; margin: 2.5rem 0;">
            <a href="{reset_url}" style="background: #10b981; color: #ffffff; padding: 0.9rem 1.75rem; border-radius: 0.875rem; text-decoration: none; font-weight: 800; font-size: 0.95rem; display: inline-block; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);">Reset Password</a>
          </div>
          <p style="color: #34d399; font-size: 0.8rem; line-height: 1.5;">
            If you did not request a password reset, please ignore this message or contact support. This link will automatically expire in 15 minutes for your security.
          </p>
        </div>
        """
        msg.attach(MIMEText(html_content, "html"))
        
        server = smtplib.SMTP(smtp_server, int(smtp_port))
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"SMTP error sending email: {e}")
        return False

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

@router.post("/forgot-password")
async def forgot_password(body: ForgotPasswordRequest):
    user = USERS_DB.get(body.email)
    if not user:
        # Prevent user enumeration by acting as if it's sent
        return {"status": "success", "message": "If the email is registered, a reset link will be sent."}
    
    reset_token = create_token({"sub": user["id"], "email": body.email, "type": "reset"}, expires_delta=timedelta(minutes=15))
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
    reset_url = f"{frontend_url}/reset-password?token={reset_token}"
    
    email_sent = send_reset_email(body.email, reset_url)
    
    if email_sent:
        return {"status": "success", "message": "Reset link sent successfully to your email."}
    else:
        # Fallback to simulated mode for local previewing & ease of testing without SMTP
        return {
            "status": "simulated",
            "message": "SMTP not configured or failed. Reset link generated successfully.",
            "url": reset_url,
            "token": reset_token
        }

@router.post("/reset-password")
async def reset_password(body: ResetPasswordRequest):
    try:
        payload = jwt.decode(body.token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "reset":
            raise HTTPException(status_code=400, detail="Invalid reset token type")
        email = payload.get("email")
        user = USERS_DB.get(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        hashed = pwd_context.hash(body.new_password)
        USERS_DB[email]["hashed_password"] = hashed
        return {"status": "success", "message": "Password updated successfully."}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Expired or invalid reset token")
