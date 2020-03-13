const QQMapWX = require("../../../libs/qqmap-wx-jssdk.min");
let qqmapsdk = null;
Page({
	data: {
		longitude: 114.010857,
		latitude: 22.63137,
		amapPlugin: null,
        key: 'W4WBZ-TUD65-IDAIR-QPM36-HMFQ5-CGBZP',
        address:""
    },
    onLoad(){
        qqmapsdk = new QQMapWX({
            key: this.data.key
        });
        this.currentLocation();
    },
	regionchange(e) {
        if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
            this.setData({
                address: "正在获取地址..."
            });
            this.mapCtx = wx.createMapContext("maps");
            this.mapCtx.getCenterLocation({
                type: 'gcj02',
                success: (res) => {
                    this.setData({
                        longitude:res.longitude,
                        latitude:res.latitude
                    },()=>{
                        this.handleGetAddress(res.longitude,res.latitude)
                    })
                }
            })
        }
    },
    // 根据经纬度获取地址
    handleGetAddress(longitude,latitude){
        qqmapsdk.reverseGeocoder({
            location: {
                latitude: latitude,
                longitude: longitude
            },
            success: (res) => {
                this.setData({
                    address: res.result.formatted_addresses.recommend //res.result.address
                })
            },
            fail: (res) => {
                this.setData({
                address: "获取位置信息失败"
                })
            }
        })
    },
	currentLocation() {
		//当前位置
		const that = this;
		wx.getLocation({
			type: 'gcj02',
			success(res) {
				that.setData({
					latitude: res.latitude,
					longitude: res.longitude
				});
			}
		});
	}
});
