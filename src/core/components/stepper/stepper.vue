<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="myStep"
      ref="stepper"
      color="primary"
      animated
    >
    <q-step
      v-for="(step, index) in steps"
      :key="index"
      :name="step.name"
      :prefix="step.prefix"
      :title="step.title"
      :icon="step.icon"
      :done="myStep > index + 1"
      :class="with_background_color?'bg-grey-2':''"

    >
      <div>
        <slot class="q-pb-lg q-mb-lg bg-grey-2" name="step"></slot>
      </div>
    </q-step>

    <template v-slot:navigation>
      <slot   name="navigation"></slot>
    </template>
  </q-stepper>
  </div>
</template>

<script>
import mixinBaseComponent from "src/core/core/_mixinBaseComponent/mixinBaseComponent";
export default {
  name: "add-stepper",
  mixins: [mixinBaseComponent],
  props: {
    steps: {
      type: Array,
      default: () => [], //name,prefix,tittle, icon
    },
    modelValue: {
      type: Number,
      default: 1,
    },
    with_background_color: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      myStep: this.modelValue,
    };
  },
  watch: {
    myStep(newValue) {
      this.$emit("update:modelValue", newValue);
    },
    modelValue(newValue) {

      if (newValue != this.myStep) {
        this.myStep = newValue;
      }
    },
  },

};
</script>
<style lang="sass" scoped></style>
