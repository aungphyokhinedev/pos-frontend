
export default {
    title: "Purchase Detail's Information",
    collection: "possaledetail",
    store:"pospublic",
    listData: {
      icon: "mdi-basket-outline",
      logo: "logo",
      title: "name",
      subtitle: "_subtitle",
      transform: (item) => {
          let _item = {...item}
          _item._title = item.name;
          _item._subtitle = "Qty " + item.qty 
          + ", Price " + item.unitPrice 
          + ", Discount " + item.discountedPrice  
          + ", Amount " + item.amount
          return _item
      } 
    },
    sortData: {
      items: [
        { text: "Purchase Detail's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt" },
        { text: "Invoice No.", name: "invoiceNumber" , default: -1},
        
      ]
    },
    searchData: {
      items: "name"
    },
    detailData: {
      title: "Purchase Detail's information",
    
      items: [
        {
          type: "title",
          value: "name",
          index: 1
        },
        {
          type: "subtitle",
          label: "Invoice No.",
          value: "invoiceNumber",
          index: 2
        },
        {
          type: "subtitle",
          label: "Amount",
          value: "amount",
          index: 3
        },
        {
          type: "subtitle",
          label: "Description/Remark",
          value: "remark",
          index: 4
        },

      ]
    },
   
  }