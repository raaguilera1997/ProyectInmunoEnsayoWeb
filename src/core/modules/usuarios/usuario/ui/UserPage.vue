<template>
  <div class="q-pa-md">
    <q-table
      row-key="id"
      title="Usuarios"
      :rows="rows"
      :columns="columns"
      selection="single"
      v-model:selected="selected"
    >
      <template v-slot:top>
        <q-btn round flat color="primary" icon="las la-plus"  />
        <q-btn v-if="selected.length>0" round flat color="primary" icon="las la-edit"  />
        <q-btn v-if="selected.length>0" round flat color="red" icon="las la-trash"  />

      </template>
    </q-table>
    <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div>
  </div>
</template>

<script>
  import { API_REST_GET_REQUEST } from '../../../../../infrastructure/adapters/BoRestApiAdapter';

  export default {
    name:'UserPage',
    data(){
      return{
        columns:[
          {
            name: 'name',
            required: true,
            label: 'Name',
            align: 'left',
            field: row => row.name,
          },
          { name: 'lastName', align: 'center', label: 'Apellido', field: row => row.lastName},
          { name: 'userName', align: 'center', label: 'Usuario', field: row => row.userName},
          { name: 'role', align: 'center', label: 'Rol', field: row => row.role},

        ],
        rows: [],
        selected: []

      }
    },
   mounted() {
     this.loadData()
   },
    methods:{
      loadData(){
        let url='users'
        API_REST_GET_REQUEST({endpoint:url}).then(resp=>{
          this.rows=resp.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
