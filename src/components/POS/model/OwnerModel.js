import constants from "../../../common/constants"
export default {
    formData: {
        title:"Say something about business",
        subtitle:"add business's information",
        items: [
            {
              index: 1,
              type: "text",
              label: "Code Name",
              icon: "mdi-comma-box-outline",
              value: "codeName",
              required: true,
              counter: 20,
              rules: [
                {rule:constants.onlyLoginNameRule,message:"Invalid Code Name, only alphabet and digit allow"},
                {
                type: "action",
                rule: async (ctx,value) =>  {
                
                  let _query = {codeName:value.codeName}
                  if(value.owner){
                    _query.owner = {$ne:value.owner}
                  }
                  const _result = await ctx.$store.dispatch("posadmin/getItems",{
                    nocache: true,
                    public: true,
                    collection:"posowner",
                    populate: ["currency"],
                    page:1,
                    pageSize:1,
                    query:_query
                  })
              
                  return _result.total == 0;
                }, message: "Code Name is already used by other user"}
              ],
              
              // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
            },
            {
              index: 2,
              type: "text",
              label: "Owner Name",
              icon: "mdi-account-outline",
              value: "name",
              required: true,
              counter: 20
              // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
            },
            {
              index: 3,
              type: "text",
              label: "Company/Business Name",
              icon: "mdi-comma-box-outline",
              value: "companyName",
              required: true,
              counter: 50
              // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
            },
            {
              index:4,
              type: "autocomplete",
              public: true,
              collection: "poscurrency",
              label: "Currency Type (optional)",
              findBy: ["name"],
              icon: "mdi-comment-processing-outline",
              value: "currency",
            },
            {
              index: 5,
              type: "text",
              label: "Description",
              icon: "mdi-comment-processing-outline",
              value: "description",
              counter: 50,
              required: true
            },
            {
              index: 6,
              type: "text",
              label: "Mobile No.",
              icon: "mdi-phone-outline",
              value: "mobile",
              counter: 15,
              required: true,
              rules: [
                { rule: constants.mobileRule, message: "Invalid Mobile Number" }
              ]
            },
            {
              index: 7,
              type: "text",
              label: "Email",
              icon: "mdi-email-open-outline",
              value: "email",
              counter: 30,
              rules: [{ rule: constants.emailRule, message: "Invalid Email Address" }]
            },
            {
              index: 8,
              type: "file",
              label: "Upload Company logo",
              icon: "mdi-account-outline",
              value: "logo",
              required: true
            }
          ]
    }, 
    menuData: {
      items: [
        { icon: "mdi-home-outline", title: "Shop Setup", value: "0", group: true,
          items: [
            { icon: "mdi-home-outline", title: "Shops Information", value: "0", list:"shopList" },
            { icon: "mdi-account-outline", title: "Users Information", value: "1", list:"salePersonList" },
            { icon: "mdi-inbox-outline", title: "Deliverable Items Information", value: "8", list:"shopItemList" },
          ]
      },
      { icon: "mdi-basket-outline", title: "Item Setup", value: "1", group: true,
      items: [
        { icon: "mdi-aspect-ratio", title: "Item Categories Information", value: "2", list:"categoryList" },
        { icon: "mdi-aspect-ratio", title: "Items Information", value: "3", list:"itemList" },
        { icon: "mdi-gift-outline", title: "Discounts Information", value: "4", list:"discountList" },
        { icon: "mdi-aspect-ratio", title: "Criteria List Information", value: "12", list:"criteriaList" },
        { icon: "mdi-aspect-ratio", title: "Extrainfo Information", value: "13", list:"extrainfoList" },
       
      ]
  },

         { icon: "mdi-domain", title: "Taxes Information", value: "5", list:"taxList" },
        { icon: "mdi-basket-outline", title: "Sales Information", value: "6", list:"saleList" },
        { icon: "mdi-basket-outline", title: "Sale Details Information", value: "7", list:"saleDetailList" },
       
        { icon: "mdi-inbox-outline", title: "Order Information", value: "9", list:"orderList" },
        { icon: "mdi-inbox-outline", title: "Order Details Information", value: "10", list:"orderDetailList" },
        { icon: "mdi-account-outline", title: "Black List Information", value: "11", list:"blackList" },
        { icon: "mdi-aspect-ratio", title: "Voucher Setup", value: "14", list:"invoicesetupList" },
        
      ]
    }
    
    
}