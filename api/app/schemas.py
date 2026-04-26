from __future__ import annotations
from typing import Literal, Optional
from pydantic import BaseModel, model_validator


class Coordinates(BaseModel):
    lat: float
    lng: float


class EventBase(BaseModel):
    title: str
    description: str
    address: str
    country: str
    category: Literal["A", "B"]
    coordinates: Coordinates


class EventCreate(EventBase):
    id: str


class EventUpdate(EventBase):
    pass


class EventPatch(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    country: Optional[str] = None
    category: Optional[Literal["A", "B"]] = None
    coordinates: Optional[Coordinates] = None


class EventResponse(EventBase):
    id: str

    model_config = {"from_attributes": True}

    @model_validator(mode="before")
    @classmethod
    def flatten_coordinates(cls, data):
        if hasattr(data, "lat"):
            return {
                "id": data.id,
                "title": data.title,
                "description": data.description,
                "address": data.address,
                "country": data.country,
                "category": data.category,
                "coordinates": {"lat": data.lat, "lng": data.lng},
            }
        return data
