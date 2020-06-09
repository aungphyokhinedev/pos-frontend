import constants from "../../../common/constants"
export default {
    formData: {
      rememberPassword: true,
      action: {
        label: "Email Login"
      },
      items: [
        {
          index: 1,
          label: "Email",
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
        }
      ]
    }
  }