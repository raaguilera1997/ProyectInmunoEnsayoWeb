<template>
  <q-dialog
    v-model="activeWindow"
    persistent
  >
    <q-card >
      <q-card-section
        class="row items-center q-pa-xs text-white"
        :class="bg_color"
      >
        <q-avatar :icon="icon" text-color="white" />
        <span class="text-body2 text-uppercase text-bold">Delete elements</span>
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

      <q-card-section class="q-pb-lg">
        <q-item>
          <q-item-section>
            <q-item-label class="text-body2 text-uppercase text-bold text-red"> This action cannot be undone
            </q-item-label>
            <q-item-label class="text-body2 q-pt-sm">{{text?text:'Are you sure you want to permanently delete this files?'}} </q-item-label>
            <q-item-label class="text-bold text-body2"> Elements selected {{countsElementsSelected}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <Btn outline label="no" :tooltip="tooltipCancel" class="q-mr-sm" @click="hide"/>
        <Btn color="red" label="yes" :tooltip="tooltipOk" @click="confirm"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
<!--  <q-dialog v-model="activeWindow" persistent>-->
<!--    <q-card>-->
<!--      <q-card-section class="row items-center" >-->
<!--        <q-avatar :icon="icon" :color="iconColor" text-color="white"/>-->
<!--        <span class="q-ml-sm">Are you sure you want to permanently delete this files?</span>-->
<!--      </q-card-section>-->

<!--      <q-card-actions align="right">-->
<!--        <Btn  outline label="no" :tooltip="tooltipCancel" class="q-mr-sm" @click="hide"/>-->
<!--        <Btn label="yes" :tooltip="tooltipOk" @click="confirm"/>-->
<!--      </q-card-actions>-->
<!--    </q-card>-->
<!--  </q-dialog>-->
</template>

<script>
  import Btn from '../buttons/btn'
  export default {
    name: 'WindowConfirm',
    components: {
      Btn
    },
    props: {
      countsElementsSelected: {
        type: Number,
        required: true
      },
      active: {
        type: Boolean,
        default: false
      },
      text: {
        type: String
      },
      icon: {
        type: String,
        default: 'las la-trash'
      },
      iconColor: {
        type: String,
        default: 'red'
      },
      tooltipOk: {
        type: String,
        default: 'Confirm'
      },
      tooltipCancel: {
        type: String,
        default: 'Cancel'
      },
      bg_color: {
        type: String,
        default: 'bg-red',
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
        this.$emit('ok')
      },
      hide () {
        this.activeWindow = false
        this.$emit('cancel')
      }
    }
  }
</script>
