from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.main import app
from backend.app.DB.database import Base, get_db
import pytest
import bcrypt

# Mock database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture
def mock_user():
    user_info = {'email': 'test@example.com', 'password': bcrypt.hashpw('password'.encode(), bcrypt.gensalt()).decode()}
    return user_info


def test_signup_new_user(mock_user):
    response = client.post("/auth/signup", json={
        "username": "testuser",
        "email": mock_user['email'],
        "password": "password"
    })
    assert response.status_code == 200
    assert response.json()['email'] == "test@example.com"


def test_login_existing_user(mock_user):
    response = client.post("/auth/login", json={
        "email": mock_user['email'],
        "password": "password"
    })
    assert response.status_code == 200
    assert response.json()['email'] == "test@example.com"
    
