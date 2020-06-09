import moment from "moment"
export default {
   
    collection: "posworkhour",
    store:"posadmin",
    populate: ["shop"],
    listData: {
      icon: "mdi-inbox-outline",
      logo: "photo",
      title: "_title",
      subtitle: "_subtitle",
      transform: (item) => {
        let _item = {...item}
        _item._title = item.shop.name + "-" + item.day 
        
        _item._start = moment(item.start).format("hh:mm A")
        _item._end = moment(item.end).format("hh:mm A")
        _item._subtitle = _item._start + "/" + _item._end + " " + item.description
        return _item
       }
    },
    sortData: {
      items: [
        { text: "Working Day", name: "day" },
        { text: "Created/Edited Time", name: "createdAt", default: -1 },
      
      ]
    },
    searchData: {
      items: "day"
    },
    detailData: {
      title: "Shop Workinghours information",
      advanceActions: [
        
        {
          type: "action",
          title: "Delete Item ",
          subtitle: "You can delete this item.",
          do: async (item,ctx)=>{
          
            if(confirm("Are you sure to delete")){
              ctx.close()
              await ctx.$store.dispatch("posadmin/updateItem", {
                _id: item._id,deleteFlag:true, collection: "posworkhour"
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
          index: 1
        },
        {
            type: "subtitle",
            value: "day",
            label: "Working Day",
            index: 2
        },
        {
          type: "subtitle",
          label: "Start Time",
          value: "_start",
          index: 3
        },
        {
            type: "subtitle",
            label: "End Time",
            value: "_end",
            index: 4
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
            type: "daypicker",
            label: "Working Day",
            icon: "mdi-home-outline",
            value: "day",
            counter: 50,
            required: true
          },
          {
            index: 3,
            type: "timerange",
            label: "Start Hour",
            icon: "mdi-home-outline",
            value: "start",
            counter: 50,
            required: true
          },
          {
            index: 4,
            type: "timerange",
            label: "End Hour",
            icon: "mdi-home-outline",
            value: "end",
            counter: 50,
            required: true
          },
          {
            index: 5,
            type: "text",
            label: "Remark",
            icon: "mdi-home-outline",
            value: "description",
            counter: 150,
            required: true
          },
      ]
    }
  }