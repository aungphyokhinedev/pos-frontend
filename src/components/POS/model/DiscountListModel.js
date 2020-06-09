export default {
    collection: "posdiscount",
    store:"posadmin",
    listData: {
      icon: "mdi-gift-outline",
      logo: "photo",
      title: "name",
      subtitle: "description"
    },
    sortData: {
      items: [
        { text: "Discount's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
      ]
    },
    searchData: {
      items: "name"
    },
    detailData: {
      title: "Discount's information",
      actions: [
        {
          type: "link",
          title: "View Discounted Items",
          subtitle: "You can view items associated with this discount.",
          url: "/pos/home/mapping/:_id/discountItem"
        }
      ],
      advanceActions: [
        
        {
          type: "action",
          title: "Delete Item ",
          subtitle: "You can delete this item.",
          do: async (item,ctx)=>{
          
            if(confirm("Are you sure to delete")){
              ctx.close()
              await ctx.$store.dispatch("posadmin/updateItem", {
                _id: item._id,deleteFlag:true, collection: "posdiscount"
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
          value: "flatRate",
          label: "Flat Rate",
          index: 2
        },
        {
          type: "subtitle",
          label: "Percentage",
          value: "percentage",
          index: 3
        },
       

      ]
    },
    formData: {
      title: "Say something about your discount",
      subtitle: "add discount's information",
      items: [
        {
          index: 1,
          type: "text",
          label: "Discount Name",
          icon: "mdi-format-color-text",
          value: "name",
          required: true,
          counter: 20
          // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
    
        {
            index: 2,
            type: "text",
            label: "Discount Description",
            icon: "mdi-comment-processing-outline",
            value: "description",
            required: true
          },
          {
            index: 3,
            type: "number",
            label: "Flate Rate discount (optional)",
            icon: "mdi-numeric",
            value: "flatRate",
          },
          {
            index: 4,
            type: "number",
            label: "Percentage discount (optional)",
            icon: "mdi-label-percent-outline",
            value: "percentage",
          },
    
        {
          index: 5,
          type: "file",
          label: "Upload discount logo",
          icon: "mdi-account-outline",
          value: "logo"
        },
       
      ]
    }
  }