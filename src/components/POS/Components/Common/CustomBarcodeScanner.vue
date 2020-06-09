<template> 
  <div style="height:220px;position:relative;overflow:hidden">
    <div v-if="loading" class="text-center">
      <v-progress-circular style="margin-top:100px" indeterminate color="primary"></v-progress-circular>
      <div>Loading Camera</div>
    </div>
    <div v-if="error" class="d-flex justify-center align-center" style="height:100%;border:solid 1px #ccc">
      <div> {{error}}</div>
      </div>

    <qrcode-stream  @init="onInit" @detect="onDetect"></qrcode-stream>

    <div v-if="!loading && !error" class="ocrloader">
      <em></em>
      <div></div>
      <span></span>
    </div>
    <div v-if="!loading && !error && showglass" :style="cssProps" class="borderglass">
      <em></em>
    </div>
    <v-flex style="position:absolute;top:0;" class="ma-4 ml-9">
      <v-btn v-if="!loading && !error" small @click="shuffleGlass" class="primary" dark icon>
        <v-icon small>mdi-image-filter-center-focus</v-icon>
      </v-btn>
    </v-flex>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
export default {
  components: {
    QrcodeStream: QrcodeStream
  },
  props: ["model", "value"],
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {
    glassBorder() {
      return this.$store.state.poscommon.settings
        ? this.$store.state.poscommon.settings.glassBorder
        : null;
    },
    showglass() {
      return this.glassBorder ? this.glassBorder : null;
    },
     currentTheme(){
        const _settings = this.$store.state.poscommon.settings
        return _settings? _settings.theme || 'light' : 'light'
      },
    cssProps() {
       
      return {
        '--glass-color':  this.currentTheme == 'light' ? '#fffa' : '#000a',
      }
    }
  },
  watch: {},
  methods: {
    shuffleGlass() {
      this.$store.dispatch("poscommon/setSettings", {
        name: "glassBorder",
        value: !this.glassBorder
      });
    },
    async onInit(promise) {
      // show loading indicator
      this.loading = true;
      this.error = null;
      try {
        await promise;

        // successfully initialized
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "user denied camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "no suitable camera device installed";
        } else if (error.name === "NotSupportedError") {
          this.error = "page is not served over HTTPS (or localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "camera is already in use";
        } else if (error.name === "OverconstrainedError") {
          this.error =
            "did you requested the front camera although there is none?";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "browser seems to be lacking features";
        } else {
          this.error = error.name;
        }
      } finally {
        this.loading = false; 
        // hide loading indicator
      }
    },
    async onDetect(promise) {
      const {
        //   imageData,    // raw image data of image/frame
        content // decoded String
        //   location      // QR code coordinates
      } = await promise;
      this.$emit("change", content);
    }
  },
  data: () => ({
    loading: false,
    error: null,
    readerSize: {
      width: 100,
      height: 100
    }
  })
};
</script>
<style scoped>
.borderglass {
  background-color: #fff5;
  position: absolute;

  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  backface-visibility: hidden;
}
.borderglass:before,
.borderglass:after,
.borderglass em:before,
.borderglass em:after {
  content: "";
  position: absolute;
  background-color:  var(--glass-color);
}
.borderglass:before,
.borderglass:after {
  top: 0;
  bottom: 0;
  width: 50%;
}
.borderglass em:before,
.borderglass em:after {
  left: 50%;
  right: 50%;
  width: 140px;
  height: 50%;
}
.borderglass em:before {
  transform: translate(-70px, -70px);
}
.borderglass em:after {
  bottom: 0;
  transform: translate(-70px, 70px);
}
.borderglass:before {
  left: 0;
  transform: translate(-70px, 0);
}
.borderglass:after {
  right: 0;
  transform: translate(70px, 0);
}
.ocrloader {
  width: 10px;
  height: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  backface-visibility: hidden;
}
.ocrloader span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 20px;
  background-color: rgba(251, 253, 253, 0);
  z-index: 1;
  transform: translateY(135%);
  animation: move 2s cubic-bezier(0.15, 0.44, 0.76, 0.64);
  animation-iteration-count: infinite;
}
.ocrloader > div {
  z-index: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 48%;
  backface-visibility: hidden;
}

.ocrloader:before,
.ocrloader:after,
.ocrloader em:after,
.ocrloader em:before {
  border-color: #fff;
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;

  border-style: solid;
  border-width: 0px;
}
.ocrloader:before {
  left: 0;
  top: 0;
  border-left-width: 2px;
  border-top-width: 2px;
}
.ocrloader:after {
  right: 0;
  top: 0;
  border-right-width: 2px;
  border-top-width: 2px;
}
.ocrloader em:before {
  left: 0;
  bottom: 0;
  border-left-width: 2px;
  border-bottom-width: 2px;
}
.ocrloader em:after {
  right: 0;
  bottom: 0;
  border-right-width: 2px;
  border-bottom-width: 2px;
}
@keyframes move {
  0%,
  100% {
    transform: translateY(135%);
  }
  50% {
    transform: translateY(0%);
  }
  75% {
    transform: translateY(272%);
  }
}
</style>