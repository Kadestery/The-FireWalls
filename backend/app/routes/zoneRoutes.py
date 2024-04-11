from fastapi import APIRouter, Depends
from ..DB.database import get_db
from sqlalchemy.orm import Session
from ..DB.crud import get_zones, change_zone_temperature , change_zone_of_room, get_rooms_in_house
from ..DB.schemas import ChangeZoneTemperature, ChangeZoneOfRoom,filter_rooms, filter_zones

router = APIRouter(prefix="/zone", tags=["zone"])


@router.get("/getzones")
async def get_house_zones(house_id: int , db: Session = Depends(get_db)):
    zones = get_zones(db, house_id)
    filtered_zones = filter_zones(zones)
    return filtered_zones


@router.put("/changezonetemperature")
async def change_temperature_of_zone(zone_info: ChangeZoneTemperature, house_id:int, db: Session = Depends(get_db)):
    zones = change_zone_temperature(db, zone_info.zone_id, zone_info.temperature)
    filtered_zones = filter_zones(zones)
    rooms = get_rooms_in_house(db, house_id)
    filtered_rooms = filter_rooms(rooms)
    return {"zones": filtered_zones, "rooms": filtered_rooms, "command_log": f"Temperature changed to {zone_info.temperature} in zone {zone_info.zone_id}"}


@router.put("/changezoneofroom")  
async def change_room_zone(zone_info: ChangeZoneOfRoom, house_id:int, db: Session = Depends(get_db)):
    zones = change_zone_of_room(db, zone_info.room_id, zone_info.new_zone_id)
    filtered_zones = filter_zones(zones)
    rooms = get_rooms_in_house(db, house_id)
    filtered_rooms = filter_rooms(rooms)
    return {"zones": filtered_zones, "rooms": filtered_rooms, "command_log": f"changed zone of {zone_info.room_name} from {zone_info.previous_zone_id} to {zone_info.new_zone_id}"}