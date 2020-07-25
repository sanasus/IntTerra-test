<template>
  <button class="in-button" v-on="$listeners">
    <img
      class="in-button__icon"
      src="@/assets/icon_plus-green.svg"
      alt="plus icon"
    />
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "InButton"
})
export default class InButton extends Vue {}
</script>

<style lang="scss" scoped>
.in-button {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 15px;
  background: var(--white);
  border-radius: 25px;
  border: 0;
  outline: none;
  cursor: pointer;
  font-weight: normal;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: -0.4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
}

.in-button__icon {
  margin-right: 7px;
}
</style>
