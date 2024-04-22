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
