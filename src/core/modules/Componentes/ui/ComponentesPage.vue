<template>
  <div class="q-pa-md">

    <q-table
      row-key="id"
      v-model:pagination="pagination"
      title="Treats"
      :rows="rows"
      :columns="columns"
      selection="single"
      v-model:selected="selected"
      @request="request"
    >
      <template v-slot:body-cell-nomencladorComponente="props">
        <q-td :props="props">
          {{props.row.nomencladorComponente.name}}
        </q-td>
      </template>
      <template v-slot:body-cell-dateVencimiento="props">
        <q-td :props="props">
          <q-badge class="cursor-pointer" :color=compareDate(props.row.dateVencimiento)>
          {{formatDate(props.row.dateVencimiento)}}
            <q-tooltip>{{compareDate(props.row.dateVencimiento)=='red'?'Vencido':compareDate(props.row.dateVencimiento)=='orange'?'Próximo a vencerse':'En Fecha'}}</q-tooltip>
          </q-badge>
        </q-td>
      </template>
      <template v-slot:top>
        <div class="text-subtitle1 text-bold col-12">Componentes</div>
        <q-btn v-if="userData.role!='Consultor'" round flat  icon="las la-plus" @click="this.$router.push({name:'createComponentesPage'})">
          <q-tooltip>Adicionar</q-tooltip>
        </q-btn>
        <q-btn v-if="selected.length>0 && userData.role!='Consultor'" round flat color="primary" icon="las la-edit"
               @click="this.$router.push({name:'editarComponentesPage',params:{id:selected[0].id}})">
          <q-tooltip>Editar</q-tooltip>
        </q-btn>
        <q-btn v-if="selected.length>0 && userData.role!='Consultor'" round flat color="red" icon="las la-trash" @click="deleted">
          <q-tooltip>Eliminar</q-tooltip>
        </q-btn>
        <q-space />
        <q-btn flat icon="las la-filter" @click="act_filter_advance=!act_filter_advance" :disable="pagination_send.payload.search?true:false" >
          <q-tooltip>Filtros Avanzados</q-tooltip>
        </q-btn>
        <q-input
          clearable
          :readonly="act_filter_advance"
          v-model="pagination_send.payload.search"
          @update:model-value="loadData"
          dense
          outlined
          rounded
          input-class="q-px-sm"
          style="width: 200px"
          placeholder="Buscar por código"
          debounce="600"
        >
          <template v-slot:append>
            <q-icon
              name="las la-search"
              size="22px"
              class="q-pr-xs"
            ></q-icon>
          </template>
        </q-input>
        <div class="col-12 q-pt-sm">
          <transition>
            <q-card v-if="act_filter_advance">
              <q-card-section>
                <div class="row text-dark justify-between">
                  <div class="text-subtitle2 text-grey-6 caption">Filtros Avanzados</div>
                  <q-btn
                    flat
                    rounded
                    icon="las la-times"
                    tooltip="Close"
                    @click="act_filter_advance = false;clearFilter()"
                  ></q-btn>
                </div>
                <div>
                   <div class="row">
                     <div class="col-md-4 col-lg-3 q-px-sm q-py-sm">
                       <q-select dense outlined v-model="nomenclador" option-label="name" option-value="name" :options="optionsNomenclator" label="Nombre *"  />
                     </div>
<!--                     <div class="col-md-4 col-lg-3 q-px-sm q-py-sm">-->
<!--                       <q-input dense outlined label="Código *" v-model="codigo" ></q-input>-->
<!--                     </div>-->
<!--                     <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">-->
<!--                       <q-input dense outlined label="Registro de Entrada *" v-model="registroEntrada" ></q-input>-->
<!--                     </div>-->
<!--                     <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">-->
<!--                       <q-input dense outlined label="Lote *" v-model="lote" ></q-input>-->
<!--                     </div>-->
<!--                     <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">-->
<!--                       <q-input dense outlined label="Tamaño del Lote *" v-model="sizeLote" ></q-input>-->
<!--                     </div>-->
<!--                     <div class="col-md-4 col-lg-4 q-px-sm q-py-sm">-->
<!--                       <q-input dense outlined v-model="dateVencimiento"  label="Fecha de Vencimiento" >-->
<!--                         <template v-slot:append>-->
<!--                           <q-icon name="event" class="cursor-pointer">-->
<!--                             <q-popup-proxy cover transition-show="scale" transition-hide="scale">-->
<!--                               <q-date  color="ap-primary" v-model="dateVencimiento"  mask="DD/MM/YYYY">-->
<!--                                 <div class="row items-center justify-end">-->
<!--                                   <q-btn v-close-popup label="Close" color="ap-primary" flat />-->
<!--                                 </div>-->
<!--                               </q-date>-->
<!--                             </q-popup-proxy>-->
<!--                           </q-icon>-->
<!--                         </template>-->
<!--                       </q-input>-->
<!--                     </div>-->
                   </div>
                  <div class="q-my-md" align="right">
                    <q-btn outline class="q-mr-sm"  label="Limpiar" @click="clearFilter"></q-btn>
                    <q-btn color="ap-primary" label="Aplicar" @click="applyFilter"></q-btn>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </transition>
        </div>
      </template>
      <template v-slot:bottom>
        <PaginationComponent @request="request" :rows_per_page_options="[10]"
                             :pagination="pagination"></PaginationComponent>
      </template>
    </q-table>
  </div>
</template>

<script>
  import DeleteDialog from 'src/core/dialogs/DeleteDialog';
  import PaginationComponent from 'src/core/components/grid/pagination/Pagination.vue';
  import {
    API_REST_DELETE_REQUEST,
    API_REST_GET_REQUEST, API_REST_POST_REQUEST
  } from '../../../../infrastructure/adapters/BoRestApiAdapter';
  import QSpinnerFacebook from 'quasar/src/components/spinner/QSpinnerFacebook';
  import { notify } from '../../../../infrastructure/services/VisualNotifyService';
  import { toUtcDateTime } from '../../../../infrastructure/services/DateTimeServices';
  import { useLogin } from '../../../composable/useLogin';

  export default {
    name: 'ComponentesPage',
    components: {
      PaginationComponent
    },
    data() {
      return {
        userData: useLogin().user,
        search:'',
        nomenclador: null,
        codigo: null,
        registroEntrada: null,
        lote: null,
        sizeLote: null,
        dateVencimiento: null,
        optionsNomenclator: [],
        act_filter_advance:false,
        columns: [
          {
            name: 'nomencladorComponente',
            required: true,
            label: 'Nombre',
            align: 'center',
            field: row => row.nomencladorComponente
          },
          {
            name: 'codigo',
            required: true,
            label: 'Código',
            align: 'left',
            field: row => row.codigo
          },
          { name: 'lote', align: 'center', label: 'Lote', field: row => row.lote },
          { name: 'sizeLote', align: 'center', label: 'Tamaño del lote', field: row => row.sizeLote },
          { name: 'unidadMedida', align: 'center', label: 'Unidad Medida', field: row => row.unidadMedida },
          {
            name: 'dateVencimiento',
            align: 'center',
            label: 'Fecha de Vencimiento',
            field: row => row.dateVencimiento
          }

        ],
        rows: [],
        selected: [],
        pagination: {},
        pagination_send: {
          pageSize: 10,
          currentPage: 1,
          payload: {
            search:null,
            nomencladorComponenteId: null,
            codigo: null,
            registroEntrada: null,
            lote: null,
            sizeLote: null,
            dateVencimiento: null
          }
        }

      };
    },
    mounted() {
       this.loadData();
       this.loadNomenclador()
    },
    methods: {
      loadNomenclador(){
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
            spinnerColor: 'primary',
            spinnerSize: 140,
            backgroundColor: 'white',
            message: 'Cargando..',
            messageColor: 'black'
        });
        let url='nomenclador/componentes'
        API_REST_GET_REQUEST({endpoint:url}).then(resp=>{
          this.optionsNomenclator=resp.data
        })
        this.$q.loading.hide()
      },
      request(value) {
        this.pagination.pageSize = value.rowsPerPage;
        this.pagination.currentPage = value.page;
        this.pagination_send.pageSize = value.rowsPerPage;
        this.pagination_send.currentPage = value.page;
        this.loadData();
      },
      compareDate(date){
        var moment = require('moment');
        var dateString = date;
        var date = moment.utc(dateString).local();
        let newDateVencimiento=new Date(date)
        let newDateAct=new Date()
        // if(newDateVencimiento>newDateAct){
        //   var day_as_milliseconds = 86400000;
        //   var diff_in_millisenconds = newDateVencimiento - newDateAct;
        //   var diff_in_days = diff_in_millisenconds / day_as_milliseconds;
        //   let dif=parseInt(Math.round(diff_in_days))
        //    if(dif<=30){
        //      return 'orange'
        //    }
        // }
        if(newDateAct>newDateVencimiento){
          return 'red'
        }
        else{
          return 'blue'
        }

      },
      formatDate(date) {
        var moment = require('moment');
        var dateString = date;
        var date = moment.utc(dateString).local();
        return date.format('DD/MM/YYYY');
      },
      loadData() {
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'primary',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Cargando..',
          messageColor: 'black'
        });
        let url = 'componente/PageData';
        API_REST_POST_REQUEST({ endpoint: url, payload: this.pagination_send }).then(resp => {
          this.rows = resp.data.data;
          this.pagination = {
            page: resp.data.currentPage,
            rowsPerPage: resp.data.rowsPerPage,
            rowsNumber: resp.data.totalItems
          };

          this.$q.loading.hide();
        }).catch(e => {
          this.$q.loading.hide();
        });
      },
      applyFilter(){
        this.pagination_send.payload.nomencladorComponenteId=this.nomenclador?this.nomenclador.id:null
        this.pagination_send.payload.codigo=this.codigo
        this.pagination_send.payload.registroEntrada=this.registroEntrada
        this.pagination_send.payload.lote=this.lote
        this.pagination_send.payload.sizeLote=this.sizeLote
        let formattedDate=null
        if(this.dateVencimiento!=null){
          let moment = require('moment');
          let date = this.dateVencimiento;
          formattedDate= moment(date, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
        }
        this.pagination_send.payload.dateVencimiento=formattedDate
        this.loadData()
      },
      clearFilter(){
        this.nomenclador=null
        this.codigo=null
        this.registroEntrada=null
        this.lote=null
        this.sizeLote=null
        this.dateVencimiento=null
        this.pagination_send.payload.nomencladorComponenteId=null
        this.pagination_send.payload.codigo=null
        this.pagination_send.payload.registroEntrada=null
        this.pagination_send.payload.lote=null
        this.pagination_send.payload.sizeLote=null
        this.pagination_send.payload.dateVencimiento=null
        this.loadData()
      },
      deleted() {
        this.$q
          .dialog({
            component: DeleteDialog,
            componentProps: {
              countsElementsSelected: 1
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
            });
            let url = `componente/${this.selected[0].id}`;
            API_REST_DELETE_REQUEST({ endpoint: url, payload: {} }).then(resp => {
              notify({
                content: 'Componente eliminado correctamente',
                type: 'positive'
              });
              this.selected = [];
              this.loadData();
              this.$q.loading.hide();
            });
          });
      }
    }
  };
</script>

<style scoped>
  .v-enter-active {
    transition: opacity 0.8s ease;
  }

  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
