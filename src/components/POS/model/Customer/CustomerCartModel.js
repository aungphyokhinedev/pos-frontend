export default  {
    editItem:"name",
    key:"_id",
    listData:{
      title:"title",
      subtitle:"subtitle",
      logo:"photo",
      icon:"mdi-tooltip-image-outline"
    },
    headers: [
    {
      text: "Item (click for edit)",
      align: "start",
      // sortable: false,
      value: "name",
       edit:true
    },
    { text: "Options", align: "start", sortable: false, value: "selected" },
    { text: "Qty", align: "end", sortable: false, value: "qty" },
    { text: "Discount", align: "end", sortable: false, value: "discountAmt" },
    { text: "Amt (k)", align: "end", sortable: false, value: "amountText" }
   ]
  }