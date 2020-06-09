import moment  from "moment";
export default {
    title: "Sale Information",
    collection: "possale",
    store:"posadmin",
    listData: {
      icon: "mdi-comment-check-outline",
      logo: "logo",
      title: "_title",
      subtitle: "_subtitle",
      transform: (item) => {
            let _item = {...item}
            _item._title = "INV. " + item.invoiceNumber
            _item._subtitle = moment(item.date).fromNow() + ", Amount " + item.total +  ", Status " + item.status 
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
      advanceActions: [
        
        {
          type: "action",
          title: "Delete Item ",
          subtitle: "You can delete this item.",
          do: async (item,ctx)=>{
          
            if(confirm("Are you sure to delete")){
              ctx.close()
              await ctx.$store.dispatch("posadmin/updateItem", {
                _id: item._id,deleteFlag:true, collection: "possale"
              });
              ctx.$emit("refresh")
            }
            
          }
        }
      ],
      actions: [
        {
          type: "link",
          title: "View Details Sale",
          subtitle: "You can view all details sale item.",
          url: "/pos/home/mapping/:_id/saleSaleDetail"
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