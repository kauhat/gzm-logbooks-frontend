<template>
  <div class="">
    <FormKit
      type="mood-circle"
      name="mood"
      label="Mood"
      validation="required"
      label-class="hidden"
      @input="updateSection"
    />

    <FormKit
      type="date"
      name="timestamp"
      label="Date"
      validation="required|after:2000-01-01"
      error-behavior="live"
      class="w-full"
    />

    <!-- TODO: Fix width -->
    <FormKit
      :label="questionPrompt"
      class="w-full"
      type="textarea"
      name="comment"
    />
  </div>
</template>

<script lang="ts">
import {
  scaledMoodInput,
  getTriangleSection,
  analysisSectionPrompts
} from '~/data/config'

export default {
  data () {
    return {
      questions: analysisSectionPrompts,

      // question: 'Zone not found',
      section: null
    }
  },

  computed: {
    questionPrompt () {
      const { section, questions } = this

      if (section) {
        return questions[section] ?? null
      }

      //
      return null
    }
  },

  methods: {
    updateSection (moodInputData) {
      const scaled = scaledMoodInput(moodInputData)

      this.section = getTriangleSection(scaled)
    }
  }
}
</script>
