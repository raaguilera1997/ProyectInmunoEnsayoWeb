<script lang="ts">
import { useDrawer } from 'src/core/composable/useDrawer';
import { defineComponent } from 'vue';
import LogoBrandComponent from 'src/core/components/brand/LogoBrandComponent.vue';
import ContentFooterComponent from './components/ContentFooterComponent.vue';
import ContentHeaderComponent from './components/ContentHeaderComponent.vue';
import MenuOptionJSON from './domain/statics/MenuOption.json';
import { useLogin } from 'src/core/composable/useLogin';
import { API_REST_GET_REQUEST } from 'src/infrastructure/adapters/BoRestApiAdapter';
import { QSpinnerFacebook } from 'quasar';
import { useNotification } from 'src/core/composable/useNotification';

export default defineComponent({
  name: 'MainLayout',
  components: {
    // IconComponent,
    LogoBrandComponent,
    ContentHeaderComponent,
  },

  data() {
    const userData= useLogin().user;
    let listNotification:any=[]
    let drawer: boolean = false;
    return {
      listNotification,
      drawer,
      leftMenu: {
        state: true,
        menuOptions: MenuOptionJSON,
        // For default the start visible option is Principal Dashboard
        hoverMenuOption: MenuOptionJSON[0].children,
      },
      userData,
    };
  },
  mounted(){
   this.loadNotification()
  },
  methods: {

    loadNotification(){
      let result:any=[]
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
        resp.data.result.map((item:any)=>{
           let object={
             ...item,
             type:'MPA',
             leido:false

           }
           result.push(object)
        })
        useNotification().setListMpaAdquirida(result)
        this.listNotification=result
      })
      this.$q.loading.hide()
    },
    showParent(links: any) {
      let result: any = [];
      links.map((item: any) => {
        if (item.routeName == 'WelcomeDashboardPage') {
          result.push(item.routeName);
        } else {
          // let is_perm = this.HavePermision(item.permission);
          // if (item.clientType != undefined) {
          //   //@ts-ignore
          //   is_perm =
          //     //@ts-ignore
          //     is_perm && item.clientType.includes(this.$VUE_CONFIG_CLIENT_TYPE_KEY);
          // }
          // if (is_perm) result.push(item.permission);
        }
      });
      return true
      // return result.length > 0;
    },
    have(links: any) {
      let expand = false;
      // @ts-ignore
      links.forEach((element) => {
        // @ts-ignore
        element.links.forEach((link) => {
          if (link.routeName == this.$route.name) expand = true;
        });
      });
      return expand;
    },
    logout() {
      //@ts-ignore
      useLogin().signOut();
    },
    checkPermission(link: any) {
      if (link.routeName == 'WelcomeDashboardPage') {
        return true;
      } else {
        if (link.clientType != undefined) {
          //@ts-ignore
          var clientAllow = link.clientType.includes(this.$VUE_CONFIG_CLIENT_TYPE_KEY);
          // return this.HavePermision(link.permission) && clientAllow;
          return true
        } else {
          // return this.HavePermision(link.permission);
          return true
        }
      }
      // return true;
    },
  },
  watch: {
    drawer(value) {
      useDrawer().setDrawer();
    },
  },
});
</script>

<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-transparent hideonprint">
      <content-header-component
        v-model="drawer"
        :user-data="userData"
        :listNotification="listNotification"
        @logout="logout"
        :left-menu-state="leftMenu.state"
        @Check="setLeido"
      >
        <template v-slot:section_logo>
          <div class="row  q-gutter-md">
            <q-btn
              color="dark"
              v-if="$q.screen.lt.lg"
              flat
              @click="drawer = !drawer"
              round
              dense
              icon="menu"
            />
            <logo-brand-component  v-if="$q.screen.gt.sm" size="10vh"></logo-brand-component>
          </div>

        </template>
      </content-header-component>
    </q-header>
    <q-footer class="q-px-md bg-transparent hideonprint"> </q-footer>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="300"
      :breakpoint="700"
      class="hideonprint"
    >
      <q-scroll-area class="fit">
        <q-list bordered class="rounded-borders q-mb-md">
          <div
            v-show="userData != null"
            v-for="(option, indexOption) in leftMenu.menuOptions"
            class="q-py-none"
            :key="indexOption"
          >
            <q-expansion-item
              group="expansionGroup"
              expand-separator
              :caption="option.children.description"
              v-show="showParent(option.children.links)"
              v-if="userData.role!='Administrador' &&option.children.title!='Usuarios' || userData.role=='Administrador'"
              class="q-mt-sm text-ap-secondary-dark"
              exact
              active-class="text-ap-primary"
            >
              <template v-slot:header>
                <q-item-section avatar>
                  <div class="row full-width justify-center">
                    <q-icon :name="option.icon" size="27px"></q-icon>
                  </div>
                </q-item-section>
                <q-item-section>
                  <q-item-label> {{ option.children.title }}</q-item-label>
                </q-item-section>
              </template>
              <template
                v-for="(link, indexLink) in option.children.links"
                :key="indexLink"
              >
                <q-item
                  clickable
                  v-ripple
                  class="q-px-lg"
                  active-class="text-dark bg-blue-grey-1"
                  :to="{ name: link.routeName }"
                  v-show="checkPermission(link)"
                >
                  <q-item-section class="q-ml-lg">
                    <q-item-label class="row items-center">
                      <div class="col-2">
                        <q-icon   :name="link.icon" size="20px"></q-icon>
                      </div>
                      <div class="col">
                        <span class="q-ml-md text-body2 q-pt-xs">
                          {{ link.label }}
                        </span>
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-expansion-item>
            <q-separator />
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <div>
        <router-view v-slot="{ Component }">
          <transition name="slide-fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style type="text/css" scoped>
.r-item-menu-active {
  color: white;
  border-left: 2px solid white;
}
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>
