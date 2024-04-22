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
