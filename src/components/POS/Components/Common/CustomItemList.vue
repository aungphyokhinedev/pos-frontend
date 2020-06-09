<template>
  <v-card v-if="ready" class="mx-auto elevation-0">

    <v-list subheader>
      <template v-for="item in items">
        <div :key="item._key">
        <v-divider ></v-divider>
        <v-list-item >
          <v-list-item-avatar v-if="!item._logo">
            <v-icon small dark class="primary">{{item._icon || model.icon}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-avatar style="border:solid 1px #aaa" v-if="item._logo">
            <v-img :src="imageUrl + item._logo" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title @click="detail(item)" v-text="item._title"></v-list-item-title>
            <v-list-item-subtitle v-text="item._subtitle"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon   @click="action(item)">mdi-chevron-right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        </div>
      </template>
    </v-list>
  </v-card>
</template>
<script>
import constants from "../../../../common/constants";
export default {
  components: {
  },
  async created() {
 //   await this.$store.dispatch( this.model.store + "/getItems", this.query);
    this.ready = true
  },
  props: ["model" ],
  watch: {
  },
  methods: {
      detail(item){
          this.$emit("detail",item)
      },
       action(item){
          this.$emit("action",item)
      }
  },
  computed: {
    imageUrl() {
      return constants.imageUrl;
    },
   items(){
       return this.model.items.map(item=>{
           return {
               _key:item[this.model.key],
               _title:item[this.model.title],
                _subtitle:item[this.model.subtitle],
                _icon:item[this.model.icon],
                _logo:item[this.model.logo],
                ...item
           }
       })
   }
  },
  data: () => ({
    ready : false
    
  })
};
</script>