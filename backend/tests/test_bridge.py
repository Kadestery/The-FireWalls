import unittest
from unittest.mock import patch
from backend.app.designPatterns.BridgePattern.bridge import Device, Light, Fan  # Replace with the actual module name

class TestBridgePattern(unittest.TestCase):
    def test_light_turn_on(self):
        light = Light()
        device = Device(light)
        with patch('builtins.print') as mocked_print:
            device.turn_on()
            mocked_print.assert_called_with("Light turned on")
            
    def test_light_turn_off(self):
        light = Light()
        device = Device(light)
        with patch('builtins.print') as mocked_print:
            device.turn_off()
            mocked_print.assert_called_with("Light turned off")

    def test_fan_turn_on(self):
        fan = Fan()
        device = Device(fan)
        with patch('builtins.print') as mocked_print:
            device.turn_on()
            mocked_print.assert_called_with("Fan turned on")


    def test_fan_turn_off(self):
        fan = Fan()
        device = Device(fan)
        with patch('builtins.print') as mocked_print:
            device.turn_off()
            mocked_print.assert_called_with("Fan turned off")

if __name__ == '__main__':
    unittest.main()
