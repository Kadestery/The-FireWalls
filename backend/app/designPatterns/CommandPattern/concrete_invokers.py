from .invoker import RoomInvoker
from sqlalchemy.orm import Session

class LivingRoom(RoomInvoker):
    def __init__(self, command=None):
        self.command = command

    def setCommand(self, command):
        self.command = command
        
    def executeCommand(self, db: Session, room_id: int):
        if self.command:
            self.command.execute()
        
class Kitchen(RoomInvoker):
    def __init__(self, command=None):
        self.command = command

    def setCommand(self, command):
        self.command = command
        
    def executeCommand(self, db: Session, room_id: int):
        if self.command:
            self.command.execute()
        
class Bedroom(RoomInvoker):
    def __init__(self, command=None):
        self.command = command

    def setCommand(self, command):
        self.command = command
        
    def executeCommand(self, db: Session, room_id: int):
        if self.command:
            self.command.execute()
        
class Bathroom(RoomInvoker):
    def __init__(self, command=None):
        self.command = command

    def setCommand(self, command):
        self.command = command
        
    def executeCommand(self, db: Session, room_id: int):
        if self.command:
            self.command.execute()