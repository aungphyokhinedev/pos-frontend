
<template>
  <div  :class="`box ` + color">
                <div class="box-text">
                    <div style=" margin: auto; ">
                   <v-icon dark large>{{icon}}</v-icon>
                       </div>
                    </div>
              </div>
</template>

<script>

export default {
props: ["icon", "color"],
  data() {
    return {
    };
  }
};
</script>

<style scoped>
.box {
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