<template>
  <div v-if="model" class="text-center">
    <v-dialog :key="model._id" v-model="dialog" max-width="400" persistent>
      <v-card class="mx-auto" outlined>
        <v-flex class="ma-7">
          <v-row>
            <v-col class="flex">
        
              <v-row no-gutters class="align-center mb-2">
                <v-col>
                  <DialogueTitle :title="title" :subtitle="subtitle" />
                </v-col>
                <v-btn class="mb-5" @click="close()" icon small>
                  <v-icon small>mdi-close</v-icon>
                </v-btn>
              </v-row>
              <v-flex v-for="(item, i) in itemsdata" :key="i">
                <CustomTextInput
                class="pt-2"
                  v-if="(item.type == 'text' || item.type == 'number') && item.index == step"
                  :model="model[item.value]"
                  :value="item.value"
                  :type="item.type"
                  :error-messages="errorMessage"
                  v-on:change="changeValue"
                  :append-icon="item.icon"
                  :label="item.label"
                  :length="item.counter"
                ></CustomTextInput>
                <CustomPasswordInput
                  v-if="item.type == 'password' &&  item.index == step"
                  :model="model[item.value]"
                  :value="item.value"
                  :label="item.label"
                  :error-messages="errorMessage"
                  v-on:change="changeValue"
                />
                <CustomDropdown
                  v-if="item.type == 'dropdown' &&  item.index == step"
                  :model="model[item.value]"
                  :value="item.value"
                  :items="item.items"
                  :label="item.label"
                  :multiple="item.multiple"
                  :error-messages="errorMessage"
                  v-on:change="changeValue"
                />
                <CustomAutoComplete
                  :key="i"
                  v-if="item.type == 'autocomplete' && item.index == step"
                  :label="item.label"
                  :value="item.value"
                  :extraValues="item.extraValues"
                  :public="item.public"
                  :collection="item.collection"
                  v-bind:select="model[item.value]"
                  v-on:change="changeValue"
                  :error="errorMessage"
                  :findBy="item.findBy || ['name']"
                  store="posadmin"
                />
                <CustomLocationSelector
                  v-if="item.type == 'location' && item.index == step"
                  v-on:change="changeValue"
                  :label="item.label"
                  :model="model[item.value]"
                  :value="item.value"
                  :error="errorMessage"
                />
                <CustomPhotoUpload
                  v-if="item.type == 'file' && item.index == step"
                  v-on:change="changeValue"
                  :label="item.label"
                  :value="item.value"
                  :model="model[item.value]"
                  :error="errorMessage"
                />
                <CustomColorPicker
                  v-if="item.type == 'color' && item.index == step"
                  :value="item.value"
                  :model="model[item.value]"
                  v-on:change="changeValue"
                />

                <CustomCheckbox
                  v-if="item.type == 'checkbox' && item.index == step"
                  v-on:change="changeValue"
                  :label="item.label"
                  :value="item.value"
                  :model="model[item.value]"
                  :error="errorMessage"
                />
                <CriteriaEntry
                  :key="i"
                  v-if="item.type == 'criteria' && item.index == step"
                  :value="item.value"
                  :model="model[item.value]"
                  v-on:change="changeValue"
                />
                 <CriteriaOption
                  :key="i"
                  v-if="item.type == 'criteriaoption' && item.index == step"
                  :select="model[item.value]"
                  :value="item.value"
                  :model="model[item.data]"
                  v-on:change="changeValue"
                />
                 <CustomCriteriaOption
                  :key="i"
                  v-if="item.type == 'customcriteriaoption' && item.index == step"
                  :value="item.value"
                  :model="model[item.value]"
                  v-on:change="changeValue"
                />
                 <CustomTimePicker
                  v-if="item.type == 'timerange' && item.index == step"
                  v-on:change="changeValue"
                  :label="item.label"
                  :value="item.value"
                  :model="model[item.value]"
                  :error="errorMessage"
                />
                 <CustomOptionPicker
                  v-if="item.type == 'optionpicker' && item.index == step"
                  v-on:change="changeValue"
                  :label="item.label"
                  :items="item.items"
                  :value="item.value"
                  :model="model[item.value]"
                  :error="errorMessage"
                />
                <CustomRatingPicker
                 v-if="item.type == 'ratepicker' && item.index == step"
                  v-on:change="changeValue"
                  :label="item.label"
                  :value="item.value"
                  :model="model[item.value]"
                  :error="errorMessage"
                />
              </v-flex>

              <v-row no-gutters>
                <v-col class="d-flex justify-center pt-3">
                  <v-btn class="pa-2" v-if="hasPrevious && !isFinish" text @click="previous">Previous</v-btn>
                  <v-btn class="pa-2"  v-if="!isFinish" color="primary" text @click="next">Continue</v-btn>
                  <v-btn  v-if="isFinish" color="primary" text @click="finish">Save & Finish</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-flex>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import DialogueTitle from "../Common/DialogueTitle";
import CustomTextInput from "../Common/CustomTextInput";
import CustomCheckbox from "../Common/CustomCheckbox";
import CustomPasswordInput from "../Common/CustomPasswordInput";
import CustomDropdown from "..//Common/CustomDropDown";
import CustomAutoComplete from "../Common/CustomAutoComplete";
import CustomPhotoUpload from "../Common/CustomPhotoUpload";
import CustomLocationSelector from "../Common/CustomLocationSelector";
import CustomColorPicker from "../Common/CustomColorPicker";
import CriteriaEntry from "../Common/CriteriaEntry";
import CriteriaOption  from "../Common/CriteriaOption";
import CustomTimePicker from "../Common/CustomTimePicker";
import CustomOptionPicker from "../Common/CustomOptionPicker";
import CustomCriteriaOption  from "../Common/CustomCriteriaOption";
import CustomRatingPicker from "../Common/CustomRatingPicker";
export default {
  components: {
    CustomTextInput,
    CustomCheckbox,
    CustomPasswordInput,
    CustomAutoComplete,
    DialogueTitle,
    CustomPhotoUpload,
    CustomLocationSelector,
    CustomColorPicker,
    CustomDropdown,
    CriteriaEntry,
    CriteriaOption,
    CustomCriteriaOption,
    CustomTimePicker,
    CustomOptionPicker,
    CustomRatingPicker
  },
  props: ["items", "title", "subtitle"],
  created() {
    this.itemsdata = [...this.items];
    this.endstep = this.items.length;
  },
  watch: {},
  computed: {
    hasPrevious() {
      return this.step > 1;
    },
    isError() {
      return this.error ? true : false;
    },
    errorMessage() {
      return this.error ? this.error : null;
    },
    isFinish() {
      return this.step == this.endstep;
    },
    currentItem() {
      for (let item of this.itemsdata) {
        if (item.index == this.step) {
          return item;
        }
      }
      return null;
    }
  },
  data() {
    return {
      step: 1,
      endstep: 1,
      model: {},
      itemsdata: null,
      dialog: false,
      error: null
    };
  },
  methods: {
    async checkError() {
      this.error = null;

      for (let item of this.itemsdata) {
        if (item.index == this.step) {
          item.error = null;
          let _value = this.model[item.value];
          if (item.required) {
            if (!_value || _value == "") {
              this.error = item.requiredMessage
                ? item.requiredMessage
                : "Required data";

              item.error = this.error;
              item.errorMessage = this.error;
              return;
            }
          }
          if (item.rules) {
            let _valid = false;
            for (var _rule of item.rules) {
              if (_rule.type == "action") {
                _valid = await _rule.rule(this, this.model);
              } else {
                var _regex = new RegExp(_rule.rule);
                _valid = _regex.test(_value);
              }

              if (!_valid) {
                this.error = _rule.message;
                item.error = _rule.message;
                return;
              }
            }
          }
          if (item.checks) {
            for (var _check of item.checks) {
              var _validate = _check.rule(this.model);

              if (!_validate) {
                this.error = _check.message;
                item.error = _check.message;
                return;
              }
            }
          }
        }
      }
    },
    autoCompleteMatching() {
      for (let item of this.itemsdata) {
        if (item.type == "autocomplete") {
          let _newmodel = { ...this.model };
          if (this.model[item.value]) {
            _newmodel[item.value] = this.model[item.value]._id;
          } else {
            _newmodel[item.value] = null;
          }
          this.model = _newmodel;
        }
      }
    },
    async next() {
      await this.checkError();
      if (this.error) return;
      this.step += 1;
    },
    previous() {
      this.error = null;
      this.step -= 1;
    },
    show() {
      this.model = {};
      this.dialog = true;
    },
    close() {
      this.step = 1;
      this.error = null;

      this.dialog = false;
      this.$emit("close", this.model);
    },
    edit(value) {
      this.model = value;
      this.dialog = true;
    },
    changeValue(params) {
      // eslint-disable-next-line no-console
      console.log(params);
      let _newmodel = { ...this.model };
      _newmodel[params.name] = params.value;
      this.model = _newmodel;
    },
    finish() {
      this.checkError();
      if (this.error) return;
      this.autoCompleteMatching();
      this.dialog = false;
      this.step = 1;
      this.$emit("save", this.model);
      this.model = null;
    }
  }
};
</script>
<style >
</style>