export default {
    collection: "positem",
    populate: ["category","discount"],
    listData: {
      icon: "mdi-basket-outline",
      photo: "photo",
      title: "name",
      subtitle: "description",
      store: "posfrontend"
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