import { writable } from "svelte/store";

interface Settings {
  volume: number;
  pinball: boolean;
}

const defaultSettings: Settings = {
  volume: 70,
  pinball: false
}

const storedVolume = localStorage.getItem("hoi:settings:volume");
const storedPinball = localStorage.getItem("hoi:settings:pinball");
const settings: Settings = {
  volume: storedVolume ? Number(storedVolume) : defaultSettings.volume,
  pinball: storedPinball ? JSON.parse(storedPinball) : defaultSettings.pinball
};

export const volumeSetting = writable(settings.volume);
export const pinballSetting = writable(settings.pinball);
export const resetSettings = () => {
  volumeSetting.set(defaultSettings.volume);
  pinballSetting.set(defaultSettings.pinball);
}

volumeSetting.subscribe(volume => localStorage.setItem('hoi:settings:volume', String(volume)));
pinballSetting.subscribe(pinball => localStorage.setItem('hoi:settings:pinball', String(pinball)));
