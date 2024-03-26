from fastapi import APIRouter, Depends
from ..database import get_db
from sqlalchemy.orm import Session
from ..crud import get_rooms_in_house
from .. import schemas



router = APIRouter(prefix="/room", tags=["room"])

from typing import List

@router.get("/getrooms", response_model=List[schemas.RoomState])
async def get_rooms(house_id: int, db: Session = Depends(get_db)):
    rooms = get_rooms_in_house(db, house_id)
    # Filter the room objects to only include the desired fields
    filtered_rooms = [ { "room_id": room.room_id, "profiles_in_room": [ {"profile_id": profile.profile_id, "profile_username": profile.profile_username, "profile_type": profile.profile_type} for profile in room.profiles ], "name": room.name, "room_type": room.room_type, "window_state": room.window_state, "door_state": room.door_state, "light_state": room.light_state } for room in rooms ]
    return filtered_rooms


