export default {
    collection: "posshop",
    store:"posadmin",
    label: "Current Shop Information",
    icon: "mdi-home-outline",
    logo: "logo",
    title: "name",
    subtitle: "description",
    lists: {
        items: [
            {
                value:0,
                icon: "mdi-account-outline",
                title: "Removing Sale Persons",
                scheme: "salePersonList",
                editable: true,
                params: {
                    //:id is from parent : indicate parent value
                    shop:":_id"
                },
                action: {
                    service: "",
                    name: "Remove from shop",
                    params: {
                        shop:null
                    }
                 }
                
            },
            {
                value:1,
                icon: "mdi-account-plus-outline",
                title: "Assign New Sale Person",
                scheme: "salePersonList",
                editable: true,
                mapValue: "shop",
                params: {
                    shop:null
                },
                action: {
                    service: "",
                    name: "Assign to shop",
                    params: {
                        shop:":_id"
                    }
                 }
            }
            
        ]
       

    }

  }