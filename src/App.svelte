<script lang="ts">
  import { onMount } from "svelte";
  import * as Tone from "tone";

  import { shuffle } from "./utils";
  import { getCount, incrementCount } from "./utils/counter";

  import Sprite from "./components/Sprite.svelte";
  import Counter from "./components/Counter.svelte";

  let count = getCount();
  let loaded = false;

  // Sound variables
  const SOUND_COUNT = 16;
  const soundObj: Record<string, string> = {};
  let soundUrls: string[] = [];
  let soundQueue: string[];
  let cycleFirstSound, currentSound;
  let tonePlayers: Tone.Players;

  // Sprite variables
  const SPRITE_COUNT = 15;
  let spriteUrls: string[] = [];
  let spriteQueue: string[];
  let cycleFirstSprite, currentSprite;
  
  Tone.getContext().dispose();
  const toneContext = new Tone.Context({
    latencyHint: "interactive",
    lookAhead: 0,
    updateInterval: 0.01
  });
  Tone.setContext(toneContext);

  const handleClick = () => {
    if (!loaded) return;

    // Cycle sounds
    tonePlayers.player(currentSound).start(0);
    soundQueue.unshift(currentSound);
    currentSound = soundQueue.pop();
    if (currentSound == cycleFirstSound) shuffle(soundQueue);

    // Cycle sprites
    spriteQueue.unshift(currentSprite);
    currentSprite = spriteQueue.pop();
    if (currentSprite == cycleFirstSprite) shuffle(spriteQueue);

    count = incrementCount();
  }

  onMount(async () => {
    // Load sound bites
    soundUrls = await Promise.all(new Array(SOUND_COUNT).fill(0).map(async (_, i) => {
      const fileName = `${i+1}`.padStart(3, '0');
      const ogg = await import(`./assets/sounds/common/${fileName}.ogg`);
      soundObj[`common_${fileName}`] = ogg.default;
      return ogg.default;
    }));
    soundQueue = shuffle(Object.keys(soundObj));
    currentSound = soundQueue.pop();
    cycleFirstSound = currentSound;
    tonePlayers = new Tone.Players(soundObj, () => { loaded = true; }).chain(toneContext.destination);

    // Load sprites
    spriteUrls = await Promise.all(new Array(SPRITE_COUNT).fill(0).map(async (_, i) => {
      const fileName = `${i+1}`.padStart(3, '0');
      const img = await import(`./assets/sprites/${fileName}.png`);
      return img.default;
    }));
    spriteQueue = shuffle(spriteUrls.slice());
    currentSprite = spriteQueue.pop();
    cycleFirstSprite = currentSprite;
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
<Counter {count} />
<Sprite src={currentSprite} />

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
