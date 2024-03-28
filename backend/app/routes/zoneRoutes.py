from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..DB import crud, schemas
from ..DB.database import get_db

router = APIRouter(prefix="/zones", tags=["zones"])

@router.post("/", response_model=schemas.Zone)
def create_zone(zone_create: schemas.ZoneCreate, house_id: int, db: Session = Depends(get_db)):
    return crud.create_zone(db=db, zone_create=zone_create, house_id=house_id)

@router.get("/", response_model=List[schemas.Zone])
def read_zones(house_id: int, db: Session = Depends(get_db)):
    zones = crud.get_zones(db=db, house_id=house_id)
    if zones is None:
        raise HTTPException(status_code=404, detail="Zones not found")
    return zones

@router.put("/{zone_id}", response_model=schemas.Zone)
def update_zone(zone_id: int, zone_update: schemas.ZoneUpdate, db: Session = Depends(get_db)):
    return crud.update_zone(db=db, zone_id=zone_id, zone_update=zone_update)

@router.delete("/{zone_id}")
def delete_zone(zone_id: int, db: Session = Depends(get_db)):
    crud.delete_zone(db=db, zone_id=zone_id)
    return {"ok": True}