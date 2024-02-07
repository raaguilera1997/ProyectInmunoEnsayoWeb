<template>
  <q-card class="my-card "  :class="bg_color" flat >
    <div v-if="!is_not_title_grouper" class=" row q-pl-md">
      <div class="q-pt-sm q-px-sm">
        <q-avatar v-if="text_avatar.length>0"  color="dark" size="sm" text-color="white">{{text_avatar}}</q-avatar>
      </div>

    <div class="text-h4 " >{{title}}</div>
    </div>
    <q-separator v-if="!is_not_title_grouper"/>
      <q-card-section >
       <slot name="body"></slot>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: "grouperComponent",
  props: {
    title: {
      type: String,
    },
    classBody: {
      type: String,
      default: ''
    },
    colorBody: {
      type: String,
      default: ''
    },
    text_avatar: {
      type: String,
      default: ''
    },
    bg_color: {
      type: String,
      default: 'bg-grey-2'
    },
    is_not_title_grouper:{
      type:Boolean,
      default:false
    }
  },
  watch: {
  },
  data() {
    return {
    };
  },
  computed: {
    getClassBody () {
      return `${this.classBody} ${this.getBgColorBody}`
    },
    getBgColorBody () {
      return `bg-${this.colorBody}`
    }
  }
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
.text-h4
  font-size: 18px
  font-weight: 400
  line-height: 2.5rem
  letter-spacing: 0.00735em
</style>
