// pages/selectCity/selectCity.js
const cityData = require('../../utils/city.js');
import  http  from "../../common/js/http"
Page({
	data: {
		lists: [],
		touchmove: false, // 是否在索引表上滑动
		touchmoveIndex: -1,
		titleHeight: 0, // 索引二字距离窗口顶部的高度
		indexBarHeight: 0, // 索引表高度
		indexBarItemHeight: 0, // 索引表子项的高度
		scrollViewId: '', // scroll-view滚动到的子元素的id
		winHeight: 0,
		inputShowed: false, // 输入框是否显示
		inputVal: '', // 搜索框输入的内容
		hotCity: [ 
            {
                name:"北京",
                code:"110000"
            },
            {
                name:"上海",
                code:"310000"
            },
            {
                name:"广州",
                code:"440100"
            },
            {
                name:"深圳",
                code:"440300"
            },
            {
                name:"杭州",
                code:"330100"
            },
            {
                name:"长沙",
                code:"430100"
            },
            {
                name:"武汉",
                code:"420100"
            },
            {
                name:"厦门",
                code:"350200"
            },
            {
                name: "西安",
                code: "610100"
            }, 
            {
                name: "昆明",
                code: "530100"
            }, 
            {
                name: "成都",
                code: "510100"
            },
            {
                name: "重庆",
                code: "500000"
            }
        ],    // '北京', '上海', '广州', '深圳', '杭州', '长沙', '武汉', '厦门', '西安', '昆明', '成都', '重庆' ], // 热门城市
		searchResult: [], // 搜索城市的结果
		localCity: ''
	},
	onLoad: function(options) {
        const that = this;
        wx.getLocation({
            success(res){
                var qqMapApi = 'http://apis.map.qq.com/ws/geocoder/v1/' + "?location=" + res.latitude + ',' +
                    res.longitude + "&key=" + 'XVLBZ-BSU66-ULJSQ-MFGXD-TM7GZ-55F2M' + "&get_poi=1";
                http(qqMapApi,{},"GET")
                .then(res=>{
                    // console.log(res)
                    that.setData({
                        localCity: options.currentCity || res.data.result.address_component.city
                    });
                })
            }
        })

		
		setTimeout(() => {
			wx.getSystemInfo({
				success: function(res) {
					let winHeight = res.windowHeight;
                    let barHeight = winHeight - res.windowWidth / 750 * 204;
					that.setData({
						winHeight: winHeight,
						indexBarHeight: barHeight,
						indexBarItemHeight: barHeight / 25,
						titleHeight: res.windowWidth / 750 * 132,
						lists: cityData.list
					});
				}
			});
		}, 50);
	},
	showInput() {
		this.setData({
			inputShowed: true
		});
	},
	clearInput() {
		this.setData({
			inputVal: '',
			inputShowed: false,
			searchResult: []
		});
		wx.hideKeyboard(); //强行隐藏键盘
	},
	inputTyping(e) {
		this.setData(
			{
				inputVal: e.detail.value
			},
			() => {
				this.searchCity();
			}
		);
	},
	// 搜索城市
	searchCity() {
		let result = [];
		cityData.list.forEach((item1, index1) => {
			item1.data.forEach((item2, index2) => {
				if (item2.keyword.indexOf(this.data.inputVal.toLocaleUpperCase()) !== -1) {
					result.push(item2.cityName);
				}
			});
		});
		this.setData({
			searchResult: result
		});
	},
	// 选择城市
	selectCity(e) {
		let cityName = e.currentTarget.dataset.name;
		//返回并刷新上一页面
		let pages = getCurrentPages();
        let prePage = pages[pages.length - 2];
		prePage.emit(cityName);
		wx.navigateBack({
			delta: 1
		});
	},
	touchStart(e) {
		this.setData({
			touchmove: true
        });
		let pageY = e.touches[0].pageY;
        let index = Math.floor((pageY - this.data.titleHeight) / this.data.indexBarItemHeight);
		let item = this.data.lists[index === 0 ? 1 : index];
		if (item) {
			this.setData({
				scrollViewId: item.letter,
				touchmoveIndex: index
			});
        }
	},
	touchMove(e) {
		let pageY = e.touches[0].pageY;
		let index = Math.floor((pageY - this.data.titleHeight) / this.data.indexBarItemHeight);
		let item = this.data.lists[index === 0 ? 1 : index];
		if (item) {
			this.setData({
				scrollViewId: item.letter,
				touchmoveIndex: index
			});
		}
	},
	touchEnd() {
		this.setData({
			touchmove: false,
			touchmoveIndex: -1
		});
	},
	touchCancel() {
		this.setData({
			touchmove: false,
			touchmoveIndex: -1
		});
	}
});
