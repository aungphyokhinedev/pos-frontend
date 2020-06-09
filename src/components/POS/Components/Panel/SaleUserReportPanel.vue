

<template>
  <div style="height:500px">
   
    <LoadingBar v-if="!ready" />
    <v-row v-if="ready" no-gutters>
      <v-col dense>
       

        <v-flex v-if="user">
         
          <v-list class="pt-3 pb-3 mb-3" subheader>
            <v-list-item>
              <v-list-item-avatar v-if="!user.photo">
                <v-icon small dark class="primary">mdi-home-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-avatar style="border:solid 1px #aaa" v-if="user.photo">
                <v-img :src="imageUrl + user.photo" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="user.fullName"></v-list-item-title>
                <v-list-item-subtitle v-text="user.name"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider />
          <CustomMenu  :value="currentMenu" v-on:change="menuChange" :model="menuModel" />
        
          <ItemList v-if="currentMenu" :key="currentMenu.value" :model="listModel"  />
          
        </v-flex>
      </v-col>

    </v-row>
  </div>
</template>

<script>
import constants from "../../../../common/constants";
import CustomMenu from "../../Components/Common/CustomMenu";
import allListModel from "../../model/Sale/AllListModel"
import transactionMenuModel from "../../model/Sale/TransactionMenuModel"
import ItemList from "../../Components/List/ItemList";
import LoadingBar from ".././Common/LoadingBar";

export default {
  components: {
    LoadingBar: LoadingBar,
    ItemList: ItemList,
    CustomMenu:CustomMenu,
  },
  computed: {
    currentMenu(){
      return this.$store.state.posfrontend.transactionMenu;
    },
    listModel() {
        let _model = allListModel[this.currentMenu.list];
          _model.query = {...this.currentMenu.query,shop:this.user.shop}
        return _model;
    },
    menuModel() {
      return {
      items: transactionMenuModel.items({uid:this.user._id})
    }
    },
    user() {
      return this.$store.state.posfrontend.user;
    },
    shop() {
      return this.$store.state.posfrontend.shop;
    },
    imageUrl() {
      return constants.imageUrl;
    }
  },
  async created() {
    await this.$store.dispatch("posfrontend/clearUser");
    await this.$store.dispatch("posfrontend/getUser");
    this.ready = true;
  },
  props: {
    source: String
  },
  data: () => ({
    ready: false,
  }),
  methods: {
    showOwnerEntry() {
      if (!this.owner) {
        this.$refs.ownerentry.show();
      } else {
        this.$refs.ownerentry.edit(this.owner);
      }
    },
    menuChange(value) {
      this.$store.dispatch("posfrontend/setTransactionMenu", value);
    },
  }
};
</script>