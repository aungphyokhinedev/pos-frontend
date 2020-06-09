 

                    <template>

 <div > 
                      <VueQRCodeComponent  :size="size?size:80" :text="value" >
                      </VueQRCodeComponent>
                      <div v-if="!hidelabel" class="mt-1 overline">{{value}}</div>
                    </div>
  
</template>

<script>

import VueQRCodeComponent from 'vue-qrcode-component'
export default {
    components: {
        VueQRCodeComponent: VueQRCodeComponent
    },
    props:["value", "format","label","hidelabel", "size"],
    created() {
    },
    computed:{
    },
    watch: {
    },
    methods:{
      save(){
        alert(9)
      }
    },
    data: () => ({ 
    }),
   
  }
</script>
<style scoped>
</style>