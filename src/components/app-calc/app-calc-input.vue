<template>
  <div class="cacl-input">
    <p class="cacl-input__title title-text">{{ input.title }}</p>
    <div class="cacl-input__block">
      <input
        @input="inputValue"
        @blur="minMaxValue"
        :value="setCurrentValue"
        class="cacl-input__input"
        name="value-input"
        :type="functionCalc ? 'text' : 'number'"
        :readonly="carCosts"
      />
      <div class="cacl-input__range-wrapper">
        <input
          v-model="currentValue"
          :min="input.minValue"
          :max="input.maxValue"
          :step="input.step"
          class="cacl-input__range"
          name="range-input"
          type="range"
        />
      </div>
      <slot name="slot-procent"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentValue: this.input.currentValue,
    };
  },
  created() {
    this.sendDataForParrent();
  },
  props: {
    input: {
      type: Object,
      required: true,
    },
    functionCalc: {
      type: Boolean,
      default: false,
    },
    carCosts: {
      type: Number,
    },
  },
  methods: {
    inputValue(value) {
      this.currentValue = +value.target.value;
      this.minValue();
    },
    minValue() {
      console.log(12);
      if (this.currentValue > 1) {
        this.currentValue++;
      }
    },
    minMaxValue() {
      if (this.currentValue > this.input.maxValue) {
        this.currentValue = this.input.maxValue;
      } else if (this.currentValue < this.input.minValue) {
        this.currentValue = this.input.minValue;
      } else {
        return;
      }
    },
    throwError() {
      this.$emit(
        "trow-error",
        this.currentValue < this.input.minValue ||
          this.currentValue > this.input.maxValue
      );
    },
    sendDataForParrent() {
      if (this.functionCalc) {
        this.$emit("set-calc-value", +this.formulCalcValue);
      }
      this.$emit("set-new-value", +this.currentValue);
    },
  },
  computed: {
    setCurrentValue() {
      if (this.functionCalc) {
        return `${this.formulCalcValue} ₽`;
      } else {
        return this.currentValue;
      }
    },
    formulCalcValue() {
      return `${Math.floor((+this.carCosts / 100) * this.currentValue)}`;
    },
  },
  watch: {
    currentValue() {
      this.sendDataForParrent();
      this.throwError();
    },
    formulCalcValue() {
      this.sendDataForParrent();
    },
  },
};
</script>

<style src="@/assets/scss/calc-input.scss" lang="scss">
</style>