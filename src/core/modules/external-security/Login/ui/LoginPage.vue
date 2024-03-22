<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center q-py-md login-page full-height">
  <div class="row items-center justify-center full-width">
    <div class="col col-xs-12 col-md-4 q-pa-xs">
      <q-form @submit="submitData">
        <q-card bordered class="q-pa-sm">
          <q-card-section class="text-center">
            <q-img
              src="~assets/images/inmunoensayo.jpg"

              :img-style="{'background-size': 'contain'}" style="width: 40%;height: 40%;display: block;margin: 0px auto"
            />
            <InputField
              lazy-rules
              :label="formModel.userName.label"
              v-model="formModel.userName.value"
              :rules="formModel.userName.rules"
            >
              <template v-slot:prepend>
                <q-icon
                  color="ap-primary"
                  class="q-ml-sm"
                  :name="formModel.userName.icon"
                ></q-icon>
              </template>
            </InputField>
            <InputField
              class="q-py-sm"
              lazy-rules
              :rules="formModel.password.rules"
              :label="formModel.password.label"
              :type="formModel.password.show ? 'text' : 'password'"
              v-model="formModel.password.value"
            >
              <template v-slot:prepend>
                <q-icon
                  color="ap-primary"
                  class="q-ml-sm"
                  :name="formModel.password.icon"
                ></q-icon>
              </template>
              <template v-slot:append>
                <q-icon
                  :name="formModel.password.show ? 'visibility_off' : 'visibility'                           "
                  class="cursor-pointer q-mr-xs"
                  @click="formModel.password.show = !formModel.password.show"
                />
              </template>
            </InputField>
<!--            <div class="text-right">-->
<!--              <link-component to="/recovery" class="full-width q-mt-lg q-pt-lg" text="¿ Old Pasword"/>-->
<!--            </div>-->
          </q-card-section>
          <q-card-actions align="center">
            <q-btn class="full-width q-mb-lg"  type="submit" color="ap-primary"
                   label="Login">
              <div class="q-mx-sm" v-if="showLoadingSubmitBtn">
                <q-spinner  color="white" size=".5em"></q-spinner>
              </div>
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
  import InputField from "../../../../components/inputs/inputField/inputField.vue";
  import LoginFormModel from "src/core/modules/external-security/Login/domain/models/LoginFormModel";
  import IconComponent from 'src/core/components/brand/IconComponent.vue';
  import {useMeta} from "app/node_modules/quasar";
  import {defineComponent} from "app/node_modules/vue";
  import {useCallRequest} from "src/core/composable/useCallRequest";
  import {Auth} from "src/core/modules/external-security/Login/controller/LoginController";
  import {useNotify} from "src/core/composable/useNotify";
  import {notify, notifyError} from "src/infrastructure/services/VisualNotifyService";
  import {useLogin} from "src/core/composable/useLogin";
  export default  defineComponent({
  name: 'loginPage',
  components: {
    InputField,
  },
    created() {
      //@ts-ignore
      useMeta(this.meta);
    },
  data () {
    const formModel = new LoginFormModel();
    const showLoadingSubmitBtn = false;
    return {
      meta: {
        title: 'Autenticar',
        titleTemplate: (title: string) => `${title}`,
      },
      formModel,
      // Local var
      showLoadingSubmitBtn,
    }
  },
    methods:{
      submitData() {
      this.showLoadingSubmitBtn=true
        let object={
          userName:this.formModel.userName.value,
          password:this.formModel.password.value
        }
        Auth({payload:object}).then(resp=>{
           if(resp.statusCode==200){
               useLogin().setToken(resp.data.acccesToken)
               useLogin().setUser(resp.data.user)
              this.$router.push({name: 'WelcomeDashboardPage'})
           }
           else{
             notify({
               content:resp.data,
               type:"negative"
             })
           }

        }).catch((e:any)=>{
             console.log(e)

        }).finally(()=>{
          this.showLoadingSubmitBtn=false
        })
      },
    }

})
</script>
<style lang="scss" scoped>
  .login-page {
    background-color: #DFFFFC;
    background-image: url("~assets/images/logo_short.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: right;
  }
</style>
