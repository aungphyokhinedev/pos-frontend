

<template>
  <div style="min-width:100%;">
    <GmapMap
      v-if="options"
      class="map"
      ref="mapRef"
      :center="defaultLocation"
      :zoom="14"
      map-type-id="terrain"
      :style=" 'min-height: ' + (height?height:250) + 'px'"
      :options="options"
    >
      <GmapInfoWindow
        v-if="selected"
        :position="selected.position"
        :options="infoOptions"
        :opened="infoOpen"
      />
      <GmapCircle
        v-if="current && current.position"
        :clickable="true"
        @click="circleClick"
        :center="current.position"
        :radius="current.coverage"
        :options="currentSearchOptions"
      />
      <GmapCircle
        v-if="selected && selected.position"
        :clickable="true"
        @click="circleClick"
        :center="selected.position"
        :radius="selected.coverage"
        :options="circleOptions"
      />
      <GmapMarker
        v-for="(m) in markers"
        :animation="3"
        :key="m.key"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="circleClick"
        icon="http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  methods: {
    circleClick() {
      this.infoOpen = true;
    },
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
  computed: {
    infoOptions() {
      const _title =
        "<div class='title'>" + this.model.selected.name + " </div>";
      const _address = "<div>" + this.model.selected.address + " </div>";
      const _description =
        "<div>" + this.model.selected.description + " </div>";
      const _mobile = "<br/><div>" + this.model.selected.mobile + " </div>";
      return {
        content:
          "<div>" + _title + _description + _address + _mobile + " </div>",
        disableAutoPan: true
      };
    },
    circleOptions() {
      return {
        fillColor: "green",
        strokeWeight: 0,
        strokeColor: "red",
        fillOpacity: 0.1
      };
    },
    currentSearchOptions() {
      let _options = {
        ...this.circleOptions,
        fillColor: this.isLight ? "#00000033" : "#ffffff",
        strokeWeight: 1,
        strokeColor: this.isLight ? "#7777" : "#7777",
        fillOpacity: 0.2
      };
      return _options;
    },
    current() {
      return this.model.current ? this.model.current : null;
    },
    selected() {
      return this.model.selected
        ? {
            coverage: this.model.selected.coverage || 200,
            key: this.model.selected._id,
            position: {
              lat: this.model.selected.location.coordinates[1],
              lng: this.model.selected.location.coordinates[0]
            }
          }
        : null;
    },
    markers() {
      return this.model.markers || [];
    },
    currentTheme() {
      const _settings = this.$store.state.poscommon.settings;
      return _settings ? _settings.theme || "light" : "light";
    },
    options() {
      return {
        // is not required
        map: {
          /** other map options **/
        },
        marker: {
          /** marker options **/
        },
        autocomplete: {
          /** autocomplete options **/
        },

        styles: [
          {
            elementType: "labels.text.fill",
            stylers: [{ color: this.isLight ? "#4a0072" : "#eeeeee" }]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: this.isLight ? "#f5f1e6" : "#333333"
              }
            ]
          },

          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#aaa" }]
          },

          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#999999" }]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{ color: "#76d275" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: this.isLight ? "#4a0072" : "#255d00" }]
          },

          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: this.isLight ? "#ff9800" : "#558b2f" }]
          },

          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [
              {
                color: this.isLight ? "#f2f2f2" : "#000000"
              }
            ]
          }
        ]
      };
    },
    isLight() {
      return this.currentTheme == "light";
    }
  },
  mounted() {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
  },
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
  props: ["model", "value", "height"],
  watch: {
    currentLocation() {
      const _location = {
        type: "Point",
        coordinates: [this.currentLocation.lng, this.currentLocation.lat]
      };
      this.$emit("change", { name: this.value, value: _location });
    }
  },
  data: () => ({
    infoOpen: false,
    loading: true,
    loc: null,
    currentLocation: null,
    defaultLocation: {
            'lat':16.821181605842487,'lng':96.19132892608644
            }
  })
};
</script>
<style>
#pac-input {
  display: none;
}
.map {
  transition: min-height 0.7s linear;
}
</style>