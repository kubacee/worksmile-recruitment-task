<template>
  <div class="loader">
    <div class="loader__spinner" />
  </div>
</template>

<script>
  export default {
    name: "Loader"
  }
</script>

<style scoped lang="scss">
  @import "./../scss/variables";

  .loader {
    z-index: 10;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: $loaderBackground;

    .loader__spinner {
      border: 10px solid $loaderRangeColor;
      border-top: 10px solid $loaderProgressColor;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
</style>