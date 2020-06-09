export default {
    collection: "posorder",
    extraItems:[{
        collection: "posshop",
        id: "shop"
    }], 
    store:"pospublic",
    populate: ["shop"],
    label: "Current Order Information",
    icon: "mdi-home-outline",
    logo: "logo",
    title: "_title",
    subtitle: "_subtitle",
    mobile: "_mobile",
    transform: (item) => {
     if(!item._id){
        return null
     }
        let _item = {...item}
        _item._title =  "Order No. " + item.orderNumber
        _item._subtitle =    "<div >Status: " + item.status + "</div>" 
        _item._mobile = item.shop.mobile
        return _item
    },
    lists: {
        items: [
            {
                value:0,
                icon: "mdi-account-outline",
                title: "Order Detail Listing",
                scheme: "orderDetail",
                editable: false,
                params: {
                    //:id is from parent : indicate parent value
                    order:":_id"
                },
                action: {
                    service: "",
                    name: "Remove from order",
                    params: {
                        order:null
                    }
                 }
                
            },
           
            
        ]
       

    }

  }