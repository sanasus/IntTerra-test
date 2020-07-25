<template functional>
  <header class="in-header"></header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "InHeader"
})
export default class InHeader extends Vue {}
</script>

<style scoped lang="scss">
.in-header {
  width: 100%;
  height: 80px;
  background-color: var(--black);
}
</style>
