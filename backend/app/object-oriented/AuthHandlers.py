from fastapi import HTTPException
from sqlalchemy.orm import Session
from .Handler import Handler
from .crud import create_user, get_user_by_email, verify_password

class SignupHandler(Handler):
    def handle(self, request: dict, db: Session) -> str:
        if request.get("type") == "signup":
            email = request.get("email")
            if get_user_by_email(db, email):
                raise HTTPException(status_code=400, detail="Email already registered")
            create_user(db=db, user_info=request)
            return f"User {email} successfully signed up."
        else:
            return super().handle(request, db)

class LoginHandler(Handler):
    def handle(self, request: dict, db: Session) -> str:
        if request.get("type") == "login":
            email = request.get("email")
            user = get_user_by_email(db, email)
            if user is None or not verify_password(request.get("password"), user.password_hash):
                raise HTTPException(status_code=400, detail="Invalid login")
            return f"User {email} successfully logged in."
        else:
            return super().handle(request, db)