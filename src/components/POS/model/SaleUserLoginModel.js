import constants from "../../../common/constants"
export default {
    title:"Sale User Login",
    store: "possalelogin",
    formData: {
      title:"Sale User Login",
      subtitle:"Please put your login information",
      rememberPassword: true,
      action: {
        label: "Sale User Login"
      },
      store: "possalelogin",
      items: [
        {
            index: 1,
            type:"text",
            label: "Business Code",
            icon: "mdi-home-outline",
            value: "code",
            required: true,
        },
        {
          index: 2,
          type:"text",
          label: "Login Name",
          icon: "mdi-account-outline",
          value: "name",
          required: true,
          rules: [{ rule: constants.onlyLoginNameRule, message: "Invalid Login Name" }]
        },
        {
          index: 3,
          type: "password",
          label: "Password",
          value: "password",
          required: true
        },
        {
          index: 4,
          type: "checkbox",
          label: "Remember Password",
          value: "remember",
        }
      ]
    }
  }