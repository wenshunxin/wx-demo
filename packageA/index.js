Page({
    data:{
        loading: false,
        color: '#FFF',
        background: '#1CBBB4',
        show: true,
        animated: false,
        list: [{
            "text": "组件",
            "iconPath": "/static/images/tabbar/code_gray.png",
            "selectedIconPath": "/static/images/tabbar/code_active.png",
            "dot": true,
            "pageCur": "Index"
        },
        {
            "text": "扩展",
            "iconPath": "/static/images/tabbar/extend_gray.png",
            "selectedIconPath": "/static/images/tabbar/extend_active.png",
            "badge": 'New',
            "pageCur": "Expand"
        }, {
            "text": "对话",
            "iconPath": "/static/images/tabbar/code_gray.png",
            "selectedIconPath": "/static/images/tabbar/code_active.png",
            'dot': true
        },
        {
            "text": "我的",
            "iconPath": "/static/images/tabbar/extend_gray.png",
            "selectedIconPath": "/static/images/tabbar/extend_active.png",
            "badge": 'New'
        }],

        pageCur:"Index"
    },
    tabChange(e) {
        const { pageCur } = e.detail.item;
        if (pageCur){
            this.setData({
                pageCur: pageCur
            })
        }
    }
})