export default {
    collection: "postax",
    store:"posadmin",
    listData: {
      icon: "mdi-domain",
      logo: "photo",
      title: "name",
      subtitle: "description"
    },
    sortData: {
      items: [
        { text: "Tax's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
      ]
    },
    searchData: {
      items: "name"
    },
    detailData: {
      title: "Tax's information",
      advanceActions: [
        
        {
          type: "action",
          title: "Delete Item ",
          subtitle: "You can delete this item.",
          do: async (item,ctx)=>{
          
            if(confirm("Are you sure to delete")){
              ctx.close()
              await ctx.$store.dispatch("posadmin/updateItem", {
                _id: item._id,deleteFlag:true, collection: "postax"
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
      title: "Say something about your Tax",
      subtitle: "add tax's information",
      items: [
        {
          index: 1,
          type: "text",
          label: "Tax Name",
          icon: "mdi-format-color-text",
          value: "name",
          required: true,
          counter: 20
          // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
    
        {
            index: 2,
            type: "text",
            label: "Tax Description",
            icon: "mdi-comment-processing-outline",
            value: "description",
            required: true
          },
          {
            index: 3,
            type: "number",
            label: "Tax Flate Rate (optional)",
            icon: "mdi-numeric",
            value: "flatRate",
          },
          {
            index: 4,
            type: "number",
            label: "Tax Percentage Rate (optional)",
            icon: "mdi-label-percent-outline",
            value: "percentage",
          },
    
        {
          index: 5,
          type: "file",
          label: "Upload Tax logo",
          icon: "mdi-account-outline",
          value: "logo"
        },
       
      ]
    }
  }