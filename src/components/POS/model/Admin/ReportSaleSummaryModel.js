export default {
    title:"Sale Summary",
    store:"posadmin",
    action: "saleSummary",
    filter:{
title: "Filter Data",
subtitle: "add filter information",
store:"pospublic",
items: [
{
    index: 1,
    type: "autocomplete",
    collection: "posshop",
    label: "Shop(Optional)",
    findBy: ["name"],
    icon: "mdi-comment-processing-outline",
    value: "shop"
  },
  {
    index: 2,
    type: "autocomplete",
    collection: "poscustomer",
    label: "Customer ID(Optional)",
    findBy: ["customerId"],
    public: true,
    icon: "mdi-comment-processing-outline",
    value: "customer"
  },
  {
    index: 3,
    type: "autocomplete",
    collection: "posuser",
    label: "Sale Person(Optional)",
    findBy: ["name"],
    icon: "mdi-comment-processing-outline",
    value: "user"
  },

]
},
    group:{
        title:"GROUP ITEMS BY",
        subtitle: "add group by information",
        items:[
            {
                 index:1,
                name:"Shop", 
                value:"shop",
                collection: "posshop",
                display: "name"
            },
            {
                 index: 2,
                name:"Sale Person", 
                value:"user",
                collection: "posuser",
                display: "name"
            },
            {
                 index: 3,
                name:"Customer", 
                value:"customer",
                collection: "poscustomer",
                display: "customerId"
            }
        ]
    }
}