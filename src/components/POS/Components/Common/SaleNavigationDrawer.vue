<template>
 <div>
    <v-navigation-drawer
    v-if="show"
      v-model="drawer"
      absolute
      :mini-variant.sync="mini"
      permanent 
    >
      <v-list-item class="px-2">
        <v-list-item-avatar  @click="showDialogue" style="border:solid 1px #aaa" >
        <v-icon v-if="!model.data[model.title.photo]"  color="primary">{{model.title.icon}}</v-icon>
          <v-img v-if="model.data[model.title.photo]" :src="imageUrl + model.data[model.title.photo]"></v-img>
         
        </v-list-item-avatar>

        <v-list-item-title >{{model.data[model.title.label]}}</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini || !isMobile"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

         <v-list dense v-if="items">
     <template  v-for="(item,index) in items">
       <v-list-item @click="menuClick(item)" v-if="!item.group" :key="index" >
        <v-list-item-icon   v-if="item.icon">
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>

        <v-list-item-title>{{item.title}}</v-list-item-title>
      </v-list-item>


       <v-list-group    :key="index" v-if="item.group" 
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
      </v-list>

   
    </v-navigation-drawer>
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
  

 </div>
</template>
<script>
import { isMobile } from 'mobile-device-detect';
import passwordChangeModel from "../../model/PasswordChangeModel"
import updateUserModel from "../../model/Sale/UpdateUserModel"
import SideNavigatorDialogue from "./SideNavigatorDialogue"
import EntryForm from "../Dialogue/EntryForm"
import constants from "../../../../common/constants"
import sideNavigationModel from "../../model/Sale/SideNavigatorModel"
  export default {
    components:{
        SideNavigatorDialogue:SideNavigatorDialogue,
        EntryForm:EntryForm
    },
    props:["model"],
    watch:{
      isMini(value){
        this.mini = value

      }
    },
    computed:{
      show() {
        return this.model.show
      },
      imageUrl() {
        return constants.imageUrl
      },
       passwordChangeModel(){
        return passwordChangeModel
      },
      updateUserModel() {
        return updateUserModel
      },
      isMini() {
        return this.model.mini
      }
    },
     methods:{
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
        }
        
      },
      async changePassword(params){
        if(params.newPassword == params.confirmPassword){
       
          const result = await this.$store.dispatch("posfrontend/changePassword",params)
          if(result.success){
            //const type = this.$store.getters['poslogin/type']
           // this.$router.push("/pos/login/" + type + "/" + result.message._id);
          }
          else{
            alert(result.message)
          }
        }
        
      },
      async updateUser(params) {
        await this.$store.dispatch("posfrontend/updateUser",params)
        await this.$store.dispatch("posfrontend/getUser");
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
        if(!this.mini) {
          this.mini = true
          this.$refs.userdialogue.show(this.model);
        }
        //this.mini = false;
        
       
      }
    },
    data () {
      return {
        drawer: true,
        items: sideNavigationModel.menu.items,
        mini: this.model.mini || !isMobile
      }
    },
  }
</script>