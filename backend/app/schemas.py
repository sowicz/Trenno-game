
from pydantic import BaseModel, EmailStr, UUID4
from typing import List
from datetime import datetime
from typing import Optional

from pydantic.types import conint




class UserOut(BaseModel):
    id: UUID4
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    email: EmailStr
    nickname: str
    password: str
    password2: str
    role: Optional[str] = None
    


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None


class TokenSwitch(BaseModel):
  token: str


class WordHint(BaseModel):
    haslo: str
    podpowiedz: str

