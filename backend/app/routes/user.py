from typing import List
from pydantic import UUID4
from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas, utils, oauth2
from ..database import get_db

router = APIRouter(
    tags=['Users']
)

# /users/
# /users


@router.post("/adminregister", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):

    # hash the password - user.password
    if(user.password == user.password2):

      hashed_password = utils.hash(user.password)
      user.password = hashed_password
      # new_user = models.User(**user.dict())
      new_user = models.User(email=user.email, nickname=user.nickname, password=user.password)
      db.add(new_user)
      db.commit()
      db.refresh(new_user)
      return new_user
    else:
      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Passwords not match")



@router.get('/users', response_model=List[schemas.UserOut])
def get_user(db: Session = Depends(get_db), current_user: UUID4 = Depends(oauth2.get_current_user) ):
    
    users = db.query(models.User).all()
    if not users:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Something went wrong")

    return users