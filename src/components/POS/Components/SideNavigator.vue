

<template>
 <v-navigation-drawer
      v-model="drawer"
      app
      class="secondary"
      dark
    >
    <br/> <br/>
    <v-list dense>
           <v-list-item >
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

      
      </v-list-item>
     
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-group
        prepend-icon="account_circle"
        value="true"
      >
        <template v-slot:activator>
          <v-list-item-title>Users</v-list-item-title>
        </template>

        <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(admin, i) in admins"
            :key="i"
            link
          >
            <v-list-item-title v-text="admin[0]"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="admin[1]"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          sub-group
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Actions</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(crud, i) in cruds"
            :key="i"
         
          >
            <v-list-item-title v-text="crud[0]"></v-list-item-title>
            <v-list-item-action>
              <v-icon v-text="crud[1]"></v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
    drawer: true,
       admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings'],
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete'],
      ],
    }),
  }
</script>