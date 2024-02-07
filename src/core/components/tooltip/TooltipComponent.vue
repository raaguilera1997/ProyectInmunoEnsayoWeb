<template>
  <q-tooltip :class="contentClass" content-style="font-size: 13px"><slot>{{ text }}</slot></q-tooltip>
</template>

<script>

export default {
  name: 'TooltipComponent',
  props: {
    text: {
      type: String
    },
    contentClass: {
      type: String,
      default: 'bg-ap-secondary'
    }
  }
}
</script>
