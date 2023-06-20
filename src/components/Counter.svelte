<script lang="ts">
  export let count = 0;
</script>

<div class="container">
  <div class="counter">{count}</div>
</div>

<style>
  .container {
    font-size: 6em;
    margin-top: .25em;
    position: relative;
    z-index: 2;
    font-family: Cheri, sans-serif;
    width: 100%;
    text-align: center;
  }
  .counter {
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    color: #eca0a3;
    -webkit-text-stroke: 4px #fff;
    letter-spacing: 3px;
  }
</style>