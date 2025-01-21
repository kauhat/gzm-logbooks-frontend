<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    max: {
      type: String,
      default: 'xl'
    }
  },
  data () {
    return {
      sizes: [
        { width: 'xl' },                      // max-w-xl
        { breakpoint: 'sm' },                 // sm:max-w-xl
        { breakpoint: 'md', width: '4xl' },   // md:max-w-4xl
        { breakpoint: 'lg' },                 // lg:max-w-4xl
        { breakpoint: 'xl', width: '7xl' }    // xl:max-w-7xl
      ]
    }
  },
  computed: {
    activeSizes () {
      const maxIndex = this.sizes.findIndex(
        size => size.breakpoint === this.max
      )

      if (maxIndex > 0) {
        return this.sizes.slice(0, maxIndex + 1)
      }

      return this.sizes
    },
    classes () {
      const widths = this.activeSizes.map((size) => {
        const { breakpoint, width } = size

        if (width) {
          const prefix = breakpoint ? `${breakpoint}:` : ''

          return [`${prefix}max-w-${width}`]
        }

        //
        return []
      })

      // Return array of class strings.
      return ['w-full', ...widths, 'mx-auto']
    }
  }
}
</script>
