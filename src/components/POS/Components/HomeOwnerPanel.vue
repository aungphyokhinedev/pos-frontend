

<template>
  <div>
    <LoadingBar v-if="!ready" />
    <v-row v-if="ready" no-gutters>
      <v-col dense>
        <v-banner v-if="!owner" two-line>
          <v-avatar slot="icon" color="deep-purple accent-4">
            <v-icon icon="mdi-lock" color="white">mdi-lock</v-icon>
          </v-avatar>Firstly you need to add your business information to use the system. Please add owner's business information
          and then create a new shop to sell your goods and services.
          <template
            v-slot:actions
          >
            <v-btn text color="deep-purple accent-4">What is this?</v-btn>
          </template>
        </v-banner>
        <v-btn
          v-if="!owner"
          @click="showOwnerEntry"
          class="ma-5"
          dark
          tile
          large
          color="deep-purple accent-4"
        >Add owner's information</v-btn>

        <v-flex v-if="owner">
          <v-btn
            class="ml-1 mt-3"
            small
            @click="showOwnerEntry"
            tile
            text
            color="deep-purple accent-4"
          >Owner information</v-btn>
          <v-list class="pt-3 pb-3 mb-9" subheader>
            <v-list-item>
              <v-list-item-avatar v-if="!owner.logo">
                <v-icon dark class="deep-purple accent-4">mdi-home-outline</v-icon>
              </v-list-item-avatar>
              <v-list-item-avatar style="border:solid 1px #aaa" v-if="owner.logo">
                <v-img :src="baseUrl + owner.logo" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="owner.companyName"></v-list-item-title>
                <v-list-item-subtitle v-text="owner.name"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider />
          <CustomMenu v-on:change="menuChange" :model="menuModel" />
          

          <ItemList :key="0" :model="schemes[shopList]" v-if="currentEntry && currentEntry.value == 0" />
          <ItemList :key="1" :model="schemes[salePersonList]" v-if="currentEntry && currentEntry.value == 1" />
          <ItemList :key="2" :model="schemes[categoryList]" v-if="currentEntry && currentEntry.value == 2" />
          <ItemList :key="3" :model="schemes[itemList]" v-if="currentEntry && currentEntry.value == 3" />
          <EntryForm
            ref="ownerentry"
            :title="ownerModel.formData.title"
            :subtitle="ownerModel.formData.subtitle"
            :items="ownerModel.formData.items"
            v-on:save="saveData"
          />
        </v-flex>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import constants from "../../../common/constants";
import ownerModel from "../model/OwnerModel"
import CustomMenu from "../Components/Common/CustomMenu";
import allListModel from "../model/AllListModel"
import EntryForm from "../Components/Dialogue/EntryForm.vue";
import ItemList from "../Components/List/ItemList";
import LoadingBar from "./Common/LoadingBar";
export default {
  components: {
    LoadingBar: LoadingBar,
    EntryForm: EntryForm,
    ItemList: ItemList,
    CustomMenu:CustomMenu,
  },
  computed: {
    schemes() {
      return allListModel
    },
    ownerModel() {
      return ownerModel;
    },
    owner() {
      return this.$store.state.posadmin.owner;
    },
    account() {
      return this.$store.state.posadmin.account;
    },
    baseUrl() {
      return constants.baseUrl;
    }
  },
  created() {
    setTimeout(() => {
      this.ready = true;
    }, 2000);
  },
  props: {
    source: String
  },
  data: () => ({
    shops: [],
    entryshow: false,
    ready: false,
    menuModel : {items: [
      { icon: "mdi-home", title: "Shops Information", value: "0" },
      { icon: "mdi-account", title: "Users Information", value: "1" },
      { icon: "mdi-view-grid-plus", title: "Product Categories Information", value: "2" },
      { icon: "mdi-basket", title: "Products Information", value: "3" }
    ]},

    currentEntry: null,
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
      this.currentEntry = value;
    },
    async saveData(value) {
      if (!value._id) {
        await this.$store.dispatch("posadmin/addOwner", value);
      } else {
        await this.$store.dispatch("posadmin/updateOwner", value);
      }
      this.$store.dispatch("posadmin/getOwner");
    }
  }
};
</script>