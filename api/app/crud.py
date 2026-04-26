from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from app import models, schemas


def get_events(db: Session, category: str | None = None) -> list[models.Event]:
    q = db.query(models.Event)
    if category:
        q = q.filter(models.Event.category == category)
    return q.all()


def get_event(db: Session, event_id: str) -> models.Event:
    event = db.get(models.Event, event_id)
    if not event:
        raise HTTPException(status_code=404, detail=f"Event {event_id} not found")
    return event


def create_event(db: Session, data: schemas.EventCreate) -> models.Event:
    event = models.Event(
        id=data.id,
        title=data.title,
        description=data.description,
        address=data.address,
        country=data.country,
        category=data.category,
        lat=data.coordinates.lat,
        lng=data.coordinates.lng,
    )
    db.add(event)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail=f"Event {data.id} already exists")
    db.refresh(event)
    return event


def update_event(db: Session, event_id: str, data: schemas.EventUpdate) -> models.Event:
    event = get_event(db, event_id)
    event.title = data.title
    event.description = data.description
    event.address = data.address
    event.country = data.country
    event.category = data.category
    event.lat = data.coordinates.lat
    event.lng = data.coordinates.lng
    db.commit()
    db.refresh(event)
    return event


def patch_event(db: Session, event_id: str, data: schemas.EventPatch) -> models.Event:
    event = get_event(db, event_id)
    patch = data.model_dump(exclude_unset=True)
    if "coordinates" in patch:
        coords = patch.pop("coordinates")
        event.lat = coords["lat"]
        event.lng = coords["lng"]
    for key, value in patch.items():
        setattr(event, key, value)
    db.commit()
    db.refresh(event)
    return event


def delete_event(db: Session, event_id: str) -> None:
    event = get_event(db, event_id)
    db.delete(event)
    db.commit()
