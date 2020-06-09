export default {
    collection: "possale",
    store:"posadmin",
    label: "Current Sale Information",
    icon: "mdi-comment-check-outline",
    logo: "logo",
    title: "name",
    subtitle: "remark",
    lists: {
        items: [
            {
                value:0,
                icon: "mdi-account-outline",
                title: "Detail Listing",
                scheme: "saleDetailList",
                editable: false,
                params: {
                    //:id is from parent : indicate parent value
                    sale:":_id"
                },
                action: {
                    service: "",
                    name: "Remove from sale",
                    params: {
                        sale:null
                    }
                 }
                
            },
           
            
        ]
       

    }

  }