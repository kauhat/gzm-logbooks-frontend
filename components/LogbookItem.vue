<template>
  <nuxt-link :to="route">
    <Card content-class="p-2 bg-base-300">
      <span class="card-title">{{ $get(logbook, 'name') }}</span>
      <p class="mb-1 text-sm text-gray-600">
        {{ countEntries }} entries
      </p>

      <template #top>
        <div class="shadow-inner min-h-[8rem]">
          <ProgressChart v-if="entries.length > 1" :entries="entries" />
        </div>
      </template>
    </Card>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { useDatabase } from '~/store/database'

const { logbookQuery, entriesQuery } = await useAsyncData(async () => {
  const { rxdb } = useDatabase()
  const logbookId = this.primary

  // Get logbook record from database.
  const logbookQuery = rxdb.logbooks.findOne(logbookId)

  //

  return {
    logbookQuery,
    entriesQuery
  }
})
</script>

<script lang="ts">
// import { useDatabase } from '~/store/database'

export default {
  props: {
    primary: { type: String, required: true }
  },
  data () {
    return {
      logbook: null,
      entries: []
    }
  },
  computed: {
    route () {
      return this.logbook?.getRoute() ?? {}
    },
    countEntries () {
      return this.entries?.length ?? 0
    }
  },
  mounted () {
    this.$subscribeTo(logbookQuery.$, logbook => (this.logbook = logbook))
    this.$subscribeTo(entriesQuery.$, entries => (this.entries = entries))
  }
}
</script>
