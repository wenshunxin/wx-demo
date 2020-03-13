const myBehavior = require("../../common/behavior/my-behavior.js")
Page({
    behaviors: [myBehavior],
    data:{},
    onLoad(){},
    gologpage(){
        wx.navigateTo({
            url: '../logs/logs',
            success: (result)=>{}
        });
    },
    emit(city) {
        setTimeout(() => {
        wx.showToast({
            title: "您选择了：" + city,
            icon: "none"
        })
        }, 350)
    }
})