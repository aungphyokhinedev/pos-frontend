<template>
    <UserDirectOrderPanel
 v-on:changepassword="changePassword"
   v-on:updateuser="updateUser"
    v-on:logout="logout"
  />
</template>
<script>
import UserDirectOrderPanel from "../Components/Panel/UserDirectOrderPanel"
export default {
    components: {
        UserDirectOrderPanel
    },
    methods:{
         async changePassword(params){
        if(params.newPassword == params.confirmPassword){
       
          const result = await this.$store.dispatch("poslogin/changePassword",params)
          if(result.success){
            const type = this.$store.getters['poslogin/type']
            this.$router.push("/pos/login/" + type + "/" + result.message._id);
          }
          else{
            alert(result.message)
          }
        }
        
      },
      async updateUser(params) {

        await this.$store.dispatch("poslogin/updateAccount",params)
        await this.$store.dispatch("pospublic/getAccount");
      },
    logout() {
     
      this.$store.dispatch("poslogin/logout");
       this.$store.dispatch("pospublic/clearAll");
    },
    }

}
</script>