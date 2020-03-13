const amap = require('../../../libs/amap-wx.js');
Page({
	data: {
		lat: '',
		lng: '',
		covers: [],
		height: 0,
		key: '6799b5f6f88d3d9fb52ac244855a8759',
		amapPlugin: null,
		poisData: []
	},
	onLoad() {
		let that = this;
		wx.getSystemInfo({
			success: function(res) {
				that.setData({
					height: (res.windowHeight - 54)/2
				});
			}
		});
		this.setData({
			amapPlugin: new amap.AMapWX({
				key: this.data.key
			})
		});
		this.currentLocation();
		this.getLocation((data) => {
			this.getPoiAround(data[0].name);
		});
	},
	onSearch(e) {
		this.getPoiAround(e.detail);
	},
	marker(e) {
        let markerId = e.markerId;
        let item = this.data.covers[markerId || 0];
        const menu = item.tel ? ["打电话", "到这里"] : ["到这里"];
        wx.showActionSheet({
            itemList: menu,
            success(res) {
                if (res.tapIndex == 0 && item.tel) {
                    wx.makePhoneCall({
                        phoneNumber: item.tel
                    })
                } else {
                    const latitude = Number(item.latitude)
                    const longitude = Number(item.longitude)
                    wx.openLocation({
                        name: item.title,
                        address: item.address,
                        latitude,
                        longitude,
                        scale: 18
                    })
                }
            },
            fail(res) {
            }
        })

    },
	getPoiAround(keywords) {
		wx.showLoading({
			title: '加载中...'
		});
		this.data.amapPlugin.getPoiAround({
			querykeywords: keywords,
			location: '', //location： 经纬度坐标。 为空时， 基于当前位置进行地址解析。 格式： '经度,纬度'
			success: (data) => {
                data.markers.forEach(item=>{
                    item['title'] = item.name;
                })
				this.setData(
					{   
                        covers:data.markers,
						poisData: data.poisData
					},
					() => {
						wx.hideLoading();
					}
				);
			}
		});
	},
	getLocation(callback) {
		let that = this;
		this.data.amapPlugin.getRegeo({
			success: (data) => {
				that.setData({
					lng: data[0].longitude,
					lat: data[0].latitude
				});
				callback(data);
			},
			fail: (info) => {
				callback();
			}
		});
	},
	currentLocation() {
		//当前位置
		const that = this;
		wx.getLocation({
			type: 'gcj02',
			success(res) {
				that.setData({
					lat: res.latitude,
					lng: res.longitude
				});
			}
		});
    },
    go(e){
        const index = Number(e.currentTarget.dataset.id);
        const item = this.data.poisData[index];
        const location = item.location;
        wx.openLocation({
            name: item.name,
            address: item.address,
            latitude: Number(location.split(",")[1]),
            longitude: Number(location.split(",")[0]),
            scale: 18
        })
    }
});
