from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.main import app
from backend.app.DB.database import Base, get_db

# Setup a test database (use SQLite for simplicity)
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_get_user_profiles():
    response = client.get("/profile/getprofiles?email=test@example.com")
    assert response.status_code == 200
    assert type(response.json()) == list  # adjust based on expected data structure


def test_create_user_profile():
    profile_data = {"name": "John Doe", "email": "john@example.com"}  # adjust fields based on your ProfileCreate schema
    response = client.post("/profile/createprofile", json=profile_data)
    assert response.status_code == 200
    assert response.json()['email'] == "john@example.com"  # adjust checks based on response structure

def test_delete_user_profile():
    profile_info = {"id": 1, "email": "john@example.com"}  # adjust fields based on your ProfileDelete schema
    response = client.delete("/profile/deleteprofile", json=profile_info)
    assert response.status_code == 200
    assert type(response.json()) == list  # Check the return is as expected
