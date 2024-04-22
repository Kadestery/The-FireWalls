from abc import ABC, abstractmethod

class SecuritySystemState(ABC):
    def __init__(self, system):
        self.system = system

    @abstractmethod
    def handle_temperature_change(self, temperature):
        pass

class NormalMode(SecuritySystemState):
    def handle_temperature_change(self, temperature):
        print(f"Normal Mode: Current temperature is {temperature}°C.")

class AwayMode(SecuritySystemState):
    def handle_temperature_change(self, temperature):
        if temperature - self.system.last_temperature >= 15:
            print(f"Temperature increased significantly by {temperature - self.system.last_temperature}°C. Switching to Normal Mode due to potential risk.")
            self.system.notify_user(f"Alert: Temperature increased by {temperature - self.system.last_temperature}°C. Away mode deactivated for safety.")
            self.system.set_state(NormalMode(self.system))
        else:
            print(f"Away Mode: Current temperature is {temperature}°C.")
        self.system.last_temperature = temperature

class SecuritySystem:
    def __init__(self):
        self.state = NormalMode(self)
        self.last_temperature = 25  # Initial baseline temperature

    def set_state(self, state):
        self.state = state
        print(f"System state changed to {state.__class__.__name__}.")

    def notify_user(self, message):
        # Simulate sending a notification to the user
        print("Notification to user:", message)

    def temperature_change(self, temperature):
        self.state.handle_temperature_change(temperature)



