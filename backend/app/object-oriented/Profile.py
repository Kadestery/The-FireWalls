from enum import Enum, auto

class UserType(Enum):
    PARENT = auto()
    CHILD = auto()
    GUEST = auto()
    STRANGER = auto()

class Profile:
    def __init__(self, username, user_type: UserType):
        self.username = username
        self.user_type = user_type