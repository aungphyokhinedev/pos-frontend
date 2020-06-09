
export default {
    title: "Sale Information",
    collection: "possale",
    store:"pospublic",
    query:() =>{
      return {}
    },
    listData: {
      icon: "mdi-comment-check-outline",
      logo: "logo",
      title: "name",
      subtitle: "_subtitle",
      transform: (item) => {
            let _item = {...item}
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
      items: "name"
    },
    detailData: {
      title: "Sale's information",
      actions: [
        {
          type: "link",
          title: "Delete Item",
          subtitle: "Please be careful. Deleting actions will not be reversable.",
          url: "/pos/mapping/:_id/saleSaleDetail"
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
          label: "Amount",
          value: "total",
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