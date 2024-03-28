# receivers.py
from sqlalchemy.orm import Session
from app.DB.crud import get_room_by_id

class Light:
    @staticmethod
    def changeLight(db: Session, room_id: int):
        room = get_room_by_id(db, room_id)
        room.light_state = not room.light_state
        db.commit()
        print(room.light_state)
        if room.light_state == False:
            print("inside")
            return "Light turned off"
        else:
            return "Light turned on"

class Window:
    @staticmethod
    def changeWindow(db: Session, room_id: int):
        room = get_room_by_id(db, room_id)
        room.window_state = not room.window_state
        db.commit()
        if room.window_state == False:
            return "The window is closed"
        else:
            return "The window is open"

class Door:
    @staticmethod
    def changeDoor(db: Session, room_id: int):
        room = get_room_by_id(db, room_id)
        room.door_state = not room.door_state
        db.commit()
        if room.door_state == False:
            return "The door is closed"
        else:   
            return "The door is open"