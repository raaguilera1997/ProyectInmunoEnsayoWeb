<template>
  <q-btn
    :label="label"
    :color="color"
    :disable="disable"
    :outline="outline"
    :icon="icon"
    :round="round"
    :rounded="rounded"
    :loading="loading"
  >
    <tooltip v-if="tooltip" :text="tooltip" />
  </q-btn>
</template>

<script>
import mixinBtn from './mixin/mixinBtn'

export default {
  name: 'ButtonComponent',
  mixins: [mixinBtn]
}
</script>
