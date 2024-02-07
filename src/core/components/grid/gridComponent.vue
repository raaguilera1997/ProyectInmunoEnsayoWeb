<template>
  <!--  View desktop -->
  <div v-if="Screen.gt.sm">
    <!--  Menu Actions  -->
    <div class="row justify-between">
      <div class="col-12 row justify-end q-mb-md">
        <slot name="btn_actions_top_right"></slot>
      </div>
      <div class="row">
        <slot name="btn_actions_left"></slot>
      </div>
      <div class="row justify-end">
        <q-input
          v-if="props.is_basic_filter"
          class="q-pr-md"
          clearable
          clear-icon="close"
          rounded
          outlined
          borderless
          dense
          debounce="300"
          v-model="searchText"
          placeholder="Type to search..."
          @update:model-value="updateSearch"
        >
          <template v-slot:append>
            <q-icon
              name="search"
              class="cursor-pointer"
              @click="emit('action_btn_search')"
            />
          </template>
        </q-input>
        <Btn
          v-if="props.is_advance_filter"
          rounded
          flat
          tooltip="Advanced filters"
          icon="las la-filter"
          @click="act_dialog_filter_advance = true"
        ></Btn>
        <slot name="btn_actions_right"></slot>
      </div>
    </div>
    <!--     Filter Advance Info-->
    <div class="q-pt-sm">
      <transition>
        <q-card v-if="act_dialog_filter_advance">
          <q-card-section>
            <div class="row text-dark justify-between">
              <div class="text-subtitle2 text-grey-6 caption">Advance filters</div>
              <Btn
                flat
                rounded
                icon="las la-times"
                tooltip="Close"
                @click="act_dialog_filter_advance = false"
              ></Btn>
            </div>
            <div>
              <slot name="filter_body"></slot>
              <div class="q-my-md" align="right">
                <Btn class="q-mr-sm" outline label="Clear" @click="clean"></Btn>
                <Btn label="Apply" @click="applyFilter"></Btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </transition>
    </div>
    <div class="q-pt-sm">
      <q-table
        :title="props.title"
        :style="
          props.virtual_scroll && props.rows.length > 5
            ? { height: '350px', width: '100%' }
            : props.heigth_table_dashboard && props.rows.length > 0
            ? { height: '500px' }
            : ''
        "
        flat
        bordered
        :grid="!Screen.gt.sm"
        :virtual-scroll="props.virtual_scroll"
        :card-class="Screen.lt.md ? 'my-card' : ''"
        :row-key="props.rowKey"
        :rows="props.rows"
        :columns="showColumns"
        :selection="props.selection"
        :selected="selected"
        @update:selected="fireEventSelect"
        v-model:selected="selected"
        :loading="props.loading"
        v-model:pagination="pagination_value"
        :hide-pagination="props.hide_pagination"
        :rows-per-page-options="props.rows_per_page_options"
        @request="request"
        binary-state-sort

      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-for="column in columns" v-slot:[getNameSlotCell(column)]="props">
          <slot v-if="Screen.gt.sm" :name="getNameSlotCell(column)" v-bind:props="props">
            <q-td>{{ props.row[column.name] }}</q-td>
          </slot>
        </template>
        <template v-slot:bottom>
          <div v-if="!props.hide_pagination" class="row justify-center q-mx-auto">
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
              :options="props.rows_per_page_options"
              @update:model-value="changeRowsPerPage"
            >
            </q-select>
            <span style="margin-top: 10px"
              >{{ firstVisibleElement }} - {{ lastVisibleElement }} of
              {{ getTotal }}</span
            >
          </div>
        </template>
      </q-table>
    </div>
  </div>

  <!--  View Tablet-->
  <div v-else>
    <!--  Menu Actions  -->
    <div class="col-12 row justify-end">
      <slot name="btn_actions_top_right"></slot>
    </div>
    <div class="row q-pt-md">
      <slot name="btn_actions_right"></slot>
      <q-input
        v-if="props.is_basic_filter"
        class="q-pr-md q-pt-md"
        clearable
        clear-icon="close"
        rounded
        outlined
        borderless
        dense
        debounce="300"
        v-model="searchText"
        placeholder="Type to search..."
        @update:model-value="updateSearch"
      >
        <template v-slot:append>
          <q-icon
            name="search"
            class="cursor-pointer"
            @click="emit('action_btn_search')"
          />
        </template>
      </q-input>
      <Btn
        v-if="props.is_advance_filter"
        class="q-mt-md"
        rounded
        flat
        tooltip="Advanced filters"
        icon="las la-filter"
        @click="act_dialog_filter_advance = true"
      ></Btn>
    </div>
    <div class="row q-pt-md">
      <slot name="btn_actions_left"></slot>
    </div>
    <!--     Filter Advance Info-->
    <transition>
      <div v-if="act_dialog_filter_advance" class="q-pt-md">
        <q-card >
          <q-card-section>
            <div class="row text-dark justify-between">
              <div class="text-subtitle2 text-grey-6 caption">Advance filters</div>
              <Btn
                flat
                rounded
                icon="las la-times"
                tooltip="Close"
                @click="act_dialog_filter_advance = false"
              ></Btn>
            </div>
            <div>
              <slot name="filter_body"></slot>
              <div class="q-my-md" align="right">
                <Btn class="q-mr-sm" outline label="Clean" @click="clean"></Btn>
                <Btn label="Apply" @click="applyFilter"></Btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </transition>
    <div>
      <q-scroll-area
        v-if="!$q.screen.gt.sm"
        class="q-pr-md q-pt-xs"
        :style="
          props.rows.length == 0
            ? { height: 'calc(100vh - 80vh)' }
            : { height: 'calc(100vh - 215px)' }
        "
      >
        <q-table
          :title="props.title"
          flat
          bordered
          :grid="!Screen.gt.sm"
          :card-class="Screen.lt.md ? 'my-card' : ''"
          :row-key="props.rowKey"
          :rows="props.rows"
          :columns="showColumns"
          :selection="props.selection"
          :selected="selected"
          @update:selected="fireEventSelect"
          v-model:selected="selected"
          v-model:pagination="pagination_value"
          :loading="props.loading"
          :hide-pagination="props.hide_pagination"
          :rows-per-page-options="props.rows_per_page_options"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
          <template v-if="!Screen.gt.sm" v-slot:item="prop_slot">
            <div
              class="q-pa-xs grid-style-transition"
              :class="
                useDrawer().drawer && !Screen.gt.sm
                  ? 'col-12 '
                  : 'col-xs-12 col-sm-6 col-md-4 q-px-sm '
              "
              :style="
                prop_slot.selected
                  ? 'transform: scale(0.97);transition-duration: 0.5s'
                  : 'transition-duration: 0.5s'
              "
            >
              <q-card
                bordered
                flat
                :class="
                  prop_slot.selected
                    ? $q.dark.isActive
                      ? 'bg-grey-9 '
                      : 'bg-grey-2 '
                    : ''
                "
              >
                <q-card-section>
                  <q-checkbox
                    v-if="props.selection != 'none'"
                    dense
                    v-model="prop_slot.selected"
                    :label="prop_slot.row[props.label_name_checkbox_in_mode_card]"
                  />
                </q-card-section>
                <q-separator />
                <q-card-section class="q-pt-none">
                  <q-list dense>
                    <q-item v-for="col in prop_slot.cols" :key="col.id">
                      <q-item-section>
                        <slot :name="`body-card-${col}`" v-bind:props="prop_slot">
                          <q-item-label class="text-left" caption>{{
                            col.label
                          }}</q-item-label>
                        </slot>
                      </q-item-section>
                      <q-item-section side>
                        <slot :name="`body-card-${col.name}`" v-bind:props="prop_slot">
                          {{ col.value }}
                        </slot>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
          </template>
          <template v-if="!props.hide_pagination" v-slot:bottom>
            <div class="row justify-center q-mx-auto">
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
                :options="props.rows_per_page_options"
                @update:model-value="changeRowsPerPage"
              >
              </q-select>
              <span style="margin-top: 10px"
                >{{ firstVisibleElement }} - {{ lastVisibleElement }} of
                {{ getTotal }}</span
              >
            </div>
          </template>
        </q-table>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Windows from 'src/core/core/windows/Window.vue';
import Btn from 'src/core/core/buttons/btn.vue';
import { useDrawer } from 'src/core/composable/useDrawer';
import { Screen } from 'quasar';

const emit = defineEmits([
  'selected',
  'search_text',
  'action_btn_search',
  'clean_filter',
  'apply_filter',
  'refresh',
  'request',
  'restart_selected',
]);
const props = defineProps({
  columns: {
    type: Array,
  },
  visibleColumns: {
    type: Array,
  },
  heigth_table_dashboard: {
    type: Boolean,
    default: false,
    required: false,
  },
  rowKey: {
    type: String,
    default: 'id',
    required: true,
  },
  rows: {
    type: Array,
    required: true,
    default: () => [],
  },
  load_selected: {
    type: Array,
    required: false,
  },
  separators: {
    type: String,
    default: 'horizontal',
  },
  title: {
    type: String,
    default: '',
    required: false,
  },
  rows_per_page_options: {
    type: Array,
    default: () => [10, 20, 50, 100, 500],
  },
  selection: {
    type: String,
    default: 'multiple',
    required: false,
  },
  label_name_checkbox_in_mode_card: {
    type: String,
    default: '',
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
    required: true,
  },
  hide_pagination: {
    type: Boolean,
    default: false,
    required: false,
  },
  virtual_scroll: {
    type: Boolean,
    default: false,
    required: false,
  },
  is_load_selected: {
    type: Boolean,
    default: false,
    required: false,
  },
  restart_selected: {
    type: Boolean,
    default: false,
    required: false,
  },
  is_basic_filter: {
    type: Boolean,
    default: false,
  },
  is_advance_filter: {
    type: Boolean,
    default: false,
  },
  pagination: {
    type: Object,
    required: false,
  },
  advanceFilterState: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const pagination_value = ref({});
let selected = ref([]);
let act_dialog_filter_advance = ref(false);
let searchText = ref('');
let showColumns = computed(() => {
  let temp = [];
  if (props.visibleColumns.length > 0) {
    props.columns.map((item) => {
      let ind = props.visibleColumns.findIndex((p) => p == item.name);

        if (ind != -1) {
          temp.push(item);
        }
      });
    } else {
      temp = props.columns;
    }
    return temp;
  });
  const getCantPages=computed(()=>{
   let pages = parseInt(pagination_value.value.rowsNumber / pagination_value.value.rowsPerPage)
   return pagination_value.value.rowsNumber % pagination_value.value.rowsPerPage !== 0 ? ++pages : pages
  })
  const getRowsPerPage=computed(()=>{
    return pagination_value.value.rowsPerPage
  })
  const getTotal=computed(()=>{
    return pagination_value.value.rowsNumber
  })
  const firstVisibleElement=computed(()=>{
    return getTotal.value > 0 ? (pagination_value.value.page > 1 ? (pagination_value.value.rowsPerPage * (pagination_value.value.page - 1)+1) : 1) : 0
  })
  const lastVisibleElement=computed(()=>{
    const last = pagination_value.value.rowsPerPage * pagination_value.value.page
    return last < getTotal.value ? last : getTotal.value
  })
  function request(value){
   emit('request',value.pagination)
  }
  function changeRowsPerPage(value){
    pagination_value.value.rowsPerPage=value
    emit('request', pagination_value.value);
  }
  function changePage(value) {
    pagination_value.value.page = value
    emit('request', pagination_value.value);
  }
  function clean() {
    emit('clean_filter');
  }
  function applyFilter() {
    emit('apply_filter');
  }
  function updateSearch(value) {
    emit('search_text', value);
  }
  function getNameSlotCell(column) {
    return column && column.name ? `body-cell-${column.name}` : '';
  }
  function fireEventSelect(value) {
    emit('selected', value);
  }
  watch(
    () => props.restart_selected,
    () => {
      selected.value = [];
      emit('restart_selected');
    }
  );

watch(
  () => props.pagination,
  (value) => {
    pagination_value.value = value;
  }
);
watch(
  () => props.is_load_selected,
  () => {
    selected.value = props.load_selected;
  }
);
watch(
  () => props.advanceFilterState,
  (value) => {
    act_dialog_filter_advance.value = value;
  }
);
</script>

<style scoped>
.v-enter-active {
  transition: opacity 0.8s ease;
}

.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
