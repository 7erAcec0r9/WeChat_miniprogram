Component({
    options: {
        addGlobalClass: true
    },
    data: {
        elements: [
            { title: '新申请', name: 'new request', color: 'purple', icon: 'roundadd' },
            { title: '我的申请 ', name: 'all request', color: 'mauve', icon: 'form' }
        ],
        elements1: [
            { title: '新申请', name: 'new request', color: 'purple', icon: 'roundadd' },
            { title: '申请审批', name: 'request verify', color: 'purple', icon: 'comment' },
            { title: '我的申请 ', name: 'all request', color: 'mauve', icon: 'form' }
        ],
        userData: {}

    },
    lifetimes: {
        //组件生命周期函数 - 在组件实例进入页面节点树时执行)
        attached() {
            let userData = wx.getStorageSync("userData");
            if(userData !== ''){
                // userData.ID = '1';
                this.setData({
                    userData: userData,
                });
            } else {
                setTimeout(function (){
                    wx.navigateTo({
                        url: '../login/login'
                    });
                }, );
            }
        }
    }

});
