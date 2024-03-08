<template>
  <div class="q-pa-md">
    <q-table
      row-key="id"
      title="Nomenclador Materia Prima Adquirida"
      :rows="rows"
      :columns="columns"
      selection="single"
      v-model:selected="selected"
    >
      <template v-slot:top>
        <q-btn v-if="userData.role!='Consultor'" round flat color="primary" icon="las la-plus" @click="addNom" />
        <q-btn v-if="selected.length>0 && userData.role!='Consultor'" round flat color="primary" icon="las la-edit"  @click="editNom(selected[0].id,selected[0].name)" />
        <q-btn v-if="selected.length>0 && userData.role!='Consultor'" round flat color="red" icon="las la-trash" @click="deleted"  />

      </template>
    </q-table>
  </div>
</template>

<script>
  import DeleteDialog from "src/core/dialogs/DeleteDialog";
  import NomDialog from '../../components/NomDialog';
  import {
    API_REST_DELETE_REQUEST,
    API_REST_GET_REQUEST
  } from '../../../../../infrastructure/adapters/BoRestApiAdapter';
  import QSpinnerFacebook from 'quasar/src/components/spinner/QSpinnerFacebook';
  import { notify } from '../../../../../infrastructure/services/VisualNotifyService';
  import { useLogin } from '../../../../composable/useLogin';

  export default {
    name:'NomMPProducida',
    data(){
      return{
        userData: useLogin().user,
        columns:[
          {
            name: 'id',
            required: true,
            label: 'Id',
            align: 'left',
            field: row => row.id,
          },
          { name: 'name', align: 'center', label: 'Nombre', field: row => row.name},
        ],
        rows: [],
        selected: []

      }
    },
    mounted() {
      this.loadData()
    },
    methods:{
      addNom(){
        this.$q
          .dialog({
            // @ts-ignore
            component: NomDialog,
            componentProps: {
              // @ts-ignore
              nameMat: 'Materia Prima Adquirida' ,
              id:0
            }
          }) .onOk(() => {
          this.selected=[]
          this.loadData()
        })
      },
      editNom(id,name){
        this.$q
          .dialog({
            // @ts-ignore
            component: NomDialog,
            componentProps: {
              // @ts-ignore
              nameMat: 'Materia Prima Adquirida' ,
              nameNom:name,
              id:id
            }
          }) .onOk(() => {
          this.selected=[]
          this.loadData()
        })
      },
      loadData(){
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'primary',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Cargando..',
          messageColor: 'black'
        })
        let url='nomenclador/materiaPrimaAdquirida'
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
            let url=`nomenclador/materiaPrimaAdquirida/${this.selected[0].id}`
            API_REST_DELETE_REQUEST({endpoint:url,payload:{}}).then(resp=>{
              notify({
                content:'Nomenclador Materia Prima Adquirida eliminado correctamente',
                type:'positive'
              })
              this.selected=[]
              this.loadData()
              this.$q.loading.hide()
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>
