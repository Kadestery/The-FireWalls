from pydantic import BaseModel

class UserSignup(BaseModel):
    username: str
    email: str
    password: str 
    
class UserLogin(BaseModel):
    email: str
    password: str
    
class ProfileCreate(BaseModel):
    email:str
    username: str
    profile_type: str
    
class ProfileDelete(BaseModel):
    email: str
    profile_username: str
    
class ProfileState(BaseModel):
    profile_id: int
    profile_username: str
    profile_type: str 
    
class RoomState(BaseModel):
    room_id: int
    profiles_in_room: list[ProfileState]
    name: str
    room_type:str
    window_state: bool
    door_state: bool
    light_state: bool  
    

    
class RoomToProfileUpdate(BaseModel):
    email: str
    profile_username: str
    room_id: int

