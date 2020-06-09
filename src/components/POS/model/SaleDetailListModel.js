
export default {
    title: "Sale Detail's Information",
    collection: "possaledetail",
    store:"posadmin",
    listData: {
      icon: "mdi-basket-outline",
      logo: "logo",
      title: "name",
      subtitle: "_subtitle",
      transform: (item) => {
            let _item = {...item}
            _item._title = item.name
            _item._subtitle = "Qty " + item.qty 
            + ", Price " + item.unitPrice 
            + ", Discount " + item.discountedPrice  
            + ", Amount " + item.amount
            return _item
        } 
    },
    sortData: {
      items: [
        { text: "Sale Detail's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt" },
        { text: "Invoice No.", name: "invoiceNumber" , default: -1},
        
      ]
    },
    searchData: {
      items: "name"
    },
    detailData: {
      title: "Sale Detail's information",
      advanceActions: [
        
        {
          type: "action",
          title: "Delete Item ",
          subtitle: "You can delete this item.",
          do: async (item,ctx)=>{
          
            if(confirm("Are you sure to delete")){
              ctx.close()
              await ctx.$store.dispatch("posadmin/updateItem", {
                _id: item._id,deleteFlag:true, collection: "possaledetail"
              });
              ctx.$emit("refresh")
            }
            
          }
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