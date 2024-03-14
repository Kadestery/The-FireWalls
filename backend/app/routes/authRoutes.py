from fastapi import APIRouter, HTTPException, Depends
from ..schemas import UserSignup, UserLogin
from ..crud import create_user, get_user_by_email
from sqlalchemy.orm import Session
from ..database import get_db
import bcrypt

router = APIRouter(prefix="/auth", tags=["auth"])

# Hash a password using bcrypt
def hash_password(password):
    # Convert the password string to bytes
    pwd_bytes = password.encode('utf-8')
    # Generate a salt
    salt = bcrypt.gensalt()
    # Hash the password (which is now in bytes)
    hashed_password = bcrypt.hashpw(pwd_bytes, salt)
    # Return the hashed password encoded in utf-8 to store it as a string in the database
    return hashed_password.decode('utf-8')

# Check if the provided password matches the stored password (hashed)
def verify_password(plain_password, hashed_password):
    # Convert the plain password and the stored hashed password to bytes
    password_byte_enc = plain_password.encode('utf-8')
    hashed_password_bytes = hashed_password.encode('utf-8')
    # Check if the provided password matches the stored hashed password
    return bcrypt.checkpw(password_byte_enc, hashed_password_bytes)


@router.post("/signup")
async def create_users(userSignup: UserSignup, db: Session = Depends(get_db)):
    
    has_same_email = get_user_by_email(db, email=userSignup.email)
    if has_same_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    userSignup.password = hash_password(userSignup.password)
    create_user(db=db, user_info=userSignup)
    return {"username": userSignup.username, "email": userSignup.email}


@router.post("/login")
async def login_user(userLogin: UserLogin, db: Session = Depends(get_db)):
    user = get_user_by_email(db, userLogin.email)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid email")
    if not verify_password(userLogin.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid password")
    return {"username": user.username, "email": user.email}