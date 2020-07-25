<template>
  <button
    class="in-arrow-button"
    :class="{
      'in-arrow-button--active': isActive,
      'in-arrow-button--desc': isArrowUp
    }"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "InArrowButton"
})
export default class InArrowButton extends Vue {
  @Prop() readonly isActive: boolean;
  @Prop() readonly isArrowUp: boolean;
}
</script>

<style lang="scss" scoped>
.in-arrow-button {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: -0.5px;
  border: 0;
  outline: none;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    margin-left: 5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--gray-2);
    transition: border-color 0.3s;
  }

  &--desc::after {
    border-top: 0;
    border-bottom: 5px solid var(--gray-2);
  }

  &:hover,
  &--active {
    &::after {
      border-top-color: var(--blue);
      border-bottom-color: var(--blue);
    }
  }
}
</style>
