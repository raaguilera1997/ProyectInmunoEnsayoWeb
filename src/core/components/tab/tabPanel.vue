<template>
     <q-tabs
       v-model="tabValue"
       active-color="primary"
       indicator-color="primary"
       align="justify"
       narrow-indicator
       class="text-grey shadow-2"

     >
      <template v-slot:default>
        <slot name="tab"></slot>
      </template>
    </q-tabs>

    <q-separator />
    <q-tab-panels v-model="tabValue" animated>
      <template v-slot:default>
        <slot name="tabSection"></slot>
      </template>
    </q-tab-panels>
</template>

<script>
export default {
  name: "tabPanel",
  props:{
    modelValue:{
      type:String
    }
  },
  data(){
    return{
      tabValue:this.modelValue
    }
  },
  watch:{
    tabValue(newval,old){
    this.$emit('update:modelValue',newval)
    },
    modelValue(newval,old){
      this.tabValue=newval
    }

  }
}
</script>

<style scoped>

</style>
