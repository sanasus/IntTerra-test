<template>
  <div class="in-app">
    <InHeader />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InHeader from "@/components/InHeader.vue";

@Component({
  name: "InApp",
  components: {
    InHeader
  }
})
export default class InApp extends Vue {}
</script>

<style lang="scss">
:root {
  --black: #091c28;
  --white: #ffffff;
  --gray: #f9f9f9;
  --gray-2: #a7a9ac;
  --gray-3: #edeeee;
  --main-text: #333333;
  --blue: #3399ff;
  --yellow: #ffe06d;
  --green: #66cc66;
  --red: #ff7360;
}

.in-app {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  background-color: var(--gray);
  font-family: "Ubuntu", sans-serif;
  color: var(--main-text);
}
</style>
