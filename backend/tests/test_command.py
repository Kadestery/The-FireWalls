import unittest
from unittest.mock import MagicMock, patch

from fastapi import HTTPException

from backend.app.DB.schemas import ActionType
from backend.app.designPatterns.CommandPattern.command_methods import get_room_type_class, get_command, \
    execute_all_command_methods
from backend.app.designPatterns.CommandPattern.concrete_commands import ChangeLightStateCommand, \
    ChangeWindowStateCommand, ChangeDoorStateCommand
from backend.app.designPatterns.CommandPattern.concrete_invokers import LivingRoom, Kitchen, Bedroom, Bathroom


# Assuming you've imported all necessary classes from your command pattern implementation
# You may need to adjust import statements depending on the actual structure of your project

class TestCommandPattern(unittest.TestCase):
    def test_get_room_type_class_valid_types(self):
        # Test for different types of rooms
        self.assertIsInstance(get_room_type_class("LivingRoom"), LivingRoom)
        self.assertIsInstance(get_room_type_class("Kitchen"), Kitchen)
        self.assertIsInstance(get_room_type_class("Bedroom"), Bedroom)
        self.assertIsInstance(get_room_type_class("Bathroom"), Bathroom)

    def test_get_room_type_class_invalid_type(self):
        # Test for invalid room type
        with self.assertRaises(ValueError):
            get_room_type_class("InvalidRoom")

    def test_get_command_valid_types(self):
        # Test if commands are correctly created based on ActionType
        with patch('your_module.Light') as MockLight, \
                patch('your_module.Window') as MockWindow, \
                patch('your_module.Door') as MockDoor:
            self.assertIsInstance(get_command(ActionType.CHANGE_LIGHT), ChangeLightStateCommand)
            self.assertIsInstance(get_command(ActionType.CHANGE_WINDOW), ChangeWindowStateCommand)
            self.assertIsInstance(get_command(ActionType.CHANGE_DOOR), ChangeDoorStateCommand)

    def test_get_command_invalid_type(self):
        # Test for invalid command type
        with self.assertRaises(HTTPException):
            get_command("InvalidAction")
