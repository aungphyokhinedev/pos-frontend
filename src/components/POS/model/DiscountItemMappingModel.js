export default {
    collection: "posdiscount",
    store:"posadmin",
    label: "Current Discount Type Information",
    icon: "mdi-gift-outline",
    logo: "photo",
    title: "name",
    subtitle: "description",
    lists: {
        items: [
            {
                value:0,
                icon: "mdi-aspect-ratio",
                title: "Existing Items",
                scheme: "itemList",
                editable: true,
                params: {
                    //:id is from parent : indicate parent value
                    discount:":_id"
                },
                action: {
                    service: "",
                    name: "Remove from discount",
                    params: {
                        discount:null
                    }
                 }
                
            },
            {
                value:1,
                icon: "mdi-account-outline",
                title: "Assign New Item",
                scheme: "itemList",
                mapValue: "discount",
                editable: true,
                params: {
                    discount:null
                },
                action: {
                    service: "",
                    name: "Assign to discount",
                    params: {
                        discount:":_id"
                    }
                 }
            }
            
        ]
       

    }

  }