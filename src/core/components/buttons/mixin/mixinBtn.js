import tooltip from 'src/core/core/tooltip/TooltipComponent.vue'

export default {
  components: { tooltip },
  props: {
    label: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'black'
    },
    tooltip: {
      type: String,
      default: null
    },
    disable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    outline: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  }
}
