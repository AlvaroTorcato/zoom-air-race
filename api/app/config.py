from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://airrace:airrace@postgres:5432/airrace"

    model_config = {"env_file": ".env"}


settings = Settings()
