import moment from "moment"
import numeral from "numeral"
export default {
    title: "Purchase Information",
    collection: "possale",
    store:"pospublic",
    listData: {
      icon: "mdi-comment-check-outline",
      logo: "logo",
      title: "_title",
      subtitle: "_subtitle",
      transform: (item) => {
            let _item = {...item}
            _item._title = moment(_item.date).fromNow()
            _item._date =  moment(_item.date).format('LLLL')
            _item._invno =  "ID." + item.invoiceNumber 
            _item._total =numeral(item.total).format("0,0.00")
            _item._subtitle = "Invoice No. " + item.invoiceNumber  + 
            ", Total Amount: " + numeral(item.total).format("0a")
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
          title: "View Purchase Detail Items",
          subtitle: "View your purchase detail items.",
          url: "/pos/front/user/mapping/saleSaleDetail/:_id"
        }
      ],
      items: [
      
        {
          type: "title",
          label: "Invoice No.",
          value: "_invno",
          index: 1
        },
        {
          type: "subtitle",
          label: "Date",
          value: "_date",
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
          label: "Description/Remark",
          value: "remark",
          index: 4
        },

      ]
    },
   
  }