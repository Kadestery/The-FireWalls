# Abstraction interface
class Device:
    def __init__(self, implementation):
        self.implementation = implementation

    def turn_on(self):
        self.implementation.turn_on()

    def turn_off(self):
        self.implementation.turn_off()

# Implementation interface
class DeviceImplementation:
    def turn_on(self):
        pass

    def turn_off(self):
        pass

