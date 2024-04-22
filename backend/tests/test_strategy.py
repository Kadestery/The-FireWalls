import unittest
from unittest.mock import MagicMock

from fastapi import HTTPException

from backend.app.DB.schemas import ActionType
from backend.app.designPatterns.StrategyPattern.permission_strategies import ParentPermissionStrategy, \
    ChildPermissionStrategy, GuestPermissionStrategy, StrangerPermissionStrategy, Context
# Assuming you've imported all necessary classes and ActionType from your actual project structure

from backend.app.designPatterns.StrategyPattern.strategy_methods import get_permissions


class TestPermissionStrategies(unittest.TestCase):
    def test_parent_permission_strategy(self):
        strategy = ParentPermissionStrategy()
        self.assertTrue(strategy.has_permission(ActionType.CHANGE_LIGHT))
        self.assertTrue(strategy.has_permission(ActionType.CHANGE_WINDOW))
        self.assertTrue(strategy.has_permission(ActionType.CHANGE_DOOR))

    def test_child_permission_strategy(self):
        strategy = ChildPermissionStrategy()
        self.assertTrue(strategy.has_permission(ActionType.CHANGE_LIGHT))
        self.assertTrue(strategy.has_permission(ActionType.CHANGE_WINDOW))
        self.assertFalse(strategy.has_permission(ActionType.CHANGE_DOOR))

    def test_guest_permission_strategy(self):
        strategy = GuestPermissionStrategy()
        self.assertTrue(strategy.has_permission(ActionType.CHANGE_LIGHT))
        self.assertFalse(strategy.has_permission(ActionType.CHANGE_WINDOW))
        self.assertFalse(strategy.has_permission(ActionType.CHANGE_DOOR))

    def test_stranger_permission_strategy(self):
        strategy = StrangerPermissionStrategy()
        self.assertFalse(strategy.has_permission(ActionType.CHANGE_LIGHT))
        self.assertFalse(strategy.has_permission(ActionType.CHANGE_WINDOW))
        self.assertFalse(strategy.has_permission(ActionType.CHANGE_DOOR))

    def test_context_strategy_execution(self):
        context = Context()
        context.set_permission_strategy(ParentPermissionStrategy())
        self.assertTrue(context.executeStrategy(ActionType.CHANGE_LIGHT))

    def test_permission_assignment_by_profile(self):
        # This tests the function `get_permissions` in your application
        self.assertTrue(get_permissions("parent", ActionType.CHANGE_DOOR))
        self.assertTrue(get_permissions("child", ActionType.CHANGE_LIGHT))
        self.assertFalse(get_permissions("child", ActionType.CHANGE_DOOR))
        self.assertTrue(get_permissions("guest", ActionType.CHANGE_LIGHT))
        self.assertFalse(get_permissions("guest", ActionType.CHANGE_DOOR))
        self.assertFalse(get_permissions("stranger", ActionType.CHANGE_LIGHT))

        with self.assertRaises(HTTPException):
            get_permissions("unknown", ActionType.CHANGE_LIGHT)

if __name__ == '__main__':
    unittest.main()
