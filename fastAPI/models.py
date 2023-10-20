from pydantic import BaseModel
from tortoise import Model, fields


class User(Model):
    UserID = fields.CharField(pk=True, max_length=20)
    UserName = fields.CharField(max_length=20)
    PassWord = fields.CharField(max_length=20)
    Identity = fields.CharField(max_length=20)


class RequestList(Model):
    date_start = fields.CharField(max_length=10)
    date_end = fields.CharField(max_length=10)
    UserName = fields.CharField(max_length=20)
    reason = fields.TextField(max_length=200)
    status = fields.CharField(max_length=10)
    location = fields.CharField(max_length=50)
    phonenumber = fields.CharField(max_length=20)
    UserID = fields.CharField(pk=True, max_length=20)
    Reviewer = fields.CharField(max_length=20)


class Login(BaseModel):
    userid: str
    userpwd: str
    id: str


class RequestVerify(BaseModel):
    date_start: str
    date_end: str
    username: str
    userid: str
    phonenumber: str
    location: str
    reason: str
    status_c: str
    reviewer: str


class NewRequest(BaseModel):
    date_start: str
    date_end: str
    username: str
    userid: str
    phonenumber: str
    location: str
    reason: str
    status: str
    reviewer: str
