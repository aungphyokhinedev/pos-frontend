

<template>
  <div >
      <div class="overline" v-if="label">{{label}}</div>
    <center>
      <v-progress-circular
        class="mt-12"
        v-if="loading"
        x-small
        indeterminate
        color="primary"
      ></v-progress-circular>
    </center>
      <GmapMap
    v-if="options"
    class="map"
      ref="mapRef"
      :center='defaultLocation'
      :zoom="14"
      
      map-type-id="terrain"
      :style=" 'min-height: ' + 200 + 'px'"
      :options="options"
    >
     
      <GmapMarker
        :animation="3"
        :position="currentLocation"
        :draggable="false"
        icon="http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
      />
    </GmapMap>
    <location-picker  v-if="!loading && false" v-model="currentLocation" :options="options"></location-picker>
  </div>
</template>

<script>
import { LocationPicker } from "vue2-location-picker";

export default {
  components: { LocationPicker },
  created() {
 this.$getLocation({
      enableHighAccuracy: false, //defaults to false
      timeout: 1000, //defaults to Infinity
      maximumAge: 0 //defaults to 0
    }).then(coordinates => {
     
        this.setLocation(coordinates)
      
      // eslint-disable-next-line no-console
      console.log(coordinates);
    },error=>{
      // eslint-disable-next-line no-console
      console.log(error)
      this.currentLocation = this.defaultLocation
      this.setLocation(this.defaultLocation)
    });
   
    setInterval(() => {
      this.loading = false;
    }, 10);
   
  },
  destroyed() {},
  props: ["model","value","label"],
  watch: {
    currentLocation() {
      const _location = { 
                type: "Point", 
                coordinates: [ 
                    this.currentLocation.lng, 
                    this.currentLocation.lat
                ] }
      this.$emit("change",{name:this.value, value:_location});
    }
  },
   methods: {
    locationChange(value) {
      this.currentLocation = value;
    },
     setLocation(coordinates){

        this.currentLocation =
        this.model && this.model.coordinates
          ? { lat: this.model.coordinates[1], lng: this.model.coordinates[0] }
          : {
              lat: coordinates.lat,
              lng: coordinates.lng
            };

      this.$refs.mapRef.$mapPromise.then(map => {
        map.panTo({
          lat: this.currentLocation.lat,
          lng: this.currentLocation.lng
        });
        this.$refs.mapRef.$on("zoom_changed", () => {});
        this.$refs.mapRef.$on("center_changed", value => {
          this.locationChange({ lat: value.lat(), lng: value.lng() });
        });
      });

    }
  },
  computed:{
     currentTheme(){
        const _settings = this.$store.state.poscommon.settings
        return _settings? _settings.theme || 'light' : 'light'
      },
 isLight(){
      return this.currentTheme == 'light';
    },
    options() {
      return {// is not required
      map: {
        /** other map options **/
      },
      marker: {
        /** marker options **/
      },
      autocomplete: {
        /** autocomplete options **/
      },
      styles:[
            
              {elementType: 'labels.text.fill', 
              stylers: [
                {color: this.isLight ?'#4a0072':'#eeeeee'}
                ]},
              {elementType: 'labels.text.stroke', 
              stylers: [{
                color: this.isLight ?'#f5f1e6':'#333333'
                }]},
        
             
              {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#aaa'}]
              },
              
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#999999'}]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#76d275'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color:  this.isLight ?'#4a0072':'#255d00'}]
              },
             
              {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: this.isLight ?'#ff9800':'#558b2f'}]
              },
             
              {
                  featureType: "landscape",
                  elementType: "geometry",
                  stylers: [
                      {
                          "color": this.isLight ? '#f2f2f2' : "#000000"
                      }
                  ]
              },
              
            ]
      }
    },
  },
  data: () => ({
    loading: true,
    currentLocation: null,
 defaultLocation: {
            'lat':16.821181605842487,'lng':96.19132892608644
            }
  })
};
</script>
<style>
#pac-input{
  display: none;
}
</style>