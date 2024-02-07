<template>
  <q-tab :name="name" :icon="icon" :label="label" ></q-tab>
</template>

<script>
export default {
  name: "tabComponent",
  props:{
    name: {
      type: String,
    },
    icon: {
      type: String,
    },
    label: {
      type: String,
    },
  }
}
</script>

<style scoped>

</style>
