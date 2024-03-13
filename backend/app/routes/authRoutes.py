from fastapi import APIRouter, HTTPException, Depends
from ..schemas import UserSignup
from ..crud import create_user, get_user_by_email
from sqlalchemy.orm import Session
from ..database import get_db
import bcrypt

router = APIRouter(prefix="/auth", tags=["auth"])

# Hash a password using bcrypt
def hash_password(password):
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password=pwd_bytes, salt=salt)
    return hashed_password

# Check if the provided password matches the stored password (hashed)
def verify_password(plain_password, hashed_password):
    password_byte_enc = plain_password.encode('utf-8')
    return bcrypt.checkpw(password = password_byte_enc , hashed_password = hashed_password)


@router.post("/signup")
async def read_users(userSignup: UserSignup, db: Session = Depends(get_db)):
    
    has_same_email = get_user_by_email(db, email=userSignup.email)
    if has_same_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    userSignup.password = hash_password(userSignup.password)
    create_user(db=db, user_info=userSignup)
    return {"username": userSignup.username, "email": userSignup.email}
    