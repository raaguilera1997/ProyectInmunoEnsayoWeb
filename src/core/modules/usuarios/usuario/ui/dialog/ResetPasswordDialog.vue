<script lang="ts">
  import {defineComponent} from "vue";
  import {useCallRequest} from "src/core/composable/useCallRequest";
  import {API_REST_PUT_REQUEST} from "src/infrastructure/adapters/BoRestApiAdapter";
  import {notify} from "src/infrastructure/services/VisualNotifyService";

  export default defineComponent({
    props: {
      id: {
        type: String,
        required: true
      },
      userName: {
        type: String,
        required: true
      },

    },
    data() {
      const showLoadingSubmitBtn = false;
      const newPassword: string = '';
      const confirmedPassword: string = '';
      const showNewPassword: boolean = false;
      const showConfirmedPassword: boolean = false;
      return {
        showLoadingSubmitBtn,
        newPassword,
        confirmedPassword,
        showNewPassword,
        showConfirmedPassword
      };
    },
    methods: {
      show() {
        // @ts-ignore
        this.$refs.dialog.show();
      },
      onYesClick() {
        this.hide();
        this.$emit("ok");
      },
      hide() {
        // @ts-ignore
        this.$refs.dialog.hide();
      },
      onCancelClick() {
        this.hide();
      },
      async submitData() {
        this.showLoadingSubmitBtn = true;
        if (this.newPassword != this.confirmedPassword) {
          this.$q.notify({
            type: 'negative',
            position: 'bottom-left',
            message: 'Las contraseñas no coinciden'
          })
          this.showLoadingSubmitBtn = false;
        } else {
          let object={
            password:this.newPassword,
            confirmPassword:this.confirmedPassword
          }
          let url= `auth/ChangePassword/${this.id}`
          API_REST_PUT_REQUEST({ endpoint: url, payload: object }).then(resp => {
            if (resp.status == 200) {
              // @ts-ignore
              notify({
                content: 'Contraseña cambiada exitosamente',
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
      }
    }
  });
</script>
<template>
  <q-dialog ref="dialog" @hide="hide" persistent>
    <q-card class="q-dialog-plugin" style="width: 500px; max-width: 90vw;">
      <q-toolbar class="text-white bg-ap-secondary q-px-md q-py-sm">
        <q-icon  name="las la-lock"></q-icon>
        <span class="text-body2 text-uppercase q-ml-md text-bold">Cambiar Contraseña ({{userName}})</span>
        <q-space></q-space>
        <q-btn @click="onCancelClick()" round flat>
          <q-icon  name="las la-times"></q-icon>
        </q-btn>
      </q-toolbar>
      <q-form @submit="submitData">
        <q-card-section class="q-px-lg q-pt-lg q-pb-xs">
          <div class="row justify-center q-gutter-md">
            <div class="col-12">
              <q-input
                dense outlined
                :rules="[val => !!val || 'Nueva Contraseña es requerido']"
                v-model="newPassword"
                :type="showNewPassword ? 'text': 'password'"
                label="Nueva Contraseña"
              >
                <template v-slot:prepend>
                  <icon-component class="q-ml-sm" name="las la-key"></icon-component>
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="showNewPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer q-mr-xs"
                    @click="showNewPassword = !showNewPassword"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-12">
              <q-input
                dense outlined
                label="Confirmar Contraseña"
                lazy-rules
                :rules="[val => !!val || 'Confirmar contraseña es requerido']"
                :maxlength="255"
                v-model="confirmedPassword"
                :type="showConfirmedPassword ? 'text': 'password'"
              >
                <template v-slot:prepend>
                  <icon-component class="q-ml-sm" name="las la-key"></icon-component>
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="showConfirmedPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer q-mr-xs"
                    @click="showConfirmedPassword = !showConfirmedPassword"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-px-lg q-pb-lg q-pt-sm q-gutter-y-sm">
          <q-btn color="dark" outline label="Cancelar" class="q-px-md" @click="onCancelClick()"/>
          <q-btn :loading="showLoadingSubmitBtn" color="ap-secondary" label="Cambiar" class="q-px-lg" type="submit"/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
