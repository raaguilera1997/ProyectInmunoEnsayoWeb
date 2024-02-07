<template>
  <q-select
    :class="classField"
    outlined
    :ref="nameRef"
    :label="label"
    :name="name"
    :multiple="multiple"
    :option-value="optionValue"
    :options="options"
    :use-input="useInput"
    :use-chips="useChips"
    :hide-selected="hideSelected"
    :option-label="optionLabel"
    v-model="myValue"
    :rules="rulesDefault"
    color="ai-primary-dark"
    bg-color="white"
    :required="required"
    :dense="dense"
    :disable="disable"
  >
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-slot:after>
      <slot name="after"></slot>
    </template>
    <template v-slot:append v-if="clear&&myValue">
      <q-icon name="close" @click.stop.prevent="setMyValue" class="cursor-pointer" />
    </template>
        <template v-if="multiple&&options.length>1" v-slot:option="{ itemProps, opt, selected, toggleOption }">
          <q-item v-bind="itemProps">
            <q-item-section>
              <q-item-label v-html="opt.name" />
            </q-item-section>
            <q-item-section side>
              <Toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
            </q-item-section>
          </q-item>
        </template>
  </q-select>
</template>

<script>
import mixinInput from 'src/core/core/inputs/_mixin/mixinInput';
import Toggle from "../inputToggleField/inputToggleField"
export default {
  name: 'selectField',
  mixins: [mixinInput],
  components:{
    Toggle
  },
  props: {
    modelValue: {
      type: [String, Object, Array, Number],
    },
    rules: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    useInput: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    useChips: {
      type: Boolean,
      default: false,
    },
    hideSelected: {
      type: Boolean,
    },
    inputDebounce: {
      type: String,
    },
    optionValue: {
      type: String,
    },
    optionLabel: {
      type: String,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    useSlotOption: {
      type: Boolean,
      default: false,
    },
    autoSelect: {
      type: Boolean,
      default: true,
    },
    classField: {
      type: String,
      default: 'q-pb-md',
    },
  },
  data() {
    return {
      myValue: this.modelValue,
      nameRef: 'refInputField',
      clear:this.clearable
    };
  },
  mounted() {
    if (this.modelValue) {
      this.myValue = this.modelValue;
    }
  },
  watch: {
    options(newVal,old) {
      if (this.autoSelect && newVal.length == 1) {
        if(this.multiple){
          let temp=[]
          temp.push(newVal[0][this.optionValue])
          this.myValue = temp
        }
        else{
          this.myValue=newVal[0][this.optionValue]
          this.clear=true
        }
      }
    },
    myValue: {
      // This will let Vue know to look inside the object
      deep: true,

      // We have to move our method to a handler field
      handler(newValue) {

        this.fireEventInput(newValue);
      },
    },
    modelValue: {
      // This will let Vue know to look inside the object
      deep: true,

      // We have to move our method to a handler field
      handler(newValue) {
        this.myValue = newValue;
      },
    },
  },
  methods: {
    setMyValue(){
      if(this.multiple){
        this.myValue=[]
      }
      else{
        this.myValue=-1
      }
      this.fireEventInput(this.myValue)
    },
    fireEventFilter(val, update) {
      this.$emit('filter', { value: val, update: update });
    },
    max(length, message = '') {
      const maxLength = length;
      return (val) => {
        if (val && val.length > maxLength) {
          return message || `The value not be longer than ${length} characters`;
        } else {
          return true;
        }
      };
    },
    fireEventInput(data) {
      this.$emit('update:modelValue', data);
    },
  },
  computed: {
    rulesDefault() {
      let temp = [];
      if (this.rules.length > 0) {
        temp = this.rules;
      } else {
        temp.push(this.max(500, ''));
      }
      return temp;
    },
  },
};
</script>
