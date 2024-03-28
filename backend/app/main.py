from fastapi import FastAPI
from .routes import authRoutes, profileRoutes, roomRoutes, zoneRoutes



from .DB import models
from .DB.database import engine


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(authRoutes.router)   #Include the router from authRoutes.py
app.include_router(profileRoutes.router) #Include the router from profileRoutes.py
app.include_router(roomRoutes.router)    #Include the router from roomRoutes.py
app.include_router(zoneRoutes.router)    #Include the router from zoneRoutes.py

#Get request to the root path
@app.get("/")
def read_root():
    return {"Hello": "World"}



