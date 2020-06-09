export default {
    collection: "positem",
    store:"posadmin",
    populate: ["category","discount"],
    listData: {
      icon: "mdi-basket-outline",
      logo: "photo",
      title: "name",
      subtitle: "description",
      transform: (item) => {
        let _item = {...item}
        _item._title = item.name 
        _item._qr = JSON.stringify({code:item.itemCode}) 
        _item._subtitle = item.description
        return _item
       }
    },
    sortData: {
      items: [
        { text: "Item's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
        { text: "Item's Code", name: "itemCode" }
      ]
    },
    searchData: {
      items: "name"
    },
    detailData: {
      title: "Item's information",
      advanceActions: [
        
        {
          type: "action",
          title: "Delete Item ",
          subtitle: "You can delete this item.",
          do: async (item,ctx)=>{
          
            if(confirm("Are you sure to delete")){
              ctx.close()
              await ctx.$store.dispatch("posadmin/updateItem", {
                _id: item._id,deleteFlag:true, collection: "positem"
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
          value: "itemCode",
          label: "Item Code",
          index: 2
        },
        {
          type: "subtitle",
          label: "Category",
          value: "category.name",
          index: 3
        },
        {
          type: "subtitle",
          label: "Discount Type",
          value: "discount.name",
          index: 4
        },
        {
          type: "subtitle",
          value: "description",
          label: "Description",
          index: 5
        },
        {
            type: "subtitle",
            value: "unitPrice",
            label: "Unit Price",
            index: 6
        },
          {
            type: "subtitle",
            label: "Unit",
            value: "unit",
            index: 7
          },
          {
            type: "barcode",
            value: "_qr",
            title: "Item QR Code",
            name: "name",
            hidelabel: true,
            index: 8
          },
      ]
    },
    formData: {
      title: "Say something about your item",
      subtitle: "add item's information",
      items: [
        {
          index: 1,
          type: "text",
          label: "Item Name",
          icon: "mdi-account-outline",
          value: "name",
          required: true,
          counter: 30
          // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
        {
            index: 2,
            type: "text",
            label: "Item Code",
            icon: "mdi-account-outline",
            value: "itemCode",
            required: true,
            counter: 20
            // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
        {
          index: 3,
          type: "autocomplete",
          collection: "poscategory",
          label: "Category",
          findBy: ["name"],
          icon: "mdi-comment-processing-outline",
          value: "category",
          required: true
        },
        {
          index: 4,
          type: "autocomplete",
          collection: "posdiscount",
          label: "Discount (optional)",
          findBy: ["name"],
          icon: "mdi-comment-processing-outline",
          value: "discount",
        },
        {
            index: 5,
            type: "text",
            label: "Item Description",
            icon: "mdi-comment-processing-outline",
            value: "description",
            required: true
          },
          {
            index: 6,
            type: "number",
            label: "Unit Price",
            icon: "mdi-comment-processing-outline",
            value: "unitPrice",
            required: true
          },
          {
            index: 7,
            type: "text",
            label: "SKU (Stock Keeping Unit)",
            icon: "mdi-comment-processing-outline",
            value: "unit",
            required: true
          },
        {
          index: 8,
          type: "file",
          label: "Upload product photo",
          icon: "mdi-account-outline",
          value: "photo"
        },
       
      ]
    }
  }