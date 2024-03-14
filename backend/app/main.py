from fastapi import FastAPI
from .routes import authRoutes
from .routes import profileRoutes


from . import models
from .database import engine


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(authRoutes.router)   #Include the router from authRoutes.py
app.include_router(profileRoutes.router) #Include the router from profileRoutes.py

#Get request to the root path
@app.get("/")
def read_root():
    return {"Hello": "World"}



