<template>
  <div class="q-pa-md">
    <q-table
      row-key="id"
      title="Usuarios"
      :rows="rows"
      :columns="columns"
      selection="single"
      v-model:selected="selected"
      hide-pagination
      virtual-scroll
      :rows-per-page-options="[0]"
      no-data-label="Datos no disponibles."
    >
      <template v-slot:top>
        <div class="text-subtitle1 text-bold col-12">Usuarios</div>
        <q-btn round flat color="primary" icon="las la-plus" @click="this.$router.push({name:'createUserPage'})" />
        <q-btn v-if="selected.length>0" round flat color="primary" icon="las la-edit" @click="this.$router.push({name:'editUserPage',params:{id:selected[0].id}})"  />
        <q-btn v-if="selected.length>0" round flat color="primary" icon="las la-lock" @click="resetPassword"  />
        <q-btn v-if="selected.length>0" round flat color="red" icon="las la-trash" @click="deleted"  />
      </template>
      <template v-slot:bottom>
        {{selected.length>0?`Elemento seleccionado : ${selected[0].name}`:''}}
      </template>
    </q-table>
  </div>
</template>

<script>
  import DeleteDialog from "src/core/dialogs/DeleteDialog";
  import {
    API_REST_DELETE_REQUEST,
    API_REST_GET_REQUEST
  } from '../../../../../infrastructure/adapters/BoRestApiAdapter';
  import QSpinnerFacebook from 'quasar/src/components/spinner/QSpinnerFacebook';
  import { notify } from '../../../../../infrastructure/services/VisualNotifyService';
  import ResetPasswordDialog from "./dialog/ResetPasswordDialog";

  export default {
    name:'UserPage',
    data(){
      return{
        columns:[
          {
            name: 'name',
            required: true,
            label: 'Nombre',
            align: 'left',
            field: row => row.name,
          },
          { name: 'lastName', align: 'center', label: 'Apellidos', field: row => row.lastName},
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
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'primary',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Cargando..',
          messageColor: 'black'
        })
        let url='users'
        API_REST_GET_REQUEST({endpoint:url}).then(resp=>{
          this.rows=resp.data
          this.$q.loading.hide()
        })
      },
      deleted(){
        this.$q
          .dialog({
            // @ts-ignore
            component: DeleteDialog,
            componentProps: {
              // @ts-ignore
              countsElementsSelected: 1 ,
            }
          })
          .onOk(() => {
            this.$q.loading.show({
              spinner: QSpinnerFacebook,
              spinnerColor: 'primary',
              spinnerSize: 140,
              backgroundColor: 'white',
              message: 'Cargando..',
              messageColor: 'black'
            })
            let url=`users/${this.selected[0].id}`
            API_REST_DELETE_REQUEST({endpoint:url,payload:{}}).then(resp=>{
              notify({
                content:'Usuario eliminado correctamente',
                type:'positive'
              })
              this.selected=[]
              this.loadData()
              this.$q.loading.hide()
            })
          })
      },
      resetPassword(){
        this.$q
          .dialog({
            // @ts-ignore
            component: ResetPasswordDialog,
            componentProps: {
              id:this.selected[0].id,
              userName:this.selected[0].userName

            }
          }) .onOk(() => {
          this.selected=[]
        })
      },
    }
  }
</script>

<style scoped>

</style>
