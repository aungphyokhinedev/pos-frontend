import constants from "../../../common/constants"
export default {
    title:"Sale User Send Reset Code",
    store: "possalelogin",
    formData: {
      title:"Sale User Send Reset Code",
      subtitle:"Please put your login information",
      store: "possalelogin",
      message: "Your new password will be sent to your email",
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
      ]
    }
  }