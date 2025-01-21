<template>
  <Card class="bg-base-200">
    <template #title>
      <h2>Metrics and Analysis</h2>
    </template>

    <!-- Stats -->
    <div class="grid grid-cols-3 mb-4">
      <div class="stat">
        <div class="stat-title">
          Growth
        </div>
        <div v-if="scaled" class="stat-value">
          {{ scaled.amountAmber.toFixed(2) }}
        </div>
      </div>

      <div class="stat">
        <div class="stat-title">
          Anxiety
        </div>
        <div v-if="scaled" class="stat-value">
          {{ scaled.amountRed.toFixed(2) }}
        </div>
      </div>

      <div class="stat">
        <div class="stat-title">
          Comfort
        </div>
        <div v-if="scaled" class="stat-value">
          {{ scaled.amountGreen.toFixed(2) }}
        </div>
      </div>
    </div>

    <!-- Analysis triangle -->
    <div class="mb-4">
      <svg
        viewBox="0 0 400 250"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:bx="https://boxy-svg.com"
      >
        <defs>
          <bx:grid x="0" y="0" width="100" height="95.446" />
          <linearGradient
            id="gradient-0"
            gradientUnits="userSpaceOnUse"
            x1="200"
            y1="0"
            x2="200"
            y2="141.421"
            gradientTransform="matrix(0, -1, 2.82842712475, 0, 0, 0)"
          >
            <stop offset="0" :style="`stop-color: ${comfort}`" />
            <stop offset="1" :style="`stop-color: ${anxiety}`" />
          </linearGradient>

          <linearGradient
            id="gradient-1"
            gradientUnits="userSpaceOnUse"
            x1="200"
            y1="0"
            x2="200"
            y2="141.421"
            gradientTransform="matrix(1, 0, 0, 1, 0, 0)"
          >
            <stop offset="0" :style="`stop-color: ${growth}`" />
            <stop offset="1" :style="`stop-color: ${growthOpacity}`" />
          </linearGradient>
        </defs>

        <path
          d="M 200 25 L 400 225 L 0 225 L 200 25 Z"
          style="fill: url(#gradient-0)"
          bx:shape="triangle 0 25 400 141.421 0.5 0 1@88f9a85d"
        />
        <path
          d="M 200 25 L 400 225 L 0 225 L 200 25 Z"
          style="fill: url(#gradient-1)"
          bx:shape="triangle 0 25 400 141.421 0.5 0 1@88f9a85d"
        />

        <circle v-if="mood" :transform="triangleTransform" r="4" />

        <g class="text-sm uppercase fill-base-content">
          <text style="text-anchor: middle" x="50%" width="50%" y="20">
            Growth
          </text>

          <text style="text-anchor: start" x="0%" width="20%" y="245">
            Comfort
          </text>

          <text style="text-anchor: end" x="100%" width="20%" y="245">
            Anxiety
          </text>
        </g>
      </svg>
    </div>

    <!-- Suggestions -->
    <div class="prose grow">
      <p>{{ resources[section] }}</p>
    </div>
  </Card>
</template>

<script lang="ts">
import { scaledMoodInput, getTriangleSection } from '~/data/config'
import tailwindConfig from '#tailwind-config'
export default {
  props: {
    mood: { type: Object, default: null }
  },

  data () {
    const { comfort, growth, anxiety } = tailwindConfig.theme.colors

    const growthOpacity = growth + '00'

    return {
      comfort,
      growth,
      anxiety,
      growthOpacity,
      resources: [
        'zone not found',
        'zone 1',
        'zone 2',
        'zone 3',
        'zone 4',
        'zone 5',
        'zone 6'
      ]
    }
  },

  computed: {
    scaled () {
      if (this.mood) {
        return scaledMoodInput(this.mood)
      }

      return null
    },
    triangleTransform () {
      if (!this.mood) {
        return ''
      }

      //
      const scaled = scaledMoodInput(this.mood)

      const scaler = 200 * Math.sqrt(2)

      return `translate(200,25)
        rotate(45)
        translate(
          ${(scaled?.amountRed ?? 0) * scaler},
          ${(scaled?.amountGreen ?? 0) * scaler}
        )`
    },
    section () {
      if (!this.mood) {
        return ''
      }

      const scaled = scaledMoodInput(this.mood)

      return getTriangleSection(scaled)
    }
  }
}
</script>
