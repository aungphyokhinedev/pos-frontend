export default  {
    title: {
      label: "fullName",
      photo: "photo",
      icon: "mdi-account",
      qr: "_id"
    },
    menu: {
      items: [
        {
          title: "Home",
          icon: "mdi-home",
          type:"link",
          url:"/pos/sale"
        },
        {
          title: "Transactions",
          icon: "mdi-swap-vertical-bold",
          type:"link",
          url:"/pos/sale/transaction/all"
        },
        {
          title: "Admin Login",
          icon: "mdi-account",
          type:"link",
          url:"/pos/login/owner"
        },
        
        {
          title: "Settings",
          icon: "mdi-forum",
          group:true,
          value:true,
          subitems: [
            {
              title: "Users",
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