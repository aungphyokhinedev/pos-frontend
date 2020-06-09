<template>
  <v-dialog style="border-radius:0" title v-model="dialog" max-width="400">
    <v-card tile>
      <div class="pt-1">
        <v-toolbar  class="elevation-0 pa-5 pb-0 pt-0">
          <v-toolbar-title >
            <div>{{title}}</div>
            <div class="overline">Make sure QR code is center of the camera</div>
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn @click="refresh" icon>
            <v-icon>mdi-camera-retake-outline</v-icon>
          </v-btn>
        </v-toolbar>

        <div style="height:200px;display:block;">
          <CustomBarcodeScanner
            v-if="scannershow"
            style="height:200px;"
            v-on:change="change"
            value="barcode"
          />
        </div>
      </div>
      <div class="text-center ">
        <v-btn color="primary" @click="close" class="ma-3 mb-3" text>cancel</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import CustomBarcodeScanner from "../Common/CustomBarcodeScanner";
export default {
  components: {
    CustomBarcodeScanner: CustomBarcodeScanner
  },
  data() {
    return {
      dialog: false,
      scannershow: true
    };
  },
  computed: {},
  watch: {},
  props: ["title"],
  methods: {
    refresh() {
      this.scannershow = false;
      setTimeout(() => {
        this.scannershow = true;
      }, 100);
    },
    show() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    change(value) {
      this.$emit("change", value);
      this.dialog = false;
    }
  }
};
</script>