<template>
  <div class="raginput" :class="{ active }">
    <div class="raginput__inner">
      <svg
        :viewBox="`0 0 ${viewbox.outer} ${viewbox.outer}`"
        class="raginput__inner__svg"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="endDrag"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="endDrag"
        @mouseleave="endDrag"
      >
        <!-- <defs>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="0.5"
              flood-opacity="0.6"
            />
          </filter>
        </defs> -->

        <!-- -->
        <g>
          <circle
            ref="background"
            :cx="viewbox.center"
            :cy="viewbox.center"
            r="50"
            class="raginput__background"
          />
          <circle
            :cx="viewbox.center"
            :cy="viewbox.center"
            r="50"
            :transform="`scale(${model.red})`"
            class="raginput__circle text-anxiety"
            :fill="anxiety"
          />
          <circle
            :cx="viewbox.center"
            :cy="viewbox.center"
            r="50"
            :transform="`scale(${model.amber})`"
            class="raginput__circle text-growth"
            :fill="growth"
          />
          <circle
            :cx="viewbox.center"
            :cy="viewbox.center"
            r="50"
            :transform="`scale(${model.green})`"
            class="raginput__circle text-comfort"
            :fill="comfort"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { clamp, defaults } from 'lodash-es'
import { growthInputDefaults } from '~/data/config'
import tailwindConfig from '#tailwind-config'

function getTouchEventCoords (params) {
  // Get viewpoint coords.
  const { clientX: x, clientY: y } = event.changedTouches[0]

  return { x, y }
}

function getMouseEventCoords (event) {
  const { clientX: x, clientY: y } = event

  return { x, y }
}

export default {
  components: {},
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    offset: {
      type: Number,
      default: 14
    }
  },
  data () {
    const { comfort, growth, anxiety } = tailwindConfig.theme.colors
    return {
      state: {},
      defaultState: {
        red: 3 / 3,
        amber: 2 / 3,
        green: 1 / 3
      },
      dragDiff: 0,
      circleSize: 100,
      currentCircle: null,
      anxiety,
      growth,
      comfort
    }
  },
  computed: {
    viewbox () {
      const { circleSize, offset } = this
      const padding = offset * 2
      const center = offset + circleSize / 2

      return {
        inner: circleSize,
        outer: circleSize + padding,
        offset,
        center
      }
    },
    active () {
      return !!this.currentCircle
    },
    model: {
      get () {
        return defaults({}, this.state, this.value, this.defaultState)
      },
      set (newValue) {
        this.state = newValue
      }
    }
  },
  methods: {
    handleTouchStart (event) {
      // Prevent firing of mouse events.
      event.preventDefault()

      //
      this.startDrag(getTouchEventCoords(event))
    },

    handleTouchMove (event) {
      this.update(getTouchEventCoords(event))
    },

    handleMouseDown (event) {
      this.startDrag(getMouseEventCoords(event))
    },

    handleMouseMove (event) {
      this.update(getMouseEventCoords(event))
    },

    //
    startDrag (viewportCoords) {
      const { scale } = this.getRelativeCoords(viewportCoords)

      this.currentCircle = this.getCirclePicked(scale)

      if (this.currentCircle === 'amber') {
        this.dragDiff = scale - this.model.amber
      } else {
        this.dragDiff = scale - this.model.green
      }
    },

    endDrag (event) {
      const { currentCircle } = this

      // Exit if not grabbing.
      if (!currentCircle) {
        return
      }

      this.currentCircle = null

      // Emit @input event for v-model.
      this.$emit('input', { ...this.model })
    },

    update (viewportCoords) {
      const { currentCircle } = this

      // Exit if not grabbing.
      if (!currentCircle) {
        return
      }

      //
      const { scale } = this.getRelativeCoords(viewportCoords)
      this.updateCircleScale(currentCircle, scale)
    },

    //
    getRelativeCoords (viewportCoords) {
      // https://vuejs.org/v2/api/#el
      const container = this.$refs.background

      // https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element
      const rect = container.getBoundingClientRect()

      // Get relative X,Y position from center.
      const x = (viewportCoords.x - rect.left - rect.width / 2) / rect.width
      const y = (viewportCoords.y - rect.top - rect.height / 2) / rect.height

      // Get magnitude of the X,Y vector found above
      const scale = 2 * Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

      return { x, y, scale }
    },

    //
    getCirclePicked (scale) {
      // Pick which circle is effected.
      const thresh = (this.model.amber + this.model.green) / 2

      if (scale > thresh) {
        return 'amber'
      } else {
        return 'green'
      }
    },

    updateCircleScale (circle, scale) {
      const { padding, minRadius } = growthInputDefaults

      if (circle === 'amber') {
        //
        this.$set(
          this.state,
          'amber',
          clamp(scale - this.dragDiff, minRadius + padding, 1 - padding)
        )

        if (this.model.amber - this.model.green < padding) {
          this.$set(this.state, 'green', this.model.amber - padding)
        }
      }

      if (circle === 'green') {
        //
        this.$set(
          this.state,
          'green',
          clamp(scale - this.dragDiff, minRadius, 1 - padding * 2)
        )

        if (this.model.amber - this.model.green < padding) {
          this.$set(this.state, 'amber', this.model.green + padding)
        }
      }
    }
  }
}
</script>

<style scoped>
.raginput {
  width: 100%;
  background-color: base-200;
}

.raginput__inner {
  display: flex;
}

.raginput__inner__svg {
  /* max-height: 50vh; */
  margin: auto;
  flex: 1;
}

.raginput__background,
.raginput__circle {
  @apply border fill-current;
}

.raginput__circle {
  @apply origin-center;
  @apply transition-transform duration-700;
}

.active .raginput__circle {
  @apply transition-none;
}
</style>
