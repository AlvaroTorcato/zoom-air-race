from sqlalchemy import Column, String, Float, CheckConstraint
from app.database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    address = Column(String, nullable=False)
    country = Column(String, nullable=False)
    category = Column(String(1), nullable=False)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)

    __table_args__ = (
        CheckConstraint("category IN ('A', 'B')", name="ck_events_category"),
    )
