import constants from "../../../common/constants"
export default {
    collection: "posuser",
    store:"posadmin",
    populate: ["shop"],
    listData: {
      icon: "mdi-account-outline",
      logo: "photo",
      title: "fullName",
      subtitle: "_subtitle",
      transform: (item) => {
        let _item = {...item}
        _item._title = item.fullName
        _item._subtitle = "ID. " + item.name + ", Mobile No. " + item.mobile
        return _item
      } 
    },
    sortData: {
      items: [
        { text: "User's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
        { text: "Description", name: "description" }
      ]
    },
    searchData: {
      items: "fullName"
    },
    detailData: {
      title: "Sale person's information",
      advanceActions: [
        
        {
          type: "action",
          title: "Delete Item ",
          subtitle: "You can delete this item.",
          do: async (item,ctx)=>{
          
            if(confirm("Are you sure to delete")){
              ctx.close()
              await ctx.$store.dispatch("posadmin/updateItem", {
                _id: item._id,deleteFlag:true, collection: "posuser"
              });
              ctx.$emit("refresh")
            }
            
          }
        }
      ],
      items: [
        {
          type: "title",
          value: "fullName",
          index: 1
        },
        {
          type: "subtitle",
          label: "Assigned Shop",
          value: "shop.name",
          index: 2
        },
        {
          type: "subtitle",
          label: "Description",
          value: "description",
          index: 3
        },
        {
          type: "subtitle",
          label: "Mobile No",
          value: "mobile",
          index: 4
        },
        {
          type: "subtitle",
          label: "Email",
          value: "email",
          index: 5
        },

      ]
    },
    formData: {
      title: "Say about your sale person",
      subtitle: "Add sale person's Informatiom",
      items: [
        {
          index: 1,
          type: "text",
          label: "Login Name",
          icon: "mdi-account-outline",
          value: "name",
          required: true,
          counter: 20,
          rules: [{rule:constants.onlyLoginNameRule,message:"Invalid Name, only alphabet and digit allow"}]
          // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
        {
          index: 2,
          type: "text",
          label: "Full Name",
          icon: "mdi-account-outline",
          value: "fullName",
          required: true,
          counter: 20
          // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
        {
          index: 3,
          type: "text",
          label: "Sale Person Description",
          icon: "mdi-comment-processing-outline",
          value: "description",
          counter: 50,
          required: true
        },
        {
          index: 4,
          type: "text",
          label: "Mobile No.",
          icon: "mdi-phone-outline",
          value: "mobile",
          counter: 15,
          required: true,
          rules: [
            { rule: constants.mobileRule, message: "Invalid Mobile Number" }
          ]
        },
        {
          index: 5,
          type: "text",
          label: "Email",
          icon: "mdi-email-open-outline",
          value: "email",
          counter: 30,
          rules: [
            { rule: constants.emailRule, message: "Invalid Email Address" }
          ]
        },
        {
          index: 6,
          type: "autocomplete",
          collection: "posshop",
          label: "Assigned Shop (Optional)",
          findBy: ["name"],
          icon: "mdi-comment-processing-outline",
          value: "shop"
        },
        {
          index: 7,
          type: "file",
          label: "Upload User's Photo",
          icon: "mdi-account-outline",
          value: "photo"
        }
      ]
    }
  }