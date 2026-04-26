from typing import Literal, Optional
from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/events", tags=["events"])


@router.get("", response_model=list[schemas.EventResponse])
def list_events(
    category: Optional[Literal["A", "B"]] = Query(default=None),
    db: Session = Depends(get_db),
):
    return crud.get_events(db, category=category)


@router.get("/{event_id}", response_model=schemas.EventResponse)
def get_event(event_id: str, db: Session = Depends(get_db)):
    return crud.get_event(db, event_id)


@router.post("", response_model=schemas.EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(data: schemas.EventCreate, db: Session = Depends(get_db)):
    return crud.create_event(db, data)


@router.put("/{event_id}", response_model=schemas.EventResponse)
def update_event(event_id: str, data: schemas.EventUpdate, db: Session = Depends(get_db)):
    return crud.update_event(db, event_id, data)


@router.patch("/{event_id}", response_model=schemas.EventResponse)
def patch_event(event_id: str, data: schemas.EventPatch, db: Session = Depends(get_db)):
    return crud.patch_event(db, event_id, data)


@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(event_id: str, db: Session = Depends(get_db)):
    crud.delete_event(db, event_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
