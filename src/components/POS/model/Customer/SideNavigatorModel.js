export default  {
    title: {
      label: "email",
      photo: "photoUrl",
      icon: "mdi-account",
      qr: "_id"
    },
    menu: {
      items: [
        {
          title: "Home",
          icon: "mdi-home",
          type:"link",
          url:"/pos/front/user/shop"
        },
        {
          title: "My Cart Items",
          icon: "mdi-basket",
          type:"link",
          url:"/pos/front/user/cart"
        },
        {
          title: "Buyings",
          icon: "mdi-account",
          type:"link",
          url:"/pos/front/user/transaction/sale"
        },
        {
          title: "Orders",
          icon: "mdi-cube",
          type:"link",
          url:"/pos/front/user/transaction/order"
        },
        {
          title: "Settings",
          icon: "mdi-forum",
          group:true,
          value:true,
          subitems: [
            
            {
              title: "User",
              icon: "mdi-account",
              value:true,
              items: [
                {  
                  title: "Change Password", 
                  icon: "mdi-account", 
                  type:"action",
                  action:"changepassword"
                },
                { 
                  title: "Logged Out", 
                  icon: "mdi-cog",
                  type:"action",
                  action:"logout"
                }
              ]
            },
            {
              title: "Application",
              icon: "mdi-account",
              items: [
                {  
                  title: "Change Theme", 
                  icon: "mdi-format-color-highlight", 
                  type:"action",
                  action:(ctx)=>{
                    ctx.changeTheme()
                  }
                },
              ]
            },
            {
              title: "Reports",
              icon: "mdi-account",
              items: [
                { title: "Under Construction"},
              ]
            }
          ]
        },
        
        
      ]
    }
  }