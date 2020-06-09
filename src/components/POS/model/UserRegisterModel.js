import constants from "../../../common/constants"
export default {
    title:"User Register",
    store: "poslogin",
    
    formData: {
      title:"User Register",
      subtitle:"Please put your register information",
      store: "poslogin",
      message: "Your login password will be sent to your email",
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