

<template>
    <div> 
        <div class="overline"  v-if="label">{{label}}</div>
        <div v-if="error" style="color:red" class="overline" >{{error}}</div>
    <v-row>
            <v-col class="d-flex justify-center">
             
              <v-avatar @click="upload"  v-if="!fileName"  class="ma-6" x-large slot="icon" color="primary">
            
              
                <v-icon   icon="mdi-lock" color="white">mdi-image-plus</v-icon>
              </v-avatar>
              <v-avatar  @click="upload" size=100
               v-if="fileName" class="ma-6 elevation-2" x-large slot="icon" color="white">
                <img
                  :src="fileUrl"
                 
                >
               
                </v-avatar>
            </v-col>
            <v-col style="display:none">
              <div >
               <image-uploader
               ref="file" 
    :debug="1"
    :maxWidth="512"
    :quality="0.7"
    :autoRotate=true
    outputFormat="verbose"
    :preview=false
    :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
    :capture="false"
    accept="image/*"
    doNotResize="['gif', 'svg']"
    @input="setImage"
    @onUpload="startImageResize"
    @onComplete="endImageResize"
  ></image-uploader>
              </div>
            </v-col>
          </v-row>
    </div>
</template>

<script>
import ImageUploader from 'vue-image-upload-resize'
import constants from '../../../../common/constants'
export default {
  components:{
    ImageUploader:ImageUploader
  },
    props: ["model","value","label","error"],
    created() {
      this.fileName = this.model
    },
    computed: {
      fileUrl(){
        return constants.imageUrl + this.fileName;
      }
    },
    methods: {
      upload(){
        document.getElementById("fileInput").click()
      },
      srcToFile(src, fileName, mimeType){
          return (fetch(src)
              .then(function(res){return res.arrayBuffer();})
              .then(function(buf){return new File([buf], fileName, {type:mimeType});})
          );
      },
      async setImage(e){

        let _file = await this.srcToFile(e.dataUrl,e.info.name,e.info.type)
        // eslint-disable-next-line no-console
        console.log(_file)
        const _files = await this.$store.dispatch("posadmin/upload", _file)
        this.fileName = _files[0].fileName
        this.$emit("change", {name:this.value,value:this.fileName});
        this.hasImage = true;
      },
      startImageResize(){
      },
      endImageResize(){
      },
     
    },  
    watch:{
    },
    data: () => ({ 
      fileName: null,
      hasImage: false,
    }),
  }
</script>
<style scoped>
</style>