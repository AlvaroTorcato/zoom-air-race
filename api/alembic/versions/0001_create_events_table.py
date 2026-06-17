"""create events table

Revision ID: 0001
Revises:
Create Date: 2026-04-26

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "events",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("description", sa.String(), nullable=False),
        sa.Column("address", sa.String(), nullable=False),
        sa.Column("country", sa.String(), nullable=False),
        sa.Column("category", sa.String(1), nullable=False),
        sa.Column("lat", sa.Float(), nullable=False),
        sa.Column("lng", sa.Float(), nullable=False),
        sa.CheckConstraint("category IN ('A', 'B')", name="ck_events_category"),
    )
    op.create_index("ix_events_id", "events", ["id"])
    op.create_index("ix_events_category", "events", ["category"])


def downgrade() -> None:
    op.drop_table("events")
