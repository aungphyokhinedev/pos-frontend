

<template>
<v-row no-gutters="">
  <v-col>
 <v-app-bar

      app
      clipped-right
     elevation=1
    >
      <v-app-bar-nav-icon @click.stop="drawerClick" />
      <v-toolbar-title v-if="isMobile"> <span >
            iPos&nbsp;
           
          </span></v-toolbar-title>
      <v-toolbar-title v-if="!isMobile"> <span class="title ml-3 mr-5">
            iPos&nbsp;
            <span class="font-weight-light">Cybernetics</span>
          </span></v-toolbar-title>
      <v-spacer />
      <CustomArrowButton v-on:click="goShop" title="GO TO SHOP" color="secondary" class="mr-5"  />
      
        <v-tab>
        <v-badge
          color="deep-purple accent-4"
          content=""
        >
          <v-icon>mdi-bell-outline</v-icon>
         
        </v-badge>
       </v-tab>
    </v-app-bar>
    
       
         
    
   
  </v-col>
     </v-row>
</template>

<script>
import { isMobile } from 'mobile-device-detect';
import CustomArrowButton from "./CustomArrowButton";
export default {
  components: {
    CustomArrowButton:CustomArrowButton
  },
    props:["model"],
    methods: {
    drawerClick(){
      this.$emit("drawerclick")
    },
    goShop() {
      this.$router.push("/pos/sale/login");
    }
  },
  computed: {
    isMobile(){
      return isMobile
    },
    loading() {
      return this.$store.state[this.model.store].loading;
    },
  },
    data: () => ({
      
         items: [
        { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
     
    }),
  }
</script>