<script setup></script>

<template>
  <div class="headerMainContainer">
    <p class="greeting">Welcome</p>
    <p class="urge">Please choose the currency</p>
  </div>
</template>

<style scoped>
.headerMainContainer {
  padding: 16px 8px;
  background: linear-gradient(
    20deg,
    rgba(153, 153, 154, 1) 0%,
    rgba(181, 181, 184, 1) 5%,
    rgba(238, 238, 252, 0.7721682422969187) 35%,
    rgba(185, 239, 250, 0.09989933473389356) 65%,
    rgba(174, 223, 233, 0.09989933473389356) 90%
  );
  border-bottom: 1px solid #f66666;
}
.greeting {
  margin-bottom: 8px;
  font-size: 24px;
  color: #2f2f2f;
}
.urge {
  font-size: 16px;
  color: #2f2f2f;
}
</style>
