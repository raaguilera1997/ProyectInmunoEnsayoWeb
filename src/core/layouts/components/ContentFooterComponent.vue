<script lang="ts">
import {defineComponent} from "vue";

// Global Login
import LogoBrandComponent from "src/core/components/brand/LogoBrandComponent.vue";

export default defineComponent({
  name: "ContentFooter",
  // Login: { LogoBrandComponent },
  data() {
    return {};
  }
});
</script>
<template>
  <div class="r-footer text-dark">
    <!-- <q-item>
      <q-item-section>
        <q-item-label class="text-bold"> Gull - Laravel + Bootstrap 4 admin template</q-item-label>
        <q-item-label class="q-pt-md">
          <div class="row">
            <div class="col-12 col-md-9">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero quis beatae
              officia saepe perferendis voluptatum minima eveniet voluptates dolorum, temporibus nisi maxime
              nesciunt
              totam repudiandae commodi sequi dolor quibusdam
            </div>
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator inset class="q-my-md"></q-separator>
    <div class="row q-px-md q-pt-sm">
      <q-btn label="Buy Gull Html" class="q-px-sm" color="primary"></q-btn>
      <q-space></q-space>
      <q-item class="q-pa-none">
        <q-item-section avatar>
          <q-avatar>
            <logo-brand-component small></logo-brand-component>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>@ 2018 Gull HTML</q-item-label>
          <q-item-label class="text-grey">All rights reserved</q-item-label>
        </q-item-section>
      </q-item>
    </div> -->
  </div>
</template>

<style type="text/css" scoped>
.r-footer {
  bottom: 0;
  margin-top: 2rem;
  background: #eee;
  padding: 20px 12px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
