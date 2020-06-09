export default {
    collection: "poscategory",
    store:"posadmin",
    label: "Current Category Information",
    icon: "mdi-aspect-ratio",
    logo: "photo",
    title: "name",
    subtitle: "categoryCode",
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
                    category:":_id"
                },
                action: {
                    service: "",
                    name: "Remove from category",
                    params: {
                        category:null
                    }
                 }
                
            },
            {
                value:1,
                icon: "mdi-account-outline",
                title: "Assign New Item",
                scheme: "itemList",
                editable: true,
                mapValue: "category",
                params: {
                    category:null
                },
                action: {
                    service: "",
                    name: "Assign to category",
                    params: {
                        category:":_id"
                    }
                 }
            }
            
        ]
       

    }

  }