export default {
    collection: "posorder",
    populate: ["customer"],
    store:"posfrontend",
    label: "Current Order Information",
    icon: "mdi-account-outline",
    logo: "logo",
    title: "_title",
    subtitle: "_subtitle",
    mobile: "mobile",
    transform: (item) => {
        let _item = {...item}
        _item._title =  "Order No. " + item.orderNumber
        _item._subtitle =  "<div class='mt-1'>Ph." + item.mobile + ", " + item.address + "</div>"
        return _item
    },
    lists: {
        items: [
            {
                value:0,
                icon: "mdi-account-outline",
                title: "Order Detail Listing",
                scheme: "orderDetailList",
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