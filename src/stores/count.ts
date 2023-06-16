import { writable } from "svelte/store";

function createCount() {
  const stored = localStorage.getItem("hoi:count");
  const { subscribe, set, update } = writable(stored ? Number(stored) : 0);

  subscribe(value => localStorage.setItem("hoi:count", String(value)));
  
  const increment = () => update(n => n + 1);
  const reset = () => set(0);
  
  return { subscribe, increment, reset };
}

export const count = createCount();
