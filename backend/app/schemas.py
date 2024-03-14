from pydantic import BaseModel

class UserSignup(BaseModel):
    username: str
    email: str
    password: str 
    
class UserLogin(BaseModel):
    email: str
    password: str
    
class ProfileCreate(BaseModel):
    email:str
    username: str
    profileType: str
    
class ProfileDelete(BaseModel):
    email: str
    profileUsername: str

