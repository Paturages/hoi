<script lang="ts">
  export let src: string;
</script>

<div class="container">
  <img class="sprite" {src} alt="" />
</div>

<style>
  .container {
    z-index: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
  }
  .sprite {
    max-height: 100%;
    max-width: 100%;
  }
</style>