<template>
  <q-page class="q-pa-md bg-grey-1">
    <q-form @submit="Save" autocomplete="off">
      <div class="text-subtitle1 text-bold">Crear Materia Prima Adquirida</div>
      <q-separator/>
      <q-card flat class=" bg-grey-1">
        <q-card-section>
          <div class="row">
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-select @update:model-value="UpdateNom" dense outlined v-model="nomencladorAdquirida" option-label="name" option-value="name" :options="optionsNomenclator" label="Nombre *" :rules="[val => !!val || 'El campo es requerido']" />
            </div>
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-input readonly dense outlined label="Código *" v-model="codigo" :rules="[val => !!val || 'El campo es requerido']"></q-input>
            </div>
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-input dense outlined label="Registro de Entrada *" v-model="registroEntrada" :rules="[val => !!val || 'El campo es requerido']"></q-input>
            </div>
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-input dense outlined label="Lote *" v-model="lote" :rules="[val => !!val || 'El campo es requerido']"></q-input>
            </div>
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-input @keypress="restrictCharsNumber($event)" dense outlined label="Tamaño del Lote *" v-model="sizeLote" :rules="[val => !!val || 'El campo es requerido']"></q-input>
            </div>
            <div class="col-md-4 col-lg-4 q-px-sm q-py-sm">
              <q-input readonly dense outlined v-model="dateVencimiento" :rules="[val => !!val || 'El campo es requerido']" label="Fecha de Vencimiento" >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date  color="ap-primary" v-model="dateVencimiento"  mask="DD/MM/YYYY" @update:model-value="compareDate">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="ap-primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12 row" v-if="showExtencion">
                <q-checkbox  v-model="extension" label="Extensión de Vencimiento " />
                <q-input readonly v-if="extension" class="q-py-sm q-px-sm" dense outlined v-model="dateExtension" :rules="[val => !!val || 'El campo es requerido']" label="Fecha de Extensión" >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date  color="ap-primary" v-model="dateExtension"  mask="DD/MM/YYYY">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="ap-primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
        </q-card-section>
      </q-card>
      <div class="fixed-bottom-right">
        <q-btn outline class="q-mt-lg q-mb-lg" label="Cancelar" @click="this.$router.push({name:'AdquiridasPage'})" ></q-btn>
        <q-btn :disable="extension&&dateExtension?false:!extension?false:true" class="q-ma-lg" label="Aceptar" type="submit" color="ap-primary"   ></q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
  import { API_REST_GET_REQUEST, API_REST_POST_REQUEST } from '../../../../../infrastructure/adapters/BoRestApiAdapter';
  import { notify } from '../../../../../infrastructure/services/VisualNotifyService';
  import QSpinnerFacebook from 'quasar/src/components/spinner/QSpinnerFacebook';
  import { useNotification } from '../../../../composable/useNotification';

  export default {
    name: 'CreateMPAdquiridas',
    data() {
      return {
        showExtencion:false,
        extension:false,
        nomencladorAdquirida: '',
        optionsNomenclator: [],
        codigo: '',
        registroEntrada: '',
        lote: '',
        sizeLote: 0,
        dateVencimiento: null,
        dateExtension: null,

      };
    },
    mounted(){
      this.loadNomenclador()
    },
    methods:{
      compareDate(dateVenc){
        var fechaActual = new Date();
        var fechaCompararStr = dateVenc;
        var partesFechaComparar = fechaCompararStr.split("/");
        var dia = parseInt(partesFechaComparar[0], 10);
        var mes = parseInt(partesFechaComparar[1], 10) - 1;
        var anio = parseInt(partesFechaComparar[2], 10);
        var fechaComparar = new Date(anio, mes, dia);
        if (fechaActual >= fechaComparar) {
          this.showExtencion=true
        }
        else {
         this.showExtencion=false
        }
      },
      UpdateNom(value){
        this.codigo=value.codigo
      },
      restrictCharsNumber($event) {
        if ($event.charCode >= 48 && $event.charCode <= 57) {
          return true
        } else {
          $event.preventDefault();
        }
      },
      loadNomenclador(){
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'primary',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Cargando..',
          messageColor: 'black'
        });
        let url='nomenclador/materiaPrimaAdquirida'
        API_REST_GET_REQUEST({endpoint:url}).then(resp=>{
          this.optionsNomenclator=resp.data
        })
        this.$q.loading.hide()
      },
      Save() {
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'primary',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Cargando..',
          messageColor: 'black'
        })
        let url = 'materiaPrimasAdquiridas'
        let moment = require('moment');

        let formattedDateVenc = moment(this.dateVencimiento, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
        let formattedDateExt = moment(this.dateExtension, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
        let object = {
          nomencladorMateriaPrimaAdquiridaId: this.nomencladorAdquirida.id,
           codigo:this.codigo,
           registroEntrada:this.registroEntrada,
           lote:this.lote,
           sizeLote:this.sizeLote,
           dateVencimiento:formattedDateVenc,
           hasExtension:this.extension,
           dateExtension:this.dateExtension?formattedDateExt:null
        }
           API_REST_POST_REQUEST({ endpoint: url, payload: object }).then(resp => {
            if (resp.status == 200) {
              notify({
                content: 'materia prima  creada correctamente',
                type: 'positive'
              })
              this.$q.loading.hide()
              this.loadNotification()
              this.$router.push({ name: 'AdquiridasPage' })
            }
          }).catch(err => {
            notify({
              content: err.response.data,
              type: 'negative'
            })
            this.$q.loading.hide()
          })
        },
      loadNotification(){
        let result=[]
        let url=`notificationMateriaPrimaAdquirida`
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'primary',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Cargando..',
          messageColor: 'black'
        })
        API_REST_GET_REQUEST({endpoint:url}).then(resp=>{
          resp.data.result.map((item)=>{
            let object={
              ...item,
              type:'MPA',
              leido:false

            }
            result.push(object)
          })
          useNotification().setListMpaAdquirida(result)
        })
        this.$q.loading.hide()
      },
      }

  };
</script>

<style scoped>

</style>
