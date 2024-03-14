from sqlalchemy.orm import Session
from . import models
from . import schemas


## Auth route CRUD operations
def create_user(db: Session, user_info: schemas.UserSignup) -> models.User:
    db_user = models.User(username=user_info.username, email=user_info.email, password_hash=user_info.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

##profileRoutes CRUD operations

def create_profile(db: Session, profile_info: schemas.ProfileCreate):
    user = db.query(models.User).filter(models.User.email == profile_info.email).first()
    db_profile = models.Profile(profile_username=profile_info.username, profile_type=profile_info.profileType, user_id=user.user_id)
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

def get_profiles(db: Session, user_email: str):
    user = db.query(models.User).filter(models.User.email == user_email).first()
    if not user:
        return []
    profiles = db.query(models.Profile).filter(models.Profile.user_id == user.user_id).all()

    # Extract 'profile_username' and 'profile_type' from each profile
    profile_info = [{"profile_username": profile.profile_username, "profile_type": profile.profile_type} for profile in profiles]

    return profile_info

def delete_profile(db: Session, profile_info: schemas.ProfileDelete):
    user = db.query(models.User).filter(models.User.email == profile_info.email).first()
    db.query(models.Profile).filter(models.Profile.user_id == user.user_id, models.Profile.profile_username == profile_info.profileUsername).delete()
    db.commit()
    return
    


