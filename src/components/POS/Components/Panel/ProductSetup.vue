<template>
  <div class="pa-5" v-if="model">
   <div class="title" >{{model.name}}</div>

<div v-if="scheme=='options'">
          <CustomCriteriaOption :value="criteria.value"
                  :model="criteria.model"
                  v-on:change="changeCriteria" />
            </div>
 <div  v-if="scheme=='prices'">
   <v-expansion-panels
   class="" flat=""
      v-model="panel"
        
    >
      <v-expansion-panel >
        <v-expansion-panel-header class="pa-0 ma-0">Product's Options Filter</v-expansion-panel-header>
        <v-expansion-panel-content  class="pa-0 ma-0">
         <CriteriaOption class="mb-5 pa-0" :value="criteria.value"
                  :model="criteria.model"
                  v-on:change="changeCriteria" />
        </v-expansion-panel-content>
      </v-expansion-panel>
   </v-expansion-panels>

                  <ItemList  :model="ExtrainfoListModel"  />
            </div>
  </div>
</template>

<script>
import CustomCriteriaOption from "../Common/CustomCriteriaOption";
import CriteriaOption from "../Common/CriteriaOption";
import ExtrainfoListModel from "../../model/ExtrainfoListModel";
import calculateModel from "../../model/CalculateModel"
import ItemList from "../List/ItemList"
export default {
  components: {
    CustomCriteriaOption,
    CriteriaOption,
    ItemList
  },
  async created() {

       const _result =  await this.$store.dispatch("pospublic/getItems",{
          nocache: true,
          populate: ["shop","discount","owner"],
          page:1,
          pageSize:1,
          query:{ _id:this.$route.params.id},
          collection:"posshopitem"
      })
      let _item = _result.rows[0] ? {..._result.rows[0]} : null
      _item = _item ? calculateModel.calculate(_item) : null
      this.model = _item
  },
  props:[],
  computed: {
    ExtrainfoListModel(){
      return {
        ...ExtrainfoListModel,
        query:{
          shopItem: this.id
        }
      } 
    },
     id() {
        return this.$route.params.id;
    },
     scheme() {
        return this.$route.params.scheme;
    },
    criteria(){
        return {
            value: "options",
            model: this.model.options,
        }
    }
  },
  watch: {},
  methods: {
      changeCriteria(params){
          // eslint-disable-next-line no-console
          console.log(params)
      }
  },
  data: () => ({
      model: null
  })
};
</script>

<style lang="scss">
</style>