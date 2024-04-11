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
    

class ChangeZoneTemperature(BaseModel):
    temperature: int
    zone_id: int  
    
class ChangeZoneOfRoom(BaseModel):
    room_id: int
    room_name: str
    new_zone_id: int
    previous_zone_id: int
    
def filter_zones(zones):
    return  [ { "zone_id": zone.zone_id, "house_id": zone.house_id, "temperature": zone.temperature, "rooms": [ { "room_id": room.room_id, "name": room.name, "room_type": room.room_type, "window_state": room.window_state, "door_state": room.door_state, "light_state": room.light_state, "profiles_in_room": [ { "profile_id": profile.profile_id, "profile_username": profile.profile_username, "profile_type": profile.profile_type } for profile in room.profiles ] } for room in zone.rooms ] } for zone in zones ]

def filter_rooms(rooms):
    return [ { "room_id": room.room_id, "zone_id": room.zone_id, "profiles_in_room": [ {"profile_id": profile.profile_id, "profile_username": profile.profile_username, "profile_type": profile.profile_type} for profile in room.profiles ], "name": room.name, "room_type": room.room_type, "window_state": room.window_state, "door_state": room.door_state, "light_state": room.light_state } for room in rooms ]
 
    
