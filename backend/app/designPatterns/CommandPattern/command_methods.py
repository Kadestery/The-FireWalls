from .invoker import RoomInvoker
from .concrete_invokers import LivingRoom, Kitchen, Bedroom, Bathroom
from .command import Command
from .concrete_commands import ChangeLightStateCommand, ChangeWindowStateCommand, ChangeDoorStateCommand
from .receivers import Light, Window, Door
from app.DB.schemas import ActionType
from fastapi import HTTPException
from sqlalchemy.orm import Session
 
def get_room_type_class(room_type: str) -> RoomInvoker:
    if room_type == "LivingRoom":
        return LivingRoom()
    elif room_type == "Kitchen":
        return Kitchen()
    elif room_type == "Bedroom":
        return Bedroom()
    elif room_type == "Bathroom":
        return Bathroom()
    else:
        raise ValueError("Unsupported room type")
 
# Instantiate the correct command based on the action type
from fastapi import HTTPException

def get_command(command_type: ActionType) -> Command:
    # Initialize the command as None to ensure it's defined even if the action types don't match
    command = None

    # Instantiate the correct command based on the action type
    if command_type == ActionType.CHANGE_LIGHT:
        command = ChangeLightStateCommand(Light())
    elif command_type == ActionType.CHANGE_WINDOW:
        command = ChangeWindowStateCommand(Window())
    elif command_type == ActionType.CHANGE_DOOR:
        command = ChangeDoorStateCommand(Door())
    else:
        # If command_type does not match, immediately raise an exception
        raise HTTPException(status_code=400, detail="Unknown or unsupported action type")

    # Return the instantiated command
    return command

def set_command_on_room(concrete_room_invoker: RoomInvoker, concrete_command: Command):
    concrete_room_invoker.setCommand(concrete_command)
    return concrete_room_invoker

def execute_command_on_room(concrete_room_invoker: RoomInvoker, db: Session, room_id: int):
    return concrete_room_invoker.executeCommand(db, room_id)
    

def execute_all_command_methods(db: Session, room_id: int, room_type: str, action_type: ActionType):
    concrete_room_invoker = get_room_type_class(room_type)
    concrete_command = get_command(action_type)
    concrete_room_invoker = set_command_on_room(concrete_room_invoker, concrete_command)
    return execute_command_on_room(concrete_room_invoker, db, room_id)
