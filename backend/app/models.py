from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy import UniqueConstraint
from sqlalchemy.sql import func
from .database import Base  # Ensure you have a database module with Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String, unique=True)
    password_hash = Column(String)

    profiles = relationship("Profile", back_populates="user")


class Profile(Base):
    __tablename__ = "profiles"
    profile_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    profile_username = Column(String)
    profile_type = Column(String)
    user = relationship("Users", back_populates="profiles")

    # Add a composite unique constraint
    __table_args__ = (UniqueConstraint('user_id', 'profile_username', name='_user_profile_username_uc'),)

    user = relationship("User", back_populates="profiles")


