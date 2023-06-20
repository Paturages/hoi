import { writable } from "svelte/store";

interface Settings {
  volume: number;
  pinball: boolean;
  moreSounds: boolean;
}

const defaultSettings: Settings = {
  volume: 70,
  pinball: false,
  moreSounds: false
}

const storedVolume = localStorage.getItem("hoi:settings:volume");
const storedPinball = localStorage.getItem("hoi:settings:pinball");
const moreSounds = localStorage.getItem("hoi:settings:moreSounds");
const settings: Settings = {
  volume: storedVolume ? Number(storedVolume) : defaultSettings.volume,
  pinball: storedPinball ? JSON.parse(storedPinball) : defaultSettings.pinball,
  moreSounds: moreSounds ? JSON.parse(moreSounds) : defaultSettings.moreSounds,
};

export const volumeSetting = writable(settings.volume);
export const pinballSetting = writable(settings.pinball);
export const moreSoundsSetting = writable(settings.moreSounds);
export const resetSettings = () => {
  volumeSetting.set(defaultSettings.volume);
  pinballSetting.set(defaultSettings.pinball);
  moreSoundsSetting.set(defaultSettings.moreSounds);
}

volumeSetting.subscribe(volume => localStorage.setItem('hoi:settings:volume', String(volume)));
pinballSetting.subscribe(pinball => localStorage.setItem('hoi:settings:pinball', String(pinball)));
moreSoundsSetting.subscribe(moreSounds => localStorage.setItem('hoi:settings:moreSounds', String(moreSounds)));
