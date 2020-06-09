
const disableItem = async(item,ctx) => {
  return await ctx.$store.dispatch("posfrontend/updateItem", {
    nocache: true,
    id: item._id,
    collection:'posshopitem',
    disable: !item.disable
  })
  
}

export default {
    title: "Deliverable Items Information",
    collection: "posshopitem",
    store:"posfrontend",
    listData: {
      icon: "mdi-comment-check-outline",
      logo: "photo",
      title: "name",
      subtitle: "_subtitle",
      transform: (item) => {
            let _item = {...item}
            _item._subtitle = item.description
            return _item
      },
      actions:[
        {
          type:"action",
          icon: "mdi-home-lock",
          condition:(item)=>{
            return item.disable
          },
          do: async (item,ctx)=>{
            if(disableItem(item,ctx)){
              ctx.$emit("refresh")
            }
          },
        },
        {
          type:"action",
          icon: "mdi-home-automation",
          condition:(item)=>{
            return !item.disable
          },
          do: async (item,ctx)=>{
            if(disableItem(item,ctx)){
              ctx.$emit("refresh")
            }
          },
        }
      ]
    },
    sortData: {
      items: [
        { text: "Item's Name", name: "name" },
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
        { text: "Status", name: "disable" }
      ] 
    },
    searchData: {
      items: "name"
    }, 
    detailData: {
      title: "Item's information",
      actions: [
        {
          type: "action",
          title: "Disable this Item",
          subtitle: "Disable Item will not allow future order",
          condition:(item)=>{
            return !item.disable
          },
          do: async (item,ctx)=>{
            if(disableItem(item,ctx)){
              ctx.close()
              ctx.$emit("refresh")
            }
            
          },
        },
        {
          type: "action",
          title: "Enable Item",
          subtitle: "Enable Item will allow future order",
          condition:(item)=>{
            return item.disable
          },
          do: async (item,ctx)=>{
            if(disableItem(item,ctx)){
              ctx.close()
              ctx.$emit("refresh")
            }
            
          },
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
          label: "Price",
          value: "unitPrice",
          index: 3
        },
        {
          type: "subtitle",
          label: "Unit",
          value: "unit",
          index: 4
        },

      ]
    },
   
  }