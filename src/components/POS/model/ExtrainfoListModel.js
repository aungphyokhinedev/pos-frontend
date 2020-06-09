
export default {
    collection: "posextrainfo",
    populate: ["shopItem"],
    store:"posadmin",
    listData: {
      icon: "mdi-aspect-ratio",
      logo: "photo",
      title: "_title",
      subtitle: "_subtitle",
      transform: (item) => {
        let _item = {...item}
        _item._title = item.shopItem.name   
        _item._subtitle = item.value + (item.unitPrice?(" (" + item.unitPrice + ")"): "")
        _item.options = item.shopItem.options
        return _item
       }
    },
    sortData: {
      items: [
        { text: "Extrainfo's Name", value: "name" },
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
        { text: "Price", name: "unitPrice" },
      ]
    },
    searchData: {
      items: "name"
    },
    detailData: {
      title: "Extrainfo's information",
      advanceActions: [
        
        {
          type: "action",
          title: "Delete Item ",
          subtitle: "You can delete this item.",
          do: async (item,ctx)=>{
          
            if(confirm("Are you sure to delete")){
              ctx.close()
              await ctx.$store.dispatch("posadmin/updateItem", {
                _id: item._id,deleteFlag:true, collection: "posextrainfo"
              });
              ctx.$emit("refresh")
            }
            
          }
        }
      ],
      items: [
        {
          type: "title",
          value: "_title",
          label: "Setup date",
          index: 1
        },
        {
          type: "subtitle",
          value: "value",
          label: "Setup value",
          index: 2
        },
        {
          type: "subtitle",
          value: "unitPrice",
          label: "Unit Price",
          index: 3
        },
      ]
    },
    formData: {
      title: "Advanced options setup",
      subtitle: "add extrainfo's information",
      items: [
        {
          index: 1,
          type: "autocomplete",
          collection: "posshopitem",
          label: "Item Name",
          findBy: ["name"],
          icon: "mdi-comment-processing-outline",
          value: "shopItem",
          extraValues: [{name:"options",value:"options"},{name:"name",value:"name"}],
          required: true
        },
        {
          index: 2,
          type: "criteriaoption",
          label: "Criteria Setup",
          icon: "mdi-comment-processing-outline",
          data:"options",
          value: "value",
        },
        {
            index: 3,
            type: "number",
            label: "New Price(Optional)",
            icon: "mdi-comment-processing-outline",
            value: "unitPrice",
          },
          {
            index: 4,
            type: "file",
            label: "Upload product photo(Optional)",
            icon: "mdi-account-outline",
            value: "photo"
          },
      ]
    }
  }