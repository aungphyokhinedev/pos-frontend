<template>
  <v-content>
    <v-container fluid>
      <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
      <v-alert v-if="error" dense text type="error">
        <v-row align="center" justify="space-between">
          {{error}}
          <v-icon class="mx-2" color="error" small @click="clear()">close</v-icon>
        </v-row>
      </v-alert>
      <v-alert v-if="success" dense text type="info">
        <v-row align="center" justify="space-between">
          {{success}}
          <v-icon class="mx-2" color="info" small @click="clear()">close</v-icon>
        </v-row>
      </v-alert>
  
      <v-card >
        <v-card-title>
          <span class="title1">Socket Check</span>
          <v-spacer />
          <v-icon small>help_outline</v-icon>
        
        </v-card-title>

        <v-card-text>
          <v-col cols="12" style="padding:0">
            <v-text-field
              dense
              v-model="event"
              label="Event Name"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
            <v-text-field
              dense
              v-model="message"
              label="Message"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
            <v-text-field
              dense
              v-model="rooms"
              label="Rooms"
              append-icon="text_format"
              :counter="50"
            ></v-text-field>
            
            
          </v-col>

          <v-row  align="center" justify="center">
            <v-btn v-if="!isJoined" color="primary" dark @click="join">Join Room</v-btn>
         
            <v-btn v-if="isJoined" color="primary" dark @click="leave">Leave Room</v-btn>
         
          
          
            <v-btn v-if="!isOn" color="primary" dark @click="on">On Event</v-btn>
       
            <v-btn v-if="isOn" color="primary" dark @click="off">Off Event</v-btn>
              <v-btn color="primary" dark @click="echo">Echo Message</v-btn>
          </v-row>
        </v-card-text>
      </v-card>

 
   <v-data-table
        dense
        :headers="headers"
        :items="items"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar dark color="primary" flat>
            <v-icon class="mr-2" small>help_outline</v-icon>
            <span class="title mr-2">Received Messages</span>

            <v-spacer></v-spacer>
            <v-icon small @click="clearItems">refresh</v-icon>
          </v-toolbar>
        </template>
 

        <template v-slot:no-data>
          <v-flex>There is no data!</v-flex>
        </template>
      </v-data-table>
      
    </v-container>
  </v-content>
</template>

<script>
import moment from "moment";
export default {
  computed: {
    loading() {
      return this.$store.state.socket.loading;
    },
    success() {
      return this.$store.state.socket.success;
    },
    error() {
      return this.$store.state.socket.error;
    },
    items() {
      return this.$store.state.socket.items.map(x=> {
        return {date:moment(x.date).format("D-MMM-YY hh:mm:ss"),
        data:x.data,
        event:x.event}
        
      } );
    },
  },
  watch: {
    error() {
      this.showError = true;
    },
  },
  created() {
    this.$store.dispatch("socket/init");
  },
  methods: {
    async clear() {
      this.$store.dispatch("socket/clearState");
    },
     async clearItems() {
      this.$store.dispatch("socket/clear");
    },
     async join() {
      
      this.$store.dispatch("socket/join",this.rooms.split(",")[0]);
      this.isJoined = true;
    },
     async leave() {
      this.$store.dispatch("socket/leave",this.rooms.split(",")[0]);
      this.isJoined = false;
    },
     async on() {
      this.$store.dispatch("socket/on",this.event);
      this.isOn = true;
    },
     async off() {
      this.$store.dispatch("socket/off",this.event);
      this.isOn = false;
    },
    async echo() {
      this.$store.dispatch("socket/echo",{
        event: this.event,
        data: this.message,
        rooms: this.rooms != null ? this.rooms.split(",") : null
      });
    },
  },
  data: () => ({
    isJoined: false,
    isOn: false,
    chatItem: {},
    event: null,
    rooms: null,
    message: null,
    showError: false,
     headers: [
      
    
      {
        text: "Event",
        align: "left",
        value: "event"
      },
       {
        text: "User",
        align: "left",
        value: "data.uid"
      },
      {
        text: "Data",
        align: "center",
        value: "data.data"
      },
       {
        text: "Date",
        align: "right",
        value: "date"
      },
      
    ]
  })
};
</script>