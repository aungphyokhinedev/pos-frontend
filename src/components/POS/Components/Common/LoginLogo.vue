

<template>

<div>
  <img src="@/assets/ipos-logo.png" width="60px" />
  <div class="title">iPOS SERVER</div>
   <div class="overline">CYBERNETICS</div>
    </div>
</template>

<script>
export default {
  }
</script>
<style scoped>
 .element {
  height: 35px;
  width: 35px;
  background-color: #6200ea;
  animation: 
    pulse 10s ease infinite alternate;
  box-shadow: 1px 1px 15px #0007;
}
.element2 {
  margin-top: -15px;
  margin-left:25px;
  height: 20px;
  width: 20px;
  background-color: orange;
  animation: 
   
    nudge 7s linear infinite alternate;
    box-shadow: 1px 1px 5px #0007;

}

@keyframes pulse {
  0% {
    background-color: red;
  }
  50% {
    background-color: orange;
  }
  100% {
    background-color: #6200ea;
  }
}

@keyframes nudge {
  0% {
    transform: translate(0, -20px);
  }
  
  50% {
    transform: translate(10px, 0px);
  }

  30% {
    transform: translate(-30px, -30px);
  }
}
</style>