//app.js
App({
    onLaunch: function () {
        wx.getSetting({
            success(res) {
                console.log(res.authSetting)
                // res.authSetting = {
                //   "scope.userInfo": true,
                //   "scope.userLocation": true
                // }
            }
        })
    },
    globalData: {
        userInfo: null
    }
})