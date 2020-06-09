export default  {
    title: {
      label: "email",
      photo: "photoUrl",
      icon: "mdi-account",
      qr: "email",
    },
    menu: {
      items: [
        {
          title: "Home",
          icon: "mdi-home",
          type:"link",
          url:"/pos/home/entry"
        },
        {
          title: "Sale Login",
          icon: "mdi-basket",
          type:"link",
          url:"/pos/sale/login"
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
                { title: "Summary Report",
                type:"link",
                url:"/pos/home/summary"
                
              },
              ]
            }
          ]
        },
        
        
      ]
    }
  }