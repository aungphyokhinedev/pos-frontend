import constants from "../../../common/constants"
export default {
    title:"User Login",
    store: "poslogin",
    formData: {
      title:"User Login",
      subtitle:"Please put your login information",
      rememberPassword: true,
      action: {
        label: "User Login"
      },
      store: "poslogin",
      items: [
        {
          index: 1,
          type:"text",
          label: "Login Email",
          icon: "mdi-account-outline",
          value: "email",
          required: true,
          rules: [{ rule: constants.emailRule, message: "Invalid Email" }]
        },
        {
          index: 2,
          type: "password",
          label: "Password",
          value: "password",
          required: true
        },
        {
          index: 3,
          type: "checkbox",
          label: "Remember Password",
          value: "remember",
        }
      ]
    }
  }