<template>
  <div :data-theme="themeName" class="overflow-hidden">
    <div class="gap-3 p-3 shadow-xl bg-base-100 card" @click="switchTheme(themeName)">

      <div class="prose">
        <h2>h2 {{themeName}}</h2>
        <h3>h3 {{themeName}}</h3>
      </div>

      <p>Some example text.</p>
      <p class="text-sm text-success">Some highlighted text.</p>

      <svg class="w-full"viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="0"
          y="0"
          width="20"
          height="32"
          rx="2"
          ry="2"
          class="fill-current text-base-100"
        />

        <circle cx="10" cy="10" r="9" class="fill-current text-anxiety" />
        <circle cx="10" cy="10" r="6" class="fill-current text-growth" />
        <circle cx="10" cy="10" r="3" class="fill-current text-comfort" />
      </svg>

      <div class="grid grid-cols-4 gap-1">
        <div v-for="color in themeBgColors" :class="`${color}`" class="h-8 p-1 rounded-sm shadow-xs"/>
      </div>

      <button class="btn btn-primary btn-lg p-4">
        btn btn-primary btn-lg
      </button>

      <button class="btn btn-secondary">
        btn btn-secondary
      </button>

      <button class="btn btn-sm btn-disabled">
        btn btn-disabled
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '~/store/config'

const { switchTheme } = useConfigStore()

const themeBgColors = [
'bg-primary',
'bg-primary-content',

'bg-secondary',
'bg-secondary-content',

'bg-accent',
'bg-accent-content',

'bg-neutral',
'bg-neutral-content',

'bg-base-100',
'bg-base-200',
'bg-base-300',
'bg-base-content',

'bg-info',
'bg-info-content',
'bg-success',
'bg-success-content',
'bg-warning',
'bg-warning-content',
'bg-error',
'bg-error-content',
]
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
