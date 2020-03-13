module.exports = Behavior({
    data:{
        sharedText:"我是Behaior信息内容"
    },
    methods:{
        sharedMethod(){
            this.setData({
                sharedText:"我也是Behaior文件信息"
            })
        }
    }
})