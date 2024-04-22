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
