<script lang="ts">
  let showPanel = false;
</script>

<button class="about-button" on:click={() => (showPanel = !showPanel)}>ℹ</button>
{#if showPanel}
<div aria-hidden="true" class="backdrop" on:click={() => (showPanel = false)} />
<div class="panel">
  <div class="content">
    This is dedicated to the cutest treasure<br />hunting fox
    <a href="https://www.youtube.com/@CheriLupina" target="_blank">Cheri Lupina</a>
    <br /><br />
    Special thanks to <a href="https://twitter.com/KirinoMiyumi" target="_blank">Kirino Miyumi</a><br />
    for cutting the sound bites
    <br /><br />
    <a href="https://github.com/Paturages/hoi" target="_blank">Source code</a>
  </div>
  <div class="content">
    <div class="entry">
      <div class="entry-label">Website</div>
      <div class="entry-value">
        <a href="https://github.com/Paturages" target="_blank">Paturages</a>
      </div>
    </div>
    <div class="entry">
      <div class="entry-label">Voice, character, rigging</div>
      <div class="entry-value">
        <a href="https://www.youtube.com/@CheriLupina" target="_blank">Cheri Lupina</a>
      </div>
    </div>
    <div class="entry">
      <div class="entry-label">Model art</div>
      <div class="entry-value">
        <a href="https://jikim.carrd.co" target="_blank">@ya3ji_kim_</a>
      </div>
    </div>
    <div class="entry">
      <div class="entry-label">Inspired by</div>
      <div class="entry-value">
        <a href="https://impomu.com" target="_blank">impomu.com</a>
      </div>
    </div>
  </div>
  <div class="close">
    <button class="button" on:click={() => (showPanel = false)}>Close</button>
  </div>
</div>
{/if}

<style>
  .button {
    font-family: Cheri, sans-serif;
    outline: none;
    appearance: none;
    cursor: pointer;
    color: #fff;
    border: 1px solid #fff;
    background: #eca0a3;
    font-size: 1em;
    padding: .25em .5em;
  }

  .backdrop {
    z-index: 19;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .about-button {
    z-index: 20;
    position: absolute;
    top: 3em;
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
  .about-button:hover, .button:hover {
    background: #fff;
    color: #eca0a3;
  }

  .panel {
    font-family: Cheri, sans-serif;
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
    text-align: center;
  }

  .content {
    margin-bottom: 1em;
  }

  .entry {
    margin-bottom: .5em;
  }
  .entry-value {
    font-size: 1.25em;
  }

  .close {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>