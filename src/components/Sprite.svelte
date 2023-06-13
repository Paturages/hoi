<script lang="ts">
  import { onMount } from "svelte";
  import { shuffle } from "../utils";

  export let onClick: () => void;

  const SPRITE_COUNT = 15;
  let spriteUrls: string[] = [];
  let spriteQueue: string[];
  let cycleFirstSprite, currentSprite;

  const handleClick = ($event: Event) => {
    spriteQueue.unshift(currentSprite);
    currentSprite = spriteQueue.pop();
    if (currentSprite == cycleFirstSprite) shuffle(spriteQueue);
    if (onClick) onClick();
  }

  onMount(async () => {
    spriteUrls = await Promise.all(new Array(SPRITE_COUNT).fill(0).map(async (_, i) => {
      const fileName = `${i+1}`.padStart(3, '0');
      const img = await import(`../assets/sprites/${fileName}.png`);
      return img.default;
    }));
    spriteQueue = shuffle(spriteUrls.slice());
    currentSprite = spriteQueue.pop();
    cycleFirstSprite = currentSprite;
  });
</script>

<svelte:head>
  {#each spriteUrls as src}
    <link rel="preload" as="image" href={src} />
  {/each}
</svelte:head>

<button class="sprite" on:click={handleClick}>
  <img src={currentSprite} alt="" />
</button>

<style>
  .sprite {
    z-index: 1;
    border: none;
    outline: none;
    appearance: none;
    cursor: pointer;
    background: transparent;
    font-size: 1em;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 2em;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  img {
    max-width: 100%;
    max-height: 95%;
  }
</style>