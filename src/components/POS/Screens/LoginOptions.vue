

<template>
  <v-app id="inspire">
      <div class="d-flex align-center justify-center" style="height:100%">
         
        <v-card style="width:400px;max-width:100%" class="shadow ">
   

   <LoginLogo class="mt-5 text-center" />

    <v-container>
      <v-row dense>
       

        <v-col
          v-for="(item, i) in carditems"
          :key="i"
          cols="12"
        >
          <v-card
          class="elevation-0"
            :color="item.color"
            dark
            @click="click(item)"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class=""
                  v-text="item.title"
                ></v-card-title>

                <v-card-subtitle  class="overline" v-text="item.artist"></v-card-subtitle>
              </div>

              <v-avatar
                class="mt-5 mb-5"
               
                size="50"
                tile=""
              >
                <v-icon x-large="" color="white">mdi-chevron-right</v-icon>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
         
      
        
   
      </div>
   
  </v-app>
</template>

<script>
import LoginLogo from "../Components/Common/LoginLogo"
export default {
  components: {
      LoginLogo
  },
  async created() {
    this.$router.push("/pos/login/owner");
  },
  watch: {
  },
  methods: {
     async click(params){
        this.$router.push(params.url);
        
      },
     
  },
  computed: {
   
  },
  props: {
    source: String
  },
  data: () => ({

      items: [
           { text: 'Administrator Login', icon: 'mdi-flag', url:"/pos/login/owner" },
    
        { text: 'Sale Person Login', icon: 'mdi-account', url:"/pos/sale/login" },
           { text: 'End User Login', icon: 'mdi-basket', url:"/pos/login/user" },
      ],
       carditems: [
        {
          color: '#7e57c2',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          icon:'mdi-account',
          title: 'User',
          url:"/pos/login/user" ,
          artist: 'To test as an end user',
        },
        {
          color: '#1976d2',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          icon:'mdi-basket',
          title: 'Sale User',
          url:"/pos/sale/login",
          artist: 'To test as a sale user',
        },
         {
          color: '#0288d1',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          icon:'mdi-account',
          title: 'Admin',
          url:"/pos/login/owner",
          artist: 'To test as an admin user',
        },
      ],
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