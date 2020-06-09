

<template>
<v-flex >
 <v-list dense  subheader>
      <v-subheader>Recent chat</v-subheader>

      <v-list-item
        v-for="item in items"
        :key="item.title"
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list dense subheader>
      <v-subheader>Previous chats</v-subheader>

      <v-list-item
        v-for="item in items2"
        :key="item.title"
      
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    </v-flex>
</template>

<script>
//import SideNavigator from "../Components/SideNavigator.vue";
export default {
   components: {
    //  SideNavigator: SideNavigator
  },
    props: {
      source: String,
    },
    data: () => ({
      
         items: [
        { active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      items2: [
        { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
      ],
      
    }),
  }
</script>