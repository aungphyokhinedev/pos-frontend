

<template>
  <div  >
    <v-row no-gutters>
      <v-col dense>
  

        <v-flex v-if="owner">
         
          <v-list class="pt-3 pb-3 mb-3" subheader>
            <v-list-item >
              <v-list-item-avatar @click="editOwner"  v-if="!owner.logo">
                <v-icon small dark class="primary">mdi-home-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-avatar @click="editOwner" style="border:solid 1px #aaa" v-if="owner.logo">
                <v-img :src="imageUrl + owner.logo" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="owner.companyName"></v-list-item-title>
                <v-list-item-subtitle v-text="owner.name"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider />
          <CustomMenu v-on:change="menuChange" :value="homeMenu" :model="menuModel" />

          <ItemList v-if="homeMenu" :key="homeMenu.value" :model="listModel"  />
       
          
        </v-flex>

      </v-col>
      
    </v-row>
  </div>

</template>

<script>
import constants from "../../../../common/constants";
import CustomMenu from "../../Components/Common/CustomMenu";
import allListModel from "../../model/AllListModel"
import ItemList from "../../Components/List/ItemList";
import ownerModel from "../../model/OwnerModel"
export default {
  components: {

    ItemList,
    CustomMenu,
  },
  computed: {
    homeMenu(){
      return this.$store.state.posadmin.homeMenu;
    },
    listModel() {
        return allListModel[this.homeMenu.list];
    },
       owner() {
      return this.$store.state.posadmin.owner;
    },
    imageUrl() {
      return constants.imageUrl;
    }
  },
  async created() {
  },
  props: {
    source: String
  },
  data: () => ({
    ready: false,
     menuModel : ownerModel.menuData,
  }),
  methods: {
    editOwner() {
      this.$emit("edituser")
    },
    menuChange(value) {
      this.$store.dispatch("posadmin/setHomeMenu", value);
    },
  } 
};
</script>