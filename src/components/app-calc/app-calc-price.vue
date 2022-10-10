<template>
  <div class="calc-price">
    <p class="calc-price__title title-text">{{ title }}</p>
    <span class="calc-price__price">{{ formatedPrice }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    formatedPrice() {
      return `${this.price.toLocaleString("ru")} ₽`;
    },
  },
  props: {
    price: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  watch: {
    price() {
      this.$emit("new-sum-price", this.price);
    },
  },
};
</script>

<style src="@/assets/scss/calc-price.scss" lang="scss">
</style>