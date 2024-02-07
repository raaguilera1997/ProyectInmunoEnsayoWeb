<template>
  <q-dialog v-model="activeWindow" persistent>
    <q-card>
      <q-card-section class="row items-center ">
        <q-avatar :icon="icon" :color="iconColor" text-color="white"/>
        <span class="q-ml-sm">{{ text }}</span>
      </q-card-section>

      <q-card-actions align="right" >
        <Btn  outline label="no" :tooltip="tooltipCancel" class="q-mr-sm" @click="hide"/>
        <Btn  label="yes" :tooltip="tooltipOk" @click="confirm"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import Btn from '../buttons/btn'

export default {
  name: 'WindowConfirm',
  components: {
    Btn
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    text: {
      type: String
    },
    icon: {
      type: String,
      default: 'info'
    },
    iconColor: {
      type: String,
      default: 'ap-secondary'
    },
    tooltipOk: {
      type: String,
      default: 'Confirm'
    },
    tooltipCancel: {
      type: String,
      default: 'Cancel'
    },
  },
  watch: {
    active: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.activeWindow = newVal
      }
    }
  },
  data () {
    return {
      activeWindow: false
    }
  },
  methods: {
    show () {
      this.activeWindow = true
    },
    confirm () {
      this.activeWindow = false
      this.$emit('ok',true)
    },
    hide () {
      this.activeWindow = false
      this.$emit('cancel')
    }
  }
}
</script>
