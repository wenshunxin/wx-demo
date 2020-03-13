const amap = require("../../../libs/amap-wx");
Page({
    data:{
        amapPlugin: null,
        key: "6799b5f6f88d3d9fb52ac244855a8759",
        obj: {}
    },
    onLoad(){
        this.setData({
            amapPlugin: new amap.AMapWX({
                key:this.data.key
            })
        },()=>{
            this.handleGetWeather();
        })
    },
    handleGetWeather(adcode){
        wx.showLoading({
            title: '请稍候...'
        });
        // type：天气的类型。默认是live（实时天气），可设置成forecast（预报天气）。
        // city：城市对应的adcode，非必填。为空时，基于当前位置所在区域。 如：440300，返回深圳市天气
        // success(data) ：调用成功的回调函数。
        // fail(info) ：调用失败的回调函数。
        this.data.amapPlugin.getWeather({
            type:"live",
            city:adcode || '',
            success: (data) => {
                this.setData({
                    obj:data
                },()=>{
                    wx.hideLoading();
                })
            }
        })
    },
    emit(city) {
        if(Object.prototype.toString.call(city) == '[object Object]'){
            this.handleGetWeather(city.code);
            return false;
        }
        setTimeout(() => {
            wx.showToast({
                title: "您选择了：" + city,
                icon: "none"
            })
        }, 350)
    },
    handleBack(){
        wx.navigateBack();
    }
})