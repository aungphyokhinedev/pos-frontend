

                    <template>

 <v-flex>
                      <v-btn 
                      class="mr-3"
                      v-bind="$attrs"   @click="change"
                       text icon small>
                        <v-icon>{{checked?'mdi-check-box-outline':'mdi-checkbox-blank-outline'}}</v-icon>
                      </v-btn>{{label}}
                    </v-flex>
  
</template>

<script>
export default {
    props:["value", "model","label"],
    created() {
      this.checked = this.model
    },
    computed:{
    },
    watch: {
      model(value) {
        this.checked = value
      }
    },
    methods:{
      change(){
          this.checked = !this.checked
        
        this.$emit("change", {name:this.value,value:this.checked});
      }

    },
    data: () => ({ 
      checked: true
    }),
   
  }
</script>
<style scoped>
</style>