<template>
  <svg width="100%" height="100%">
    <rect
      width="100%"
      height="100%"
      transform-origin="center"
      :transform="scaleRed"
      :fill="anxiety"
    />

    <rect
      width="100%"
      height="100%"
      transform-origin="center"
      :transform="scaleAmber"
      :fill="growth"
    />

    <rect
      width="100%"
      height="100%"
      transform-origin="center"
      :transform="scaleGreen"
      :fill="comfort"
    />
  </svg>
</template>

<script lang="ts">
import tailwindConfig from '#tailwind-config'

export default {
  props: {
    state: {
      type: Object,
      default () {
        return {
          red: 3 / 3,
          amber: 2 / 3,
          green: 1 / 3
        }
      }
    }
  },
  data () {
    const { comfort, growth, anxiety } = tailwindConfig.theme.colors
    return {
      anxiety,
      growth,
      comfort
    }
  },
  computed: {
    scaleRed () {
      return `scale(${this.state.red},1)`
    },
    scaleAmber () {
      return `scale(${this.state.amber},1)`
    },
    scaleGreen () {
      return `scale(${this.state.green},1)`
    }
  }
}
</script>
