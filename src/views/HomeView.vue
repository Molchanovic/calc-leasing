<template>
  <div class="home">
    <app-calc />
  </div>
</template>

<script>
import appCalc from "@/components/app-calc/app-calc.vue";
export default {
  name: "HomeView",
  components: {
    appCalc,
  },
};
</script>
