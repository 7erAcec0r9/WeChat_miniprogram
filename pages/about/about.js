Component({
    options: {
        addGlobalClass: true
    },
    data: {},
    methods: {
        toLogin: function () {
            wx.navigateTo({
                url: '../login/login',
            })
        }
    }
});
