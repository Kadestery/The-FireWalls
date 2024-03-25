from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..crud import get_profiles, create_profile, delete_profile
from ..database import get_db
from ..schemas import ProfileCreate, ProfileDelete


router = APIRouter(prefix="/profile", tags=["profile"])

@router.get("/getprofiles")
async def get_user_profiles(email: str, db: Session = Depends(get_db)):
    user_profiles = get_profiles(db, email)
    return user_profiles

@router.post("/createprofile")
async def create_user_profile(profile_info: ProfileCreate,db: Session = Depends(get_db)):
    user_profile = create_profile(db, profile_info)
    return user_profile

@router.delete("/deleteprofile")
async def delete_user_profile(profile_info: ProfileDelete, db: Session = Depends(get_db)):
    delete_profile(db, profile_info)
    user_profiles = get_profiles(db, profile_info.email)
    return user_profiles
    