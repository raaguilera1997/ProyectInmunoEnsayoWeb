<template>
  <q-input
    :class="classField"
    outlined
    :dense="dense"
    :ref="nameRef"
    :name="name"
    :type="type"
    :label="getLabel"
    :color="color"
    :suffix="suffix"
    v-model="myValue"
    :value="myValue"
    :mask="mask"
    :disable="disable"
    :required="required"
    :rules="rulesDefault"
    :min="min"
    :max="max"
    :maxValues="max"
    :filled="filled"
    :hint="hint"
    :counter="counter"
    :maxlength="maxlength"
    :readonly="readonly"
    :autogrow="autogrow"
    bg-color="white"
    @click="fireEventClick"
    @keyup.enter="keyPressEnter"
  >

    <slot></slot>
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
    </template>
    <template v-slot:after>
      <slot name="after"></slot>
    </template>
  </q-input>
</template>

<script>
  import {defineComponent, ref} from 'vue'
  import mixinField from "src/core/components/inputs/_mixin/mixinInput";
  export default defineComponent({
    name: "InputField",
    mixins: [mixinField],
    props: {
      type: {
        type: String,
      },
      label: {
        type: String,
        default: "",
      },
      suffix: {
        type: String,
      },
      rules: {
        type: Array,
        default: () => [],
      },
      mask: {
        type: String,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      counter: {
        type: Boolean,
        default: false,
      },
      freezer: {
        type: Boolean,
        default: false,
      },
      min: {
        type: [String, Number],
      },
      max: {
        type: [String, Number],
      },
      maxlength: {
        type: [String, Number],
      },
      autogrow: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: 'ai-primary-dark',
      },
      dense: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      rulesDefault() {
        let temp = []
        if (this.rules.length > 0) {
          temp = this.rules
        }
        return temp
      }
    },
    methods: {
      maxRule(length, message = '') {
        const maxLength = length;
        return (val) => {
          if (val.length > maxLength) {
            return message || `The value not be longer than ${length} characters`;
          } else {

            return true;
          }
        };
      },
    }
  });
</script>
