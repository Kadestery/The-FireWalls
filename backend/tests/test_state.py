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

    def test_away_mode_temperature_change_below_threshold(self):
        with patch('builtins.print') as mocked_print:
            self.system.state = AwayMode(self.system)
            self.system.last_temperature = 30
            self.system.temperature_change(40)  # Temperature increase of 10°C, below the 15°C threshold
            mocked_print.assert_called_with("Away Mode: Current temperature is 40°C.")

    def test_away_mode_temperature_change_above_threshold(self):
        with patch('builtins.print') as mocked_print, \
             patch.object(self.system, 'notify_user') as mock_notify, \
             patch.object(self.system, 'set_state') as mock_set_state:
            self.system.state = AwayMode(self.system)
            self.system.last_temperature = 20
            self.system.temperature_change(40)  # Temperature increase of 20°C, above the 15°C threshold
            mocked_print.assert_any_call(f"Temperature increased significantly by 20°C. Switching to Normal Mode due to potential risk.")
            mock_notify.assert_called_with("Alert: Temperature increased by 20°C. Away mode deactivated for safety.")
            mock_set_state.assert_called()

    def test_system_set_state(self):
        with patch('builtins.print') as mocked_print:
            self.system.set_state(AwayMode(self.system))
            mocked_print.assert_called_with("System state changed to AwayMode.")

    def test_notify_user(self):
        with patch('builtins.print') as mocked_print:
            self.system.notify_user("Testing notification.")
            mocked_print.assert_called_with("Notification to user: Testing notification.")

if __name__ == '__main__':
    unittest.main()
