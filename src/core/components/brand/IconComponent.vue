<script lang="ts">
  import { defineComponent, ref, computed } from "vue";
  export default  defineComponent({
  name: "IconComponent",
  props: {
    name: {
      type: String,
      required: true
    },

    size: {
      type: String,
      default: "22px"
    },

    // Default icons we can found it in the template assets
    template: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<template>
  <div>
    <q-icon v-if="template" :name="name" :size="size"></q-icon>
    <i v-else :class="name" :style="`font-size: ${size}`"></i>
  </div>
</template>
