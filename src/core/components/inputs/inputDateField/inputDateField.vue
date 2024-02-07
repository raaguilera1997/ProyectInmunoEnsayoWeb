<template>
  <input-field :disable="disabled" readonly v-model="myValue" :mask="include_hours?'':'##-##-####'" :label="label" :name='name'    reactive-rules>
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <!--          <dateElement v-model="myValue" />-->
          <q-date v-if="initial_date" v-model="myValue" color="black"  :mask="include_hours?'MM-DD-YYYY HH:mm:ss':'MM-DD-YYYY'" :options="optionsDate">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Cerrar"/>
            </div>
          </q-date>
          <q-date v-if="!initial_date" v-model="myValue" color="black"  :mask="include_hours?'MM-DD-YYYY HH:mm:ss':'MM-DD-YYYY'" >
            <div class="row items-center justify-end">
              <q-btn  v-close-popup label="Cerrar"/>
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
    <template v-if="include_hours" v-slot:append >
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-if="initial_date" v-model="myValue" color="black" :mask="include_hours?'MM-DD-YYYY HH:mm:ss':'MM-DD-YYYY'" :hour-options="optionsHours" :minute-options="optionsMin" :second-options="optionsSecond" with-seconds  format24h>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="black" flat />
            </div>
          </q-time>
          <q-time v-if="!initial_date"   v-model="myValue" color="black" :mask="include_hours?'MM-DD-YYYY HH:mm:ss':'MM-DD-YYYY'"  with-seconds format24h>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="black" flat />
            </div>
          </q-time>

        </q-popup-proxy>
      </q-icon>
    </template>
  </input-field>
</template>
<script>
import inputField from "src/core/core/inputs/inputField/inputField.vue";
import moment from 'moment'
import {defineComponent} from "vue";
export default defineComponent({
  components: {inputField,},
  name: "inputDateField",
  //mixins: [mixinInput],

  props: {
    name: {
      type: String,
    },
    initial_date: {
      type: String,
    },
    year_restrict: {
      type: String,
    },
    act_date: {
      type: String,
    },

    disabled: {
      type: String,

    },

    modelValue: {
      type: String,
    },
    label: {
      type: String,
    },
    isRestrictYear:{
     type: Boolean,
      default:false
    },
    include_equals_in_comparation:{
     type: Boolean,
      default:false
    },
    include_hours:{
     type: Boolean,
      default:false
    },
  },

  data() {
    return {
      myValue: null,
      nameRef: 'refInputDateField'
    };
  },

  mounted() {
    if (this.modelValue) {
      this.myValue = this.modelValue

    }
  },
  emits: ['update:modelValue'],
  computed:{
    optionsHours() {
      let initial_date= this.parseDate(this.initial_date,this.include_hours)
      initial_date = `${initial_date[2]}/${initial_date[0]}/${initial_date[1]}`
      let date_act= this.myValue?this.parseDate(this.myValue,this.include_hours):null
      date_act = date_act?`${date_act[2]}/${date_act[0]}/${date_act[1]}`:null
      const hourMilit = [];
      if(date_act && date_act==initial_date){
        let hour= this.parseHours(this.initial_date)
        let initial_hours = parseInt(hour[0])
        for (let element = 0; element < 24; element++) {
          if(element>=initial_hours){
            hourMilit.push(element);
          }
        }
      }
      else{
        for (let element = 0; element < 24; element++) {
            hourMilit.push(element);
        }
      }
      return hourMilit
    },
    optionsMin() {
      const min = [];
      let initial_date= this.parseDate(this.initial_date,this.include_hours)
      initial_date = `${initial_date[2]}/${initial_date[0]}/${initial_date[1]}`
      let date_act= this.myValue?this.parseDate(this.myValue,this.include_hours):null
      date_act =date_act?`${date_act[2]}/${date_act[0]}/${date_act[1]}`:null
      if(date_act&&date_act==initial_date) {
        let obt_init_hour = this.parseHours(this.initial_date)
        let initial_hour = parseInt(obt_init_hour[0])
        let initial_min = parseInt(obt_init_hour[1])
        let obt_act_hour=this.parseHours(this.myValue)
        let act_hour=parseInt(obt_act_hour[0])
        for (let element = 0; element < 60; element++) {
          if (element >= initial_min && act_hour==initial_hour ) {
            min.push(element);
          }
          if(act_hour!=initial_hour){
            min.push(element);
          }
        }
      }
      else{
        for (let element = 0; element < 60; element++) {
            min.push(element);
        }
      }
      return min
    },
    optionsSecond() {
      const sec = [];
      let initial_date= this.parseDate(this.initial_date,this.include_hours)
      initial_date = `${initial_date[2]}/${initial_date[0]}/${initial_date[1]}`
      let date_act= this.myValue?this.parseDate(this.myValue,this.include_hours):null
      date_act =date_act?`${date_act[2]}/${date_act[0]}/${date_act[1]}`:null
      if(date_act&&date_act==initial_date) {
        let obt_init_hour = this.parseHours(this.initial_date)
        let initial_hour = parseInt(obt_init_hour[0])
        let initial_min = parseInt(obt_init_hour[1])
        let initial_sec = parseInt(obt_init_hour[2])
        let obt_act_hour=this.parseHours(this.myValue)
        let act_hour=parseInt(obt_act_hour[0])
        let act_min=parseInt(obt_act_hour[1])
        for (let element = 0; element < 60; element++) {
          if ( element >= initial_sec && act_hour==initial_hour && act_min==initial_min ) {
            sec.push(element);
          }
          if(act_hour!=initial_hour||act_min!=initial_min ){
             sec.push(element)
           }
        }
      }
      else{
        for (let element = 0; element < 60; element++) {
          sec.push(element);
        }
      }
      return sec
    },
  },
  methods: {
    optionsDate(date) {
      let initial_date= this.parseDate(this.initial_date,this.include_hours)
      initial_date = `${initial_date[2]}/${initial_date[0]}/${initial_date[1]}`

      if(this.isRestrictYear){
        let dateyear=`${this.year_restrict?.denominacion}/12/31`

        return date >= initial_date && date<=dateyear
      }
      else{
        if(this.include_equals_in_comparation){
          return date >= initial_date
        }
        else{
          return date > initial_date
        }

      }
    },
    parseDate(date,includeHours){
      if(!includeHours){
        return date.split('-')
      }
      else{
        return date.split(' ')[0].split('-')
      }

    },
    parseHours(date){
      return date.split(' ')[1].split(':')
    },
    fireEventInput() {
      if (this.freezer && this.modelValue) {
        this.myValue = this.modelValue
      }
      if (this.dateObject(this.getValue()) != "Invalid Date") {
        this.$emit('update:modelValue', this.dateObject(this.getValue()));
      } else {
        this.$emit('update:modelValue', moment(null))
      }
    },
    getValue() {
      return this.myValue
    },
    dateFormat(timeStamp, format) {
      return moment(timeStamp).format(format)
    },
    dateObject(dateString, format) {
      return dateString
    }
  },
  watch: {
    modelValue(newValue, oldValue) {
      if ((newValue !== oldValue) && !(newValue instanceof Object)) {
        this.myValue = newValue
      } else {
        this.myValue = ''
      }
    },
    myValue(newValue, oldValue) {

      if (newValue !== oldValue) {

        this.fireEventInput()
      }
    }
  },
})
</script>
