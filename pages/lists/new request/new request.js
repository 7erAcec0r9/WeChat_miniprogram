Page({
    data: {
        userData: '',
        identity: '',
        date1: '',
        date2: '',
        date_start: '',
        date_end: '',
        region: ['江苏省', '南京市', '栖霞区'],
        reason: ''
    },
    onLoad: function (options) {
        let _this = this;
        let userData = wx.getStorageSync("userData");
        let picker = ['学生', '辅导员'];
        let date_start = new Date();
        let date_end = new Date();
        date_end.setDate(date_end.getDate()+5);
        if(date_start.getMonth()+1<10){
            _this.setData({
                date1: date_start.getFullYear() + '-0' + (date_start.getMonth()+1) + '-' + date_start.getDate(),
                date2: date_start.getFullYear() + '-0' + (date_start.getMonth()+1) + '-' + date_start.getDate(),
                date_start: date_start.getFullYear() + '-0' + (date_start.getMonth()+1) + '-' + date_start.getDate(),
                date_end: date_end.getFullYear() + '-0' + (date_end.getMonth()+1) + '-' + date_end.getDate()
            })
        } else {
            _this.setData({
                date1: date_start.getFullYear() + '-' + (date_start.getMonth()+1) + '-' + date_start.getDate(),
                date2: date_start.getFullYear() + '-' + (date_start.getMonth()+1) + '-' + date_start.getDate(),
                date_start: date_start.getFullYear() + '-' + (date_start.getMonth()+1) + '-' + date_start.getDate(),
                date_end: date_end.getFullYear() + '-' + (date_end.getMonth()+1) + '-' + date_end.getDate()
            })
        }
        if(userData !== ''){
            _this.setData({
                userData: userData,
                identity: picker[userData.ID]
            });
        } else {
            setTimeout(function (){
                wx.navigateTo({
                    url: '../../login/login'
                });
            }, 1000);
        }
    },

    dateChange1(e) {
        this.setData({
            date1: e.detail.value,
            date2: e.detail.value
        })
    },

    dateChange2(e){
        this.setData({
            date2: e.detail.value
        })
    },

    regionChange: function(e) {
        this.setData({
            region: e.detail.value
        })
    },

    reasonInput(e){
        this.setData({
            reason: e.detail.value
        })
    },
    formSubmit(e) {
        let _this = this;
        let PhoneNumber = e.detail.value["phonenumber"];
        let date_start = this.data.date1;
        let date_end = this.data.date2;
        let location = this.data.region[0] + '-' + this.data.region[1] + '-' + this.data.region[2]
        let reason = this.data.reason;
        // console.log('phonenumber：', e.detail.value["phonenumber"]);
        // console.log('date_start:', this.data.date1);
        // console.log('date_end:', this.data.date2);
        // console.log('location:', location);
        // console.log('reason:', this.data.reason);

        if(PhoneNumber && reason){
            wx.request({
                method: 'GET',
                url: 'http://localhost:8000/newrequest',
                data: {
                    phonenumber: PhoneNumber,
                    date_start: date_start,
                    date_end: date_end,
                    location: location,
                    reason: reason,
                    username: _this.data.userData.userName,
                    status: '审核中',
                    userid: _this.data.userData.userID
                },
                success: function (res){
                    let resMessage = res.data;
                    console.log(resMessage)
                    let statusCode = res.statusCode;
                    if(statusCode !== 200){
                        wx.showToast({
                            title: "提交失败",
                            icon: "error",
                            duration: 1000
                        })
                    }
                    else if(resMessage.code === 0){
                        wx.showToast({
                            title: "请勿重复提交",
                            icon: "error",
                            duration: 1000
                        })
                    }
                    else {
                        wx.showToast({
                            title: "提交成功",
                            icon: "success",
                            duration: 1000
                        });
                    }
                }
            })
        }
        else {
            wx.showToast({
                title: "请完整填写信息",
                icon: "error",
                duration: 2000
            });
        }
    }
});