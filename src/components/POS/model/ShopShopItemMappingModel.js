export default {
    collection: "posshop",
    store:"posadmin",
    label: "Current Shop Information",
    icon: "mdi-aspect-ratio",
    logo: "photo",
    title: "name",
    subtitle: "description",
    lists: {
        items: [
            {
                value:0,
                icon: "mdi-aspect-ratio",
                title: "Existing Deliverable Items",
                scheme: "shopItemList",
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
                icon: "mdi-account-outline",
                title: "Assign New Deliverable Item",
                scheme: "shopItemList",
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