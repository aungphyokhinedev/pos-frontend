<template>
    <v-dialog
  
    style="border-radius:0"
    title="This is title"
      v-model="dialog"
      max-width="400"
    >

     <ItemDetailCard
     :key="model._id + model.updateFlag"
     :model="model"
     v-if="model && scheme"
      :title="model[scheme.item.title.value]"
      :subtitle="model[scheme.item.subtitle.value]"
      :description="model[scheme.item.description.value]"
      :photo=" model[scheme.item.photo.value] ? imageUrl + model[scheme.item.photo.value] : null"  
   
      :action="scheme.action"
      v-on:action="action"
      ></ItemDetailCard>

    </v-dialog>
</template>
<script>
import constants from "../../../../common/constants"
 import ItemDetailCard from "../Common/ItemDetailCard";
export default {
  components: {
    ItemDetailCard: ItemDetailCard,
  },
    data () {
      return {
        dialog: false,
        model:null
      }
    },
    computed: {
        imageUrl() {
            return constants.imageUrl
        }
    },
    watch: {
    
    },
    props:["scheme"],
    methods: {
        show(value) {
            this.model = value;
            this.dialog = true;
        },
        save() {
            this.dialog = false;
        },
        action(params) {
            this.dialog = false;
             this.$emit("addToCart", params);
        }
    }
  }
</script>
<style scoped>

</style>