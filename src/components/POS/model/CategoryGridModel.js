export default {
    collection: "poscategory",
    populate: [],
    listData: {
      icon: "mdi-basket-outline",
      photo: "logo",
      title: "name",
      subtitle: "description",
      store: "posfrontend"
    },
    actions: [
      {
        color:"primary",
        icon:"mdi-camera-outline",
        value:"scan"
      },
      {
        color:"primary",
        icon:"mdi-shape-square-plus",
        value:"addCategory"
      }
    ],
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
      item: {
       title: {
          value: "name",
        },
        subtitle: {
          value: "itemCode",
        },
        description: {
          value: "description",
        },
        photo:{
          value: "photo"
        },
      },
      action:
        {
          label:"Add to cart",
          type:"type one",
          value: "one"
        }
      
    },
    
  }