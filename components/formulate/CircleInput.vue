<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    <CircleInput v-model="value" />
  </div>
</template>

<script lang="ts">
import {
  circleInputModelToEntryAmounts,
  entryAmountsToCircleInputModel
} from '~/data/utils'

export default {
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  computed: {
    value: {
      get () {
        return entryAmountsToCircleInputModel(this.context.model)
      },
      set (newValue) {
        const amounts = circleInputModelToEntryAmounts(newValue)

        // Update formulate context.
        this.$set(this.context, 'model', amounts)
      }
    }
  }
}
</script>
