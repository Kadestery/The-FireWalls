#You have deprecated linting or formatting settings for Python. Please see the logs for more details

from typing import Union

from fastapi import FastAPI

app = FastAPI()

#Get request to the root path
@app.get("/")
def read_root():
    return {"Hello": "World"}

#Get request to the /items/{item_id} path
@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

