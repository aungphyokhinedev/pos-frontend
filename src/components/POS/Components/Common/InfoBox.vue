
<template>
  <div  :class="`box ` + color">
                <div class="top-icon">
                 <v-icon dark >{{ checked ?'mdi-bookmark-check' : 'mdi-bookmark-check-outline' }}</v-icon>
                  </div>
                <div class="box-text body-2 font-weight-medium">
                    <div style=" margin: auto; ">
                    {{label}}
                       </div>
                    </div>
              </div>
</template>

<script>

export default {
props: ["label", "color", "checked"],
  data() {
    return {
    };
  }
};
</script>

<style scoped>
.box {
  background-color: #ccc;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  position: relative; /* If you want text inside of it */
}

/* If you want text inside of the container */
.box-text {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  display:flex;
  color:#fff;
}
.top-icon{
  position: absolute;
  top: 0;
  right: 0;
  padding:10px;
}
</style>