
import moment from "moment"
import numeral from "numeral"
export default {
    title: "Order Information",
    collection: "posorder",
    populate: ["shop"],
    store:"pospublic",
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
          _item._ordno =  "ID." + item.orderNumber 
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
        { text: "Order's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
        { text: "Amount", name: "total" },
        { text: "Status", name: "status" }
      ]
    },
    searchData: {
      items: "orderNumber"
    },
    detailData: {
      title: "Order's information",
      actions: [
  
        {
          type: "link",
          title: "View Order Status",
          subtitle: "View your order detail status.",
          url: "/pos/front/user/transactionstatus/orderStatus/:_id"
        },
        {
          condition:(params)=>{
          
            return params.status == 'pending'
          },
          type: "action",
          title: "Cancel Order",
          subtitle: "You can only cancel the order before accept.",
          do: async (item,ctx)=>{
          
            if(confirm("Are you sure to cancel")){
              ctx.close()
              await ctx.$store.dispatch("pospublic/orderCancel", {
                _id: item._id
              });
             
              ctx.$emit("refresh")
            }
            
          }
        }
      ],
      items: [
        {
          type: "title",
          value: "_ordno",
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
          label: "Date",
          value: "_date",
          index: 3
        },
        {
          type: "subtitle",
          label: "Amount",
          value: "_total",
          index: 4
        },
        {
            type: "subtitle",
            label: "Shop Name",
            value: "shop.name",
            index: 5
          },
          {
            type: "subtitle",
            label: "Order Status",
            value: "status",
            index: 6
          },
        {
          type: "subtitle",
          label: "Description/Remark",
          value: "remark",
          index: 7
        },

      ]
    },
   
  }