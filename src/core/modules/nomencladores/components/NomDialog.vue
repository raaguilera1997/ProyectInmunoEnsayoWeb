<script lang="ts">
  import { defineComponent } from 'vue';
  import { API_REST_POST_REQUEST, API_REST_PUT_REQUEST } from 'src/infrastructure/adapters/BoRestApiAdapter';
  import { notify } from 'src/infrastructure/services/VisualNotifyService';
  //@ts-ignore
  import QSpinnerFacebook from 'quasar/src/components/spinner/QSpinnerFacebook';

  export default defineComponent({
    props: {
      id: {
        type: Number,
        required: true
      },
      nameMat: {
        type: String,
        required: true
      },
      codNom: {
        type: String,
        required: true
      },
      nameNom: {
        type: String,
        required: false,
        default:''
      },
      url: {
        type: String,
        required: true,
      },
    },
    data() {
      const showLoadingSubmitBtn = false;
      return {
        showLoadingSubmitBtn,
        name: '',
        codigo: '',
      };
    },
    mounted() {
      if(this.id!=0){
        this.name=this.nameNom
        this.codigo=this.codNom

      }
    },
    methods: {
      Save() {
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'primary',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Cargando..',
          messageColor: 'black'
        });

        let object = {
          name: this.name,
          codigo: this.codigo,
        };
        if(this.id==0){
          let urlSend = this.url;
          API_REST_POST_REQUEST({ endpoint: urlSend, payload: object }).then(resp => {
            if (resp.status == 200) {
              notify({
                content: 'Nomenclador creado correctamente',
                type: 'positive'
              });
              this.$q.loading.hide();
              this.onYesClick()
            }
          }).catch(err => {
            notify({
              content: err.response.data,
              type: 'negative'
            });
            this.$q.loading.hide();
          });
        }
        else{
          let urlSend = `${this.url}/${this.id}`
          API_REST_PUT_REQUEST({ endpoint: urlSend, payload: object }).then(resp => {
            if (resp.status == 200) {
              notify({
                content: 'Nomenclador  editado correctamente',
                type: 'positive'
              })
              this.$q.loading.hide();
              this.onYesClick()
            }
          }).catch(err => {
            notify({
              content: err.response.data,
              type: 'negative'
            })
            this.$q.loading.hide()
          })
        }
      },
      // following method is REQUIRED
      // (don't change its name --> "show")
      show() {
        // @ts-ignore
        this.$refs.dialog.show();
      },
      onYesClick() {
        this.hide();
        this.$emit('ok');
      },
      // following method is REQUIRED
      // (don't change its name --> "hide")
      hide() {
        // @ts-ignore
        this.$refs.dialog.hide();
      },
      onCancelClick() {
        this.hide();
      }

    }
  });
</script>
<template>
  <q-dialog ref="dialog" @hide="hide" persistent>
    <q-card class="q-dialog-plugin" style="width: 400px; max-width: 90vw;">
      <q-toolbar class="text-white bg-ap-secondary q-px-md q-py-sm">
        <q-icon name="las la-stream" size="25px"></q-icon>
        <span class="text-body2 text-uppercase q-ml-md text-bold">{{`${id==0?'Adicionar':'Editar'} ${nameMat} Nomenclador `}}</span>
        <q-space></q-space>
        <q-btn @click="onCancelClick()" round flat>
          <q-icon template name="las la-times"></q-icon>
        </q-btn>
      </q-toolbar>
      <q-form  @submit="Save" autocomplete="off">
        <div class="q-pa-md row justify-center">
          <div class="col-12">
            <q-input dense outlined label="Nombre *" v-model="name"
                     :rules="[val => !!val || 'El campo es requerido',
                     val => val.length > 2 || 'El campo requiere tres caracteres como minimo']"></q-input>
          </div>
          <div class="col-12">
            <q-input dense outlined label="Código *" v-model="codigo"
                     :rules="[val => !!val || 'El campo es requerido',
                     val => val.length > 2 || 'El campo requiere tres caracteres como minimo']"></q-input>
          </div>
        </div>

      <q-card-actions align="right" class="q-px-lg q-pb-lg q-pt-sm q-gutter-y-sm">
        <q-btn color="dark" outline label="Cancelar" class="q-px-md" @click="onCancelClick()"/>
        <q-btn :loading="showLoadingSubmitBtn" color="ap-secondary" :label="id==0?'Crear':'Editar'" class="q-px-lg" type="submit"/>
      </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

