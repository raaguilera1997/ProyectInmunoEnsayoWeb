<script lang="ts">
  import { defineComponent, ref, computed } from "vue";
  export default  defineComponent({
  name: "LogoBranComponent",
  props: {
    size: {
      type: String,
      default: "100px"
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    brandImagePath () {
      if (this.small) return require("src/assets/images/brand/logo_small_icon_only_inverted.png")
      return require("src/assets/images/brand/second_logo_large.png")
    }
  }
})
</script>

<template>
  <img :src="brandImagePath" :style="`width: ${size}`" alt="Company logo image"/>
</template>
