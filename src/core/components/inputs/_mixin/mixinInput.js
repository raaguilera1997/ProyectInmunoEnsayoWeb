export default {
  props: {
    name: {
      type: String,
    },
    label: {
      type: String,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    filled: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
    },
    classField: {
      type: String,
      default: "",
    },
  },
  created() {
    if (this.name) {
      this.nameRef = this.name;
    }
  },
  mounted() {
    if (this.value) {
      this.myValue = this.value;
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {

        this.myValue = newValue;
      }
    },
  },
  data() {
    return {
      myValue: this.value,
      nameRef: "refInputField",
    };
  },
  computed: {
    getLabel() {
      return this.required ? `${this.label} *` : this.label;
    },

  },
  methods: {
    fireEventInput() {
      if (this.freezer && this.value) {
        this.myValue = this.value;
      }
      this.$emit("input", this.getValue());
    },
    fireEventFilter(val, update) {
      this.$emit("filter", val, update);
    },
    fireEventClick() {
      this.$emit("click", this.myValue);
    },
    validate() {
      return this.$refs[this.nameRef].validate(this.myValue);
    },
    cleanField() {
      this.myValue = "";
    },
    getValue() {
      return this.myValue;
    },
    keyPressEnter() {
      if (this.freezer && this.originalValue) {
        this.myValue = this.originalValue;
      }
      this.$emit("keyPressEnter", this.myValue);
    },
    setValue(value) {
      this.myValue = value;
      this.fireEventInput();
      this.fireEventFilter();
    },
  },
};
