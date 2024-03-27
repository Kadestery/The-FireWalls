from app.DB.schemas import ActionType
from abc import ABC, abstractmethod
from app.DB.schemas import ActionType


class PermissionStrategy(ABC):
    """
    Defines an interface for permission strategies.
    Concrete implementations should define how permissions
    are handled for different actions.
    """
    @abstractmethod
    def has_permission(self, action: ActionType) -> bool:
        """
        Determine if the current strategy allows performing the given action.

        Parameters:
        - action (ActionType): The action to check permission for.

        Returns:
        - bool: True if the action is permitted, False otherwise.
        """
        pass

class ParentPermissionStrategy(PermissionStrategy):
    def has_permission(self, action: ActionType) -> bool:
        return True  # Assume parents have all permissions for simplicity


class ChildPermissionStrategy(PermissionStrategy):
    def has_permission(self, action: ActionType) -> bool:
        # Assume children can change light and window but not door for simplicity
        return action in [ActionType.CHANGE_LIGHT, ActionType.CHANGE_WINDOW]


class GuestPermissionStrategy(PermissionStrategy):
    def has_permission(self, action: ActionType) -> bool:
        # Assume guests can only change light state for simplicity
        return action == ActionType.CHANGE_LIGHT


class StrangerPermissionStrategy(PermissionStrategy):
    def has_permission(self, action: ActionType) -> bool:
        return False  # Strangers have no permissions
    

class Context:
    """
    Context class that holds a reference to the current permission strategy.
    """
    def __init__(self, permission_strategy: PermissionStrategy):
        self.permission_strategy = permission_strategy

    def set_permission_strategy(self, permission_strategy: PermissionStrategy):
        self.permission_strategy = permission_strategy

    def executeStrategy(self, action: ActionType) -> bool:
        return self.permission_strategy.has_permission(action)