import constants from "../../../common/constants"
export default {
   
    collection: "posshopitem",
    store:"posadmin",
    populate: ["item","discount","shop"],
    listData: {
      icon: "mdi-inbox-outline",
      logo: "photo",
      title: "name",
      subtitle: "description",
      transform: (item) => {
        let _item = {...item}
        _item._title = item.name 
        _item._subtitle = item.description
        _item._orderUrl = constants.frontendUrl + "#/pos/front/user/do/order/" + item._id
        _item._qr = JSON.stringify({pid:item._id})
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
      title: "Delivery Item's information",
      advanceActions: [
        
        {
          type: "action",
          title: "Delete Item ",
          subtitle: "You can delete this item.",
          do: async (item,ctx)=>{
          
            if(confirm("Are you sure to delete")){
              ctx.close()
              await ctx.$store.dispatch("posadmin/updateItem", {
                _id: item._id,deleteFlag:true, collection: "posshopitem"
              });
              ctx.$emit("refresh")
            }
            
          }
        }
      ],
      actions: [
        {
          type: "link",
          title: "Product Detail Setup",
          subtitle: "You can setup advanced options for sale item.",
          url: "/pos/home/productsetup/:_id"
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
            value: "item.name",
            label: "Item Name",
            index: 2
        },
        {
          type: "subtitle",
          label: "Shop Name",
          value: "shop.name",
          index: 3
        },
        {
          type: "subtitle",
          label: "Unit Price",
          value: "unitPrice",
          index: 4
        },
        {
          type: "subtitle",
          label: "Discount Type",
          value: "discount.name",
          index: 5
        },
        {
          type: "subtitle",
          label: "Advance Criteria",
          value: "criteria.name",
          index: 6
        },
        {
          type: "subtitle",
          value: "description",
          label: "Description",
          index: 7
        },
       
          {
            type: "subtitle",
            label: "Unit",
            value: "unit",
            index: 8
          },
          {
            type: "subtitle",
            label: "Order URL",
            value: "_orderUrl",
            index: 9
          },
          {
            type: "barcode",
            value: "_qr",
            title: "Order URL QR Code",
            name: "name",
            hidelabel: true,
            index: 10
          },
      ]
    },
    formData: {
      title: "Info about your delivery item",
      subtitle: "add item's information",
      items: [
        {
            index: 1,
            type: "autocomplete",
            collection: "posshop",
            label: "Shop",
            findBy: ["name"],
            icon: "mdi-comment-processing-outline",
            value: "shop",
            required: true
          },
          {
            index: 2,
            type: "autocomplete",
            collection: "positem",
            label: "Item",
            findBy: ["name"],
            icon: "mdi-comment-processing-outline",
            value: "item",
            extraValues: [
                {name:"unitPrice", value:"unitPrice"},
                {name:"name", value:"name"},
                {name:"description", value:"description"},
                {name:"unit", value:"unit"},
                {name:"photo", value:"photo"},
            ],
            required: true
          },
        {
          index: 3,
          type: "text",
          label: "Delivery Item Name",
          icon: "mdi-account-outline",
          value: "name",
          required: true,
          counter: 30
          // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
        {
            index: 4,
            type: "text",
            label: "Item Description",
            icon: "mdi-comment-processing-outline",
            value: "description",
            required: true
          },
          {
            index:5,
            type: "number",
            label: "Unit Price",
            icon: "mdi-comment-processing-outline",
            value: "unitPrice",
            required: true
          },
          {
            index: 6,
            type: "text",
            label: "SKU (Stock Keeping Unit)",
            icon: "mdi-comment-processing-outline",
            value: "unit",
            required: true
          },
          {
            index: 7,
            type: "autocomplete",
            collection: "posdiscount",
            label: "Discount (optional)",
            findBy: ["name"],
            icon: "mdi-comment-processing-outline",
            value: "discount",
          },
          {
            index: 8,
            type: "customcriteriaoption",
            label: "Advance Criteria (optional)",
            icon: "mdi-comment-processing-outline",
            value: "options",
            
          },
        {
          index: 9,
          type: "file",
          label: "Upload product photo",
          icon: "mdi-account-outline",
          value: "photo"
        },
       
      ]
    }
  }