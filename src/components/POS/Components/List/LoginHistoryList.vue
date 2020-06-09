<template>
<div>
<v-list class="pa-0" subheader>
      <template v-for="(item,i) in items">
       <div :key="item._id">
        <v-list-item  >
          <v-list-item-avatar v-if="!item.photo">
            <v-icon dark class="primary">mdi-account-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-avatar  style="border:solid 1px #aaa" v-if="item.photo">
            <v-img  :src="imageUrl + item.photo" />
          </v-list-item-avatar>
          <v-list-item-content style="text-align:left;">
            <v-list-item-title @click="click(item)" >{{item.title}}</v-list-item-title>
            <v-list-item-subtitle class="overline" v-text="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn  icon>
              <v-icon small @click="remove(item)">mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
         
        </v-list-item>
         <v-divider v-if="i<items.length - 1" />
       </div>
      </template>
    </v-list> 
</div>
</template>

<script>
import constants from "../../../../common/constants"
export default {
    props:["items"],
    created() {
    },
    computed:{
        imageUrl() {
            return constants.imageUrl
        }
    },
    watch: {
      model(value) {
        this.datamodel = value
      }
    },
    methods:{
      click(item){
        this.$emit("click", item);
      },
       remove(item){
        this.$emit("remove", item);
      }

    },
    data: () => ({ 
      datamodel: null
    }),
   
  }
</script>
<style scoped>
</style>

 