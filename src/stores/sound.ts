import * as Tone from "tone";
import { writable } from "svelte/store";
import { shuffle } from "../utils";
import { volumeSetting, moreSoundsSetting } from "./settings";

const importSounds = import.meta.glob('../assets/sounds/**/*.ogg');

Tone.getContext().dispose();
const toneContext = new Tone.Context({
  latencyHint: "interactive",
  lookAhead: 0,
  updateInterval: 0.01,
});
Tone.setContext(toneContext);

let moreSounds = false;
moreSoundsSetting.subscribe(value => (moreSounds = value));

function createSound() {
  const { subscribe, set } = writable("");

  const soundObj: Record<string, string> = {};
  let commonQueue: string[];
  let rareQueue: string[];
  let ssrQueue: string[];
  let commonFirst, rareFirst, ssrFirst;
  let currentCommon, currentRare, currentSsr;
  let tonePlayers: Tone.Players;

  const init = async (): Promise<string[]> => {
    const soundUrls = await Promise.all(
      Object.entries(importSounds).map(async ([path, fn]) => {
        const fileName = path.split('/').slice(-2).join('_');
        const ogg: any = await fn();
        soundObj[fileName] = ogg.default;
        return ogg.default;
      })
    );
    commonQueue = shuffle(Object.keys(soundObj).filter(name => name.startsWith('common_')));
    rareQueue = shuffle(Object.keys(soundObj).filter(name => name.startsWith('rare_')));
    ssrQueue = shuffle(Object.keys(soundObj).filter(name => name.startsWith('ssr_')));

    currentCommon = commonQueue.pop();
    currentRare = rareQueue.pop();
    currentSsr = ssrQueue.pop();

    commonFirst = currentCommon;
    rareFirst = currentRare;
    ssrFirst = currentSsr;

    tonePlayers = new Tone.Players(soundObj).chain(toneContext.destination);
    volumeSetting.subscribe((value) => (tonePlayers.volume.value = Math.log(value / 100) * 10));
    set(currentCommon);
    return soundUrls;
  };

  const cycle = () => {
    const soundSeed = Math.random();
    let sound: string;

    if (moreSounds && soundSeed < 0.05) {
      ssrQueue.unshift(currentSsr);
      currentSsr = ssrQueue.pop();
      if (currentSsr == ssrFirst) ssrQueue = shuffle(ssrQueue);
      sound = currentSsr;
    } else if (moreSounds && soundSeed < 0.15) {
      rareQueue.unshift(currentRare);
      currentRare = rareQueue.pop();
      if (currentRare == rareFirst) rareQueue = shuffle(rareQueue);
      sound = currentRare;
    } else {
      commonQueue.unshift(currentCommon);
      currentCommon = commonQueue.pop();
      if (currentCommon == commonFirst) commonQueue = shuffle(commonQueue);
      sound = currentCommon;
    }

    tonePlayers.player(sound).start(0);
    set(sound);
  };

  return { subscribe, init, cycle };
}

export const sound = createSound();
