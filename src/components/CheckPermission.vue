<template>
  <v-content>
    <v-container fluid>
      <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
      <v-alert v-if="error" dense text type="error">
        <v-row align="center" justify="space-between">
          {{error}}
          <v-icon class="mx-2" color="error" small @click="clear()">close</v-icon>
        </v-row>
      </v-alert>

      <v-card>
        <v-card-title>
          <span class="title1">Check User's Permission</span>
          <v-spacer />
          <v-icon small>help_outline</v-icon>
        </v-card-title>

        <v-card-text>
          <v-col cols="12" style="padding:0">
            <AutoComplete
              label="Application"
              service="application"
              v-bind:select="checkItem.application"
              v-on:change="changeApplication"
            />
            <AutoComplete
              label="Service"
              service="service"
              v-bind:select="checkItem.service"
              v-on:change="changeService"
            />
            <AutoComplete
              label="User"
              service="auth"
              searchBy="email"
              v-bind:select="checkItem.user"
              v-on:change="changeUser"
            />
          </v-col>

          <v-row align="center" justify="center">
            <v-btn color="primary" dark @click="check">Check Permission</v-btn>
          </v-row>
        </v-card-text>
      </v-card>

      <v-dialog v-model="dialog" width="330">
        <v-card>
          <v-card-text>
            <v-list dense>
              <v-subheader>Permission Status</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="(item, i) in result" :key="i">
                  <v-list-item-icon>
                    <v-icon v-if="item.allow" color="green">mdi-checkbox-marked-circle</v-icon>
                    <v-icon v-if="item.allow == false" color="red">info</v-icon>
                    <v-icon v-if="item.allow == null">info</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-content>
</template>

<script>
import AutoComplete from "../components/AutoComplete";
export default {
  components: {
    AutoComplete: AutoComplete
  },
  computed: {
    loading() {
      return this.$store.state.checkPermission.loading;
    },
    error() {
      return this.$store.state.checkPermission.error;
    },
    result() {
      let items = [];
      let result = this.$store.state.checkPermission.result;
      if (result) {
        items.push({ name: "Read (Can retrieve data)", allow: result.read });
        items.push({ name: "Update (Can edit data)", allow: result.update });
        items.push({
          name: "Delete (Can delete data item)",
          allow: result.delete
        });
        items.push({
          name: "Create (Can create new item)",
          allow: result.create
        });
      }

      return items;
    }
  },
  watch: {
   
  },
  created() {
    this.$store.dispatch("checkPermission/clearState");
  },
  methods: {
    changeUser(value) {
      this.checkItem.user = value;
    },
    changeService(value) {
      this.checkItem.service = value;
    },
    changeApplication(value) {
      this.checkItem.application = value;
    },
    async clear() {
      this.$store.dispatch("checkPermission/clearState");
    },

    async check() {
      var data = {
        userid: this.checkItem.user._id,
        service: this.checkItem.service.name,
        application: this.checkItem.application.name
      };

      // Dispatch the action to buy a TV
      await this.$store.dispatch("checkPermission/check", data);
      this.dialog = true;
    }
  },
  data: () => ({
    dialog: false,
    checkItem: {
    }
  })
};
</script>