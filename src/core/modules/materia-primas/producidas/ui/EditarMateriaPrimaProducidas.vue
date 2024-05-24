<template>
  <q-page class="q-pa-md bg-grey-1">
    <q-form @submit="Save" autocomplete="off">
      <div class="text-subtitle1 text-bold">Editar Materia Prima Producidas</div>
      <q-separator/>
      <q-card flat class=" bg-grey-1">
        <q-card-section>
          <div class="row">
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-select @update:model-value="UpdateNom" dense outlined v-model="nomencladorProducida"
                        option-label="name" option-value="name" :options="optionsNomenclator" label="Nombre *"
                        :rules="[val => !!val || 'El campo es requerido']"/>
            </div>
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-input readonly dense outlined label="Código *" v-model="codigo"
                       :rules="[val => !!val || 'El campo es requerido']"></q-input>
            </div>
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-input dense outlined label="Lote *" v-model="lote"
                       :rules="[val => !!val || 'El campo es requerido']"></q-input>
            </div>
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-input dense outlined label="Tamaño del Lote *" v-model="sizeLote"
                       :rules="[val => !!val || 'El campo es requerido']"></q-input>
            </div>
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-select dense outlined v-model="unidadMedida" option-label="name" option-value="name"
                        :options="optionsUnidadMedida" label="Unidad de Medida *"
                        :rules="[val => !!val || 'El campo es requerido']"/>
            </div>
            <div class="col-md-4 col-lg-4 q-px-sm q-py-sm">
              <q-input dense outlined v-model="dateVencimiento" :rules="[val => !!val || 'El campo es requerido']"
                       label="Fecha de Vencimiento">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date color="ap-primary" v-model="dateVencimiento" mask="DD/MM/YYYY">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="ap-primary" flat/>
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
        <q-btn outline class="q-mt-lg q-mb-lg" label="Cancelar"
               @click="this.$router.push({name:'ProducidasPage'})"></q-btn>
        <q-btn class="q-ma-lg" label="Aceptar" type="submit" color="ap-primary"></q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
  import {
    API_REST_GET_REQUEST,
    API_REST_POST_REQUEST,
    API_REST_PUT_REQUEST
  } from '../../../../../infrastructure/adapters/BoRestApiAdapter';
  import {password} from '../../../../../infrastructure/statics/InputsRulesValidation';
  import {notify} from '../../../../../infrastructure/services/VisualNotifyService';
  import QSpinnerFacebook from 'quasar/src/components/spinner/QSpinnerFacebook';
  import {getCurrentDateTime, toUtcDateTime} from '../../../../../infrastructure/services/DateTimeServices';
  import {useNotification} from '../../../../composable/useNotification';

  export default {
    name: 'EditarMPProducidas',
    data() {
      return {
        nomencladorProducida: '',
        optionsNomenclator: [],
        optionsUnidadMedida: ['L','ML','MG'],
        codigo: '',
        registroEntrada: '',
        unidadMedida: '',
        lote: '',
        sizeLote: 0,
        dateVencimiento: null,

      };
    },
    mounted() {
      this.getInfo()
      this.loadNomenclador()
    },
    methods: {
      UpdateNom(value) {
        this.codigo = value.codigo
      },
      formatDate(date) {
        var moment = require('moment');
        var dateString = date;
        var date = moment.utc(dateString).local();
        return date.format('DD/MM/YYYY');
      },
      getInfo() {
        let url = `materiaPrimasProducidas/${this.$route.params.id}`
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'primary',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Cargando..',
          messageColor: 'black'
        })
        API_REST_GET_REQUEST({endpoint: url}).then(resp => {
          this.nomencladorProducida = resp.data.nomencladorMateriaPrimaProducida
          this.codigo = resp.data.codigo
          this.lote = resp.data.lote
          this.sizeLote = resp.data.sizeLote
          this.unidadMedida = resp.data.unidadMedida
          this.dateVencimiento = this.formatDate(resp.data.dateVencimiento)
        })
        this.$q.loading.hide()

      },
      loadNomenclador() {
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'primary',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Cargando..',
          messageColor: 'black'
        });
        let url = 'nomenclador/materiaPrimaProducida'
        API_REST_GET_REQUEST({endpoint: url}).then(resp => {
          this.optionsNomenclator = resp.data
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
        let url = `materiaPrimasProducidas/${this.$route.params.id}`
        let moment = require('moment');
        let date = this.dateVencimiento;
        let formattedDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
        let object = {
          nomencladorMateriaPrimaProducidaId: this.nomencladorProducida.id,
          codigo: this.codigo,
          lote: this.lote,
          sizeLote: this.sizeLote,
          unidadMedida: this.unidadMedida,
          dateVencimiento: formattedDate
        }
        API_REST_PUT_REQUEST({endpoint: url, payload: object}).then(resp => {
          if (resp.status == 200) {
            notify({
              content: 'materia prima editada correctamente',
              type: 'positive'
            })
            this.$q.loading.hide()
            // this.loadNotification()
            this.$router.push({name: 'ProducidasPage'})
          }
        }).catch(err => {
          notify({
            content: err.response.data,
            type: 'negative'
          })
          this.$q.loading.hide()
        })
      },
      loadNotification() {
        let result = []
        let url = `notificationMateriaPrimaAdquirida`
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'primary',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Cargando..',
          messageColor: 'black'
        })
        API_REST_GET_REQUEST({endpoint: url}).then(resp => {
          resp.data.result.map((item) => {
            let object = {
              ...item,
              type: 'MPA',
              leido: false

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
