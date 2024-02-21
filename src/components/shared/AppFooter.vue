<template>
  <div class="layout-footer">
    <div class="footer-container">
      <span class="font-bold">&#169; Web3 Project - 2024</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
.layout-footer {
  background: #10b981;
  position: absolute;
  flex-shrink: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
}
.footer-container {
  color: #ffffff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
