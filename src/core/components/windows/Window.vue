<template>
  <q-dialog
    v-model="activeWindow"
    persistent
    :full-width="fullWidth"
    @show="fireEventShow"
    @before-hide="hide"
    @hide="hide"
  >
    <q-card :style="style">
      <q-card-section
        class="row items-center q-pa-xs text-white"
        :class="bg_color"
      >
        <q-avatar :icon="icon" text-color="white" />
        <span class="text-body2 text-uppercase text-bold">{{ title }}</span>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <!--<q-bar>
        <q-icon name="network_wifi" />
        <q-icon name="network_cell" />
        <q-icon name="battery_full" />
        <div>9:34</div>

        <q-space />
      </q-bar>-->

      <q-separator />

      <q-card-section
        class="scroll bg-grey-1"
        style="max-height: 70vh"
        :class="bodyClass"
      >
        <slot name="body" />
      </q-card-section>

      <q-separator />

      <q-card-actions :align="alignActions">
        <slot name="footer" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'WindowComponent',
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
      default: 'info',
    },
    bg_color: {
      type: String,
      default: 'bg-ap-dark',
    },
    active: {
      type: Boolean,
      default: false,
    },
    style: {
      type: Object,
    },

    fullWidth: {
      type: Boolean,
      default: false,
    },
    bodyClass: {
      type: String,
      default: '',
    },
    alignActions: {
      type: String,
      default: 'right',
    },
  },
  watch: {
    active: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.activeWindow = newVal;
      }
    },
  },
  data() {
    return {
      activeWindow: false,
    };
  },
  methods: {
    getSlotRefByName(name) {
      // return this.$scopedSlots.body()[0].context.$refs[name]
    },
    show() {
      this.activeWindow = true;
    },
    hide() {
      this.activeWindow = false;
      this.$emit('close');
    },
    fireEventShow() {
      this.$emit('show');
    },
  },
};
</script>
