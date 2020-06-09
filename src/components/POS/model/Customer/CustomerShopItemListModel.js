import numeral from "numeral"
import constants from "../../../../common/constants"
import calculateModel from "../CalculateModel"
export default {
    collection: "posshopitem",
    store:"pospublic",
    populate: ["item","discount","shop"],
    listData: {
      icon: "mdi-inbox-outline",
      logo: "photo",
      title: "name",
      subtitle: "_subtitle",
      content: "_content",
      transform: (item) => {
     
        let _item = {...item}
        _item = calculateModel.calculate(_item)
        _item._title = item.name
        _item._subtitle = item.description + ", Price: " + numeral(item.unitPrice).format(constants.numberFormat) + 
        _item.discountInfo.detail
        + "<br/>Total " + numeral(_item.discountInfo.totalAmount).format(constants.numberFormat)
        _item._content = item.description
        +  "<br/>Unit Price: " + numeral(item.unitPrice).format(constants.numberFormat) 
        + _item.discountInfo.summary
        + "<br/>Total: " + numeral(_item.discountInfo.totalAmount).format(constants.numberFormat)
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
          label: "Discount Type",
          value: "discount.name",
          index: 4
        },
        {
            type: "subtitle",
            label: "Discount Price",
            value: "discount.flatRate",
            index: 5
          },
          {
            type: "subtitle",
            label: "Discount Percentage",
            value: "discount.percentage",
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
          type: "file",
          label: "Upload product photo",
          icon: "mdi-account-outline",
          value: "photo"
        },
       
      ]
    }
  }