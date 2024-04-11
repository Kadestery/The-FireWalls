from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..DB.crud import get_profiles, create_profile, delete_profile, change_room_to_profile, get_rooms_in_house, get_zones
from ..DB.database import get_db
from ..DB.schemas import ProfileCreate, ProfileDelete, RoomToProfileUpdate, filter_rooms, filter_zones


router = APIRouter(prefix="/profile", tags=["profile"])

@router.get("/getprofiles")
async def get_user_profiles(email: str, db: Session = Depends(get_db)):
    user_profiles = get_profiles(db, email)
    return user_profiles

@router.post("/createprofile")
async def create_user_profile(profile_info: ProfileCreate,db: Session = Depends(get_db)):
    user_profile = create_profile(db, profile_info)
    return user_profile

@router.delete("/deleteprofile")
async def delete_user_profile(profile_info: ProfileDelete, db: Session = Depends(get_db)):
    delete_profile(db, profile_info)
    user_profiles = get_profiles(db, profile_info.email)
    return user_profiles

@router.put("/room-to-profile")
async def room_to_profile(profile_info: RoomToProfileUpdate, house_id:int,  db: Session = Depends(get_db)):
    change_room_to_profile(db, profile_info)
    user_profiles = get_profiles(db, profile_info.email)
    rooms = get_rooms_in_house(db, house_id)
    # Filter the room objects to only include the desired fields
    filtered_rooms = filter_rooms(rooms)
    zones = get_zones(db, house_id)
    filtered_zones = filter_zones(zones)
    return {"user_profiles": user_profiles, "rooms": filtered_rooms, "zones": filtered_zones}