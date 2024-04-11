from fastapi import APIRouter, Depends
from ..DB.database import get_db
from sqlalchemy.orm import Session
from ..DB.crud import close_all_house_windows, get_rooms_in_house, get_zones
from ..DB.schemas import filter_rooms, filter_zones


router = APIRouter(prefix="/house", tags=["house"])

@router.put("/setHouseOnAwayMode")
async def set_house_on_away_mode(house_id: int, db: Session = Depends(get_db)):
    close_all_house_windows(db, house_id)
    rooms = get_rooms_in_house(db, house_id)
    filtered_rooms = filter_rooms(rooms)
    zones = get_zones(db, house_id)
    filtered_zones = filter_zones(zones)
    return {"rooms": filtered_rooms, "zones": filtered_zones, "command_log": "All windows closed"}
    
    