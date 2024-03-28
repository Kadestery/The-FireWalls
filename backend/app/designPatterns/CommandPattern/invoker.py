from abc import ABC, abstractmethod
from .command import Command
from sqlalchemy.orm import Session

class RoomInvoker(ABC):
    
    @abstractmethod
    def setCommand(self, command: Command):
        pass
    
    
    @abstractmethod
    def executeCommand(self, db: Session, room_id: int):
        pass