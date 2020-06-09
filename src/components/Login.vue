<template>
  <v-content class="back">
    <v-container fluid>
      <v-alert v-if="showError" dense text type="error">
        <v-row align="center" justify="space-between">
          {{errorMsg}}
          <v-icon class="mx-2" color="error" small @click="showError=false">close</v-icon>
        </v-row>
      </v-alert>
      <v-row align="center" justify="space-around">
        <v-col align="center" justify="center" cols="12">
          <v-card style="box-shadow: 2px 108px 136px -78px rgba(0,0,0,.7)" max-width="350px">
            <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>

            <v-card-text>
              <v-container>
                <v-row no-gutters>
                  <v-col align="center">
                    <img src="@/assets/spas.png" width="110px" />

                    <v-text-field
                      dense
                      outlined
                      flat
                      v-model="login.email"
                      append-icon="text_format"
                      label="Email"
                    ></v-text-field>

                    <v-text-field
                      dense
                      outlined
                      flat
                      v-model="login.password"
                      :append-icon="showPwd ? 'visibility' : 'visibility_off'"
                      :type="showPwd ? 'text' : 'password'"
                      @click:append="showPwd = !showPwd"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div class="text-center">
                  <v-btn large block color="primary" @click="loginClick">LOGIN SERVER</v-btn>
                </div>

                <v-flex style="margin-top:5px;" class="caption">version 1.0</v-flex>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  created() {
    if (this.$store.state.common.isLoggedIn) {
      this.$router.push("/dashboard/home");
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.common.isLoggedIn;
    },
    errorMsg() {
      return this.$store.state.common.error;
    },
    error() {
      return this.$store.state.common.error;
    },
    loading() {
      return this.$store.state.common.loading;
    }
  },
  watch: {
    isLoggedIn() {
      if (this.isLoggedIn) {
        this.$router.push("/dashboard/home");
      }
    },
    error() {
      this.showError = true;
      alert("Login error, try again.");
    }
  },
  methods: {
    loginClick() {
      this.$store.dispatch("common/login", {
        provider: "local",
        email: this.login.email,
        password: this.login.password
      });
    }
  },
  data: () => ({
    showError: false,
    dialog: true,
    showPwd: false,
    login: {
      email: null,
      password: null
    },
    drawers: ["Default (no property)", "Permanent", "Temporary"],
    primaryDrawer: {
      model: null,
      type: "default (no property)",
      clipped: false,
      floating: false,
      mini: false
    },
    footer: {
      inset: false
    }
  })
};
</script>

<style lang="scss">
.shadow {
  -webkit-box-shadow: 2px 108px 136px -78px rgba(0, 0, 0, 0.58);
  -moz-box-shadow: 2px 108px 136px -78px rgba(0, 0, 0, 0.58);
  box-shadow: 2px 108px 136px -78px rgba(0, 0, 0, 0.58);
}
.back {
  direction: ltr;
  // background: url('../imgs/spass01.png');
  background-size: cover;
}
</style>