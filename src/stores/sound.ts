import * as Tone from "tone";
import { writable } from "svelte/store";
import { shuffle } from "../utils";
import { volumeSetting } from "./settings";

export const SOUND_COUNT = 16;

Tone.getContext().dispose();
const toneContext = new Tone.Context({
  latencyHint: "interactive",
  lookAhead: 0,
  updateInterval: 0.01,
});
Tone.setContext(toneContext);

function createSound() {
  const { subscribe, set } = writable("");

  const soundObj: Record<string, string> = {};
  let soundQueue: string[];
  let cycleFirstSound, currentSound;
  let tonePlayers: Tone.Players;

  const init = async (): Promise<string[]> => {
    const soundUrls = await Promise.all(
      new Array(SOUND_COUNT).fill(0).map(async (_, i) => {
        const fileName = `${i + 1}`.padStart(3, "0");
        const ogg = await import(`../assets/sounds/common/${fileName}.ogg`);
        soundObj[`common_${fileName}`] = ogg.default;
        return ogg.default;
      })
    );
    soundQueue = shuffle(Object.keys(soundObj));
    currentSound = soundQueue.pop();
    cycleFirstSound = currentSound;
    tonePlayers = new Tone.Players(soundObj).chain(toneContext.destination);
    volumeSetting.subscribe((value) => (tonePlayers.volume.value = Math.log(value / 100) * 10));
    set(currentSound);
    return soundUrls;
  };

  const cycle = () => {
    tonePlayers.player(currentSound).start(0);
    soundQueue.unshift(currentSound);
    currentSound = soundQueue.pop();
    if (currentSound == cycleFirstSound) shuffle(soundQueue);
    set(currentSound);
  };

  return { subscribe, init, cycle };
}

export const sound = createSound();
