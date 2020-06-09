
<template>
  <div>
    <v-img v-if="!image" aspect-ratio="1">
      <div class="fill-height solid-back">
        <v-btn class="top-icon" small dark icon>
          <v-icon>
            mdi-bookmark-check-outline
          </v-icon>
        </v-btn>
        <div class="bottom-text body-2 font-weight-medium">{{label}}</div>
      </div>
    </v-img>
    <v-img
    
      v-if="image"
      :src="image"
      lazy-src="https://i.picsum.photos/id/1/10/6.jpg"
      aspect-ratio="1"
    >
      <div class="fill-height bottom-gradient">
         <v-btn class="top-icon" small dark icon>
          <v-icon>
            mdi-bookmark-check-outline
          </v-icon>
        </v-btn>
        <div class="bottom-text body-2 font-weight-medium">{{label}}</div>
      </div>
    </v-img>
  </div>
</template>

<script>
export default {
  props: ["label", "image", "lazy-image"],
  data() {
    return {};
  }
};
</script>

<style scoped>
.bottom-gradient {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}
.solid-back{
  background-color: rgb(206, 206, 206);
}
.repeating-gradient {
  background-image: repeating-linear-gradient(
    -45deg,
    #6200ea,
    #6200ea 3px,
    rgba(10, 10, 10, 0.25) 3px,
    rgba(20, 20, 20, 0.25) 6px
  );
}
.top-icon{
  position: absolute;
  top: 5px;
  right: 5px;
}
.bottom-text {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  color: #fff;

  padding: 10px;
}
</style>