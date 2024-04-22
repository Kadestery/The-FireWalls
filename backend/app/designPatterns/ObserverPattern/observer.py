
class Observer:
    def update(self, data):
        """Receive update from subject."""
        pass

class Subject:
    def __init__(self):
        self._observers = []

    def add_observer(self, observer):
        self._observers.append(observer)

    def remove_observer(self, observer):
        self._observers.remove(observer)

    def notify_observers(self, data):
        for observer in self._observers:
            observer.update(data)


class TemperatureSensor(Subject):
    def set_temperature(self, temperature):
        # Simulate temperature measurement and notify observers
        print(f"TemperatureSensor: temperature has been set to {temperature}°C.")
        self.notify_observers(temperature)

class UserInterface(Observer):
    def update(self, temperature):
        print(f"UserInterface: Temperature changed to {temperature}°C")
        if temperature <= 0:
            self.alert(temperature)

    def alert(self, temperature):
        print(f"UserInterface Alert: Temperature is {temperature}°C! Beware of freezing conditions.")

