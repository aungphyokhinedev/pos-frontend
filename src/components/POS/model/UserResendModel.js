import constants from "../../../common/constants"
export default {
    title:"Send Password Reset Code",
    store: "poslogin",
    
    formData: {
      title:"Send Password Reset Code",
      subtitle:"Please put your register information",
      store: "poslogin",
      message: "Your reset code will be sent to your email",
      needReset: true,
      items: [
        {
          index: 1,
          type:"text",
          label: "Register Email",
          icon: "mdi-account-outline",
          value: "email",
          required: true,
          rules: [{ rule: constants.emailRule, message: "Invalid Email" }]
        },
      ]
    }
  }