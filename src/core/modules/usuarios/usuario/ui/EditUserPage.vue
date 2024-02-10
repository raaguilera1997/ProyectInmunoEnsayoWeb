<template>
  <q-page class="q-pa-md bg-grey-1">
    <q-form @submit="Save" autocomplete="off">
      <div class="text-subtitle1 text-bold">Editar Usuario</div>
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
          </div>
        </q-card-section>
      </q-card>
      <div class="fixed-bottom-right">
        <q-btn outline class="q-mt-lg q-mb-lg" label="Cancelar" @click="this.$router.push({name:'UserPage'})" ></q-btn>
        <q-btn class="q-ma-lg" label="Aceptar" color="ap-primary" type="submit"  ></q-btn>
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
  import { password } from '../../../../../infrastructure/statics/InputsRulesValidation';
  import { notify } from '../../../../../infrastructure/services/VisualNotifyService';
  import QSpinnerFacebook from 'quasar/src/components/spinner/QSpinnerFacebook';
  export default {
    name: 'EditarUserPage',
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
      this.getInfo()
    },
    methods:{
      loadRoles(){
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'primary',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Cargando..',
          messageColor: 'black'
        })
        let url='roles'
        API_REST_GET_REQUEST({endpoint:url}).then(resp=>{
          this.optionsRoles=resp.data
        })
        this.$q.loading.hide()
      },
      getInfo(){
        let url=`users/${this.$route.params.id}`
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'primary',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Cargando..',
          messageColor: 'black'
        })
        API_REST_GET_REQUEST({endpoint:url}).then(resp=>{
          this.name=resp.data.name
          this.lastName=resp.data.lastName
          this.userName=resp.data.userName
          this.role=resp.data.role
        })
        this.$q.loading.hide()

      },
      Save(){
        this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'primary',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: 'Cargando..',
          messageColor: 'black'
        })
        let url=`users/${this.$route.params.id}`
        let object={
          name:this.name,
          lastName:this.lastName,
          userName: this.userName,
          role:this.role.name?this.role.name:this.role,
        }

        if(this.password!=this.confirmPassword){
          notify({
            content:'Las contraseñas son diferentes',
            type:'negative'
          })
        }

        API_REST_PUT_REQUEST({endpoint:url,payload:object}).then(resp=>{
          if(resp.status==200){
            notify({
              content:'Usuario editado correctamente',
              type:'positive'
            })
            this.$router.push({name:'UserPage'})
          }
          this.$q.loading.hide()
        }).catch(err=>{
          notify({
            content:err.response.data,
            type:'negative'
          })
          this.$q.loading.hide()
        })
      }
    }
  };
</script>

<style scoped>

</style>
