<script lang="ts">
  export let src: string;
  export let pinball: boolean;

  let containerTransform = 'rotate(0deg) translate(0px, 0px) scale(1)';
  let containerTransformOrigin = 'bottom center';
  let imgTransform = 'rotate(0deg)';
  let imgTransformOrigin = 'top center';
  let justifyContent = 'center';
  let alignItems = 'flex-end';
  let maxHeight = '100vh';
  let maxWidth = '100vw';

  const randomize = () => {
    const side = ['top', 'bottom', 'left', 'right'][Math.floor(Math.random() * 4)];
    // Randomize size from -X% to +X%
    const RANDOM_SIZE_BOUNDS = 10;
    const randomSize = 1 + (((Math.random() * 2 * RANDOM_SIZE_BOUNDS) - RANDOM_SIZE_BOUNDS) / 100);
    // Randomize position from -Z vw/wh to +Z vw/vh
    const RANDOM_POSITION_BOUNDS = 20;
    const randomPosVar = (Math.random() * 2 * RANDOM_POSITION_BOUNDS) - RANDOM_POSITION_BOUNDS;
    // The angle is dependent on the position (it should point roughly towards center)
    const angle = randomPosVar;
    // This offset has to be applied to hide (at least part of) the cropped parts of the sprites
    // The offset scales on vh on left/right and vw on top/bottom because that's the axis
    // where the sprite is and moves around
    const hideThePainOffset = randomSize * Math.abs(randomPosVar);

    if (side === 'left') {
      containerTransformOrigin = 'left center';
      containerTransform = `rotate(${-angle}deg) translate(${-hideThePainOffset}vh, ${randomPosVar}vw) scale(${randomSize})`;
      imgTransformOrigin = 'top center';
      imgTransform = 'rotate(90deg)';
      justifyContent = 'flex-start';
      alignItems = 'flex-end';
      maxHeight = '100vw';
      maxWidth = '100vh';
    } else if (side === 'right') {
      containerTransformOrigin = 'right center';
      containerTransform = `rotate(${angle}deg) translate(${hideThePainOffset}vh, ${randomPosVar}vw) scale(${randomSize})`;
      imgTransformOrigin = 'top center';
      imgTransform = 'rotate(-90deg)';
      justifyContent = 'flex-end';
      alignItems = 'flex-end';
      maxHeight = '100vw';
      maxWidth = '100vh';
    } else if (side === 'top') {
      containerTransformOrigin = 'top center';
      containerTransform = `rotate(${angle}deg) translate(${randomPosVar}vh, ${-hideThePainOffset}vw) scale(${randomSize})`;
      imgTransformOrigin = 'center';
      imgTransform = 'rotate(-180deg)';
      justifyContent = 'center';
      alignItems = 'flex-start';
      maxHeight = '100vh';
      maxWidth = '100vw';
    } else {
      containerTransformOrigin = 'bottom center';
      containerTransform = `rotate(${-angle}deg) translate(${randomPosVar}vh, ${hideThePainOffset}vw) scale(${randomSize})`;
      imgTransformOrigin = 'center';
      imgTransform = 'rotate(0deg)';
      justifyContent = 'center';
      alignItems = 'flex-end';
      maxHeight = '100vh';
      maxWidth = '100vw';
    }
  }

  $: {
    // Force this reactivity statement to occur whenever src changes,
    // even though none of the changes here involve src at all
    // (I assume Svelte listens to the changes of the variables that are actually
    // included inside of the statement)
    src;
    if (pinball) randomize();
    else {
      containerTransformOrigin = 'bottom center';
      containerTransform = 'rotate(0deg) translate(0px, 0px) scale(1)';
      imgTransformOrigin = 'center';
      imgTransform = 'rotate(0deg)';
      justifyContent = 'center';
      alignItems = 'flex-end';
      maxHeight = '100vh';
      maxWidth = '100vw';
    }
  }
</script>

<div
  class="container"
  style:justify-content={justifyContent}
  style:align-items={alignItems}
  style:transform={containerTransform}
  style:transform-origin={containerTransformOrigin}
>
  <img
    {src}
    alt=""
    class="sprite"
    style:transform={imgTransform}
    style:max-height={maxHeight}
    style:max-width={maxWidth}
    style:transform-origin={imgTransformOrigin}
  />
</div>

<style>
  .container {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    transition: all .15s ease-in-out;
  }
  .sprite {
    transition: transform .15s ease-in-out;
  }
</style>