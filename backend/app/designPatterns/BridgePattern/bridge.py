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

class Light(DeviceImplementation):
    def turn_on(self):
        print("Light turned on")

    def turn_off(self):
        print("Light turned off")

class Fan(DeviceImplementation):
    def turn_on(self):
        print("Fan turned on")

    def turn_off(self):
        print("Fan turned off")
