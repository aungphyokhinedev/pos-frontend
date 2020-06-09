
export default {
    title:"Sale User Password Reset",
    store: "possalelogin",
    
    formData: {
      title:"Sale User Password Reset",
      subtitle:"Please put your reset password information",
      store: "possalelogin",
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