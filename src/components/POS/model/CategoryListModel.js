export default {
    collection: "poscategory",
    store:"posadmin",
    listData: {
      icon: "mdi-aspect-ratio",
      logo: "photo",
      title: "name",
      subtitle: null,
      transform: (item) => {
        let _item = {...item}
        _item._title = item.name 
        _item._subtitle = item.description
        return _item
       }
    },
    sortData: {
      items: [
        { text: "Category's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
        { text: "Category's Code", name: "categoryCode" }
      ]
    },
    searchData: {
      items: "name"
    },
    detailData: {
      title: "Category's information",
      advanceActions: [
        
        {
          type: "action",
          title: "Delete Item ",
          subtitle: "You can delete this item.",
          do: async (item,ctx)=>{
          
            if(confirm("Are you sure to delete")){
              ctx.close()
              await ctx.$store.dispatch("posadmin/updateItem", {
                _id: item._id,deleteFlag:true, collection: "poscategory"
              });
              ctx.$emit("refresh")
            }
            
          }
        }
      ],
      actions: [
        {
          type: "link",
          title: "View Items In Category",
          subtitle: "You can view all items from this category.",
          url: "/pos/home/mapping/:_id/categoryItem"
        }
      ],
      items: [
        {
          type: "title",
          value: "name",
          label: "Category Name",
          index: 1
        },
        {
          type: "subtitle",
          value: "categoryCode",
          label: "Category Code",
          index: 2
        },
        {
          type: "subtitle",
          label: "Color",
          value: "color",
          index: 3
        },

      ]
    },
    formData: {
      title: "Say something about your category",
      subtitle: "add cateogry's information",
      items: [
        {
          index: 1,
          type: "text",
          label: "Category Name",
          icon: "mdi-account-outline",
          value: "name",
          required: true,
          counter: 20
          // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
        {
          index: 2,
          type: "text",
          label: "Category Code",
          icon: "mdi-comment-processing-outline",
          value: "categoryCode",
          counter: 10,
          required: true
        },
        {
            index: 3,
            type: "color",
            label: "Cateogry Color",
            icon: "mdi-account-outline",
            value: "color"
        },
        {
          index: 4,
          type: "file",
          label: "Upload category logo",
          icon: "mdi-account-outline",
          value: "photo"
        },
       
      ]
    }
  }