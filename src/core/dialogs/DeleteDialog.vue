<script lang="ts">
import {defineComponent} from "vue"
export default defineComponent({
  props: {
    countsElementsSelected: {
      type: Number,
      required: true
    },
    text:{
      type:String,
      required: false,
      default:'¿ Estás seguro que desea eliminar el elemento ?'
    },
    cannot_be_undone:{
      type:Boolean,
      default:true
    }

  },

  data () {
    return {}
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      // @ts-ignore
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      // @ts-ignore
      this.$refs.dialog.hide()
    },

    onCancelClick () {
      this.hide()
    },

    onOkClick () {
      this.$emit("ok")
      this.hide()
    }
  }
})
</script>
<template>
  <q-dialog ref="dialog" @hide="hide" persistent>
    <q-card class="q-dialog-plugin" style="width: 450px; max-width: 90vw;">
      <q-toolbar class="text-white bg-red q-px-md q-py-sm">
        <q-icon template name="las la-trash"></q-icon>
        <span class="text-body2 text-uppercase q-ml-md text-bold">Eliminar</span>
        <q-space></q-space>
        <q-btn @click="onCancelClick()" round flat>
          <q-icon template name="las la-times"></q-icon>
        </q-btn>
      </q-toolbar>
      <q-card-section class="q-pb-lg">
        <q-item>
          <q-item-section>
            <q-item-label v-if="cannot_be_undone" class="text-body2 text-uppercase text-bold text-red"> Esta acción no tiene retroceso
            </q-item-label>
            <q-item-label class="text-body2 q-pt-sm"> {{text}}
            </q-item-label>

          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-actions align="right" class="q-px-lg q-pb-lg q-pt-none q-gutter-y-sm">
        <q-btn color="dark" outline label="Cancelar" class="q-px-md" @click="onCancelClick()"/>
        <q-btn color="red" label="Eliminar" class="q-px-lg" @click="onOkClick()"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
