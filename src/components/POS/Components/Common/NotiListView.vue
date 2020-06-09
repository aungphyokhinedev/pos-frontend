

<template>
 <v-card v-if="model.show" style="position:fixed;  right:0px;  top:60px; z-index:30;max-width:500px; width:100%; " >
        
       <v-list dense="" two-line subheader>
      <v-subheader inset>{{model.title}}</v-subheader>
      <v-list-item
    
        v-for="item in items"
        :key="item._id"
      >
        <v-list-item-avatar class="primary">
          <v-icon dark small
          >mdi-account</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.message"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class="pa-0">
          <v-btn small @click="click(item)" icon>
            <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    </v-card>
</template>

<script>
import moment from 'moment';
export default {
    props:["model"],
    
    data: () => ({
    }),
    computed:{
      items() {
        return this.model.items ? this.model.items.map(item=>{
          return { ...item, title: item.message + " " + item.title, message: moment(item.createdAt).fromNow()}
        }) : [];
      }
    },
    methods:{
        click(params){
            this.$emit("click",params)
        }
    }
  }
</script>
<style scoped>
</style>