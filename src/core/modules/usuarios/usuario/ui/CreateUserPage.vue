<template>
  <q-page class="q-pa-md bg-grey-1">
    <q-form @submit="Save" autocomplete="off">
      <div class="text-subtitle1 text-bold">Crear Usuario</div>
      <q-separator/>
      <q-card flat class=" bg-grey-1">
        <q-card-section>
          <div class="row">
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-input dense outlined label="Nombre *" v-model="name" :rules="[val => !!val || 'El campo es requerido']"></q-input>
            </div>
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-input dense outlined label="Apellidos *" v-model="lastName" :rules="[val => !!val || 'El campo es requerido']"></q-input>
            </div>
            <div class="col-md-4 col-lg-6q-px-sm q-py-sm">
              <q-input dense outlined label="Usuario *" v-model="userName" :rules="[val => !!val || 'El campo es requerido']"></q-input>
            </div>
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-select dense outlined v-model="role" option-label="name" option-value="name" :options="optionsRoles" label="Roles *" :rules="[val => !!val || 'El campo es requerido']" />
            </div>
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-input dense outlined v-model="password"  :type="isPwd ? 'password' : 'text'" label="Contraseña *" :rules="[val => !!val || 'El campo es requerido']" >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-md-4 col-lg-6 q-px-sm q-py-sm">
              <q-input dense outlined v-model="confirmPassword"  :type="isPwdConfirm ? 'password' : 'text'" label="Confirmar Contraseña *" :rules="[val => !!val || 'El campo es requerido']">
                <template v-slot:append>
                  <q-icon
                    :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwdConfirm = !isPwdConfirm"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="fixed-bottom-right">
        <q-btn outline class="q-mt-lg q-mb-lg" label="Cancelar" @click="this.$router.push({name:'UserPage'})" ></q-btn>
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
    name: 'CreateUserPage',
    data() {
      return {
        isPwd: true,
        isPwdConfirm: true,
        name: '',
        lastName: '',
        userName: '',
        role: '',
        optionsRoles: [],
        password: '',
        confirmPassword: ''
      };
    },
    mounted(){
     this.loadRoles()
    },
    methods:{
      loadRoles(){
        let url='roles'
        API_REST_GET_REQUEST({endpoint:url}).then(resp=>{
          this.optionsRoles=resp.data
        })
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
        let url = 'users'
        const regex = /^(?=.*[!@#$%^&*])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,}$/;
        let object = {
          name: this.name,
          lastName: this.lastName,
          userName: this.userName,
          role: this.role.name,
          password: this.password,
          confirmPassword: this.confirmPassword,
        }
        if (this.password != this.confirmPassword) {
          notify({
            content: 'Las contraseñas son diferentes',
            type: 'negative'
          })
        }
        if (!regex.test(this.password)) {
          notify({
            content: 'La contraseña debe tener al menos 5 dígitos incluyendo letras, números y caracteres especiales ',
            type: 'negative'
          })
          this.$q.loading.hide()
        } else {
          API_REST_POST_REQUEST({ endpoint: url, payload: object }).then(resp => {
            if (resp.status == 200) {
              notify({
                content: 'Usuario creado correctamente',
                type: 'positive'
              })
              this.$q.loading.hide()
              this.$router.push({ name: 'UserPage' })
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
  };
</script>

<style scoped>

</style>
