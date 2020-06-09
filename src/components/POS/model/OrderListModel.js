
import moment from "moment" 
import numeral from "numeral"
export default {
    title: "Order Information",
    collection: "posorder",
    populate: ["shop"],
    store:"posadmin",
    listData: {
      icon: "mdi-comment-check-outline",
      logo: "logo",
      title: "_title",
      subtitle:"_subtitle",
      color: "_color",
      transform: (item) => {
          let _item = {...item}
          _item._title = moment(_item.date).fromNow()
          _item._date =  moment(_item.date).format('LLLL')
          _item._total =numeral(item.total).format("0,0.00")
          _item._subtitle = "Order No. " + item.orderNumber +  
          ", Total Amount: " + numeral(item.total).format("0a")
          _item._color = item.status == 'pending' ? "grey" : 
           item.status == "done" ? "#607d8b" : 
           item.status == "cancel" ? "#fb8c00" :
           item.status == "accept" ? "#689f38" :
           item.status == "error" ? "orange" :
           item.status == "reject" ? "#ef5350" : "grey"
          return _item
      }
    },
    sortData: {
      items: [
        { text: "Purchase's Name", name: "name" },
        { text: "Created/Edited Time", name: "date", default: -1 },
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
          title: "View Order Details",
          subtitle: "You can view your order details items.",
          url: "/pos/sale/transaction/checking/orderDetailCheck/:_id"
        }
      ],
      items: [
        {
          type: "title",
          value: "_date",
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
          value: "_total",
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