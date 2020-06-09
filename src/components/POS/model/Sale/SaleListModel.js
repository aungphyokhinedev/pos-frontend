
import moment from "moment"
import numeral from "numeral"
export default {
    title: "Sale Information",
    populate:["customer"],
    collection: "possale", 
    store:"posfrontend",
    listData: {
      icon: "mdi-comment-check-outline",
      logo: "logo",
      title: "_title",
      subtitle: "_subtitle",
      transform: (item) => {
            let _item = {...item}
            _item._title = moment(_item.date).fromNow()
            _item._date =  moment(_item.date).format('LLLL')
            _item._total =numeral(item.total).format("0,0.00")
            _item._customer = item.customer ? item.customer.name + " - " + item.customer.customerId: null
            _item._subtitle = "Invoice No. " + item.invoiceNumber +
            ", Total Amount: " + numeral(item.total).format("0a") 
            
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
      items: "name"
    },
    detailData: {
      title: "Sale's information",
      actions: [
        {
          type: "link",
          title: "View Sale Details",
          subtitle: "You can view your sale details items",
          url: "/pos/sale/transaction/mapping/saleSaleDetail/:_id"
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
          label: "Invoice No.",
          value: "invoiceNumber",
          index: 2
        },
        {
          type: "subtitle",
          label: "Customer",
          value: "_customer",
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
          label: "Description/Remark",
          value: "remark",
          index: 5
        },

      ]
    },
   
  }