import moment  from "moment";
export default {
    title: "Black List Information",
    collection: "posblacklist",
    populate:["customer"],
    store:"posadmin",
    listData: {
      icon: "mdi-comment-check-outline",
      logo: "logo",
      title: "_title",
      subtitle: "_subtitle",
      transform: (item) => {
            let _item = {...item}
            _item._title =  moment(item.createdAt).fromNow() 
            _item._subtitle = item.customer.name + " - " + item.description
            _item._customer = item.customer.name
            _item._customerId = item.customer.customerId
            _item._date = moment(item.createdAt).format("LLLL")
            return _item
        } 
    },
    sortData: {
      items: [
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
        { text: "Description", name: "description" }
      ]
    },
    searchData: {
      items: "description"
    },
    detailData: {
      title: "Black List's information",
      advanceActions: [
        
        {
          type: "action",
          title: "Delete Item ",
          subtitle: "You can delete this item.",
          do: async (item,ctx)=>{
          
            if(confirm("Are you sure to delete")){
              ctx.close()
              await ctx.$store.dispatch("posadmin/updateItem", {
                _id: item._id,deleteFlag:true, collection: "posblacklist"
              });
              ctx.$emit("refresh")
            }
            
          }
        }
      ],
     
      items: [
        {
          type: "title",
          value: "_customerId",
          index: 1
        },
        {
          type: "subtitle",
          label: "Customer",
          value: "_customer",
          index: 2
        },
        {
            type: "subtitle",
            label: "Description/Remark",
            value: "description",
            index: 3
          },
        {
          type: "subtitle",
          label: "Date",
          value: "_date",
          index: 4
        },

      ]
    },
    formData: {
        title: "Black listed customer",
        subtitle: "add black listed information",
        items: [
            {
                index: 1,
                type: "autocomplete",
                collection: "poscustomer",
                public: true,
                label: "Customer ID",
                findBy: ["customerId"],
                icon: "mdi-comment-processing-outline",
                value: "customer",     
                required: true      
              },
          {
            index: 2,
            type: "text",
            label: "Black list descrption",
            icon: "mdi-comment-processing-outline",
            value: "description",
            counter: 100,
            required: true
          },
        ]
      }
  }