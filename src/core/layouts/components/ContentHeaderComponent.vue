<script lang="ts">
import { defineComponent } from 'vue';
import IconComponent from 'src/core/components/brand/IconComponent.vue';
// import Gravatar from 'src/core/Login/gravatar/GravatarLogo.vue';
// import ChangePasswordDialog from 'src/core/modules/external-security/change-password/ui/Login/ChangePasswordDialog.vue';
export default defineComponent({
  name: 'ContentHeader',
  // components: { IconComponent },
  props: {
    listNotification:{
      type:Array,
      required: true,
    },
    leftMenuState: {
      type: Boolean,
      required: true,
    },
    userData: {
      required: true,
    },
    modelValue: {
      type: Boolean,
    },
  },
  computed: {
    menuState: {
      get: function (): boolean {
        // @ts-ignore
        return this.leftMenu;
      },
      set: function (val: any): void {
        // @ts-ignore
        this.$emit('update:leftMenuState', val);
      },
    },
  },
  data() {
    return {
      search: '',
      drawerLeft: this.modelValue,
      leftMenu: this.leftMenuState,
    };
  },
  methods: {
    changePassword() {
      this.$q.dialog({
        //@ts-ignore
        component: ChangePasswordDialog,
      });
    },
    toggle() {
      // @ts-ignore
      this.leftMenu = !this.leftMenu;
      // @ts-ignore
      this.$emit('update:leftMenuState', this.leftMenu);
    },
    Emitir() {
      this.$emit('update:modelValue', false);
    },
    formatDate(date:any) {
      var moment = require('moment');
      var dateString = date;
      var date = moment.utc(dateString).local();
      return date.format('DD/MM/YYYY');
    },
  },
});
</script>
<template>
  <q-toolbar class="q-pb-md q-pt-md text-white bg-ap-primary">
    <!-- <q-btn round flat @click="toggle" class="onlymovile" >
      <icon-component template name="las la-bars" size="28px"></icon-component>
    </q-btn> -->
    <q-item class="q-px-lg">
      <q-item-section>
        <slot name="section_logo"></slot>
      </q-item-section>
    </q-item>
    <!--<q-input v-model="search" dense rounded outlined class="q-ml-lg" input-class="q-px-sm"
             v-if="$q.screen.gt.sm"
             placeholder="Type to search">
      <template v-slot:append>
        <icon-component template name="las la-search" size="22px" class="q-pr-xs"></icon-component>
      </template>
    </q-input>-->
    <q-space></q-space>

    <div class="row items-center q-gutter-sm q-pr-md">
<!--      <q-btn v-if="$q.screen.gt.sm" color="dark" round flat @click="$q.fullscreen.toggle()">-->
<!--        <q-icon name="las la-expand-arrows-alt" size="26px" class="q-pt-xs"></q-icon>-->
<!--      </q-btn>-->
      <q-btn-dropdown
        class="q-pt-sm"
        flat
        color="dark"
        icon="notifications"
      >
        <template v-slot:label>
          <q-badge  floating color="red" rounded style="margin-right: 40px" >{{listNotification.length}}</q-badge>
        </template>
        <q-list v-for="item in listNotification " :key="item">
          <q-item >
            <q-item-section avatar>
              <q-avatar icon="las la-th-list" color="ap-primary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">{{item.nomencladorMateriaPrimaAdquirida.name}} ({{item.codigo}})</q-item-label>
              <q-item-label class="text-bold" caption>{{formatDate(item.dateVencimiento)}}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-item-label class="text-bold" >MPA</q-item-label>
            </q-item-section>

          </q-item>
          <q-separator   />
        </q-list>

      </q-btn-dropdown>
      <q-btn-dropdown
        class="q-pt-sm"
        size="17px"
        icon="las la-user-circle"
        flat
        color="dark"
        :label="userData.userName "
      >
          <q-list style="width: 100%">
            <q-item class="q-pa-lg bg-grey-3 text-dark ">
              <q-item-section avatar>
                 <q-icon name="las la-user-circle" size="lg" color="dark"></q-icon>
<!--                <Gravatar :email="userData.email" />-->
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-bold" lines="1">
                  {{ userData.name }}  {{ userData.lastName }}
                </q-item-label>
                <q-item-label
                  class="text-grey-8 text-caption text-bold"
                  lines=""
                  style="
                  word-wrap: break-word;
                  white-space: normal;
                  text-align: justify-all;
                "
                >
                  {{ userData.role }}
                </q-item-label>
              </q-item-section>
            </q-item>
<!--            <q-item clickable v-close-popup class="q-my-sm" @click="changePassword()">-->
<!--              <q-item-section avatar>-->
<!--                <q-icon template name="las la-key"></q-icon>-->
<!--              </q-item-section>-->
<!--              <q-item-section>Change Password</q-item-section>-->
<!--            </q-item>-->
<!--            <q-item-->
<!--              clickable-->
<!--              v-close-popup-->
<!--              class="q-my-sm"-->
<!--              :to="{ name: 'SettingAccountPage' }"-->
<!--            >-->
<!--              <q-item-section avatar>-->
<!--                <icon-component template name="las la-cog"></icon-component>-->
<!--              </q-item-section>-->
<!--              <q-item-section>Setting</q-item-section>-->
<!--            </q-item>-->

            <q-item clickable v-close-popup class="q-my-sm" @click="$emit('logout')">
              <q-item-section avatar>
                <q-icon template name="las la-sign-out-alt"></q-icon>
              </q-item-section>
              <q-item-section>Sign out</q-item-section>
            </q-item>
          </q-list>
      </q-btn-dropdown>

    </div>
  </q-toolbar>

</template>

<style>
@media (min-width: 0) and (max-width: 700) {
  .onlymovile {
    display: block !important;
  }
}
@media (min-width: 701) {
  .onlymovile {
    display: none !important;
  }
}
.onlymovile {
  /* display: none !important; */
}
</style>
