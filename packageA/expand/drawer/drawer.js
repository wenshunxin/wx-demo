Page({
    data:{
        barList:{
            loading: false,
            color: '#FFF',
            background: "linear-gradient(45deg, #0081ff, #1cbbb4);",
            show: true,
            animated: false,
            back:{
                show:true,
                icon:"back",
                color:"#fff",
                text:"返回"
            }
        },
    },
    showModal(e){
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(){
        this.setData({
            modalName: null
        })
    }
})