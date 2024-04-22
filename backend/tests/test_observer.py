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
