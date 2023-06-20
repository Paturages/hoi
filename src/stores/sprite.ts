import { writable } from "svelte/store";
import { shuffle } from "../utils";

const SPRITE_COUNT = 15;

function createSprite() {
  const { subscribe, set } = writable("");
  
  let spriteQueue: string[];
  let cycleFirstSprite, currentSprite;

  const init = async (): Promise<string[]> => {
    const spriteUrls = await Promise.all(new Array(SPRITE_COUNT).fill(0).map(async (_, i) => {
      const fileName = `${i+1}`.padStart(3, '0');
      const img = await import(`../assets/sprites/${fileName}.png`);
      return img.default;
    }));
    spriteQueue = shuffle(spriteUrls.slice());
    currentSprite = spriteQueue.pop();
    cycleFirstSprite = currentSprite;
    set(currentSprite);
    return spriteUrls;
  }

  const cycle = () => {
    spriteQueue.unshift(currentSprite);
    currentSprite = spriteQueue.pop();
    if (currentSprite == cycleFirstSprite) shuffle(spriteQueue);
    set(currentSprite);
  }

  return { subscribe, init, cycle };
}


export const sprite = createSprite();
