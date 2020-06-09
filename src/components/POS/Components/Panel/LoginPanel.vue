<template>

 
<div class="d-flex justify-center align-center" style="height:100%;">
 
      <v-card style="width:400px;max-width:100%" class="shadow">
         

        <v-row v-if="scheme" align="center" justify="space-around">
          <v-col align="center" justify="center" cols="12">
            <div v-if="page==0">
              <LoginLogo class="mb-5" />
             
              <LoginHistory
          
                class="ml-5 mr-5"
                v-if="histories"
                v-on:remove="removeHistory"
                v-on:click="login"
                :items="histories"
              />
              <div class="ma-9 mb-3 mt-3">
                <v-btn
                  @click="showLogin"
                  class="mt-3"
                  dark
                  block
                  outlined
                  color="primary"
                >{{loginModel.action.label}}</v-btn>
                 <CustomFacebookLogin 
                v-if="type=='owner' || type=='user'"
                 :model="fbLoginModel"
                 v-on:login="socialLogin" 
                 class="mt-1" />
              </div>
             
              <v-flex>
                <v-btn class="mb-5" @click="setPage(1)" text color="primary">More</v-btn>
                <v-spacer />
              </v-flex>
            </div>
            <div v-if="page==1">
              <div v-if="page==1">
                <LoginLogo class="mb-2" />
                
                <div class="ma-9 mt-0 mb-3">
                  <div>
                    <div class="mt-3 mb-1" v-if="registerModel">
                      No account?
                      <v-btn @click="showRegister" text class="pa-0" color="primary">Signup</v-btn>
                    </div>
       
                    <v-btn
                      @click="showResend"
                      class="mb-1"
                      dark
                      block
                      outlined
                      color="primary"
                      v-if="resendModel"
                    >Reset Password</v-btn>

                    <v-btn @click="page=0" class="mt-2 mb-3" color="primary" text>Back</v-btn>
                  </div>
                </div>
              </div>
            </div>
            <EntryForm
              :title="loginModel.title"
              :subtitle="loginModel.subtitle"
              :items="loginModel.items"
              v-on:save="login"
              ref="login"
            />
            <EntryForm
              v-if="registerModel"
              :title="registerModel.title"
              :subtitle="registerModel.subtitle"
              :items="registerModel.items"
              v-on:save="register"
              ref="register"
            />
            <EntryForm
              v-if="resendModel"
              :title="resendModel.title"
              :subtitle="resendModel.subtitle"
              :items="resendModel.items"
              v-on:save="resend"
              ref="resend"
            />
            <EntryForm
              :title="resetModel.title"
              :subtitle="resetModel.subtitle"
              :items="resetModel.items"
              v-on:save="reset"
              ref="reset"
            />

            <AlertDialogue :model="alertModel" />
          </v-col>
        </v-row>
     
      </v-card>
   
  </div>
</template>

<script>
import CustomFacebookLogin from "../Common/CustomFacebookLogin"
import EntryForm from "../Dialogue/EntryForm";
import LoginHistory from "../List/LoginHistoryList";
import LoginLogo from "../Common/LoginLogo";
import AlertDialogue from "../Dialogue/AlertDialogue";
export default {
  components: {
    EntryForm: EntryForm,
    LoginLogo: LoginLogo,
    LoginHistory: LoginHistory,
    AlertDialogue: AlertDialogue,
    CustomFacebookLogin:CustomFacebookLogin
  },
  created() {},
  props: ["scheme","model"],
  computed: {
    type() {
      return this.model ? this.model.type : null
    },
    loading() {
      return this.$store.state[this.scheme.store].loading;
    },
    histories() {
      return this.$store.state[this.scheme.store].histories;
    },
    loginModel() {
      return this.scheme.login ? this.scheme.login.formData : null;
    },
    resendModel() {
      return this.scheme.resend ? this.scheme.resend.formData : null;
    },
    resetModel() {
      return this.scheme.reset ? this.scheme.reset.formData : null;
    },
    registerModel() {
      return this.scheme.register ? this.scheme.register.formData : null;
    }
  },
  watch: {},
  methods: {
    
    async socialLogin(params) {
      const _registerResult = await this.socialRegister(params)
      if(_registerResult.success){
        await this.$store.dispatch(this.scheme.store + "/setType", this.model.type);
         const _result =  await this.$store.dispatch(this.scheme.store + "/socialLogin", params);
         if(_result.success) {
            this.$emit("sociallogin", {...params,..._result});
         }
         else{
            this.alertShow({ error:{
              title: "Socail Login Error",
              subtitle: _result.message
            }}
          )
         }
      }
      else{
         this.alertShow({ error:{
              title: "Socail Login Error",
              subtitle: _registerResult.message
            }}
          )
      }
     
      
    },
    async socialRegister(params) {
       const _result =  await this.$store.dispatch(this.scheme.store + "/socialRegister", params);
       return _result;
   },
    setPage(page) {
      this.page = page;
    },
    alertShow(params){
      if (params.success) {
        this.alertModel.title = params.success.title;
        this.alertModel.subtitle = params.success.subtitle; 
        this.alertModel.show = true;
      } else if(params.error) {
        this.alertModel.type = "error";
        this.alertModel.title = params.error.title;
        this.alertModel.subtitle = params.error.subtitle;
        this.alertModel.show = true;
      }
       
    },
    removeHistory(params) {
      this.$store.dispatch(this.scheme.store + "/removeHistory", params);
    },
    async register(params) {
      params.provider = "local";

      const _result = await this.$store.dispatch(
        this.scheme.store + "/register",
        params
      );
      this.alertShow( _result.success?{ success:{
          title: "Register Complete",
          subtitle: this.registerModel.message
        }} : { error:{
          title: "Register Error",
          subtitle: _result.message
        }}
      )
    },
    async resend(params) {
      const _result = await this.$store.dispatch(
        this.scheme.store + "/sendResetCode",
        params
      );


      if (_result.success) {
        this.resetEmail = params.email;
        if (this.resendModel.needReset) {
          this.$refs.reset.show({});
        } else {
          this.alertModel.title = "Resend Password Complete";
          this.alertModel.subtitle = this.resendModel.message;
          this.alertModel.show = true;
        }
      } else {
        this.alertModel.type = "error";

        this.alertModel.title = "Sending Reset Code Fail";
        this.alertModel.subtitle = _result.message;
        this.alertModel.show = true;
      }
    },
    async reset(params) {
      params.email = this.resetEmail;
      const _result = await this.$store.dispatch(
        this.scheme.store + "/resetPassword",
        params
      );
      this.alertShow( _result.success?{ success:{
          title: "Reset Password Complete",
          subtitle: this.resetModel.message
        }} : { error:{
          title: "Reset Password Fail",
          subtitle: _result.message
        }}
      )

    },
    login(params) {
     
      this.$emit("finish", params);
    },
    changeValue(params) {
      let _newmodel = { ...this.model };
      _newmodel[params.name] = params.value;
      this.model = _newmodel;
    },
    showLogin() {
      this.$refs.login.show({});
    },
    showRegister() {
      this.$refs.register.show({});
    },
    showResend() {
      this.$refs.resend.show({});
    },
    showReset() {
      this.$refs.reset.show({});
    }
  },
  data: () => ({
    page: 0,
    resetEmail: null,
    done: true,
    showError: false,
    fbLoginModel:{
      title:"Login with Facebook"
    },
    fbRegisterModel:{
      title:"Signup with Facebook"
    },
    alertModel: {
      persistent: true,
      show: false,
      title: "",
      subtitle: "",
      type: "info",
      actions: {
        ok: {
          name: "Close"
        }
      }
    },
    error: null,
    passwordRemenber: true,
   // model: {}
  })
};
</script>

<style lang="scss">
.shadow {
  box-shadow: 2px 108px 136px -78px rgba(0, 0, 0, 0.7);
}
.back {
  direction: ltr;
  // background: url('../imgs/spass01.png');
  background-size: cover;
}
</style>