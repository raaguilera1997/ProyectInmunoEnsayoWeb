<template>
  <q-page class="q-pa-md bg-grey-1">
    <q-form @submit="Save" autocomplete="off">
      <div class="text-subtitle1 text-bold">Crear Nomenclador Materia Prima Adquirida</div>
      <q-separator/>
      <q-card flat class=" bg-grey-1">
        <q-card-section>
          <div class="row">
            <div class="col-4 q-px-sm q-py-sm">
              <q-input dense outlined label="Nombre *" v-model="name" :rules="[val => !!val || 'El campo es requerido']"></q-input>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="fixed-bottom-right">
        <q-btn outline class="q-mt-lg q-mb-lg" label="Cancelar" @click="this.$router.push({name:'NomMPAdquirida'})" ></q-btn>
        <q-btn class="q-ma-lg" label="Aceptar" type="submit" color="ap-primary"   ></q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
  import { API_REST_GET_REQUEST, API_REST_POST_REQUEST } from '../../../../../infrastructure/adapters/BoRestApiAdapter';
  import { password } from '../../../../../infrastructure/statics/InputsRulesValidation';
  import { notify } from '../../../../../infrastructure/services/VisualNotifyService';
  import QSpinnerFacebook from 'quasar/src/components/spinner/QSpinnerFacebook';

  export default {
    name: 'CrearMPAdquiridaPage',
    data() {
      return {
        name: '',
      };
    },
    methods:{
      Save() {
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'primary',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Cargando..',
          messageColor: 'black'
        })
        let url = 'nomenclador/materiaPrimaAdquirida'
        let object = {
          name: this.name,
        }
          API_REST_POST_REQUEST({ endpoint: url, payload: object }).then(resp => {
            if (resp.status == 200) {
              notify({
                content: 'Nomenclador Materia Prima Adquirida creado correctamente',
                type: 'positive'
              })
              this.$q.loading.hide()
              this.$router.push({ name: 'NomMPAdquirida' })
            }
          }).catch(err => {
            notify({
              content: err.response.data,
              type: 'negative'
            })
            this.$q.loading.hide()
          })
        }
    }
  };
</script>

<style scoped>

</style>
