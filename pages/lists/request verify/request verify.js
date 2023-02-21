Page({
    data: {
        requestLists: [],
        userData: ''
    },
    onLoad: function (options) {
        let userData = wx.getStorageSync("userData");
        let _this = this;
        if(userData !== ''){
            _this.setData({
                userData: userData,
            });
        } else {
            setTimeout(function (){
                wx.navigateTo({
                    url: '../../login/login'
                });
            }, 1000);
        }
        _this.needRequest();
    },

    denied(e) {
        let index = e.currentTarget.dataset.index;
        let _this = this;
        console.log(index);
        console.log(_this.data.requestLists[index].username);
        wx.request({
            method: 'GET',
            url: 'http://localhost:8000/requestverify',
            data: {
                date_start: _this.data.requestLists[index].date_start,
                date_end: _this.data.requestLists[index].date_end,
                username: _this.data.requestLists[index].username,
                userid: _this.data.requestLists[index].userid,
                phonenumber: _this.data.requestLists[index].phonenumber,
                location: _this.data.requestLists[index].location,
                reason: _this.data.requestLists[index].reason,
                status_c: '未通过'
            },
            success: function (res){
                if(res.data === 1){
                    _this.onLoad();
                }
            }
        })
    },

    passed(e) {
        let index = e.currentTarget.dataset.index;
        let _this = this;
        console.log(index);
        wx.request({
            method: 'GET',
            url: 'http://localhost:8000/requestverify',
            data: {
                date_start: _this.data.requestLists[index].date_start,
                date_end: _this.data.requestLists[index].date_end,
                username: _this.data.requestLists[index].username,
                userid: _this.data.requestLists[index].userid,
                phonenumber: _this.data.requestLists[index].phonenumber,
                location: _this.data.requestLists[index].location,
                reason: _this.data.requestLists[index].reason,
                status_c: '通过'
            },
            success: function (res){
                if(res.data === 1){
                    _this.onLoad();
                }
            }
        })
    },

    needRequest() {
        let _this = this;
        if(_this.data.userData !== ''){
            wx.request({
                method: 'GET',
                url: 'http://localhost:8000/needrequest',
                success: function (res){
                    let requestLists = res.data;
                    _this.setData({
                        requestLists: requestLists
                    });
                }
            })
        } else {
            setTimeout(function (){
                wx.navigateTo({
                    url: '../../login/login'
                });
            }, 1000);
        }
    },
});