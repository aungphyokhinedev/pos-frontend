<template>
    <v-dialog
    style="border-radius:0"
    title=""
      v-model="dialog"
      max-width="300"
    >

     <v-date-picker
     color="primary"
        v-model="model"
        multiple
        no-title
        range
      ></v-date-picker>
    </v-dialog>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        model:this.dates
      }
    },
    computed: {
    },
    watch: {
        dates(value) {
            this.model = value
        },
        model(value) {
            if(value.length > 2){
                let _dates = []
                _dates.push(value[0])
                _dates.push(value[2])
                this.model = _dates
            }
            this.$emit('changeDate', this.model);

        }
    },
    props:["dates"],
    methods: {
        show() {
            this.dialog = true;
        },
        save() {
            this.dialog = false;
        }
    }
  }
</script>