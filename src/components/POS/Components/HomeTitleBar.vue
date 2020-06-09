

<template>
<v-row no-gutters="">
  <v-col>
 <v-app-bar

      app
      clipped-right
     elevation=1
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title> <span class="title ml-3 mr-5">
            iPos&nbsp;
            <span class="font-weight-light">Cybernetics</span>
          </span></v-toolbar-title>
      <v-spacer />
       <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="secondary"
          dark
          v-on="on"
        >
         Create   <v-icon right>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
        <v-tab>
        <v-badge
          color="deep-purple accent-4"
          content="6"
        >
          <v-icon>mdi-bell-outline</v-icon>
         
        </v-badge>
       </v-tab>
    </v-app-bar>
    
       
         
    
   
  </v-col>
     </v-row>
</template>

<script>

export default {
  components: {
  },
    props: {
      source: String,
    },
    methods: {
    clearMessage() {
      this.$store.dispatch("posadmin/clearState");
    }
  },
  computed: {
    loading() {
      return this.$store.state.posadmin.loading;
    },
    success() {
      return this.$store.state.posadmin.success;
    },
    error() {
      return this.$store.state.posadmin.error;
    }
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