<script>
export default {
  props: ["mainToSecondary"],
};
</script>

<template>
  <button
    mainToSecondary
    type="button"
    class="into"
    v-on:click="$emit('toggleDirection')"
  >
    <span v-if="mainToSecondary">&#8680;</span><span v-else>&#8678;</span>
  </button>
</template>

<style scoped>
.into {
  margin-right: 8px;
  color: #2f2f2f;
  background-color: rgba(238, 238, 252, 0.7721682422969187);
  border: 1px solid #f66666;
  border-radius: 4px;
  transition: all 350ms;
}

.into:hover {
  border-color: #f05555;
  transform: scale(1.1);
}

.into span {
  font-size: 16px;
}
</style>
