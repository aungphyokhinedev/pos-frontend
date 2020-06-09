export default {
    title: "Change New Password",
    subtitle: "please use secure password",
    items: [
        {
            index: 1,
            type: "password",
            label: "Current Password",
            icon: "mdi-account-outline",
            value: "currentPassword",
            required: true,
            // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
        {
            index: 2,
            type: "password",
            label: "New Password",
            icon: "mdi-account-outline",
            value: "newPassword",
            required: true,
            // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
        {
            index: 3,
            type: "password",
            label: "Confirm Password",
            icon: "mdi-account-outline",
            value: "confirmPassword",
            required: true,
            checks: [
                {
                    rule: (model) => {
                        if (model.newPassword != model.confirmPassword) {
                            return false
                        }
                        return true
                    }, message: "Password does not match"
                }
            ]
            // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
    ]
}