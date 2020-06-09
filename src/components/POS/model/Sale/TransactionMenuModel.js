export default {
    items:(params)=>
    {return [
    { icon: "mdi-account-outline", 
    title: "Sales Current User", 
    value: "0", 
    list:"saleList",
    query: {user: params.uid} 
    },
    { icon: "mdi-home-outline", 
    title: "Sales Current Shop", 
    value: "1", 
    list:"saleList",
    query: {} 
    },
    { icon: "mdi-account-outline", 
    title: "Sale Details Current User",
     value: "2", 
     list:"saleDetailList",
     query: {user: params.uid}
    },
     { icon: "mdi-home-outline", 
    title: "Sale Details Current Shop",
     value: "3", 
     list:"saleDetailList",
     query: {}
    },
    { icon: "mdi-information-outline",  
    title: "Orders Information",
     value: "4", 
     list:"orderList",
     query: {}
    },
    { icon: "mdi-arrange-send-to-back", 
    title: "Order Details Information",
     value: "5", 
     list:"orderDetailList",
     query: {}
    },
     { icon: "mdi-send-circle-outline", 
    title: "Deliverable Items Information",
     value: "6", 
     list:"deliverableItemList",
     query: {}
    },
    
  ]
}
}