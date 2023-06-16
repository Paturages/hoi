<script lang="ts">
  import { onMount } from "svelte";

  import { sprite } from "./stores/sprite";
  import { sound } from "./stores/sound";
  import { count } from "./stores/count";

  import Sprite from "./components/Sprite.svelte";
  import Counter from "./components/Counter.svelte";
  import Settings from "./components/Settings.svelte";

  let loaded = false;

  let soundUrls: string[] = [];
  let spriteUrls: string[] = [];

  const handleClick = () => {
    if (!loaded) return;
    sound.cycle();
    sprite.cycle();
    count.increment();
  }

  onMount(async () => {
    soundUrls = await sound.init();
    spriteUrls = await sprite.init();
    loaded = true;
  });
</script>

<svelte:head>
  {#each soundUrls as src}
    <link rel="preload" as="audio" href={src} />
  {/each}
  {#each spriteUrls as src}
    <link rel="preload" as="image" href={src} />
  {/each}
</svelte:head>

<div class="bg" />
<button class="hoi-button" on:click={handleClick} />
<Counter count={$count} />
<Sprite src={$sprite} />
<Settings />

<style>
  .bg {
    z-index: -10;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url('./assets/bg.svg');
    opacity: .2;
  }
  .hoi-button {
    z-index: 10;
    border: none;
    outline: none;
    appearance: none;
    cursor: pointer;
    background: transparent;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
