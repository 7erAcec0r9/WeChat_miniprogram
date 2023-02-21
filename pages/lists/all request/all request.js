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
        _this.allRequest();
    },

    allRequest() {
        let _this = this;
        if(_this.data.userData !== ''){
            wx.request({
                method: 'GET',
                url: 'http://localhost:8000/allrequest',
                data: {
                    userid: _this.data.userData.userID
                },
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

    onPullDownRefresh: function () {
        this.allRequest();
    },


});