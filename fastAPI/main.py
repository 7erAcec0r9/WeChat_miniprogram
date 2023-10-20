from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from tortoise.expressions import Q

from models import User, Login, RequestVerify, NewRequest
from models import RequestList

app = FastAPI()
register_tortoise(app, db_url="mysql://root:258456@localhost:3306/api",
                  modules={"models": ['models']})


@app.post("/login")
async def login(login: Login):
    userid = login.userid
    id = login.id
    userpwd = login.userpwd
    Users = await User.filter(Q(Q(UserID=userid), Q(Identity=login.id), Q(PassWord=userpwd), join_type="AND"))
    username = ''
    if len(Users) == 0:
        print("error")
        code = 0
    else:
        username = Users[0].UserName
        code = 1
    return {"userID": userid, "userName": username, "userpwd": userpwd, "ID": id, "code": code}


@app.put("/newrequest")
async def newrequest(newrequest: NewRequest):
    date_start = newrequest.date_start
    date_end = newrequest.date_end
    username = newrequest.username
    reason = newrequest.reason
    userid = newrequest.userid
    phonenumber = newrequest.phonenumber
    location = newrequest.location
    status = newrequest.status
    reviewer = newrequest.reviewer

    Check = await RequestList.filter(
        Q(Q(date_start=date_start), Q(date_end=date_end), Q(UserName=username), Q(reason=reason), Q(UserID=userid),
          Q(phonenumber=phonenumber), Q(location=location), join_type="AND"))

    if len(Check) == 0:
        await RequestList(date_start=date_start, date_end=date_end, UserName=username, reason=reason, status=status,
                          phonenumber=phonenumber, location=location, UserID=userid, Reviewer=reviewer).save()
        return {"code": 1}
    else:
        return {"code": 0}


@app.get("/allrequest")
async def allrequest(userid):
    allRequests = await RequestList.filter(UserID=userid)
    records = []
    for request in allRequests:
        records.append(dict(
            date_start=request.date_start,
            date_end=request.date_end,
            username=request.UserName,
            reason=request.reason,
            status=request.status,
            phonenumber=request.phonenumber,
            location=request.location,
            userid=request.UserID,
            reviewer=request.Reviewer
        ))
    return records


@app.put("/requestverify")
async def requestverify(requestverify: RequestVerify):
    date_start = requestverify.date_start
    date_end = requestverify.date_end
    username = requestverify.username
    reason = requestverify.reason
    userid = requestverify.userid
    phonenumber = requestverify.phonenumber
    location = requestverify.location
    status_c = requestverify.status_c
    reviewer = requestverify.reviewer
    num = await RequestList.filter(
        Q(Q(date_start=date_start), Q(date_end=date_end), Q(UserName=username), Q(reason=reason), Q(UserID=userid),
          Q(phonenumber=phonenumber), Q(location=location), join_type="AND")).update(status=status_c, Reviewer=reviewer)
    print(num)
    return num


@app.get("/needrequest")
async def needrequest():
    allRequests = await RequestList.filter(status='审核中')
    records = []
    for request in allRequests:
        records.append(dict(
            date_start=request.date_start,
            date_end=request.date_end,
            username=request.UserName,
            reason=request.reason,
            status=request.status,
            phonenumber=request.phonenumber,
            location=request.location,
            userid=request.UserID,
            reviewer=request.Reviewer
        ))
    return records
