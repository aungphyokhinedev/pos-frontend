

<template>
  <div class="text-center">
    <v-dialog :persistent="model.persistent" v-model="model.show" max-width="400">
      <v-card class="mx-auto pa-5" outlined>
         <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{label}}</div>
         <div v-if="!isonline">
        <v-list-item-title class="headline mb-1">Connection Error</v-list-item-title>
        <v-list-item-subtitle><p>Please check your connection to proceed.</p></v-list-item-subtitle>
        </div>
        <div v-if="isonline">
        <v-list-item-title class="headline mb-1">{{model.title}}</v-list-item-title>
        <v-list-item-subtitle><p>{{model.subtitle}}</p></v-list-item-subtitle>
        </div>
      </v-list-item-content>

    
    </v-list-item>
       
        <v-list-item one-line class="ml-2 mr-2">
          <v-list-item-content>
            <div class="text-center">
              <v-btn v-if="model.actions && model.actions.ok" @click="ok" color="primary" text>{{model.actions.ok.name}}</v-btn>
               <v-btn v-if="model.actions && model.actions.cancel" @click="cancel" color="primary" text>{{model.actions.cancel.name}}</v-btn>
            </div>

          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  components: {
  },
  computed: {
     isonline(){
      return this.$online;
    },
      logo(){
          if(this.model.type=="info"){
            return "mdi-information-variant"
          }
          else{
              return "mdi-information-variant"
          }
      },
      label(){
          if(this.model.type=="info"){
            return "information"
          }
          else if(this.model.type=="success"){
              return "information"
          }
          else{
              return "warning"
          }
      }
  },
  props: ["model"],
  data() {
    return {
    };
  },
  methods: {
    ok() {
        this.model.show = false
        this.$emit("ok",this.model)
    },
    cancel() {
        this.model.show = false
        this.$emit("cancel")
    },
  }
};
</script>
<style >
</style>