from abc import ABC, abstractmethod


class Command(ABC):
    """
    Defines an interface for commands.
    Concrete implementations should define how the command is executed.
    """
    @abstractmethod
    def execute(self):
        """
        Execute the command.
        """
        pass