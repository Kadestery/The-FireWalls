from sqlalchemy.orm import Session
from . import models
from . import schemas

## Auth route CRUD operations
def create_user(db: Session, user_info: schemas.UserSignup) -> models.User:
    db_user = models.User(username=user_info.username, email=user_info.email, password_hash=user_info.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()



#profileRoutes CRUD operations

def create_profile(db: Session, profile_info: schemas.ProfileCreate):
    user = db.query(models.User).filter(models.User.email == profile_info.email).first()
    db_profile = models.Profile(profile_username=profile_info.username, profile_type=profile_info.profile_type, user_id=user.user_id)
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

def get_profiles(db: Session, user_email: str):
    user = db.query(models.User).filter(models.User.email == user_email).first()
    if not user:
        return []
    profiles = db.query(models.Profile).filter(models.Profile.user_id == user.user_id).all()

    # Extract 'profile_username' and 'profile_type' from each profile
    profile_info = [{"profile_username": profile.profile_username, "profile_type": profile.profile_type, "profile_room": profile.room.name if profile.room is not None else None} for profile in profiles]

    return profile_info

def delete_profile(db: Session, profile_info: schemas.ProfileDelete):
    user = db.query(models.User).filter(models.User.email == profile_info.email).first()
    db.query(models.Profile).filter(models.Profile.user_id == user.user_id, models.Profile.profile_username == profile_info.profile_username).delete()
    db.commit()
    return

def change_room_to_profile(db: Session, profile_and_room: schemas.RoomToProfileUpdate):
    user = db.query(models.User).filter(models.User.email == profile_and_room.email).first()
    profile = db.query(models.Profile).filter(models.Profile.user_id == user.user_id, models.Profile.profile_username == profile_and_room.profile_username).first()
    profile.room_id = profile_and_room.room_id
    db.commit()
    return

def get_profile_by_username(db: Session, profile_username: str):
    return db.query(models.Profile).filter(models.Profile.profile_username == profile_username).first()
#
#
#
## House route CRUD operations
def create_house(db: Session, user_id: int) -> models.House:
    new_house = models.House(user_id=user_id)
    db.add(new_house)
    db.commit()
    db.refresh(new_house)
    return new_house

def get_house(db: Session, user_id: int):
    return db.query(models.House).filter(models.House.user_id == user_id).first()


def close_all_house_windows(db: Session, house_id: int):
    rooms = db.query(models.Room).filter(models.Room.house_id == house_id).all()
    for room in rooms:
        room.window_state = False
    db.commit()
    return 


#
#
#
## Room route CRUD operations
    
def create_room(db: Session, house_id: int, room_info: dict) -> models.Room:
    # Initialize room with mandatory attributes
    new_room = models.Room(
        house_id=house_id,
        name=room_info["name"],
        room_type=room_info["room_type"]
    ) 
    # Conditionally add optional attributes if they exist in room_info
    if "window" in room_info:
        new_room.window_state = room_info["window"]
    if "door" in room_info:
        new_room.door_state = room_info["door"]
    if "light" in room_info:
        new_room.light_state = room_info["light"]

    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return new_room

def get_rooms_in_house(db: Session, house_id: int):
    rooms = db.query(models.Room).filter(models.Room.house_id == house_id).order_by(models.Room.room_id).all()
    return rooms

def get_room_by_id(db: Session, room_id: int):
    return db.query(models.Room).filter(models.Room.room_id == room_id).first()

#
#
#
## Zone route CRUD operations
    
def create_zone(db: Session, house_id: int, temperature:int) -> models.Zone:
    new_zone = models.Zone(house_id=house_id, temperature=temperature)
    db.add(new_zone)
    db.commit()
    db.refresh(new_zone)
    return new_zone

def add_room_to_zone(db: Session, room_id: int, zone_id: int):
    room = db.query(models.Room).filter(models.Room.room_id == room_id).first()
    room.zone_id = zone_id
    db.commit()
    return

def get_zones(db: Session, house_id: int):
    zones = db.query(models.Zone).filter(models.Zone.house_id == house_id).order_by(models.Zone.zone_id).all()
    return zones

def change_zone_temperature(db: Session, zone_id: int, temperature: int):
    zone = db.query(models.Zone).filter(models.Zone.zone_id == zone_id).first()
    zone.temperature = temperature
    db.commit()
    return get_zones(db, zone.house_id)

def delete_zone(db: Session, zone_id: int):
    db.query(models.Zone).filter(models.Zone.zone_id == zone_id).delete()
    db.commit()
    return

def change_zone_of_room(db: Session, room_id: int, zone_id: int):
    room = db.query(models.Room).filter(models.Room.room_id == room_id).first()
    room.zone_id = zone_id
    db.commit()
    # Check if the zone has no rooms inside
    rooms_in_zone = db.query(models.Room).filter(models.Room.zone_id == zone_id).all()
    if not rooms_in_zone:
        delete_zone(db, zone_id)
    return get_zones(db, room.house_id)

def change_motion_detector_state(db: Session, room_id: int):
    room = db.query(models.Room).filter(models.Room.room_id == room_id).first()
    room.motion_detector = not room.motion_detector
    db.commit()
    return


