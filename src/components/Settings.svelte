<script lang="ts">
  import { count } from "../stores/count";
  import { pinballSetting, volumeSetting, resetSettings } from "../stores/settings";
  
  let showPanel = false;
</script>

<button class="settings-button" on:click={() => (showPanel = true)}>⚙</button>
{#if showPanel}
<div class="panel">
  <label class="entry">
    <div class="entry-text">Volume 🔊</div>
    <input type="range" bind:value={$volumeSetting} step={1} min={0} max={100} />
    <div class="entry-value">{$volumeSetting}</div>
  </label>
  <label class="entry">
    <div class="entry-text">Pinball mode</div>
    <input type="checkbox" bind:checked={$pinballSetting} />
  </label>
  <div class="entry">
    <button class="button" on:click={resetSettings}>Reset settings</button>
  </div>
  <div class="entry">
    <button class="button" on:click={count.reset}>Reset count</button>
  </div>
  <div class="close">
    <button class="button" on:click={() => (showPanel = false)}>Close settings</button>
  </div>
</div>
{/if}

<style>
  .button {
    font-family: Comicy, sans-serif;
    outline: none;
    appearance: none;
    cursor: pointer;
    color: #fff;
    border: 1px solid #fff;
    background: #eca0a3;
    font-size: 1em;
    padding: .25em .5em;
  }

  .settings-button {
    z-index: 20;
    position: absolute;
    top: .5em;
    right: .5em;
    outline: none;
    appearance: none;
    cursor: pointer;
    font-size: 1.75em;
    width: 2em;
    height: 2em;
    color: #fff;
    border: 1px solid #fff;
    background: #eca0a3;
    border-radius: 50%;
  }
  .settings-button:hover, .button:hover {
    background: #fff;
    color: #eca0a3;
  }

  .panel {
    font-family: Comicy, sans-serif;
    z-index: 30;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #eca0a3;
    color: #fff;
    width: 75%;
    min-width: 300px;
    max-width: 500px;
    padding: 1em;
  }

  .entry {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1em;
    height: 2em;
    margin-bottom: .5em;
  }
  .entry-text {
    width: 9em;
  }
  .entry button {
    font-family: Comicy, sans-serif;
    color: #fff;
  }

  .close {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>