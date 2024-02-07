<template>
  <q-toggle
    :class="classField"
    :ref="nameRef"
    :name="name"
    :label="label"
    v-model="myValue"
    :required="required"
    :disable="disable"
    checked-icon="check"
    unchecked-icon="clear"
    :color="activeColor"
    keep-color
    dense
    @update:model-value="fireEventInput"
  ><slot /></q-toggle>
</template>

<script>
import mixinField from 'src/core/core/inputs/_mixin/mixinInput'

export default {
  name: 'inputToggleField',
  mixins: [mixinField],
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean
    },
    activeColor: {
      type: String,
      default: 'ap-secondary'
    },
    classField: {
      type: String,
      default: ''
    }
  },
  mounted () {
    if (this.value != null) {
      this.myValue = this.value
    }
  }
}
</script>
