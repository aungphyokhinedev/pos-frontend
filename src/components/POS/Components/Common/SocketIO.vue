<template>
<div>
    
</div>
</template>
<script>
  export default {
      props:["model"],
async created() {
   await this.$store.dispatch("possocket/init");
   this.model.events.map(item=>{
       this.$store.dispatch("possocket/on",item);
   })
  
  },
  watch:{
    currentEvent(value) {
      this.$emit("receive", value)
    }
  },
  destroyed(){
    this.model.events.map(item=>{
       this.$store.dispatch("possocket/off",item);
     })
  },
  computed:{
    currentEvent() {
      return this.$store.state.possocket.currentEvent
    }
  },
    data: () => ({
     
    }),
  }
</script>