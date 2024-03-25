from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Boolean
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
    house = relationship("House", back_populates="user", uselist=False)


class Profile(Base):
    __tablename__ = "profiles"
    profile_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    profile_username = Column(String)
    profile_type = Column(String)
    
    room_id = Column(Integer, ForeignKey('rooms.room_id'), nullable=True)
    # nullable=True means a profile might not be associated with any room
    
    user = relationship("User", back_populates="profiles")
    room = relationship("Room", back_populates="profiles", uselist=False)  # uselist=False indicates one-to-one relationship
    
    __table_args__ = (UniqueConstraint('user_id', 'profile_username', name='_user_profile_username_uc'),)
    
    
class House(Base):
    __tablename__ = "houses"
    
    house_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), unique=True)
    
    user = relationship("User", back_populates="house")
    rooms = relationship("Room", back_populates="house")
    
    
class Room(Base):
    __tablename__ = "rooms"
    
    room_id = Column(Integer, primary_key=True)
    house_id = Column(Integer, ForeignKey('houses.house_id'))
    name = Column(String)
    room_type = Column(String)
    window_state = Column(Boolean, default=False)  # False for closed, True for open
    door_state = Column(Boolean, default=False)
    light_state = Column(Boolean, default=False)
    
    house = relationship("House", back_populates="rooms")
    profiles = relationship("Profile", back_populates="room")
    
    # Adjusted to enforce uniqueness of room names within each house
    __table_args__ = (UniqueConstraint('house_id', 'name', name='_house_room_name_uc'),)
    


