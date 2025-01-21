<template>
  <svg width="100%" height="100%" viewBox="0 0 100 50">
    <path
      d="M0,50 a1,1 0 0,1 100,0"
      transform-origin="bottom center"
      :transform="scaleRed"
      :fill="anxiety"
    />
    <path
      d="M0,50 a1,1 0 0,1 100,0"
      transform-origin="bottom center"
      :transform="scaleAmber"
      :fill="growth"
    />
    <path
      d="M0,50 a1,1 0 0,1 100,0"
      transform-origin="bottom center"
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
      return `scale(${this.state.red})`
    },
    scaleAmber () {
      return `scale(${this.state.amber})`
    },
    scaleGreen () {
      return `scale(${this.state.green})`
    }
  }
}
</script>
