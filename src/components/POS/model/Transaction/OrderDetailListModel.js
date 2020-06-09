
export default {
    title: "Order Detail's Information",
    collection: "posorderdetail",
    populate: ["shop","item"],
    store:"pospublic",
    query:() =>{
      return {public : false}
    },
    listData: {
      icon: "mdi-basket-outline",
      logo: "_logo",
      title: "name",
      subtitle: "_subtitle",
        color:  "_color",
        transform: (item) => {
            let _item = {...item}
            _item._title = item.name
            _item._subtitle = "Order No. " + item.orderNumber 
            + ", Qty " + item.qty 
            + ", Amount " + item.total
            _item._logo = item.item.photo
            _item._color = item.status == 'pending' ? "grey" : 
            item.status == "done" ? "primary" : "primary"
            return _item
        }
    },
    sortData: {
      items: [
        { text: "Purchase Detail's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt" },
        { text: "Order No.", name: "orderNumber" , default: -1},
        
      ]
    },
    searchData: {
      items: "name"
    },
    detailData: {
      title: "Purchase Detail's information",
      actions: [
        {
          type: "link",
          title: "Delete Item",
          subtitle: "Please be careful. Deleting actions will not be reversable.",
          url: "/pos/mapping/:_id/shopUser"
        }
      ],
      items: [
        {
          type: "title",
          value: "name",
          index: 1
        },
        {
          type: "subtitle",
          label: "Order No.",
          value: "orderNumber",
          index: 2
        },
        {
            type: "subtitle",
            label: "Order Quantity",
            value: "qty",
            index: 3
          },
        {
          type: "subtitle",
          label: "Amount",
          value: "total",
          index: 4
        },
       
        {
            type: "subtitle",
            label: "Order Status",
            value: "status",
            index: 5
        },
        {
            type: "subtitle",
            label: "Shop Name",
            value: "shop.name",
            index: 6
          },
      ]
    },
   
  }