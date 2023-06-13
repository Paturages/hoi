<script lang="ts">
  import { onMount } from "svelte";
  import * as Tone from "tone";
  import { shuffle } from "./utils";
  import Sprite from "./components/Sprite.svelte";

  const SOUND_COUNT = 16;
  const soundObj: Record<string, string> = {};
  let loaded = false;
  let soundUrls: string[] = [];
  let soundQueue: string[];
  let cycleFirstSound, currentSound;
  let tonePlayers: Tone.Players;
  
  Tone.getContext().dispose();
  const toneContext = new Tone.Context({
    latencyHint: "interactive",
    lookAhead: 0,
    updateInterval: 0.01
  });
  Tone.setContext(toneContext);

  const handleClick = () => {
    if (!loaded) return;
    tonePlayers.player(currentSound).start(0);
    soundQueue.unshift(currentSound);
    currentSound = soundQueue.pop();
    if (currentSound == cycleFirstSound) shuffle(soundQueue);
  }

  onMount(async () => {
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
  });
</script>

<svelte:head>
  {#each soundUrls as src}
    <link rel="preload" as="audio" href={src} />
  {/each}
</svelte:head>

<div class="bg" />
<Sprite onClick={handleClick} />

<style>
  .bg {
    z-index: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url('./assets/bg.svg');
    opacity: .2;
  }
</style>
