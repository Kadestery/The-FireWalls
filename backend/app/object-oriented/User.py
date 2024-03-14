from . import Profile

class User:
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        self.profiles = []  # List of Profile objects

    def add_profile(self, profile:Profile):
        if isinstance(profile, Profile):
            self.profiles.append(profile)
    
    def delete_profile(self, profile_username:str) -> list:
        self.profiles = [profile for profile in self.profiles if profile.username != profile_username]
        return self.profiles

    def edit_user(self, username=None, email=None, password=None):
        if username is not None:
            self.username = username
        if email is not None:
            self.email = email
        if password is not None:
            self.password = password

