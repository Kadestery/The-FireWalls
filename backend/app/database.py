from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# print(settings.postgres_user)
# print(settings.postgres_password)
# print(settings.postgres_db)

SQLALCHEMY_DATABASE_URL = f"postgresql://{settings.postgres_user}:{settings.postgres_password}@localhost:5433/{settings.postgres_db}"
print(SQLALCHEMY_DATABASE_URL)

engine = create_engine( SQLALCHEMY_DATABASE_URL )
#the engine is the way to connect to the database in sqlalchemy, it first translate the sqlalchemy sql code into normal sql with the database dialect then takes care of the connection pooling and then DBAPI makes the connection to the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
#use SessionLocal() to create a database session and connect to the database

Base = declarative_base()
##Base is the template to create the database models

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()