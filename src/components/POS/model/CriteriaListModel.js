import moment from "moment"
export default {
    collection: "poscriteria",
    store:"posadmin",
    listData: {
      icon: "mdi-aspect-ratio",
      logo: "photo",
      title: "name",
      subtitle: "_subtitle",
      transform: (item) => {
        let _item = {...item}
        _item._title = item.name 
        _item._subtitle = moment(item.createdAt).fromNow()
        return _item
       }
    },
    sortData: {
      items: [
        { text: "Criteria's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
      ]
    },
    searchData: {
      items: "name"
    },
    detailData: {
      title: "Criteria's information",
      advanceActions: [
        
        {
          type: "action",
          title: "Delete Item ",
          subtitle: "You can delete this item.",
          do: async (item,ctx)=>{
          
            if(confirm("Are you sure to delete")){
              ctx.close()
              await ctx.$store.dispatch("posadmin/updateItem", {
                _id: item._id,deleteFlag:true, collection: "poscriteria"
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
          label: "Criteria Name",
          index: 1
        },
        {
          type: "subtitle",
          value: "createdAt",
          label: "Created Date",
          index: 2
        },

      ]
    },
    formData: {
      title: "Advanced options setup",
      subtitle: "add criteria's information",
      items: [
        {
          index: 1,
          type: "text",
          label: "Criteria Name",
          icon: "mdi-account-outline",
          value: "name",
          required: true,
          counter: 20
          // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
        {
          index: 2,
          type: "criteria",
          label: "Criteria Setup",
          icon: "mdi-comment-processing-outline",
          value: "data",
          counter: 10,
          
        },
      ]
    }
  }