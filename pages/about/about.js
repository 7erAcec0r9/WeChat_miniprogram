Component({
    options: {
        addGlobalClass: true
    },
    data: {
        userData: {},
        identity: ''
    },
    lifetimes: {
        attached() {
            let userData = wx.getStorageSync("userData");
            let picker = ['学生', '辅导员'];
            if(userData !== ''){
                this.setData({
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
        }
    },
    methods: {
        toLogin: function () {
            wx.navigateTo({
                url: '../login/login',
            })
        },

        quit(){
            wx.removeStorageSync('userData');
            wx.navigateTo({
                url: '../login/login',
            })
        }
    }
});
