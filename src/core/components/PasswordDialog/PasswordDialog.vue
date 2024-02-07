<template>
  <q-dialog ref="dialog" @hide="hide" persistent>
    <q-card class="q-dialog-plugin" style="width: 400px; max-width: 120vw;">
      <q-toolbar class="text-white bg-dark q-px-md q-py-sm">
        <!-- <icon-component template name="las la-plus-circle"></icon-component> -->
        <span class="text-body2 text-uppercase q-ml-md text-bold"
          >Password</span
        >
        <q-space></q-space>
        <q-btn @click="onCancelClick()" round flat>
          <icon-component template name="las la-times"></icon-component>
        </q-btn>
      </q-toolbar>
      <!-- <form autocomplete="off" @onsubmit.prevent="onOk()"> -->
      <q-card-section>

        <q-input
          @keydown.enter.prevent="onOk"
          lazy-rules
          autofocus
          outlined
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
        >
          <template v-slot:append>
            <q-icon
              :name="
                showPassword
                  ? 'visibility_off'
                  : 'visibility'
              "
              class="cursor-pointer q-mr-xs"
              @click="
                showPassword = !showPassword
              "
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right" class="q-px-lg q-pb-lg q-pt-none q-gutter-y-sm">
        <q-btn color="dark" outline label="Cancel" class="q-px-md" @click="onCancelClick()"/>
        <q-btn color="dark" label="Send" class="q-px-lg" @click="onOk()"/>
      </q-card-actions>
    <!-- </form> -->
    </q-card>
  </q-dialog>
</template>

<script>
// Global core
import IconComponent                from "src/core/core/brand/IconComponent.vue";

export default {
  components: {
      IconComponent
  },
  data() {
    return {
      password: '',
      showPassword: false,
    }
  },
  methods: {
    show() {
        // @ts-ignore
        this.$refs.dialog.show();
    },
    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
        // @ts-ignore
        this.$refs.dialog.hide();
    },
    onOk() {
      this.$emit('ok', this.password);
      this.hide();
    },
    onCancelClick() {
      this.$emit('ok', '');
      this.hide();
    },
  }
}
</script>
