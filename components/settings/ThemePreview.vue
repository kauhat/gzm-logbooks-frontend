<template>
  <div :data-theme="themeName">
    <div class="gap-3 p-3 shadow-xl bg-base-100 card">
      <svg width="100" viewBox="0 0 20 40" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="0"
          y="8"
          width="20"
          height="32"
          rx="2"
          ry="2"
          class="fill-current text-base-100"
        />

        <circle cx="10" cy="18" r="9" class="fill-current text-anxiety" />
        <circle cx="10" cy="18" r="6" class="fill-current text-growth" />
        <circle cx="10" cy="18" r="3" class="fill-current text-comfort" />

        <rect
          x="1"
          y="28"
          width="18"
          height="3"
          rx="2"
          ry="2"
          class="fill-current text-warning"
        />
        <rect
          x="1"
          y="32"
          width="18"
          height="3"
          rx="2"
          ry="2"
          class="fill-current text-neutral-content"
        />
        <rect
          x="1"
          y="36"
          width="18"
          height="3"
          rx="2"
          ry="2"
          class="fill-current text-success"
        />
      </svg>

      <button class="shadow-sm btn btn-primary" @click="switchTheme(themeName)">
        Beep boop
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '~~/store/config'

const { switchTheme } = useConfigStore()
</script>

<script lang="ts">
// import tailwindConfig from '#tailwind-config'
export default {
  props: {
    themeName: { type: String, required: true }
  }

  //   data() {
  //     const themeComfort = `${this.themeName}-comfort`
  //     const themeGrowth = `${this.themeName}-growth`
  //     const themeAnxiety = `${this.themeName}-anxiety`
  //     const {
  //       [themeComfort]: comfort,
  //       [themeGrowth]: growth,
  //       [themeAnxiety]: anxiety,
  //     } = tailwindConfig.theme.colors
  //     return {
  //       anxiety,
  //       growth,
  //       comfort,
  //     }
  //   },
}
</script>
