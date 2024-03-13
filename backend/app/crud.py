from sqlalchemy.orm import Session
from . import models
from . import schemas



def create_user(db: Session, user_info: schemas.UserSignup) -> models.User:
    db_user = models.User(username=user_info.username, email=user_info.email, password_hash=user_info.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


