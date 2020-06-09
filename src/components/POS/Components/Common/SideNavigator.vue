

<template>
 <v-navigation-drawer
   
      v-model="model.show"
      app
      class="secondary"
      dark
    >
       
 <v-row no-gutters="" class="align-start"  style="height:100%;">
   <v-col >

    <v-list dense  v-if="model && model.data" >
       <v-list-item >
        <v-list-item-avatar @click="showDialogue">
          <v-icon v-if="!model.data[model.title.photo]" class="white" color="primary">{{model.title.icon}}</v-icon>
          <v-img v-if="model.data[model.title.photo]" :src="imageUrl + model.data[model.title.photo]"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="subtitle-1">{{model.data[model.title.label]}}</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>


      
          
  
      <div v-if="model.menu">
     <template  v-for="(item,index) in model.menu.items">
       <v-list-item @click="menuClick(item)" v-if="!item.group" :key="index" >
        <v-list-item-icon class="ml-1"  v-if="item.icon">
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>

        <v-list-item-title>{{item.title}}</v-list-item-title>
      </v-list-item>


       <v-list-group   class="ml-1" :key="index" v-if="item.group" 
        :prepend-icon="item.icon"
        :value="item.value"
      >
        <template v-slot:activator>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </template>
    
      <template v-for="(subitem,i) in item.subitems">
        <v-list-group 
        :key="i"
          no-action
          sub-group
        :value="subitem.value"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{subitem.title}}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(childitem, j) in subitem.items"
            :key="j"
            link
             @click="menuClick(childitem)"
          > 
            <v-list-item-title v-text="childitem.title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon>{{childitem.icon}}</v-icon>
            </v-list-item-icon>
          </v-list-item>
          
        </v-list-group>

        
     </template>
      </v-list-group>
       </template>
      </div>

    </v-list>
     </v-col>
     </v-row> 
     <EntryForm 
   
    :title="passwordChangeModel.title"
    :subtitle="passwordChangeModel.subtitle"
    :items="passwordChangeModel.items" 
    v-on:save="changePassword" 
    ref="changepasswordform" />
     <EntryForm 
   
    :title="updateUserModel.title"
    :subtitle="updateUserModel.subtitle"
    :items="updateUserModel.items" 
    v-on:save="updateUser" 
    ref="updateuserform" />

  <SideNavigatorDialogue 

  v-on:updateuser="updateUserForm" 
  v-on:changepassword="changePasswordForm" 
  v-on:logout="logout" ref="userdialogue" />
    </v-navigation-drawer>
</template>

<script>
import constants from "../../../../common/constants"
import SideNavigatorDialogue from "./SideNavigatorDialogue"
import EntryForm from "../Dialogue/EntryForm"

  export default {
    components:{
      SideNavigatorDialogue:SideNavigatorDialogue,
      EntryForm:EntryForm
    },
    props: ["model"],
    created() {
      // this.$store.dispatch(this.model.store + "/getAccount");
    },
    watch:{
      currentTheme(value){
        this.$vuetify.theme.dark = value != 'light'
      }
    }, 
    computed:{
      currentTheme(){
        const _settings = this.$store.state.poscommon.settings
        return _settings? _settings.theme || 'light' : 'light'
      },
      passwordChangeModel(){
        return this.model.passwordChangeModel
      },
      updateUserModel() {
        return this.model.updateUserModel
      },
      imageUrl() {
        return constants.imageUrl
      },
        drawer(){
          return this.model.show
        },
       account() {
      return this.$store.state.posadmin.account;
    },
    },
    methods:{
      changeTheme(){
        this.$store.dispatch("poscommon/setSettings",{
          name:'theme', value: this.currentTheme == 'light' ? 'dark':'light'
        })
      },
      menuClick(params){
        if(params.type == "link") {
           this.$router.push(params.url);
        }
        else if(params.type == "action"){
           if(params.action == 'changepassword'){
           
              this.changePasswordForm()
           }
           else if(params.action == 'logout'){
              this.logout()
           }
           else if(params.action instanceof Function){
             params.action(this)
           }
        }
        
      },
      changePassword(params){
       this.$emit("changepassword",params)
        
      },
      updateUser(params) {
        this.$emit("updateuser",params)
      },
      updateUserForm() {
       
        this.$refs.updateuserform.edit(this.model.data)
      },
      changePasswordForm(){
        
        this.$refs.changepasswordform.show()
      },
      logout(){
        this.$emit("logout")
      },
      showDialogue(){
        this.$emit('click')
     
        this.$refs.userdialogue.show(this.model);
       
      }
    },
    data: () => ({
    }),
  }
</script>