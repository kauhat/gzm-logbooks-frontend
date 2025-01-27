<template>
  <nuxt-link :to="document.getRoute()">
    <Card content-class="p-2 bg-base-300">
      <span class="card-title">{{ document.name }}</span>
      <p class="mb-1 text-sm text-gray-600">
        {{ countEntries }} entries
      </p>

      <template #top>
        <div class="shadow-inner min-h-[8rem]">
          <!-- <ProgressChart v-if="entries.length > 1" :entries="entries" /> -->
        </div>
      </template>
    </Card>
  </nuxt-link>
</template>

<script lang="ts" setup>
import { useObservable } from '@vueuse/rxjs';
import { useDatabase } from '~/store/database'
import type { LogbookDocument } from '~/data/schemas'

const { document } = defineProps({
  document: { type: Object as PropType<LogbookDocument> , required: true }
})

console.log({document})

const { getUserDatabase, getLogbookEntriesQuery, getLogbooksQuery } = useDatabase()

const entries = useObservable((await getUserDatabase()) && getLogbookEntriesQuery(document.id).$)

const countEntries = computed(() => entries.value?.length)
</script>

<!-- <script lang="ts">
// import { useDatabase } from '~/store/database'

export default {
  props: {
    primary: { type: String, required: true }
  },
  data () {
    return {
      // logbook: null,
      // entries: []
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
    // this.$subscribeTo(logbookQuery.$, logbook => (this.logbook = logbook))
    // this.$subscribeTo(entriesQuery.$, entries => (this.entries = entries))
  }
}
</script> -->
