import unittest
from unittest.mock import patch

from backend.app.designPatterns.ObserverPattern.observer import Subject, Observer, UserInterface, TemperatureSensor


# Assume the Observer, Subject, TemperatureSensor, and UserInterface classes are defined here

class TestObserverPattern(unittest.TestCase):

    def test_subject_add_remove_observer(self):
        subject = Subject()
        observer = Observer()
        subject.add_observer(observer)
        self.assertIn(observer, subject._observers)
        subject.remove_observer(observer)
        self.assertNotIn(observer, subject._observers)

    def test_temperature_sensor_notify(self):
        sensor = TemperatureSensor()
        observer = Observer()
        sensor.add_observer(observer)

        with patch.object(observer, 'update') as mock_update:
            sensor.set_temperature(25)
            mock_update.assert_called_once_with(25)

    def test_user_interface_update(self):
        ui = UserInterface()

        with patch('builtins.print') as mocked_print:
            ui.update(25)
            mocked_print.assert_called_with("UserInterface: Temperature changed to 25°C")

    def test_user_interface_alert(self):
        ui = UserInterface()

        with patch('builtins.print') as mocked_print:
            ui.update(-5)
            # Check if alert was triggered
            mocked_print.assert_any_call("UserInterface Alert: Temperature is -5°C! Beware of freezing conditions.")

if __name__ == '__main__':
    unittest.main()
