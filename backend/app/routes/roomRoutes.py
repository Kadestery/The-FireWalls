from fastapi import APIRouter, Depends, HTTPException
from ..DB.database import get_db
from sqlalchemy.orm import Session
from ..DB.crud import get_rooms_in_house, get_profile_by_username, get_room_by_id, get_zones, change_motion_detector_state
from ..DB import schemas
from ..designPatterns.StrategyPattern.strategy_methods import get_permissions
from ..designPatterns.CommandPattern.command_methods import execute_all_command_methods

router = APIRouter(prefix="/room", tags=["room"])

@router.get("/getrooms", response_model=list[schemas.RoomState])
async def get_rooms(house_id: int, db: Session = Depends(get_db)):
    rooms = get_rooms_in_house(db, house_id)
    # Filter the room objects to only include the desired fields
    filtered_rooms = schemas.filter_rooms(rooms)
    return filtered_rooms


@router.put("/room-action")
async def perform_room_action(profile_commands: schemas.RoomAction, house_id: int, db: Session = Depends(get_db)) :
    # Retrieve the profile and room from the database
    profile = get_profile_by_username(db, profile_commands.profile_username)
    room = get_room_by_id(db, profile_commands.room_id) 
    
    if not profile or not room:
        raise HTTPException(status_code=404, detail="Profile or Room not found")
    
    # Check if the profile has permission to perform the action
    if not get_permissions(profile.profile_type.value, profile_commands.action_type):
        print("Permission denied")
        raise HTTPException(status_code=403, detail=f"Permission denied, {profile.profile_type.value} does not have permission to perform {profile_commands.action_type}")
    
    
    rooms = get_rooms_in_house(db, house_id)
    # Execute the command on the room object
    commang_log = execute_all_command_methods(db, profile_commands.room_id, room.room_type, profile_commands.action_type)
    print(commang_log)
    filtered_rooms = schemas.filter_rooms(rooms)
    zones = get_zones(db, house_id)
    filtered_zones = schemas.filter_zones(zones)
    return {"command_log": commang_log, "rooms": filtered_rooms, "zones": filtered_zones}


@router.put("/changemotiondetector")
async def change_motion_detector_status(room_info: schemas.AddMotionDetector, house_id: int, db: Session = Depends(get_db)):
    print("Changing motion detector status")
    change_motion_detector_state(db, room_info.room_id)
    rooms = get_rooms_in_house(db, house_id)
    filtered_rooms = schemas.filter_rooms(rooms)
    zones = get_zones(db, house_id)
    filtered_zones = schemas.filter_zones(zones)
    return {"rooms": filtered_rooms, "zones": filtered_zones}
        
        
        
    
    