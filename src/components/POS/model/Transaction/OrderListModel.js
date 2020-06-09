
export default {
    title: "Order Information",
    collection: "posorder",
    populate: ["shop"],
    store:"pospublic",
    query:() =>{
      return {}
    },
    listData: {
      icon: "mdi-comment-check-outline",
      logo: "logo",
      title: "_title",
      subtitle:"_subtitle",
      color: "_color",
      transform: (item) => {
          let _item = {...item}
          _item._title = item.shop.name
          _item._subtitle = "Order No. " + item.orderNumber +  ", Total " + item.total
          _item._color = item.status == 'pending' ? "grey" : 
          item.status == "done" ? "primary" : 
          item.status == "accept" ? "green" :
          item.status == "reject" ? "pink" : "grey"
          return _item
      }
    },
    sortData: {
      items: [
        { text: "Purchase's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
        { text: "Amount", name: "total" },
        { text: "Status", name: "status" }
      ]
    },
    searchData: {
      items: "name"
    },
    detailData: {
      title: "Purchase's information",
      actions: [
        {
          type: "link",
          title: "Delete Item",
          subtitle: "Please be careful. Deleting actions will not be reversable.",
          url: "/pos/sale/transaction/checking/orderDetailCheck/:_id"
        },
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
          label: "Amount",
          value: "total",
          index: 3
        },
        {
            type: "subtitle",
            label: "Shop Name",
            value: "shop.name",
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
          label: "Description/Remark",
          value: "remark",
          index: 6
        },

      ]
    },
   
  }