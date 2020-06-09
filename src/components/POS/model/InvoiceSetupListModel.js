export default {
   
    collection: "posinvoicesetup",
    store:"posadmin",
    populate: ["shop"],
    listData: {
      icon: "mdi-inbox-outline",
      logo: "bannerPhoto",
      title: "_title",
      subtitle: "_subtitle",
      transform: (item) => {
        let _item = {...item}
        _item._title = item.name
        _item._subtitle = "width:" + (_item.width ? _item.width : "default") + ","
        + "height:" + (_item.height ? _item.height : "default") + ","
        + "font size:" + (_item.fontSize ? _item.fontSize : "default")
        return _item
       }
    },
    sortData: {
      items: [
        { text: "Item's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
      
      ]
    },
    searchData: {
      items: "name"
    },
    detailData: {
      title: "Invoice Setup's information",
      advanceActions: [
        
        {
          type: "action",
          title: "Delete Item ",
          subtitle: "You can delete this item.",
          do: async (item,ctx)=>{
          
            if(confirm("Are you sure to delete")){
              ctx.close()
              await ctx.$store.dispatch("posadmin/updateItem", {
                _id: item._id,deleteFlag:true, collection: "posinvoicesetup"
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
            value: "item.width",
            label: "Paper width",
            index: 2
        },
        {
            type: "subtitle",
            value: "item.height",
            label: "Paper height",
            index: 3
        },
        {
            type: "subtitle",
            value: "item.fontSize",
            label: "Paper font size",
          index: 4
        },
      ]
    },
    formData: {
      title: "Info about your invoice setup",
      subtitle: "add item's information",
      items: [
       
        {
          index: 1,
          type: "text",
          label: "Setup Name",
          icon: "mdi-account-outline",
          value: "name",
          required: true,
          counter: 30
          // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
        {
            index: 2,
            type: "autocomplete",
            collection: "posshop",
            label: "Shop (Optional)",
            findBy: ["name"],
            icon: "mdi-comment-processing-outline",
            value: "shop",
          },
          {
            index:3,
            type: "number",
            label: "Voucher paper width (optional)",
            icon: "mdi-comment-processing-outline",
            value: "width",
          },
          {
            index:4,
            type: "number",
            label: "Voucher font size (optional)",
            icon: "mdi-comment-processing-outline",
            value: "fontSize",
          },
        {
          index: 5,
          type: "file",
          label: "Upload banner photo (optional)",
          icon: "mdi-account-outline",
          value: "bannerPhoto"
        },
        {
            index: 6,
            type: "file",
            label: "Upload footer photo (optional)",
            icon: "mdi-account-outline",
            value: "footerPhoto"
          },
       
      ]
    }
  }