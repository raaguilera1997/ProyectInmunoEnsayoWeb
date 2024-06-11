<template>
  <div class="q-pa-md">
    <q-table
      row-key="id"
      title="Nomenclador Materia Prima Adquirida"
      :rows="rows"
      :columns="columns"
      selection="single"
      v-model:selected="selected"
      hide-pagination
      virtual-scroll
      :rows-per-page-options="[0]"
    >
      <template v-slot:top>
        <div class="text-subtitle1 text-bold col-12">Nomenclador Materias Primas Producidas</div>
        <q-btn v-if="userData.role!='Consultor'" round flat color="primary" icon="las la-plus" @click="addNom" />
        <q-btn v-if="selected.length>0 && userData.role!='Consultor'" round flat color="primary" icon="las la-edit"  @click="editNom(selected[0].id,selected[0].name,selected[0].codigo)" />
        <q-btn v-if="selected.length>0 && userData.role!='Consultor'" round flat color="red" icon="las la-trash" @click="deleted"  />

      </template>
      <template v-slot:bottom>
        {{selected.length>0?`Elemento seleccionado : ${selected[0].name}`:''}}
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
          { name: 'codigo', align: 'center', label: 'Código', field: row => row.codigo},
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
              nameMat: 'Materia Prima Producida' ,
              id:0,
              url:'nomenclador/materiaPrimaProducida',
            }
          }) .onOk(() => {
          this.selected=[]
          this.loadData()
        })
      },
      editNom(id,name,codigo){
        this.$q
          .dialog({
            // @ts-ignore
            component: NomDialog,
            componentProps: {
              // @ts-ignore
              nameMat: 'Materia Prima Producida' ,
              nameNom:name,
              codNom:codigo,
              id:id,
              url:'nomenclador/materiaPrimaProducida',
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
        let url='nomenclador/materiaPrimaProducida'
        API_REST_GET_REQUEST({endpoint:url}).then(resp=>{
          this.rows=resp.data
          this.rows.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
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
            let url=`nomenclador/materiaPrimaProducida/${this.selected[0].id}`
            API_REST_DELETE_REQUEST({endpoint:url,payload:{}}).then(resp=>{
              notify({
                content:'Nomenclador eliminado correctamente',
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
