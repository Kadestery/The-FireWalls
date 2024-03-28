from pydantic import BaseModel
from enum import Enum, auto

class ActionType(Enum):
    CHANGE_LIGHT = "changeLight"
    CHANGE_DOOR = "changeDoor"
    CHANGE_WINDOW = "changeWindow"
    
class ProfileType(Enum):
    parent = "parent"
    child = "child"
    guest = "guest"
    stranger = "stranger"

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


    
class RoomAction(BaseModel):
    room_id: int
    profile_username: str
    action_type: ActionType
    
    
    
##
##

class TemperatureSettingBase(BaseModel):
    period: int
    temp: int

class ZoneCreate(BaseModel):
    name: str
    temperature_settings: list[TemperatureSettingBase]

class ZoneUpdate(ZoneCreate):
    pass

class Zone(TemperatureSettingBase):
    zone_id: int
    house_id: int
    name: str
    temperature_settings: list[TemperatureSettingBase]

    class Config:
        orm_mode = True #When you set orm_mode = True, Pydantic treats the dictionary returned by the ORM as a special dictionary, enabling it to access attributes on ORM models as if they were dictionary keys. 

