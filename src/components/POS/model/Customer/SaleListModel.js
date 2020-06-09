
import moment from "moment"
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
            _item._subtitle = "Invoice No. " + item.invoiceNumber 
            return _item
        } 
    },
    sortData: {
      items: [
        { text: "Sale's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
        { text: "Amount", name: "total" },
        { text: "Status", name: "status" }
      ]
    },
    searchData: {
      items: "invoiceNumber"
    },
    detailData: {
      title: "Sale's information",
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
          label: "Date",
          value: "_date",
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
          label: "Description/Remark",
          value: "remark",
          index: 5
        },

      ]
    },
   
  }