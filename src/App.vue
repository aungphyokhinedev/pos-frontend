

<template>
  <v-app class="pt-5"  id="app">
     
  <OfflineAlert  />
<router-view >

</router-view>

  <!-- route outlet -->
  <!-- component matched by the route will render here -->


</v-app>

</template>

<script>
import OfflineAlert from "./components/POS/Components/Common/OfflineAlert"
export default {
  name: 'App',
  components:{
    OfflineAlert
  },

  data: () => ({
    //
  }),
};
</script>
