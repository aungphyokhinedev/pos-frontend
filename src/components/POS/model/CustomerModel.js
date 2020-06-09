import constants from "../../../common/constants"
export default {
    formData: {
        title:"Say something about you",
        subtitle:"add contact's information",
        items: [
            {
              index: 1,
              type: "text",
              label: "Name",
              icon: "mdi-comma-box-outline",
              value: "name",
              required: true,
              counter: 20,
            
              // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
            },
            {
                index: 2,
                type: "text",
                label: "Mobile No.",
                icon: "mdi-phone-outline",
                value: "mobile",
                counter: 15,
                required: true,
                rules: [
                  { rule: constants.mobileRule, message: "Invalid Mobile Number" }
                ]
              },
            {
              index: 3,
              type: "text",
              label: "Address",
              icon: "mdi-account-outline",
              value: "address",
              required: true,
              counter: 20
              // rules: [{rule:constants.emailRule,message:"Invalid Email"}]
            },
            {
                index: 4,
                type: "location",
                label: "Your Location",
                icon: "mdi-account-outline",
                value: "location",
                required: true
            },
            
            {
              index: 5,
              type: "file",
              label: "Upload your photo",
              icon: "mdi-account-outline",
              value: "photo",
             
            }
          ]
    },
    
    
}

