<template>
  <div class="calc-body">
    <div class="container">
      <div class="calc-body__wrapper">
        <h1 class="calc-body__title">
          Рассчитайте стоимость автомобиля в лизинг
        </h1>
        <div class="calc-body__form">
          <div class="calc-body__form-row">
            <input-range
              @set-new-value="setCostcCar"
              @trow-error="setError"
              class="calc-input_rub"
              :input="inputConfig.costs"
            />
            <input-range
              @set-new-value="setFirsPayment"
              @set-calc-value="setCalcValue"
              @trow-error="setError"
              class="cacl-input_slot"
              :carCosts="inputConfig.costs.currentValue"
              :input="inputConfig.payment"
              :functionCalc="true"
            >
              <template v-slot:slot-procent>
                <div class="cacl-input__procent">
                  {{ inputConfig.payment.currentValue }}%
                </div>
              </template>
            </input-range>
            <input-range
              @set-new-value="setTimeLeasing"
              @trow-error="setError"
              class="cacl-input_month"
              :input="inputConfig.time"
            />
          </div>
          <div class="calc-body__form-row">
            <cacl-price
              @new-sum-price="setSumLeasing"
              :price="calcSummLeasing"
              :title="prise.one.title"
            />
            <cacl-price
              @new-sum-price="setSumEveryMonth"
              :price="calcEveryMonthPayment"
              :title="prise.two.title"
            />
            <calc-btn
              @send-calc="sendDataFromServer"
              :isPost="isPost"
              :disable="isError"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inputRange from "@/components/app-calc/app-calc-input.vue";
import caclPrice from "@/components/app-calc/app-calc-price.vue";
import calcBtn from "@/components/app-calc/calc-btn.vue";
import { postDataToServer } from "@/components/app-calc/post-api.js";
export default {
  data() {
    return {
      inputConfig: {
        costs: {
          title: "Стоимость автомобиля",
          minValue: 1000000,
          maxValue: 6000000,
          step: 100,
          currentValue: 3300000,
        },
        payment: {
          title: "Первоначальный взнос",
          minValue: 10,
          maxValue: 60,
          currentValue: 13,
          calcValue: 330000,
        },
        time: {
          title: "Срок лизинга",
          minValue: 1,
          maxValue: 60,
          currentValue: 34,
          step: 1,
        },
        procent: 0.035,
      },
      prise: {
        one: {
          title: "Сумма договора лизинга",
        },
        two: {
          title: "Ежемесячный платеж от",
        },
      },
      isPost: false,
      isError: false,
      resultData: {
        car_coast: 3300000,
        initail_payment: 429000,
        initail_payment_percent: 13,
        lease_term: 34,
        total_sum: 5383854,
        monthly_payment_from: 145731,
      },
    };
  },
  components: {
    inputRange,
    caclPrice,
    calcBtn,
  },
  methods: {
    setError(value) {
      this.isError = value;
    },
    setCostcCar(value) {
      this.resultData.car_coast = value;
      this.inputConfig.costs.currentValue = value;
    },
    setFirsPayment(value) {
      this.resultData.initail_payment_percent = value;
      this.inputConfig.payment.currentValue = value;
    },
    setTimeLeasing(value) {
      this.resultData.lease_term = value;
      this.inputConfig.time.currentValue = value;
    },
    setCalcValue(value) {
      this.resultData.initail_payment = value;
      this.inputConfig.payment.calcValue = value;
    },
    setSumLeasing(value) {
      this.resultData.total_sum = value;
    },
    setSumEveryMonth(value) {
      this.resultData.monthly_payment_from = value;
    },
    sendDataFromServer() {
      this.isPost = true;
      postDataToServer(this.resultData).then(
        (boolean) => (this.isPost = boolean)
      );
    },
  },
  computed: {
    calcSummLeasing() {
      return Math.round(
        this.inputConfig.payment.calcValue +
          this.inputConfig.time.currentValue * this.calcEveryMonthPayment
      );
    },

    calcEveryMonthPayment() {
      return Math.round(
        (this.inputConfig.costs.currentValue -
          this.inputConfig.payment.calcValue) *
          ((this.inputConfig.procent *
            Math.pow(
              1 + this.inputConfig.procent,
              this.inputConfig.time.currentValue
            )) /
            (Math.pow(
              1 + this.inputConfig.procent,
              this.inputConfig.time.currentValue
            ) -
              1))
      );
    },
  },
};
</script>

<style src="@/assets/scss/calc-body.scss" lang="scss">
</style>