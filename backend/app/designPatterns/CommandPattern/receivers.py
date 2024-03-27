# receivers.py
from sqlalchemy.orm import Session
from app.DB.crud import get_room_by_id

class Light:
    @staticmethod
    def changeLight(db: Session, room_id: int):
        room = get_room_by_id(db, room_id)
        room.light_state = not room.light_state
        db.commit()
        if room.light_state == False:
            return {"message": "The light is off"}
        else:
            return {"message": "The light is on"}

class Window:
    @staticmethod
    def changeWindow(db: Session, room_id: int):
        room = get_room_by_id(db, room_id)
        room.window_state = not room.window_state
        db.commit()
        if room.window_state == False:
            return {"message": "The window is closed"}
        else:
            return {"message": "The window is open"}

class Door:
    @staticmethod
    def changeDoor(db: Session, room_id: int):
        room = get_room_by_id(db, room_id)
        room.door_state = not room.door_state
        db.commit()
        if room.door_state == False:
            return {"message": "The door is closed"}
        else:   
            return {"message": "The door is open"}