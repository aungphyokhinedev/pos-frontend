import constants from "../../../common/constants"
export default {
    collection: "posshop",
    store:"posadmin",
    populate: ["tax","discount"],
    listData: {
      icon: "mdi-home-outline",
      logo: "logo",
      title: "name",
      subtitle: "_subtitle", 
      transform: (item) => {
        let _item = {...item}
        _item._qr = JSON.stringify({sid:item._id})
        _item._subtitle = item.address + ", Mobile No. " + item.mobile
        return _item
      } 
    },
    sortData: {
      items: [
        { text: "Shop's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
        { text: "Address", name: "address" }
      ]
    },
    searchData: {
      items: "name"
    },
    detailData: {
      title: "Shop's information",
      actions: [
        {
          type: "link",
          title: "Assigned Users",
          subtitle: "You can view all assigned users from this shop.",
          url: "/pos/home/mapping/:_id/shopUser"
        },
        {
          type: "link",
          title: "Deliverable Items",
          subtitle: "You can view all deliverable items from this shop.",
          url: "/pos/home/mapping/:_id/shopShopItem"
        },
       
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
                _id: item._id,deleteFlag:true, collection: "posshop"
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
          label: "Description",
          value: "description",
          index: 2
        },
        {
          type: "subtitle",
          label: "Mobile No.",
          value: "mobile",
          index: 3
        },
        {
          type: "subtitle",
          label: "Email",
          value: "email",
          index: 4
        },
        {
          type: "barcode",
          value: "_qr",
          title: "Shop QR Code",
          name: "name",
          hidelabel: true,
          index: 5
        },
      ]
    },
    formData: {
      title: "Say something about your shop",
      subtitle: "ADD SHOP'S INFORMATION",
      items: [
        {
          index: 1,
          type: "text",
          label: "Shop Name",
          icon: "mdi-account-outline",
          value: "name",
          required: true,
          counter: 20
          // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
        {
          index: 2,
          type: "text",
          label: "Shop Description",
          icon: "mdi-comment-processing-outline",
          value: "description",
          counter: 50,
          required: true
        },
       
        {
          index: 3,
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
          index: 4,
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
          index: 5,
          type: "text",
          label: "Shop's Address",
          icon: "mdi-home-outline",
          value: "address",
          counter: 50,
          required: true
        },
        {
          index: 6,
          type: "location",
          label: "Shop Location",
          icon: "mdi-account-outline",
          value: "location",
          required: true
        },
        {
          index: 7,
          type: "autocomplete",
          collection: "postax",
          label: "Tax Type (Optional)",
          findBy: ["name"],
          icon: "mdi-comment-processing-outline",
          value: "tax",
         
        },
        {
          index: 8,
          type: "autocomplete",
          collection: "posdiscount",
          label: "Discount Type (Optional)",
          findBy: ["name"],
          icon: "mdi-comment-processing-outline",
          value: "discount",
        
        },
       
        {
          index: 9,
          type: "timerange",
          label: "Shop's Opening Time",
          icon: "mdi-home-outline",
          value: "startTime",
          counter: 50,
          required: true
        },
        {
          index: 10,
          type: "timerange",
          label: "Shop's Closing Time",
          icon: "mdi-home-outline",
          value: "endTime",
          counter: 50,
          required: true
        },
        {
          index: 11,
          type: "optionpicker",
          label: "Working Day",
          icon: "mdi-home-outline",
          value: "workingDays",
          items:[
            {name:"Sun",checked:false},
            {name:"Mon",checked:false},
            {name:"Tue",checked:false},
            {name:"Wed",checked:false},
            {name:"Thu",checked:false},
            {name:"Fri",checked:false},
            {name:"Sat",checked:false},
            ],
          counter: 50,
          required: true
        },
        {
          index: 12,
          type: "optionpicker",
          label: "Our Services",
          icon: "mdi-home-outline",
          value: "services",
          items:[
            {name:"Wifi",checked:false,icon:"mdi-wifi"},
            {name:"Parking",checked:false,icon:"mdi-parking"},
            {name:"Delivery",checked:false,icon:"mdi-bike"},
            {name:"Cashdown",checked:false,icon:"mdi-cash-multiple"},
            {name:"Resturant",checked:false,icon:"mdi-silverware-fork-knife"}
            ],
            counter: 50,
            required: true
        },
        {
          index: 13,
          type: "file",
          label: "Upload shop's logo",
          icon: "mdi-account-outline",
          value: "logo"
        },
       
      ]
    }
  }