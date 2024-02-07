<template>
  <div v-if="!hide_pagination" class="row justify-center q-mx-auto">
    <q-pagination
      :max="getCantPages"
      direction-links
      boundary-links
      v-model="pagination_value.page"
      @update:model-value="changePage"
      input
    />
    <q-select
      class="q-my-node q-py-none q-px-sm"
      borderless
      dense
      :model-value="getRowsPerPage"
      :options="rows_per_page_options"
      @update:model-value="changeRowsPerPage"
    >
    </q-select>
    <span style="margin-top: 10px;">{{firstVisibleElement}} - {{lastVisibleElement}} of {{getTotal}}</span>
  </div>
</template>

<script>
 import {defineComponent} from "vue";

 export default defineComponent( {
    name: "PaginationComponent",
    props: {
      hide_pagination: {
        type: Boolean,
        required: false,
        default: false
      },
      rows_per_page_options: {
        type: Array,
        default: () => [10, 20, 50, 100, 500],
      },
      pagination: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        pagination_value: this.pagination
      }
    },
    computed: {
      getCantPages() {
        let pages = parseInt(this.pagination_value.rowsNumber / this.pagination_value.rowsPerPage)
        return this.pagination_value.rowsNumber % this.pagination_value.rowsPerPage !== 0 ? ++pages : pages
      },
      getRowsPerPage() {
        return this.pagination_value.rowsPerPage
      },
      getTotal() {
        return this.pagination_value.rowsNumber
      },
      firstVisibleElement() {
        return this.getTotal > 0 ? (this.pagination_value.page > 1 ? (this.pagination_value.rowsPerPage * (this.pagination_value.page - 1) + 1) : 1) : 0
      },
      lastVisibleElement() {
        const last = this.pagination_value.rowsPerPage * this.pagination_value.page
        return last < this.getTotal ? last : this.getTotal
      }
    },
    methods: {
      changeRowsPerPage(value) {
        this.pagination_value.rowsPerPage = value
        this.$emit('request', this.pagination_value);
      },
      changePage(value) {
        this.pagination_value.page = value
        this.$emit('request', this.pagination_value);
      }
    },
    watch: {
      pagination(newVal) {
        this.pagination_value = newVal
      }
    }
  })
</script>

<style scoped>

</style>
