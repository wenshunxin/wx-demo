Page({
    data:{
        headerTitle:{
            loading:false,
            show:true,
            color:"#fff",
            background:"linear-gradient(45deg, #f43f3b, #ec008c)",
            back:{
                show:true,
                icon:"back",
                color:"#fff",
                text:"返回"
            }
        },
        list: [{
            "text": "组件",
            "iconPath": "/static/images/tabbar/code_gray.png",
            "selectedIconPath": "/static/images/tabbar/code_active.png",
            "dot": true,
            "pageCur": "Home"
        },
        {
            "text": "扩展",
            "iconPath": "/static/images/tabbar/extend_gray.png",
            "selectedIconPath": "/static/images/tabbar/extend_active.png",
            "badge": 'New',
            "pageCur": "Plugin"
        },
        {
            "text": "我的",
            "iconPath": "/static/images/tabbar/extend_gray.png",
            "selectedIconPath": "/static/images/tabbar/extend_active.png",
            "badge": 'New'
        }],
        plugin:"Home"
    },
    tabChange(e){
        this.setData({
            plugin: e.detail.item.pageCur
        })
    }
})