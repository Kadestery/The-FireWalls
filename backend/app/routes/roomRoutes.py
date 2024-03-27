from fastapi import APIRouter, Depends, HTTPException
from ..DB.database import get_db
from sqlalchemy.orm import Session
from ..DB.crud import get_rooms_in_house, get_profile_by_username, get_room_by_id
from ..DB import schemas
from ..designPatterns.StrategyPattern.strategy_methods import get_permissions

router = APIRouter(prefix="/room", tags=["room"])

from typing import List

@router.get("/getrooms", response_model=List[schemas.RoomState])
async def get_rooms(house_id: int, db: Session = Depends(get_db)):
    rooms = get_rooms_in_house(db, house_id)
    # Filter the room objects to only include the desired fields
    filtered_rooms = [ { "room_id": room.room_id, "profiles_in_room": [ {"profile_id": profile.profile_id, "profile_username": profile.profile_username, "profile_type": profile.profile_type} for profile in room.profiles ], "name": room.name, "room_type": room.room_type, "window_state": room.window_state, "door_state": room.door_state, "light_state": room.light_state } for room in rooms ]
    return filtered_rooms


from ..DB.models import Profile, Room
from sqlalchemy.orm import Session
from typing import Any

@router.put("/room-action")
async def perform_room_action(profile_commands: schemas.RoomAction, db: Session = Depends(get_db)) -> Any:
    # Retrieve the profile and room from the database
    profile = get_profile_by_username(db, profile_commands.profile_username)
    room = get_room_by_id(db, profile_commands.room_id)
    
    if not profile or not room:
        raise HTTPException(status_code=404, detail="Profile or Room not found")
    
    # Check if the profile has permission to perform the action
    if not get_permissions(profile.profile_type, profile_commands.action_type):
        raise HTTPException(status_code=403, detail="Permission denied")
        

    # Assuming action types directly correspond to changes on the room object
    # For example, if ActionType.CHANGE_LIGHT is received, it toggles the light state of the room
    # You'll need to adjust this part based on your actual ActionType enum and room model
    if profile_commands.action_type == schemas.ActionType.CHANGE_LIGHT:
        room.light_state = not room.light_state
    elif profile_commands.action_type == schemas.ActionType.CHANGE_WINDOW:
        room.window_state = not room.window_state
    elif profile_commands.action_type == schemas.ActionType.CHANGE_DOOR:
        room.door_state = not room.door_state
    else:
        raise HTTPException(status_code=400, detail="Unknown or unsupported action type")

    db.commit()  # Commit the changes to the database

    # Optionally, return the updated room state or all rooms in the house
    return {"message": "Action performed successfully"}