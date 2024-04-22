import unittest
from unittest.mock import patch

from backend.app.designPatterns.StatePattern.state import SecuritySystem, NormalMode, AwayMode


# Assuming the SecuritySystemState, NormalMode, AwayMode, and SecuritySystem classes are defined here

class TestSecuritySystemStatePattern(unittest.TestCase):
    def setUp(self):
        self.system = SecuritySystem()

    def test_normal_mode_temperature_change(self):
        with patch('builtins.print') as mocked_print:
            self.system.state = NormalMode(self.system)
            self.system.temperature_change(30)
            mocked_print.assert_called_with("Normal Mode: Current temperature is 30°C.")
          
