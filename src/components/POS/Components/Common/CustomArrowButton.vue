

<template>
<div class="container">
  <div  :style="cssProps" @click="click" :class="'btn font-weight-bold ' + color" >{{title}}
      </div>

  </div>
</template>

<script>
export default {
  props: ["title","color"],
  computed: {
      currentTheme(){
        const _settings = this.$store.state.poscommon.settings
        return _settings? _settings.theme || 'light' : 'light'
      },
      cssProps() {
       
      return {
        '--border-color': "transparent transparent transparent " + this.$vuetify.theme.themes[this.currentTheme].secondary,
        '--height': this.height + 'px'
      }
    }
  },
  methods: {
    click() {
     
      this.$emit("click");
    }
  },
  watch: {},
  data() {
    return {};
  }
};
</script>
<style scoped>
div.btn{
    height:46px;
    line-height:46px;
    font-size:15px;
    vertical-align:middle;
    text-align:center;
    padding:0 5px 0 20px;
    color:#ffffff;
    cursor: pointer;
    position:relative;
    display:inline-block;
}

div.btn:after{
    position:absolute;
    right:-20px;
    content:" ";
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 23px 0 23px 20px;
    border-color: var(--border-color);
}
div.btn:hover{
    background-color:red;
}
div.btn:hover:after{
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 23px 0 23px 20px;
    border-color: var(--border-color);
}
.container{
white-space: nowrap;
width:auto;
}
</style>