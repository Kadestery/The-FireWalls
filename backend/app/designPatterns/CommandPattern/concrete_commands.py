from .command import Command
from .receivers import Light, Window, Door
from sqlalchemy.orm import Session

class ChangeLightStateCommand(Command):
    def __init__(self, light: Light):
        self.light = light
        
    def execute(self, db: Session, room_id: int):
        self.light.changeLight(db, room_id)
        

class ChangeWindowStateCommand(Command):
    def __init__(self, window: Window):
        self.window = window
        
    def execute(self, db: Session, room_id: int):
        self.window.changeWindow(db, room_id)
        
        
class ChangeDoorStateCommand(Command):
    def __init__(self, door: Door):
        self.door = door
        
    def execute(self, db: Session, room_id: int):
        self.door.changeDoor(db, room_id)
        

