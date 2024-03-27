from abc import ABC, abstractmethod
from .command import Command

class RoomInvoker(ABC):
    
    @abstractmethod
    def setCommand(self, command: Command):
        pass
    
    
    @abstractmethod
    def executeCommand(self):
        pass