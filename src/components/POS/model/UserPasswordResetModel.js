
export default {
    title:"User Password Reset",
    store: "poslogin",
    
    formData: {
      title:"User Password Reset",
      subtitle:"Please put your reset password information",
      store: "poslogin",
      message: "Your password has been changed, please login again.",
      items: [
        {
          index: 1,
          type:"text",
          label: "Reset Code",
          icon: "mdi-account-outline",
          value: "resetCode",
          required: true,
        },
        {
            index: 2,
            type:"text",
            label: "New Password",
            icon: "mdi-account-outline",
            value: "newPassword",
            required: true,
          },
      ]
    }
  }