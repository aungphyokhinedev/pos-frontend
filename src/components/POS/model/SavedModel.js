export default {
    editItem:"name",
    key:"time",
     listData:{
      title:"name",
      subtitle:"qty",
      icon:"mdi-content-save-outline"
    },
    headers: [
     {
      text: "Item (click for edit)",
      align: "start",
      // sortable: false,
      value: "name",
      edit: true
    },
    { text: "Qty", align: "end", sortable: false, value: "qty" }
  
   ]
  }