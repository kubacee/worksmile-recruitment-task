<template>
  <div class="layout">
    <div class="layout__content">
      <div class="layout__comments">
        <slot name="content" />
      </div>
      <div class="layout__form">
        <slot name="form" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Layout"
  }
</script>

<style scoped lang="scss">
  @import './../scss/variables';

  .layout {
    background: $layoutBackground;
    height: 100vh;
    padding: 20px 10px;
    box-sizing: border-box;

    .layout__content {
      background: $layoutContentBackground;
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    .layout__comments {
      height: 100%;
      overflow-y: auto;
      position: relative;
    }

    .layout__form {
      min-height: 100px;
      position: relative;
    }
  }
</style>