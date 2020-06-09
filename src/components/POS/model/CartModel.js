
export default  {
    editItem:"name",
    key:"_id",
    listData:{
      title:"title",
      subtitle:"displayAmt",
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
    { text: "Qty", align: "end", sortable: false, value: "qty" },
    { text: "Amt (k)", align: "end", sortable: false, value: "displayAmt" }
   ],
   transform: (item) => {
    let _item = {...item}
    _item._title = item.name 
    _item._qty = item.qty 
    _item._discount = item.totalDiscount 
    _item._amount = item.totalAmount
    return _item
   }
  }