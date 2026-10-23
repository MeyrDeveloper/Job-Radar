<script setup lang="ts">
import { defineModel, defineProps } from 'vue'

interface SwitchProps {
  modelValue: boolean
  className?: string
}

defineProps<SwitchProps>()

const model = defineModel()
</script>
<template>
  <label class="label-container" :class="className">
    <input type="checkbox" v-model="model" />
    <span class="switcher"></span>

    <span class="ml-15">
      <slot></slot>
    </span>
  </label>
</template>

<style lang="scss" scoped>
.label {
  &-container {
    position: relative;

    cursor: pointer;
  }
}

input[type='checkbox'] {
  appearance: none;
  opacity: 0;
  width: 0;
  height: 0;
}

.switcher {
  position: absolute;
  top: 0;
  left: 0;
  width: 3.125rem;
  height: 1.5625rem;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 1.625rem;

  &::before {
    position: absolute;
    content: '';
    height: 1.25rem;
    width: 1.25rem;
    left: 0.1875rem;
    bottom: 0.1875rem;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }
}

input:checked + .switcher {
  background-color: #4f46e5;
}

input:checked + .switcher:before {
  transform: translateX(1.5rem);
}
</style>
