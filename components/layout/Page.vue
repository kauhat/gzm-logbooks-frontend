<template>
  <div class="flex flex-col items-center">
    <LayoutContainer max="lg" class="my-6">
      <div v-if="$slots.title" class="mb-4 text-xl text-base-content">
        <slot name="title" />
      </div>

      <slot />
    </LayoutContainer>

    <slot name="fullwidth" />

    <!-- <div
      v-if="$slots.debug && false"
      class="w-full mt-auto mb-4 overflow-hidden"
    >
      <LayoutContainer>
        <slot name="debug" />
      </LayoutContainer>
    </div> -->
  </div>
</template>
