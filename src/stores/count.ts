import { writable } from "svelte/store";

function createCount() {
  const stored = localStorage.getItem("hoi:count");
  let count = stored ? Number(stored) : 0;
  const { subscribe, set, update } = writable(count);

  subscribe(value => localStorage.setItem("hoi:count", String(value)));
  
  const increment = () => update(n => n + 1);
  const reset = () => set(0);
  
  return { subscribe, increment, reset };
}

export const count = createCount();
