export default {
    title: "Update User Information",
    subtitle: "please add your info",
    items: [
        {
            index: 1,
            type: "text",
            label: "Full Name",
            icon: "mdi-account-outline",
            value: "userName",
            required: true,
            // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
        },
        {
            index: 2,
            type: "file",
            label: "Upload your photo",
            icon: "mdi-account-outline",
            value: "photoUrl"
          },
         
    ]
}